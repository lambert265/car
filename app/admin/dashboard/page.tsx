"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Car, MessageSquare, Calendar, Key, DollarSign, TrendingUp, ArrowRight, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Stats { cars: number; enquiries: number; testDrives: number; rentals: number; sellRequests: number; }

const STAT_CARDS = [
  { key: "cars",         label: "Total Vehicles",    icon: Car,           href: "/admin/inventory",     color: "text-[#C9A84C]",   bg: "bg-[#C9A84C]/10"  },
  { key: "enquiries",    label: "New Enquiries",      icon: MessageSquare, href: "/admin/enquiries",     color: "text-sky-400",     bg: "bg-sky-400/10"    },
  { key: "testDrives",   label: "Test Drive Bookings",icon: Calendar,      href: "/admin/bookings",      color: "text-violet-400",  bg: "bg-violet-400/10" },
  { key: "rentals",      label: "Rental Bookings",    icon: Key,           href: "/admin/rentals",       color: "text-emerald-400", bg: "bg-emerald-400/10"},
  { key: "sellRequests", label: "Sell Requests",      icon: DollarSign,    href: "/admin/sell-requests", color: "text-rose-400",    bg: "bg-rose-400/10"   },
];

export default function DashboardPage() {
  const [stats,    setStats]    = useState<Stats>({ cars: 0, enquiries: 0, testDrives: 0, rentals: 0, sellRequests: 0 });
  const [recent,   setRecent]   = useState<any[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    async function load() {
      const [cars, enq, td, rent, sell] = await Promise.all([
        supabase.from("cars").select("id", { count: "exact", head: true }),
        supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("test_drives").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("rental_bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("sell_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
      ]);
      setStats({
        cars:         cars.count  ?? 0,
        enquiries:    enq.count   ?? 0,
        testDrives:   td.count    ?? 0,
        rentals:      rent.count  ?? 0,
        sellRequests: sell.count  ?? 0,
      });

      const { data } = await supabase.from("enquiries")
        .select("id, name, car_name, created_at, status")
        .order("created_at", { ascending: false })
        .limit(6);
      setRecent(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <div className="h-px w-8 bg-[#C9A84C] mb-3" />
        <h1 className="text-white font-bold text-2xl">Dashboard Overview</h1>
        <p className="text-white/30 text-[13px] mt-1">Welcome back. Here's what's happening at VANTA Motors.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {STAT_CARDS.map(({ key, label, icon: Icon, href, color, bg }) => (
          <Link key={key} href={href}
            className="bg-[#0d0d0d] border border-white/[0.06] hover:border-[#C9A84C]/25 transition-all duration-200 p-5 group hover:-translate-y-0.5">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 ${bg} flex items-center justify-center`}>
                <Icon size={17} className={color} />
              </div>
              <ArrowRight size={13} className="text-white/10 group-hover:text-[#C9A84C]/50 transition-colors" />
            </div>
            <p className={`font-bold text-3xl leading-none mb-1 ${color}`} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              {loading ? "—" : (stats as any)[key]}
            </p>
            <p className="text-white/30 text-[11px] uppercase tracking-[0.15em]">{label}</p>
          </Link>
        ))}
      </div>

      {/* Recent enquiries + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent enquiries */}
        <div className="lg:col-span-2 bg-[#0d0d0d] border border-white/[0.06]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h2 className="text-white/70 font-semibold text-[13px]">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors">
              View All
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="px-6 py-4 flex items-center gap-4">
                  <div className="w-8 h-8 bg-white/[0.04] rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-32 bg-white/[0.04]" />
                    <div className="h-2 w-48 bg-white/[0.03]" />
                  </div>
                </div>
              ))
            ) : recent.length > 0 ? recent.map((e) => (
              <div key={e.id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#C9A84C] font-bold text-[10px]">{e.name?.[0]?.toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/70 font-semibold text-[13px] truncate">{e.name}</p>
                  <p className="text-white/25 text-[11px] truncate">{e.car_name ?? "General enquiry"}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-1 ${
                    e.status === "new" ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "bg-white/5 text-white/25"
                  }`}>{e.status}</span>
                  <p className="text-white/15 text-[10px] mt-1 flex items-center gap-1 justify-end">
                    <Clock size={9} />
                    {new Date(e.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )) : (
              <div className="px-6 py-12 text-center text-white/20 text-[13px]">No enquiries yet</div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-[#0d0d0d] border border-white/[0.06]">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h2 className="text-white/70 font-semibold text-[13px]">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: "Add New Vehicle",    href: "/admin/inventory/new",  gold: true  },
              { label: "View Enquiries",     href: "/admin/enquiries",      gold: false },
              { label: "Manage Bookings",    href: "/admin/bookings",       gold: false },
              { label: "Rental Bookings",    href: "/admin/rentals",        gold: false },
              { label: "Sell Requests",      href: "/admin/sell-requests",  gold: false },
              { label: "View Live Site",     href: "/",                     gold: false },
            ].map(({ label, href, gold }) => (
              <Link key={label} href={href}
                className={`flex items-center justify-between px-4 py-3 text-[12px] font-semibold transition-colors ${
                  gold
                    ? "bg-[#C9A84C] text-black hover:bg-[#E8C97A]"
                    : "border border-white/[0.07] text-white/40 hover:border-[#C9A84C]/30 hover:text-[#C9A84C]"
                }`}>
                {label}
                <ArrowRight size={12} />
              </Link>
            ))}
          </div>

          {/* Mini trend */}
          <div className="px-6 py-5 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={13} className="text-emerald-400" />
              <span className="text-emerald-400 text-[11px] font-semibold">+12% this month</span>
            </div>
            <p className="text-white/20 text-[11px]">Enquiries vs last month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
