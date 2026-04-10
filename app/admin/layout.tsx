"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Car, MessageSquare, Calendar,
  Key, DollarSign, LogOut, Menu, X, ChevronRight, Bell
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const NAV = [
  { label: "Dashboard",     href: "/admin/dashboard",      icon: LayoutDashboard },
  { label: "Inventory",     href: "/admin/inventory",      icon: Car             },
  { label: "Enquiries",     href: "/admin/enquiries",      icon: MessageSquare   },
  { label: "Test Drives",   href: "/admin/bookings",       icon: Calendar        },
  { label: "Rentals",       href: "/admin/rentals",        icon: Key             },
  { label: "Sell Requests", href: "/admin/sell-requests",  icon: DollarSign      },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.replace("/sign-in");
      else setUser(data.user);
    });
  }, [router]);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/sign-in");
  }

  const Sidebar = ({ mobile = false }) => (
    <aside className={`${mobile ? "w-full" : "w-64"} bg-[#0a0a0a] border-r border-white/[0.06] flex flex-col h-full`}>
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/[0.06]">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-black text-white text-[18px] tracking-[0.22em] uppercase">VANTA</span>
          <span className="text-[#C9A84C] text-[7px] tracking-[0.6em] uppercase font-bold">Admin Panel</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-6 py-3.5 text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-200 group ${
                active
                  ? "text-[#C9A84C] bg-[#C9A84C]/8 border-r-2 border-[#C9A84C]"
                  : "text-white/30 hover:text-white/70 hover:bg-white/[0.03]"
              }`}>
              <Icon size={15} className={active ? "text-[#C9A84C]" : "text-white/20 group-hover:text-white/50"} />
              {label}
              {active && <ChevronRight size={12} className="ml-auto text-[#C9A84C]/50" />}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-6 py-5 border-t border-white/[0.06]">
        {user && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/25 flex items-center justify-center shrink-0">
              <span className="text-[#C9A84C] font-bold text-[11px]">
                {(user.user_metadata?.full_name || user.email || "A")[0].toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white/70 font-semibold text-[12px] truncate">{user.user_metadata?.full_name || "Admin"}</p>
              <p className="text-white/25 text-[10px] truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button onClick={signOut}
          className="flex items-center gap-2.5 text-[11px] text-white/25 hover:text-red-400 transition-colors uppercase tracking-wider w-full">
          <LogOut size={13} /> Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#080808] flex">

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-64 shrink-0 fixed top-0 left-0 bottom-0 z-40">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 h-full z-10">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#080808]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/30 hover:text-white transition-colors">
              <Menu size={20} />
            </button>
            <div>
              <p className="text-white/60 font-semibold text-[14px]">
                {NAV.find((n) => pathname.startsWith(n.href))?.label ?? "Admin"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 flex items-center justify-center text-white/25 hover:text-white/60 transition-colors">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C9A84C] rounded-full" />
            </button>
            <Link href="/" target="_blank"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 hover:text-[#C9A84C] transition-colors px-3 py-2 border border-white/[0.07] hover:border-[#C9A84C]/30">
              View Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
