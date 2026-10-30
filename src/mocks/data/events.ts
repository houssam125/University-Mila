import {
  bold,
  h2,
  image,
  link,
  p,
  quote,
  toEvent,
  toFaculty,
  toPage,
  toPerson,
  toUrl,
  ul,
  type Localized,
  type MockEvent,
} from './helpers'

// SAMPLE EVENTS: replace with the university's real events once the backend exists.

const alt = {
  economics: {
    en: 'The economics institute building',
    fr: "Le bâtiment de l'institut d'économie",
    ar: 'مبنى معهد العلوم الاقتصادية',
  },
  technical: {
    en: 'The technical sciences building',
    fr: 'Le bâtiment des sciences techniques',
    ar: 'مبنى العلوم التقنية',
  },
  natureLife: {
    en: 'The natural and life sciences faculty',
    fr: 'La faculté des sciences de la nature et de la vie',
    ar: 'كلية علوم الطبيعة والحياة',
  },
  campus: {
    en: 'The main stairs of the campus',
    fr: 'Les grands escaliers du campus',
    ar: 'الدرج الرئيسي للحرم الجامعي',
  },
  graduates: {
    en: 'Graduates in gowns walking on campus',
    fr: 'Des diplômés en toge sur le campus',
    ar: 'خريجون بالأرواب في الحرم الجامعي',
  },
  city: {
    en: 'Painting of the city of Mila at sunset',
    fr: 'Peinture de la ville de Mila au coucher du soleil',
    ar: 'لوحة لمدينة ميلة عند الغروب',
  },
} satisfies Record<string, Localized<string>>

const SIZE = {
  economics: [4160, 3120],
  technical: [399, 517],
  natureLife: [400, 533],
  campus: [720, 540],
  graduates: [1382, 922],
  city: [1280, 853],
} as const

const photo = (id: string, key: keyof typeof SIZE, caption?: Localized<string>) =>
  image(
    id,
    {
      economics: 'com.jpg',
      technical: 'st.jpg',
      natureLife: 'sN.jpg',
      campus: 'IF.jpg',
      graduates: 'et.jpeg',
      city: 'meanImg.jpg',
    }[key],
    [...SIZE[key]],
    alt[key],
    caption,
  )

const MAIN_ADDRESS = {
  en: 'Abdelhafid Boussouf University, Mila 43000, Algeria',
  fr: 'Université Abdelhafid Boussouf, Mila 43000, Algérie',
  ar: 'جامعة عبد الحفيظ بوالصوف، ميلة 43000، الجزائر',
}
const MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=Universit%C3%A9+Abdelhafid+Boussouf+Mila'

