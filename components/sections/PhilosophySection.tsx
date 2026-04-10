"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const PANELS = [
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=90&auto=format&fit=crop",
    alt: "Leather grain",
    line1: "We don't sell",
    line2: "transportation.",
    line3: "We curate",
    line4: "kinetic sculpture.",
  },
  {
    img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=90&auto=format&fit=crop",
    alt: "Engine camshaft",
    line1: "Every component",
    line2: "is a decision.",
    line3: "Every decision,",
    line4: "a declaration.",
  },
  {
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=90&auto=format&fit=crop",
    alt: "Gear lever",
    line1: "The machine",
    line2: "remembers nothing.",
    line3: "The driver",
    line4: "forgets everything.",
  },
];

function Panel({ img, alt, line1, line2, line3, line4 }: (typeof PANELS)[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

  return (
    <div
      ref={ref}
      className="min-h-screen w-full flex items-center grid grid-cols-1 md:grid-cols-2"
    >
      {/* Image */}
      <motion.div
        style={{ opacity }}
        className="relative h-[50vh] md:h-screen overflow-hidden"
      >
        <Image
          src={img}
          alt={alt}
          fill
          sizes="50vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
          style={{ filter: "brightness(0.75) saturate(0.6)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/60" />
      </motion.div>

      {/* Text */}
      <motion.div
        style={{ opacity, y }}
        className="flex items-center justify-center px-12 md:px-20 py-16 md:py-0 bg-[#0a0a0a]"
      >
        <div>
          <div className="w-8 h-px bg-[#D4AF37] mb-10" />
          <p className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.1] text-[#e8e4dc]">
            {line1}<br />
            <em className="italic text-[#D4AF37]">{line2}</em><br />
            {line3}<br />
            <em className="italic text-[#D4AF37]">{line4}</em>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function PhilosophySection() {
  return (
    <section className="bg-[#0a0a0a]">
      <div className="max-w-[120px] mx-auto pt-24 pb-4 text-center">
        <p className="text-[#D4AF37] text-[9px] tracking-[0.5em] uppercase font-[family-name:var(--font-inter)]">
          The Philosophy
        </p>
      </div>
      {PANELS.map((p) => (
        <Panel key={p.alt} {...p} />
      ))}
    </section>
  );
}
