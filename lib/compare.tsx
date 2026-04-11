"use client";
import { createContext, useContext, useState } from "react";

interface CompareCtx {
  ids: number[];
  toggle: (id: number) => void;
  has: (id: number) => boolean;
  clear: () => void;
}

const Ctx = createContext<CompareCtx>({ ids: [], toggle: () => {}, has: () => false, clear: () => {} });

export function CompareProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [ids, setIds] = useState<number[]>([]);

  function toggle(id: number) {
    setIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  return (
    <Ctx.Provider value={{ ids, toggle, has: (id) => ids.includes(id), clear: () => setIds([]) }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCompare = () => useContext(Ctx);
