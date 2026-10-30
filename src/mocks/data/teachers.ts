import type { PersonPublication } from '@/api/types'
import { link, p, toFaculty, type MockAcademic, type MockPerson } from './helpers'

// SAMPLE TEACHERS. Only the rector's degrees are real; every other profile is a placeholder.

/** Papers link to a Google Scholar search for their title until real links are added */
const scholar = (title: string) =>
  `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${title}"`)}`

const paper = (
  title: string,
  venue: string,
  year: number,
  kind: PersonPublication['kind'] = 'article',
): PersonPublication => ({ title, venue, year, kind, url: scholar(title) })

const SAMPLE_PROFILES = [
  { kind: 'googleScholar' as const, url: '#' },
  { kind: 'researchGate' as const, url: '#' },
  { kind: 'orcid' as const, url: '#' },
]

const mentouri = {
  en: 'University of Mentouri, Constantine',
  fr: 'Université Mentouri, Constantine',
  ar: 'جامعة منتوري، قسنطينة',
}
const mehri = {
  en: 'Abdelhamid Mehri University, Constantine 2',
  fr: 'Université Abdelhamid Mehri, Constantine 2',
  ar: 'جامعة عبد الحميد مهري، قسنطينة 2',
}
const mila = { en: 'University of Mila', fr: 'Université de Mila', ar: 'جامعة ميلة' }

const empty: MockAcademic = {
  education: [],
  experience: [],
  publications: [],
  projects: [],
  researchProfiles: [],
}

/** Profile sections, by person slug */
export const academicRecords: Record<string, MockAcademic> = {
  // Real: the rector's degrees, as shown in the rector section of the home page
  'amirouche-bouchelaghem': {
    ...empty,
    education: [
      {
        year: 1992,
        title: {
          en: "Bachelor's in Financial Sciences",
          fr: 'Licence en sciences financières',
          ar: 'ليسانس في العلوم المالية',
        },
        institution: mentouri,
      },
      {
        year: 1998,
        title: {
          en: "Master's in Business Management",
          fr: 'Magister en gestion des entreprises',
          ar: 'ماجستير في تسيير المؤسسات',
        },
        institution: mentouri,
      },
      {
        year: 2015,
        title: {
          en: 'PhD in Financial Sciences',
          fr: 'Doctorat en sciences financières',
          ar: 'دكتوراه في العلوم المالية',
        },
        institution: mehri,
      },
      {
        year: 2016,
        title: {
          en: 'Habilitation (HDR) in Economics',
          fr: 'Habilitation universitaire en économie',
          ar: 'التأهيل الجامعي في الاقتصاد',
        },
        institution: mehri,
      },
    ],
  },

  'samira-benali': {
    education: [
      {
        year: 2008,
        title: { en: "Master's in Economics", fr: 'Master en économie', ar: 'ماستر في الاقتصاد' },
        institution: mentouri,
      },
      {
        year: 2014,
        title: { en: 'PhD in Economics', fr: 'Doctorat en économie', ar: 'دكتوراه في الاقتصاد' },
        institution: mehri,
      },
    ],
    experience: [
      {
        from: 2015,
        to: null,
        role: { en: 'Associate Professor', fr: 'Maître de conférences', ar: 'أستاذة محاضرة' },
        place: mila,
      },
      {
        from: 2019,
        to: null,
        role: {
          en: 'Coach at the business incubator',
          fr: "Coach à l'incubateur d'entreprises",
          ar: 'مؤطرة بحاضنة الأعمال',
        },
        place: mila,
      },
      {
        from: 2010,
        to: 2015,
        role: { en: 'Assistant Lecturer', fr: 'Maître-assistante', ar: 'أستاذة مساعدة' },
        place: mentouri,
      },
    ],
    publications: [
      paper(
        'E-commerce adoption by Algerian small businesses after the pandemic',
        'Journal of North African Economies',
        2024,
      ),
      paper(
        "L'économie numérique en Algérie : enjeux et perspectives",
        'Revue des sciences économiques',
        2022,
      ),
      paper(
        'Startup incubators and student entrepreneurship in Algerian universities',
        'International Conference on Entrepreneurship, Algiers',
        2021,
        'conference',
      ),
    ],
    projects: [
      {
        title: {
          en: 'Digital readiness of SMEs in Mila',
          fr: 'Maturité numérique des PME de Mila',
          ar: 'الجاهزية الرقمية للمؤسسات الصغيرة والمتوسطة بميلة',
        },
        description: {
          en: 'A survey of 200 small businesses in the wilaya on their use of online sales and payment.',
          fr: 'Une enquête auprès de 200 petites entreprises de la wilaya sur la vente et le paiement en ligne.',
          ar: 'استبيان شمل 200 مؤسسة صغيرة بالولاية حول استعمالها للبيع والدفع الإلكترونيين.',
        },
        from: 2023,
        to: null,
      },
      {
        title: {
          en: 'Student startup programme',
          fr: 'Programme startups étudiantes',
          ar: 'برنامج المؤسسات الناشئة الطلابية',
        },
        description: {
          en: 'Coaching of twelve student teams from idea to their first prototype.',
          fr: "Accompagnement de douze équipes d'étudiants de l'idée au premier prototype.",
          ar: 'مرافقة اثني عشر فريقًا طلابيًا من الفكرة إلى النموذج الأول.',
        },
        from: 2021,
        to: 2023,
      },
    ],
    researchProfiles: SAMPLE_PROFILES,
  },

  'karim-boudjemaa': {
    education: [
      {
        year: 2004,
        title: {
          en: 'Engineering degree in Computer Science',
          fr: "Diplôme d'ingénieur en informatique",
          ar: 'شهادة مهندس في الإعلام الآلي',
        },
        institution: mentouri,
      },
      {
        year: 2011,
        title: {
          en: 'PhD in Computer Science',
          fr: 'Doctorat en informatique',
          ar: 'دكتوراه في الإعلام الآلي',
        },
        institution: mentouri,
      },
      {
        year: 2017,
        title: {
          en: 'Habilitation (HDR) in Computer Science',
          fr: 'Habilitation universitaire en informatique',
          ar: 'التأهيل الجامعي في الإعلام الآلي',
        },
        institution: mehri,
      },
    ],
    experience: [
      {
        from: 2020,
        to: null,
        role: {
          en: 'Professor of Computer Science',
          fr: 'Professeur en informatique',
          ar: 'أستاذ التعليم العالي في الإعلام الآلي',
        },
        place: mila,
      },
      {
        from: 2021,
        to: null,
        role: {
          en: 'Team leader, Computer Science and AI Laboratory',
          fr: "Chef d'équipe, laboratoire d'informatique et d'IA",
          ar: 'رئيس فرقة بمخبر الإعلام الآلي والذكاء الاصطناعي',
        },
        place: mila,
      },
      {
        from: 2012,
        to: 2020,
        role: { en: 'Associate Professor', fr: 'Maître de conférences', ar: 'أستاذ محاضر' },
        place: mila,
      },
    ],
    publications: [
      paper(
        'Deep learning for early detection of olive leaf diseases',
        'Computers and Electronics in Agriculture',
        2024,
      ),
      paper(
        'A lightweight transformer for Arabic text classification',
        'International Conference on Arabic Language Processing',
        2023,
        'conference',
      ),
      paper(
        'Federated learning for privacy-preserving medical data analysis',
        'Journal of King Saud University – Computer and Information Sciences',
        2022,
      ),
      paper(
        'Introduction à la science des données',
        'Éditions universitaires de Mila',
        2020,
        'book',
      ),
    ],
    projects: [
      {
        title: {
          en: 'AI for agriculture in Mila (PRFU)',
          fr: "IA pour l'agriculture à Mila (PRFU)",
          ar: 'الذكاء الاصطناعي للفلاحة بميلة (PRFU)',
        },
        description: {
          en: 'A university research project using phone photos and deep learning to detect crop diseases.',
          fr: 'Un projet de recherche universitaire qui détecte les maladies des cultures à partir de photos de téléphone.',
          ar: 'مشروع بحث جامعي يستعمل صور الهاتف والتعلم العميق لكشف أمراض المحاصيل.',
        },
        from: 2022,
        to: null,
      },
      {
        title: {
          en: 'Smart campus app',
          fr: 'Application campus intelligent',
          ar: 'تطبيق الجامعة الذكية',
        },
        description: {
          en: 'A mobile app for timetables, room booking and announcements, built with students.',
          fr: 'Une application mobile pour les emplois du temps, la réservation de salles et les annonces, réalisée avec des étudiants.',
          ar: 'تطبيق للهاتف لاستعمالات الزمن وحجز القاعات والإعلانات، أنجز مع الطلبة.',
        },
        from: 2019,
        to: 2021,
      },
    ],
    researchProfiles: SAMPLE_PROFILES,
  },

  'nadia-mekhalfa': {
    education: [
      {
        year: 2010,
        title: { en: "Master's in Ecology", fr: 'Master en écologie', ar: 'ماستر في الإيكولوجيا' },
        institution: mentouri,
      },
      {
        year: 2018,
        title: {
          en: 'PhD in Plant Biology',
          fr: 'Doctorat en biologie végétale',
          ar: 'دكتوراه في البيولوجيا النباتية',
        },
        institution: mentouri,
      },
    ],
    experience: [
      {
        from: 2018,
        to: null,
        role: {
          en: 'Lecturer in Ecology',
          fr: 'Maître-assistante en écologie',
          ar: 'أستاذة مساعدة في الإيكولوجيا',
        },
        place: mila,
      },
      {
        from: 2020,
        to: null,
        role: {
          en: 'Adviser to the Environment Club',
          fr: "Encadrante du club de l'environnement",
          ar: 'مؤطرة نادي البيئة',
        },
        place: mila,
      },
    ],
    publications: [
      paper(
        'Floristic diversity around the Beni Haroun dam, north-eastern Algeria',
        'Ecologia Mediterranea',
        2023,
      ),
      paper(
        'Medicinal plants used in the Mila region: an ethnobotanical survey',
        'Journal of Ethnopharmacology',
        2021,
      ),
    ],
    projects: [
      {
        title: {
          en: 'Herbarium of the Mila region',
          fr: 'Herbier de la région de Mila',
          ar: 'معشبة منطقة ميلة',
        },
        description: {
          en: 'A collection of more than 400 plant species, open to students and researchers.',
          fr: 'Une collection de plus de 400 espèces végétales, ouverte aux étudiants et aux chercheurs.',
          ar: 'مجموعة تضم أكثر من 400 نوع نباتي مفتوحة للطلبة والباحثين.',
        },
        from: 2019,
        to: null,
      },
    ],
    researchProfiles: SAMPLE_PROFILES,
  },

  'hichem-bouzid': {
    education: [
      {
        year: 2006,
        title: {
          en: 'State Engineer in Civil Engineering',
          fr: "Ingénieur d'État en génie civil",
          ar: 'مهندس دولة في الهندسة المدنية',
        },
        institution: mentouri,
      },
      {
        year: 2013,
        title: {
          en: 'PhD in Civil Engineering',
          fr: 'Doctorat en génie civil',
          ar: 'دكتوراه في الهندسة المدنية',
        },
        institution: mentouri,
      },
    ],
    experience: [
      {
        from: 2014,
        to: null,
        role: { en: 'Associate Professor', fr: 'Maître de conférences', ar: 'أستاذ محاضر' },
        place: mila,
      },
      {
        from: 2008,
        to: 2014,
        role: {
          en: 'Site engineer, public works',
          fr: 'Ingénieur de chantier, travaux publics',
          ar: 'مهندس ورشة، أشغال عمومية',
        },
        place: { en: 'Mila', fr: 'Mila', ar: 'ميلة' },
      },
    ],
    publications: [
      paper(
        'Landslide susceptibility mapping in the Mila basin using GIS',
        'Arabian Journal of Geosciences',
        2022,
      ),
      paper(
        'Recycled aggregate concrete with local waste materials',
        'Construction and Building Materials',
        2020,
      ),
    ],
    projects: [
      {
        title: {
          en: 'Monitoring the 2020 Mila landslides',
          fr: 'Suivi des glissements de terrain de Mila en 2020',
          ar: 'متابعة انزلاقات التربة بميلة 2020',
        },
        description: {
          en: 'Field measurements and maps shared with local authorities after the 2020 earthquake.',
          fr: 'Mesures de terrain et cartes partagées avec les autorités locales après le séisme de 2020.',
          ar: 'قياسات ميدانية وخرائط قدمت للسلطات المحلية بعد زلزال 2020.',
        },
        from: 2020,
        to: 2023,
      },
    ],
    researchProfiles: SAMPLE_PROFILES,
  },

  'amina-ziani': {
    education: [
      {
        year: 2012,
        title: {
          en: "Master's in English Didactics",
          fr: "Master en didactique de l'anglais",
          ar: 'ماستر في تعليمية اللغة الإنجليزية',
        },
        institution: mentouri,
      },
      {
        year: 2019,
        title: {
          en: 'PhD in Applied Linguistics',
          fr: 'Doctorat en linguistique appliquée',
          ar: 'دكتوراه في اللسانيات التطبيقية',
        },
        institution: mehri,
      },
    ],
    experience: [
      {
        from: 2019,
        to: null,
        role: {
          en: 'Lecturer in English',
          fr: "Maître-assistante d'anglais",
          ar: 'أستاذة مساعدة في اللغة الإنجليزية',
        },
        place: mila,
      },
      {
        from: 2013,
        to: 2019,
        role: {
          en: 'English teacher, secondary school',
          fr: "Professeure d'anglais au lycée",
          ar: 'أستاذة اللغة الإنجليزية بالثانوي',
        },
        place: { en: 'Mila', fr: 'Mila', ar: 'ميلة' },
      },
    ],
    publications: [
      paper(
        'Flipped classrooms in Algerian EFL university courses',
        'Arab World English Journal',
        2023,
      ),
      paper(
        "Students' attitudes towards English as a medium of instruction in Algeria",
        'Journal of Language and Education',
        2024,
      ),
    ],
    projects: [
      {
        title: {
          en: 'English for research writing course',
          fr: "Cours d'anglais pour la rédaction scientifique",
          ar: 'دورة الإنجليزية للكتابة العلمية',
        },
        description: {
          en: 'A free course helping doctoral students write and publish their papers in English.',
          fr: 'Un cours gratuit pour aider les doctorants à rédiger et publier leurs articles en anglais.',
          ar: 'دورة مجانية لمساعدة طلبة الدكتوراه على كتابة مقالاتهم ونشرها بالإنجليزية.',
        },
        from: 2023,
        to: null,
      },
    ],
    researchProfiles: SAMPLE_PROFILES,
  },

  'abdelkader-bensalem': {
    education: [
      {
        year: 2002,
        title: {
          en: 'Magister in Arabic Literature',
          fr: 'Magister en littérature arabe',
          ar: 'ماجستير في الأدب العربي',
        },
        institution: mentouri,
      },
      {
        year: 2010,
        title: {
          en: 'PhD in Modern Criticism',
          fr: 'Doctorat en critique moderne',
          ar: 'دكتوراه في النقد الحديث',
        },
        institution: mentouri,
      },
      {
        year: 2016,
        title: {
          en: 'Habilitation (HDR) in Arabic Literature',
          fr: 'Habilitation universitaire en littérature arabe',
          ar: 'التأهيل الجامعي في الأدب العربي',
        },
        institution: mehri,
      },
    ],
    experience: [
      {
        from: 2018,
        to: null,
        role: {
          en: 'Professor of Arabic Literature',
          fr: 'Professeur de littérature arabe',
          ar: 'أستاذ التعليم العالي في الأدب العربي',
        },
        place: mila,
      },
      {
        from: 2021,
        to: null,
        role: {
          en: 'Member, Literary and Critical Studies Laboratory',
          fr: "Membre du laboratoire d'études littéraires et critiques",
          ar: 'عضو مخبر الدراسات الأدبية والنقدية',
        },
        place: mila,
      },
    ],
    publications: [
      paper('السرد في الرواية الجزائرية المعاصرة', 'مجلة الآداب واللغات', 2023),
      paper(
        'المناهج النقدية الحديثة وتلقيها في الجامعة الجزائرية',
        'دار الهدى، عين مليلة',
        2019,
        'book',
      ),
    ],
    projects: [
      {
        title: {
          en: 'Anthology of Mila poets',
          fr: 'Anthologie des poètes de Mila',
          ar: 'أنطولوجيا شعراء ميلة',
        },
        description: {
          en: 'Collecting and studying poems by writers from the region since independence.',
          fr: "Recueil et étude des poèmes d'auteurs de la région depuis l'indépendance.",
          ar: 'جمع ودراسة قصائد شعراء المنطقة منذ الاستقلال.',
        },
        from: 2022,
        to: null,
      },
    ],
    researchProfiles: SAMPLE_PROFILES,
  },

  'fatima-zohra-laib': {
    education: [
      {
        year: 2009,
        title: {
          en: "Master's in Public Law",
          fr: 'Master en droit public',
          ar: 'ماستر في القانون العام',
        },
        institution: mentouri,
      },
      {
        year: 2016,
        title: {
          en: 'PhD in Administrative Law',
          fr: 'Doctorat en droit administratif',
          ar: 'دكتوراه في القانون الإداري',
        },
        institution: mentouri,
      },
    ],
    experience: [
      {
        from: 2017,
        to: null,
        role: {
          en: 'Associate Professor of Law',
          fr: 'Maître de conférences en droit',
          ar: 'أستاذة محاضرة في القانون',
        },
        place: mila,
      },
    ],
    publications: [
      paper(
        "La digitalisation de l'administration publique en Algérie",
        'Revue algérienne des sciences juridiques',
        2024,
      ),
      paper(
        'الحماية القانونية للمستهلك في التجارة الإلكترونية',
        'مجلة الحقوق والعلوم السياسية',
        2021,
      ),
    ],
    projects: [
      {
        title: {
          en: 'Legal clinic for students',
          fr: 'Clinique juridique étudiante',
          ar: 'العيادة القانونية للطلبة',
        },
        description: {
          en: 'Law students give free first-level legal information to citizens, under supervision.',
          fr: 'Les étudiants en droit informent gratuitement les citoyens, sous supervision.',
          ar: 'يقدم طلبة الحقوق إرشادًا قانونيًا مجانيًا للمواطنين تحت الإشراف.',
        },
        from: 2022,
        to: null,
      },
    ],
    researchProfiles: SAMPLE_PROFILES,
  },
}

export const emptyAcademic = empty

// One sample teacher for each faculty that had none
const teacher = (
  id: string,
  slug: string,
  fullName: string,
  arabicName: string,
  honorific: 'dr' | 'prof',
  position: MockPerson['position'],
  faculty: { slug: string; name: MockPerson['position'] },
  email: string,
  expertise: MockPerson['expertise'],
  bio: MockPerson['position'],
): MockPerson => ({
  id,
  slug,
  fullName: { en: fullName, fr: fullName, ar: arabicName },
  honorific:
    honorific === 'prof'
      ? { en: 'Prof.', fr: 'Pr', ar: 'أ.د.' }
      : { en: 'Dr.', fr: 'Dr', ar: 'د.' },
  type: 'teacher',
  position,
  department: faculty,
  photo: null,
  email,
  expertise,
  bio: {
    en: [p(bio.en, ' ', link('Visit the faculty', toFaculty(faculty.slug)), '.')],
    fr: [p(bio.fr, ' ', link('Voir la faculté', toFaculty(faculty.slug)), '.')],
    ar: [p(bio.ar, ' ', link('زيارة الكلية', toFaculty(faculty.slug)), '.')],
  },
})

export const extraTeachers: MockPerson[] = [
  teacher(
    'p-101',
    'hichem-bouzid',
    'Hichem Bouzid',
    'هشام بوزيد',
    'dr',
    {
      en: 'Associate Professor of Civil Engineering',
      fr: 'Maître de conférences en génie civil',
      ar: 'أستاذ محاضر في الهندسة المدنية',
    },
    {
      slug: 'technical',
      name: { en: 'Technical Sciences', fr: 'Sciences techniques', ar: 'العلوم التقنية' },
    },
    'hichem.bouzid@example.edu',
    {
      en: ['Geotechnics', 'Landslides', 'Sustainable materials'],
      fr: ['Géotechnique', 'Glissements de terrain', 'Matériaux durables'],
      ar: ['الجيوتقنية', 'انزلاقات التربة', 'المواد المستدامة'],
    },
    {
      en: 'Dr. Hichem Bouzid worked eight years on public works sites before joining the university. He studies landslides in the Mila basin and concrete made from local recycled materials.',
      fr: "Le Dr Hichem Bouzid a travaillé huit ans sur des chantiers de travaux publics avant de rejoindre l'université. Il étudie les glissements de terrain du bassin de Mila et les bétons à base de matériaux recyclés.",
      ar: 'عمل د. هشام بوزيد ثماني سنوات في ورشات الأشغال العمومية قبل التحاقه بالجامعة. يدرس انزلاقات التربة في حوض ميلة والخرسانة المصنوعة من مواد محلية معاد تدويرها.',
    },
  ),
  teacher(
    'p-102',
    'amina-ziani',
    'Amina Ziani',
    'آمنة زياني',
    'dr',
    {
      en: 'Lecturer in English',
      fr: "Maître-assistante d'anglais",
      ar: 'أستاذة مساعدة في اللغة الإنجليزية',
    },
    {
      slug: 'foreign-languages',
      name: { en: 'Foreign Languages', fr: 'Langues étrangères', ar: 'اللغات الأجنبية' },
    },
    'amina.ziani@example.edu',
    {
      en: ['Applied linguistics', 'English teaching', 'Academic writing'],
      fr: ['Linguistique appliquée', "Enseignement de l'anglais", 'Rédaction scientifique'],
      ar: ['اللسانيات التطبيقية', 'تعليم الإنجليزية', 'الكتابة الأكاديمية'],
    },
    {
      en: 'Dr. Amina Ziani teaches English and research writing. She studies new teaching methods in Algerian English classes and helps doctoral students publish in English.',
      fr: "Le Dr Amina Ziani enseigne l'anglais et la rédaction scientifique. Elle étudie les nouvelles méthodes d'enseignement de l'anglais et aide les doctorants à publier en anglais.",
      ar: 'تدرّس د. آمنة زياني اللغة الإنجليزية والكتابة العلمية، وتدرس طرق التدريس الحديثة في أقسام الإنجليزية وتساعد طلبة الدكتوراه على النشر بالإنجليزية.',
    },
  ),
  teacher(
    'p-103',
    'abdelkader-bensalem',
    'Abdelkader Bensalem',
    'عبد القادر بن سالم',
    'prof',
    {
      en: 'Professor of Arabic Literature',
      fr: 'Professeur de littérature arabe',
      ar: 'أستاذ التعليم العالي في الأدب العربي',
    },
    {
      slug: 'arabic',
      name: {
        en: 'Arabic Language and Literature',
        fr: 'Langue et littérature arabes',
        ar: 'اللغة والأدب العربي',
      },
    },
    'abdelkader.bensalem@example.edu',
    {
      en: ['Modern Arabic novel', 'Literary criticism', 'Narratology'],
      fr: ['Roman arabe moderne', 'Critique littéraire', 'Narratologie'],
      ar: ['الرواية العربية الحديثة', 'النقد الأدبي', 'السرديات'],
    },
    {
      en: 'Prof. Abdelkader Bensalem teaches modern Arabic literature and criticism. His research looks at storytelling in the contemporary Algerian novel.',
      fr: 'Le Pr Abdelkader Bensalem enseigne la littérature arabe moderne et la critique. Ses recherches portent sur la narration dans le roman algérien contemporain.',
      ar: 'يدرّس أ.د. عبد القادر بن سالم الأدب العربي الحديث والنقد، وتتناول أبحاثه السرد في الرواية الجزائرية المعاصرة.',
    },
  ),
  teacher(
    'p-104',
    'fatima-zohra-laib',
    'Fatima Zohra Laib',
    'فاطمة الزهراء لعيب',
    'dr',
    {
      en: 'Associate Professor of Law',
      fr: 'Maître de conférences en droit',
      ar: 'أستاذة محاضرة في القانون',
    },
    {
      slug: 'law',
      name: {
        en: 'Law and Political Science',
        fr: 'Droit et sciences politiques',
        ar: 'الحقوق والعلوم السياسية',
      },
    },
    'fatimazohra.laib@example.edu',
    {
      en: ['Administrative law', 'Digital government', 'Consumer protection'],
      fr: ['Droit administratif', 'Administration numérique', 'Protection du consommateur'],
      ar: ['القانون الإداري', 'الإدارة الرقمية', 'حماية المستهلك'],
    },
    {
      en: 'Dr. Fatima Zohra Laib teaches public and administrative law. She works on the legal side of digital public services and runs the student legal clinic.',
      fr: 'Le Dr Fatima Zohra Laib enseigne le droit public et administratif. Elle travaille sur le cadre juridique des services publics numériques et anime la clinique juridique étudiante.',
      ar: 'تدرّس د. فاطمة الزهراء لعيب القانون العام والإداري، وتعمل على الجوانب القانونية للخدمات العمومية الرقمية وتشرف على العيادة القانونية للطلبة.',
    },
  ),
]
