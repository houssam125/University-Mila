import type { LanguageCode } from '@/i18n'

// Biography of Abdelhafid Boussouf, after whom the university is named.
// Facts come from the English and French Wikipedia articles (checked October 2026) and the sources
// they cite (Le Monde, 3 January 1981; Mohammed Harbi, "Le Drame algérien", 1995).
// Photos are on Wikimedia Commons, public domain in Algeria (PD-Algeria), hotlinked with credit.

type Localized<T> = Record<LanguageCode, T>

export const BOUSSOUF_PATH = '/abdelhafid-boussouf'

const COMMONS = 'https://upload.wikimedia.org/wikipedia/commons/'
const COMMONS_PAGE = 'https://commons.wikimedia.org/wiki/File:'
const PUBLIC_DOMAIN = 'Public domain (PD-Algeria)'

export interface BoussoufPhoto {
  src: string
  /** Wikimedia Commons file page, for the credits */
  sourcePage: string
  /** Author and licence shown in the credits */
  credit: string
  /** Required for Creative Commons licences */
  licenseUrl?: string
  width: number
  height: number
  caption: Localized<string>
}

export const portrait: BoussoufPhoto = {
  src: `${COMMONS}9/9a/Abdelhafid_Boussouf_-_Si_Mabrouk.jpg`,
  credit: PUBLIC_DOMAIN,
  sourcePage: `${COMMONS_PAGE}Abdelhafid_Boussouf_-_Si_Mabrouk.jpg`,
  width: 595,
  height: 815,
  caption: {
    en: 'Abdelhafid Boussouf, known as "Si Mabrouk"',
    fr: 'Abdelhafid Boussouf, dit « Si Mabrouk »',
    ar: 'عبد الحفيظ بوالصوف المدعو «سي مبروك»',
  },
}

export const photos: BoussoufPhoto[] = [
  portrait,
  {
    src: `${COMMONS}d/d9/Abdelhafid_Boussouf.jpg`,
    credit: PUBLIC_DOMAIN,
    sourcePage: `${COMMONS_PAGE}Abdelhafid_Boussouf.jpg`,
    width: 745,
    height: 470,
    caption: {
      en: 'As a member of the Provisional Government of the Algerian Republic (GPRA)',
      fr: 'Membre du Gouvernement provisoire de la République algérienne (GPRA)',
      ar: 'عضوًا في الحكومة المؤقتة للجمهورية الجزائرية',
    },
  },
  {
    src: `${COMMONS}e/e4/MALG_Wilaya_V_Algerian_War.png`,
    credit: PUBLIC_DOMAIN,
    sourcePage: `${COMMONS_PAGE}MALG_Wilaya_V_Algerian_War.png`,
    width: 962,
    height: 557,
    caption: {
      en: 'The Wilaya V command: Boussouf (1), Larbi Ben M’hidi (2), Houari Boumediene (3)',
      fr: 'Le commandement de la Wilaya V : Boussouf (1), Larbi Ben M’hidi (2), Houari Boumediene (3)',
      ar: 'قيادة الولاية الخامسة: بوالصوف (1)، العربي بن مهيدي (2)، هواري بومدين (3)',
    },
  },
  {
    src: `${COMMONS}6/6e/Hocine_Ait_Ahmed_avec_Krim_Belkacem%2C_Abdelhafid_Boussouf%2C_Mohammedi_Said%2C_Mohamed_Boudiaf%2C_%2C_Ahmed_Ben_Bella%2C_Benyoucef_Benkhedda%2C_Mhamed_Yazid%2C_Rabah_Bitat%2C_Mohamed_Khider_et_Bentobbal.png`,
    credit: PUBLIC_DOMAIN,
    sourcePage: `${COMMONS_PAGE}Hocine_Ait_Ahmed_avec_Krim_Belkacem,_Abdelhafid_Boussouf,_Mohammedi_Said,_Mohamed_Boudiaf,_,_Ahmed_Ben_Bella,_Benyoucef_Benkhedda,_Mhamed_Yazid,_Rabah_Bitat,_Mohamed_Khider_et_Bentobbal.png`,
    width: 898,
    height: 589,
    caption: {
      en: 'With leaders of the Revolution, including Krim Belkacem, Mohamed Boudiaf, Ahmed Ben Bella and Hocine Aït Ahmed (1963)',
      fr: 'Avec des dirigeants de la Révolution, dont Krim Belkacem, Mohamed Boudiaf, Ahmed Ben Bella et Hocine Aït Ahmed (1963)',
      ar: 'مع قادة الثورة، ومنهم كريم بلقاسم ومحمد بوضياف وأحمد بن بلة وحسين آيت أحمد (1963)',
    },
  },
]

