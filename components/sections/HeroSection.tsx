"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
        style={{ filter: "brightness(0.38) saturate(0.7)" }}
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-a-black-sports-car-driving-on-a-road-at-night-3615/1080p.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase mb-8 font-[family-name:var(--font-inter)]"
        >
          Veloris Automotive · Est. MMXV
        </motion.p>

        <motion.h1
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-tight text-[#e8e4dc] mb-8"
        >
          Where precision<br />
          <em className="italic text-[#D4AF37]">meets obsession.</em>
        </motion.h1>

        <motion.a
          custom={0.9}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          href="#collection"
          className="inline-block mt-4 px-10 py-4 border border-[#D4AF37]/60 text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase font-[family-name:var(--font-inter)] font-medium hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-500"
        >
          Discover the collection
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37]/60 to-transparent animate-pulse" />
        <span className="text-[#e8e4dc]/30 text-[9px] tracking-[0.4em] uppercase font-[family-name:var(--font-inter)]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
