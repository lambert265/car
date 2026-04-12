"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

const TERMS = [24, 36, 48, 60, 72, 84];
const RATES = { excellent: 3.9, good: 5.9, fair: 8.9, poor: 12.9 } as const;
const FAQS = [
  { q: "What credit score do I need?",       a: "We work with all credit profiles. Rates from 3.9% APR are available for scores above 750. Our finance team will find the best option for your situation." },
  { q: "Can I finance a pre-owned vehicle?", a: "Yes. All certified pre-owned vehicles in our inventory are eligible for financing, with terms up to 84 months." },
  { q: "Is a deposit required?",             a: "A refundable reservation deposit of $2,500 is required to hold a vehicle. This is applied to your down payment at signing." },
  { q: "How long does approval take?",       a: "Most approvals are completed within 2–4 hours during business hours. Same-day delivery is available for approved buyers." },
  { q: "Can I trade in my current vehicle?", a: "Absolutely. We accept trade-ins on all makes and models. Our specialists will provide a fair market valuation within 24 hours." },
];

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function DarkSlider({ min, max, step, value, onChange, leftLabel, rightLabel }: {
  min: number; max: number; step: number; value: number;
  onChange: (v: number) => void; leftLabel: string; rightLabel: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="relative h-px bg-white/[0.08] mb-1">
        <div className="absolute top-0 left-0 h-full bg-[#C9A84C] transition-all" style={{ width: `${pct}%` }} />
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-px opacity-0 cursor-pointer -mt-px"
        style={{ accentColor: "#C9A84C" }}
      />
      <div className="flex justify-between mt-1.5 text-[10px] text-white/20">
        <span>{leftLabel}</span><span>{rightLabel}</span>
      </div>
    </div>
  );
}

