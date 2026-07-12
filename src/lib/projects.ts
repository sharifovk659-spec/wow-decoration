import type { Locale } from "@/i18n/routing";
import type { CountryKey } from "@/lib/countries";
import { localVideos, siteVideos } from "@/lib/videos";
import projectI18n from "../../messages/projects.i18n.json";

export type ProjectCategory =
  | "gazebo"
  | "interior"
  | "mosque"
  | "hotel"
  | "villa"
  | "government"
  | "commercial";

export interface Project {
  slug: string;
  category: ProjectCategory;
  countryKey: CountryKey;
  year: string;
  featured: boolean;
  cover: string;
  video?: string;
  processVideo?: string;
  gallery: string[];
  title: Record<Locale, string>;
  location: Record<Locale, string>;
  country: Record<Locale, string>;
  area: Record<Locale, string>;
  duration: Record<Locale, string>;
  summary: Record<Locale, string>;
  overview: Record<Locale, string>;
  result: Record<Locale, string>;
  scope: Record<Locale, string[]>;
  completedWorks: Record<Locale, string[]>;
  productionSteps: Record<Locale, string[]>;
  installationSteps: Record<Locale, string[]>;
  materials: Record<Locale, string[]>;
}

const PROCESS_VIDEO = siteVideos.projectProcess.mp4;
const PROJECT_VIDEO_BY_SLUG: Record<string, string> = {
  "kohi-navruz": localVideos.carving,
  "parliament-tajikistan": localVideos.installation,
  "palace-nation": localVideos.detail,
  "expo-dubai": localVideos.dacha,
  "expo-qatar": localVideos.mehmonkhona,
  "wyndham-grand-hotel": localVideos.mehmonkhona,
  "national-botanical-garden": localVideos.dacha,
  "royal-gazebo-14x8": localVideos.detail,
  "walnut-daybed": localVideos.carving,
  "private-villa-interior": localVideos.installation,
};

const PROCESS_VIDEO_BY_SLUG: Record<string, string> = {
  "kohi-navruz": localVideos.detail,
  "parliament-tajikistan": localVideos.installation,
  "palace-nation": localVideos.carving,
  "expo-dubai": localVideos.dacha,
  "expo-qatar": localVideos.mehmonkhona,
  "wyndham-grand-hotel": localVideos.installation,
  "national-botanical-garden": localVideos.dacha,
  "royal-gazebo-14x8": localVideos.detail,
  "walnut-daybed": localVideos.carving,
  "private-villa-interior": localVideos.mehmonkhona,
};

import { projectPhoto } from "@/lib/media";

const PROJECT_GALLERY: Record<string, string[]> = {
  "kohi-navruz": [
    projectPhoto("kohi-navruz"),
    "/images/gallery/government.jpg",
    "/images/gallery/islamic.jpg",
  ],
  "parliament-tajikistan": [
    projectPhoto("parliament-tajikistan"),
    "/images/gallery/furniture.jpg",
    projectPhoto("palace-nation"),
  ],
  "palace-nation": [
    projectPhoto("palace-nation"),
    "/images/gallery/interiors.jpg",
    "/images/gallery/government.jpg",
  ],
  "expo-dubai": [
    "/images/projects/expo-dubai-0101.jpg",
    "/images/gallery/islamic.jpg",
    "/images/gallery/walls.jpg",
  ],
  "expo-qatar": [
    projectPhoto("expo-qatar"),
    "/images/gallery/commercial.jpg",
    "/images/gallery/walls.jpg",
  ],
  "wyndham-grand-hotel": [
    projectPhoto("wyndham-grand-hotel"),
    "/images/gallery/interiors.jpg",
    "/images/gallery/furniture.jpg",
  ],
  "national-botanical-garden": [
    projectPhoto("national-botanical-garden"),
    "/images/gallery/gazebo.jpg",
    "/images/gallery/gazebo-royal.jpg",
  ],
  "royal-gazebo-14x8": [
    projectPhoto("royal-gazebo-14x8"),
    "/images/gallery/gazebo.jpg",
  ],
  "walnut-daybed": [
    projectPhoto("walnut-daybed"),
    "/images/gallery/furniture.jpg",
    "/images/materials/wood-grain.jpg",
  ],
  "private-villa-interior": [
    projectPhoto("private-villa-interior"),
    "/images/gallery/furniture.jpg",
    projectPhoto("wyndham-grand-hotel"),
  ],
};

