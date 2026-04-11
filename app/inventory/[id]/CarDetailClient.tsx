"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone, MessageCircle, Calendar, Gauge, Fuel, ArrowRight,
  CheckCircle, X, ChevronLeft, ChevronRight, ZoomIn, ArrowLeft, ShoppingCart
} from "lucide-react";
import type { Car } from "@/lib/types";
import CarCard from "@/components/CarCard";
import { useCart } from "@/lib/cart";

function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);
  function prev() { setCurrent((c) => (c - 1 + images.length) % images.length); }
  function next() { setCurrent((c) => (c + 1) % images.length); }

  return (
    <div className="fixed inset-0 z-[100] bg-black/98 flex flex-col" onClick={onClose}>
      <div className="flex items-center justify-between px-6 py-4 shrink-0 border-b border-white/[0.05]" onClick={(e) => e.stopPropagation()}>
        <span className="text-white/25 text-[11px] tracking-[0.3em] uppercase">{current + 1} / {images.length}</span>
        <button onClick={onClose} className="text-white/30 hover:text-white transition-colors p-2"><X size={20} /></button>
      </div>
      <div className="flex-1 relative flex items-center justify-center px-16" onClick={(e) => e.stopPropagation()}>
        <button onClick={prev} className="absolute left-4 text-white/30 hover:text-[#C9A84C] transition-colors p-3 hover:bg-white/5">
          <ChevronLeft size={28} />
        </button>
        <div className="relative w-full max-w-5xl aspect-[16/9]">
          <Image src={images[current]} alt={`Image ${current + 1}`} fill sizes="90vw" className="object-contain" priority />
        </div>
        <button onClick={next} className="absolute right-4 text-white/30 hover:text-[#C9A84C] transition-colors p-3 hover:bg-white/5">
          <ChevronRight size={28} />
        </button>
      </div>
      <div className="flex items-center justify-center gap-3 px-6 py-5 shrink-0 border-t border-white/[0.05]" onClick={(e) => e.stopPropagation()}>
        {images.map((img, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`relative w-16 aspect-[4/3] overflow-hidden border-2 transition-all ${current === i ? "border-[#C9A84C] opacity-100" : "border-transparent opacity-30 hover:opacity-60"}`}>
            <Image src={img} alt={`Thumb ${i + 1}`} fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CarDetailClient({ car, similar }: { car: Car; similar: Car[] }) {
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox,  setLightbox]  = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const monthly = Math.round(
    (car.price * 0.8 * (3.9 / 100 / 12) * Math.pow(1 + 3.9 / 100 / 12, 60)) /
    (Math.pow(1 + 3.9 / 100 / 12, 60) - 1)
  );

  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">
      {lightbox !== null && (
        <Lightbox images={car.images} index={lightbox} onClose={() => setLightbox(null)} />
      )}

      {/* Breadcrumb */}
      <div className="bg-[#0a0a0a] border-b border-white/[0.05] px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] text-white/25 tracking-wider">
          <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
          <span className="text-white/10">›</span>
          <Link href="/inventory" className="hover:text-[#C9A84C] transition-colors">Inventory</Link>
          <span className="text-white/10">›</span>
          <span className="text-white/50">{car.year} {car.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Back link */}
        <Link href="/inventory" className="inline-flex items-center gap-2 text-[11px] text-white/25 hover:text-[#C9A84C] transition-colors mb-8 uppercase tracking-wider">
          <ArrowLeft size={12} /> Back to Inventory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* ── GALLERY ── */}
          <div>
            <div
              className="relative aspect-[16/10] overflow-hidden bg-[#0d0d0d] mb-3 cursor-zoom-in group border border-white/[0.06]"
              onClick={() => setLightbox(activeImg)}
            >
              <Image src={car.images[activeImg]} alt={car.name} fill sizes="700px"
                className="object-cover transition-transform duration-600 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
              {!car.available && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                  <span className="text-white/30 font-bold text-xl tracking-[0.4em] uppercase border border-white/10 px-6 py-3">Sold</span>
                </div>
              )}
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white/50 text-[10px] tracking-wider uppercase px-3 py-1.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={11} /> Full Screen
              </div>
            </div>
            <div className="flex gap-2">
              {car.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`relative w-20 aspect-[4/3] overflow-hidden border-2 transition-all duration-200 hover:opacity-90 ${activeImg === i ? "border-[#C9A84C]" : "border-white/[0.06] hover:border-white/20"}`}>
                  <Image src={img} alt={`View ${i + 1}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
              <button onClick={() => setLightbox(0)}
                className="w-20 aspect-[4/3] border-2 border-dashed border-white/[0.08] flex items-center justify-center text-white/20 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors">
                <ZoomIn size={16} />
              </button>
            </div>
          </div>

          {/* ── INFO ── */}
          <div>
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-[#C9A84C] text-black">{car.badge}</span>
              {car.available
                ? <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Available</span>
                : <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-white/4 text-white/20 border border-white/8">Sold</span>
              }
            </div>

            <h1 className="text-white font-bold text-3xl mb-2 leading-tight">{car.year} {car.name}</h1>
            <p className="text-[#C9A84C] font-bold text-3xl mb-5">${car.price.toLocaleString()}</p>

            {/* Quick specs */}
            <div className="flex items-center gap-5 text-[12px] text-white/30 mb-6">
              <span className="flex items-center gap-1.5"><Calendar size={13} />{car.year}</span>
              <span className="flex items-center gap-1.5"><Gauge size={13} />{car.mileage.toLocaleString()} mi</span>
              <span className="flex items-center gap-1.5"><Fuel size={13} />{car.fuel}</span>
            </div>

            <p className="text-white/45 text-[14px] leading-relaxed mb-7">{car.description}</p>

            {/* Performance strip */}
            {(car.zeroToSixty || car.topSpeed || car.horsepower) && (
              <div className="grid grid-cols-3 gap-px bg-white/[0.05] mb-6">
                {car.zeroToSixty && (
                  <div className="bg-[#0d0d0d] px-4 py-4 text-center">
                    <p className="text-[#C9A84C] font-bold text-xl leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{car.zeroToSixty}s</p>
                    <p className="text-white/25 text-[9px] uppercase tracking-[0.2em] mt-1">0–60 mph</p>
                  </div>
                )}
                {car.topSpeed && (
                  <div className="bg-[#0d0d0d] px-4 py-4 text-center">
                    <p className="text-[#C9A84C] font-bold text-xl leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{car.topSpeed}</p>
                    <p className="text-white/25 text-[9px] uppercase tracking-[0.2em] mt-1">Top Speed mph</p>
                  </div>
                )}
                {car.horsepower && (
                  <div className="bg-[#0d0d0d] px-4 py-4 text-center">
                    <p className="text-[#C9A84C] font-bold text-xl leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{car.horsepower}</p>
                    <p className="text-white/25 text-[9px] uppercase tracking-[0.2em] mt-1">Horsepower</p>
                  </div>
                )}
              </div>
            )}

            {/* Specs table */}
            <div className="bg-[#0d0d0d] border border-white/[0.06] p-5 mb-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]/60 mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {Object.entries(car.specs).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-[10px] text-white/20 uppercase tracking-wider block mb-0.5">{key}</span>
                    <span className="text-[13px] font-semibold text-white/70">{val}</span>
                  </div>
                ))}
                {car.range && (
                  <div>
                    <span className="text-[10px] text-white/20 uppercase tracking-wider block mb-0.5">Range</span>
                    <span className="text-[13px] font-semibold text-white/70">{car.range}</span>
                  </div>
                )}
                {car.mpg && (
                  <div>
                    <span className="text-[10px] text-white/20 uppercase tracking-wider block mb-0.5">Fuel Economy</span>
                    <span className="text-[13px] font-semibold text-white/70">{car.mpg}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Infotainment + Safety */}
            {(car.infotainment || (car.safetyFeatures && car.safetyFeatures.length > 0)) && (
              <div className="bg-[#0d0d0d] border border-white/[0.06] p-5 mb-3">
                {car.infotainment && (
                  <div className="mb-4">
                    <span className="text-[10px] text-white/20 uppercase tracking-wider block mb-1">Infotainment</span>
                    <span className="text-[13px] font-semibold text-white/70">{car.infotainment}</span>
                  </div>
                )}
                {car.safetyFeatures && car.safetyFeatures.length > 0 && (
                  <div>
                    <span className="text-[10px] text-white/20 uppercase tracking-wider block mb-2">Safety Features</span>
                    <div className="flex flex-wrap gap-2">
                      {car.safetyFeatures.map((f) => (
                        <span key={f} className="text-[10px] text-white/40 border border-white/[0.08] px-2.5 py-1">{f}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Color swatches */}
            {car.colors && car.colors.length > 0 && (
              <div className="bg-[#0d0d0d] border border-white/[0.06] p-5 mb-6">
                <span className="text-[10px] text-white/20 uppercase tracking-wider block mb-3">Available Colours</span>
                <div className="flex flex-wrap gap-3">
                  {car.colors.map(({ name, hex }) => (
                    <div key={name} className="flex items-center gap-2 group cursor-pointer">
                      <div className="w-5 h-5 rounded-full border border-white/20 group-hover:border-[#C9A84C]/60 transition-colors" style={{ backgroundColor: hex }} />
                      <span className="text-[11px] text-white/30 group-hover:text-white/60 transition-colors">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Finance teaser */}
            <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/15 p-4 mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]/70 mb-0.5">Finance from</p>
                <p className="font-bold text-white text-lg">
                  ${monthly.toLocaleString()}<span className="text-[13px] font-normal text-white/30">/mo</span>
                </p>
                <p className="text-[10px] text-white/20">20% down · 60 months · 3.9% APR</p>
              </div>
              <Link href="/finance" className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] hover:text-[#E8C97A] transition-colors flex items-center gap-1.5">
                Calculate <ArrowRight size={11} />
              </Link>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-3">
              <button
                onClick={() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-gold w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em]"
              >
                Request Viewing
              </button>
              <AddToCartButton car={car} />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/15551234567?text=Hi, I'm interested in the ${encodeURIComponent(car.year + " " + car.name)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-emerald-500/5 hover:border-emerald-500/50 transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a
                href="tel:+15551234567"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-white/[0.08] text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-white/20 hover:text-white/70 transition-colors"
              >
                <Phone size={14} /> Call
              </a>
            </div>
          </div>
        </div>

        {/* ── INQUIRY FORM ── */}
        <div id="inquiry" className="bg-[#0d0d0d] border border-white/[0.06] p-8 mb-16 max-w-3xl">
          <div className="mb-6">
            <div className="h-px w-8 bg-[#C9A84C] mb-4" />
            <h2 className="text-white font-bold text-2xl mb-1">Enquire About This Vehicle</h2>
            <p className="text-white/30 text-[13px]">A specialist will contact you within 2 hours.</p>
          </div>

          {submitted ? (
            <div className="flex items-center gap-3 py-8 text-emerald-400">
              <CheckCircle size={22} />
              <p className="font-semibold text-[15px]">Enquiry sent — we'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Full Name *</label>
                  <input required type="text" placeholder="Your full name"
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Phone *</label>
                  <input required type="tel" placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Email *</label>
                  <input required type="email" placeholder="your@email.com"
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Vehicle</label>
                  <input readOnly value={`${car.year} ${car.name}`}
                    className="w-full bg-white/[0.02] border border-white/[0.05] text-white/30 text-[13px] px-4 py-3 cursor-not-allowed" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Message</label>
                <textarea rows={4} placeholder="I'd like to schedule a viewing..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors resize-none" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 border border-white/15 group-hover:border-[#C9A84C]/50 transition-colors" />
                <span className="text-[12px] text-white/35 group-hover:text-white/60 transition-colors">I'd like to book a test drive</span>
              </label>
              <button type="submit" className="btn-gold px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em]">
                Send Enquiry
              </button>
            </form>
          )}
        </div>

        {/* ── SIMILAR VEHICLES ── */}
        {similar.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="h-px w-8 bg-[#C9A84C] mb-3" />
                <h2 className="text-white font-bold text-2xl">Similar Vehicles</h2>
              </div>
              <Link href="/inventory" className="text-[12px] font-semibold text-white/25 hover:text-[#C9A84C] transition-colors flex items-center gap-1 uppercase tracking-wider">
                View All <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map((c) => <CarCard key={c.id} car={c} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AddToCartButton({ car }: { car: Car }) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(car.id);

  return (
    <button
      onClick={() => addToCart(car)}
      disabled={inCart || !car.available}
      className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
        inCart
          ? "bg-white/5 text-white/20 border border-white/[0.08] cursor-not-allowed"
          : !car.available
          ? "bg-white/5 text-white/20 border border-white/[0.08] cursor-not-allowed"
          : "border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/5 hover:border-[#C9A84C]/50"
      }`}
    >
      <ShoppingCart size={14} />
      {inCart ? "In Cart" : !car.available ? "Sold Out" : "Add to Cart"}
    </button>
  );
}