export default function FinanceClient() {
  const [vehiclePrice, setVehiclePrice] = useState(115000);
  const [downPayment,  setDownPayment]  = useState(69000); // 60% of default price
  const [term,         setTerm]         = useState(60);
  const [credit,       setCredit]       = useState<keyof typeof RATES>("excellent");
  const [tradeIn,      setTradeIn]      = useState(0);
  const [openFaq,      setOpenFaq]      = useState<number | null>(null);

  const calc = useMemo(() => {
    const rate      = RATES[credit] / 100 / 12;
    const principal = Math.max(0, vehiclePrice - downPayment - tradeIn);
    const monthly   = principal === 0 ? 0 : (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalPaid = monthly * term + downPayment + tradeIn;
    const totalInt  = totalPaid - vehiclePrice;
    return { monthly, principal, totalPaid, totalInt };
  }, [vehiclePrice, downPayment, term, credit, tradeIn]);

  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative bg-[#080808] border-b border-white/[0.05] py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 119px,rgba(201,168,76,0.025) 119px,rgba(201,168,76,0.025) 120px)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <p className="text-[#C9A84C] text-[11px] font-bold uppercase tracking-[0.35em]">VANTA Finance</p>
            <div className="h-px w-8 bg-[#C9A84C]" />
          </div>
          <h1 className="text-white font-bold mb-4 leading-[0.95]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 300 }}>
            Drive Now.<br /><em style={{ color: "#C9A84C" }}>Pay Smart.</em>
          </h1>
          <p className="text-white/35 text-[15px] leading-relaxed max-w-lg mx-auto">
            Flexible financing from 3.9% APR. Tailored to your life, not just your credit score.
          </p>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="bg-[#0a0a0a] border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[["3.9%", "APR from"], ["84mo", "Max term"], ["2–4hr", "Approval time"], ["$0", "Hidden fees"]].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <p className="text-[#C9A84C] font-bold text-xl leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{val}</p>
              <p className="text-white/25 text-[10px] uppercase tracking-[0.2em] mt-1">{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ── CALCULATOR ── */}
          <div className="bg-[#0d0d0d] border border-white/[0.06] p-8">
            <div className="h-px w-8 bg-[#C9A84C] mb-5" />
            <h2 className="text-white font-bold text-2xl mb-1">Payment Calculator</h2>
            <p className="text-white/25 text-[13px] mb-8">Adjust the sliders to estimate your monthly payment.</p>

            <div className="space-y-8">

              {/* Vehicle Price */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Vehicle Price</label>
                  <span className="text-[13px] font-bold text-[#C9A84C]">{fmt(vehiclePrice)}</span>
                </div>
                <DarkSlider min={20000} max={300000} step={1000} value={vehiclePrice} onChange={setVehiclePrice} leftLabel="$20k" rightLabel="$300k" />
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Down Payment</label>
                  <span className="text-[13px] font-bold text-[#C9A84C]">{fmt(downPayment)}</span>
                </div>
                <DarkSlider min={0} max={Math.floor(vehiclePrice * 0.6)} step={500} value={downPayment} onChange={setDownPayment} leftLabel="$0" rightLabel={fmt(Math.floor(vehiclePrice * 0.6))} />
              </div>

              {/* Trade-In */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Trade-In Value</label>
                  <span className="text-[13px] font-bold text-[#C9A84C]">{fmt(tradeIn)}</span>
                </div>
                <DarkSlider min={0} max={80000} step={500} value={tradeIn} onChange={setTradeIn} leftLabel="$0" rightLabel="$80k" />
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-3">Loan Term</label>
                <div className="grid grid-cols-6 gap-2">
                  {TERMS.map((t) => (
                    <button key={t} onClick={() => setTerm(t)}
                      className={`py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                        term === t
                          ? "bg-[#C9A84C] text-black"
                          : "bg-white/[0.04] border border-white/[0.07] text-white/30 hover:border-[#C9A84C]/30 hover:text-[#C9A84C]"
                      }`}>
                      {t}mo
                    </button>
                  ))}
                </div>
              </div>

              {/* Credit Profile */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-3">Credit Profile</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(RATES) as [keyof typeof RATES, number][]).map(([key, rate]) => (
                    <button key={key} onClick={() => setCredit(key)}
                      className={`flex items-center justify-between px-4 py-3 border text-[12px] font-medium transition-all duration-200 ${
                        credit === key
                          ? "border-[#C9A84C]/50 bg-[#C9A84C]/8 text-white"
                          : "border-white/[0.07] text-white/30 hover:border-white/15"
                      }`}>
                      <span className="capitalize">{key}</span>
                      <span className={credit === key ? "text-[#C9A84C] font-bold" : "text-white/20"}>{rate}%</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RESULT ── */}
          <div className="space-y-5 lg:sticky lg:top-28">

            {/* Monthly payment */}
            <div className="bg-[#0d0d0d] border border-[#C9A84C]/20 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
              <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] mb-4 relative z-10">Estimated Monthly Payment</p>
              <p className="font-bold text-[#C9A84C] leading-none relative z-10"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3.5rem,9vw,5.5rem)" }}>
                {fmt(Math.round(calc.monthly))}
              </p>
              <p className="text-white/20 text-[11px] mt-3 relative z-10">{term} months · {RATES[credit]}% APR</p>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
            </div>

            {/* Breakdown */}
            <div className="bg-[#0d0d0d] border border-white/[0.06] p-6 space-y-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Loan Breakdown</p>
              {[
                ["Vehicle Price",   fmt(vehiclePrice),                    false],
                ["Down Payment",    `− ${fmt(downPayment)}`,              false],
                ["Trade-In Value",  `− ${fmt(tradeIn)}`,                  false],
                ["Amount Financed", fmt(calc.principal),                  true ],
                ["Total Interest",  fmt(Math.round(calc.totalInt)),       false],
                ["Total Cost",      fmt(Math.round(calc.totalPaid)),      false],
              ].map(([label, value, highlight]) => (
                <div key={label as string}
                  className={`flex justify-between py-3.5 border-b border-white/[0.05] last:border-0 text-[13px] ${
                    label === "Total Cost" ? "font-bold" : ""
                  }`}>
                  <span className="text-white/30">{label}</span>
                  <span className={highlight ? "text-[#C9A84C] font-semibold" : label === "Total Cost" ? "text-white/70" : "text-white/50"}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Trust points */}
            <div className="bg-[#0d0d0d] border border-white/[0.06] p-5 space-y-3">
              {["No hidden fees or prepayment penalties", "Same-day approval available", "Rates from 3.9% APR for qualified buyers", "Terms from 24 to 84 months"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-[12px] text-white/35">
                  <CheckCircle size={13} className="text-[#C9A84C] shrink-0" /> {item}
                </div>
              ))}
            </div>

            <Link href="/contact"
              className="btn-gold w-full flex items-center justify-center gap-2 py-4 text-[11px] font-bold uppercase tracking-[0.25em]">
              Apply for Finance <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="h-px w-8 bg-[#C9A84C] mx-auto mb-4" />
            <h2 className="text-white font-bold text-2xl">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-2">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="bg-[#0d0d0d] border border-white/[0.06] hover:border-[#C9A84C]/20 transition-colors overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                  <span className="font-semibold text-white/70 text-[13px] group-hover:text-white">{q}</span>
                  {openFaq === i
                    ? <ChevronUp size={14} className="text-[#C9A84C] shrink-0" />
                    : <ChevronDown size={14} className="text-white/20 shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-[13px] text-white/35 leading-relaxed border-t border-white/[0.05] pt-4">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
