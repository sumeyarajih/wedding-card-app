'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-end overflow-hidden pb-16 text-center lg:min-h-screen lg:pb-24">
      <Image
        src="/images/hero-gown.png"
        alt="Elegant bridal gown with a flowing veil"
        fill
        priority
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, oklch(0.15 0.005 60 / 55%) 0%, oklch(0.15 0.005 60 / 35%) 40%, oklch(0.15 0.005 60 / 92%) 100%)',
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <p className="mb-4 font-sans text-[0.7rem] tracking-[0.55em] text-gold/90 uppercase">
          The Wedding Of
        </p>
        <h1 className="gold-gradient-text font-serif text-6xl leading-none font-medium text-balance sm:text-7xl lg:text-8xl">
          Kareem
        </h1>
        <span className="my-2 font-serif text-3xl text-foreground/80 italic lg:text-4xl">
          &amp;
        </span>
        <h1 className="gold-gradient-text font-serif text-6xl leading-none font-medium text-balance sm:text-7xl lg:text-8xl">
          Hana
        </h1>

        <div className="mt-8 flex flex-col items-center gap-1">
          <div className="h-px w-16 bg-gold/50" />
          <p className="mt-4 font-sans text-sm tracking-[0.15em] text-foreground/90">
            Wednesday, December 30, 2026
          </p>
          <p className="font-sans text-sm tracking-[0.15em] text-foreground/70">
            at 4:49 PM
          </p>
          <p
            dir="rtl"
            className="mt-2 font-arabic text-lg text-gold/90"
            lang="ar"
          >
            الأربعاء ٣٠ ديسمبر ٢٠٢٦ — الساعة ٤:٤٩ مساءً
          </p>
        </div>
      </motion.div>
    </section>
  )
}
