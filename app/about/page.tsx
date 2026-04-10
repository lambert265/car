import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight, Award, Users, Car, Clock } from "lucide-react";

export const metadata = { title: "About — VANTA Motors" };

const TEAM = [
  { name: "Alexander Reid",  role: "Founder & CEO",          img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop" },
  { name: "Isabelle Fontaine", role: "Head of Acquisitions", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop" },
  { name: "Marcus Chen",     role: "Finance Director",        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop" },
];

export default function AboutPage() {
  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative bg-[#080808] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1800&q=85&auto=format&fit=crop"
            alt="VANTA showroom" fill priority sizes="100vw"
            className="object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/90 to-[#080808]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/70" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 119px,rgba(201,168,76,0.025) 119px,rgba(201,168,76,0.025) 120px)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-28 md:py-36">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <p className="text-[#C9A84C] text-[11px] font-bold uppercase tracking-[0.35em]">Our Story</p>
          </div>
          <h1 className="text-white font-bold leading-[0.92] tracking-tight mb-6 max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 300 }}>
            Sixteen years of<br />
            <em style={{ color: "#C9A84C" }}>getting it right.</em>
          </h1>
          <p className="text-white/40 text-[15px] leading-relaxed max-w-xl">
            Founded in 2008, VANTA Motors was built on a single belief: that buying a luxury car should feel as exceptional as driving one.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#0a0a0a] border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-0 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.05]">
          {[
            { icon: Car,   val: "200+",   lbl: "Vehicles in Stock"  },
            { icon: Users, val: "2,400+", lbl: "Satisfied Clients"  },
            { icon: Award, val: "15+",    lbl: "Premium Brands"     },
            { icon: Clock, val: "16yr",   lbl: "Years of Excellence"},
          ].map(({ icon: Icon, val, lbl }) => (
            <div key={lbl} className="flex flex-col items-center justify-center py-10 px-6 text-center">
              <Icon size={18} className="text-[#C9A84C]/50 mb-3" />
              <p className="text-[#C9A84C] font-bold text-3xl leading-none mb-1"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{val}</p>
              <p className="text-white/25 text-[10px] uppercase tracking-[0.2em]">{lbl}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/[0.06]">
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85&auto=format&fit=crop"
                alt="VANTA showroom" fill sizes="600px" className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
            </div>
            {/* Floating stat */}
            <div className="absolute -bottom-5 -right-5 bg-[#0d0d0d] border border-[#C9A84C]/20 px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <p className="text-[#C9A84C] font-bold text-2xl leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Est. 2008</p>
              <p className="text-white/30 text-[11px] uppercase tracking-wider mt-1">Beverly Hills, CA</p>
            </div>
          </div>
          <div>
            <div className="h-px w-8 bg-[#C9A84C] mb-5" />
            <h2 className="text-white font-bold text-3xl mb-5">Who We Are</h2>
            <p className="text-white/35 text-[14px] leading-relaxed mb-4">
              VANTA Motors has been the trusted destination for discerning buyers seeking the world's finest automobiles. What started as a small boutique dealership has grown into one of the most respected names in luxury automotive retail.
            </p>
            <p className="text-white/35 text-[14px] leading-relaxed mb-8">
              Our philosophy is simple: every client deserves a buying experience as exceptional as the vehicle they're purchasing. Transparent pricing, no pressure, and white-glove service from first inquiry to final handover.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Authorized dealer for 15+ premium brands",
                "Over 2,400 satisfied clients worldwide",
                "Award-winning customer service",
                "In-house financing & insurance",
                "150-point certified inspection on every vehicle",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[13px] text-white/40">
                  <span className="w-4 h-4 border border-[#C9A84C]/25 flex items-center justify-center shrink-0">
                    <CheckCircle size={10} className="text-[#C9A84C]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/inventory"
              className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em]">
              Browse Inventory <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-20 bg-[#0a0a0a] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="h-px w-8 bg-[#C9A84C] mx-auto mb-4" />
            <h2 className="text-white font-bold text-3xl">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]">
            {[
              { heading: "Curated, Not Collected",  body: "Every vehicle in our showroom is hand-selected. We turn away more cars than we accept — because your trust is worth more than our volume." },
              { heading: "Transparent by Design",   body: "No hidden fees. No pressure tactics. Just honest pricing, full vehicle history, and a team that earns your business through integrity." },
              { heading: "Yours, For Life",          body: "Our relationship doesn't end at the handover. From servicing to trade-ins, we're your automotive partner for the long road ahead." },
            ].map(({ heading, body }) => (
              <div key={heading} className="bg-[#0a0a0a] px-10 py-12 hover:bg-[#0d0d0d] transition-colors group">
                <div className="h-px w-8 bg-[#C9A84C] mb-5 group-hover:w-14 transition-all duration-300" />
                <h3 className="text-white/80 font-bold text-[16px] mb-3">{heading}</h3>
                <p className="text-white/30 text-[13px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="h-px w-8 bg-[#C9A84C] mx-auto mb-4" />
            <h2 className="text-white font-bold text-3xl">The Team</h2>
            <p className="text-white/25 text-[13px] mt-2">The people behind every exceptional experience</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {TEAM.map(({ name, role, img }) => (
              <div key={name} className="group text-center">
                <div className="relative aspect-[3/4] overflow-hidden border border-white/[0.06] group-hover:border-[#C9A84C]/25 transition-colors mb-4">
                  <Image src={img} alt={name} fill sizes="300px" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
                </div>
                <p className="text-white/80 font-semibold text-[14px]">{name}</p>
                <p className="text-[#C9A84C]/60 text-[11px] uppercase tracking-[0.15em] mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0a0a0a] border-t border-white/[0.05] text-center">
        <div className="max-w-xl mx-auto px-4">
          <div className="h-px w-8 bg-[#C9A84C] mx-auto mb-5" />
          <h2 className="text-white font-bold text-3xl mb-4">Ready to Experience VANTA?</h2>
          <p className="text-white/30 text-[14px] mb-8 leading-relaxed">
            Browse our curated inventory or speak with one of our specialists today.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/inventory"
              className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em]">
              Browse Inventory <ArrowRight size={13} />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/[0.08] text-white/35 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
