"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const router = useRouter();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [code,     setCode]     = useState("");
  const [show,     setShow]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [step,     setStep]     = useState<"form" | "code" | "success">("form");

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
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (!validatePassword(password)) { 
      setError("Password does not meet all requirements."); 
      return; 
    }
    setLoading(true); setError("");
    
    const { error: signUpError } = await supabase.auth.signUp({
      email, 
      password,
      options: { 
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/sign-in`
      },
    });
    
    if (signUpError) { 
      setError(signUpError.message); 
      setLoading(false); 
      return; 
    }
    
    setLoading(false);
    setStep("code");
    
    // Send verification email with code
    try {
      await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      console.error('Failed to send verification email:', err);
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }
    
    setLoading(true);
    setError("");

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'signup'
    });

    if (verifyError) {
      setError(verifyError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setStep("success");
    
    // Redirect after 2 seconds
    setTimeout(() => {
      router.push("/sign-in");
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-[#080808] flex flex-row-reverse">

      {/* ── RIGHT: Form ── */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 py-12">
        <div className="max-w-sm w-full mx-auto">

          <Link href="/" className="flex flex-col leading-none mb-12">
            <span className="font-black text-white text-[22px] tracking-[0.22em] uppercase">LUXE</span>
            <span className="text-[#C9A84C] text-[8px] tracking-[0.6em] uppercase font-bold">Motors</span>
          </Link>

          <div className="mb-8">
            <div className="h-px w-8 bg-[#C9A84C] mb-4" />
            <h1 className="text-white font-bold text-2xl mb-1">
              {step === "form" ? "Create account" : step === "code" ? "Verify your email" : "Account created!"}
            </h1>
            <p className="text-white/30 text-[13px]">
              {step === "form" ? "Set up your LUXE account" : step === "code" ? "Enter the code sent to your email" : "You're all set"}
            </p>
          </div>

          {step === "success" ? (
            <div className="py-8 text-center">
              <div className="w-14 h-14 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={24} className="text-[#C9A84C]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Email Verified!</h3>
              <p className="text-white/30 text-[13px] leading-relaxed mb-6">
                Your account has been successfully created. Redirecting to sign in...
              </p>
            </div>
          ) : step === "code" ? (
            <>
              <div className="flex items-center gap-3 bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-4 py-3 mb-6">
                <Mail size={14} className="text-[#C9A84C] shrink-0" />
                <p className="text-[#C9A84C] text-[12px]">
                  Verification code sent to <span className="font-semibold">{email}</span>
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-3 mb-6">
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <p className="text-red-400 text-[12px]">{error}</p>
                </div>
              )}

              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    autoFocus
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/15 text-[18px] px-4 py-4 focus:outline-none focus:border-[#C9A84C]/50 transition-colors text-center tracking-[0.5em] font-mono"
                  />
                  <p className="text-white/20 text-[11px] mt-2 text-center">
                    Check your email for the 6-digit code
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="btn-gold w-full py-4 text-[11px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    <>
                      <span>Confirm</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center space-y-3">
                <button
                  onClick={() => setStep("form")}
                  className="text-white/30 hover:text-[#C9A84C] text-[12px] transition-colors"
                >
                  ← Back to sign up
                </button>
                <div className="text-white/20 text-[11px]">
                  Didn't receive the code?{" "}
                  <button
                    onClick={async () => {
                      setLoading(true);
                      try {
                        await fetch('/api/auth/send-verification', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email }),
                        });
                        setError("");
                      } catch (err) {
                        setError("Failed to resend code");
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="text-[#C9A84C] hover:text-[#E8C97A] transition-colors font-semibold"
                  >
                    Resend
                  </button>
                </div>
              </div>
            </>
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
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Full Name</label>
                  <input required type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/15 text-[13px] px-4 py-3.5 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
                </div>
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
                      placeholder="Create a strong password"
                      className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/15 text-[13px] px-4 py-3.5 pr-12 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
                    <button type="button" onClick={() => setShow(!show)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors">
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
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Confirm Password</label>
                  <input required type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 placeholder:text-white/15 text-[13px] px-4 py-3.5 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
                </div>

                <button type="submit" disabled={loading}
                  className="btn-gold w-full py-4 text-[11px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    <><span>Create Account</span><ArrowRight size={13} /></>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/[0.06]">
                <p className="text-white/20 text-[12px] text-center">
                  Already have an account?{" "}
                  <Link href="/sign-in" className="text-[#C9A84C] hover:text-[#E8C97A] transition-colors font-semibold">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── LEFT: Rolls-Royce Image ── */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1400&q=90&auto=format&fit=crop"
          alt="Rolls-Royce Ghost"
          fill priority sizes="55vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#080808] via-[#080808]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />

        <div className="absolute bottom-12 right-12 text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A84C]/70 mb-2">Featured</p>
          <p className="text-white font-bold text-2xl tracking-wide">Rolls-Royce Ghost</p>
          <div className="h-px w-16 bg-gradient-to-l from-[#C9A84C] to-transparent mt-3 ml-auto" />
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
