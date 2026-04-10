"use client";
import { useWishlist } from "@/lib/wishlist";
import { CARS } from "@/lib/cars";
import CarCard from "@/components/CarCard";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export default function SavedPage() {
  const { ids } = useWishlist();
  const cars = CARS.filter((c) => ids.includes(c.id));

  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">
      <div className="bg-[#0a0a0a] border-b border-white/[0.05] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={18} className="text-[#C9A84C]" />
            <h1 className="text-white font-bold text-3xl">Saved Vehicles</h1>
          </div>
          <p className="text-white/30 text-[14px]">{cars.length} vehicle{cars.length !== 1 ? "s" : ""} saved</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {cars.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="w-16 h-16 border border-white/[0.08] flex items-center justify-center mx-auto mb-6">
              <Heart size={24} className="text-white/15" />
            </div>
            <h2 className="text-white/40 font-bold text-xl mb-3">No saved vehicles yet</h2>
            <p className="text-white/20 text-[14px] mb-8">Tap the heart icon on any car to save it here.</p>
            <Link href="/inventory" className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em]">
              Browse Inventory <ArrowRight size={13} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
