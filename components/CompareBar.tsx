"use client";
import Link from "next/link";
import { X, ArrowRight, BarChart2 } from "lucide-react";
import { useCompare } from "@/lib/compare";
import { CARS } from "@/lib/cars";

export default function CompareBar() {
  const { ids, toggle, clear } = useCompare();
  if (ids.length === 0) return null;

  const cars = ids.map((id) => CARS.find((c) => c.id === id)!).filter(Boolean);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80] bg-[#0d0d0d]/98 backdrop-blur-xl border-t border-[#C9A84C]/20 shadow-[0_-8px_40px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <BarChart2 size={15} className="text-[#C9A84C]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Compare</span>
          <span className="text-[#C9A84C] text-[11px] font-bold">{ids.length}/3</span>
        </div>

        <div className="flex items-center gap-3 flex-1 overflow-x-auto no-scrollbar">
          {cars.map((car) => (
            <div key={car.id} className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.07] px-3 py-2 shrink-0">
              <span className="text-white/60 text-[12px] font-medium whitespace-nowrap">{car.year} {car.name}</span>
              <button onClick={() => toggle(car.id)} className="text-white/20 hover:text-white/60 transition-colors">
                <X size={12} />
              </button>
            </div>
          ))}
          {ids.length < 3 && (
            <div className="flex items-center gap-2 border border-dashed border-white/[0.1] px-3 py-2 shrink-0">
              <span className="text-white/20 text-[11px]">+ Add car</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button onClick={clear} className="text-[11px] text-white/25 hover:text-white/60 transition-colors uppercase tracking-wider">
            Clear
          </button>
          {ids.length >= 2 && (
            <Link href={`/compare?ids=${ids.join(",")}`}
              className="btn-gold flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em]">
              Compare Now <ArrowRight size={12} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
