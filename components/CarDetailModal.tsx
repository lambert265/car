"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ArrowRight, Phone, MessageCircle, Zap, Gauge, Timer, Fuel } from "lucide-react";
import type { Car } from "@/lib/types";

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
}

export default function CarDetailModal({ car, onClose }: CarDetailModalProps) {
  const [activeImg,  setActiveImg]  = useState(0);
  const [activeTab,  setActiveTab]  = useState<"specs" | "features" | "colours">("specs");

  useEffect(() => {
    if (car) {
      setActiveImg(0);
      setActiveTab("specs");
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [car]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!car) return;
      if (e.key === "ArrowLeft")  setActiveImg((i) => (i - 1 + car.images.length) % car.images.length);
      if (e.key === "ArrowRight") setActiveImg((i) => (i + 1) % car.images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [car, onClose]);

  if (!car) return null;

  const monthly = Math.round(
    (car.price * 0.8 * (3.9 / 100 / 12) * Math.pow(1 + 3.9 / 100 / 12, 60)) /
    (Math.pow(1 + 3.9 / 100 / 12, 60) - 1)
  );

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      <div
        className="relative z-10 w-full sm:max-w-5xl max-h-[96vh] sm:max-h-[90vh] bg-[#0d0d0d] border border-white/[0.07] overflow-hidden flex flex-col sm:flex-row shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile close button — always visible on small screens */}
        <button
          onClick={onClose}
          className="sm:hidden absolute top-3 right-3 z-20 w-9 h-9 bg-black/70 backdrop-blur-sm border border-white/[0.12] flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
        {/* ── LEFT: Gallery ── */}
        <div className="relative w-full sm:w-[52%] shrink-0 bg-[#080808] flex flex-col">

          {/* Main image */}
          <div className="relative aspect-[16/10] sm:aspect-auto sm:flex-1 overflow-hidden group">
            <Image
              key={activeImg}
              src={car.images[activeImg]}
              alt={car.name}
              fill sizes="600px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />

            {/* Badge */}
            <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-[#C9A84C] text-black">
              {car.badge}
            </span>

            {/* Availability */}
            <span className={`absolute top-4 right-12 text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 ${
              car.available
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : "bg-white/5 text-white/25 border border-white/10"
            }`}>
              {car.available ? "Available" : "Sold"}
            </span>

            {/* Arrow nav */}
            {car.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg((i) => (i - 1 + car.images.length) % car.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setActiveImg((i) => (i + 1) % car.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}

            {/* Price overlay */}
            <div className="absolute bottom-4 left-4">
              <p className="text-[#C9A84C] font-bold text-2xl leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                ${car.price.toLocaleString()}
              </p>
              <p className="text-white/30 text-[10px] mt-0.5">From ${monthly.toLocaleString()}/mo</p>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-1.5 p-3 bg-[#080808] border-t border-white/[0.05]">
            {car.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`relative w-16 aspect-[4/3] overflow-hidden border-2 transition-all shrink-0 ${
                  activeImg === i ? "border-[#C9A84C]" : "border-transparent opacity-40 hover:opacity-70"
                }`}>
                <Image src={img} alt={`View ${i + 1}`} fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>

          {/* Performance strip */}
          <div className="grid grid-cols-3 gap-px bg-white/[0.05] border-t border-white/[0.05]">
            {[
              { icon: Timer, label: "0–60",       value: car.zeroToSixty ? `${car.zeroToSixty}s` : `${car.specs.power}` },
              { icon: Gauge, label: "Top Speed",  value: car.topSpeed    ? `${car.topSpeed} mph`  : `${car.mileage.toLocaleString()} mi` },
              { icon: Zap,   label: "Power",      value: car.horsepower  ? `${car.horsepower} hp` : car.specs.power },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-[#0d0d0d] px-4 py-3 flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-white/25">
                  <Icon size={10} />
                  <span className="text-[9px] uppercase tracking-[0.2em]">{label}</span>
                </div>
                <span className="text-white/80 font-bold text-[13px]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Details ── */}
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">

          {/* Header */}
          <div className="px-6 pt-6 pb-5 border-b border-white/[0.06] shrink-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.3em] mb-1.5">
                  {car.brand} · {car.year}
                </p>
                <h2 className="text-white font-bold text-[22px] leading-tight">{car.name}</h2>
                <div className="flex items-center gap-3 mt-2 text-[11px] text-white/25">
                  <span className="flex items-center gap-1"><Gauge size={10} />{car.mileage.toLocaleString()} mi</span>
                  <span className="w-px h-3 bg-white/10" />
                  <span className="flex items-center gap-1"><Fuel size={10} />{car.fuel}</span>
                  <span className="w-px h-3 bg-white/10" />
                  <span>{car.category}</span>
                </div>
              </div>
              <button onClick={onClose}
                className="w-8 h-8 border border-white/[0.1] flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-colors shrink-0">
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/[0.06] shrink-0">
            {(["specs", "features", "colours"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors relative ${
                  activeTab === tab ? "text-[#C9A84C]" : "text-white/25 hover:text-white/50"
                }`}>
                {tab === "specs" ? "Specs" : tab === "features" ? "Features" : "Colours"}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto">

            {activeTab === "specs" && (
              <div className="p-6 space-y-0">
                {[
                  ["Engine",       car.engine       ?? car.specs.engine],
                  ["Power",        car.horsepower   ? `${car.horsepower} hp` : car.specs.power],
                  ["Torque",       car.torque       ? `${car.torque} lb-ft`  : car.specs.torque],
                  ["Transmission", car.transmission ?? car.specs.transmission],
                  ["Drivetrain",   car.drivetrain   ?? car.specs.drivetrain],
                  ["0 – 60 mph",   car.zeroToSixty  ? `${car.zeroToSixty} seconds` : "—"],
                  ["Top Speed",    car.topSpeed     ? `${car.topSpeed} mph`         : "—"],
                  ["Fuel Type",    car.fuelType     ?? car.fuel],
                  ...(car.range ? [["Range",        car.range]] : []),
                  ...(car.mpg   ? [["Fuel Economy", car.mpg]]   : []),
                  ["Seating",      car.seating      ? `${car.seating} passengers`   : `${car.specs.seats} passengers`],
                  ["Year",         String(car.year)],
                  ["Mileage",      `${car.mileage.toLocaleString()} miles`],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
                    <span className="text-white/30 text-[11px] uppercase tracking-[0.15em]">{label}</span>
                    <span className="text-white/70 text-[12px] font-semibold text-right max-w-[55%]">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "features" && (
              <div className="p-6">
                {car.infotainment && (
                  <div className="mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]/60 mb-2">Infotainment</p>
                    <p className="text-white/50 text-[12px] leading-relaxed bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                      {car.infotainment}
                    </p>
                  </div>
                )}
                {car.safetyFeatures && car.safetyFeatures.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]/60 mb-3">Safety & Driver Assist</p>
                    <div className="space-y-0">
                      {car.safetyFeatures.map((f) => (
                        <div key={f} className="flex items-center gap-3 py-2.5 border-b border-white/[0.05] last:border-0">
                          <span className="w-1 h-1 rounded-full bg-[#C9A84C]/60 shrink-0" />
                          <span className="text-white/50 text-[12px]">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {!car.infotainment && !car.safetyFeatures?.length && (
                  <p className="text-white/20 text-[13px] text-center py-10">Feature data not available.</p>
                )}
              </div>
            )}

            {activeTab === "colours" && (
              <div className="p-6">
                {car.colors && car.colors.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]/60 mb-4">Available Colours</p>
                    {car.colors.map(({ name, hex }) => (
                      <div key={name} className="flex items-center gap-4 py-3 border-b border-white/[0.05] last:border-0">
                        <div className="w-8 h-8 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: hex }} />
                        <span className="text-white/60 text-[13px]">{name}</span>
                        <span className="ml-auto text-white/20 text-[10px] font-mono">{hex}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/20 text-[13px] text-center py-10">Colour data not available.</p>
                )}
              </div>
            )}
          </div>

          {/* CTA footer */}
          <div className="p-5 border-t border-white/[0.06] shrink-0 space-y-2">
            <Link
              href={`/inventory/${car.id}`}
              onClick={onClose}
              className="btn-gold w-full flex items-center justify-center gap-2 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              View Full Details <ArrowRight size={13} />
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/15551234567?text=Hi, I'm interested in the ${encodeURIComponent(car.year + " " + car.name)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-full border border-emerald-500/25 text-emerald-400/70 text-[10px] font-bold uppercase tracking-[0.15em] hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle size={12} /> WhatsApp
              </a>
              <a
                href="tel:+15551234567"
                className="flex items-center justify-center gap-2 py-3 rounded-full border border-white/[0.08] text-white/30 text-[10px] font-bold uppercase tracking-[0.15em] hover:border-white/20 hover:text-white/60 transition-colors"
              >
                <Phone size={12} /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
