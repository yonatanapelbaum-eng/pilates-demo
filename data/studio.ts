// ─────────────────────────────────────────────────────────────
// כל התוכן של האתר בקובץ אחד.
// כדי להתאים את האתר ללקוחה חדשה: להחליף כאן שמות, טקסטים, מחירים,
// שעות ותמונות. אין צורך לגעת בקומפוננטות.
// ─────────────────────────────────────────────────────────────

// ── פרטי הסטודיו ────────────────────────────────────────────
export const studio = {
  name: "סטודיו ליה",
  tagline: "פילאטיס בוטיק",
  owner: "ליה אברהם",
  city: "רמת השרון",
  address: "רחוב סוקולוב 24, רמת השרון",
  phoneDisplay: "050-000-0000",
  phoneHref: "tel:+972500000000",
  whatsapp: "972500000000", // בלי + ובלי מקפים
  whatsappDefault: "היי, אשמח לפרטים על שיעור ניסיון",
  instagram: "https://instagram.com/",
  mapQuery: "סוקולוב 24 רמת השרון",
  maxPerClass: 8,
  hours: [
    { days: "א׳–ה׳", time: "06:30–21:30" },
    { days: "ו׳", time: "07:30–12:00" },
    { days: "שבת", time: "סגור" },
  ],
};

export const seo = {
  title: "סטודיו ליה | פילאטיס בוטיק ברמת השרון",
  description:
    "פילאטיס מכשירים, מזרן ובר לנשים בקבוצות של עד 8 מתאמנות, ברחוב סוקולוב 24 ברמת השרון. שיעור ניסיון ב-60 ₪.",
  ogAlt: "סטודיו פילאטיס בהיר עם מכשיר רפורמר, וילונות לבנים וקשתות",
};

/** קישור וואטסאפ עם הודעה מוכנה */
export const waLink = (text: string = studio.whatsappDefault) =>
  `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(text)}`;

// ── תמונות ─────────────────────────────────────────────────
// src: נתיב מקומי (public/images) או כתובת images.unsplash.com
export const images = {
  hero: {
    src: "/images/studio-arches.jpg",
    alt: "סטודיו פילאטיס בהיר עם מכשיר רפורמר, וילונות לבנים וקירות בצורת קשת",
  },
  reformer: {
    src: "/images/reformer-window.jpg",
    alt: "מתאמנת עומדת על מכשיר רפורמר ליד חלון גדול, עם משקולות קטנות בידיים",
  },
  mat: {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=75",
    alt: "קבוצה קטנה של נשים מתרגלות על מזרנים ורודים בסטודיו מואר",
  },
  barre: {
    src: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=1200&q=75",
    alt: "מתאמנת במתיחה עמוקה על מזרן בחדר מואר עם צמחים",
  },
  prenatal: {
    src: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=1200&q=75",
    alt: "אישה יושבת בשקט על מזרן מול קיר לבן ונושמת",
  },
};

// ── ניווט ──────────────────────────────────────────────────
export const nav = [
  { label: "שיעורים", href: "#classes" },
  { label: "מערכת שעות", href: "#schedule" },
  { label: "מחירים", href: "#pricing" },
  { label: "צוות", href: "#team" },
  { label: "שאלות", href: "#faq" },
];

// ── Hero ───────────────────────────────────────────────────
export const hero = {
  tag: "רמת השרון · עד 8 מתאמנות בשיעור",
  title: "פילאטיס בקבוצות קטנות, עם יחס אישי",
  subtitle:
    "שיעורי מכשירים, מזרן ובר לנשים בכל רמה. מגיעות פעם ראשונה? נתחיל לאט, ונבנה יחד.",
  primary: { label: "לשיעור ניסיון ב-60 ₪", href: "#contact" },
  secondary: { label: "למערכת השעות", href: "#schedule" },
  stats: [
    { value: "8", label: "שנים בסטודיו" },
    { value: "עד 8", label: "מתאמנות בשיעור", capacity: true },
    { value: "4.9", label: "דירוג בגוגל" },
  ],
};

