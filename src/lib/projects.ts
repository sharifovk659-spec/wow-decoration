import type { Locale } from "@/i18n/routing";

export type ProjectCategory =
  | "palace"
  | "sacred"
  | "hospitality"
  | "residence";

export interface Project {
  slug: string;
  category: ProjectCategory;
  year: string;
  featured: boolean;
  cover: string;
  /** Optional silent clip that plays on hover / in the project hero. */
  video?: string;
  gallery: string[];
  title: Record<Locale, string>;
  location: Record<Locale, string>;
  summary: Record<Locale, string>;
  overview: Record<Locale, string>;
  scope: Record<Locale, string[]>;
  materials: Record<Locale, string[]>;
}

/** Build an optimised Unsplash source URL. */
const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Silent hover/hero preview clip (Mixkit CDN). */
const vid = (id: string) => `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`;

export const projects: Project[] = [
  {
    slug: "royal-palace-majlis",
    category: "palace",
    year: "2023",
    featured: true,
    cover: img("1600585154340-be6161a56a0c"),
    video: vid("20390"),
    gallery: [
      img("1600585154340-be6161a56a0c"),
      img("1616486338812-3dadae4b4ace"),
      img("1615529182904-14819c35db37"),
    ],
    title: {
      ru: "Меджлис Королевского дворца",
      en: "Royal Palace Majlis",
      ar: "مجلس القصر الملكي",
    },
    location: {
      ru: "Персидский залив",
      en: "The Gulf",
      ar: "الخليج",
    },
    summary: {
      ru: "Церемониальный меджлис площадью 900 м², полностью отделанный резным орехом и позолоченными ширмами.",
      en: "A 900 m² ceremonial majlis clad entirely in hand-carved walnut and gilded screens.",
      ar: "مجلس احتفالي بمساحة ٩٠٠ م² مكسوٌّ بالكامل بالجوز المنقوش يدوياً والمشربيات المذهّبة.",
    },
    overview: {
      ru: "Задуманный вместе с архитекторами королевского двора, этот церемониальный меджлис соединяет монументальный масштаб с интимностью резной детали. Купольные потолки из зеркально подобранного ореха парят над стенами из позолоченных машрабий — каждая ширма вырезана по геометрии, созданной только для этого дворца.",
      en: "Conceived with the royal court's architects, this ceremonial majlis unites monumental scale with the intimacy of hand-carved detail. Domed ceilings in book-matched walnut float above walls of gilded mashrabiya, each screen cut to a geometry drawn for this palace alone.",
      ar: "صُمّم بالتعاون مع مهندسي الديوان الملكي، ويجمع هذا المجلس الاحتفالي بين الضخامة وحميمية التفاصيل المنحوتة يدوياً. تطفو الأسقف المقبّبة من الجوز المتطابق فوق جدران من المشربيات المذهّبة، كلّ مشربية قُصّت وفق هندسة رُسمت لهذا القصر وحده.",
    },
    scope: {
      ru: [
        "Купольный потолок из зеркально подобранного ореха",
        "Позолоченные ширмы-машрабии",
        "Монументальные входные двери",
        "Встроенная архитектура посадочных мест",
      ],
      en: [
        "Domed ceiling in book-matched walnut",
        "Gilded mashrabiya screens",
        "Monumental entrance doors",
        "Integrated seating architecture",
      ],
      ar: [
        "سقف مقبّب من الجوز المتطابق",
        "مشربيات مذهّبة",
        "أبواب مدخل ضخمة",
        "عمارة جلوس مدمجة",
      ],
    },
    materials: {
      ru: ["Американский чёрный орех", "Сусальное золото 24 карата", "Инкрустация верблюжьей костью"],
      en: ["American black walnut", "24k gold leaf", "Camel bone inlay"],
      ar: ["الجوز الأسود الأمريكي", "ذهب عيار ٢٤", "تطعيم عظم الجمل"],
    },
  },
  {
    slug: "grand-mosque-mihrab",
    category: "sacred",
    year: "2022",
    featured: true,
    cover: img("1564769662533-4f00a87b4056"),
    video: vid("3090"),
    gallery: [
      img("1564769662533-4f00a87b4056"),
      img("1585036156171-384164a8c675"),
      img("1519817650390-64a93db51149"),
    ],
    title: {
      ru: "Михраб и минбар Соборной мечети",
      en: "Grand Mosque Mihrab & Minbar",
      ar: "محراب ومنبر المسجد الكبير",
    },
    location: {
      ru: "Северная Африка",
      en: "North Africa",
      ar: "شمال أفريقيا",
    },
    summary: {
      ru: "Резной михраб и минбар из тика для национальной соборной мечети, основанные на исторической геометрии.",
      en: "A carved teak mihrab and minbar for a national grand mosque, drawn from historic geometry.",
      ar: "محراب ومنبر من الساج المنقوش لمسجدٍ وطني كبير، مستلهَمان من الهندسة التاريخية.",
    },
    overview: {
      ru: "Для мечети национального значения наши резчики восемнадцать месяцев переводили классическую геометрию в михраб и минбар из бирманского тика. Каждая ячейка мукарнаса вырезана и подогнана вручную, завершённая теплотой, что несёт свет молитвенного зала.",
      en: "For a mosque of national significance, our carvers spent eighteen months translating classical geometry into a mihrab and minbar of Burmese teak. Every muqarnas cell was cut and fitted by hand, finished in a warmth that carries the light of the prayer hall.",
      ar: "لمسجدٍ ذي أهمية وطنية، أمضى نحّاتونا ثمانية عشر شهراً في ترجمة الهندسة الكلاسيكية إلى محراب ومنبر من ساج بورما. قُصّت كل خلية مقرنص ورُكّبت باليد، وأُنجزت بدفءٍ يحمل نور قاعة الصلاة.",
    },
    scope: {
      ru: [
        "Резной михраб с мукарнами",
        "Церемониальный минбар",
        "Резной деревянный фриз потолка",
        "Инкрустированные каллиграфические панели",
      ],
      en: [
        "Hand-carved muqarnas mihrab",
        "Ceremonial minbar",
        "Carved timber ceiling band",
        "Inlaid calligraphy panels",
      ],
      ar: [
        "محراب مقرنص منحوت يدوياً",
        "منبر احتفالي",
        "شريط سقف خشبي منحوت",
        "ألواح خط مطعّمة",
      ],
    },
    materials: {
      ru: ["Бирманский тик", "Инкрустация перламутром", "Натуральное масляное покрытие"],
      en: ["Burmese teak", "Mother-of-pearl inlay", "Natural oil finish"],
      ar: ["ساج بورما", "تطعيم صدف", "تشطيب زيتي طبيعي"],
    },
  },
  {
    slug: "alpine-chalet-residence",
    category: "residence",
    year: "2024",
    featured: true,
    cover: img("1618221195710-dd6b41faaea6"),
    video: vid("4711"),
    gallery: [
      img("1618221195710-dd6b41faaea6"),
      img("1600607687939-ce8a6c25118c"),
      img("1600566753086-00f18fb6b3ea"),
    ],
    title: {
      ru: "Резиденция в альпийском шале",
      en: "Alpine Chalet Residence",
      ar: "مسكن الشاليه الألبي",
    },
    location: {
      ru: "Швейцарские Альпы",
      en: "Swiss Alps",
      ar: "جبال الألب السويسرية",
    },
    summary: {
      ru: "Дубовая архитектура интерьера для всего дома частного альпийского имения — от библиотеки до спа.",
      en: "Full-house oak interior architecture for a private alpine estate, from library to spa.",
      ar: "عمارة داخلية كاملة من البلوط لمنزلٍ ألبي خاص، من المكتبة إلى المنتجع.",
    },
    overview: {
      ru: "Полная архитектура интерьера из европейского дуба для частного альпийского имения. Тёплые панели радиального распила окутывают каждую комнату, скрывая двери, хранение и освещение в едином непрерывном волокне, что сопровождает гостя от библиотеки до спа.",
      en: "A complete interior architecture in European oak for a private alpine estate. Warm quarter-sawn panelling wraps every room, concealing doors, storage and lighting within a single, continuous grain that follows the guest from library to spa.",
      ar: "عمارة داخلية كاملة من البلوط الأوروبي لمنزلٍ ألبي خاص. تلفّ الكسوات ربعية النشر كل غرفة، مخفيةً الأبواب والتخزين والإضاءة ضمن عرقٍ واحد متصل يرافق الضيف من المكتبة إلى المنتجع.",
    },
    scope: {
      ru: [
        "Панельная обшивка стен всего дома",
        "Столярка библиотеки и кабинета",
        "Скрытые двери и системы хранения",
        "Дерево для спа и велнеса",
      ],
      en: [
        "Full-house wall panelling",
        "Library and study joinery",
        "Concealed doors and storage",
        "Spa and wellness timber",
      ],
      ar: [
        "كسوة جدران للمنزل كامل",
        "نجارة المكتبة والمكتب",
        "أبواب وتخزين مخفية",
        "خشب المنتجع والعافية",
      ],
    },
    materials: {
      ru: ["Европейский дуб", "Копчёный дуб", "Твёрдое масло-воск ручной втирки"],
      en: ["European oak", "Smoked oak", "Hand-rubbed hardwax oil"],
      ar: ["البلوط الأوروبي", "البلوط المدخّن", "زيت شمعي بالفرك اليدوي"],
    },
  },
  {
    slug: "five-star-hotel-lobby",
    category: "hospitality",
    year: "2023",
    featured: true,
    cover: img("1566073771259-6a8506099945"),
    video: vid("4185"),
    gallery: [
      img("1566073771259-6a8506099945"),
      img("1582719508461-905c673771fd"),
      img("1616137466211-f939a420be84"),
    ],
    title: {
      ru: "Лобби пятизвёздочного отеля",
      en: "Five-Star Hotel Lobby",
      ar: "بهو فندق خمس نجوم",
    },
    location: {
      ru: "Центральная Европа",
      en: "Central Europe",
      ar: "وسط أوروبا",
    },
    summary: {
      ru: "Скульптурная стена ресепшн из эбена и рифлёные колонны для знакового гостиничного бренда.",
      en: "A sculptural ebony reception wall and reeded columns for a landmark hospitality group.",
      ar: "جدار استقبال نحتي من الأبنوس وأعمدة مضلّعة لمجموعة ضيافة بارزة.",
    },
    overview: {
      ru: "Сценарий прибытия для знакового отеля, построенный вокруг скульптурной стены ресепшн из макассарского эбена. Рифлёные деревянные колонны поднимаются на всю высоту лобби, их вертикальный ритм ведёт взгляд вверх и задаёт тон всему объекту.",
      en: "The arrival experience for a landmark hotel, built around a sculptural reception wall in Macassar ebony. Reeded timber columns rise the full height of the lobby, their vertical rhythm drawing the eye upward and setting the tone for the entire property.",
      ar: "تجربة الوصول لفندقٍ بارز، مبنيّةٌ حول جدار استقبال نحتي من أبنوس مكسّر. تعلو أعمدة خشبية مضلّعة بكامل ارتفاع البهو، إيقاعها العمودي يرفع النظر ويحدّد نبرة العقار بأكمله.",
    },
    scope: {
      ru: [
        "Скульптурная стена ресепшн",
        "Рифлёные колонны на всю высоту",
        "Столярка консьержа и бара",
        "Обшивка лифтового холла",
      ],
      en: [
        "Sculptural reception wall",
        "Full-height reeded columns",
        "Concierge and bar millwork",
        "Lift lobby panelling",
      ],
      ar: [
        "جدار استقبال نحتي",
        "أعمدة مضلّعة بكامل الارتفاع",
        "نجارة الكونسيرج والبار",
        "كسوة بهو المصاعد",
      ],
    },
    materials: {
      ru: ["Макассарский эбен", "Матовая латунь", "Зеркально подобранный шпон"],
      en: ["Macassar ebony", "Brushed brass", "Book-matched veneer"],
      ar: ["أبنوس مكسّر", "نحاس مصقول", "قشرة متطابقة"],
    },
  },
  {
    slug: "desert-palace-doors",
    category: "palace",
    year: "2021",
    featured: false,
    cover: img("1616486338812-3dadae4b4ace"),
    gallery: [
      img("1616486338812-3dadae4b4ace"),
      img("1600585154340-be6161a56a0c"),
    ],
    title: {
      ru: "Парадные двери дворца в пустыне",
      en: "Desert Palace Grand Doors",
      ar: "الأبواب الكبرى لقصر الصحراء",
    },
    location: {
      ru: "Аравийский полуостров",
      en: "Arabian Peninsula",
      ar: "شبه الجزيرة العربية",
    },
    summary: {
      ru: "Шестиметровые входные двери из резного дуба и бронзы для дворца в пустыне.",
      en: "Six-metre entrance doors in carved oak and bronze for a desert palace.",
      ar: "أبواب مدخل بارتفاع ستة أمتار من البلوط المنحوت والبرونز لقصرٍ صحراوي.",
    },
    overview: {
      ru: "Пара шестиметровых входных дверей, инженерно рассчитанных на движение по скрытым осям одной рукой. Глубокая рельефная резьба по европейскому дубу обрамлена литой бронзой, создавая порог, достойный дворцового парадного двора.",
      en: "A pair of six-metre entrance doors, engineered to move on concealed pivots with a single hand. Deep-relief carving in European oak is framed by cast bronze, creating a threshold worthy of a palace forecourt.",
      ar: "زوج من أبواب المدخل بارتفاع ستة أمتار، مهندَسة لتدور على محاور مخفية بيدٍ واحدة. يؤطّر البرونز المصبوب نقشاً غائراً في البلوط الأوروبي، صانعاً عتبةً تليق بفناء قصر.",
    },
    scope: {
      ru: [
        "Шестиметровые двери на скрытых осях",
        "Глубокая рельефная ручная резьба",
        "Обрамление из литой бронзы",
        "Инженерия скрытых осей вращения",
      ],
      en: [
        "Six-metre pivot doors",
        "Deep-relief hand carving",
        "Cast bronze framing",
        "Concealed pivot engineering",
      ],
      ar: [
        "أبواب محورية بارتفاع ستة أمتار",
        "نقش يدوي غائر",
        "تأطير برونزي مصبوب",
        "هندسة محاور مخفية",
      ],
    },
    materials: {
      ru: ["Европейский дуб", "Литая бронза", "Патинированное покрытие"],
      en: ["European oak", "Cast bronze", "Patinated finish"],
      ar: ["البلوط الأوروبي", "البرونز المصبوب", "تشطيب مؤكسد"],
    },
  },
  {
    slug: "coastal-villa-library",
    category: "residence",
    year: "2024",
    featured: false,
    cover: img("1600607687939-ce8a6c25118c"),
    gallery: [
      img("1600607687939-ce8a6c25118c"),
      img("1618221195710-dd6b41faaea6"),
    ],
    title: {
      ru: "Библиотека приморской виллы",
      en: "Coastal Villa Library",
      ar: "مكتبة الفيلا الساحلية",
    },
    location: {
      ru: "Средиземноморское побережье",
      en: "Mediterranean Coast",
      ar: "الساحل المتوسطي",
    },
    summary: {
      ru: "Двухсветная библиотека из ореха с подвесной галереей для чтения.",
      en: "A double-height walnut library with a suspended reading gallery.",
      ar: "مكتبة من الجوز بارتفاع مضاعف مع شرفة قراءة معلّقة.",
    },
    overview: {
      ru: "Двухсветная библиотека из тёплого ореха, увенчанная подвесной галереей для чтения, к которой ведёт консольная лестница. Каждая полка, поручень лестницы и скрытая дверь спроектированы как единый непрерывный элемент архитектуры.",
      en: "A double-height library in warm walnut, crowned by a suspended reading gallery reached by a cantilevered stair. Every shelf, ladder rail and hidden door was engineered as one continuous piece of architecture.",
      ar: "مكتبة بارتفاع مضاعف من الجوز الدافئ، تتوّجها شرفة قراءة معلّقة يُوصَل إليها بدرجٍ ناتئ. صُمّم كل رفّ وقضيب سلّم وباب مخفي كقطعة عمارة واحدة متصلة.",
    },
    scope: {
      ru: [
        "Двухсветные стеллажи",
        "Подвесная галерея для чтения",
        "Консольная деревянная лестница",
        "Скрытые двери",
      ],
      en: [
        "Double-height shelving",
        "Suspended reading gallery",
        "Cantilevered timber stair",
        "Concealed doors",
      ],
      ar: [
        "رفوف بارتفاع مضاعف",
        "شرفة قراءة معلّقة",
        "درج خشبي ناتئ",
        "أبواب مخفية",
      ],
    },
    materials: {
      ru: ["Американский орех", "Чернёная сталь", "Кожаные детали"],
      en: ["American walnut", "Blackened steel", "Leather detailing"],
      ar: ["الجوز الأمريكي", "الفولاذ المسوّد", "تفاصيل جلدية"],
    },
  },
  {
    slug: "boutique-hotel-suite",
    category: "hospitality",
    year: "2022",
    featured: false,
    cover: img("1582719508461-905c673771fd"),
    gallery: [
      img("1582719508461-905c673771fd"),
      img("1566073771259-6a8506099945"),
    ],
    title: {
      ru: "Фирменный люкс бутик-отеля",
      en: "Boutique Hotel Signature Suite",
      ar: "الجناح المميز لفندق بوتيك",
    },
    location: {
      ru: "Южная Европа",
      en: "Southern Europe",
      ar: "جنوب أوروبا",
    },
    summary: {
      ru: "Фирменный люкс, окутанный рифлёным дубом, со встроенной деревянной стеной-изголовьем.",
      en: "A signature suite wrapped in fluted oak with an integrated timber headboard wall.",
      ar: "جناح مميز مكسوٌّ بالبلوط المضلّع مع جدار مسند سرير خشبي مدمج.",
    },
    overview: {
      ru: "Фирменный люкс бутик-отеля, определённый единой стеной из рифлёного дуба, что становится изголовьем, гардеробом и мини-баром без видимого шва. Этюд о том, как архитектура и столярка становятся неразличимы.",
      en: "The signature suite of a boutique hotel, defined by a single wall of fluted oak that becomes headboard, wardrobe and minibar without a visible seam. A study in how architecture and joinery become indistinguishable.",
      ar: "الجناح المميز لفندق بوتيك، يحدّده جدار واحد من البلوط المضلّع يتحوّل إلى مسند سرير وخزانة وميني بار دون وصلة ظاهرة. دراسةٌ في كيف تصبح العمارة والنجارة شيئاً واحداً.",
    },
    scope: {
      ru: [
        "Рифлёная стена-изголовье",
        "Встроенные гардероб и мини-бар",
        "Столярка тумбы в ванной",
        "Стол и полки на заказ",
      ],
      en: [
        "Fluted headboard wall",
        "Integrated wardrobe and minibar",
        "Bathroom vanity joinery",
        "Bespoke desk and shelving",
      ],
      ar: [
        "جدار مسند سرير مضلّع",
        "خزانة وميني بار مدمجان",
        "نجارة مغسلة الحمام",
        "مكتب ورفوف مصمّمة",
      ],
    },
    materials: {
      ru: ["Европейский дуб", "Рифлёные детали", "Матовый лак"],
      en: ["European oak", "Fluted detailing", "Matte lacquer"],
      ar: ["البلوط الأوروبي", "تفاصيل مضلّعة", "طلاء مطفأ"],
    },
  },
  {
    slug: "private-chapel-ceiling",
    category: "sacred",
    year: "2020",
    featured: false,
    cover: img("1585036156171-384164a8c675"),
    gallery: [
      img("1585036156171-384164a8c675"),
      img("1564769662533-4f00a87b4056"),
    ],
    title: {
      ru: "Кессонный потолок частной капеллы",
      en: "Private Chapel Coffered Ceiling",
      ar: "سقف الكنيسة الخاصة المقسّم",
    },
    location: {
      ru: "Западная Европа",
      en: "Western Europe",
      ar: "غرب أوروبا",
    },
    summary: {
      ru: "Кессонный дубовый потолок с позолоченными деталями для капеллы частного имения.",
      en: "A coffered oak ceiling with gilded detailing for a private estate chapel.",
      ar: "سقف مقسّم من البلوط بتفاصيل مذهّبة لكنيسة منزلٍ خاص.",
    },
    overview: {
      ru: "Кессонный потолок из состаренного дуба, чьи углубления выстланы сусальным золотом, чтобы ловить меняющийся дневной свет. Применены столярные техники реставрационного уровня, чтобы потолок простоял века без подвижек.",
      en: "A coffered ceiling in aged oak, its recesses lined with gold leaf to catch the changing daylight. Restoration-grade joinery techniques were used to ensure the ceiling will stand for centuries without movement.",
      ar: "سقف مقسّم من البلوط المعتّق، تُبطَّن تجاويفه بورق الذهب لالتقاط ضوء النهار المتغيّر. استُخدمت تقنيات نجارة بمستوى الترميم لضمان بقاء السقف قروناً دون حركة.",
    },
    scope: {
      ru: [
        "Структура кессонного потолка",
        "Углубления с сусальным золотом",
        "Резной карниз",
        "Интеграция скрытого освещения",
      ],
      en: [
        "Coffered ceiling structure",
        "Gold-leaf recesses",
        "Carved cornice",
        "Concealed lighting integration",
      ],
      ar: [
        "بنية سقف مقسّم",
        "تجاويف بورق الذهب",
        "إفريز منحوت",
        "دمج إضاءة مخفية",
      ],
    },
    materials: {
      ru: ["Состаренный европейский дуб", "Сусальное золото 23 карата", "Покрытие шеллаком"],
      en: ["Aged European oak", "23k gold leaf", "Shellac finish"],
      ar: ["البلوط الأوروبي المعتّق", "ذهب عيار ٢٣", "تشطيب شيلاك"],
    },
  },
];

export const projectCategories: ProjectCategory[] = [
  "palace",
  "sacred",
  "hospitality",
  "residence",
];

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
