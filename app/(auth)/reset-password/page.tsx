"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const passwordRequirements = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { label: "One number", test: (p: string) => /[0-9]/.test(p) },
    { label: "One special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
  ];

  const validatePassword = (pwd: string) => {
    return passwordRequirements.every(req => req.test(pwd));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password does not meet all requirements");
      return;
    }

    setLoading(true);
    setError("");

    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      router.push("/sign-in");
    }, 2000);
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
            <h1 className="text-white font-bold text-2xl mb-1">Set New Password</h1>
            <p className="text-white/30 text-[13px]">
              Choose a strong password for your account
            </p>
          </div>

          {success ? (
            <div className="py-8 text-center">
              <div className="w-14 h-14 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={24} className="text-[#C9A84C]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Password Updated!</h3>
              <p className="text-white/30 text-[13px] leading-relaxed mb-6">
                Your password has been successfully reset. Redirecting to sign in...
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      required
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/15 text-[13px] px-4 py-3.5 pr-12 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                    >
                      {show ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-3 space-y-2">
                      {passwordRequirements.map((req, i) => {
                        const met = req.test(password);
                        return (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              met ? "bg-emerald-400" : "bg-white/10"
                            }`} />
                            <span className={`text-[11px] transition-colors ${
                              met ? "text-emerald-400" : "text-white/20"
                            }`}>
                              {req.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
                    Confirm Password
                  </label>
                  <input
                    required
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repeat password"
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
                      Updating...
                    </span>
                  ) : (
                    <>
                      <span>Reset Password</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