// ── סוגי שיעורים ───────────────────────────────────────────
export type ClassKey = "reformer" | "mat" | "barre" | "prenatal";

export const classTypes: Record<
  ClassKey,
  { name: string; short: string; text: string; fit: string; dot: string; image: keyof typeof images }
> = {
  reformer: {
    name: "פילאטיס מכשירים (רפורמר)",
    short: "מכשירים",
    text: "עבודה על הרפורמר שמחזקת את מרכז הגוף ומשפרת יציבה.",
    fit: "כל הרמות",
    dot: "bg-blush",
    image: "reformer",
  },
  mat: {
    name: "פילאטיס מזרן",
    short: "מזרן",
    text: "תרגול על המזרן עם אביזרים קטנים, כוח וגמישות בלי לחץ.",
    fit: "מתחילות",
    dot: "bg-sage",
    image: "mat",
  },
  barre: {
    name: "בר פילאטיס",
    short: "בר",
    text: "שילוב של פילאטיס ובלט, קצבי ומחטב, עם מוזיקה טובה.",
    fit: "מי שאוהבת אנרגיה",
    dot: "bg-ink",
    image: "barre",
  },
  prenatal: {
    name: "הריון ואחרי לידה",
    short: "הריון ואחרי לידה",
    text: "שיעור עדין שמותאם לכל שלב, כולל חיזוק רצפת האגן.",
    fit: "באישור רופא/ה",
    dot: "bg-blush-dark",
    image: "prenatal",
  },
};

export const classesSection = {
  title: "איזה שיעור מתאים לך?",
  fitLabel: "מתאים ל",
  order: ["reformer", "mat", "barre", "prenatal"] as ClassKey[],
};

// ── מערכת שעות ─────────────────────────────────────────────
export type Slot = { time: string; type: ClassKey; teacher: string };

export const days = [
  { short: "א׳", long: "ראשון" },
  { short: "ב׳", long: "שני" },
  { short: "ג׳", long: "שלישי" },
  { short: "ד׳", long: "רביעי" },
  { short: "ה׳", long: "חמישי" },
  { short: "ו׳", long: "שישי" },
];

// אינדקס 0 = יום ראשון … 5 = יום שישי
export const schedule: Slot[][] = [
  [
    { time: "07:00", type: "reformer", teacher: "ליה" },
    { time: "09:00", type: "mat", teacher: "נועה" },
    { time: "18:00", type: "reformer", teacher: "ליה" },
    { time: "19:15", type: "barre", teacher: "מאיה" },
    { time: "20:30", type: "reformer", teacher: "נועה" },
  ],
  [
    { time: "07:00", type: "reformer", teacher: "נועה" },
    { time: "10:00", type: "prenatal", teacher: "ליה" },
    { time: "18:00", type: "mat", teacher: "מאיה" },
    { time: "19:15", type: "reformer", teacher: "ליה" },
    { time: "20:30", type: "barre", teacher: "מאיה" },
  ],
  [
    { time: "07:00", type: "barre", teacher: "מאיה" },
    { time: "09:00", type: "reformer", teacher: "ליה" },
    { time: "18:00", type: "reformer", teacher: "נועה" },
    { time: "19:15", type: "mat", teacher: "נועה" },
    { time: "20:30", type: "reformer", teacher: "ליה" },
  ],
  [
    { time: "07:00", type: "reformer", teacher: "ליה" },
    { time: "10:00", type: "prenatal", teacher: "ליה" },
    { time: "18:00", type: "barre", teacher: "מאיה" },
    { time: "19:15", type: "reformer", teacher: "נועה" },
    { time: "20:30", type: "mat", teacher: "מאיה" },
  ],
  [
    { time: "07:00", type: "mat", teacher: "נועה" },
    { time: "09:00", type: "reformer", teacher: "ליה" },
    { time: "18:00", type: "reformer", teacher: "ליה" },
    { time: "19:15", type: "barre", teacher: "מאיה" },
    { time: "20:30", type: "reformer", teacher: "נועה" },
  ],
  [
    { time: "08:00", type: "reformer", teacher: "ליה" },
    { time: "09:15", type: "barre", teacher: "מאיה" },
    { time: "10:30", type: "mat", teacher: "נועה" },
  ],
];

