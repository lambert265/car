"use client";
import { createContext, useContext, useState, Fragment } from "react";

interface CompareCtx {
  ids: number[];
  toggle: (id: number) => void;
  has: (id: number) => boolean;
  clear: () => void;
}

const Ctx = createContext<CompareCtx>({ ids: [], toggle: () => {}, has: () => false, clear: () => {} });

export function CompareProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [ids, setIds] = useState<number[]>([]);

  const toggle = (id: number) => {
    setIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const value = {
    ids,
    toggle,
    has: (id: number) => ids.includes(id),
    clear: () => setIds([])
  };

  return (
    <Ctx.Provider value={value}>
      {children}
    </Ctx.Provider>
  );
}

export const useCompare = () => useContext(Ctx);
