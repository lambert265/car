"use client";
import { Suspense } from "react";
import TestDriveClient from "./TestDriveClient";

export default function TestDrivePage() {
  return (
    <Suspense fallback={<div className="pt-[68px] bg-[#080808] min-h-screen flex items-center justify-center"><p className="text-white/40">Loading...</p></div>}>
      <TestDriveClient />
    </Suspense>
  );
}
