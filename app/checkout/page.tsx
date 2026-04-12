"use client";
import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="pt-[68px] bg-[#080808] min-h-screen flex items-center justify-center"><p className="text-white/40">Loading...</p></div>}>
      <CheckoutClient />
    </Suspense>
  );
}
