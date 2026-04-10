"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const CARS = [
  {
    name: "Veloris Noctis",
    year: "2025",
    engine: "6.5L Naturally Aspirated V12",
    swatches: ["#1a1a2e", "#16213e", "#0f3460"],
    poem: "A low growl at idle —\nthe sound of patience\nbefore velocity.",
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=90&auto=format&fit=crop",
  },
  {
    name: "Veloris Aurum",
    year: "2025",
    engine: "4.0L Twin-Turbo V8 Hybrid",
    swatches: ["#2d1b00", "#5c3d11", "#D4AF37"],
    poem: "Twin turbines exhale\nlike a held breath released —\ngold through the apex.",
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=90&auto=format&fit=crop",
  },
  {
    name: "Veloris Glacé",
    year: "2024",
    engine: "Tri-Motor Electric · 1,100 hp",
    swatches: ["#e8e4dc", "#c9c5bd", "#9a9690"],
    poem: "No combustion —\nonly the whisper of physics\nand the road's reply.",
    img: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&q=90&auto=format&fit=crop",
  },
];

function CarCard({ car, index }: { car: (typeof CARS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={car.img}
          alt={car.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "brightness(0.8) saturate(0.65)" }}
        />
        {/* Poem overlay on hover */}
        <div className="absolute inset-0 bg-[#0a0a0a]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8">
          <p className="font-[family-name:var(--font-cormorant)] italic text-[#e8e4dc] text-xl leading-relaxed text-center whitespace-pre-line">
            {car.poem}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="pt-6 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-[family-name:var(--font-cormorant)] text-[#e8e4dc] text-2xl font-light">
              {car.name}
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[#e8e4dc]/40 text-[11px] tracking-widest uppercase mt-1">
              {car.engine}
            </p>
          </div>
          <span className="font-[family-name:var(--font-inter)] text-[#D4AF37]/60 text-[11px] tracking-widest">
            {car.year}
          </span>
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-2 mb-5">
          {car.swatches.map((color) => (
            <div
              key={color}
              className="w-4 h-4 rounded-full border border-white/10 transition-transform duration-300 hover:scale-125"
              style={{ background: color }}
            />
          ))}
        </div>

        {/* CTA */}
        <a
          href="#"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-inter)] text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors duration-300 group/link"
        >
          View monograph
          <span className="w-6 h-px bg-[#D4AF37]/50 group-hover/link:w-10 transition-all duration-300" />
        </a>
      </div>
    </motion.div>
  );
}

export default function CollectionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="collection" className="bg-[#0d0d0d] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-[#D4AF37] text-[9px] tracking-[0.5em] uppercase font-[family-name:var(--font-inter)] mb-4">
            Current Collection
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(2.5rem,5vw,4.5rem)] text-[#e8e4dc] leading-tight">
            Three machines.<br />
            <em className="italic">No compromises.</em>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {CARS.map((car, i) => (
            <CarCard key={car.name} car={car} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
