"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Phone, ChevronDown, ArrowRight, Search, Heart, BarChart2, User, LogOut, Package, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/lib/wishlist";
import { useCompare } from "@/lib/compare";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { CARS } from "@/lib/cars";
import CartDrawer from "@/components/CartDrawer";

const NAV_LINKS = [
  { label: "Inventory", href: "/inventory" },
  {
    label: "Collection", href: "/inventory",
    children: [
      { label: "SUVs",        href: "/inventory?cat=SUV",      desc: `${CARS.filter(c=>c.category==="SUV").length} vehicles` },
      { label: "Sedans",      href: "/inventory?cat=Sedan",    desc: `${CARS.filter(c=>c.category==="Sedan").length} vehicles` },
      { label: "Sports Cars", href: "/inventory?cat=Sport",    desc: `${CARS.filter(c=>c.category==="Sport").length} vehicles` },
      { label: "Electric",    href: "/inventory?cat=Electric", desc: `${CARS.filter(c=>c.fuel==="Electric").length} vehicles` },
    ],
  },
  { label: "Rental",     href: "/rental"     },
  { label: "Finance",    href: "/finance"    },
  { label: "Sell",       href: "/sell"       },
  { label: "Showrooms",  href: "/showrooms"  },
  { label: "About",      href: "/about"      },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [dropdown,     setDropdown]     = useState<string | null>(null);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState("");
  const dropdownRef  = useRef<HTMLDivElement>(null);
  const searchRef    = useRef<HTMLInputElement>(null);
  const pathname     = usePathname();
  const router       = useRouter();
  const isHome       = pathname === "/";
  const transparent  = isHome && !scrolled;
  const { ids: wishIds }  = useWishlist();
  const { ids: cmpIds }   = useCompare();
  const { user, signOut } = useAuth();
  const { cart, guestCart, openAuthPrompt, setOpenAuthPrompt } = useCart();
  const cartCount = (user ? cart : guestCart).length;
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdown(null); setSearchOpen(false); setProfileOpen(false); }, [pathname]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  const searchResults = searchQuery.length > 1
    ? CARS.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/inventory?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        transparent ? "bg-transparent" : "bg-[#050505]/98 backdrop-blur-xl"
      }`}>

        {/* Top micro-bar */}
        <div className="hidden lg:flex items-center justify-between px-10 py-2">
          <div className="flex items-center gap-6 text-[10px] tracking-[0.25em] uppercase text-white/20">
            <span>Beverly Hills · Mon–Sat 9am–7pm</span>
            <span className="w-px h-3 bg-white/10" />
            <span>Certified Pre-Owned · Est. 2008</span>
          </div>
          <a href="tel:+15551234567"
            className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/25 hover:text-[#C9A84C] transition-colors duration-300">
            <Phone size={10} strokeWidth={2} /> +1 (555) 123-4567
          </a>
        </div>

        {/* Main nav */}
        <div className="flex items-center justify-between px-6 lg:px-10 h-16" ref={dropdownRef}>

          <Link href="/" className="flex flex-col leading-none shrink-0">
            <span className="font-black text-white text-[20px] tracking-[0.22em] uppercase">LUXE</span>
            <span className="text-[#C9A84C] text-[7px] tracking-[0.6em] uppercase font-bold mt-[-1px]">Motors</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] backdrop-blur-sm rounded-full px-2 py-1.5">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button onClick={() => setDropdown(dropdown === link.label ? null : link.label)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-200 ${
                      dropdown === link.label ? "bg-[#C9A84C] text-black" : "text-white/40 hover:text-white hover:bg-white/[0.06]"
                    }`}>
                    {link.label}
                    <ChevronDown size={10} className={`transition-transform duration-200 ${dropdown === link.label ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {dropdown === link.label && (
                      <motion.div initial={{ opacity: 0, y: 6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }} transition={{ duration: 0.16, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-3 w-56 bg-[#0c0c0c] border border-[#C9A84C]/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                        <div className="px-4 py-3 border-b border-white/[0.05]">
                          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/50">Browse Collection</p>
                        </div>
                        {link.children.map((child) => (
                          <Link key={child.label} href={child.href} onClick={() => setDropdown(null)}
                            className="flex items-center justify-between px-4 py-3.5 group/item hover:bg-[#C9A84C]/5 transition-colors border-b border-white/[0.04] last:border-0">
                            <div>
                              <p className="text-[12px] font-medium text-white/60 group-hover/item:text-white transition-colors">{child.label}</p>
                              <p className="text-[10px] text-white/20 mt-0.5">{child.desc}</p>
                            </div>
                            <ArrowRight size={11} className="text-white/15 group-hover/item:text-[#C9A84C] transition-colors" />
                          </Link>
                        ))}
                        <div className="p-3">
                          <Link href="/inventory" onClick={() => setDropdown(null)}
                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#C9A84C]/8 hover:bg-[#C9A84C]/15 border border-[#C9A84C]/20 text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
                            View All Inventory <ArrowRight size={10} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.label} href={link.href}
                  className={`relative px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-200 ${
                    pathname === link.href ? "bg-[#C9A84C]/10 text-[#C9A84C]" : "text-white/40 hover:text-white hover:bg-white/[0.06]"
                  }`}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button onClick={() => setCartOpen(true)}
              className="relative flex w-9 h-9 items-center justify-center text-white/30 hover:text-[#C9A84C] transition-colors rounded-full hover:bg-white/[0.05]">
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9A84C] rounded-full text-black text-[8px] font-black flex items-center justify-center">{cartCount}</span>
              )}
            </button>
            {/* Search */}
            <button onClick={() => setSearchOpen(true)}
              className="hidden lg:flex w-9 h-9 items-center justify-center text-white/30 hover:text-[#C9A84C] transition-colors rounded-full hover:bg-white/[0.05]">
              <Search size={16} />
            </button>
            {/* Wishlist */}
            <Link href="/saved"
              className="hidden lg:flex relative w-9 h-9 items-center justify-center text-white/30 hover:text-[#C9A84C] transition-colors rounded-full hover:bg-white/[0.05]">
              <Heart size={16} />
              {wishIds.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#C9A84C] rounded-full" />
              )}
            </Link>
            {/* Compare */}
            {cmpIds.length > 0 && (
              <Link href={`/compare?ids=${cmpIds.join(",")}`}
                className="hidden lg:flex relative w-9 h-9 items-center justify-center text-[#C9A84C] transition-colors rounded-full bg-[#C9A84C]/10">
                <BarChart2 size={16} />
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9A84C] rounded-full text-black text-[8px] font-black flex items-center justify-center">
                  {cmpIds.length}
                </span>
              </Link>
            )}
            {/* Profile */}
            <div className="hidden lg:block relative" ref={profileRef}>
              <button onClick={() => setProfileOpen((v) => !v)}
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
                  profileOpen ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "text-white/30 hover:text-[#C9A84C] hover:bg-white/[0.05]"
                }`}>
                {user ? (
                  <div className="w-7 h-7 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center">
                    <span className="text-[#C9A84C] font-bold text-[10px]">
                      {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <User size={16} />
                )}
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-64 bg-[#0c0c0c] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-50"
                  >
                    {user ? (
                      <>
                        <div className="px-5 py-4 border-b border-white/[0.06]">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center shrink-0">
                              <span className="text-[#C9A84C] font-bold text-sm">
                                {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-white/80 font-semibold text-[13px] truncate">
                                {user.user_metadata?.full_name || "LUXE Member"}
                              </p>
                              <p className="text-white/25 text-[11px] truncate">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          <Link href="/account" onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-5 py-2.5 text-[12px] text-white/50 hover:text-[#C9A84C] hover:bg-white/[0.03] transition-colors">
                            <User size={13} /> My Account
                          </Link>
                          <Link href="/account" onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-5 py-2.5 text-[12px] text-white/50 hover:text-[#C9A84C] hover:bg-white/[0.03] transition-colors">
                            <Package size={13} /> My Orders
                          </Link>
                          <Link href="/saved" onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-5 py-2.5 text-[12px] text-white/50 hover:text-[#C9A84C] hover:bg-white/[0.03] transition-colors">
                            <Heart size={13} /> Saved Vehicles
                            {wishIds.length > 0 && <span className="ml-auto text-[#C9A84C] text-[10px] font-bold">{wishIds.length}</span>}
                          </Link>
                        </div>
                        <div className="border-t border-white/[0.06] py-2">
                          <button onClick={async () => { await signOut(); setProfileOpen(false); router.push("/"); }}
                            className="flex items-center gap-3 w-full px-5 py-2.5 text-[12px] text-red-400/60 hover:text-red-400 hover:bg-white/[0.03] transition-colors">
                            <LogOut size={13} /> Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-5 space-y-3">
                        <p className="text-white/25 text-[12px] mb-4">Sign in to track your enquiries, bookings and saved vehicles.</p>
                        <Link href="/account/sign-in" onClick={() => setProfileOpen(false)}
                          className="flex items-center justify-center w-full h-10 bg-[#C9A84C] text-black font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-[#E8C97A] transition-colors">
                          Sign In
                        </Link>
                        <Link href="/account/sign-in" onClick={() => setProfileOpen(false)}
                          className="flex items-center justify-center w-full h-10 border border-white/[0.1] text-white/40 text-[11px] tracking-[0.2em] uppercase hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors">
                          Create Account
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/inventory"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C9A84C] text-black text-[10px] font-black tracking-[0.2em] uppercase hover:bg-[#E8C97A] active:bg-[#B8963E] transition-colors duration-200">
              Browse
            </Link>
            <button onClick={() => setMobileOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-white/50 hover:text-white transition-colors" aria-label="Open menu">
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* ── SEARCH OVERLAY ── */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md" onClick={() => setSearchOpen(false)} />
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 left-0 right-0 z-[70] bg-[#0d0d0d] border-b border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto px-6 py-5 flex items-center gap-4">
                <Search size={18} className="text-[#C9A84C]/60 shrink-0" />
                <input ref={searchRef} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by make, model, or keyword..."
                  className="flex-1 bg-transparent text-white/80 placeholder:text-white/20 text-[16px] focus:outline-none" />
                <button type="button" onClick={() => setSearchOpen(false)} className="text-white/20 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </form>
              {searchResults.length > 0 && (
                <div className="max-w-3xl mx-auto px-6 pb-4 space-y-1">
                  {searchResults.map((car) => (
                    <Link key={car.id} href={`/inventory/${car.id}`} onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.04] transition-colors group">
                      <div>
                        <p className="text-white/70 text-[13px] font-medium group-hover:text-white transition-colors">{car.year} {car.name}</p>
                        <p className="text-white/25 text-[11px]">{car.brand} · {car.category}</p>
                      </div>
                      <p className="text-[#C9A84C] font-bold text-[13px]">${car.price.toLocaleString()}</p>
                    </Link>
                  ))}
                  <div className="pt-2 pb-1">
                    <button onClick={() => { router.push(`/inventory?q=${encodeURIComponent(searchQuery)}`); setSearchOpen(false); }}
                      className="text-[11px] text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors uppercase tracking-wider flex items-center gap-1.5">
                      View all results for "{searchQuery}" <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Guest auth prompt */}
      <AnimatePresence>
        {openAuthPrompt && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setOpenAuthPrompt(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-[#0d0d0d] border border-[#C9A84C]/20 p-8 w-full max-w-sm text-center"
              onClick={e => e.stopPropagation()}>
              <ShoppingBag size={28} className="text-[#C9A84C] mx-auto mb-4" />
              <h3 className="text-white font-bold text-[18px] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Save Your Selection</h3>
              <p className="text-white/35 text-[13px] mb-6">Sign in to save your cart and complete your enquiry.</p>
              <div className="space-y-2">
                <Link href="/account/sign-in" onClick={() => setOpenAuthPrompt(false)}
                  className="flex items-center justify-center w-full py-3 bg-[#C9A84C] text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#E8C97A] transition-colors">
                  Sign In
                </Link>
                <button onClick={() => setOpenAuthPrompt(false)}
                  className="w-full py-3 border border-white/[0.08] text-white/30 text-[11px] uppercase tracking-wider hover:text-white transition-colors">
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-[300px] bg-[#080808] border-l border-[#C9A84C]/10 flex flex-col">
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.06] shrink-0">
                <div className="flex flex-col leading-none">
                  <span className="font-black text-white text-[17px] tracking-[0.2em] uppercase">LUXE</span>
                  <span className="text-[#C9A84C] text-[7px] tracking-[0.55em] uppercase font-bold">Motors</span>
                </div>
                <button onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center text-white/25 hover:text-white border border-white/[0.08] hover:border-white/20 transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Mobile search */}
              <div className="px-6 py-4 border-b border-white/[0.05]">
                <form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) { router.push(`/inventory?q=${encodeURIComponent(searchQuery)}`); setMobileOpen(false); }}}
                  className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] px-3 py-2.5">
                  <Search size={13} className="text-white/20 shrink-0" />
                  <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search inventory..."
                    className="flex-1 bg-transparent text-white/70 placeholder:text-white/20 text-[13px] focus:outline-none" />
                </form>
              </div>

              <nav className="flex-1 overflow-y-auto py-4">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <Link href={link.href} onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-6 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase border-b border-white/[0.05] transition-colors ${
                        pathname === link.href ? "text-[#C9A84C] bg-[#C9A84C]/5" : "text-white/35 hover:text-white hover:bg-white/[0.03]"
                      }`}>
                      {link.label}
                      <ArrowRight size={11} className="opacity-25" />
                    </Link>
                    {link.children && (
                      <div className="bg-white/[0.02]">
                        {link.children.map((child) => (
                          <Link key={child.label} href={child.href} onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between pl-10 pr-6 py-3 text-[11px] text-white/20 hover:text-[#C9A84C] border-b border-white/[0.04] last:border-0 transition-colors">
                            {child.label}
                            <span className="text-white/10 text-[10px]">{child.desc}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link href="/saved" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-6 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase border-b border-white/[0.05] text-white/35 hover:text-[#C9A84C] transition-colors">
                  Saved {wishIds.length > 0 && <span className="text-[#C9A84C] text-[10px]">{wishIds.length}</span>}
                </Link>
                {user ? (
                  <Link href="/account" onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-6 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase border-b border-white/[0.05] text-white/35 hover:text-[#C9A84C] transition-colors">
                    My Account
                  </Link>
                ) : (
                  <Link href="/account/sign-in" onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-6 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase border-b border-white/[0.05] text-white/35 hover:text-[#C9A84C] transition-colors">
                    Sign In / Register
                  </Link>
                )}
              </nav>

              <div className="px-6 py-6 border-t border-white/[0.06] space-y-3 shrink-0">
                <a href="tel:+15551234567" className="flex items-center gap-2.5 text-[11px] text-white/20 hover:text-[#C9A84C] transition-colors tracking-wider">
                  <Phone size={13} /> +1 (555) 123-4567
                </a>
                <Link href="/inventory" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#C9A84C] text-black text-[11px] font-black tracking-[0.2em] uppercase hover:bg-[#E8C97A] transition-colors">
                  Browse Inventory <ArrowRight size={12} />
                </Link>
                <Link href="/sell" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 rounded-full border border-white/[0.08] text-white/25 text-[11px] font-semibold tracking-[0.2em] uppercase hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors">
                  Sell Your Car
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
