"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

function SteeringWheel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-20 md:py-0">
      <motion.div style={{ rotate }} className="relative w-64 h-64 md:w-80 md:h-80">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-[#D4AF37]/40" />
        <div className="absolute inset-3 rounded-full border border-[#D4AF37]/15" />

        {/* Spokes */}
        {[0, 120, 240].map((deg) => (
          <div
            key={deg}
            className="absolute top-1/2 left-1/2 w-[45%] h-px bg-gradient-to-r from-[#D4AF37]/60 to-transparent origin-left"
            style={{ transform: `rotate(${deg}deg)` }}
          />
        ))}

        {/* Center hub */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#D4AF37]/40" />
          </div>
        </div>

        {/* Glow */}
        <div className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 60px rgba(212,175,55,0.08), inset 0 0 40px rgba(212,175,55,0.04)" }}
        />

        {/* Label */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
          <p className="text-[#D4AF37]/50 text-[9px] tracking-[0.4em] uppercase font-[family-name:var(--font-inter)]">
            Configurator Preview
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AtelierSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#0a0a0a] min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left — 3D steering wheel */}
      <div className="bg-[#0d0d0d] border-r border-white/5 flex items-center justify-center">
        <SteeringWheel />
      </div>

      {/* Right — copy */}
      <div ref={ref} className="flex items-center px-12 md:px-20 py-24 md:py-0">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[#D4AF37] text-[9px] tracking-[0.5em] uppercase font-[family-name:var(--font-inter)] mb-6"
          >
            The Atelier
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(2.2rem,4vw,4rem)] text-[#e8e4dc] leading-[1.1] mb-8"
          >
            Your name stitched<br />
            in <em className="italic text-[#D4AF37]">heritage leather.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-[family-name:var(--font-inter)] text-[#e8e4dc]/45 text-[14px] leading-relaxed mb-3"
          >
            From 12 weeks. Every detail considered. Nothing standardised.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-[family-name:var(--font-inter)] text-[#e8e4dc]/30 text-[13px] leading-relaxed mb-12"
          >
            Choose your hide. Choose your thread. Choose the weight of the wheel in your hands. We handle the rest — in silence, in Modena.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#"
              className="inline-block px-10 py-4 bg-[#D4AF37] text-[#0a0a0a] text-[10px] tracking-[0.35em] uppercase font-[family-name:var(--font-inter)] font-semibold hover:bg-[#c9a430] transition-colors duration-300"
            >
              Begin Configuration
            </a>
            <a
              href="#"
              className="inline-block px-10 py-4 border border-[#D4AF37]/30 text-[#D4AF37]/70 text-[10px] tracking-[0.35em] uppercase font-[family-name:var(--font-inter)] hover:border-[#D4AF37]/60 hover:text-[#D4AF37] transition-all duration-300"
            >
              View Process
            </a>
          </motion.div>

          {/* Detail list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-14 pt-10 border-t border-white/5 grid grid-cols-3 gap-6"
          >
            {[["12+", "Leather hides"], ["340", "Thread colours"], ["∞", "Combinations"]].map(([val, lbl]) => (
              <div key={lbl}>
                <p className="font-[family-name:var(--font-cormorant)] text-[#D4AF37] text-3xl font-light">{val}</p>
                <p className="font-[family-name:var(--font-inter)] text-[#e8e4dc]/30 text-[10px] tracking-wider uppercase mt-1">{lbl}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
