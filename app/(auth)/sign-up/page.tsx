"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle, Mail, User as UserIcon, Lock } from "lucide-react";
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

    try {
      // Verify the code from our custom table
      const { data: verificationData, error: verifyError } = await supabase
        .from("verification_codes")
        .select("*")
        .eq("email", email)
        .eq("code", code)
        .single();

      if (verifyError || !verificationData) {
        setError("Invalid verification code");
        setLoading(false);
        return;
      }

      // Check if code is expired
      const expiresAt = new Date(verificationData.expires_at);
      if (expiresAt < new Date()) {
        setError("Verification code has expired. Please request a new one.");
        setLoading(false);
        return;
      }

      // Delete the used verification code
      await supabase
        .from("verification_codes")
        .delete()
        .eq("email", email)
        .eq("code", code);

      setLoading(false);
      setStep("success");
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    } catch (err) {
      console.error("Verification error:", err);
      setError("An error occurred during verification");
      setLoading(false);
    }
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

          <div className="mb-10">
            <h1 className="text-white font-bold text-3xl mb-2">Join LUXE</h1>
            <p className="text-white/40 text-[14px]">
              {step === "form" ? "Create an account to manage your orders and bookings" : step === "code" ? "We've sent a verification code to your email" : "Welcome to LUXE Motors"}
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
                      setError("");
                      try {
                        const response = await fetch('/api/auth/send-verification', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email }),
                        });
                        
                        if (response.ok) {
                          setError("");
                          // Show success message briefly
                          const successMsg = "Code resent! Check your email.";
                          setError(successMsg);
                          setTimeout(() => setError(""), 3000);
                        } else {
                          setError("Failed to resend code. Please try again.");
                        }
                      } catch (err) {
                        setError("Failed to resend code. Please try again.");
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className="text-[#C9A84C] hover:text-[#E8C97A] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-3">
                    <UserIcon size={12} /> Full Name
                  </label>
                  <input required type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-white/[0.03] border border-white/[0.1] text-white/90 placeholder:text-white/20 text-[14px] px-4 py-4 focus:outline-none focus:border-[#C9A84C]/60 focus:bg-white/[0.05] transition-all" />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-3">
                    <Mail size={12} /> Email Address
                  </label>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-white/[0.03] border border-white/[0.1] text-white/90 placeholder:text-white/20 text-[14px] px-4 py-4 focus:outline-none focus:border-[#C9A84C]/60 focus:bg-white/[0.05] transition-all" />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-3">
                    <Lock size={12} /> Password
                  </label>
                  <div className="relative">
                    <input required type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full bg-white/[0.03] border border-white/[0.1] text-white/90 placeholder:text-white/20 text-[14px] px-4 py-4 pr-12 focus:outline-none focus:border-[#C9A84C]/60 focus:bg-white/[0.05] transition-all" />
                    <button type="button" onClick={() => setShow(!show)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                      {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-4 p-4 bg-white/[0.02] border border-white/[0.06] space-y-2">
                      <p className="text-[10px] uppercase tracking-wider text-white/30 mb-3">Password Requirements</p>
                      {passwordRequirements.map((req, i) => {
                        const met = req.test(password);
                        return (
                          <div key={i} className="flex items-center gap-2.5">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                              met ? "bg-emerald-500/20 border border-emerald-500/40" : "bg-white/[0.03] border border-white/[0.08]"
                            }`}>
                              {met && <CheckCircle size={10} className="text-emerald-400" />}
                            </div>
                            <span className={`text-[12px] transition-colors ${
                              met ? "text-emerald-400" : "text-white/30"
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
                  <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-3">
                    <Lock size={12} /> Confirm Password
                  </label>
                  <div className="relative">
                    <input required type={show ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full bg-white/[0.03] border border-white/[0.1] text-white/90 placeholder:text-white/20 text-[14px] px-4 py-4 pr-12 focus:outline-none focus:border-[#C9A84C]/60 focus:bg-white/[0.05] transition-all" />
                    <button type="button" onClick={() => setShow(!show)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                      {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {confirm && password !== confirm && (
                    <p className="text-red-400 text-[12px] mt-2 flex items-center gap-2">
                      <AlertCircle size={13} /> Passwords do not match
                    </p>
                  )}
                </div>

                <button type="submit" disabled={loading}
                  className="btn-gold w-full py-4 text-[11px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-8">
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

              <div className="mt-8 text-center">
                <p className="text-white/30 text-[13px]">
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

      {/* ── LEFT: Mercedes-AMG Image ── */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1400&q=90&auto=format&fit=crop"
          alt="Mercedes-AMG GT"
          fill priority sizes="55vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#080808] via-[#080808]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />

        <div className="absolute bottom-12 right-12 text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A84C]/70 mb-2">Performance</p>
          <p className="text-white font-bold text-2xl tracking-wide">Mercedes-AMG GT</p>
          <div className="h-px w-16 bg-gradient-to-l from-[#C9A84C] to-transparent mt-3 ml-auto" />
        </div>

        <div className="absolute top-12 left-12 flex flex-col gap-4">
          {[["577", "Horsepower"], ["3.5s", "0–60 mph"], ["AMG", "V8 Biturbo"]].map(([val, lbl]) => (
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