export const clanOujda: BoussoufPhoto = {
  src: `${COMMONS}e/e4/Clan_d%27Oujda_1958.jpg`,
  credit: PUBLIC_DOMAIN,
  sourcePage: `${COMMONS_PAGE}Clan_d%27Oujda_1958.jpg`,
  width: 1985,
  height: 1298,
  caption: {
    en: 'Colonel Boussouf (4) with ALN officers of the western command, 1958',
    fr: "Le colonel Boussouf (4) avec des officiers de l'ALN du commandement de l'Ouest, 1958",
    ar: 'العقيد بوالصوف (4) مع ضباط جيش التحرير في قيادة الغرب، 1958',
  },
}

const malgOperators: BoussoufPhoto = {
  src: `${COMMONS}e/e7/DTN-MALG_Algerian_War.png`,
  credit: PUBLIC_DOMAIN,
  sourcePage: `${COMMONS_PAGE}DTN-MALG_Algerian_War.png`,
  width: 804,
  height: 540,
  caption: {
    en: 'Radio operators of the MALG transmission service, the network Boussouf built',
    fr: 'Opérateurs radio des transmissions du MALG, le réseau bâti par Boussouf',
    ar: 'عمال الإشارة اللاسلكية في وزارة التسليح والاتصالات العامة، الشبكة التي بناها بوالصوف',
  },
}

const gpraFounding: BoussoufPhoto = {
  src: `${COMMONS}5/56/Establishment_of_the_Provisional_Algerian_Government_1958.jpg`,
  credit: PUBLIC_DOMAIN,
  sourcePage: `${COMMONS_PAGE}Establishment_of_the_Provisional_Algerian_Government_1958.jpg`,
  width: 580,
  height: 350,
  caption: {
    en: 'The Provisional Government of the Algerian Republic at its founding, 19 September 1958',
    fr: 'Le Gouvernement provisoire de la République algérienne à sa création, 19 septembre 1958',
    ar: 'الحكومة المؤقتة للجمهورية الجزائرية عند تأسيسها، 19 سبتمبر 1958',
  },
}

const elMoudjahid: BoussoufPhoto = {
  src: `${COMMONS}d/d8/El_Moudjahid_Fr_%2829HS%29_-_19-09-1958_-_Le_Gouvernement_provisoire_de_la_R%C3%A9poublique_alg%C3%A9rienne_est_constitu%C3%A9.jpg`,
  credit: PUBLIC_DOMAIN,
  sourcePage: `${COMMONS_PAGE}El_Moudjahid_Fr_(29HS)_-_19-09-1958_-_Le_Gouvernement_provisoire_de_la_R%C3%A9poublique_alg%C3%A9rienne_est_constitu%C3%A9.jpg`,
  width: 1333,
  height: 2000,
  caption: {
    en: 'El Moudjahid, 19 September 1958: the GPRA is formed, with Abdelhafid Boussouf among its ministers',
    fr: 'El Moudjahid, 19 septembre 1958 : le GPRA est constitué, avec Abdelhafid Boussouf parmi ses ministres',
    ar: 'جريدة المجاهد، 19 سبتمبر 1958: تأسيس الحكومة المؤقتة، ومن بين وزرائها عبد الحفيظ بوالصوف',
  },
}

photos.push(clanOujda, malgOperators, gpraFounding, elMoudjahid)

