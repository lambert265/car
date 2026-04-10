"use client";
import { useEffect, useState } from "react";
import { Clock, Mail, Phone, Car, CheckCircle, X, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";

const STATUS_STYLES: Record<string, string> = {
  new:     "bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/25",
  read:    "bg-sky-500/15 text-sky-400 border border-sky-500/20",
  replied: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  closed:  "bg-white/5 text-white/20 border border-white/10",
};

export default function EnquiriesPage() {
  const [items,   setItems]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected,setSelected]= useState<any>(null);
  const [filter,  setFilter]  = useState("all");

  useEffect(() => {
    supabase.from("enquiries").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setItems(data ?? []); setLoading(false); });
  }, []);

  async function updateStatus(id: number, status: string) {
    await supabase.from("enquiries").update({ status }).eq("id", id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
    if (selected?.id === id) setSelected((s: any) => ({ ...s, status }));
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <div className="h-px w-8 bg-[#C9A84C] mb-3" />
        <h1 className="text-white font-bold text-2xl">Enquiries</h1>
        <p className="text-white/30 text-[13px] mt-1">{items.filter(i => i.status === "new").length} new · {items.length} total</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all","new","read","replied","closed"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${
              filter === s ? "bg-[#C9A84C] text-black" : "border border-white/[0.08] text-white/30 hover:border-[#C9A84C]/30 hover:text-[#C9A84C]"
            }`}>
            {s} {s !== "all" && `(${items.filter(i => i.status === s).length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* List */}
        <div className="bg-[#0d0d0d] border border-white/[0.06] overflow-hidden">
          <div className="divide-y divide-white/[0.04]">
            {loading ? Array.from({length:5}).map((_,i) => (
              <div key={i} className="px-5 py-4 space-y-2">
                <div className="h-3 w-32 bg-white/[0.04]" />
                <div className="h-2.5 w-48 bg-white/[0.03]" />
              </div>
            )) : filtered.map((item) => (
              <button key={item.id} onClick={() => { setSelected(item); updateStatus(item.id, item.status === "new" ? "read" : item.status); }}
                className={`w-full text-left px-5 py-4 hover:bg-white/[0.02] transition-colors ${selected?.id === item.id ? "bg-[#C9A84C]/5 border-l-2 border-[#C9A84C]" : ""}`}>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="text-white/70 font-semibold text-[13px]">{item.name}</p>
                  <span className={`text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 shrink-0 ${STATUS_STYLES[item.status] ?? ""}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-white/30 text-[11px] truncate">{item.car_name ?? item.subject ?? "General enquiry"}</p>
                <p className="text-white/15 text-[10px] mt-1 flex items-center gap-1">
                  <Clock size={9} /> {new Date(item.created_at).toLocaleDateString()}
                </p>
              </button>
            ))}
            {!loading && filtered.length === 0 && (
              <div className="px-5 py-12 text-center text-white/20 text-[13px]">No enquiries</div>
            )}
          </div>
        </div>

        {/* Detail */}
        <div className="bg-[#0d0d0d] border border-white/[0.06]">
          {selected ? (
            <div className="p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]/60 mb-1">Enquiry #{selected.id}</p>
                  <h3 className="text-white font-bold text-lg">{selected.name}</h3>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/20 hover:text-white/60 transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Mail,  label: "Email",   val: selected.email   },
                  { icon: Phone, label: "Phone",   val: selected.phone   },
                  { icon: Car,   label: "Vehicle", val: selected.car_name },
                ].filter(r => r.val).map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon size={13} className="text-[#C9A84C]/50 shrink-0" />
                    <div>
                      <p className="text-[9px] text-white/20 uppercase tracking-wider">{label}</p>
                      <p className="text-white/60 text-[13px]">{val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {selected.message && (
                <div className="bg-white/[0.03] border border-white/[0.06] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-2">Message</p>
                  <p className="text-white/50 text-[13px] leading-relaxed">{selected.message}</p>
                </div>
              )}

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {["new","read","replied","closed"].map((s) => (
                    <button key={s} onClick={() => updateStatus(selected.id, s)}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
                        selected.status === s ? "bg-[#C9A84C] text-black" : "border border-white/[0.08] text-white/25 hover:border-[#C9A84C]/30 hover:text-[#C9A84C]"
                      }`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-white/15">
              <Eye size={24} className="mb-3" />
              <p className="text-[13px]">Select an enquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
