"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Package, Heart, LogOut, Car, Calendar, DollarSign, ChevronRight, Clock } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

const STATUS_COLOR: Record<string, string> = {
  new:       "text-[#C9A84C] bg-[#C9A84C]/10",
  pending:   "text-[#C9A84C] bg-[#C9A84C]/10",
  read:      "text-sky-400 bg-sky-400/10",
  confirmed: "text-sky-400 bg-sky-400/10",
  replied:   "text-emerald-400 bg-emerald-400/10",
  completed: "text-emerald-400 bg-emerald-400/10",
  active:    "text-violet-400 bg-violet-400/10",
  closed:    "text-white/20 bg-white/5",
  cancelled: "text-white/20 bg-white/5",
};

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [enquiries,   setEnquiries]   = useState<any[]>([]);
  const [testDrives,  setTestDrives]  = useState<any[]>([]);
  const [rentals,     setRentals]     = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace("/account/sign-in");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [enq, td, rent] = await Promise.all([
        supabase.from("enquiries").select("*").eq("email", user!.email!).order("created_at", { ascending: false }),
        supabase.from("test_drives").select("*").eq("email", user!.email!).order("created_at", { ascending: false }),
        supabase.from("rental_bookings").select("*").eq("email", user!.email!).order("created_at", { ascending: false }),
      ]);
      setEnquiries(enq.data ?? []);
      setTestDrives(td.data ?? []);
      setRentals(rent.data ?? []);
      setDataLoading(false);
    }
    load();
  }, [user]);

  if (loading || !user) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
    </div>
  );

  const initials = (user.user_metadata?.full_name || user.email || "U")[0].toUpperCase();
  const name     = user.user_metadata?.full_name || "VANTA Member";

  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">

      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-white/[0.05] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center shrink-0">
              <span className="text-[#C9A84C] font-bold text-xl">{initials}</span>
            </div>
            <div>
              <div className="h-px w-6 bg-[#C9A84C] mb-2" />
              <h1 className="text-white font-bold text-xl">{name}</h1>
              <p className="text-white/30 text-[12px] mt-0.5">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/saved"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.08] text-white/30 text-[11px] font-bold uppercase tracking-[0.15em] hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-colors">
              <Heart size={13} /> Saved
            </Link>
            <button onClick={async () => { await signOut(); router.push("/"); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.08] text-white/25 text-[11px] font-bold uppercase tracking-[0.15em] hover:border-red-400/30 hover:text-red-400 transition-colors">
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Car,      label: "Enquiries",    count: enquiries.length   },
            { icon: Calendar, label: "Test Drives",  count: testDrives.length  },
            { icon: DollarSign,label:"Rentals",      count: rentals.length     },
          ].map(({ icon: Icon, label, count }) => (
            <div key={label} className="bg-[#0d0d0d] border border-white/[0.06] p-5 text-center">
              <Icon size={16} className="text-[#C9A84C]/50 mx-auto mb-2" />
              <p className="text-[#C9A84C] font-bold text-2xl leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{count}</p>
              <p className="text-white/25 text-[10px] uppercase tracking-[0.2em] mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Enquiries */}
        <Section title="Vehicle Enquiries" icon={Car} empty={enquiries.length === 0} emptyText="No enquiries yet. Browse our inventory to get started.">
          {enquiries.map((e) => (
            <OrderRow key={e.id}
              title={e.car_name ?? "General Enquiry"}
              sub={`Submitted ${new Date(e.created_at).toLocaleDateString()}`}
              status={e.status}
              href={e.car_id ? `/inventory/${e.car_id}` : "/inventory"}
            />
          ))}
        </Section>

        {/* Test Drives */}
        <Section title="Test Drive Bookings" icon={Calendar} empty={testDrives.length === 0} emptyText="No test drives booked yet.">
          {testDrives.map((t) => (
            <OrderRow key={t.id}
              title={t.car_name ?? "Test Drive"}
              sub={t.preferred_date ? `Requested for ${new Date(t.preferred_date).toLocaleDateString()} · ${t.showroom ?? ""}` : `Submitted ${new Date(t.created_at).toLocaleDateString()}`}
              status={t.status}
              href="/inventory"
            />
          ))}
        </Section>

        {/* Rentals */}
        <Section title="Rental Bookings" icon={DollarSign} empty={rentals.length === 0} emptyText="No rental bookings yet.">
          {rentals.map((r) => (
            <OrderRow key={r.id}
              title={r.car_name ?? "Rental"}
              sub={r.pickup_date ? `${new Date(r.pickup_date).toLocaleDateString()} → ${r.return_date ? new Date(r.return_date).toLocaleDateString() : "—"}` : `Submitted ${new Date(r.created_at).toLocaleDateString()}`}
              status={r.status}
              href="/rental"
            />
          ))}
        </Section>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Browse Inventory", href: "/inventory", icon: Car },
            { label: "Book a Test Drive", href: "/inventory", icon: Calendar },
            { label: "Rent a Car",        href: "/rental",    icon: DollarSign },
          ].map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href}
              className="flex items-center justify-between px-5 py-4 bg-[#0d0d0d] border border-white/[0.06] hover:border-[#C9A84C]/25 transition-colors group">
              <div className="flex items-center gap-3">
                <Icon size={14} className="text-[#C9A84C]/50" />
                <span className="text-white/50 text-[12px] font-semibold group-hover:text-white/80 transition-colors">{label}</span>
              </div>
              <ChevronRight size={13} className="text-white/15 group-hover:text-[#C9A84C]/50 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children, empty, emptyText }: {
  title: string; icon: any; children: React.ReactNode; empty: boolean; emptyText: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-6 bg-[#C9A84C]" />
        <h2 className="text-white/70 font-bold text-[14px] uppercase tracking-[0.15em]">{title}</h2>
      </div>
      <div className="bg-[#0d0d0d] border border-white/[0.06] overflow-hidden">
        {empty ? (
          <div className="px-6 py-10 text-center text-white/20 text-[13px]">{emptyText}</div>
        ) : (
          <div className="divide-y divide-white/[0.04]">{children}</div>
        )}
      </div>
    </div>
  );
}

function OrderRow({ title, sub, status, href }: { title: string; sub: string; status: string; href: string }) {
  return (
    <Link href={href} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors group">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-[#C9A84C]/8 border border-[#C9A84C]/15 flex items-center justify-center shrink-0">
          <Clock size={12} className="text-[#C9A84C]/50" />
        </div>
        <div>
          <p className="text-white/70 font-semibold text-[13px] group-hover:text-white transition-colors">{title}</p>
          <p className="text-white/25 text-[11px] mt-0.5">{sub}</p>
        </div>
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 shrink-0 ${STATUS_COLOR[status] ?? "text-white/20 bg-white/5"}`}>
        {status}
      </span>
    </Link>
  );
}