// The two first parts of the story: his hometown and the party he joined
const oldMilaGate: BoussoufPhoto = {
  src: `${COMMONS}thumb/b/be/Bab_el_Bled_a_vieux_Mila.jpg/1280px-Bab_el_Bled_a_vieux_Mila.jpg`,
  sourcePage: `${COMMONS_PAGE}Bab_el_Bled_a_vieux_Mila.jpg`,
  credit: 'Tonivettel, 2016 · CC BY-SA 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  width: 1280,
  height: 781,
  caption: {
    en: 'Bab el Bled, the ancient gate of old Mila, the town where he was born',
    fr: 'Bab el Bled, la porte ancienne du vieux Mila, la ville où il est né',
    ar: 'باب البلد، البوابة العتيقة لميلة القديمة، المدينة التي وُلد فيها',
  },
}

const messaliHadj: BoussoufPhoto = {
  src: `${COMMONS}1/18/Messali_Hadj_1934.jpg`,
  sourcePage: `${COMMONS_PAGE}Messali_Hadj_1934.jpg`,
  credit: 'El Ouma, 1934 (BnF Gallica) · CC0',
  width: 984,
  height: 1254,
  caption: {
    en: 'Messali Hadj, founder of the Algerian People’s Party (PPA) that Boussouf joined, in 1934',
    fr: 'Messali Hadj, fondateur du Parti du peuple algérien (PPA) auquel Boussouf adhéra, en 1934',
    ar: 'مصالي الحاج، مؤسس حزب الشعب الجزائري الذي انضم إليه بوالصوف، سنة 1934',
  },
}

/** Every image used on the page, for the credits */
export const creditedPhotos: BoussoufPhoto[] = [oldMilaGate, messaliHadj, ...photos]

export const profile = {
  name: { en: 'Abdelhafid Boussouf', fr: 'Abdelhafid Boussouf', ar: 'عبد الحفيظ بوالصوف' },
  alias: { en: 'Si Mabrouk', fr: 'Si Mabrouk', ar: 'سي مبروك' },
  years: '1926 – 1980',
  tagline: {
    en: 'Revolutionary, strategist and father of the Algerian intelligence services',
    fr: 'Révolutionnaire, stratège et père des services de renseignement algériens',
    ar: 'ثائر واستراتيجي وأب أجهزة الاستخبارات الجزائرية',
  },
  /** Short text for the menu preview */
  excerpt: {
    en: 'Born in Mila in 1926, he commanded Wilaya V during the War of Independence and built the intelligence and communications network of the Revolution. Our university proudly bears his name.',
    fr: 'Né à Mila en 1926, il a commandé la Wilaya V pendant la guerre de libération et bâti le réseau de renseignement et de transmissions de la Révolution. Notre université porte fièrement son nom.',
    ar: 'وُلد بميلة سنة 1926، وقاد الولاية الخامسة خلال حرب التحرير وبنى شبكة الاستخبارات والاتصالات للثورة. وتحمل جامعتنا اسمه بكل فخر.',
  },
}

export type FactId = 'born' | 'died' | 'alias' | 'rank' | 'knownFor'

export const facts: { id: FactId; label: Localized<string>; value: Localized<string> }[] = [
  {
    id: 'born',
    label: { en: 'Born', fr: 'Naissance', ar: 'الميلاد' },
    value: { en: '17 August 1926, Mila', fr: '17 août 1926, Mila', ar: '17 أوت 1926، ميلة' },
  },
  {
    id: 'died',
    label: { en: 'Died', fr: 'Décès', ar: 'الوفاة' },
    value: {
      en: '31 December 1980, Paris',
      fr: '31 décembre 1980, Paris',
      ar: '31 ديسمبر 1980، باريس',
    },
  },
  {
    id: 'alias',
    label: { en: 'Nom de guerre', fr: 'Nom de guerre', ar: 'الاسم الثوري' },
    value: { en: 'Si Mabrouk', fr: 'Si Mabrouk', ar: 'سي مبروك' },
  },
  {
    id: 'rank',
    label: { en: 'Rank', fr: 'Grade', ar: 'الرتبة' },
    value: { en: 'Colonel of the ALN', fr: "Colonel de l'ALN", ar: 'عقيد في جيش التحرير الوطني' },
  },
  {
    id: 'knownFor',
    label: { en: 'Known for', fr: 'Connu pour', ar: 'اشتهر بـ' },
    value: {
      en: 'Commander of Wilaya V, founder of the MALG, minister in the GPRA',
      fr: 'Chef de la Wilaya V, fondateur du MALG, ministre du GPRA',
      ar: 'قائد الولاية الخامسة، مؤسس وزارة التسليح والاتصالات العامة، وزير في الحكومة المؤقتة',
    },
  },
]

