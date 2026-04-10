"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CARS } from "@/lib/cars";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart2 } from "lucide-react";

const ROWS = [
  { label: "Price",        key: (c: any) => `$${c.price.toLocaleString()}` },
  { label: "Year",         key: (c: any) => String(c.year) },
  { label: "Mileage",      key: (c: any) => `${c.mileage.toLocaleString()} mi` },
  { label: "Engine",       key: (c: any) => c.engine ?? c.specs.engine },
  { label: "Power",        key: (c: any) => c.horsepower ? `${c.horsepower} hp` : c.specs.power },
  { label: "Torque",       key: (c: any) => c.torque ? `${c.torque} lb-ft` : c.specs.torque },
  { label: "0–60 mph",     key: (c: any) => c.zeroToSixty ? `${c.zeroToSixty}s` : "—" },
  { label: "Top Speed",    key: (c: any) => c.topSpeed ? `${c.topSpeed} mph` : "—" },
  { label: "Transmission", key: (c: any) => c.transmission ?? c.specs.transmission },
  { label: "Drivetrain",   key: (c: any) => c.drivetrain ?? c.specs.drivetrain },
  { label: "Fuel",         key: (c: any) => c.fuel },
  { label: "Range / MPG",  key: (c: any) => c.range ?? c.mpg ?? "—" },
  { label: "Seating",      key: (c: any) => c.seating ? `${c.seating} seats` : `${c.specs.seats} seats` },
  { label: "Available",    key: (c: any) => c.available ? "✓ Available" : "Sold" },
];

function CompareContent() {
  const params = useSearchParams();
  const ids = (params.get("ids") ?? "").split(",").map(Number).filter(Boolean);
  const cars = ids.map((id) => CARS.find((c) => c.id === id)).filter(Boolean) as typeof CARS;

  if (cars.length < 2) {
    return (
      <div className="text-center py-32">
        <BarChart2 size={32} className="text-white/15 mx-auto mb-4" />
        <h2 className="text-white/40 font-bold text-xl mb-3">Select at least 2 cars to compare</h2>
        <p className="text-white/20 text-[14px] mb-8">Use the compare button on any car card to add it here.</p>
        <Link href="/inventory" className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em]">
          Browse Inventory <ArrowRight size={13} />
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        {/* Car headers */}
        <thead>
          <tr>
            <th className="w-40 shrink-0" />
            {cars.map((car) => (
              <th key={car.id} className="pb-6 px-4 text-left align-top">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0d0d] border border-white/[0.06] mb-4">
                  <Image src={car.images[0]} alt={car.name} fill sizes="300px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent" />
                </div>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]/60 mb-1">{car.brand}</p>
                <p className="text-white font-bold text-[15px] leading-tight">{car.year} {car.name}</p>
                <p className="text-[#C9A84C] font-bold text-[17px] mt-1">${car.price.toLocaleString()}</p>
                <Link href={`/inventory/${car.id}`}
                  className="btn-gold inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] mt-3">
                  View <ArrowRight size={10} />
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map(({ label, key }, i) => (
            <tr key={label} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
              <td className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/30 whitespace-nowrap">{label}</td>
              {cars.map((car) => {
                const val = key(car);
                const isGood = label === "Available" && val.includes("✓");
                const isBad  = label === "Available" && val === "Sold";
                return (
                  <td key={car.id} className={`py-3.5 px-4 text-[13px] font-semibold ${
                    isGood ? "text-emerald-400" : isBad ? "text-white/20" : "text-white/65"
                  }`}>
                    {val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">
      <div className="bg-[#0a0a0a] border-b border-white/[0.05] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <BarChart2 size={18} className="text-[#C9A84C]" />
            <h1 className="text-white font-bold text-3xl">Compare Vehicles</h1>
          </div>
          <p className="text-white/30 text-[14px]">Side-by-side specification comparison</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <Suspense fallback={<div className="text-white/20 text-center py-20">Loading...</div>}>
          <CompareContent />
        </Suspense>
      </div>
    </div>
  );
}
