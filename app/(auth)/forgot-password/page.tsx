"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle, CheckCircle, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
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
            <h1 className="text-white font-bold text-2xl mb-1">Reset Password</h1>
            <p className="text-white/30 text-[13px]">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {success ? (
            <div className="py-8 text-center">
              <div className="w-14 h-14 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-5">
                <Mail size={24} className="text-[#C9A84C]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Check Your Email</h3>
              <p className="text-white/30 text-[13px] leading-relaxed mb-6">
                We've sent a password reset link to <span className="text-white/60 font-semibold">{email}</span>
              </p>
              <Link href="/sign-in" className="text-[#C9A84C] hover:text-[#E8C97A] text-[12px] transition-colors">
                ← Back to sign in
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-3 mb-6">
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <p className="text-red-400 text-[12px]">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/15 text-[13px] px-4 py-3.5 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full py-4 text-[11px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/[0.06]">
                <p className="text-white/20 text-[12px] text-center">
                  Remember your password?{" "}
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
