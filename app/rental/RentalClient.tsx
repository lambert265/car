"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Users, Fuel, Zap, CheckCircle, Calendar, ArrowRight,
  X, Shield, Clock, MapPin, Star
} from "lucide-react";
import { RENTALS } from "@/lib/rentals";
import type { Rental } from "@/lib/rentals";

const CATEGORIES = ["All", "Sedan", "SUV", "Sport", "Convertible"];

const BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  "Most Popular": { bg: "bg-[#C9A84C]",          text: "text-black"      },
  "Ultra Luxury": { bg: "bg-white/8",             text: "text-white/70"   },
  "Exotic":       { bg: "bg-rose-500/15",         text: "text-rose-400"   },
  "Premium SUV":  { bg: "bg-emerald-500/15",      text: "text-emerald-400"},
  "Iconic":       { bg: "bg-sky-500/15",          text: "text-sky-400"    },
  "Reserved":     { bg: "bg-white/5",             text: "text-white/25"   },
};

function RentalCard({ car, onBook }: { car: Rental; onBook: (car: Rental) => void }) {
  const badge = BADGE_STYLES[car.badge] ?? { bg: "bg-white/8", text: "text-white/50" };

  return (
    <div className={`group relative bg-[#0d0d0d] border border-white/[0.06] hover:border-[#C9A84C]/35 transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(201,168,76,0.1),0_24px_64px_rgba(0,0,0,0.6)] hover:-translate-y-1 overflow-hidden flex flex-col ${!car.available ? "opacity-50" : ""}`}>

      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#080808]">
        <Image src={car.img} alt={car.name} fill sizes="500px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/10 to-transparent" />

        {/* Badge */}
        <span className={`absolute top-3 left-3 text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 ${badge.bg} ${badge.text}`}>
          {car.badge}
        </span>

        {/* Daily rate overlay */}
        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-2 border border-white/[0.08]">
          <p className="text-[#C9A84C] font-bold text-[17px] leading-none">${car.dailyRate.toLocaleString()}</p>
          <p className="text-white/30 text-[9px] uppercase tracking-wider mt-0.5">per day</p>
        </div>

        {!car.available && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white/30 font-bold tracking-[0.4em] uppercase text-sm border border-white/10 px-5 py-2">Reserved</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/50 mb-1">{car.brand}</p>
        <h3 className="font-bold text-white/90 text-[15px] leading-snug mb-3 group-hover:text-white transition-colors">
          {car.year} {car.name}
        </h3>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[#C9A84C]/20 via-white/5 to-transparent mb-4" />

        {/* Specs row */}
        <div className="flex items-center gap-4 text-[11px] text-white/25 mb-4">
          <span className="flex items-center gap-1.5"><Users size={10} strokeWidth={2} />{car.seats} seats</span>
          <span className="flex items-center gap-1.5"><Fuel size={10} strokeWidth={2} />{car.fuel}</span>
          <span className="flex items-center gap-1.5"><Zap size={10} strokeWidth={2} />{car.transmission}</span>
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-5 flex-1">
          {car.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[12px] text-white/40">
              <span className="w-1 h-1 rounded-full bg-[#C9A84C]/60 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          <div>
            <p className="text-[10px] text-white/20 uppercase tracking-wider">Weekly from</p>
            <p className="font-bold text-white/60 text-[14px]">${car.weeklyRate.toLocaleString()}</p>
          </div>
          <button
            disabled={!car.available}
            onClick={() => onBook(car)}
            className="btn-gold px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {car.available ? "Reserve Now" : "Unavailable"}
          </button>
        </div>
      </div>

      {/* Bottom gold line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

function BookingModal({ car, onClose }: { car: Rental; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#0d0d0d] border border-white/[0.08] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-[0_40px_120px_rgba(0,0,0,0.8)]">

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/60 mb-1">Reserve Vehicle</p>
            <h2 className="text-white font-bold text-lg leading-tight">{car.year} {car.name}</h2>
            <p className="text-white/30 text-[12px] mt-0.5">${car.dailyRate.toLocaleString()}/day · ${car.weeklyRate.toLocaleString()}/week</p>
          </div>
          <button onClick={onClose} className="text-white/20 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-14 h-14 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={26} className="text-[#C9A84C]" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Reservation Confirmed</h3>
              <p className="text-white/35 text-[13px] leading-relaxed max-w-xs mx-auto">
                Our concierge team will contact you within 1 hour to finalise your booking and arrange delivery.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Full Name *</label>
                  <input required type="text" placeholder="Your name"
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Phone *</label>
                  <input required type="tel" placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Email *</label>
                <input required type="email" placeholder="your@email.com"
                  className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Pick-up Date *</label>
                  <input required type="date"
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white/50 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Return Date *</label>
                  <input required type="date"
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white/50 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors [color-scheme:dark]" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Delivery Address</label>
                <input type="text" placeholder="Hotel, airport, or address"
                  className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Special Requests</label>
                <textarea rows={3} placeholder="Chauffeur, child seat, specific colour..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors resize-none" />
              </div>

              {/* Included note */}
              <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/10 p-4 text-[11px] text-white/30 leading-relaxed">
                <span className="text-[#C9A84C]/70 font-semibold">Included: </span>
                Full insurance · 24/7 roadside assistance · Unlimited mileage · Complimentary valet at pick-up
              </div>

              <button type="submit" className="btn-gold w-full py-4 text-[11px] font-bold uppercase tracking-[0.25em]">
                Confirm Reservation
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RentalClient() {
  const [activeCat,  setActiveCat]  = useState("All");
  const [bookingCar, setBookingCar] = useState<Rental | null>(null);

  const filtered = useMemo(() =>
    activeCat === "All" ? RENTALS : RENTALS.filter((r) => r.category === activeCat),
    [activeCat]
  );

  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#080808]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&q=85&auto=format&fit=crop"
            alt="Rental fleet" fill priority sizes="100vw"
            className="object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/90 to-[#080808]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60" />
          {/* Grid lines */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 119px,rgba(201,168,76,0.025) 119px,rgba(201,168,76,0.025) 120px)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-28 md:py-36">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <p className="text-[#C9A84C] text-[11px] font-bold uppercase tracking-[0.35em]">VANTA Rental Experience</p>
          </div>
          <h1 className="font-bold text-white leading-[0.92] tracking-tight mb-6 max-w-2xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 300 }}>
            Drive the world's finest.<br />
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>By the day.</em>
          </h1>
          <p className="text-white/40 text-[15px] leading-relaxed max-w-xl mb-12">
            Every rental includes full insurance, unlimited mileage, 24/7 concierge, and white-glove delivery — to your door, your hotel, or your runway.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 border-t border-white/[0.06] pt-10">
            {[["6", "Vehicles Available"], ["24/7", "Concierge"], ["$0", "Delivery Fee"], ["∞", "Mileage"]].map(([val, lbl]) => (
              <div key={lbl}>
                <p className="text-[#C9A84C] font-bold text-3xl leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{val}</p>
                <p className="text-white/25 text-[10px] uppercase tracking-[0.25em] mt-1.5">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[#0a0a0a] border-y border-white/[0.05] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="h-px w-8 bg-[#C9A84C] mx-auto mb-4" />
            <h2 className="text-white font-bold text-3xl mb-3">The Rental Experience</h2>
            <p className="text-white/30 text-[14px] max-w-md mx-auto">Not a car hire. A curated experience from first enquiry to final handover.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Choose Your Machine",    desc: "Browse our curated fleet of the world's most coveted automobiles." },
              { step: "02", title: "Reserve & Confirm",      desc: "Our concierge contacts you within 1 hour to finalise every detail." },
              { step: "03", title: "White-Glove Delivery",   desc: "Your vehicle arrives detailed, fuelled, and ready — wherever you are." },
              { step: "04", title: "Drive. Return. Repeat.", desc: "We collect the vehicle at your convenience. No queues. No counters." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <p className="text-[3.5rem] font-bold text-white/[0.04] leading-none mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{step}</p>
                <div className="h-px w-8 bg-[#C9A84C] mb-3" />
                <h3 className="text-white/80 font-semibold text-[14px] mb-2">{title}</h3>
                <p className="text-white/25 text-[12px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLEET ── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <div className="h-px w-8 bg-[#C9A84C] mb-3" />
              <h2 className="text-white font-bold text-3xl">Our Rental Fleet</h2>
              <p className="text-white/25 text-[13px] mt-1">{filtered.length} vehicle{filtered.length !== 1 ? "s" : ""} available</p>
            </div>
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setActiveCat(cat)}
                  className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-200 ${
                    activeCat === cat
                      ? "bg-[#C9A84C] text-black"
                      : "border border-white/[0.08] text-white/30 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((car) => (
              <RentalCard key={car.id} car={car} onBook={setBookingCar} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-[#0a0a0a] border-t border-white/[0.05] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Shield,   title: "Full Insurance Included",  desc: "Comprehensive coverage on every rental, no hidden excess" },
            { icon: Calendar, title: "Flexible Booking",         desc: "Change or cancel up to 48 hours before pick-up, no charge" },
            { icon: Users,    title: "Chauffeur Available",      desc: "Add a professional driver to any rental from $250/day" },
            { icon: MapPin,   title: "Airport & Hotel Delivery", desc: "We deliver and collect anywhere in the city, 24/7" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-10 h-10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                <Icon size={17} className="text-[#C9A84C]" />
              </div>
              <div>
                <h4 className="text-white/80 font-semibold text-[13px] mb-1">{title}</h4>
                <p className="text-white/25 text-[12px] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="h-px w-8 bg-[#C9A84C] mx-auto mb-4" />
            <h2 className="text-white font-bold text-3xl">Client Experiences</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { quote: "The Rolls-Royce Ghost arrived at my hotel at 6am, immaculate. The concierge team was extraordinary.", author: "James R.", vehicle: "Rolls-Royce Ghost" },
              { quote: "Rented the Huracán for a weekend. The process was seamless — no paperwork, no queues, just keys.", author: "Sofia K.", vehicle: "Lamborghini Huracán EVO" },
              { quote: "I've used VANTA Rental three times now. The standard never drops. Truly a different class of service.", author: "Marcus T.", vehicle: "Porsche 911 Carrera S" },
            ].map(({ quote, author, vehicle }) => (
              <div key={author} className="bg-[#0d0d0d] border border-white/[0.06] hover:border-[#C9A84C]/20 transition-colors p-7">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-[#C9A84C] fill-[#C9A84C]" />)}
                </div>
                <p className="text-white/40 text-[13px] leading-relaxed mb-6 italic">"{quote}"</p>
                <div className="pt-4 border-t border-white/[0.05]">
                  <p className="font-semibold text-white/70 text-[12px]">{author}</p>
                  <p className="text-white/20 text-[11px] mt-0.5">{vehicle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0a0a0a] border-t border-white/[0.05] text-center">
        <div className="max-w-xl mx-auto px-4">
          <div className="h-px w-8 bg-[#C9A84C] mx-auto mb-5" />
          <h2 className="text-white font-bold text-3xl mb-4">Need a Bespoke Experience?</h2>
          <p className="text-white/30 text-[14px] mb-8 leading-relaxed">
            Multi-day itineraries, wedding fleets, corporate events, or a single unforgettable evening — our concierge team handles everything.
          </p>
          <a href="tel:+15551234567"
            className="btn-gold inline-flex items-center gap-2.5 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em]">
            Speak to Our Concierge <ArrowRight size={13} />
          </a>
        </div>
      </section>

      {bookingCar && <BookingModal car={bookingCar} onClose={() => setBookingCar(null)} />}
    </div>
  );
}