export const scheduleSection = {
  title: "מערכת שעות שבועית",
  bookLabel: "להרשמה",
  nextLabel: "השיעור הבא",
  saturdayNote: "בשבת הסטודיו סגור. זו המערכת של יום ראשון.",
  bookMessage: (type: string, day: string, time: string) =>
    `היי, אשמח להירשם לשיעור ${type} ביום ${day} ב-${time}`,
};

// ── מחירון ─────────────────────────────────────────────────
export const pricingSection = {
  title: "מחירון",
  plans: [
    {
      id: "trial",
      name: "שיעור ניסיון",
      text: "שיעור ראשון במכשירים, כולל היכרות קצרה.",
      options: [{ label: "", price: 60, period: "לשיעור" }],
      cta: "לשיעור ניסיון",
      message: () => "היי, אשמח לקבוע שיעור ניסיון במכשירים ב-60 ₪",
    },
    {
      id: "monthly",
      name: "מנוי חודשי",
      featured: "הכי משתלם",
      text: "קביעת שיעורים באפליקציה, ביטול עד 6 שעות לפני.",
      options: [
        { label: "2 פעמים בשבוע", price: 480, period: "לחודש" },
        { label: "3 פעמים בשבוע", price: 620, period: "לחודש" },
      ],
      cta: "להצטרפות",
      message: (option: string, price: number) =>
        `היי, אשמח להצטרף למנוי חודשי, ${option} (${price} ₪)`,
    },
    {
      id: "pack",
      name: "כרטיסייה 10 שיעורים",
      text: "בתוקף 4 חודשים, לכל סוגי השיעורים.",
      options: [{ label: "", price: 750, period: "ל-10 שיעורים" }],
      cta: "לרכישה",
      message: () => "היי, אשמח לרכוש כרטיסייה של 10 שיעורים (750 ₪)",
    },
  ],
};

// ── צוות ───────────────────────────────────────────────────
export const teamSection = {
  title: "המדריכות",
  intro: "שלוש מדריכות, שמונה מכשירים, והן מכירות כל מתאמנת בשם.",
  members: [
    {
      name: "ליה אברהם",
      role: "מייסדת ומדריכת מכשירים",
      text: "מלמדת פילאטיס 8 שנים, מתמחה בעבודה עם כאבי גב ויציבה.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=75",
      alt: "ליה אברהם, מייסדת הסטודיו, מחייכת מול קיר בהיר",
    },
    {
      name: "נועה כץ",
      role: "מדריכת מכשירים ומזרן",
      text: "פיזיותרפיסטית במקצוע, יודעת להתאים כל תרגיל לגוף שלך.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=75",
      alt: "נועה כץ, מדריכת מכשירים ומזרן, בפורטרט באור יום",
    },
    {
      name: "מאיה לוי",
      role: "מדריכת בר",
      text: "רקדנית לשעבר, מביאה לכל שיעור קצב ואנרגיה.",
      image: "https://images.unsplash.com/photo-1554244933-d876deb6b2ff?w=800&q=75",
      alt: "מאיה לוי, מדריכת בר, בבגדי אימון מול קיר בהיר",
    },
  ],
};

