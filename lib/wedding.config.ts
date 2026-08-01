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
    iso: '2026-08-08T16:49:00+03:00',
    /** Displayed in invitation card / hero etc. */
    longEnglish: 'Saturday, August 8, 2026',
    timeEnglish: 'at 4:49 PM',
    longArabic: 'السبت ٨ أغسطس ٢٠٢٦',
    timeArabic: '٤:٤٩ مساءً',
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
    nameEnglish: 'The Ritz-Carlton, Riyadh',
    nameArabic: 'فندق ريتز كارلتون، الرياض',
    address: 'Al Hada District, Riyadh, Saudi Arabia',
    city: 'Dire Dawa, Ethiopia',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Ritz-Carlton+Riyadh',
    embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.978252285514!2d46.62680457618037!3d24.693444451792618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f1cd8f8dc1c7b%3A0x6b8bc22db0c0b388!2sThe%20Ritz-Carlton%2C%20Riyadh!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa',
} as const

// ─── Images ───────────────────────────────────────────────────────────────
export const IMAGES = {
    heroBg: '/images/hero-gown.png',
    desktopBg: '/images/riyadh-bg.png',
    groomPortrait: '/placeholder-user.jpg',
    bridePortrait: '/images/hero-gown.png',
    couplePhoto: '/placeholder.jpg',
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
    { time: '4:30 PM', label: 'Guest Arrival', labelAr: 'استقبال الضيوف' },
    { time: '4:49 PM', label: 'Ceremony Begins', labelAr: 'بداية حفل الزفاف' },
    { time: '6:00 PM', label: 'Wedding Dinner', labelAr: 'العشاء' },
    { time: '8:00 PM', label: 'Live Entertainment', labelAr: 'الترفيه الحي' },
    { time: '10:00 PM', label: 'Cake Cutting', labelAr: 'تقطيع الكعكة' },
] as const

// ─── Love Story Timeline (Stories Page) ───────────────────────────────────
export const LOVE_STORY = [
    {
        year: '2023',
        title: 'The First Encounter',
        titleAr: 'اللقاء الأول',
        description:
            'Under the beautiful skies of Riyadh, our paths crossed. A simple introduction sparked an endless conversation filled with shared laughter, values, and mutual dreams.',
    },
    {
        year: '2024',
        title: 'The Shared Dreams',
        titleAr: 'رؤية مشتركة',
        description:
            'Over countless discussions and family gatherings, they realized they wanted to craft a life of commitment together. Their love flourished through support and deep friendship.',
    },
    {
        year: '2025',
        title: 'The Golden Engagement',
        titleAr: 'الخطوبة المباركة',
        description:
            'With the blessings of their beloved families, they promised their hearts in an intimate ceremony, sealing commitment and beginning the countdown to their big night.',
    },
    {
        year: '2026',
        title: 'The Marriage Covenant',
        titleAr: 'الميثاق الغليظ',
        description:
            'Celebrating the start of forever on August 8, 2026. Surrounded by the warmth of relatives and friends, they embark on this sacred journey.',
    },
] as const
