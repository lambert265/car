"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface WishlistCtx {
  ids: number[];
  toggle: (id: number) => void;
  has: (id: number) => boolean;
}

const Ctx = createContext<WishlistCtx>({ ids: [], toggle: () => {}, has: () => false });

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    try { setIds(JSON.parse(localStorage.getItem("vanta_wishlist") || "[]")); } catch {}
  }, []);

  function toggle(id: number) {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("vanta_wishlist", JSON.stringify(next));
      return next;
    });
  }

  return <Ctx.Provider value={{ ids, toggle, has: (id) => ids.includes(id) }}>{children}</Ctx.Provider>;
}

export const useWishlist = () => useContext(Ctx);
