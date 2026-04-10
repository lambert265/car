"use client";
import Image from "next/image";
import Link from "next/link";
import { Gauge, Calendar, Zap, ArrowUpRight, Heart, BarChart2 } from "lucide-react";
import type { Car } from "@/lib/types";
import { useWishlist } from "@/lib/wishlist";
import { useCompare } from "@/lib/compare";

const BADGE_STYLES: Record<string, string> = {
  Featured:      "bg-[#C9A84C] text-black",
  "New Arrival": "bg-white/8 text-white/60 border border-white/12",
  "Low Mileage": "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  Electric:      "bg-sky-500/15 text-sky-400 border border-sky-500/20",
  Premium:       "bg-violet-500/15 text-violet-400 border border-violet-500/20",
  Exotic:        "bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/25",
  Sold:          "bg-white/4 text-white/20 border border-white/8",
};

export default function CarCard({ car, onClick }: { car: Car; onClick?: () => void }) {
  const { toggle: wishToggle, has: wishHas } = useWishlist();
  const { toggle: cmpToggle,  has: cmpHas, ids: cmpIds } = useCompare();
  const wished   = wishHas(car.id);
  const compared = cmpHas(car.id);
  const cmpFull  = cmpIds.length >= 3 && !compared;

  const monthly = Math.round(
    (car.price * 0.8 * (0.039 / 12) * Math.pow(1 + 0.039 / 12, 60)) /
    (Math.pow(1 + 0.039 / 12, 60) - 1)
  );

  const content = (
    <div className="group relative bg-[#0d0d0d] border border-white/[0.06] hover:border-[#C9A84C]/40 transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(201,168,76,0.12),0_24px_64px_rgba(0,0,0,0.6)] hover:-translate-y-1 cursor-pointer overflow-hidden">

      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#080808]">
        <Image src={car.images[0]} alt={car.name} fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 group-hover:from-[#C9A84C]/5 to-transparent transition-all duration-500" />

        {/* Badge */}
        <span className={`absolute top-3 left-3 text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 ${BADGE_STYLES[car.badge] ?? "bg-white/8 text-white/50"}`}>
          {car.badge}
        </span>

        {/* Action icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); wishToggle(car.id); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm ${
              wished
                ? "bg-[#C9A84C] text-black"
                : "bg-black/50 text-white/40 hover:text-[#C9A84C] opacity-0 group-hover:opacity-100"
            }`}
            aria-label="Save to wishlist"
          >
            <Heart size={13} fill={wished ? "currentColor" : "none"} />
          </button>
          {/* Compare */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (!cmpFull) cmpToggle(car.id); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm ${
              compared
                ? "bg-[#C9A84C] text-black"
                : cmpFull
                  ? "bg-black/50 text-white/15 cursor-not-allowed opacity-0 group-hover:opacity-100"
                  : "bg-black/50 text-white/40 hover:text-[#C9A84C] opacity-0 group-hover:opacity-100"
            }`}
            aria-label="Add to compare"
            title={cmpFull ? "Max 3 cars" : compared ? "Remove from compare" : "Add to compare"}
          >
            <BarChart2 size={13} />
          </button>
        </div>

        {/* Arrow on hover */}
        <div className="absolute bottom-3 right-3 w-8 h-8 bg-[#C9A84C] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <ArrowUpRight size={14} className="text-black" strokeWidth={2.5} />
        </div>

        {!car.available && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <span className="text-white/30 font-bold text-sm tracking-[0.4em] uppercase border border-white/10 px-5 py-2">Sold</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/50">{car.brand}</p>
          <p className="text-[#C9A84C] font-bold text-[15px] leading-none shrink-0">${car.price.toLocaleString()}</p>
        </div>
        <h3 className="font-bold text-white/90 text-[15px] leading-snug mb-3 group-hover:text-white transition-colors duration-200">
          {car.year} {car.name}
        </h3>
        <div className="h-px bg-gradient-to-r from-[#C9A84C]/20 via-white/5 to-transparent mb-3" />
        <div className="flex items-center gap-4 text-[11px] text-white/25 mb-4">
          <span className="flex items-center gap-1.5"><Calendar size={10} strokeWidth={2} />{car.year}</span>
          <span className="flex items-center gap-1.5"><Gauge size={10} strokeWidth={2} />{car.mileage.toLocaleString()} mi</span>
          <span className="flex items-center gap-1.5"><Zap size={10} strokeWidth={2} />{car.specs.power}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-white/20">
            From <span className="text-white/35 font-semibold">${monthly.toLocaleString()}/mo</span>
          </p>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/20 group-hover:text-[#C9A84C] transition-colors duration-300 flex items-center gap-1">
            View Details <ArrowUpRight size={10} />
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );

  if (onClick) return <div onClick={onClick}>{content}</div>;
  return <Link href={`/inventory/${car.id}`}>{content}</Link>;
}
