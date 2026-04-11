"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function UserAuthPage() {
  const router = useRouter();
  const [tab,      setTab]      = useState<"signin" | "signup">("signin");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [name,     setName]     = useState("");
  const [show,     setShow]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [done,     setDone]     = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push("/account");
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true); setError("");
    const { error } = await supabase.auth.signUp({
      email, password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/account`,
      },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setDone(true);
  }

  return (
    <div className="min-h-screen bg-[#080808] flex">

      {/* Form side */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 py-12">
        <div className="max-w-sm w-full mx-auto">

          <Link href="/" className="flex flex-col leading-none mb-12">
            <span className="font-black text-white text-[22px] tracking-[0.22em] uppercase">LUXE</span>
            <span className="text-[#C9A84C] text-[8px] tracking-[0.6em] uppercase font-bold">Motors</span>
          </Link>

          {done ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={24} className="text-[#C9A84C]" />
              </div>
              <h2 className="text-white font-bold text-xl mb-3">Check your email</h2>
              <p className="text-white/30 text-[13px] leading-relaxed mb-2">
                We sent a verification link to <span className="text-white/60">{email}</span>.
              </p>
              <p className="text-white/20 text-[12px] mb-6">Click the link to activate your account and sign in.</p>
              <button onClick={() => { setDone(false); setTab("signin"); setPassword(""); }}
                className="text-[#C9A84C] text-[12px] hover:text-[#E8C97A] transition-colors">
                Back to sign in →
              </button>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex mb-8 border-b border-white/[0.06]">
                {(["signin", "signup"] as const).map((t) => (
                  <button key={t} onClick={() => { setTab(t); setError(""); }}
                    className={`flex-1 pb-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors relative ${
                      tab === t ? "text-[#C9A84C]" : "text-white/25 hover:text-white/50"
                    }`}>
                    {t === "signin" ? "Sign In" : "Create Account"}
                    {tab === t && <span className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C]" />}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <div className="h-px w-8 bg-[#C9A84C] mb-4" />
                <h1 className="text-white font-bold text-2xl mb-1">
                  {tab === "signin" ? "Welcome back" : "Join LUXE"}
                </h1>
                <p className="text-white/30 text-[13px]">
                  {tab === "signin"
                    ? "Sign in to track your enquiries and bookings"
                    : "Create an account to manage your orders and bookings"}
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-3 mb-5">
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <p className="text-red-400 text-[12px]">{error}</p>
                </div>
              )}

              <form onSubmit={tab === "signin" ? handleSignIn : handleSignUp} className="space-y-4">
                {tab === "signup" && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Full Name</label>
                    <input required type="text" value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/15 text-[13px] px-4 py-3.5 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
                  </div>
                )}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Email Address</label>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/15 text-[13px] px-4 py-3.5 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Password</label>
                  <div className="relative">
                    <input required type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder={tab === "signup" ? "Min. 8 characters" : "••••••••"}
                      className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/15 text-[13px] px-4 py-3.5 pr-12 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
                    <button type="button" onClick={() => setShow(!show)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors">
                      {show ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="btn-gold w-full py-4 text-[11px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
                  {loading
                    ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />Processing...</span>
                    : <><span>{tab === "signin" ? "Sign In" : "Create Account"}</span><ArrowRight size={13} /></>
                  }
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Image side */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1400&q=90&auto=format&fit=crop"
          alt="Rolls-Royce Ghost" fill priority sizes="55vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
        <div className="absolute bottom-12 left-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A84C]/70 mb-2">Featured</p>
          <p className="text-white font-bold text-2xl tracking-wide">Rolls-Royce Ghost</p>
          <div className="h-px w-16 bg-gradient-to-r from-[#C9A84C] to-transparent mt-3" />
        </div>
        <div className="absolute top-12 left-12 flex flex-col gap-4">
          {[["563", "Horsepower"], ["4.6s", "0–60 mph"], ["V12", "Engine"]].map(([val, lbl]) => (
            <div key={lbl}>
              <p className="text-[#C9A84C] font-bold text-xl leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{val}</p>
              <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] mt-0.5">{lbl}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
