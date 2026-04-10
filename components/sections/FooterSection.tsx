"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function FooterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <footer ref={ref} className="bg-[#080808] border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="font-[family-name:var(--font-cormorant)] text-[#e8e4dc] text-3xl font-light tracking-widest mb-4">
              VELORIS
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[#e8e4dc]/25 text-[12px] leading-relaxed">
              An automotive atelier for those who understand that the journey is not a means to an end — it is the end.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <p className="text-[#D4AF37] text-[9px] tracking-[0.4em] uppercase font-[family-name:var(--font-inter)] mb-2">
              Navigate
            </p>
            {["Collection", "The Atelier", "Philosophy", "Private Events", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-[family-name:var(--font-inter)] text-[#e8e4dc]/40 text-[12px] tracking-wider hover:text-[#D4AF37] transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </motion.div>

          {/* Email signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-[#D4AF37] text-[9px] tracking-[0.4em] uppercase font-[family-name:var(--font-inter)] mb-2">
              Private Viewing Events
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[#e8e4dc]/30 text-[12px] leading-relaxed mb-6">
              Invitations to exclusive unveilings, track mornings, and atelier visits. By request only.
            </p>

            {submitted ? (
              <p className="font-[family-name:var(--font-cormorant)] italic text-[#D4AF37] text-lg">
                You will hear from us.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@address.com"
                  required
                  className="bg-transparent border-b border-white/15 focus:border-[#D4AF37]/60 outline-none text-[#e8e4dc] text-[12px] py-2 placeholder:text-[#e8e4dc]/20 font-[family-name:var(--font-inter)] transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="self-start text-[9px] tracking-[0.4em] uppercase font-[family-name:var(--font-inter)] text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2 group"
                >
                  Request Access
                  <span className="w-5 h-px bg-[#D4AF37]/40 group-hover:w-8 transition-all duration-300" />
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-8" />

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="font-[family-name:var(--font-cormorant)] italic text-[#e8e4dc]/20 text-[13px] tracking-wide">
            Veloris. Not owned. Temporarily curated.
          </p>
          <p className="font-[family-name:var(--font-inter)] text-[#e8e4dc]/15 text-[10px] tracking-widest uppercase">
            © MMXXV Veloris Automotive · All rights reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
