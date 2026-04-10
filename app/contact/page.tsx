"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight } from "lucide-react";

const OFFICES = [
  { city: "Beverly Hills", address: "123 Prestige Drive, Beverly Hills, CA 90210", phone: "+1 (555) 123-4567", hours: "Mon–Sat: 9am–7pm · Sun: 10am–5pm" },
  { city: "New York",      address: "456 Fifth Avenue, New York, NY 10018",         phone: "+1 (555) 987-6543", hours: "Mon–Sat: 9am–7pm · Sun: Closed"    },
  { city: "Miami",         address: "789 Brickell Ave, Miami, FL 33131",            phone: "+1 (555) 456-7890", hours: "Mon–Sat: 10am–6pm · Sun: Closed"   },
];

export default function ContactPage() {
  const [submitted,    setSubmitted]    = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);

  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative bg-[#080808] border-b border-white/[0.05] py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 119px,rgba(201,168,76,0.025) 119px,rgba(201,168,76,0.025) 120px)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <p className="text-[#C9A84C] text-[11px] font-bold uppercase tracking-[0.35em]">Get In Touch</p>
            <div className="h-px w-8 bg-[#C9A84C]" />
          </div>
          <h1 className="text-white font-bold mb-4 leading-[0.95]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 300 }}>
            Let's start the<br /><em style={{ color: "#C9A84C" }}>conversation.</em>
          </h1>
          <p className="text-white/35 text-[15px] leading-relaxed max-w-md mx-auto">
            Our specialists respond within 2 hours. No bots. No scripts. Just people who love cars.
          </p>
        </div>
      </section>

      {/* ── OFFICES ── */}
      <section className="bg-[#0a0a0a] border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-0 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.05]">
          {OFFICES.map(({ city, address, phone, hours }, i) => (
            <button key={city} onClick={() => setActiveOffice(i)}
              className={`text-left px-8 py-8 transition-colors group ${activeOffice === i ? "bg-[#C9A84C]/5" : "hover:bg-white/[0.02]"}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${activeOffice === i ? "bg-[#C9A84C]" : "bg-white/15"}`} />
                <p className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-colors ${activeOffice === i ? "text-[#C9A84C]" : "text-white/30 group-hover:text-white/50"}`}>{city}</p>
              </div>
              <p className="text-white/50 text-[12px] leading-relaxed mb-2">{address}</p>
              <p className="text-white/30 text-[11px]">{phone}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* ── INFO PANEL ── */}
        <div>
          <div className="h-px w-8 bg-[#C9A84C] mb-5" />
          <h2 className="text-white font-bold text-2xl mb-2">{OFFICES[activeOffice].city} Showroom</h2>
          <p className="text-white/25 text-[13px] mb-8">Visit us in person or reach out through any channel below.</p>

          <div className="space-y-5 mb-10">
            {[
              { icon: MapPin, label: "Address", val: OFFICES[activeOffice].address },
              { icon: Phone,  label: "Phone",   val: OFFICES[activeOffice].phone   },
              { icon: Mail,   label: "Email",   val: "enquiries@vantamotors.com"   },
              { icon: Clock,  label: "Hours",   val: OFFICES[activeOffice].hours   },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-0.5">{label}</p>
                  <p className="text-[13px] text-white/55">{val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="bg-[#0d0d0d] border border-white/[0.06] h-56 flex flex-col items-center justify-center gap-3">
            <MapPin size={22} className="text-[#C9A84C]/40" />
            <p className="text-white/20 text-[12px] tracking-wider">{OFFICES[activeOffice].address}</p>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(OFFICES[activeOffice].address)}`}
              target="_blank" rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors flex items-center gap-1.5">
              Open in Maps <ArrowRight size={10} />
            </a>
          </div>

          {/* Quick contact buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <a href={`tel:${OFFICES[activeOffice].phone.replace(/\D/g, "")}`}
              className="flex items-center justify-center gap-2 py-3.5 border border-white/[0.08] text-white/35 text-[11px] font-bold uppercase tracking-[0.15em] hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors">
              <Phone size={13} /> Call Now
            </a>
            <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 border border-emerald-500/20 text-emerald-400/60 text-[11px] font-bold uppercase tracking-[0.15em] hover:border-emerald-500/40 hover:text-emerald-400 transition-colors">
              WhatsApp
            </a>
          </div>
        </div>

        {/* ── FORM ── */}
        <div className="bg-[#0d0d0d] border border-white/[0.06] p-8">
          <div className="h-px w-8 bg-[#C9A84C] mb-5" />
          <h2 className="text-white font-bold text-2xl mb-1">Send a Message</h2>
          <p className="text-white/25 text-[13px] mb-8">We'll respond within 2 business hours.</p>

          {submitted ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={24} className="text-[#C9A84C]" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Message Sent</h3>
              <p className="text-white/30 text-[13px] leading-relaxed max-w-xs mx-auto">
                A specialist will be in touch within 2 hours. We look forward to speaking with you.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Full Name *</label>
                  <input required type="text" placeholder="Your name"
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Phone</label>
                  <input type="tel" placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Email *</label>
                <input required type="email" placeholder="your@email.com"
                  className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Subject</label>
                <select className="w-full bg-white/[0.03] border border-white/[0.08] text-white/40 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors cursor-pointer [color-scheme:dark]">
                  <option>General Enquiry</option>
                  <option>Test Drive Booking</option>
                  <option>Finance Enquiry</option>
                  <option>Trade-In Valuation</option>
                  <option>Rental Enquiry</option>
                  <option>Vehicle Sourcing</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Preferred Showroom</label>
                <div className="grid grid-cols-3 gap-2">
                  {OFFICES.map(({ city }, i) => (
                    <button key={city} type="button" onClick={() => setActiveOffice(i)}
                      className={`py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                        activeOffice === i
                          ? "bg-[#C9A84C] text-black"
                          : "border border-white/[0.07] text-white/25 hover:border-[#C9A84C]/30 hover:text-[#C9A84C]"
                      }`}>
                      {city}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Message *</label>
                <textarea required rows={5} placeholder="How can we help you?"
                  className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors resize-none" />
              </div>
              <button type="submit"
                className="btn-gold w-full py-4 text-[11px] font-bold uppercase tracking-[0.25em]">
                Send Message
              </button>
              <p className="text-white/15 text-[11px] text-center">
                By submitting you agree to our Privacy Policy. We never share your data.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