/** Each part of the story is illustrated by a photo, or by a designed panel when no photo exists */
export type SectionMedia =
  | { kind: 'photo'; photo: BoussoufPhoto }
  | { kind: 'panel'; headline: Localized<string>; caption: Localized<string> }

export interface BoussoufSection {
  id: string
  title: Localized<string>
  paragraphs: Localized<string[]>
  media: SectionMedia
}

export const sections: BoussoufSection[] = [
  {
    id: 'early-life',
    title: { en: 'Early life in Mila', fr: 'Jeunesse à Mila', ar: 'النشأة في ميلة' },
    media: { kind: 'photo', photo: oldMilaGate },
    paragraphs: {
      en: [
        'Abdelhafid Boussouf was born on 17 August 1926 in Mila, in the north of the Constantine region, where he completed his primary schooling. Like many young Algerians of his generation, he grew up under colonial rule and was drawn early to the national movement.',
      ],
      fr: [
        'Abdelhafid Boussouf naît le 17 août 1926 à Mila, dans le Nord-Constantinois, où il effectue ses études primaires. Comme beaucoup de jeunes Algériens de sa génération, il grandit sous le régime colonial et rejoint très tôt le mouvement national.',
      ],
      ar: [
        'وُلد عبد الحفيظ بوالصوف يوم 17 أوت 1926 بميلة في الشمال القسنطيني، وبها تلقى تعليمه الابتدائي. وكغيره من شباب جيله، نشأ في ظل الاستعمار وانخرط مبكرًا في الحركة الوطنية.',
      ],
    },
  },
  {
    id: 'activist',
    title: { en: 'The years of struggle', fr: 'Les années de militantisme', ar: 'سنوات النضال' },
    media: { kind: 'photo', photo: messaliHadj },
    paragraphs: {
      en: [
        'In Constantine he joined the Algerian People’s Party (PPA), where he met future leaders of the Revolution such as Mohamed Boudiaf, Larbi Ben M’hidi and Lakhdar Bentobbal.',
        'He became one of the leading members of the Special Organisation (OS), the clandestine armed wing of the movement. When the OS was uncovered in 1950, he went underground in western Algeria, near Oran, and took charge of the Tlemcen district for the MTLD.',
      ],
      fr: [
        'À Constantine, il adhère au Parti du peuple algérien (PPA), où il côtoie de futurs dirigeants de la Révolution comme Mohamed Boudiaf, Larbi Ben M’hidi et Lakhdar Bentobbal.',
        "Il devient l'un des membres les plus éminents de l'Organisation spéciale (OS), la branche armée clandestine du mouvement. Après le démantèlement de l'OS en 1950, il passe à la clandestinité dans l'Ouest, près d'Oran, et prend la tête de la circonscription de Tlemcen du MTLD.",
      ],
      ar: [
        'انضم في قسنطينة إلى حزب الشعب الجزائري، حيث التقى بقادة الثورة لاحقًا مثل محمد بوضياف والعربي بن مهيدي ولخضر بن طوبال.',
        'وأصبح من أبرز أعضاء المنظمة الخاصة، الجناح المسلح السري للحركة. وبعد اكتشاف المنظمة سنة 1950، انتقل إلى العمل السري في الغرب الجزائري قرب وهران، وتولى مسؤولية دائرة تلمسان لحركة انتصار الحريات الديمقراطية.',
      ],
    },
  },
  {
    id: 'revolution',
    title: { en: 'November 1954', fr: 'Novembre 1954', ar: 'نوفمبر 1954' },
    media: { kind: 'photo', photo: photos[2] },
    paragraphs: {
      en: [
        'A member of the Revolutionary Committee of Unity and Action (CRUA), he took part in the historic meeting of the “Group of 22” held in Algiers in June 1954, which decided to launch the armed struggle.',
        'When the Revolution broke out on 1 November 1954, he was appointed deputy to Larbi Ben M’hidi in Wilaya V (Oranie), in charge of the Tlemcen region.',
      ],
      fr: [
        "Membre du Comité révolutionnaire d'unité et d'action (CRUA), il participe à la réunion historique des « 22 », tenue à Alger en juin 1954, qui décide du déclenchement de la lutte armée.",
        'Au déclenchement de la Révolution, le 1er novembre 1954, il est nommé adjoint de Larbi Ben M’hidi dans la Wilaya V (Oranie), chargé de la région de Tlemcen.',
      ],
      ar: [
        'كان عضوًا في اللجنة الثورية للوحدة والعمل، وشارك في الاجتماع التاريخي لمجموعة الـ22 المنعقد بالجزائر العاصمة في جوان 1954، الذي قرر إطلاق الكفاح المسلح.',
        'وعند اندلاع الثورة في الفاتح من نوفمبر 1954، عُيّن نائبًا للعربي بن مهيدي في الولاية الخامسة (وهران) مسؤولًا عن منطقة تلمسان.',
      ],
    },
  },
  {
    id: 'wilaya-v',
    title: { en: 'Commander of Wilaya V', fr: 'Chef de la Wilaya V', ar: 'قائد الولاية الخامسة' },
    media: { kind: 'photo', photo: clanOujda },
    paragraphs: {
      en: [
        'After the Soummam Congress of August 1956, he became a member of the National Council of the Algerian Revolution (CNRA). In September 1956 he succeeded Ben M’hidi at the head of Wilaya V with the rank of colonel, and in September 1957 he joined the Coordination and Executive Committee (CCE), the leadership of the Revolution.',
      ],
      fr: [
        "Après le congrès de la Soummam d'août 1956, il devient membre du Conseil national de la Révolution algérienne (CNRA). En septembre 1956, il succède à Ben M’hidi à la tête de la Wilaya V avec le grade de colonel, puis rejoint en septembre 1957 le Comité de coordination et d'exécution (CCE), direction de la Révolution.",
      ],
      ar: [
        'بعد مؤتمر الصومام في أوت 1956، أصبح عضوًا في المجلس الوطني للثورة الجزائرية. وفي سبتمبر 1956 خلف بن مهيدي على رأس الولاية الخامسة برتبة عقيد، ثم انضم في سبتمبر 1957 إلى لجنة التنسيق والتنفيذ، قيادة الثورة.',
      ],
    },
  },
  {
    id: 'malg',
    title: {
      en: 'The MALG: the Revolution’s eyes and ears',
      fr: 'Le MALG : les yeux et les oreilles de la Révolution',
      ar: 'وزارة التسليح والاتصالات العامة: عيون الثورة وآذانها',
    },
    media: { kind: 'photo', photo: malgOperators },
    paragraphs: {
      en: [
        'Boussouf is remembered above all as the father of the Algerian intelligence services. He built the Revolution’s networks for communications, intelligence and armament, and trained a generation of young cadres, nicknamed the “Boussouf boys”, in radio transmissions and intelligence work. After independence, these cadres formed the core of Algeria’s Military Security.',
      ],
      fr: [
        "Boussouf reste avant tout dans les mémoires comme le père des services de renseignement algériens. Il a bâti les réseaux de transmissions, de renseignement et d'armement de la Révolution, et formé une génération de jeunes cadres, surnommés les « Boussouf boys », aux transmissions radio et au renseignement. Après l'indépendance, ces cadres constituent le noyau de la Sécurité militaire.",
      ],
      ar: [
        'يُذكر بوالصوف قبل كل شيء بوصفه أب أجهزة الاستخبارات الجزائرية؛ فقد بنى شبكات الاتصالات والاستخبارات والتسليح للثورة، وكوّن جيلًا من الإطارات الشابة لُقّبوا بـ«أبناء بوالصوف» في مجال الإشارة اللاسلكية والاستخبارات. وبعد الاستقلال شكّلت هذه الإطارات نواة الأمن العسكري.',
      ],
    },
  },
  {
    id: 'gpra',
    title: {
      en: 'Minister in the Provisional Government',
      fr: 'Ministre du Gouvernement provisoire',
      ar: 'وزير في الحكومة المؤقتة',
    },
    media: { kind: 'photo', photo: elMoudjahid },
    paragraphs: {
      en: [
        'When the Provisional Government of the Algerian Republic (GPRA) was proclaimed in September 1958, Boussouf was appointed Minister of General Liaisons and Communications. From January 1960 he led the Ministry of Armament and General Liaisons (MALG), which also ran clandestine workshops producing weapons for the Army of National Liberation.',
      ],
      fr: [
        "Lors de la proclamation du Gouvernement provisoire de la République algérienne (GPRA) en septembre 1958, Boussouf est nommé ministre des Liaisons générales et des Communications. À partir de janvier 1960, il dirige le ministère de l'Armement et des Liaisons générales (MALG), qui gère aussi des ateliers clandestins de fabrication d'armes pour l'Armée de libération nationale.",
      ],
      ar: [
        'عند إعلان الحكومة المؤقتة للجمهورية الجزائرية في سبتمبر 1958، عُيّن بوالصوف وزيرًا للاتصالات العامة والمواصلات، ثم ترأس ابتداءً من جانفي 1960 وزارة التسليح والاتصالات العامة التي أدارت أيضًا ورشات سرية لصناعة السلاح لجيش التحرير الوطني.',
      ],
    },
  },
  {
    id: 'after-independence',
    title: { en: 'After independence', fr: "Après l'indépendance", ar: 'بعد الاستقلال' },
    media: { kind: 'photo', photo: photos[3] },
    paragraphs: {
      en: [
        'After independence in 1962 he withdrew from political life and stayed away from the circles of power, turning instead to business. He died in Paris on 31 December 1980, at the age of 54. Le Monde marked his death as that of “one of the historic leaders of the FLN”.',
      ],
      fr: [
        "Après l'indépendance, en 1962, il se retire de la vie politique et reste à l'écart des cercles du pouvoir, se consacrant aux affaires. Il meurt à Paris le 31 décembre 1980, à l'âge de 54 ans. Le Monde salue alors la disparition de « l'un des chefs historiques du F.L.N. ».",
      ],
      ar: [
        'بعد الاستقلال سنة 1962 ابتعد عن الحياة السياسية ودوائر الحكم واتجه إلى عالم الأعمال. وتوفي بباريس يوم 31 ديسمبر 1980 عن عمر ناهز 54 سنة، ونعته صحيفة لوموند بوصفه «أحد القادة التاريخيين لجبهة التحرير الوطني».',
      ],
    },
  },
  {
    id: 'legacy',
    title: { en: 'Legacy', fr: 'Héritage', ar: 'الإرث' },
    media: { kind: 'photo', photo: photos[1] },
    paragraphs: {
      en: [
        'Algeria remembers Boussouf as one of the great strategists of the War of Independence, whose organisation and discipline gave the Revolution the means to communicate, to know and to arm itself. His hometown honoured him by giving his name to its university: Abdelhafid Boussouf University – Mila carries his memory and his commitment to knowledge into the future.',
      ],
      fr: [
        "L'Algérie se souvient de Boussouf comme de l'un des grands stratèges de la guerre de libération, dont l'organisation et la rigueur ont donné à la Révolution les moyens de communiquer, de s'informer et de s'armer. Sa ville natale l'a honoré en donnant son nom à son université : l'Université Abdelhafid Boussouf – Mila perpétue sa mémoire et son engagement pour le savoir.",
      ],
      ar: [
        'تتذكر الجزائر بوالصوف كأحد كبار استراتيجيي حرب التحرير، إذ منح تنظيمه وانضباطه الثورةَ وسائل الاتصال والمعرفة والتسلح. وقد كرّمته مدينته بإطلاق اسمه على جامعتها: جامعة عبد الحفيظ بوالصوف – ميلة، التي تحمل ذكراه والتزامه بالعلم نحو المستقبل.',
      ],
    },
  },
]

