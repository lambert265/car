"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Search } from "lucide-react";
import { CARS } from "@/lib/cars";
import CarCard from "@/components/CarCard";
import CardSkeleton from "@/components/CardSkeleton";
import type { Car } from "@/lib/types";

const BRANDS     = [...new Set(CARS.map((c) => c.brand))].sort();
const CATEGORIES = ["SUV", "Sedan", "Sport", "Electric"] as const;
const FUELS      = ["Petrol", "Electric", "Hybrid"] as const;
const MAX_PRICE  = Math.ceil(Math.max(...CARS.map((c) => c.price)) / 50000) * 50000;

const CURRENCIES = [
  { code: "USD", symbol: "$",  label: "USD — US Dollar",          rate: 1       },
  { code: "EUR", symbol: "€",  label: "EUR — Euro",               rate: 0.92    },
  { code: "GBP", symbol: "£",  label: "GBP — British Pound",      rate: 0.79    },
  { code: "JPY", symbol: "¥",  label: "JPY — Japanese Yen",       rate: 149.5   },
  { code: "CAD", symbol: "C$", label: "CAD — Canadian Dollar",    rate: 1.36    },
  { code: "AUD", symbol: "A$", label: "AUD — Australian Dollar",  rate: 1.53    },
  { code: "CHF", symbol: "Fr", label: "CHF — Swiss Franc",        rate: 0.90    },
  { code: "CNY", symbol: "¥",  label: "CNY — Chinese Yuan",       rate: 7.24    },
  { code: "AED", symbol: "د.إ",label: "AED — UAE Dirham",         rate: 3.67    },
  { code: "SAR", symbol: "﷼",  label: "SAR — Saudi Riyal",        rate: 3.75    },
  { code: "INR", symbol: "₹",  label: "INR — Indian Rupee",       rate: 83.1    },
  { code: "SGD", symbol: "S$", label: "SGD — Singapore Dollar",   rate: 1.34    },
  { code: "HKD", symbol: "HK$",label: "HKD — Hong Kong Dollar",   rate: 7.82    },
  { code: "MXN", symbol: "$",  label: "MXN — Mexican Peso",       rate: 17.2    },
  { code: "BRL", symbol: "R$", label: "BRL — Brazilian Real",     rate: 4.97    },
];

export const CurrencyContext = React.createContext({ symbol: "$", rate: 1, code: "USD" });

import React from "react";

function GoldCheckbox({ checked, onClick }: { checked: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`w-4 h-4 border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
        checked ? "bg-[#C9A84C] border-[#C9A84C]" : "border-white/15 hover:border-[#C9A84C]/50"
      }`}
    >
      {checked && <span className="text-black text-[9px] font-black">✓</span>}
    </div>
  );
}

function fmtPrice(n: number, symbol: string, rate: number) {
  const v = n * rate;
  if (v >= 1_000_000) return `${symbol}${(v / 1_000_000).toFixed(1)}M`;
  return `${symbol}${(v / 1000).toFixed(0)}k`;
}

