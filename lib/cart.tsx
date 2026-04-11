"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth.tsx";
import type { Car } from "@/lib/types";

interface CartCtx {
  cart: Car[];
  guestCart: Car[];
  addToCart: (car: Car) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  total: number;
  openAuthPrompt: boolean;
  setOpenAuthPrompt: (v: boolean) => void;
}

const Ctx = createContext<CartCtx>({
  cart: [], guestCart: [], addToCart: () => {}, removeFromCart: () => {},
  clearCart: () => {}, isInCart: () => false, total: 0,
  openAuthPrompt: false, setOpenAuthPrompt: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart,            setCart]            = useState<Car[]>([]);
  const [guestCart,       setGuestCart]       = useState<Car[]>([]);
  const [openAuthPrompt,  setOpenAuthPrompt]  = useState(false);
  const [merged,          setMerged]          = useState(false);

  // Load user cart from Supabase on sign-in
  useEffect(() => {
    if (!user) { setCart([]); setMerged(false); return; }
    supabase.from("cart_items").select("car_data").eq("user_id", user.id)
      .then(({ data }) => {
        const saved: Car[] = (data ?? []).map((r: any) => r.car_data);
        setCart(saved);
        setMerged(false); // trigger merge check
      });
  }, [user?.id]);

  // Merge guest cart after sign-in
  useEffect(() => {
    if (!user || merged || guestCart.length === 0) return;
    setMerged(true);
    setCart(prev => {
      const existingIds = new Set(prev.map(c => c.id));
      const toAdd = guestCart.filter(c => !existingIds.has(c.id));
      const merged = [...prev, ...toAdd];
      // Persist merged items
      toAdd.forEach(car => {
        supabase.from("cart_items").upsert({ user_id: user.id, car_id: car.id, car_data: car }).then(() => {});
      });
      return merged;
    });
    setGuestCart([]);
  }, [user, merged, guestCart]);

  function addToCart(car: Car) {
    if (!user) {
      setGuestCart(prev => prev.find(c => c.id === car.id) ? prev : [...prev, car]);
      setOpenAuthPrompt(true);
      return;
    }
    if (cart.find(c => c.id === car.id)) return;
    setCart(prev => [...prev, car]);
    supabase.from("cart_items").upsert({ user_id: user.id, car_id: car.id, car_data: car }).then(() => {});
  }

  function removeFromCart(id: number) {
    setCart(prev => prev.filter(c => c.id !== id));
    if (user) supabase.from("cart_items").delete().eq("user_id", user.id).eq("car_id", id).then(() => {});
  }

  function clearCart() {
    setCart([]);
    if (user) supabase.from("cart_items").delete().eq("user_id", user.id).then(() => {});
  }

  const isInCart = (id: number) =>
    cart.some(c => c.id === id) || guestCart.some(c => c.id === id);

  const total = cart.reduce((s, c) => s + c.price, 0);

  return (
    <Ctx.Provider value={{ cart, guestCart, addToCart, removeFromCart, clearCart, isInCart, total, openAuthPrompt, setOpenAuthPrompt }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => useContext(Ctx);
