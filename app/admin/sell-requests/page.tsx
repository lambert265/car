"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const STATUS_STYLES: Record<string, string> = {
  new:      "bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/25",
  reviewed: "bg-sky-500/15 text-sky-400 border border-sky-500/20",
  offered:  "bg-violet-500/15 text-violet-400 border border-violet-500/20",
  accepted: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  declined: "bg-white/5 text-white/20 border border-white/10",
};

export default function SellRequestsPage() {
  const [items,    setItems]    = useState<any[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [offer,    setOffer]    = useState("");
  const [filter,   setFilter]   = useState("all");

  useEffect(() => {
    supabase.from("sell_requests").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setItems(data ?? []); setLoading(false); });
  }, []);

  async function updateStatus(id: number, status: string, offerPrice?: number) {
    const update: any = { status };
    if (offerPrice) update.offer_price = offerPrice;
    await supabase.from("sell_requests").update(update).eq("id", id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, ...update } : i));
    if (selected?.id === id) setSelected((s: any) => ({ ...s, ...update }));
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <div className="h-px w-8 bg-[#C9A84C] mb-3" />
        <h1 className="text-white font-bold text-2xl">Sell Requests</h1>
        <p className="text-white/30 text-[13px] mt-1">{items.filter(i => i.status === "new").length} new · {items.length} total</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all","new","reviewed","offered","accepted","declined"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${
              filter === s ? "bg-[#C9A84C] text-black" : "border border-white/[0.08] text-white/30 hover:border-[#C9A84C]/30 hover:text-[#C9A84C]"
            }`}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* List */}
        <div className="bg-[#0d0d0d] border border-white/[0.06] overflow-hidden">
          <div className="divide-y divide-white/[0.04]">
            {loading ? Array.from({length:4}).map((_,i) => (
              <div key={i} className="px-5 py-4 space-y-2">
                <div className="h-3 w-32 bg-white/[0.04]" />
                <div className="h-2.5 w-48 bg-white/[0.03]" />
              </div>
            )) : filtered.map((item) => (
              <button key={item.id} onClick={() => setSelected(item)}
                className={`w-full text-left px-5 py-4 hover:bg-white/[0.02] transition-colors ${selected?.id === item.id ? "bg-[#C9A84C]/5 border-l-2 border-[#C9A84C]" : ""}`}>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="text-white/70 font-semibold text-[13px]">{item.year} {item.make} {item.model}</p>
                  <span className={`text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 shrink-0 ${STATUS_STYLES[item.status] ?? ""}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-white/30 text-[11px]">{item.name} · {item.mileage?.toLocaleString()} mi · {item.condition}</p>
                {item.offer_price && (
                  <p className="text-[#C9A84C] text-[12px] font-bold mt-1">Offer: ${item.offer_price.toLocaleString()}</p>
                )}
              </button>
            ))}
            {!loading && filtered.length === 0 && (
              <div className="px-5 py-12 text-center text-white/20 text-[13px]">No sell requests</div>
            )}
          </div>
        </div>

        {/* Detail */}
        <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
          {selected ? (
            <div className="space-y-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]/60 mb-1">Request #{selected.id}</p>
                <h3 className="text-white font-bold text-lg">{selected.year} {selected.make} {selected.model}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Mileage",   selected.mileage ? `${selected.mileage.toLocaleString()} mi` : "—"],
                  ["Condition", selected.condition],
                  ["Client",    selected.name],
                  ["Phone",     selected.phone],
                  ["Email",     selected.email],
                ].map(([label, val]) => (
                  <div key={label} className="bg-white/[0.03] border border-white/[0.05] px-3 py-2.5">
                    <p className="text-[9px] text-white/20 uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-white/60 text-[12px] font-semibold">{val ?? "—"}</p>
                  </div>
                ))}
              </div>

              {selected.notes && (
                <div className="bg-white/[0.03] border border-white/[0.06] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-2">Notes</p>
                  <p className="text-white/50 text-[13px] leading-relaxed">{selected.notes}</p>
                </div>
              )}

              {/* Make offer */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-2">Make an Offer</p>
                <div className="flex gap-2">
                  <input type="number" value={offer} onChange={(e) => setOffer(e.target.value)}
                    placeholder="Offer price ($)"
                    className="flex-1 bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-2.5 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                  <button onClick={() => { if (offer) updateStatus(selected.id, "offered", Number(offer)); }}
                    className="btn-gold px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider">
                    Send Offer
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {["reviewed","accepted","declined"].filter(s => s !== selected.status).map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-white/[0.08] text-white/25 hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-colors">
                    Mark as {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-white/15">
              <p className="text-[13px]">Select a request to review</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