export default function InventoryClient() {

export default function InventoryClient() {
  const params = useSearchParams();

  const [query,       setQuery]       = useState(params.get("q")    ?? "");
  const [cats,        setCats]        = useState<string[]>(params.get("cat") ? [params.get("cat")!] : []);
  const [brands,      setBrands]      = useState<string[]>([]);
  const [fuels,       setFuels]       = useState<string[]>([]);
  const [maxPrice,    setMaxPrice]    = useState(MAX_PRICE);
  const [availOnly,   setAvailOnly]   = useState(false);
  const [sort,        setSort]        = useState("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [openSecs,    setOpenSecs]    = useState<string[]>(["category", "brand", "price", "fuel"]);
  const [currency,    setCurrency]    = useState(CURRENCIES[0]);

  function toggleSec(s: string) {
    setOpenSecs((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  }
  function toggle(arr: string[], set: (v: string[]) => void, val: string) {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  }
  function clearAll() {
    setQuery(""); setCats([]); setBrands([]); setFuels([]);
    setMaxPrice(MAX_PRICE); setAvailOnly(false); setSort("default");
  }

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [query, cats, brands, fuels, maxPrice, availOnly, sort]);

  const results = useMemo(() => {
    let list: Car[] = CARS.filter((c) => {
      if (query && !c.name.toLowerCase().includes(query.toLowerCase()) && !c.brand.toLowerCase().includes(query.toLowerCase())) return false;
      if (cats.length   && !cats.includes(c.category))  return false;
      if (brands.length && !brands.includes(c.brand))   return false;
      if (fuels.length  && !fuels.includes(c.fuel))     return false;
      if (c.price > maxPrice)                            return false;
      if (availOnly && !c.available)                     return false;
      return true;
    });
    if (sort === "price-asc")   list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")  list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "year-desc")   list = [...list].sort((a, b) => b.year - a.year);
    if (sort === "mileage-asc") list = [...list].sort((a, b) => a.mileage - b.mileage);
    return list;
  }, [query, cats, brands, fuels, maxPrice, availOnly, sort]);

  // Count per category/brand/fuel from full dataset
  const catCounts    = useMemo(() => Object.fromEntries(CATEGORIES.map((c) => [c, CARS.filter((x) => x.category === c).length])), []);
  const brandCounts  = useMemo(() => Object.fromEntries(BRANDS.map((b) => [b, CARS.filter((x) => x.brand === b).length])), []);
  const fuelCounts   = useMemo(() => Object.fromEntries(FUELS.map((f) => [f, CARS.filter((x) => x.fuel === f).length])), []);

  // Active filter chips
  const activeChips: { label: string; onRemove: () => void }[] = [
    ...cats.map((c)    => ({ label: c,                  onRemove: () => setCats(cats.filter((x) => x !== c))       })),
    ...brands.map((b)  => ({ label: b,                  onRemove: () => setBrands(brands.filter((x) => x !== b))   })),
    ...fuels.map((f)   => ({ label: f,                  onRemove: () => setFuels(fuels.filter((x) => x !== f))     })),
    ...(maxPrice < MAX_PRICE ? [{ label: `Under ${fmtPrice(maxPrice, currency.symbol, currency.rate)}`, onRemove: () => setMaxPrice(MAX_PRICE) }] : []),
    ...(availOnly ? [{ label: "Available Only",          onRemove: () => setAvailOnly(false)                        }] : []),
    ...(query     ? [{ label: `"${query}"`,              onRemove: () => setQuery("")                               }] : []),
  ];

  const FilterPanel = () => (
    <aside className="space-y-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/60">Filters</h3>
        {activeChips.length > 0 && (
          <button onClick={clearAll} className="text-[10px] font-semibold uppercase tracking-wider text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors">
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div className="pb-5 border-b border-white/[0.06] mb-1">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search make, model..."
            className="w-full bg-white/[0.04] border border-white/[0.08] text-white/70 placeholder:text-white/20 text-[12px] pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/40 transition-colors"
          />
        </div>
      </div>

      {(["category", "brand", "price", "fuel"] as const).map((section) => {
        const isOpen = openSecs.includes(section);
        const labels = { category: "Category", brand: "Brand", price: "Max Price", fuel: "Fuel Type" };
        return (
          <div key={section} className="border-b border-white/[0.06]">
            <button onClick={() => toggleSec(section)} className="w-full flex items-center justify-between py-4 text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{labels[section]}</span>
              {isOpen
                ? <ChevronUp size={12} className="text-white/20" />
                : <ChevronDown size={12} className="text-white/20" />
              }
            </button>
            {isOpen && (
              <div className="pb-4 space-y-2.5">
                {section === "category" && CATEGORIES.map((c) => (
                  <label key={c} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <GoldCheckbox checked={cats.includes(c)} onClick={() => toggle(cats, setCats, c)} />
                      <span className="text-[12px] text-white/40 group-hover:text-white/70 transition-colors">{c}</span>
                    </div>
                    <span className="text-[10px] text-white/20">{catCounts[c] ?? 0}</span>
                  </label>
                ))}
                {section === "brand" && BRANDS.map((b) => (
                  <label key={b} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <GoldCheckbox checked={brands.includes(b)} onClick={() => toggle(brands, setBrands, b)} />
                      <span className="text-[12px] text-white/40 group-hover:text-white/70 transition-colors">{b}</span>
                    </div>
                    <span className="text-[10px] text-white/20">{brandCounts[b] ?? 0}</span>
                  </label>
                ))}
                {section === "price" && (
                  <div className="pt-1 pr-1">
                    <div className="flex justify-between mb-3">
                      <span className="text-[11px] text-white/25">Up to</span>
                      <span className="text-[12px] font-bold text-[#C9A84C]">{fmtPrice(maxPrice, currency.symbol, currency.rate)}</span>
                    </div>
                    <div className="relative h-px bg-white/[0.08] mb-1">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#C9A84C] transition-all"
                        style={{ width: `${((maxPrice - 50000) / (MAX_PRICE - 50000)) * 100}%` }}
                      />
                    </div>
                    <input
                      type="range" min={50000} max={MAX_PRICE} step={10000} value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-px opacity-0 cursor-pointer -mt-px"
                      style={{ accentColor: "#C9A84C" }}
                    />
                    <div className="flex justify-between mt-2 text-[10px] text-white/20">
                      <span>$50k</span><span>{fmtPrice(MAX_PRICE, currency.symbol, currency.rate)}</span>
                    </div>
                  </div>
                )}
                {section === "fuel" && FUELS.map((f) => (
                  <label key={f} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <GoldCheckbox checked={fuels.includes(f)} onClick={() => toggle(fuels, setFuels, f)} />
                      <span className="text-[12px] text-white/40 group-hover:text-white/70 transition-colors">{f}</span>
                    </div>
                    <span className="text-[10px] text-white/20">{fuelCounts[f] ?? 0}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="pt-5">
        <label className="flex items-center gap-3 cursor-pointer group">
          <GoldCheckbox checked={availOnly} onClick={() => setAvailOnly(!availOnly)} />
          <span className="text-[12px] text-white/40 group-hover:text-white/70 transition-colors font-medium">
            Available Only
          </span>
          <span className="ml-auto text-[10px] text-white/20">{CARS.filter((c) => c.available).length}</span>
        </label>
      </div>
    </aside>
  );

  return (
    <CurrencyContext.Provider value={{ symbol: currency.symbol, rate: currency.rate, code: currency.code }}>
    <div className="pt-[68px] bg-[#080808] min-h-screen">

      {/* Page header */}
      <div className="bg-[#0a0a0a] border-b border-white/[0.05] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] text-white/20 mb-2 tracking-wider uppercase">
            <span className="hover:text-[#C9A84C] cursor-pointer transition-colors">Home</span>
            <span className="mx-2 text-white/10">›</span>
            Inventory
          </p>
          <h1 className="text-white font-bold text-3xl tracking-tight mb-1">Our Inventory</h1>
          <p className="text-white/30 text-[14px]">
            {CARS.length} certified luxury vehicles, transparently priced.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex gap-8">

        {/* Desktop sidebar */}
        <div className="hidden lg:block w-60 shrink-0">
          <div className="bg-[#0d0d0d] border border-white/[0.06] p-6 sticky top-24">
            <FilterPanel />
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">

          {/* Active filter chips */}
          {activeChips.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {activeChips.map(({ label, onRemove }) => (
                <button
                  key={label}
                  onClick={onRemove}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C] text-[11px] font-semibold rounded-full hover:bg-[#C9A84C]/20 transition-colors"
                >
                  {label}
                  <X size={10} />
                </button>
              ))}
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-white/[0.08] text-white/25 text-[11px] rounded-full hover:border-white/20 hover:text-white/50 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-7 gap-4">
            <p className="text-[12px] text-white/25">
              <span className="font-semibold text-white/60">{results.length}</span> vehicle{results.length !== 1 ? "s" : ""} found
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-white/[0.08] text-[12px] font-medium text-white/40 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors"
              >
                <SlidersHorizontal size={13} /> Filters {activeChips.length > 0 && `(${activeChips.length})`}
              </button>
              {/* Currency selector */}
              <select
                value={currency.code}
                onChange={(e) => setCurrency(CURRENCIES.find(c => c.code === e.target.value)!)}
                className="bg-[#0d0d0d] border border-white/[0.08] text-white/40 text-[12px] px-3 py-2 focus:outline-none focus:border-[#C9A84C]/40 cursor-pointer hover:border-white/15 transition-colors"
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.code} {c.symbol}</option>
                ))}
              </select>
              <select
                value={sort} onChange={(e) => setSort(e.target.value)}
                className="bg-[#0d0d0d] border border-white/[0.08] text-white/40 text-[12px] px-3 py-2 focus:outline-none focus:border-[#C9A84C]/40 cursor-pointer hover:border-white/15 transition-colors"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="year-desc">Newest First</option>
                <option value="mileage-asc">Lowest Mileage</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map((car) => <CarCard key={car.id} car={car} />)}
            </div>
          ) : (
            <div className="text-center py-28 border border-white/[0.05]">
              <p className="text-white/20 text-[15px] mb-5">No vehicles match your filters.</p>
              <button onClick={clearAll} className="btn-gold px-6 py-3 text-[11px] font-bold uppercase tracking-widest">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-[#0d0d0d] border-l border-white/[0.06] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">Filters</h3>
              <button onClick={() => setSidebarOpen(false)} className="text-white/30 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}
    </div>
    </CurrencyContext.Provider>
  );
}