export const timeline: { year: string; text: Localized<string> }[] = [
  {
    year: '1926',
    text: {
      en: 'Born on 17 August in Mila',
      fr: 'Naît le 17 août à Mila',
      ar: 'وُلد يوم 17 أوت بميلة',
    },
  },
  {
    year: '1950',
    text: {
      en: 'The OS is uncovered; he goes underground near Oran and leads the MTLD in Tlemcen',
      fr: "L'OS est démantelée ; il passe à la clandestinité près d'Oran et dirige le MTLD à Tlemcen",
      ar: 'اكتشاف المنظمة الخاصة؛ ينتقل إلى العمل السري قرب وهران ويقود الحركة في تلمسان',
    },
  },
  {
    year: '1954',
    text: {
      en: 'Takes part in the Group of 22 (June); deputy to Ben M’hidi in Wilaya V (November)',
      fr: 'Participe à la réunion des « 22 » (juin) ; adjoint de Ben M’hidi en Wilaya V (novembre)',
      ar: 'يشارك في اجتماع الـ22 (جوان)؛ نائب بن مهيدي في الولاية الخامسة (نوفمبر)',
    },
  },
  {
    year: '1956',
    text: {
      en: 'Member of the CNRA; commander of Wilaya V with the rank of colonel (September)',
      fr: 'Membre du CNRA ; chef de la Wilaya V avec le grade de colonel (septembre)',
      ar: 'عضو المجلس الوطني للثورة؛ قائد الولاية الخامسة برتبة عقيد (سبتمبر)',
    },
  },
  {
    year: '1957',
    text: {
      en: 'Joins the CCE, the leadership of the Revolution (September)',
      fr: 'Rejoint le CCE, direction de la Révolution (septembre)',
      ar: 'ينضم إلى لجنة التنسيق والتنفيذ (سبتمبر)',
    },
  },
  {
    year: '1958',
    text: {
      en: 'Minister of General Liaisons and Communications in the GPRA (September)',
      fr: 'Ministre des Liaisons générales et des Communications du GPRA (septembre)',
      ar: 'وزير الاتصالات العامة والمواصلات في الحكومة المؤقتة (سبتمبر)',
    },
  },
  {
    year: '1960',
    text: {
      en: 'Heads the MALG, the Ministry of Armament and General Liaisons (January)',
      fr: "Dirige le MALG, ministère de l'Armement et des Liaisons générales (janvier)",
      ar: 'يترأس وزارة التسليح والاتصالات العامة (جانفي)',
    },
  },
  {
    year: '1962',
    text: {
      en: 'Independence of Algeria; he withdraws from political life',
      fr: "Indépendance de l'Algérie ; il se retire de la vie politique",
      ar: 'استقلال الجزائر؛ ينسحب من الحياة السياسية',
    },
  },
  {
    year: '1980',
    text: {
      en: 'Dies in Paris on 31 December',
      fr: 'Meurt à Paris le 31 décembre',
      ar: 'يتوفى بباريس يوم 31 ديسمبر',
    },
  },
]

export const sources: { title: string; publisher: string; url: string }[] = [
  {
    title: 'Abdelhafid Boussouf',
    publisher: 'Wikipedia (English)',
    url: 'https://en.wikipedia.org/wiki/Abdelhafid_Boussouf',
  },
  {
    title: 'Abdelhafid Boussouf',
    publisher: 'Wikipédia (français)',
    url: 'https://fr.wikipedia.org/wiki/Abdelhafid_Boussouf',
  },
  {
    title: 'Category: Abdelhafid Boussouf',
    publisher: 'Wikimedia Commons',
    url: 'https://commons.wikimedia.org/wiki/Category:Abdelhafid_Boussouf',
  },
]
