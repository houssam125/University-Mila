import { image, link, p, toFaculty, toPage, type MockPerson } from './helpers'

// SAMPLE PEOPLE. Only the rector is real; the other names are placeholders to replace.
export const people: MockPerson[] = [
  {
    id: 'p-001',
    slug: 'amirouche-bouchelaghem',
    fullName: { en: 'Amirouche Bouchelaghem', fr: 'Amirouche Bouchelaghem', ar: 'عميروش بوشلاغم' },
    honorific: { en: 'Prof.', fr: 'Pr', ar: 'أ.د.' },
    type: 'teacher',
    position: { en: 'University Rector', fr: "Recteur de l'université", ar: 'رئيس الجامعة' },
    department: {
      slug: 'rectorate',
      name: { en: 'Rectorate', fr: 'Rectorat', ar: 'رئاسة الجامعة' },
    },
    photo: image('img-rector', 'directeur.jpg', [350, 343], {
      en: 'Prof. Amirouche Bouchelaghem',
      fr: 'Pr Amirouche Bouchelaghem',
      ar: 'الأستاذ الدكتور عميروش بوشلاغم',
    }),
    email: null,
    expertise: {
      en: ['Economics', 'Health economics', 'Financial sciences'],
      fr: ['Économie', 'Économie de la santé', 'Sciences financières'],
      ar: ['الاقتصاد', 'اقتصاد الصحة', 'العلوم المالية'],
    },
    bio: {
      en: [
        p(
          'Born in 1964, Prof. Amirouche Bouchelaghem is a university professor specialising in economics and health economics. He leads the university as Rector, with a focus on building qualitative scientific environments for researchers and students.',
        ),
        p(
          'He studied financial sciences at the University of Mentouri in Constantine, then earned his PhD and habilitation at Abdelhamid Mehri University (Constantine 2). His priorities for the university are set out in the ',
          link("Rector's Address", toPage('rectorate/address')),
          '.',
        ),
      ],
      fr: [
        p(
          "Né en 1964, le Pr Amirouche Bouchelaghem est professeur des universités spécialisé en économie et en économie de la santé. Il dirige l'université en tant que recteur, avec pour objectif de bâtir des environnements scientifiques de qualité pour les chercheurs et les étudiants.",
        ),
        p(
          "Il a étudié les sciences financières à l'Université Mentouri de Constantine, puis obtenu son doctorat et son habilitation à l'Université Abdelhamid Mehri (Constantine 2). Ses priorités pour l'université sont présentées dans le ",
          link('mot du recteur', toPage('rectorate/address')),
          '.',
        ),
      ],
      ar: [
        p(
          'وُلد الأستاذ الدكتور عميروش بوشلاغم سنة 1964، وهو أستاذ جامعي متخصص في الاقتصاد واقتصاد الصحة. يقود الجامعة بصفته رئيسًا لها، ويعمل على بناء بيئات علمية نوعية للباحثين والطلبة.',
        ),
        p(
          'درس العلوم المالية بجامعة منتوري بقسنطينة، ثم نال الدكتوراه والتأهيل الجامعي بجامعة عبد الحميد مهري (قسنطينة 2). وتُعرض أولوياته للجامعة في ',
          link('كلمة رئيس الجامعة', toPage('rectorate/address')),
          '.',
        ),
      ],
    },
  },
  {
    id: 'p-002',
    slug: 'samira-benali',
    fullName: { en: 'Samira Benali', fr: 'Samira Benali', ar: 'سميرة بن علي' },
    honorific: { en: 'Dr.', fr: 'Dr', ar: 'د.' },
    type: 'teacher',
    position: {
      en: 'Associate Professor of Economics',
      fr: 'Maître de conférences en économie',
      ar: 'أستاذة محاضرة في الاقتصاد',
    },
    department: {
      slug: 'economics',
      name: { en: 'Economics', fr: 'Sciences économiques', ar: 'العلوم الاقتصادية' },
    },
    photo: null,
    email: 'samira.benali@example.edu',
    expertise: {
      en: ['Digital economy', 'E-commerce', 'Entrepreneurship'],
      fr: ['Économie numérique', 'Commerce électronique', 'Entrepreneuriat'],
      ar: ['الاقتصاد الرقمي', 'التجارة الإلكترونية', 'ريادة الأعمال'],
    },
    bio: {
      en: [
        p(
          'Dr. Samira Benali teaches economics at the ',
          link('Institute of Economics', toFaculty('economics')),
          '. Her research focuses on the digital economy and on how small businesses in Algeria adopt e-commerce. She coaches student projects at the business incubator.',
        ),
      ],
      fr: [
        p(
          "Le Dr Samira Benali enseigne l'économie à l'",
          link("Institut d'économie", toFaculty('economics')),
          ". Ses recherches portent sur l'économie numérique et l'adoption du commerce électronique par les petites entreprises algériennes. Elle accompagne les projets étudiants de l'incubateur.",
        ),
      ],
      ar: [
        p(
          'تدرّس د. سميرة بن علي الاقتصاد في ',
          link('معهد العلوم الاقتصادية', toFaculty('economics')),
          '. تتمحور أبحاثها حول الاقتصاد الرقمي وتبنّي المؤسسات الصغيرة في الجزائر للتجارة الإلكترونية، وتؤطر مشاريع الطلبة في حاضنة الأعمال.',
        ),
      ],
    },
  },
  {
    id: 'p-003',
    slug: 'karim-boudjemaa',
    fullName: { en: 'Karim Boudjemaa', fr: 'Karim Boudjemaa', ar: 'كريم بوجمعة' },
    honorific: { en: 'Prof.', fr: 'Pr', ar: 'أ.د.' },
    type: 'teacher',
    position: {
      en: 'Professor of Computer Science',
      fr: 'Professeur en informatique',
      ar: 'أستاذ التعليم العالي في الإعلام الآلي',
    },
    department: {
      slug: 'math-cs',
      name: {
        en: 'Mathematics and Computer Science',
        fr: 'Mathématiques et informatique',
        ar: 'الرياضيات والإعلام الآلي',
      },
    },
    photo: null,
    email: 'karim.boudjemaa@example.edu',
    expertise: {
      en: ['Artificial intelligence', 'Data science', 'Software engineering'],
      fr: ['Intelligence artificielle', 'Science des données', 'Génie logiciel'],
      ar: ['الذكاء الاصطناعي', 'علم البيانات', 'هندسة البرمجيات'],
    },
    bio: {
      en: [
        p(
          'Prof. Karim Boudjemaa teaches computer science at the ',
          link('Mathematics and Computer Science department', toFaculty('math-cs')),
          '. He works on artificial intelligence and data analysis, and supervises doctoral students in the university’s research laboratories.',
        ),
      ],
      fr: [
        p(
          'Le Pr Karim Boudjemaa enseigne l’informatique au ',
          link('département de mathématiques et informatique', toFaculty('math-cs')),
          ". Il travaille sur l'intelligence artificielle et l'analyse de données, et encadre des doctorants dans les laboratoires de recherche de l'université.",
        ),
      ],
      ar: [
        p(
          'يدرّس أ.د. كريم بوجمعة الإعلام الآلي في ',
          link('قسم الرياضيات والإعلام الآلي', toFaculty('math-cs')),
          '. يعمل على الذكاء الاصطناعي وتحليل البيانات، ويؤطر طلبة الدكتوراه في مخابر البحث بالجامعة.',
        ),
      ],
    },
  },
  {
    id: 'p-004',
    slug: 'nadia-mekhalfa',
    fullName: { en: 'Nadia Mekhalfa', fr: 'Nadia Mekhalfa', ar: 'نادية مخالفة' },
    honorific: { en: 'Dr.', fr: 'Dr', ar: 'د.' },
    type: 'teacher',
    position: {
      en: 'Lecturer in Ecology',
      fr: 'Maître-assistante en écologie',
      ar: 'أستاذة مساعدة في الإيكولوجيا',
    },
    department: {
      slug: 'nature-life',
      name: {
        en: 'Natural and Life Sciences',
        fr: 'Sciences de la nature et de la vie',
        ar: 'علوم الطبيعة والحياة',
      },
    },
    photo: null,
    email: 'nadia.mekhalfa@example.edu',
    expertise: {
      en: ['Ecology', 'Biodiversity', 'Environmental education'],
      fr: ['Écologie', 'Biodiversité', "Éducation à l'environnement"],
      ar: ['الإيكولوجيا', 'التنوع البيولوجي', 'التربية البيئية'],
    },
    bio: {
      en: [
        p(
          'Dr. Nadia Mekhalfa teaches ecology at the ',
          link('Faculty of Natural and Life Sciences', toFaculty('nature-life')),
          '. She studies the plant biodiversity of the Mila region and supports the student environment club.',
        ),
      ],
      fr: [
        p(
          "Le Dr Nadia Mekhalfa enseigne l'écologie à la ",
          link('Faculté des sciences de la nature et de la vie', toFaculty('nature-life')),
          ". Elle étudie la biodiversité végétale de la région de Mila et accompagne le club étudiant de l'environnement.",
        ),
      ],
      ar: [
        p(
          'تدرّس د. نادية مخالفة الإيكولوجيا في ',
          link('كلية علوم الطبيعة والحياة', toFaculty('nature-life')),
          '. تدرس التنوع النباتي في منطقة ميلة وترافق نادي البيئة الطلابي.',
        ),
      ],
    },
  },
  {
    id: 'p-005',
    slug: 'yacine-merabet',
    fullName: { en: 'Yacine Merabet', fr: 'Yacine Merabet', ar: 'ياسين مرابط' },
    honorific: null,
    type: 'staff',
    position: {
      en: 'Head of Student Activities',
      fr: 'Responsable des activités étudiantes',
      ar: 'رئيس مصلحة الأنشطة الطلابية',
    },
    department: {
      slug: 'student-services',
      name: { en: 'Student Services', fr: 'Services aux étudiants', ar: 'مصالح الطلبة' },
    },
    photo: null,
    email: 'yacine.merabet@example.edu',
    expertise: {
      en: ['Student life', 'Clubs and associations', 'Event organisation'],
      fr: ['Vie étudiante', 'Clubs et associations', "Organisation d'événements"],
      ar: ['الحياة الطلابية', 'النوادي والجمعيات', 'تنظيم الأحداث'],
    },
    bio: {
      en: [
        p(
          'Yacine Merabet heads the student activities office. He supports student clubs, organises cultural and sports activities, and coordinates welcome days for new students.',
        ),
      ],
      fr: [
        p(
          "Yacine Merabet dirige le bureau des activités étudiantes. Il accompagne les clubs, organise les activités culturelles et sportives, et coordonne les journées d'accueil des nouveaux étudiants.",
        ),
      ],
      ar: [
        p(
          'يرأس ياسين مرابط مصلحة الأنشطة الطلابية، ويرافق النوادي، وينظم الأنشطة الثقافية والرياضية، وينسق أيام استقبال الطلبة الجدد.',
        ),
      ],
    },
  },
  {
    id: 'p-006',
    slug: 'leila-hamidi',
    fullName: { en: 'Leila Hamidi', fr: 'Leila Hamidi', ar: 'ليلى حميدي' },
    honorific: null,
    type: 'staff',
    position: {
      en: 'Business Incubator Coordinator',
      fr: "Coordinatrice de l'incubateur",
      ar: 'منسقة حاضنة الأعمال',
    },
    department: {
      slug: 'incubator',
      name: { en: 'Business Incubator', fr: "Incubateur d'entreprises", ar: 'حاضنة الأعمال' },
    },
    photo: null,
    email: 'leila.hamidi@example.edu',
    expertise: {
      en: ['Start-up support', 'Innovation', 'Partnerships'],
      fr: ['Accompagnement de start-ups', 'Innovation', 'Partenariats'],
      ar: ['مرافقة المؤسسات الناشئة', 'الابتكار', 'الشراكات'],
    },
    bio: {
      en: [
        p(
          'Leila Hamidi coordinates the university business incubator. She helps students turn their ideas into projects and connects them with entrepreneurs and support agencies.',
        ),
      ],
      fr: [
        p(
          "Leila Hamidi coordonne l'incubateur d'entreprises de l'université. Elle aide les étudiants à transformer leurs idées en projets et les met en relation avec des entrepreneurs et des organismes d'accompagnement.",
        ),
      ],
      ar: [
        p(
          'تنسق ليلى حميدي حاضنة الأعمال بالجامعة، وتساعد الطلبة على تحويل أفكارهم إلى مشاريع وتربطهم برواد الأعمال وهيئات المرافقة.',
        ),
      ],
    },
  },
]
