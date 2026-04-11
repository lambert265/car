"use client";
import { useState } from "react";
import Image from "next/image";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth.tsx";
import CheckoutModal from "./CheckoutModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { cart, guestCart, removeFromCart, total } = useCart();
  const { user } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const displayCart = user ? cart : guestCart;

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-[420px] max-w-full bg-[#0d0d0d] border-l border-white/[0.07] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] shrink-0">
                <div>
                  <h2 className="text-white font-bold text-[15px] tracking-[0.15em] uppercase">Your Selection</h2>
                  <p className="text-white/30 text-[11px] mt-0.5">{displayCart.length} vehicle{displayCart.length !== 1 ? "s" : ""}</p>
                </div>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-white/25 hover:text-white border border-white/[0.08] hover:border-white/20 transition-colors">
                  <X size={14} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto py-4 px-6 space-y-3">
                {displayCart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
                    <ShoppingBag size={32} className="text-white/10" />
                    <p className="text-white/25 text-[13px]">Your selection is empty</p>
                    <button onClick={onClose} className="text-[#C9A84C] text-[11px] uppercase tracking-wider hover:underline">
                      Browse Collection
                    </button>
                  </div>
                ) : (
                  displayCart.map(car => (
                    <div key={car.id} className="flex gap-3 p-3 bg-[#080808] border border-white/[0.05] group">
                      <div className="relative w-20 h-14 shrink-0 overflow-hidden bg-[#111]">
                        {car.images?.[0] && (
                          <Image src={car.images[0]} alt={car.name} fill sizes="80px" className="object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#C9A84C] text-[9px] uppercase tracking-[0.25em]">{car.brand}</p>
                        <p className="text-white/80 text-[13px] font-semibold truncate">{car.name}</p>
                        <p className="text-[#C9A84C] text-[13px] font-bold mt-0.5">${car.price.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(car.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-white/20 hover:text-red-400 self-start mt-1"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {displayCart.length > 0 && (
                <div className="px-6 py-5 border-t border-white/[0.06] shrink-0 space-y-4">
                  {!user && (
                    <p className="text-[11px] text-[#C9A84C]/70 bg-[#C9A84C]/5 border border-[#C9A84C]/15 px-3 py-2 text-center">
                      Sign in to save your selection
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-[11px] uppercase tracking-wider">Total</span>
                    <span className="text-[#C9A84C] font-bold text-[20px]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      ${total.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => { onClose(); setCheckoutOpen(true); }}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#C9A84C] text-black text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-[#E8C97A] transition-colors"
                  >
                    Enquire Now <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
