# Events API

Version 1 · Contract between the Mila University website (React) and the backend.

This document describes every endpoint the website needs to show events: the **Top Events** list on
the home page, the **All Events** page, and the **event details** page. Each event has an **event link**
set by the administrator, multiple photos, extra links, rich text with links inside it (like Wikipedia), and the teachers and staff involved. It also
covers the **admin** endpoints used to create and manage events.

The frontend already follows this contract (`src/api/events.ts`). Until the backend exists, it uses
a mock that returns the same shapes (see [Mock mode](#mock-mode)).

---

## Contents

1. [Conventions](#1-conventions)
2. [Data models](#2-data-models)
3. [Rich text content](#3-rich-text-content)
4. [Public endpoints](#4-public-endpoints)
5. [Admin endpoints](#5-admin-endpoints)
6. [Errors](#6-errors)
7. [Which page uses which endpoint](#7-which-page-uses-which-endpoint)
8. [Mock mode](#mock-mode)

---

## 1. Conventions

| Topic | Rule |
|---|---|
| Base URL | `https://<api-host>/api/v1` (frontend reads it from `VITE_API_URL`) |
| Format | JSON, UTF-8. Request and response bodies use `camelCase` keys. |
| Language | Public endpoints take `?lang=en\|fr\|ar` (default `en`). If `lang` is missing, the server may use the `Accept-Language` header. Every text field in the response is already in that language. If a translation is missing, the server falls back to English and sets the header `Content-Language` to the language actually used. |
| Dates | ISO 8601 with offset, Algeria time: `2026-10-21T09:00:00+01:00`. All-day events set `allDay: true`; the time part is then ignored. |
| Identifiers | `id` is a UUID used by admin endpoints. `slug` is the readable URL key (`international-conference-digital-economy`), unique, lowercase, `a-z 0-9 -`. Public URLs use the slug. |
| Pagination | `?page=1&pageSize=12` (page starts at 1, `pageSize` max 50). Lists return `{ data, meta }`. |
| Sorting | `?sort=-startDate` (minus = descending). Allowed: `startDate`, `-startDate`, `title`, `-publishedAt`. |
| Images | Every image is an [Image](#image) object. URLs are ImageKit URLs; the frontend may add `?tr=w-800` to resize. |
| Page address | Every event includes `url`, its own page on the website, e.g. `https://univ-mila.dz/events/<slug>`, for sharing and QR codes. This is **not** the event link: see [`mainLink`](#eventdetail). |
| Caching | Public `GET` responses send `Cache-Control: public, max-age=60` and an `ETag`; the client may send `If-None-Match` and get `304 Not Modified`. |
| Auth | Public endpoints need no token. Admin endpoints need `Authorization: Bearer <JWT>` with role `editor` or `admin`. |
| Visibility | Public endpoints only return events with `status = published` and `publishedAt <= now`. |

---

## 2. Data models

### Image

```json
{
  "id": "6b1f0d2e-4c3a-4c2b-9b7e-2f6f3c1d9a01",
  "url": "https://ik.imagekit.io/qg0um49ak/Universty%20Mila/com.jpg",
  "alt": "The economics institute building",
  "caption": "Opening session in the main hall",
  "width": 4160,
  "height": 3120
}
```

`caption` may be `null`. `alt` is required (accessibility) and is translated.

### EventCategory

```json
{ "key": "conference", "label": "Conference", "count": 12 }
```

| key | en | fr | ar |
|---|---|---|---|
| `conference` | Conference | Colloque | ملتقى |
| `ceremony` | Ceremony | Cérémonie | احتفال |
| `workshop` | Workshop | Atelier | ورشة عمل |
| `studentLife` | Student life | Vie étudiante | حياة طلابية |
| `research` | Research | Recherche | بحث علمي |

`count` is only returned by `GET /event-categories`.

### EventTiming

Computed by the server from the dates, never stored:

| value | meaning |
|---|---|
| `upcoming` | starts in the future |
| `ongoing` | started and not finished yet |
| `past` | already finished |

### Location

```json
{
  "name": "Main Conference Hall",
  "address": "Abdelhafid Boussouf University, Mila 43000, Algeria",
  "mapUrl": "https://maps.google.com/?q=36.45,6.26",
  "online": false
}
```

`address` and `mapUrl` may be `null`. `online: true` means the event is online-only.

### PersonSummary

A teacher or staff member involved in the event.

```json
{
  "id": "0d7c6b0e-1b51-4d1f-8a6e-2a1f2e1c3b44",
  "slug": "amirouche-bouchelaghem",
  "fullName": "Amirouche Bouchelaghem",
  "honorific": "Prof.",
  "type": "teacher",
  "position": "University Rector",
  "department": { "slug": "rectorate", "name": "Rectorate" },
  "photo": null,
  "profileUrl": "https://univ-mila.dz/people/amirouche-bouchelaghem"
}
```

| field | notes |
|---|---|
| `type` | `teacher` or `staff` |
| `honorific` | `Prof.`, `Dr.`, or `null`; translated |
| `photo` | [Image](#image) or `null` (the website then shows initials) |
| `department` | may be `null` |

### EventPerson

How a person is linked to one event: a [PersonSummary](#personsummary) plus their role.

```json
{
  "role": "speaker",
  "roleLabel": "Speaker",
  "note": "Keynote: digital payment in Algeria",
  "person": { "…": "PersonSummary" }
}
```

| role | en | fr | ar |
|---|---|---|---|
| `organizer` | Organizer | Organisateur | المنظم |
| `speaker` | Speaker | Intervenant | متدخل |
| `moderator` | Moderator | Modérateur | مسيّر الجلسة |
| `coordinator` | Coordinator | Coordinateur | المنسق |
| `guest` | Guest of honour | Invité d'honneur | ضيف شرف |

`note` is optional free text (talk title, responsibility…). People are returned in the order set by the admin.

### EventLink

A link with a label. Used for the event's main link (`mainLink`) and for the extra links (`links`).

```json
{
  "kind": "registration",
  "label": "Register for the conference",
  "url": "https://forms.univ-mila.dz/digital-economy-2026",
  "opensInNewTab": true
}
```

| kind | used for |
|---|---|
| `registration` | sign-up form; shown as the main button |
| `livestream` | live video (YouTube, Facebook…) |
| `program` | programme or schedule |
| `document` | PDF or file (call for papers, poster…) |
| `external` | anything else |

### EventSummary

Used in lists and cards.

```json
{
  "id": "1f0c2d3e-5a6b-4c7d-8e9f-0a1b2c3d4e5f",
  "slug": "international-conference-digital-economy",
  "url": "https://univ-mila.dz/events/international-conference-digital-economy",
  "title": "International Conference on the Digital Economy",
  "summary": "Researchers and experts from Algeria and abroad met to discuss…",
  "category": { "key": "conference", "label": "Conference" },
  "startDate": "2026-10-21T09:00:00+01:00",
  "endDate": "2026-10-22T17:00:00+01:00",
  "allDay": false,
  "timing": "past",
  "location": { "name": "Main Conference Hall", "address": null, "mapUrl": null, "online": false },
  "coverImage": { "…": "Image" },
  "photoCount": 4,
  "isFeatured": true
}
```

`summary` is plain text, max 300 characters. `photoCount` is the number of images in the gallery.

### EventDetail

Everything in [EventSummary](#eventsummary), plus:

```json
{
  "…": "all EventSummary fields",
  "mainLink": {
    "kind": "external",
    "label": "Conference website",
    "url": "https://digital-economy-2026.univ-mila.dz",
    "opensInNewTab": true
  },
  "content": [ "…Block, see section 3" ],
  "gallery": [ { "…": "Image" } ],
  "links": [ { "…": "EventLink" } ],
  "people": [ { "…": "EventPerson" } ],
  "organizers": [
    { "kind": "faculty", "slug": "economics", "name": "Economics, Management and Business Sciences" }
  ],
  "tags": ["digital economy", "e-commerce"],
  "publishedAt": "2026-10-10T10:00:00+01:00",
  "updatedAt": "2026-10-23T08:30:00+01:00",
  "seo": {
    "title": "International Conference on the Digital Economy | Mila University",
    "description": "Researchers and experts from Algeria and abroad…",
    "image": "https://ik.imagekit.io/qg0um49ak/Universty%20Mila/com.jpg?tr=w-1200"
  }
}
```

| field | notes |
|---|---|
| `mainLink` | **The event link.** An [EventLink](#eventlink) the administrator types in when creating the event: the page visitors should open (registration form, event website, document, photo album…). The website shows it as the main **Open link** button. `null` if the administrator set none. |
| `content` | rich text with links, see [section 3](#3-rich-text-content) |
| `links` | extra links (programme, livestream…), shown below the details |
| `gallery` | all photos of the event, in display order; the first one is usually the cover. May be empty. |
| `organizers` | faculties, departments, labs or clubs; `kind` is `faculty`, `department`, `lab`, `club` or `service` |
| `seo` | for the page `<title>`, meta description and social share image |

### Paginated list

```json
{
  "data": [ { "…": "EventSummary" } ],
  "meta": { "page": 1, "pageSize": 12, "total": 37, "totalPages": 4 }
}
```

---

## 3. Rich text content

The event text is **not** raw HTML (that would be unsafe and hard to translate). It is a list of
**blocks**; text inside blocks is a list of **inline nodes**, and a node can be a **link**.

### Blocks

| type | fields |
|---|---|
| `paragraph` | `children: Inline[]` |
| `heading` | `level: 2 \| 3`, `children: Inline[]` |
| `list` | `ordered: boolean`, `items: Inline[][]` (one array of inline nodes per item) |
| `quote` | `children: Inline[]`, `cite: string \| null` |

### Inline nodes

| type | fields |
|---|---|
| `text` | `text: string`, `marks?: ("bold" \| "italic")[]` |
| `link` | `text: string`, `target: LinkTarget` |

### LinkTarget

Internal targets are links to other pages of the website, like Wikipedia links. The server resolves
them and returns `href`, so the frontend never builds URLs itself.

| kind | example | `href` returned |
|---|---|---|
| `event` | `{ "kind": "event", "slug": "doctoral-research-days" }` | `/events/doctoral-research-days` |
| `person` | `{ "kind": "person", "slug": "amirouche-bouchelaghem" }` | `/people/amirouche-bouchelaghem` |
| `faculty` | `{ "kind": "faculty", "slug": "math-cs" }` | `/faculties/math-cs` |
| `page` | `{ "kind": "page", "slug": "rectorate/address" }` | `/rectorate/address` |
| `url` | `{ "kind": "url", "href": "https://www.mesrs.dz" }` | the same URL; opens in a new tab |

Every `target` in a response includes `href`. If an internal target points to something that was
deleted or unpublished, the server turns the link into plain `text` instead of returning a broken link.

### Example

```json
[
  {
    "type": "paragraph",
    "children": [
      { "type": "text", "text": "The " },
      {
        "type": "link",
        "text": "Institute of Economics",
        "target": { "kind": "faculty", "slug": "economics", "href": "/faculties/economics" }
      },
      { "type": "text", "text": " hosted a " },
      { "type": "text", "text": "two-day", "marks": ["bold"] },
      { "type": "text", "text": " international conference." }
    ]
  },
  { "type": "heading", "level": 2, "children": [{ "type": "text", "text": "Programme" }] },
  {
    "type": "list",
    "ordered": false,
    "items": [
      [{ "type": "text", "text": "E-commerce and digital payment" }],
      [{ "type": "text", "text": "Digitalisation of public administration" }]
    ]
  }
]
```

---

## 4. Public endpoints

### 4.1 Top events (home page)

```
GET /events/top?lang=en&limit=6
```

Returns the events for the home page: **featured events first** (newest first), then the most
recent other events, up to `limit`.

| param | type | default | notes |
|---|---|---|---|
| `lang` | `en \| fr \| ar` | `en` | |
| `limit` | integer 1–12 | `6` | the home page asks for 6 |

**200** `{ "data": EventSummary[] }`

```json
{
  "data": [
    {
      "id": "1f0c2d3e-5a6b-4c7d-8e9f-0a1b2c3d4e5f",
      "slug": "international-conference-digital-economy",
      "url": "https://univ-mila.dz/events/international-conference-digital-economy",
      "title": "International Conference on the Digital Economy",
      "summary": "Researchers and experts from Algeria and abroad met to discuss…",
      "category": { "key": "conference", "label": "Conference" },
      "startDate": "2026-10-21T09:00:00+01:00",
      "endDate": "2026-10-22T17:00:00+01:00",
      "allDay": false,
      "timing": "past",
      "location": { "name": "Main Conference Hall", "address": null, "mapUrl": null, "online": false },
      "coverImage": {
        "id": "6b1f0d2e-4c3a-4c2b-9b7e-2f6f3c1d9a01",
        "url": "https://ik.imagekit.io/qg0um49ak/Universty%20Mila/com.jpg",
        "alt": "The economics institute building",
        "caption": null,
        "width": 4160,
        "height": 3120
      },
      "photoCount": 4,
      "isFeatured": true
    }
  ]
}
```

### 4.2 List events (All Events page)

```
GET /events?lang=fr&page=1&pageSize=12&q=conference&category=ceremony&organizer=economics&year=2026&month=10
```

| param | type | default | notes |
|---|---|---|---|
| `lang` | `en \| fr \| ar` | `en` | |
| `page` | integer ≥ 1 | `1` | |
| `pageSize` | integer 1–50 | `12` | |
| `category` | category key | — | filter by one category |
| `timing` | `upcoming \| ongoing \| past` | — | |
| `featured` | `true \| false` | — | |
| `year` | integer, e.g. `2026` | — | events starting in that year |
| `month` | integer 1–12 | — | events starting in that month; **requires `year`** (422 otherwise) |
| `from`, `to` | date `YYYY-MM-DD` | — | events overlapping this range (for custom ranges) |
| `q` | string | — | search in title, summary, location and tags (in the requested language); case-insensitive |
| `person` | person slug | — | events a teacher or staff member took part in |
| `organizer` | organizer slug | — | a faculty (`economics`) or a university service (`rectorate`); see 4.5 |
| `sort` | see conventions | `-startDate` | |

**200** [Paginated list](#paginated-list) of `EventSummary`.

**422** if a parameter is invalid (e.g. `pageSize=500`).

### 4.3 Event details

```
GET /events/{slug}?lang=ar
```

**200** `{ "data": EventDetail }`

```json
{
  "data": {
    "id": "1f0c2d3e-5a6b-4c7d-8e9f-0a1b2c3d4e5f",
    "slug": "international-conference-digital-economy",
    "url": "https://univ-mila.dz/events/international-conference-digital-economy",
    "title": "الملتقى الدولي حول الاقتصاد الرقمي",
    "summary": "اجتمع باحثون وخبراء من الجزائر وخارجها…",
    "category": { "key": "conference", "label": "ملتقى" },
    "startDate": "2026-10-21T09:00:00+01:00",
    "endDate": "2026-10-22T17:00:00+01:00",
    "allDay": false,
    "timing": "past",
    "location": {
      "name": "قاعة المحاضرات الكبرى",
      "address": "جامعة عبد الحفيظ بوالصوف، ميلة 43000، الجزائر",
      "mapUrl": "https://maps.google.com/?q=36.45,6.26",
      "online": false
    },
    "coverImage": { "…": "Image" },
    "photoCount": 4,
    "isFeatured": true,
    "mainLink": {
      "kind": "external",
      "label": "موقع الملتقى",
      "url": "https://digital-economy-2026.univ-mila.dz",
      "opensInNewTab": true
    },
    "content": [ "…blocks" ],
    "gallery": [ { "…": "Image" }, { "…": "Image" } ],
    "links": [
      {
        "kind": "program",
        "label": "برنامج الملتقى",
        "url": "https://univ-mila.dz/files/digital-economy-program.pdf",
        "opensInNewTab": true
      }
    ],
    "people": [
      {
        "role": "organizer",
        "roleLabel": "المنظم",
        "note": null,
        "person": { "…": "PersonSummary" }
      }
    ],
    "organizers": [{ "kind": "faculty", "slug": "economics", "name": "العلوم الاقتصادية والتجارية وعلوم التسيير" }],
    "tags": ["الاقتصاد الرقمي"],
    "publishedAt": "2026-10-10T10:00:00+01:00",
    "updatedAt": "2026-10-23T08:30:00+01:00",
    "seo": { "title": "…", "description": "…", "image": "…" }
  }
}
```

**404** if the slug does not exist or the event is not published.

**301** if the slug was renamed: the server answers with `Location: /api/v1/events/{new-slug}` and
`{ "error": { "code": "MOVED", "newSlug": "…" } }`, so old shared links keep working.

### 4.4 Related events

```
GET /events/{slug}/related?lang=en&limit=3
```

Same category first, then the same organizers, then the newest. Never includes the event itself.

**200** `{ "data": EventSummary[] }` · **404** if the slug does not exist.

### 4.5 Filter options (All Events page)

```
GET /event-filters?lang=en
```

Everything the All Events page needs to build its filters, in one call. Every option has the number
of published events that match it, and only options with at least one event are returned.

**200**

```json
{
  "data": {
    "categories": [
      { "key": "conference", "label": "Conference", "count": 12 },
      { "key": "ceremony", "label": "Ceremony", "count": 5 }
    ],
    "organizers": [
      { "kind": "service", "slug": "rectorate", "name": "Rectorate", "count": 4 },
      { "kind": "faculty", "slug": "economics", "name": "Economics, Management and Business Sciences", "count": 7 }
    ],
    "years": [
      {
        "year": 2026,
        "count": 15,
        "months": [
          { "month": 4, "count": 2 },
          { "month": 10, "count": 6 }
        ]
      }
    ]
  }
}
```

| field | used for |
|---|---|
| `categories` | the **type** buttons (`?category=`) |
| `organizers` | the **department** menu (`?organizer=`). The website groups `kind: faculty` under "Faculties and institutes" and the other kinds (`service`, `lab`, `club`, `department`) under "University services". No organizer selected means the whole university. |
| `years` | the **year** menu (`?year=`), newest first; each year's `months` fill the **month** menu (`?month=`) |

`GET /event-categories?lang=en` still exists and returns only the `categories` part.

### 4.6 Person profile (target of person links)

```
GET /people/{slug}?lang=en
```

Opened when a visitor clicks a teacher or staff member, in the event text or in the
"Teachers and staff involved" cards. Website page: `/people/{slug}`.

**200** `{ "data": PersonDetail }`, a [PersonSummary](#personsummary) plus:

| field | type | notes |
|---|---|---|
| `email` | string or `null` | public contact address; `null` hides the contact box |
| `expertise` | string[] | areas of expertise, translated |
| `bio` | Block[] | short biography, same [rich text](#3-rich-text-content) format as events, links included |

```json
{
  "data": {
    "id": "0d7c6b0e-1b51-4d1f-8a6e-2a1f2e1c3b44",
    "slug": "karim-boudjemaa",
    "fullName": "Karim Boudjemaa",
    "honorific": "Prof.",
    "type": "teacher",
    "position": "Professor of Computer Science",
    "department": { "slug": "math-cs", "name": "Mathematics and Computer Science" },
    "photo": null,
    "profileUrl": "https://univ-mila.dz/people/karim-boudjemaa",
    "email": "karim.boudjemaa@univ-mila.dz",
    "expertise": ["Artificial intelligence", "Data science"],
    "bio": [
      {
        "type": "paragraph",
        "children": [
          { "type": "text", "text": "Prof. Karim Boudjemaa teaches at the " },
          {
            "type": "link",
            "text": "Mathematics and Computer Science department",
            "target": { "kind": "faculty", "slug": "math-cs", "href": "/faculties/math-cs" }
          },
          { "type": "text", "text": "." }
        ]
      }
    ]
  }
}
```

**404** if the slug does not exist.

The profile page lists the events the person took part in with `GET /events?person={slug}`.

Admin: `POST /admin/people`, `PATCH /admin/people/{id}` and `DELETE /admin/people/{id}` follow the
same rules as events (`Localized` texts for `position`, `honorific`, `expertise` and `bio`;
`photoId` from `POST /admin/media`).

---

## 5. Admin endpoints

All admin endpoints need `Authorization: Bearer <JWT>` with role `editor` or `admin`. Only `admin`
can delete. Admin responses return **all languages** at once, using a `Localized` object:

```json
{ "en": "Graduation Ceremony", "fr": "Cérémonie de remise des diplômes", "ar": "حفل التخرج" }
```

`en` and `ar` are required; `fr` is optional (falls back to `en`).

### 5.1 Upload a photo

```
POST /admin/media
Content-Type: multipart/form-data
```

| field | type | notes |
|---|---|---|
| `file` | image | JPEG, PNG or WebP, max 10 MB |
| `alt` | JSON string `Localized` | required |
| `caption` | JSON string `Localized` | optional |

**201** `{ "data": { "id": "…", "url": "…", "width": 1920, "height": 1080, "alt": {…}, "caption": {…} } }`

The returned `id` is then used in `coverImageId` and `galleryIds`.

### 5.2 Create an event

```
POST /admin/events
```

```json
{
  "slug": "graduation-ceremony-class-of-2026",
  "status": "draft",
  "category": "ceremony",
  "startDate": "2026-07-02T10:00:00+01:00",
  "endDate": "2026-07-02T13:00:00+01:00",
  "allDay": false,
  "isFeatured": true,
  "title": { "en": "Graduation Ceremony – Class of 2026", "fr": "…", "ar": "حفل تخرج دفعة 2026" },
  "summary": { "en": "…", "fr": "…", "ar": "…" },
  "content": { "en": [ "…blocks" ], "fr": [ "…" ], "ar": [ "…" ] },
  "location": {
    "name": { "en": "Main Campus Esplanade", "fr": "…", "ar": "…" },
    "address": { "en": "…", "fr": "…", "ar": "…" },
    "mapUrl": "https://maps.google.com/?q=36.45,6.26",
    "online": false
  },
  "coverImageId": "6b1f0d2e-4c3a-4c2b-9b7e-2f6f3c1d9a01",
  "galleryIds": ["6b1f0d2e-…", "9c2e1f3a-…"],
  "mainLink": {
    "kind": "external",
    "label": { "en": "Photo album", "fr": "Album photo", "ar": "ألبوم الصور" },
    "url": "https://photos.univ-mila.dz/graduation-2026",
    "opensInNewTab": true
  },
  "links": [
    {
      "kind": "livestream",
      "label": { "en": "Watch live", "fr": "Regarder en direct", "ar": "شاهد مباشرة" },
      "url": "https://www.youtube.com/watch?v=…",
      "opensInNewTab": true
    }
  ],
  "people": [
    { "personId": "0d7c6b0e-…", "role": "guest", "note": { "en": "Opening speech", "ar": "كلمة الافتتاح" } }
  ],
  "organizers": [{ "kind": "service", "slug": "rectorate" }],
  "tags": { "en": ["graduation"], "fr": ["diplômes"], "ar": ["تخرج"] },
  "publishedAt": null
}
```

In admin requests, internal link targets only need `kind` and `slug`; the server adds `href`.

**Validation (422 if broken)**

| field | rule |
|---|---|
| `slug` | required, unique, `^[a-z0-9]+(-[a-z0-9]+)*$`, max 120 characters |
| `title.*` | 3–160 characters |
| `summary.*` | 10–300 characters |
| `category` | one of the category keys |
| `startDate` | required; `endDate` ≥ `startDate` |
| `coverImageId`, `galleryIds` | must exist in media; max 30 gallery photos |
| `mainLink` | optional (`null` to remove); `label` required in `en` and `ar`; `url` must be `https://` |
| `links[].url` | `https://` URL (`http://` refused) |
| `people[].personId` | must exist; the same person may appear once per role |
| content links | internal targets must exist; `url` targets must be `https://` |

**201** `{ "data": AdminEvent }` with `Location: /api/v1/admin/events/{id}` · **409** if the slug is taken.

### 5.3 Other admin endpoints

| method & path | purpose | success |
|---|---|---|
| `GET /admin/events?status=draft&page=1` | list all events, any status | 200 paginated `AdminEvent` |
| `GET /admin/events/{id}` | one event with all languages | 200 |
| `PATCH /admin/events/{id}` | partial update (send only changed fields) | 200 |
| `PUT /admin/events/{id}/gallery` | `{ "galleryIds": [...] }` replaces the photos and their order | 200 |
| `PUT /admin/events/{id}/people` | `{ "people": [...] }` replaces the people and their order | 200 |
| `POST /admin/events/{id}/publish` | sets `status=published`; `publishedAt` = now unless a future date is given in `{ "publishedAt": "…" }` (scheduled) | 200 |
| `POST /admin/events/{id}/unpublish` | back to `draft`; disappears from the website | 200 |
| `DELETE /admin/events/{id}` | admin only; deletes the event (photos stay in media) | 204 |
| `GET /admin/people?q=bouch&type=teacher` | search teachers and staff to attach to an event | 200 |

`AdminEvent` has the same shape as the create request, plus `id`, `url`, `createdAt`, `updatedAt`,
`createdBy` and the expanded `coverImage`, `gallery` and `people[].person`.

**Concurrency:** `PATCH` should send `If-Match: <ETag>`; if someone else saved the event in between,
the server answers **412 Precondition Failed** instead of overwriting their changes.

---

## 6. Errors

Every error has the same shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Some fields are invalid.",
    "details": [
      { "field": "title.ar", "message": "Required" },
      { "field": "endDate", "message": "Must be after startDate" }
    ]
  }
}
```

| HTTP | code | when |
|---|---|---|
| 301 | `MOVED` | event slug renamed (see 4.3) |
| 304 | — | `If-None-Match` matched; empty body |
| 400 | `BAD_REQUEST` | malformed JSON |
| 401 | `UNAUTHORIZED` | missing or expired token |
| 403 | `FORBIDDEN` | role not allowed (e.g. editor deleting) |
| 404 | `NOT_FOUND` | unknown slug or id, or not published |
| 409 | `CONFLICT` | slug already used |
| 412 | `PRECONDITION_FAILED` | `If-Match` ETag outdated |
| 413 | `PAYLOAD_TOO_LARGE` | image over 10 MB |
| 422 | `VALIDATION_ERROR` | invalid fields or query parameters |
| 429 | `RATE_LIMITED` | too many requests; see `Retry-After` header |
| 500 | `INTERNAL_ERROR` | server bug; `message` is generic, details are logged |

`message` is in the request language when possible.

---

## 7. Which page uses which endpoint

| Page | Calls | Frontend hook |
|---|---|---|
| Home → Top Events | `GET /events/top?limit=6` | `useTopEvents()` |
| All Events | `GET /event-filters`, `GET /events?q=…&category=…&organizer=…&year=…&month=…&page=…` | `useEventFilters()`, `useEvents(params)` |
| Event details | `GET /events/{slug}`, `GET /events/{slug}/related?limit=3` | `useEvent(slug)`, `useRelatedEvents(slug)` |
| Teacher or staff profile | `GET /people/{slug}`, `GET /events?person={slug}` | `usePerson(slug)`, `useEvents({ person })` |

The hooks live in `src/api/events.ts`. They send the current website language as `lang`, so
switching language refetches the data in the new language.

---

## Mock mode

While the backend is not ready, set in `.env`:

```
VITE_USE_MOCK_API=true
```

The frontend then answers every call from `src/mocks/` with sample data in exactly the shapes above,
including filters, pagination, `404` for unknown slugs and a small artificial delay. When the backend
is ready, set `VITE_USE_MOCK_API=false` and `VITE_API_URL=https://<api-host>/api/v1`; no page code
needs to change.
