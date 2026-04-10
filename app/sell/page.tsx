"use client";
import { useState } from "react";
import { CheckCircle, ArrowRight, Car, DollarSign, FileText, Phone } from "lucide-react";

const STEPS = [
  { icon: Car,       title: "Tell Us About Your Car",  desc: "Make, model, year, mileage and condition." },
  { icon: DollarSign,title: "Get Your Valuation",      desc: "We'll provide a fair market offer within 24 hours." },
  { icon: FileText,  title: "Accept & Book Handover",  desc: "Agree the price and schedule a convenient collection." },
  { icon: CheckCircle,title:"Get Paid",                desc: "Same-day bank transfer on collection. No delays." },
];

const MAKES = ["Mercedes-Benz","BMW","Porsche","Audi","Land Rover","Bentley","Ferrari","Lamborghini","McLaren","Rolls-Royce","Aston Martin","Tesla","Maserati","Jaguar","Lexus","Other"];

export default function SellPage() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ make:"", model:"", year:"", mileage:"", condition:"Excellent", name:"", email:"", phone:"", notes:"" });

  function set(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">

      {/* Hero */}
      <section className="relative bg-[#080808] border-b border-white/[0.05] py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 119px,rgba(201,168,76,0.025) 119px,rgba(201,168,76,0.025) 120px)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <p className="text-[#C9A84C] text-[11px] font-bold uppercase tracking-[0.35em]">Sell Your Car</p>
            <div className="h-px w-8 bg-[#C9A84C]" />
          </div>
          <h1 className="text-white font-bold mb-4 leading-[0.95]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 300 }}>
            Your car deserves<br /><em style={{ color: "#C9A84C" }}>the right buyer.</em>
          </h1>
          <p className="text-white/35 text-[15px] leading-relaxed max-w-lg mx-auto">
            We buy premium and luxury vehicles directly. No auctions, no middlemen — just a fair price and a seamless process.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#0a0a0a] border-b border-white/[0.05] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[#C9A84C]" />
                  </div>
                  <span className="text-[#C9A84C]/30 font-bold text-2xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-white/80 font-bold text-[14px] mb-2">{title}</h3>
                <p className="text-white/30 text-[12px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-[#0d0d0d] border border-white/[0.06] p-8">
          <div className="h-px w-8 bg-[#C9A84C] mb-5" />
          <h2 className="text-white font-bold text-2xl mb-1">Get Your Valuation</h2>
          <p className="text-white/25 text-[13px] mb-8">Fill in your vehicle details and we'll be in touch within 24 hours.</p>

          {submitted ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={24} className="text-[#C9A84C]" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Valuation Request Received</h3>
              <p className="text-white/30 text-[13px] leading-relaxed max-w-xs mx-auto">
                Our team will review your vehicle details and contact you within 24 hours with a fair market offer.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">

              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <button type="button" onClick={() => setStep(s)}
                      className={`w-7 h-7 rounded-full text-[11px] font-bold transition-all ${
                        step === s ? "bg-[#C9A84C] text-black" : "bg-white/[0.06] text-white/30 hover:bg-white/10"
                      }`}>{s}</button>
                    <span className="text-[11px] text-white/25">{s === 1 ? "Vehicle" : "Contact"}</span>
                    {s < 2 && <div className="w-8 h-px bg-white/[0.08]" />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Make *</label>
                      <select required value={form.make} onChange={(e) => set("make", e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] text-white/60 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors [color-scheme:dark]">
                        <option value="">Select make</option>
                        {MAKES.map((m) => <option key={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Model *</label>
                      <input required type="text" placeholder="e.g. 911 Carrera S" value={form.model} onChange={(e) => set("model", e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Year *</label>
                      <input required type="number" placeholder="2022" min="2000" max="2025" value={form.year} onChange={(e) => set("year", e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Mileage *</label>
                      <input required type="number" placeholder="12,000" value={form.mileage} onChange={(e) => set("mileage", e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-3">Condition</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["Excellent","Good","Fair","Poor"].map((c) => (
                        <button key={c} type="button" onClick={() => set("condition", c)}
                          className={`py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                            form.condition === c ? "bg-[#C9A84C] text-black" : "border border-white/[0.07] text-white/30 hover:border-[#C9A84C]/30 hover:text-[#C9A84C]"
                          }`}>{c}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Additional Notes</label>
                    <textarea rows={3} placeholder="Service history, modifications, any damage..." value={form.notes} onChange={(e) => set("notes", e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors resize-none" />
                  </div>
                  <button type="button" onClick={() => setStep(2)}
                    className="btn-gold w-full py-4 text-[11px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2">
                    Continue <ArrowRight size={13} />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Full Name *</label>
                      <input required type="text" placeholder="Your name" value={form.name} onChange={(e) => set("name", e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Phone *</label>
                      <input required type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Email *</label>
                    <input required type="email" placeholder="your@email.com" value={form.email} onChange={(e) => set("email", e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)}
                      className="flex-1 py-4 rounded-full border border-white/[0.08] text-white/30 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-white/20 hover:text-white/60 transition-colors">
                      Back
                    </button>
                    <button type="submit"
                      className="btn-gold flex-1 py-4 text-[11px] font-bold uppercase tracking-[0.25em]">
                      Submit Valuation Request
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[["24hr", "Valuation turnaround"], ["Same day", "Payment on collection"], ["No fees", "Zero hidden charges"]].map(([val, lbl]) => (
            <div key={lbl} className="bg-[#0d0d0d] border border-white/[0.06] p-4 text-center">
              <p className="text-[#C9A84C] font-bold text-[15px]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{val}</p>
              <p className="text-white/25 text-[10px] uppercase tracking-[0.15em] mt-1">{lbl}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
