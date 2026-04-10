"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Car } from "@/lib/types";
import CarCard from "@/components/CarCard";
import CarDetailModal from "@/components/CarDetailModal";

export default function FeaturedSection({ cars, onCarClick }: { cars: Car[]; onCarClick?: (car: Car) => void }) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleClick = (car: Car) => {
    if (onCarClick) onCarClick(car);
    else setSelectedCar(car);
  };

  return (
    <section className="section bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="gold-line mb-3" />
            <h2 className="font-bold text-white text-3xl">Featured Vehicles</h2>
            <p className="text-white/30 text-[14px] mt-1">Hand-picked from our current collection</p>
          </div>
          <Link href="/inventory" className="text-[13px] font-semibold text-white/30 hover:text-[#C9A84C] transition-colors flex items-center gap-1">
            View All Inventory <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} onClick={() => handleClick(car)} />
          ))}
        </div>
      </div>

      {!onCarClick && <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
    </section>
  );
}
