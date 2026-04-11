import { Suspense } from "react";
import InventoryClient from "./InventoryClient";

export const metadata = {
  title: "Inventory — LUXE Auto Gallery",
  description: "Browse our full inventory of certified luxury vehicles.",
};

export default function InventoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808] pt-[68px]" />}>
      <InventoryClient />
    </Suspense>
  );
}
