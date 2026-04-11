"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Shield, CreditCard, RefreshCw, Key } from "lucide-react";
import { CARS } from "@/lib/cars";
import { RENTALS } from "@/lib/rentals";
import FeaturedSection from "@/components/FeaturedSection";
import CarDetailModal from "@/components/CarDetailModal";

const CATEGORIES = [
  { label: "SUVs",        count: 42, img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80&auto=format&fit=crop", cat: "SUV" },
  { label: "Sedans",      count: 38, img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80&auto=format&fit=crop", cat: "Sedan" },
  { label: "Sports Cars", count: 27, img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&auto=format&fit=crop", cat: "Sport" },
  { label: "Electric",    count: 19, img: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&q=80&auto=format&fit=crop", cat: "Electric" },
];

const TRUST = [
  { icon: CheckCircle, title: "Certified Pre-Owned",  desc: "Every vehicle passes our 150-point inspection" },
  { icon: Shield,      title: "2-Year Warranty",      desc: "Comprehensive coverage on all vehicles" },
  { icon: CreditCard,  title: "Flexible Finance",     desc: "Tailored payment plans from 0% APR" },
  { icon: RefreshCw,   title: "7-Day Returns",        desc: "Not satisfied? Return it, no questions asked" },
];

const TESTIMONIALS = [
  { quote: "The most seamless car buying experience I've ever had. Found my dream Porsche in 2 days. The team was exceptional.", author: "James Whitfield", car: "Porsche 911 Carrera S",      initials: "JW", location: "Los Angeles, CA" },
  { quote: "VANTA Motors is in a different league. Transparent pricing, no pressure, and the Range Rover was immaculate.",       author: "Sarah Chen",     car: "Range Rover Autobiography", initials: "SC", location: "Beverly Hills, CA" },
  { quote: "I've bought 3 cars through VANTA now. The consistency in quality and service keeps me coming back every time.",      author: "Marcus Okafor",  car: "BMW X7 xDrive50i",         initials: "MO", location: "New York, NY" },
];

export default function HomePage() {
  const featured = CARS.filter((c) => c.available).slice(0, 4);
  const featuredRentals = RENTALS.filter((r) => r.available).slice(0, 3);
  const [selectedCar, setSelectedCar] = useState<import('@/lib/types').Car | null>(null);

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-[#080808]">

        {/* AMG Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1800&q=90&auto=format&fit=crop"
            alt="Mercedes-AMG GT"
            fill priority
            className="object-cover object-center scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
        </div>

        {/* AMG badge — top right */}
        <div className="absolute top-32 right-10 z-10 hidden lg:flex flex-col items-end gap-2">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C9A84C]/70 font-semibold">Featuring</p>
          <p className="font-black text-white text-[22px] tracking-[0.15em] uppercase leading-tight">Mercedes-AMG GT 63</p>
          <div className="h-px w-24 bg-gradient-to-l from-[#C9A84C] to-transparent mt-1" />
        </div>

        {/* Main content — bottom left */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-24 pt-40">
          <div className="max-w-2xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-7">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <p className="text-[#C9A84C] text-[13px] font-bold uppercase tracking-[0.35em]">
                Premium Certified Dealership · Est. 2008
              </p>
            </div>

            {/* Headline */}
            <h1 className="font-inter leading-[0.92] tracking-tight mb-8">
              <span className="block text-white font-light text-[clamp(3rem,7vw,6.5rem)]" style={{fontFamily:"'Cormorant Garamond', Georgia, serif", fontWeight:300}}>
                Drive What
              </span>
              <span className="block font-bold text-[clamp(3rem,7vw,6.5rem)]"
                style={{fontFamily:"'Cormorant Garamond', Georgia, serif", fontStyle:"italic", color:"#C9A84C"}}>
                Others Dream
              </span>
              <span className="block text-white font-light text-[clamp(3rem,7vw,6.5rem)]" style={{fontFamily:"'Cormorant Garamond', Georgia, serif", fontWeight:300}}>
                About.
              </span>
            </h1>

            {/* Sub */}
            <p className="text-white/55 text-[15px] leading-relaxed max-w-md mb-10 font-light tracking-wide">
              Over 200 hand-selected luxury vehicles. Transparent pricing.
              White-glove service from Beverly Hills to your driveway.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap mb-16">
              <Link href="/inventory"
                className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#C9A84C] text-black text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-[#E8C97A] transition-colors duration-300">
                Explore Collection <ArrowRight size={13} />
              </Link>
              <Link href="/rental"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full border border-white/25 text-white text-[11px] font-semibold uppercase tracking-[0.25em] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-300">
                Rent a Car
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-0 pt-10">
              {[
                ["200+", "Vehicles"],
                ["15+",  "Brands"],
                ["4.9★", "Rating"],
                ["16yr", "Trusted"],
              ].map(([val, lbl], i) => (
                <div key={lbl} className="flex items-center">
                  <div className="pr-8">
                    <p className="text-white font-bold text-[22px] leading-none"
                      style={{fontFamily:"'Cormorant Garamond', Georgia, serif"}}>{val}</p>
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-1">{lbl}</p>
                  </div>
                  {i < 3 && <div className="mr-8" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-10 flex flex-col items-center gap-2 opacity-40">
          <p className="text-white text-[9px] uppercase tracking-[0.35em] rotate-90 mb-4">Scroll</p>
          <div className="w-px h-14 bg-gradient-to-b from-[#C9A84C] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── STORY STRIP ── */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              { heading: "Curated, Not Collected", body: "Every vehicle in our showroom is hand-selected. We turn away more cars than we accept — because your trust is worth more than our volume." },
              { heading: "Transparent by Design",  body: "No hidden fees. No pressure tactics. Just honest pricing, full vehicle history, and a team that earns your business through integrity." },
              { heading: "Yours, For Life",         body: "Our relationship doesn't end at the handover. From servicing to trade-ins, we're your automotive partner for the long road ahead." },
            ].map(({ heading, body }) => (
              <div key={heading} className="bg-[#0a0a0a] px-10 py-12">
                <div className="gold-line mb-5" />
                <h3 className="font-inter font-bold text-white text-[17px] mb-3">{heading}</h3>
                <p className="text-white/35 text-[14px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="section bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="gold-line mb-3" />
              <h2 className="font-inter font-bold text-white text-3xl">Browse by Category</h2>
            </div>
            <Link href="/inventory" className="text-[13px] font-semibold text-white/40 hover:text-[#C9A84C] transition-colors flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(({ label, count, img, cat }) => (
              <Link key={cat} href={`/inventory?cat=${cat}`}
                className="relative rounded-sm overflow-hidden aspect-[4/5] group block">
                <Image src={img} alt={label} fill sizes="300px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-[15px]">{label}</h3>
                  <p className="text-white/50 text-[12px]">{count} vehicles</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedSection cars={featured} onCarClick={setSelectedCar} />

      {/* ── TRUST BAR ── */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-10 h-10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-[#C9A84C]" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-[14px] mb-1">{title}</h4>
                <p className="text-white/30 text-[13px] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RENTAL TEASER ── */}
      <section className="section bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <div className="gold-line mb-3" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">VANTA Rental</span>
              <h2 className="font-inter font-bold text-white text-3xl mt-2 mb-4">
                Not ready to own?<br />Experience it first.
              </h2>
              <p className="text-white/35 text-[15px] leading-relaxed mb-6">
                Drive the world's most coveted automobiles by the day. Every rental includes insurance, unlimited mileage, and white-glove delivery — to your door, your hotel, or your runway.
              </p>
              <Link href="/rental" className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-wide">
                <Key size={13} /> Explore Rental Fleet
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {featuredRentals.map((r) => (
                <Link key={r.id} href="/rental" className="group relative rounded-sm overflow-hidden aspect-[3/4] block">
                  <Image src={r.img} alt={r.name} fill sizes="200px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-semibold text-[12px] leading-tight">{r.name}</p>
                    <p className="text-gold text-[11px] font-bold mt-0.5">${r.dailyRate.toLocaleString()}/day</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section bg-[#0a0a0a] border-t border-white/5" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=85&auto=format&fit=crop"
              alt="LUXE showroom" fill sizes="600px" className="object-cover"
            />
            {/* Floating stat card */}
            <div className="absolute bottom-6 right-6 bg-[#0e0e0e]/95 backdrop-blur-sm border border-white/8 px-5 py-4">
              <p className="text-[#C9A84C] font-bold text-2xl">2,400+</p>
              <p className="text-white/50 text-[12px] font-medium">Satisfied Clients</p>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">About VANTA Motors</span>
            <h2 className="font-inter font-bold text-white text-3xl mt-3 mb-5">
              Sixteen years of getting it right.
            </h2>
            <p className="text-white/35 text-[15px] leading-relaxed mb-4">
              Founded in 2008, LUXE Auto Gallery was built on a single belief: that buying a luxury car should feel as exceptional as driving one. No pressure. No games. Just the right car, at the right price, with the right people.
            </p>
            <p className="text-white/35 text-[15px] leading-relaxed mb-7">
              Today we're one of the most trusted names in premium automotive retail — with a rental fleet, in-house finance, and a client list that keeps coming back.
            </p>
            <ul className="space-y-2.5 mb-8">
              {["Authorized dealer for 15+ premium brands", "Over 2,400 satisfied clients", "Award-winning customer service", "In-house financing & insurance"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[14px] text-white/60">
                  <span className="w-4 h-4 border border-[#C9A84C]/30 flex items-center justify-center shrink-0">
                    <CheckCircle size={11} className="text-[#C9A84C]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/inventory" className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 text-[12px] font-semibold tracking-wide uppercase">
              Explore Our Inventory <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section bg-[#080808] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="gold-line mb-4" />
              <h2 className="font-bold text-white text-3xl mb-2">What Our Clients Say</h2>
              <p className="text-white/30 text-[14px]">Real words from real buyers</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C9A84C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <span className="text-white/40 text-[13px]">4.9 / 5 · 2,400+ clients</span>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ quote, author, car, initials, location }, i) => (
              <div key={author}
                className="relative bg-[#0d0d0d] border border-white/[0.06] hover:border-[#C9A84C]/25 transition-all duration-300 p-8 group hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

                {/* Quote mark */}
                <div className="absolute top-6 right-7 text-[#C9A84C]/10 font-bold leading-none select-none"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "6rem" }}>
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="#C9A84C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/55 text-[14px] leading-[1.8] mb-8 relative z-10 italic">
                  &ldquo;{quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-[#C9A84C]/20 via-white/5 to-transparent mb-6" />

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                    <span className="text-[#C9A84C] font-bold text-[12px]">{initials}</span>
                  </div>
                  <div>
                    <p className="text-white/80 font-semibold text-[13px]">{author}</p>
                    <p className="text-white/25 text-[11px] mt-0.5">{location}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]/50">Purchased</p>
                    <p className="text-white/30 text-[11px] mt-0.5">{car}</p>
                  </div>
                </div>

                {/* Bottom gold line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative bg-[#0a0a0a] border-t border-white/5 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1800&q=60&auto=format&fit=crop"
            alt="" fill className="object-cover" sizes="100vw"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[#C9A84C] text-[11px] font-semibold uppercase tracking-[0.3em] mb-3">Your Next Chapter Starts Here</p>
            <h2 className="font-inter font-bold text-white text-3xl mb-2">Ready to Find Your Car?</h2>
            <p className="text-white/30 text-[15px]">Browse 200+ certified luxury vehicles or speak to a specialist today.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0 flex-wrap">
            <Link href="/inventory" className="btn-gold px-8 py-4 text-[12px] font-semibold tracking-wide uppercase">
              Browse Inventory
            </Link>
            <Link href="/rental" className="px-8 py-4 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] text-[12px] font-semibold tracking-wide uppercase hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-colors">
              View Rentals
            </Link>
            <a href="tel:+15551234567" className="px-8 py-4 rounded-full border border-white/10 text-white/40 text-[12px] font-semibold tracking-wide uppercase hover:border-white/30 hover:text-white transition-colors">
              Call a Specialist
            </a>
          </div>
        </div>
      </section>

      <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />

    </main>
  );
}
