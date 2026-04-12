"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, AlertCircle, Mail, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Admin check - redirect to admin dashboard if user is admin
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@luxemotors.com";

export default function SignInPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [show,     setShow]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    
    if (signInError) { 
      setError(signInError.message); 
      setLoading(false); 
      return; 
    }

    // Check if user is admin
    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role === 'admin' || data.user.email === ADMIN_EMAIL) {
        router.push("/admin/dashboard");
      } else {
        router.push("/account");
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] flex">

      {/* ── LEFT: Form ── */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 py-12">
        <div className="max-w-sm w-full mx-auto">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none mb-12">
            <span className="font-black text-white text-[22px] tracking-[0.22em] uppercase">LUXE</span>
            <span className="text-[#C9A84C] text-[8px] tracking-[0.6em] uppercase font-bold">Motors</span>
          </Link>

          <div className="mb-10">
            <h1 className="text-white font-bold text-3xl mb-2">Welcome back</h1>
            <p className="text-white/40 text-[14px]">Sign in to access your account</p>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-3 mb-6">
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-[12px]">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-3">
                <Mail size={12} /> Email Address
              </label>
              <input
                required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-white/[0.03] border border-white/[0.1] text-white/90 placeholder:text-white/20 text-[14px] px-4 py-4 focus:outline-none focus:border-[#C9A84C]/60 focus:bg-white/[0.05] transition-all"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  <Lock size={12} /> Password
                </label>
                <Link href="/forgot-password" className="text-[11px] text-[#C9A84C] hover:text-[#E8C97A] transition-colors font-semibold">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  required type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-white/[0.03] border border-white/[0.1] text-white/90 placeholder:text-white/20 text-[14px] px-4 py-4 pr-12 focus:outline-none focus:border-[#C9A84C]/60 focus:bg-white/[0.05] transition-all"
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-gold w-full py-4 text-[11px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-8">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <><span>Sign In</span><ArrowRight size={13} /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/30 text-[13px]">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-[#C9A84C] hover:text-[#E8C97A] transition-colors font-semibold">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Tesla Model S Image ── */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1400&q=90&auto=format&fit=crop"
          alt="Tesla Model S"
          fill priority sizes="55vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />

        {/* Car label */}
        <div className="absolute bottom-12 left-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A84C]/70 mb-2">Electric</p>
          <p className="text-white font-bold text-2xl tracking-wide">Tesla Model S Plaid</p>
          <div className="h-px w-16 bg-gradient-to-r from-[#C9A84C] to-transparent mt-3" />
        </div>

        {/* Stats */}
        <div className="absolute top-12 right-12 flex flex-col gap-4">
          {[["1,020", "Horsepower"], ["1.99s", "0–60 mph"], ["396mi", "Range"]].map(([val, lbl]) => (
            <div key={lbl} className="text-right">
              <p className="text-[#C9A84C] font-bold text-xl leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{val}</p>
              <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] mt-0.5">{lbl}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
