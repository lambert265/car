"use client";
import { useEffect, useState } from "react";
import { Clock, Calendar, Phone, Mail, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";

const STATUS_STYLES: Record<string, string> = {
  pending:   "bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/25",
  confirmed: "bg-sky-500/15 text-sky-400 border border-sky-500/20",
  completed: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  cancelled: "bg-white/5 text-white/20 border border-white/10",
};

export default function BookingsPage() {
  const [items,   setItems]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState("all");

  useEffect(() => {
    supabase.from("test_drives").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setItems(data ?? []); setLoading(false); });
  }, []);

  async function updateStatus(id: number, status: string) {
    await supabase.from("test_drives").update({ status }).eq("id", id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <div className="h-px w-8 bg-[#C9A84C] mb-3" />
        <h1 className="text-white font-bold text-2xl">Test Drive Bookings</h1>
        <p className="text-white/30 text-[13px] mt-1">{items.filter(i => i.status === "pending").length} pending · {items.length} total</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all","pending","confirmed","completed","cancelled"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${
              filter === s ? "bg-[#C9A84C] text-black" : "border border-white/[0.08] text-white/30 hover:border-[#C9A84C]/30 hover:text-[#C9A84C]"
            }`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-[#0d0d0d] border border-white/[0.06] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Client","Vehicle","Date","Showroom","Status","Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {loading ? Array.from({length:4}).map((_,i) => (
                <tr key={i}>{Array.from({length:6}).map((_,j) => (
                  <td key={j} className="px-5 py-4"><div className="h-3 bg-white/[0.04] rounded" /></td>
                ))}</tr>
              )) : filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-white/70 font-semibold text-[13px]">{item.name}</p>
                    <p className="text-white/25 text-[11px]">{item.email}</p>
                  </td>
                  <td className="px-5 py-4 text-white/50 text-[12px]">{item.car_name ?? "—"}</td>
                  <td className="px-5 py-4 text-white/40 text-[12px]">
                    {item.preferred_date ? new Date(item.preferred_date).toLocaleDateString() : "—"}
                    {item.preferred_time && <span className="text-white/20 ml-1">{item.preferred_time}</span>}
                  </td>
                  <td className="px-5 py-4 text-white/40 text-[12px]">{item.showroom ?? "—"}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-1 ${STATUS_STYLES[item.status] ?? ""}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {["confirmed","completed","cancelled"].filter(s => s !== item.status).map((s) => (
                        <button key={s} onClick={() => updateStatus(item.id, s)}
                          className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider border border-white/[0.08] text-white/25 hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-colors">
                          {s}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-white/20 text-[13px]">No bookings found</div>
        )}
      </div>
    </div>
  );
}