// ── המלצות ─────────────────────────────────────────────────
export const testimonialsSection = {
  title: "מה אומרות עלינו",
  items: [
    {
      quote: "הגעתי עם כאבי גב אחרי שנים מול מחשב. אחרי חודשיים אני כבר לא זוכרת מתי כאב לי.",
      name: "רונית",
      city: "רמת השרון",
    },
    {
      quote: "הקבוצות קטנות באמת, ליה מתקנת כל תנועה. אף פעם לא הרגשתי שאני עוד אחת בשיעור.",
      name: "שני",
      city: "הרצליה",
    },
    {
      quote: "התחלתי בהריון והמשכתי אחרי הלידה. המקום הזה החזיר לי את הגוף.",
      name: "דנה",
      city: "רמת השרון",
    },
  ],
};

// ── שאלות נפוצות ───────────────────────────────────────────
export const faqSection = {
  title: "לפני השיעור הראשון",
  items: [
    {
      topic: "מתחילות",
      q: "אני מתחילה מאפס, זה מתאים לי?",
      a: "בהחלט. רוב המתאמנות שלנו הגיעו בלי ניסיון. בשיעור הניסיון נכיר את המכשירים ונתאים את הרמה בשבילך.",
    },
    {
      topic: "מה להביא",
      q: "מה להביא?",
      a: "בגדים נוחים וגרביים עם גומי נגד החלקה (אפשר לקנות בסטודיו ב-35 ₪). מגבות ומים יש אצלנו.",
    },
    {
      topic: "גודל קבוצה",
      q: "כמה מתאמנות בשיעור?",
      a: "עד 8 בשיעורי מכשירים ועד 10 בשיעורי מזרן ובר.",
    },
    {
      topic: "הריון",
      q: "אפשר להתאמן בהריון?",
      a: "כן, בשיעור המיוחד להריון ואחרי לידה, עם אישור מרופא/ה.",
    },
    {
      topic: "ביטולים",
      q: "איך מבטלים שיעור?",
      a: "באפליקציה, עד 6 שעות לפני השיעור, בלי חיוב.",
    },
    {
      topic: "חניה",
      q: "יש חניה?",
      a: "יש חניה ציבורית חינם ברחוב סוקולוב ובחניון העירייה במרחק 2 דקות הליכה.",
    },
  ],
};

// ── יצירת קשר ──────────────────────────────────────────────
export const contactSection = {
  title: "בואי לשיעור ניסיון",
  subtitle: "השאירי פרטים ונחזור אלייך עוד היום לתאם שעה.",
  couponValue: "60 ₪",
  couponNote: "שיעור ראשון במכשירים, כולל היכרות",
  fields: {
    name: "שם",
    phone: "טלפון",
    interest: "איזה שיעור מעניין אותך?",
    interestOptions: ["פילאטיס מכשירים", "פילאטיס מזרן", "בר פילאטיס", "הריון ואחרי לידה", "עוד לא יודעת"],
  },
  submit: "שליחה",
  thanks: "תודה! נחזור אלייך בקרוב",
  thanksNote: "בינתיים אפשר להציץ במערכת השעות.",
  whatsappPrompt: "מעדיפה לכתוב ישר?",
  whatsappButton: "כתבי לנו בוואטסאפ",
  addressLabel: "כתובת",
  hoursLabel: "שעות פתיחה",
  mapTitle: "מפה: סטודיו ליה, רחוב סוקולוב 24, רמת השרון",
};

// ── קרדיטים לתמונות ─────────────────────────────────────────
export const credits = [
  {
    label: "צילום הסטודיו בראש העמוד",
    work: "Pilates reformer pic · Payam.nazeri96 · CC BY-SA 4.0 · Wikimedia Commons",
    href: "https://commons.wikimedia.org/w/index.php?curid=179905146",
  },
  {
    label: "רפורמר ליד חלון",
    work: "Pilates reformer · Maddi Bazzocco · CC0 · Wikimedia Commons",
    href: "https://commons.wikimedia.org/w/index.php?curid=77785256",
  },
  { label: "שאר התמונות", work: "Unsplash", href: "https://unsplash.com/license" },
];

export const footer = {
  copyright: "© 2026 סטודיו ליה · כל הזכויות שמורות",
};
