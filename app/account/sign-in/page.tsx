"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountSignInRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/sign-in");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="text-white/40 text-[14px]">Redirecting...</div>
    </div>
  );
}