function buildGallery(slug: string): string[] {
  return PROJECT_GALLERY[slug] ?? [projectPhoto(slug)];
}

const locList = (
  ru: string[],
  en: string[],
  tg: string[],
  ar: string[],
): Record<Locale, string[]> => ({ ru, en, tg, ar });

type ProjectI18nEntry = {
  title?: Partial<Record<Locale, string>>;
  location?: Partial<Record<Locale, string>>;
  country?: Partial<Record<Locale, string>>;
  area?: Partial<Record<Locale, string>>;
  duration?: Partial<Record<Locale, string>>;
  summary?: Partial<Record<Locale, string>>;
  overview?: Partial<Record<Locale, string>>;
  result?: Partial<Record<Locale, string>>;
  scope?: Partial<Record<Locale, string[]>>;
  completedWorks?: Partial<Record<Locale, string[]>>;
  productionSteps?: Partial<Record<Locale, string[]>>;
  installationSteps?: Partial<Record<Locale, string[]>>;
  materials?: Partial<Record<Locale, string[]>>;
};

function pickL10n(
  slug: string,
  field: keyof ProjectI18nEntry,
  ru: string,
): Record<Locale, string> {
  const entry = (projectI18n as Record<string, ProjectI18nEntry>)[slug];
  const map = entry?.[field] as Partial<Record<Locale, string>> | undefined;
  return {
    ru,
    en: map?.en ?? ru,
    tg: map?.tg ?? ru,
    ar: map?.ar ?? ru,
  };
}

function pickL10nList(
  slug: string,
  field: keyof ProjectI18nEntry,
  ru: string[],
): Record<Locale, string[]> {
  const entry = (projectI18n as Record<string, ProjectI18nEntry>)[slug];
  const map = entry?.[field] as Partial<Record<Locale, string[]>> | undefined;
  return {
    ru,
    en: map?.en ?? ru,
    tg: map?.tg ?? ru,
    ar: map?.ar ?? ru,
  };
}

type ProjectInput = {
  slug: string;
  category: ProjectCategory;
  countryKey: CountryKey;
  year: string;
  featured: boolean;
  cover: string;
  video?: string;
  processVideo?: string;
  title: string;
  location: string;
  country: string;
  area: string;
  duration: string;
  summary: string;
  overview: string;
  result: string;
  scope: string[];
  completedWorks: string[];
  productionSteps: string[];
  installationSteps: string[];
  materials: string[];
};

function project(data: ProjectInput): Project {
  return {
    slug: data.slug,
    category: data.category,
    countryKey: data.countryKey,
    year: data.year,
    featured: data.featured,
    cover: data.cover,
    video: data.video ?? PROJECT_VIDEO_BY_SLUG[data.slug] ?? localVideos.carving,
    processVideo:
      data.processVideo ?? PROCESS_VIDEO_BY_SLUG[data.slug] ?? PROCESS_VIDEO,
    gallery: buildGallery(data.slug),
    title: pickL10n(data.slug, "title", data.title),
    location: pickL10n(data.slug, "location", data.location),
    country: pickL10n(data.slug, "country", data.country),
    area: pickL10n(data.slug, "area", data.area),
    duration: pickL10n(data.slug, "duration", data.duration),
    summary: pickL10n(data.slug, "summary", data.summary),
    overview: pickL10n(data.slug, "overview", data.overview),
    result: pickL10n(data.slug, "result", data.result),
    scope: pickL10nList(data.slug, "scope", data.scope),
    completedWorks: pickL10nList(data.slug, "completedWorks", data.completedWorks),
    productionSteps: pickL10nList(data.slug, "productionSteps", data.productionSteps),
    installationSteps: pickL10nList(
      data.slug,
      "installationSteps",
      data.installationSteps,
    ),
    materials: pickL10nList(data.slug, "materials", data.materials),
  };
}