export const events: MockEvent[] = [
  {
    id: 'e-001',
    slug: 'international-conference-digital-economy',
    category: 'conference',
    startDate: '2026-10-21T09:00:00+01:00',
    endDate: '2026-10-22T17:00:00+01:00',
    allDay: false,
    isFeatured: true,
    publishedAt: '2026-10-10T10:00:00+01:00',
    updatedAt: '2026-10-23T08:30:00+01:00',
    title: {
      en: 'International Conference on the Digital Economy',
      fr: "Colloque international sur l'économie numérique",
      ar: 'الملتقى الدولي حول الاقتصاد الرقمي',
    },
    summary: {
      en: 'Researchers and experts from Algeria and abroad met to discuss how digital transformation is reshaping business and public services.',
      fr: "Des chercheurs et experts d'Algérie et de l'étranger se sont réunis pour débattre de la transformation numérique des entreprises et des services publics.",
      ar: 'اجتمع باحثون وخبراء من الجزائر وخارجها لمناقشة أثر التحول الرقمي على المؤسسات والخدمات العمومية.',
    },
    content: {
      en: [
        p(
          'The ',
          link(
            'Institute of Economics, Commercial and Management Sciences',
            toFaculty('economics'),
          ),
          ' hosted a ',
          bold('two-day international conference'),
          ' on the digital economy, bringing together more than forty speakers from Algerian and foreign universities.',
        ),
        p(
          'The scientific committee was chaired by ',
          link('Dr. Samira Benali', toPerson('samira-benali')),
          ', and the opening speech was given by the ',
          link('University Rector', toPerson('amirouche-bouchelaghem')),
          '.',
        ),
        h2('Main topics'),
        ul(
          ['E-commerce and digital payment in Algeria'],
          ['Digitalisation of public administration'],
          [
            'The role of ',
            link('start-ups', toEvent('startup-day-from-idea-to-business')),
            ' and business incubators',
          ],
        ),
        p(
          'The conference closed with recommendations to strengthen partnerships between the university and the economic sector, in line with the national strategy of the ',
          link('Ministry of Higher Education', toUrl('https://www.mesrs.dz')),
          '.',
        ),
      ],
      fr: [
        p(
          "L'",
          link(
            'Institut des sciences économiques, commerciales et de gestion',
            toFaculty('economics'),
          ),
          ' a accueilli un ',
          bold('colloque international de deux jours'),
          " consacré à l'économie numérique, réunissant plus de quarante intervenants d'universités algériennes et étrangères.",
        ),
        p(
          'Le comité scientifique était présidé par ',
          link('Dr Samira Benali', toPerson('samira-benali')),
          ", et le discours d'ouverture a été prononcé par le ",
          link("recteur de l'université", toPerson('amirouche-bouchelaghem')),
          '.',
        ),
        h2('Thèmes principaux'),
        ul(
          ['Commerce électronique et paiement numérique en Algérie'],
          ["Numérisation de l'administration publique"],
          [
            'Le rôle des ',
            link('start-ups', toEvent('startup-day-from-idea-to-business')),
            " et des incubateurs d'entreprises",
          ],
        ),
        p(
          "Le colloque s'est clôturé par des recommandations visant à renforcer les partenariats entre l'université et le secteur économique, conformément à la stratégie nationale du ",
          link("ministère de l'Enseignement supérieur", toUrl('https://www.mesrs.dz')),
          '.',
        ),
      ],
      ar: [
        p(
          'احتضن ',
          link('معهد العلوم الاقتصادية والتجارية وعلوم التسيير', toFaculty('economics')),
          ' ',
          bold('ملتقى دوليًا على مدار يومين'),
          ' حول الاقتصاد الرقمي، بمشاركة أكثر من أربعين متدخلًا من جامعات جزائرية وأجنبية.',
        ),
        p(
          'ترأست اللجنة العلمية ',
          link('د. سميرة بن علي', toPerson('samira-benali')),
          '، وألقى كلمة الافتتاح ',
          link('رئيس الجامعة', toPerson('amirouche-bouchelaghem')),
          '.',
        ),
        h2('المحاور الرئيسية'),
        ul(
          ['التجارة الإلكترونية والدفع الرقمي في الجزائر'],
          ['رقمنة الإدارة العمومية'],
          [
            'دور ',
            link('المؤسسات الناشئة', toEvent('startup-day-from-idea-to-business')),
            ' وحاضنات الأعمال',
          ],
        ),
        p(
          'واختُتم الملتقى بتوصيات لتعزيز الشراكة بين الجامعة والقطاع الاقتصادي، تماشيًا مع الاستراتيجية الوطنية لـ',
          link('وزارة التعليم العالي', toUrl('https://www.mesrs.dz')),
          '.',
        ),
      ],
    },
    location: {
      name: {
        en: 'Main Conference Hall',
        fr: 'Grande salle des conférences',
        ar: 'قاعة المحاضرات الكبرى',
      },
      address: MAIN_ADDRESS,
      mapUrl: MAP_URL,
      online: false,
    },
    gallery: [
      photo('img-e1-1', 'economics', {
        en: 'The institute hosting the conference',
        fr: "L'institut qui a accueilli le colloque",
        ar: 'المعهد الذي احتضن الملتقى',
      }),
      photo('img-e1-2', 'campus', {
        en: 'Participants arriving on campus',
        fr: 'Arrivée des participants sur le campus',
        ar: 'وصول المشاركين إلى الحرم الجامعي',
      }),
      photo('img-e1-3', 'technical', {
        en: 'Workshops took place in the technical building',
        fr: 'Les ateliers ont eu lieu dans le bâtiment technique',
        ar: 'جرت الورشات في المبنى التقني',
      }),
      photo('img-e1-4', 'city', {
        en: 'A visit of Mila was offered to guests',
        fr: 'Une visite de Mila a été offerte aux invités',
        ar: 'نُظمت زيارة لمدينة ميلة لفائدة الضيوف',
      }),
    ],
    mainLink: {
      kind: 'external',
      label: { en: 'Conference website', fr: 'Site du colloque', ar: 'موقع الملتقى' },
      url: 'https://example.com/digital-economy-2026',
    },
    links: [
      {
        kind: 'program',
        label: { en: 'Conference programme', fr: 'Programme du colloque', ar: 'برنامج الملتقى' },
        url: 'https://example.com/digital-economy-program.pdf',
      },
      {
        kind: 'livestream',
        label: { en: 'Watch the replay', fr: 'Voir le replay', ar: 'شاهد الإعادة' },
        url: 'https://www.youtube.com/',
      },
    ],
    people: [
      {
        personSlug: 'samira-benali',
        role: 'organizer',
        note: {
          en: 'Chair of the scientific committee',
          fr: 'Présidente du comité scientifique',
          ar: 'رئيسة اللجنة العلمية',
        },
      },
      {
        personSlug: 'amirouche-bouchelaghem',
        role: 'guest',
        note: { en: 'Opening speech', fr: "Discours d'ouverture", ar: 'كلمة الافتتاح' },
      },
      {
        personSlug: 'karim-boudjemaa',
        role: 'speaker',
        note: {
          en: 'Talk: data and digital payment',
          fr: 'Intervention : données et paiement numérique',
          ar: 'مداخلة: البيانات والدفع الرقمي',
        },
      },
    ],
    organizers: [{ kind: 'faculty', slug: 'economics' }],
    tags: {
      en: ['digital economy', 'e-commerce'],
      fr: ['économie numérique', 'e-commerce'],
      ar: ['الاقتصاد الرقمي', 'التجارة الإلكترونية'],
    },
  },
  {
    id: 'e-002',
    slug: 'ai-in-scientific-research-workshop',
    category: 'workshop',
    startDate: '2026-10-14T09:30:00+01:00',
    endDate: '2026-10-14T15:30:00+01:00',
    allDay: false,
    isFeatured: false,
    publishedAt: '2026-10-05T09:00:00+01:00',
    updatedAt: '2026-10-15T11:00:00+01:00',
    title: {
      en: 'Workshop: Artificial Intelligence in Scientific Research',
      fr: "Atelier : l'intelligence artificielle dans la recherche scientifique",
      ar: 'ورشة عمل: الذكاء الاصطناعي في البحث العلمي',
    },
    summary: {
      en: 'A hands-on workshop for doctoral students and teachers on using AI tools responsibly in research and academic writing.',
      fr: "Un atelier pratique destiné aux doctorants et enseignants sur l'usage responsable des outils d'IA dans la recherche et la rédaction scientifique.",
      ar: 'ورشة تطبيقية لطلبة الدكتوراه والأساتذة حول الاستخدام المسؤول لأدوات الذكاء الاصطناعي في البحث والكتابة الأكاديمية.',
    },
    content: {
      en: [
        p(
          'Organised by the ',
          link('Mathematics and Computer Science department', toFaculty('math-cs')),
          ' and led by ',
          link('Prof. Karim Boudjemaa', toPerson('karim-boudjemaa')),
          ', this workshop introduced participants to AI tools for literature review, data analysis and writing support.',
        ),
        p(
          'Trainers also addressed research ethics, plagiarism and the limits of these tools, so that AI supports rather than replaces scientific reasoning. Many participants were preparing for the ',
          link('Doctoral Research Days', toEvent('doctoral-research-days')),
          '.',
        ),
        quote(
          'Prof. Karim Boudjemaa',
          'A good tool does not think for the researcher; it frees time for thinking.',
        ),
      ],
      fr: [
        p(
          'Organisé par le ',
          link('département de mathématiques et informatique', toFaculty('math-cs')),
          ' et animé par le ',
          link('Pr Karim Boudjemaa', toPerson('karim-boudjemaa')),
          ", cet atelier a présenté aux participants des outils d'IA pour la revue de littérature, l'analyse de données et l'aide à la rédaction.",
        ),
        p(
          "Les formateurs ont également abordé l'éthique de la recherche, le plagiat et les limites de ces outils, afin que l'IA accompagne le raisonnement scientifique sans le remplacer. De nombreux participants préparaient les ",
          link('Journées de la recherche doctorale', toEvent('doctoral-research-days')),
          '.',
        ),
        quote(
          'Pr Karim Boudjemaa',
          'Un bon outil ne pense pas à la place du chercheur ; il lui libère du temps pour réfléchir.',
        ),
      ],
      ar: [
        p(
          'نظّم ',
          link('قسم الرياضيات والإعلام الآلي', toFaculty('math-cs')),
          ' هذه الورشة بتأطير من ',
          link('أ.د. كريم بوجمعة', toPerson('karim-boudjemaa')),
          '، لتعريف المشاركين بأدوات الذكاء الاصطناعي في مراجعة الأدبيات وتحليل البيانات والمساعدة في الكتابة.',
        ),
        p(
          'كما تطرق المؤطرون إلى أخلاقيات البحث والسرقة العلمية وحدود هذه الأدوات، حتى يكون الذكاء الاصطناعي سندًا للتفكير العلمي لا بديلًا عنه. وكان كثير من المشاركين يستعدون لـ',
          link('أيام البحث الدكتورالي', toEvent('doctoral-research-days')),
          '.',
        ),
        quote(
          'أ.د. كريم بوجمعة',
          'الأداة الجيدة لا تفكر مكان الباحث، بل تمنحه وقتًا أكثر للتفكير.',
        ),
      ],
    },
    location: {
      name: {
        en: 'Computing & Networks Center',
        fr: 'Centre de calcul et des réseaux',
        ar: 'مركز الحساب والشبكات',
      },
      address: MAIN_ADDRESS,
      mapUrl: MAP_URL,
      online: false,
    },
    gallery: [
      photo('img-e2-1', 'technical', {
        en: 'The workshop venue',
        fr: "Le lieu de l'atelier",
        ar: 'مكان الورشة',
      }),
      photo('img-e2-2', 'campus'),
    ],
    mainLink: {
      kind: 'document',
      label: { en: 'Workshop resources', fr: "Ressources de l'atelier", ar: 'موارد الورشة' },
      url: 'https://example.com/ai-workshop-resources',
    },
    links: [
      {
        kind: 'document',
        label: {
          en: 'Workshop slides (PDF)',
          fr: "Support de l'atelier (PDF)",
          ar: 'عرض الورشة (PDF)',
        },
        url: 'https://example.com/ai-workshop-slides.pdf',
      },
    ],
    people: [
      { personSlug: 'karim-boudjemaa', role: 'organizer' },
      { personSlug: 'nadia-mekhalfa', role: 'moderator' },
    ],
    organizers: [{ kind: 'faculty', slug: 'math-cs' }],
    tags: {
      en: ['artificial intelligence', 'research ethics'],
      fr: ['intelligence artificielle', 'éthique'],
      ar: ['الذكاء الاصطناعي', 'أخلاقيات البحث'],
    },
  },
  {
    id: 'e-003',
    slug: 'opening-academic-year-2026-2027',
    category: 'ceremony',
    startDate: '2026-09-28T10:00:00+01:00',
    endDate: '2026-09-28T13:00:00+01:00',
    allDay: false,
    isFeatured: true,
    publishedAt: '2026-09-20T09:00:00+01:00',
    updatedAt: '2026-09-29T09:00:00+01:00',
    title: {
      en: 'Official Opening of the 2026–2027 Academic Year',
      fr: "Ouverture officielle de l'année universitaire 2026-2027",
      ar: 'الافتتاح الرسمي للسنة الجامعية 2026-2027',
    },
    summary: {
      en: 'The university welcomed new students and launched the academic year in the presence of local authorities, teachers and staff.',
      fr: "L'université a accueilli ses nouveaux étudiants et lancé l'année universitaire en présence des autorités locales, des enseignants et du personnel.",
      ar: 'استقبلت الجامعة طلبتها الجدد وأعطت إشارة انطلاق السنة الجامعية بحضور السلطات المحلية والأساتذة والموظفين.',
    },
    content: {
      en: [
        p(
          'The ',
          link('Rector', toPerson('amirouche-bouchelaghem')),
          ' opened the new academic year with a speech on the university’s priorities: teaching quality, digitalisation and openness to the socio-economic environment. The full text is available in the ',
          link("Rector's Address", toPage('rectorate/address')),
          '.',
        ),
        p(
          'New students then toured the faculties, libraries and student services, and met the clubs presented by ',
          link('Yacine Merabet', toPerson('yacine-merabet')),
          ', head of student activities.',
        ),
      ],
      fr: [
        p(
          'Le ',
          link('recteur', toPerson('amirouche-bouchelaghem')),
          " a ouvert la nouvelle année universitaire par un discours sur les priorités de l'université : qualité de l'enseignement, numérisation et ouverture sur l'environnement socio-économique. Le texte complet est disponible dans le ",
          link('mot du recteur', toPage('rectorate/address')),
          '.',
        ),
        p(
          'Les nouveaux étudiants ont ensuite visité les facultés, les bibliothèques et les services aux étudiants, et rencontré les clubs présentés par ',
          link('Yacine Merabet', toPerson('yacine-merabet')),
          ', responsable des activités étudiantes.',
        ),
      ],
      ar: [
        p(
          'افتتح ',
          link('رئيس الجامعة', toPerson('amirouche-bouchelaghem')),
          ' السنة الجامعية الجديدة بكلمة حول أولويات الجامعة: جودة التعليم والرقمنة والانفتاح على المحيط الاجتماعي والاقتصادي. النص الكامل متوفر في ',
          link('كلمة رئيس الجامعة', toPage('rectorate/address')),
          '.',
        ),
        p(
          'ثم قام الطلبة الجدد بجولة في الكليات والمكتبات ومصالح الطلبة، والتقوا بالنوادي التي قدّمها ',
          link('ياسين مرابط', toPerson('yacine-merabet')),
          '، رئيس مصلحة الأنشطة الطلابية.',
        ),
      ],
    },
    location: {
      name: { en: 'University Auditorium', fr: "Auditorium de l'université", ar: 'مدرج الجامعة' },
      address: MAIN_ADDRESS,
      mapUrl: MAP_URL,
      online: false,
    },
    gallery: [
      photo('img-e3-1', 'campus', {
        en: 'Students gathering on the main stairs',
        fr: 'Les étudiants réunis sur les grands escaliers',
        ar: 'تجمع الطلبة على الدرج الرئيسي',
      }),
      photo('img-e3-2', 'economics'),
      photo('img-e3-3', 'natureLife'),
    ],
    mainLink: null,
    links: [],
    people: [
      {
        personSlug: 'amirouche-bouchelaghem',
        role: 'guest',
        note: { en: 'Opening speech', fr: "Discours d'ouverture", ar: 'كلمة الافتتاح' },
      },
      { personSlug: 'yacine-merabet', role: 'coordinator' },
    ],
    organizers: [{ kind: 'service', slug: 'rectorate' }],
    tags: { en: ['academic year'], fr: ['rentrée universitaire'], ar: ['الدخول الجامعي'] },
  },
  {
    id: 'e-004',
    slug: 'graduation-ceremony-class-of-2026',
    category: 'ceremony',
    startDate: '2026-07-02T10:00:00+01:00',
    endDate: '2026-07-02T13:00:00+01:00',
    allDay: false,
    isFeatured: true,
    publishedAt: '2026-06-25T09:00:00+01:00',
    updatedAt: '2026-07-03T10:00:00+01:00',
    title: {
      en: 'Graduation Ceremony – Class of 2026',
      fr: 'Cérémonie de remise des diplômes – Promotion 2026',
      ar: 'حفل تخرج دفعة 2026',
    },
    summary: {
      en: 'Families, teachers and graduates celebrated the achievements of the class of 2026 across all faculties and institutes.',
      fr: 'Familles, enseignants et diplômés ont célébré la réussite de la promotion 2026 de toutes les facultés et instituts.',
      ar: 'احتفل الأولياء والأساتذة والخريجون بنجاح دفعة 2026 من مختلف الكليات والمعاهد.',
    },
    content: {
      en: [
        p(
          bold('More than two thousand graduates'),
          ' received their diplomas during a ceremony held on the main campus esplanade.',
        ),
        p(
          'The best students of each specialty were honoured, and the ',
          link('Rector', toPerson('amirouche-bouchelaghem')),
          ' encouraged graduates to stay connected with the university through its alumni network.',
        ),
      ],
      fr: [
        p(
          bold('Plus de deux mille diplômés'),
          " ont reçu leur diplôme lors d'une cérémonie organisée sur l'esplanade du campus principal.",
        ),
        p(
          'Les majors de chaque spécialité ont été honorés, et le ',
          link('recteur', toPerson('amirouche-bouchelaghem')),
          ' a invité les diplômés à rester liés à l’université à travers son réseau d’anciens.',
        ),
      ],
      ar: [
        p(bold('تسلّم أكثر من ألفي خريج'), ' شهاداتهم خلال حفل أقيم بساحة الحرم الجامعي الرئيسي.'),
        p(
          'وتم تكريم المتفوقين في كل تخصص، ودعا ',
          link('رئيس الجامعة', toPerson('amirouche-bouchelaghem')),
          ' الخريجين إلى البقاء على تواصل مع الجامعة عبر شبكة خريجيها.',
        ),
      ],
    },
    location: {
      name: {
        en: 'Main Campus Esplanade',
        fr: 'Esplanade du campus principal',
        ar: 'ساحة الحرم الجامعي الرئيسي',
      },
      address: MAIN_ADDRESS,
      mapUrl: MAP_URL,
      online: false,
    },
    gallery: [
      photo('img-e4-1', 'graduates', {
        en: 'Graduates walking to the ceremony',
        fr: 'Les diplômés en route vers la cérémonie',
        ar: 'الخريجون في طريقهم إلى الحفل',
      }),
      photo('img-e4-2', 'campus'),
      photo('img-e4-3', 'city'),
    ],
    mainLink: {
      kind: 'external',
      label: {
        en: 'Photo album of the ceremony',
        fr: 'Album photo de la cérémonie',
        ar: 'ألبوم صور الحفل',
      },
      url: 'https://example.com/graduation-2026-album',
    },
    links: [
      {
        kind: 'livestream',
        label: { en: 'Watch the ceremony', fr: 'Revoir la cérémonie', ar: 'شاهد الحفل' },
        url: 'https://www.youtube.com/',
      },
    ],
    people: [
      { personSlug: 'amirouche-bouchelaghem', role: 'guest' },
      { personSlug: 'yacine-merabet', role: 'organizer' },
    ],
    organizers: [{ kind: 'service', slug: 'rectorate' }],
    tags: { en: ['graduation'], fr: ['diplômes'], ar: ['تخرج'] },
  },
  {
    id: 'e-005',
    slug: 'green-campus-day',
    category: 'studentLife',
    startDate: '2026-06-05T08:30:00+01:00',
    endDate: '2026-06-05T12:30:00+01:00',
    allDay: false,
    isFeatured: false,
    publishedAt: '2026-05-28T09:00:00+01:00',
    updatedAt: '2026-06-06T09:00:00+01:00',
    title: {
      en: 'Green Campus Day: Tree Planting Campaign',
      fr: 'Journée campus vert : campagne de plantation d’arbres',
      ar: 'يوم الحرم الأخضر: حملة تشجير',
    },
    summary: {
      en: 'Students and staff planted hundreds of trees across the campus to mark World Environment Day.',
      fr: "Étudiants et personnel ont planté des centaines d'arbres sur le campus à l'occasion de la Journée mondiale de l'environnement.",
      ar: 'غرس الطلبة والموظفون مئات الأشجار عبر الحرم الجامعي بمناسبة اليوم العالمي للبيئة.',
    },
    content: {
      en: [
        p(
          'Led by the environmental club and the ',
          link('Faculty of Natural and Life Sciences', toFaculty('nature-life')),
          ', the campaign brought together volunteers from every faculty.',
        ),
        p(
          link('Dr. Nadia Mekhalfa', toPerson('nadia-mekhalfa')),
          ' explained the choice of local species adapted to the Mila climate, and students committed to caring for the new green spaces.',
        ),
      ],
      fr: [
        p(
          "Menée par le club de l'environnement et la ",
          link('Faculté des sciences de la nature et de la vie', toFaculty('nature-life')),
          ', la campagne a réuni des bénévoles de toutes les facultés.',
        ),
        p(
          link('Dr Nadia Mekhalfa', toPerson('nadia-mekhalfa')),
          ' a expliqué le choix d’espèces locales adaptées au climat de Mila, et les étudiants se sont engagés à entretenir les nouveaux espaces verts.',
        ),
      ],
      ar: [
        p(
          'قاد الحملةَ نادي البيئة و',
          link('كلية علوم الطبيعة والحياة', toFaculty('nature-life')),
          '، بمشاركة متطوعين من مختلف الكليات.',
        ),
        p(
          'وشرحت ',
          link('د. نادية مخالفة', toPerson('nadia-mekhalfa')),
          ' اختيار أنواع محلية تتلاءم مع مناخ ميلة، والتزم الطلبة بالعناية بالمساحات الخضراء الجديدة.',
        ),
      ],
    },
    location: {
      name: {
        en: 'Faculty of Natural and Life Sciences',
        fr: 'Faculté des sciences de la nature et de la vie',
        ar: 'كلية علوم الطبيعة والحياة',
      },
      address: MAIN_ADDRESS,
      mapUrl: MAP_URL,
      online: false,
    },
    gallery: [photo('img-e5-1', 'natureLife'), photo('img-e5-2', 'campus')],
    mainLink: null,
    links: [],
    people: [
      { personSlug: 'nadia-mekhalfa', role: 'organizer' },
      { personSlug: 'yacine-merabet', role: 'coordinator' },
    ],
    organizers: [
      { kind: 'faculty', slug: 'nature-life' },
      { kind: 'club', slug: 'environment-club' },
    ],
    tags: { en: ['environment'], fr: ['environnement'], ar: ['البيئة'] },
  },
  {
    id: 'e-006',
    slug: 'doctoral-research-days',
    category: 'research',
    startDate: '2026-05-18T00:00:00+01:00',
    endDate: '2026-05-20T00:00:00+01:00',
    allDay: true,
    isFeatured: false,
    publishedAt: '2026-05-05T09:00:00+01:00',
    updatedAt: '2026-05-21T09:00:00+01:00',
    title: {
      en: 'Doctoral Research Days',
      fr: 'Journées de la recherche doctorale',
      ar: 'أيام البحث الدكتورالي',
    },
    summary: {
      en: 'Doctoral students presented their work to juries and peers during three days of talks, posters and debates.',
      fr: 'Les doctorants ont présenté leurs travaux devant des jurys et leurs pairs lors de trois jours de communications, posters et débats.',
      ar: 'عرض طلبة الدكتوراه أعمالهم أمام لجان علمية وزملائهم خلال ثلاثة أيام من المداخلات والملصقات العلمية والنقاشات.',
    },
    content: {
      en: [
        p(
          'The university’s research laboratories organised these days to give doctoral students a space to share progress and receive feedback.',
        ),
        p(
          'Awards were given for the best presentation and the best poster in each field. Several participants had attended the ',
          link('AI in research workshop', toEvent('ai-in-scientific-research-workshop')),
          ' earlier in the year.',
        ),
      ],
      fr: [
        p(
          "Les laboratoires de recherche de l'université ont organisé ces journées pour offrir aux doctorants un espace de partage et de retours sur leurs travaux.",
        ),
        p(
          "Des prix ont récompensé la meilleure communication et le meilleur poster dans chaque domaine. Plusieurs participants avaient suivi l'",
          link('atelier sur l’IA dans la recherche', toEvent('ai-in-scientific-research-workshop')),
          '.',
        ),
      ],
      ar: [
        p(
          'نظمت مخابر البحث بالجامعة هذه الأيام لتوفير فضاء يتبادل فيه طلبة الدكتوراه تقدم أعمالهم ويتلقون الملاحظات.',
        ),
        p(
          'ومُنحت جوائز لأفضل مداخلة وأفضل ملصق علمي في كل ميدان. وكان عدد من المشاركين قد حضروا ',
          link('ورشة الذكاء الاصطناعي في البحث', toEvent('ai-in-scientific-research-workshop')),
          '.',
        ),
      ],
    },
    location: {
      name: {
        en: 'Research Laboratories Building',
        fr: 'Bâtiment des laboratoires de recherche',
        ar: 'مبنى مخابر البحث',
      },
      address: MAIN_ADDRESS,
      mapUrl: MAP_URL,
      online: false,
    },
    gallery: [photo('img-e6-1', 'city'), photo('img-e6-2', 'technical')],
    mainLink: {
      kind: 'document',
      label: { en: 'Book of abstracts', fr: 'Recueil des résumés', ar: 'كتاب الملخصات' },
      url: 'https://example.com/doctoral-days-abstracts.pdf',
    },
    links: [],
    people: [
      { personSlug: 'karim-boudjemaa', role: 'moderator' },
      { personSlug: 'samira-benali', role: 'speaker' },
    ],
    organizers: [{ kind: 'lab', slug: 'research-labs' }],
    tags: { en: ['doctorate'], fr: ['doctorat'], ar: ['الدكتوراه'] },
  },
  {
    id: 'e-007',
    slug: 'startup-day-from-idea-to-business',
    category: 'workshop',
    startDate: '2026-04-22T09:00:00+01:00',
    endDate: '2026-04-22T16:00:00+01:00',
    allDay: false,
    isFeatured: false,
    publishedAt: '2026-04-10T09:00:00+01:00',
    updatedAt: '2026-04-23T09:00:00+01:00',
    title: {
      en: 'Startup Day: From Idea to Business',
      fr: "Startup Day : de l'idée à l'entreprise",
      ar: 'يوم المؤسسات الناشئة: من الفكرة إلى المشروع',
    },
    summary: {
      en: 'Students pitched their projects to entrepreneurs and support agencies, with coaching sessions on business models and funding.',
      fr: "Les étudiants ont présenté leurs projets à des entrepreneurs et organismes d'accompagnement, avec des ateliers sur les modèles d'affaires et le financement.",
      ar: 'قدّم الطلبة مشاريعهم أمام رواد أعمال وهيئات مرافقة، مع حصص تدريبية حول نماذج الأعمال والتمويل.',
    },
    content: {
      en: [
        p(
          'The university business incubator, coordinated by ',
          link('Leila Hamidi', toPerson('leila-hamidi')),
          ', invited student teams to present their ideas in front of a jury of entrepreneurs and support agencies.',
        ),
        p(
          'The three best projects won support from the incubator to develop a prototype over the next academic year.',
        ),
      ],
      fr: [
        p(
          "L'incubateur d'entreprises de l'université, coordonné par ",
          link('Leila Hamidi', toPerson('leila-hamidi')),
          ", a invité des équipes d'étudiants à présenter leurs idées devant un jury d'entrepreneurs et d'organismes d'accompagnement.",
        ),
        p(
          "Les trois meilleurs projets bénéficieront d'un accompagnement de l'incubateur pour développer un prototype durant l'année universitaire suivante.",
        ),
      ],
      ar: [
        p(
          'دعت حاضنة الأعمال بالجامعة، التي تنسقها ',
          link('ليلى حميدي', toPerson('leila-hamidi')),
          '، فرقًا طلابية لعرض أفكارها أمام لجنة من رواد الأعمال وهيئات المرافقة.',
        ),
        p(
          'وستستفيد أفضل ثلاثة مشاريع من مرافقة الحاضنة لتطوير نموذج أولي خلال السنة الجامعية المقبلة.',
        ),
      ],
    },
    location: {
      name: { en: 'Business Incubator', fr: "Incubateur d'entreprises", ar: 'حاضنة الأعمال' },
      address: MAIN_ADDRESS,
      mapUrl: MAP_URL,
      online: false,
    },
    gallery: [photo('img-e7-1', 'economics'), photo('img-e7-2', 'campus')],
    mainLink: {
      kind: 'registration',
      label: {
        en: 'Apply to the incubator',
        fr: "Candidater à l'incubateur",
        ar: 'التسجيل في الحاضنة',
      },
      url: 'https://example.com/incubator-application',
    },
    links: [
      {
        kind: 'registration',
        label: {
          en: 'Apply for next edition',
          fr: 'Candidater à la prochaine édition',
          ar: 'سجّل في الطبعة القادمة',
        },
        url: 'https://example.com/startup-day-registration',
      },
    ],
    people: [
      { personSlug: 'leila-hamidi', role: 'organizer' },
      {
        personSlug: 'samira-benali',
        role: 'speaker',
        note: {
          en: 'Coaching: business models',
          fr: "Coaching : modèles d'affaires",
          ar: 'تدريب: نماذج الأعمال',
        },
      },
    ],
    organizers: [
      { kind: 'service', slug: 'incubator' },
      { kind: 'faculty', slug: 'economics' },
    ],
    tags: { en: ['entrepreneurship'], fr: ['entrepreneuriat'], ar: ['ريادة الأعمال'] },
  },
]
