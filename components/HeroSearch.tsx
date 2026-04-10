"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

const CATEGORIES = ["SUV", "Sedan", "Sport", "Electric"];
const PRICES = [
  { label: "Under $80,000",   value: "80000" },
  { label: "Under $120,000",  value: "120000" },
  { label: "Under $200,000",  value: "200000" },
  { label: "No Limit",        value: "" },
];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [cat,   setCat]   = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  function handleSearch() {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (cat)   params.set("cat", cat);
    if (price) params.set("price", price);
    router.push(`/inventory?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* ── Card ── */}
      <div className="bg-white/95 backdrop-blur-md rounded-sm shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden">

        {/* Fields row */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1px_1fr_1px_1fr] items-stretch">

          {/* Make / Model */}
          <div className="flex flex-col px-5 py-4">
            <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B] mb-1.5">
              Make / Model
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="e.g. BMW, Porsche..."
              className="bg-transparent text-[#1C1C1E] text-[13px] font-medium placeholder:text-[#C0BDB8] outline-none w-full"
            />
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px bg-[#EFEFED] self-stretch my-3" />

          {/* Category */}
          <div className="flex flex-col px-5 py-4 border-t border-[#EFEFED] sm:border-0">
            <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B] mb-1.5">
              Category
            </label>
            <div className="relative flex items-center">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="appearance-none bg-transparent text-[13px] font-medium text-[#1C1C1E] outline-none w-full cursor-pointer pr-5"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-0 text-[#9CA3AF] pointer-events-none" />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px bg-[#EFEFED] self-stretch my-3" />

          {/* Budget */}
          <div className="flex flex-col px-5 py-4 border-t border-[#EFEFED] sm:border-0">
            <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B] mb-1.5">
              Budget
            </label>
            <div className="relative flex items-center">
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="appearance-none bg-transparent text-[13px] font-medium text-[#1C1C1E] outline-none w-full cursor-pointer pr-5"
              >
                {PRICES.map(({ label, value }) => (
                  <option key={label} value={value}>{label}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-0 text-[#9CA3AF] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Search button — full width bottom bar */}
        <button
          onClick={handleSearch}
          className="w-full flex items-center justify-center gap-2.5 bg-gold hover:bg-[#9A7A2E] transition-colors duration-200 py-4 text-white text-[11px] font-semibold tracking-[0.25em] uppercase"
        >
          <Search size={14} strokeWidth={2.5} />
          Search Inventory
        </button>
      </div>

      {/* Quick filters */}
      <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => { setCat(c); router.push(`/inventory?cat=${c}`); }}
            className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white/80 hover:text-white text-[10px] font-medium tracking-[0.1em] uppercase transition-all duration-200"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
