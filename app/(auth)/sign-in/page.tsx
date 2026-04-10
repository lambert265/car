"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#080808] flex">

      {/* ── LEFT: Form ── */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 py-12">
        <div className="max-w-sm w-full mx-auto">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none mb-12">
            <span className="font-black text-white text-[22px] tracking-[0.22em] uppercase">VANTA</span>
            <span className="text-[#C9A84C] text-[8px] tracking-[0.6em] uppercase font-bold">Motors</span>
          </Link>

          <div className="mb-8">
            <div className="h-px w-8 bg-[#C9A84C] mb-4" />
            <h1 className="text-white font-bold text-2xl mb-1">Welcome back</h1>
            <p className="text-white/30 text-[13px]">Sign in to your admin dashboard</p>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-3 mb-6">
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-[12px]">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Email Address</label>
              <input
                required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vantamotors.com"
                className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/15 text-[13px] px-4 py-3.5 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Password</label>
              <div className="relative">
                <input
                  required type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/15 text-[13px] px-4 py-3.5 pr-12 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors">
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-gold w-full py-4 text-[11px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
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

          <div className="mt-8 pt-8 border-t border-white/[0.06]">
            <p className="text-white/20 text-[12px] text-center">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-[#C9A84C] hover:text-[#E8C97A] transition-colors font-semibold">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: AMG G63 Image ── */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1400&q=90&auto=format&fit=crop"
          alt="Mercedes-AMG G63"
          fill priority sizes="55vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />

        {/* Car label */}
        <div className="absolute bottom-12 left-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A84C]/70 mb-2">Featured</p>
          <p className="text-white font-bold text-2xl tracking-wide">Mercedes-AMG G63</p>
          <div className="h-px w-16 bg-gradient-to-r from-[#C9A84C] to-transparent mt-3" />
        </div>

        {/* Stats */}
        <div className="absolute top-12 right-12 flex flex-col gap-4">
          {[["577", "Horsepower"], ["4.5s", "0–60 mph"], ["AMG", "Performance"]].map(([val, lbl]) => (
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
