/**
 * ──────────────────────────────────────────────────────────────────────────
 *  WEDDING CARD CONFIG
 *  ── The single file you edit to personalise this card for any couple. ──
 * ──────────────────────────────────────────────────────────────────────────
 */

// ─── Couple ───────────────────────────────────────────────────────────────
export const COUPLE = {
    groomName: 'Mohammed Ali',
    brideName: 'Sebat Mohammed',
    groomArabic: 'محمد',
    brideArabic: 'ثبات عمر',
    /** Displayed in footer and navbar brand */
    displayName: 'Mohammed Ali & Sebat Mohammed',
} as const

// ─── Date & Time ──────────────────────────────────────────────────────────
export const WEDDING_DATE = {
    /** ISO 8601 datetime string */
    iso: '2026-08-08T02:00:00+03:00',
    /** Displayed in invitation card / hero etc. */
    longEnglish: 'Saturday, August 8, 2026',
    timeEnglish: 'at 2:00 AM',
    longArabic: 'السبت ٨ أغسطس ٢٠٢٦',
    timeArabic: '٢:٠٠ صباحًا',
    /** For the physical calendar card */
    dayNumber: '8',
    dayNameAr: 'السبت',
    monthNameAr: 'أغسطس',
    yearAr: '٢٠٢٦',
    /** Calendar card columns */
    monthNumber: '08',
    yearEnglish: '2026',
} as const

// ─── Venue ────────────────────────────────────────────────────────────────
export const VENUE = {
    nameEnglish: 'Dire Dawa',
    nameArabic: 'ديرة داوا',
    address: 'around Eftu hospital, congo meda, memeria',
    city: 'Dire Dawa, Ethiopia',
    mapsUrl: 'https://maps.app.goo.gl/jqf2VDmq5hCKjgJz6',
    embedUrl:
        'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3940.8!2d41.8661!3d9.5980!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMzUnNTIuOCJOIDQxwrA1MScxOS42IkU!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set',
} as const

// ─── Images ───────────────────────────────────────────────────────────────
export const IMAGES = {
    heroBg: '/images/hero-gown.png',
    desktopBg: '/images/riyadh-bg.png',
    groomPortrait: '/placeholder-user.jpg',
    bridePortrait: '/bride.jpg',
    couplePhoto: '/groom and bride.jpg',
} as const

// ─── Audio ────────────────────────────────────────────────────────────────
export const AUDIO = {
    src: '/audio/wedding.mp3',
} as const

// ─── Contact Coordinators ─────────────────────────────────────────────────
export const CONTACTS = [
    {
        name: "Fahad (Groom's Brother — RSVP Officer)",
        phone: '+966 50 123 4567',
        whatsapp: 'https://wa.me/966501234567',
    },
    {
        name: "Sarah (Bride's Sister — Family Coordinator)",
        phone: '+966 55 987 6543',
        whatsapp: 'https://wa.me/966559876543',
    },
] as const

// ─── Event Schedule ───────────────────────────────────────────────────────
export const SCHEDULE = [
    { time: '2:00 AM', label: 'Guest Arrival', labelAr: 'استقبال الضيوف' },
    { time: '3:00 AM', label: 'Ceremony Begins', labelAr: 'بداية حفل الزفاف' },
    { time: '4:00 AM', label: 'Nikkah', labelAr: 'عقد النكاح' },
    { time: '5:30 AM', label: 'Zeken kerebu', labelAr: 'زكن كريبو' },
    { time: '1:00 PM', label: 'Anker mahteb', labelAr: 'أنكر محتب' },
] as const

// ─── Love Story Timeline (Stories Page) ───────────────────────────────────
export const LOVE_STORY = [
    {
        title: 'Our Journey',
        titleAr: 'رحلتنا',
        description:
            'From a meaningful first meeting to a shared commitment, we are blessed to begin our lifelong journey together surrounded by family and loved ones.',
    },
] as const;
