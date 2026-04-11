"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";
  const codeFromUrl = searchParams.get("code") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [code, setCode] = useState(codeFromUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Auto-verify if code is in URL
    if (codeFromUrl && emailFromUrl) {
      handleVerify();
    }
  }, []);

  async function handleVerify() {
    if (!email || !code) {
      setError("Please enter both email and verification code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Verify the code
      const { data: verificationData, error: verifyError } = await supabase
        .from("verification_codes")
        .select("*")
        .eq("email", email)
        .eq("code", code)
        .single();

      if (verifyError || !verificationData) {
        setError("Invalid or expired verification code");
        setLoading(false);
        return;
      }

      // Check if code is expired
      const expiresAt = new Date(verificationData.expires_at);
      if (expiresAt < new Date()) {
        setError("Verification code has expired");
        setLoading(false);
        return;
      }

      // Mark as verified (you can add a verified field to users table)
      const { error: updateError } = await supabase
        .from("verification_codes")
        .delete()
        .eq("email", email)
        .eq("code", code);

      if (updateError) {
        console.error("Error deleting verification code:", updateError);
      }

      setSuccess(true);
      
      // Redirect to sign-in after 2 seconds
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    } catch (err) {
      console.error("Verification error:", err);
      setError("An error occurred during verification");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <Link href="/" className="flex flex-col leading-none mb-12 mx-auto w-fit">
          <span className="font-black text-white text-[22px] tracking-[0.22em] uppercase">LUXE</span>
          <span className="text-[#C9A84C] text-[8px] tracking-[0.6em] uppercase font-bold">Motors</span>
        </Link>

        <div className="bg-[#0a0a0a] border border-white/[0.06] p-8">
          <div className="mb-8">
            <div className="h-px w-8 bg-[#C9A84C] mb-4" />
            <h1 className="text-white font-bold text-2xl mb-1">Verify Your Email</h1>
            <p className="text-white/30 text-[13px]">
              Enter the verification code sent to your email
            </p>
          </div>

          {success ? (
            <div className="py-8 text-center">
              <div className="w-14 h-14 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={24} className="text-[#C9A84C]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Email Verified!</h3>
              <p className="text-white/30 text-[13px] leading-relaxed mb-6">
                Your email has been successfully verified. Redirecting to sign in...
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-3 mb-6">
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <p className="text-red-400 text-[12px]">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/15 text-[13px] px-4 py-3.5 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/15 text-[13px] px-4 py-3.5 focus:outline-none focus:border-[#C9A84C]/50 transition-colors tracking-[0.5em] text-center font-mono text-lg"
                  />
                </div>

                <button
                  onClick={handleVerify}
                  disabled={loading}
                  className="btn-gold w-full py-4 text-[11px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    <>
                      <span>Verify Email</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/[0.06]">
                <p className="text-white/20 text-[12px] text-center">
                  Already verified?{" "}
                  <Link href="/sign-in" className="text-[#C9A84C] hover:text-[#E8C97A] transition-colors font-semibold">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <VerifyContent />
    </Suspense>
  );
}