export const projects: Project[] = [
  project({
    slug: "kohi-navruz",
    category: "government",
    countryKey: "tajikistan",
    year: "2023",
    featured: true,
    cover: projectPhoto("kohi-navruz"),
    title: "Kohi Navruz",
    location: "Душанбе, Таджикистан",
    country: "Таджикистан",
    area: "12 000 м²",
    duration: "18 месяцев",
    summary: "Монументальный деревянный комплекс с элементами восточной архитектуры и художественной резьбы.",
    overview:
      "Проект Kohi Navruz — масштабный государственный объект, в котором натуральное дерево становится главным архитектурным выразительным средством. World of Wood Decoration выполнила полный цикл: проектирование, производство, доставку и монтаж.",
    result:
      "Итог — монументальное пространство, где дерево работает как архитектурный материал мирового уровня. Объект стал визитной карточкой современной восточной архитектуры.",
    scope: ["Архитектурные деревянные элементы", "Художественная резьба", "Производство и монтаж"],
    completedWorks: [
      "Декоративные панели и колонны",
      "Резные элементы восточного орнамента",
      "Потолочные конструкции из массива",
      "Монтаж на объекте под ключ",
    ],
    productionSteps: [
      "Распил и подготовка массива на станках",
      "Ручная художественная резьба",
      "Шлифовка и лакировка",
      "Контроль качества перед упаковкой",
    ],
    installationSteps: [
      "Доставка в специализированной упаковке",
      "Сборка конструкций на объекте",
      "Финальная подгонка и монтаж",
      "Сдача объекта заказчику",
    ],
    materials: ["Орех", "Дуб", "Кедр"],
  }),
  project({
    slug: "parliament-tajikistan",
    category: "government",
    countryKey: "tajikistan",
    year: "2022",
    featured: true,
    cover: projectPhoto("parliament-tajikistan"),
    title: "Парламент Республики Таджикистан",
    location: "Душанбе, Таджикистан",
    country: "Таджикистан",
    area: "8 500 м²",
    duration: "14 месяцев",
    summary: "Премиальные интерьерные и архитектурные деревянные решения для государственного здания.",
    overview:
      "Для Парламента Республики Таджикистан изготовлен комплекс деревянных интерьерных и архитектурных элементов — от панелей и потолков до детализированной отделки общественных зон.",
    result:
      "Результат — представительский интерьер, отражающий статус государственного учреждения и высочайшее качество столярного исполнения.",
    scope: ["Панели и потолки", "Двери и порталы", "Декоративная отделка"],
    completedWorks: [
      "Стеновые панели из массива",
      "Потолочные кессоны",
      "Монументальные двери",
      "Декоративные колонны",
    ],
    productionSteps: ["Производство панелей", "Резьба и отделка", "Лакировка", "Упаковка"],
    installationSteps: ["Логистика на объект", "Монтаж панелей", "Установка дверей", "Финальная сдача"],
    materials: ["Орех", "Дуб", "Ясень"],
  }),
  project({
    slug: "palace-nation",
    category: "government",
    countryKey: "kazakhstan",
    year: "2021",
    featured: true,
    cover: projectPhoto("palace-nation"),
    title: "Дворец Нации",
    location: "Астана, Казахстан",
    country: "Казахстан",
    area: "6 200 м²",
    duration: "16 месяцев",
    summary: "Роскошные деревянные интерьеры и архитектурные элементы для представительского дворца.",
    overview:
      "Проект Дворца Нации включает изготовление монументальных деревянных интерьеров, панелей, колонн и декоративных элементов с ручной художественной отделкой.",
    result:
      "Дворец получил цельный деревянный интерьер премиум-класса — от входных порталов до деталей отделки залов.",
    scope: ["Интерьерные панели", "Колонны и порталы", "Ручная резьба"],
    completedWorks: ["Панели залов", "Колонны", "Порталы", "Резные карнизы"],
    productionSteps: ["Станочная обработка", "Ручная резьба", "Сборка модулей", "Лакировка"],
    installationSteps: ["Доставка", "Монтаж панелей", "Установка колонн", "Финишная отделка"],
    materials: ["Орех", "Дуб", "Кедр"],
  }),
  project({
    slug: "expo-dubai",
    category: "commercial",
    countryKey: "uae",
    year: "2021",
    featured: true,
    cover: "/images/projects/expo-dubai-0101.jpg",
    title: "Expo Dubai",
    location: "Дубай, ОАЭ",
    country: "ОАЭ",
    area: "4 800 м²",
    duration: "10 месяцев",
    summary:
      "Резной деревянный павильон на Expo Dubai — живая витрина мастерства: колонны, орнамент и зона приёма гостей внутри международной выставки.",
    overview:
      "На Expo Dubai мы представили авторский деревянный павильон полного цикла. Конструкция с художественной резьбой, мягкая зона отдыха и восточный декор собрали внимание посетителей выставки. Работа выполнена от эскиза и производства до монтажа на площадке в Дубае.",
    result:
      "Павильон стал узнаваемой точкой экспозиции: гости видели натуральное дерево, ручную резьбу и атмосферу восточного гостеприимства в сердце Expo.",
    scope: ["Резной павильон", "Зона приёма гостей", "Монтаж на Expo"],
    completedWorks: ["Конструкция павильона", "Художественная резьба", "Мебель и текстиль зоны", "Монтаж на площадке"],
    productionSteps: ["Проектирование модулей", "Производство", "Отделка", "Упаковка"],
    installationSteps: ["Международная доставка", "Сборка на площадке", "Финальный монтаж"],
    materials: ["Ясень", "Сосна", "Абачи"],
  }),
  project({
    slug: "expo-qatar",
    category: "commercial",
    countryKey: "qatar",
    year: "2022",
    featured: true,
    cover: projectPhoto("expo-qatar"),
    title: "Expo Qatar",
    location: "Доха, Катар",
    country: "Катар",
    area: "5 100 м²",
    duration: "11 месяцев",
    summary: "Архитектурные деревянные решения для международного выставочного проекта.",
    overview:
      "Проект Expo Qatar — комплекс деревянных архитектурных элементов для представительского международного пространства с акцентом на восточную эстетику.",
    result:
      "Итоговый объект — гармоничное сочетание современной архитектуры и традиционного деревянного мастерства.",
    scope: ["Архитектурный декор", "Панели и конструкции", "Полный цикл монтажа"],
    completedWorks: ["Архитектурные панели", "Декоративные элементы", "Конструкции павильона"],
    productionSteps: ["Распил", "Резьба", "Сборка", "Лакировка"],
    installationSteps: ["Доставка в Катар", "Монтаж бригадой", "Сдача объекта"],
    materials: ["Дуб", "Кедр", "Орех"],
  }),
  project({
    slug: "wyndham-grand-hotel",
    category: "hotel",
    countryKey: "uae",
    year: "2023",
    featured: true,
    cover: projectPhoto("wyndham-grand-hotel"),
    title: "Wyndham Grand Hotel",
    location: "Международный проект",
    country: "ОАЭ",
    area: "3 400 м²",
    duration: "9 месяцев",
    summary: "Премиальные деревянные интерьеры для отеля класса люкс.",
    overview:
      "Для Wyndham Grand Hotel выполнен комплекс деревянных интерьерных решений — панели, мебель, декоративные элементы и отделка общественных зон.",
    result:
      "Отель получил цельный деревянный интерьер, формирующий атмосферу люкса с первого шага гостя в лобби.",
    scope: ["Интерьерные панели", "Мебель из массива", "Общественные зоны"],
    completedWorks: ["Панели лобби", "Ресепшн", "Мебель номеров", "Декор ресторана"],
    productionSteps: ["Производство панелей", "Мебель", "Отделка", "Упаковка"],
    installationSteps: ["Доставка", "Монтаж по зонам", "Финальная приёмка"],
    materials: ["Дуб", "Орех", "Ясень"],
  }),
  project({
    slug: "national-botanical-garden",
    category: "government",
    countryKey: "tajikistan",
    year: "2020",
    featured: true,
    cover: projectPhoto("national-botanical-garden"),
    title: "Национальный ботанический сад",
    location: "Региональный проект",
    country: "Таджикистан",
    area: "2 200 м²",
    duration: "7 месяцев",
    summary: "Беседки, павильоны и архитектурные деревянные элементы для общественного пространства.",
    overview:
      "Для Национального ботанического сада спроектированы и установлены деревянные беседки, павильоны и декоративные конструкции.",
    result:
      "Парк получил архитектурные деревянные объекты, гармонирующие с природным ландшафтом и служащие десятилетиями.",
    scope: ["Беседки и павильоны", "Декоративные конструкции", "Монтаж"],
    completedWorks: ["Беседки", "Павильоны", "Декоративные перголы", "Скамьи и ограждения"],
    productionSteps: ["Распил", "Сборка каркасов", "Резьба", "Защитная пропитка"],
    installationSteps: ["Доставка", "Монтаж на площадке", "Финальная обработка"],
    materials: ["Сосна", "Кедр", "Дуб"],
  }),
  project({
    slug: "royal-gazebo-14x8",
    category: "gazebo",
    countryKey: "uae",
    year: "2024",
    featured: true,
    cover: projectPhoto("royal-gazebo-14x8"),
    title: "Королевская беседка 14×8",
    location: "Частный заказ",
    country: "ОАЭ",
    area: "112 м²",
    duration: "5 месяцев",
    summary: "Монументальная беседка 14×8 метров из благородных пород дерева с художественной резьбой.",
    overview:
      "Королевская беседка 14×8 — авторский проект с монументальными пропорциями, ручной резьбой и конструкцией на века.",
    result:
      "Беседка стала центральным элементом частной резиденции — монументальным, функциональным и эстетически безупречным.",
    scope: ["Проектирование", "Производство", "Доставка и монтаж"],
    completedWorks: ["Каркас беседки", "Кровля", "Резные колонны", "Декоративные элементы"],
    productionSteps: ["Станочная обработка", "Резьба колонн", "Сборка", "Лакировка"],
    installationSteps: ["Доставка", "Монтаж каркаса", "Установка кровли", "Финиш"],
    materials: ["Орех", "Дуб", "Кедр"],
  }),
  project({
    slug: "walnut-daybed",
    category: "interior",
    countryKey: "tajikistan",
    year: "2023",
    featured: true,
    cover: projectPhoto("walnut-daybed"),
    title: "Топчан из ореха",
    location: "Частный заказ",
    country: "Таджикистан",
    area: "12 м²",
    duration: "2 месяца",
    summary: "Авторский топчан из массива ореха с ручной отделкой и премиальной фурнитурой.",
    overview:
      "Топчан из ореха — штучное изделие премиум-класса из отборного массива с ручной шлифовкой и отделкой.",
    result:
      "Готовое изделие — эталон мастерства: идеальная геометрия, богатая текстура ореха и безупречная отделка.",
    scope: ["3D-визуализация", "Производство", "Отделка вручную"],
    completedWorks: ["Каркас топчана", "Резные элементы", "Ручная отделка", "Доставка и установка"],
    productionSteps: ["Распил массива", "Сборка", "Ручная резьба", "Лакировка"],
    installationSteps: ["Доставка", "Установка на объекте"],
    materials: ["Орех"],
  }),
  project({
    slug: "private-villa-interior",
    category: "villa",
    countryKey: "uae",
    year: "2024",
    featured: true,
    cover: projectPhoto("private-villa-interior"),
    title: "Интерьер частной виллы",
    location: "Частная резиденция",
    country: "ОАЭ",
    area: "1 800 м²",
    duration: "12 месяцев",
    summary: "Комплексное деревянное оформление интерьера частной виллы — панели, потолки, мебель.",
    overview:
      "Интерьер частной виллы — цельный проект деревянной архитектуры: панели, потолки, двери и мебель в единой премиальной концепции.",
    result:
      "Вилла получила цельный деревянный интерьер — от входного портала до мебели в спальнях и гостиных.",
    scope: ["Интерьерные панели", "Потолки", "Мебель на заказ"],
    completedWorks: ["Стеновые панели", "Потолки", "Двери", "Авторская мебель"],
    productionSteps: ["Производство панелей", "Мебель", "Отделка", "Упаковка"],
    installationSteps: ["Доставка", "Монтаж поэтапно", "Сдача под ключ"],
    materials: ["Орех", "Ясень", "Дуб"],
  }),
];

export const projectCategories: ProjectCategory[] = [
  "gazebo",
  "interior",
  "mosque",
  "hotel",
  "villa",
  "government",
  "commercial",
];

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCountry(countryKey: CountryKey) {
  return projects.filter((p) => p.countryKey === countryKey);
}

export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
