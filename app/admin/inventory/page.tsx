"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit2, Trash2, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminInventoryPage() {
  const [cars,    setCars]    = useState<any[]>([]);
  const [query,   setQuery]   = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
    setCars(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggleAvailable(id: number, current: boolean) {
    await supabase.from("cars").update({ available: !current }).eq("id", id);
    setCars((prev) => prev.map((c) => c.id === id ? { ...c, available: !current } : c));
  }

  async function deleteCar(id: number) {
    if (!confirm("Delete this vehicle? This cannot be undone.")) return;
    await supabase.from("cars").delete().eq("id", id);
    setCars((prev) => prev.filter((c) => c.id !== id));
  }

  const filtered = cars.filter((c) =>
    !query || c.name?.toLowerCase().includes(query.toLowerCase()) || c.brand?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="h-px w-8 bg-[#C9A84C] mb-3" />
          <h1 className="text-white font-bold text-2xl">Inventory</h1>
          <p className="text-white/30 text-[13px] mt-1">{cars.length} vehicles in database</p>
        </div>
        <Link href="/admin/inventory/new"
          className="btn-gold flex items-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em]">
          <Plus size={14} /> Add Vehicle
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
        <input value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Search make, model..."
          className="w-full bg-[#0d0d0d] border border-white/[0.08] text-white/70 placeholder:text-white/20 text-[12px] pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
      </div>

      {/* Table */}
      <div className="bg-[#0d0d0d] border border-white/[0.06] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Vehicle", "Price", "Category", "Fuel", "Mileage", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-5 py-4"><div className="h-3 bg-white/[0.04] rounded" /></td>
                    ))}
                  </tr>
                ))
              ) : filtered.map((car) => (
                <tr key={car.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {car.images?.[0] && (
                        <div className="relative w-14 aspect-[16/10] overflow-hidden bg-[#080808] shrink-0">
                          <Image src={car.images[0]} alt={car.name} fill sizes="56px" className="object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="text-white/70 font-semibold text-[13px]">{car.year} {car.name}</p>
                        <p className="text-[#C9A84C]/50 text-[10px] uppercase tracking-wider">{car.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#C9A84C] font-bold text-[13px]">${car.price?.toLocaleString()}</td>
                  <td className="px-5 py-4 text-white/40 text-[12px]">{car.category}</td>
                  <td className="px-5 py-4 text-white/40 text-[12px]">{car.fuel}</td>
                  <td className="px-5 py-4 text-white/40 text-[12px]">{car.mileage?.toLocaleString()} mi</td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleAvailable(car.id, car.available)}
                      className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        car.available ? "text-emerald-400" : "text-white/20"
                      }`}>
                      {car.available ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      {car.available ? "Available" : "Sold"}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/inventory/${car.id}`} target="_blank"
                        className="w-7 h-7 flex items-center justify-center text-white/25 hover:text-white/70 transition-colors border border-white/[0.08] hover:border-white/20">
                        <Eye size={12} />
                      </Link>
                      <Link href={`/admin/inventory/${car.id}/edit`}
                        className="w-7 h-7 flex items-center justify-center text-white/25 hover:text-[#C9A84C] transition-colors border border-white/[0.08] hover:border-[#C9A84C]/30">
                        <Edit2 size={12} />
                      </Link>
                      <button onClick={() => deleteCar(car.id)}
                        className="w-7 h-7 flex items-center justify-center text-white/25 hover:text-red-400 transition-colors border border-white/[0.08] hover:border-red-400/30">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-white/20 text-[13px]">No vehicles found</div>
        )}
      </div>
    </div>
  );
}
