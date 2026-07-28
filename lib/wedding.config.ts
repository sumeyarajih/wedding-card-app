/**
 * ──────────────────────────────────────────────────────────────────────────
 *  WEDDING CARD CONFIG
 *  ── The single file you edit to personalise this card for any couple. ──
 * ──────────────────────────────────────────────────────────────────────────
 *
 * HOW TO REUSE FOR A NEW WEDDING:
 *  1. Update COUPLE, DATE, VENUE below.
 *  2. Replace /public/images/hero-gown.png with the new bridal photo.
 *  3. Replace /public/audio/wedding.mp3 with the desired background music.
 *  4. Adjust THEME colours if needed (only edit the oklch values).
 *  5. Update CONTACTS with the real family coordinators.
 *  6. Update SCHEDULE with the actual event programme.
 *  7. Done — all components read from this file automatically.
 */

// ─── Couple ───────────────────────────────────────────────────────────────
export const COUPLE = {
    groomName: 'Kareem',
    brideName: 'Hana',
    groomArabic: 'كريم',
    brideArabic: 'هناء',
    /** Displayed in footer and navbar brand */
    displayName: 'Kareem & Hana',
} as const

// ─── Date & Time ──────────────────────────────────────────────────────────
export const WEDDING_DATE = {
    /** ISO 8601 with timezone offset for Riyadh */
    iso: '2026-12-30T16:49:00+03:00',
    /** Displayed in hero section */
    longEnglish: 'Wednesday, December 30, 2026',
    timeEnglish: 'at 4:49 PM',
    /** Arabic equivalent */
    longArabic: 'الأربعاء ٣٠ ديسمبر ٢٠٢٦',
    timeArabic: 'الساعة ٤:٤٩ مساءً',
    /** For the physical calendar card */
    dayNumber: '30',
    dayNameAr: 'الأربعاء',
    monthNameAr: 'ديسمبر',
    yearAr: '٢٠٢٦',
    /** Calendar card time display */
    cardTime: 'PM 4:49',
} as const

// ─── Venue ────────────────────────────────────────────────────────────────
export const VENUE = {
    nameEnglish: 'The Ritz-Carlton, Riyadh',
    nameArabic: 'فندق ريتز كارلتون، الرياض',
    address: 'Al Hada District, Riyadh, Saudi Arabia',
    city: 'Riyadh',
    /** Google Maps search link */
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Ritz-Carlton+Riyadh',
    /** Google Maps embed URL */
    embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.978252285514!2d46.62680457618037!3d24.693444451792618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f1cd8f8dc1c7b%3A0x6b8bc22db0c0b388!2sThe%20Ritz-Carlton%2C%20Riyadh!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa',
} as const

// ─── Images ───────────────────────────────────────────────────────────────
export const IMAGES = {
    /** Full-bleed hero / curtain image (splash + hero section) */
    heroBg: '/images/hero-gown.png',
    /** Blurred desktop background */
    desktopBg: '/images/riyadh-bg.png',
    /** Groom portrait (used in couple slider) */
    groomPortrait: '/placeholder-user.jpg',
    /** Bride portrait (used in couple slider) */
    bridePortrait: '/images/hero-gown.png',
    /** Optional joint photo */
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
            'Over countless discussions and family gatherings, Kareem & Hana realized they wanted to craft a life of commitment together. Their love flourished through support and deep friendship.',
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
            'Celebrating the start of forever on December 30, 2026 at The Ritz-Carlton, Riyadh. Surrounded by the warmth of relatives and friends, they embark on this sacred journey.',
    },
] as const
