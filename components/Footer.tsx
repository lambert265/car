"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Home, Car, Key, CreditCard, PhoneCall } from "lucide-react";

const MOBILE_NAV = [
  { label: "Home",      href: "/",               icon: Home,      external: false },
  { label: "Inventory", href: "/inventory",       icon: Car,       external: false },
  { label: "Rental",    href: "/rental",          icon: Key,       external: false },
  { label: "Finance",   href: "/finance",         icon: CreditCard,external: false },
  { label: "Call",      href: "tel:+15551234567", icon: PhoneCall, external: true  },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <>
      {/* ── MAIN FOOTER ── */}
      <footer className="bg-[#080808] text-white mb-[80px] md:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-black text-xl tracking-[0.15em] uppercase mb-4">
              LUXE<span className="text-[#C9A84C] font-semibold text-[11px] tracking-[0.4em] ml-2">Motors</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-6">
              Premium certified vehicles.<br />Exceptional service since 2008.
            </p>
            <div className="space-y-3 text-sm text-white/30">
              <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-[#C9A84C] transition-colors">
                <Phone size={13} /> +1 (555) 123-4567
              </a>
              <a href="mailto:enquiries@luxemotors.com" className="flex items-center gap-2 hover:text-[#C9A84C] transition-colors">
                <Mail size={13} /> enquiries@luxemotors.com
              </a>
              <p className="flex items-start gap-2">
                <MapPin size={13} className="mt-0.5 shrink-0" /> 123 Prestige Drive,<br />Beverly Hills, CA
              </p>
            </div>
          </div>

          {/* Inventory */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C] mb-5">Inventory</h4>
            <ul className="space-y-3">
              {[["SUVs", "/inventory?cat=SUV"], ["Sedans", "/inventory?cat=Sedan"], ["Sports Cars", "/inventory?cat=Sport"], ["Electric", "/inventory?cat=Electric"]].map(([l, h]) => (
                <li key={l}><Link href={h} className="text-sm text-white/30 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Rental */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C] mb-5">Rental</h4>
            <ul className="space-y-3">
              {[["Rental Fleet", "/rental"], ["Sedans", "/rental"], ["Sports Cars", "/rental"], ["SUVs", "/rental"]].map(([l, h]) => (
                <li key={l}><Link href={h} className="text-sm text-white/30 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C] mb-5">Company</h4>
            <ul className="space-y-3">
              {[["About Us", "/about"], ["Contact", "/contact"], ["Finance", "/finance"]].map(([l, h]) => (
                <li key={l}><Link href={h} className="text-sm text-white/30 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/20">
          <p>© 2025 LUXE Motors. All rights reserved.</p>
          <p>Privacy Policy · Terms of Service</p>
        </div>
      </footer>

      {/* ── MOBILE FLOATING PILL NAV ── */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <div className="flex items-center bg-[#0e0e0e]/98 backdrop-blur-xl rounded-full px-2 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]">
          {MOBILE_NAV.map(({ label, href, icon: Icon, external }) => {
            const isActive = !external && pathname === href;
            const Wrapper  = external ? "a" : Link;
            const extraProps = external
              ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
              : { href };

            return (
              <Wrapper
                key={label}
                {...(extraProps as any)}
                className={`relative flex flex-col items-center justify-center gap-1 w-[62px] h-[52px] rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-[#C9A84C] text-black"
                    : "text-white/25 hover:text-white/60 hover:bg-white/[0.04]"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.5} />
                <span className={`text-[8px] tracking-[0.04em] uppercase font-semibold leading-none ${
                  isActive ? "text-black" : "text-white/25"
                }`}>
                  {label}
                </span>
              </Wrapper>
            );
          })}
        </div>
      </nav>
    </>
  );
}
