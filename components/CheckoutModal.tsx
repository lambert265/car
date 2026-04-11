"use client";
import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth.tsx";
import { supabase } from "@/lib/supabase";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ open, onClose }: Props) {
  const { cart, guestCart, clearCart } = useCart();
  const { user } = useAuth();
  const items = user ? cart : guestCart;

  const [form, setForm] = useState({ name: "", email: user?.email ?? "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function set(k: string, v: string) { setForm(p => ({ ...p, [k]: v })); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);

    const carList = items.map(c => `${c.year} ${c.name}`).join(", ");

    await supabase.from("enquiries").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      subject: `Cart Enquiry — ${items.length} vehicle${items.length > 1 ? "s" : ""}`,
      message: `Vehicles: ${carList}\n\n${form.message}`,
      car_name: carList,
    });

    clearCart();
    setLoading(false);
    setDone(true);
  }

  function handleClose() {
    onClose();
    setTimeout(() => { setDone(false); setForm({ name: "", email: user?.email ?? "", phone: "", message: "" }); }, 400);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-[#0d0d0d] border border-[#C9A84C]/20 p-8"
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors">
              <X size={16} />
            </button>

            {done ? (
              <div className="text-center py-8">
                <CheckCircle size={40} className="text-[#C9A84C] mx-auto mb-4" />
                <h3 className="text-white font-bold text-[20px] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Enquiry Received
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed">
                  Our team will contact you within 24 hours to discuss your selection.
                </p>
                <button onClick={handleClose} className="mt-6 px-8 py-3 bg-[#C9A84C] text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#E8C97A] transition-colors">
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="h-px w-8 bg-[#C9A84C] mb-5" />
                <h2 className="text-white font-bold text-[22px] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Enquire About Your Selection
                </h2>
                <p className="text-white/30 text-[12px] mb-6">
                  {items.length} vehicle{items.length !== 1 ? "s" : ""} · ${items.reduce((s, c) => s + c.price, 0).toLocaleString()} total
                </p>

                {/* Selected vehicles summary */}
                <div className="space-y-1.5 mb-6 max-h-28 overflow-y-auto">
                  {items.map(car => (
                    <div key={car.id} className="flex items-center justify-between text-[12px] px-3 py-2 bg-[#080808] border border-white/[0.05]">
                      <span className="text-white/60">{car.year} {car.name}</span>
                      <span className="text-[#C9A84C] font-semibold">${car.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={submit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5">Full Name *</label>
                      <input
                        value={form.name} onChange={e => set("name", e.target.value)} required
                        className="w-full bg-[#080808] border border-white/[0.08] text-white/80 text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/40 transition-colors placeholder:text-white/15"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5">Phone</label>
                      <input
                        value={form.phone} onChange={e => set("phone", e.target.value)}
                        className="w-full bg-[#080808] border border-white/[0.08] text-white/80 text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/40 transition-colors placeholder:text-white/15"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5">Email *</label>
                    <input
                      type="email" value={form.email} onChange={e => set("email", e.target.value)} required
                      className="w-full bg-[#080808] border border-white/[0.08] text-white/80 text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/40 transition-colors placeholder:text-white/15"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5">Message</label>
                    <textarea
                      value={form.message} onChange={e => set("message", e.target.value)} rows={3}
                      className="w-full bg-[#080808] border border-white/[0.08] text-white/80 text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/40 transition-colors placeholder:text-white/15 resize-none"
                      placeholder="Any specific requirements or questions..."
                    />
                  </div>
                  <button
                    type="submit" disabled={loading}
                    className="w-full py-4 bg-[#C9A84C] text-black text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-[#E8C97A] transition-colors disabled:opacity-50 mt-2"
                  >
                    {loading ? "Sending..." : "Submit Enquiry"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
