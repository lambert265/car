"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Minimize2, Bot, User, Sparkles, Phone } from "lucide-react";
import { CARS } from "@/lib/cars";

type Mode    = "choose" | "ai" | "human";
type Message = { from: "user" | "agent" | "ai"; text: string; loading?: boolean };

const HUMAN_QUICK = ["Browse inventory", "Book a test drive", "Finance options", "Part exchange"];
const AI_QUICK    = ["What's the best SUV under $150k?", "Compare Porsche vs Ferrari", "Help me choose a car", "Best electric options"];

const ROUTES: Record<string, string> = {
  "/inventory": "inventory",
  "/rental": "rental",
  "/finance": "finance",
  "/sell": "sell",
  "/contact": "contact",
  "/about": "about",
  "/showrooms": "showrooms",
  "/compare": "compare",
  "/saved": "saved",
  "/account": "account",
};

const SYSTEM_PROMPT = `You are VANTA Motors' expert automotive concierge AI. You are a luxury car specialist, financial analyst, and buying advisor combined.

Your inventory includes: ${CARS.map(c => `${c.year} ${c.name} ($${c.price.toLocaleString()}, ${c.fuel}, ${c.category})`).join(", ")}.

Your role:
- Guide users to the right car based on their budget, lifestyle, and preferences
- Compare cars with detailed spec analysis
- Act as a financial analyst — explain financing, depreciation, running costs, insurance tiers
- Be confident, knowledgeable, and concise — like a Rolls-Royce salesperson who also has a CFA
- Always reference specific cars from the inventory when relevant
- Format responses clearly with line breaks when listing multiple points
- Keep responses under 200 words unless a detailed comparison is requested`;

export default function LiveChat() {
  const [open,      setOpen]      = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [mode,      setMode]      = useState<Mode>("choose");
  const [input,     setInput]     = useState("");
  const [aiMsgs,    setAiMsgs]    = useState<Message[]>([
    { from: "ai", text: "Hi, I'm VANTA AI — your personal automotive advisor. Ask me anything: which car suits your lifestyle, how to compare models, financing options, or depreciation analysis. I'm here to help you make the perfect choice." },
  ]);
  const [humanMsgs, setHumanMsgs] = useState<Message[]>([
    { from: "agent", text: "Hi, welcome to VANTA Motors. A specialist will be with you shortly. How can we help?" },
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMsgs, humanMsgs, aiLoading]);

  async function sendAI(text: string) {
    if (!text.trim() || aiLoading) return;
    
    // Check if message starts with /
    if (text.startsWith("/")) {
      const route = text.toLowerCase();
      if (ROUTES[route]) {
        window.location.href = route;
        return;
      }
    }
    
    const userMsg: Message = { from: "user", text };
    setAiMsgs((m) => [...m, userMsg]);
    setInput("");
    setAiLoading(true);

    try {
      const history = [...aiMsgs, userMsg]
        .filter((m) => !m.loading)
        .map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, system: SYSTEM_PROMPT }),
      });

      const data = await res.json();
      setAiMsgs((m) => [...m, { from: "ai", text: data.message || "I'm having trouble responding right now. Please try again." }]);
    } catch {
      setAiMsgs((m) => [...m, { from: "ai", text: "Connection error. Please try again in a moment." }]);
    } finally {
      setAiLoading(false);
    }
  }

  function sendHuman(text: string) {
    if (!text.trim()) return;
    
    // Check if message starts with /
    if (text.startsWith("/")) {
      const route = text.toLowerCase();
      if (ROUTES[route]) {
        window.location.href = route;
        return;
      }
    }
    
    setHumanMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    setTimeout(() => {
      setHumanMsgs((m) => [...m, { from: "agent", text: "Thanks for your message. A specialist will respond within a few minutes. In the meantime, feel free to browse our inventory." }]);
    }, 1000);
  }

  function reset() { setMode("choose"); setInput(""); }

  const messages = mode === "ai" ? aiMsgs : humanMsgs;

  return (
    <div className="fixed bottom-6 right-4 md:right-6 z-[90] flex flex-col items-end gap-3">

      {/* ── CHAT WINDOW ── */}
      {open && !minimized && (
        <div className="w-[calc(100vw-2rem)] max-w-[360px] bg-[#0d0d0d] border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
          style={{ height: mode === "choose" ? "auto" : "min(480px, calc(100vh - 180px))" }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#0a0a0a] border-b border-white/[0.06] shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center">
                  {mode === "ai"
                    ? <Sparkles size={13} className="text-[#C9A84C]" />
                    : <span className="text-[#C9A84C] font-bold text-[11px]">VM</span>
                  }
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0a0a0a]" />
              </div>
              <div>
                <p className="text-white/80 font-semibold text-[13px]">
                  {mode === "ai" ? "VANTA AI Advisor" : mode === "human" ? "VANTA Concierge" : "VANTA Support"}
                </p>
                <p className="text-emerald-400 text-[10px]">
                  {mode === "ai" ? "AI · Instant responses" : "Online now"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {mode !== "choose" && (
                <button onClick={reset} className="text-[9px] font-bold uppercase tracking-wider text-white/20 hover:text-[#C9A84C] transition-colors px-2 py-1 border border-white/[0.06] hover:border-[#C9A84C]/30">
                  Switch
                </button>
              )}
              <button onClick={() => setMinimized(true)} className="text-white/20 hover:text-white/60 transition-colors p-1.5">
                <Minimize2 size={13} />
              </button>
              <button onClick={() => { setOpen(false); setMinimized(false); }} className="text-white/20 hover:text-white/60 transition-colors p-1.5">
                <X size={13} />
              </button>
            </div>
          </div>

          {/* ── MODE CHOOSER ── */}
          {mode === "choose" && (
            <div className="p-6 space-y-4">
              <p className="text-white/40 text-[13px] leading-relaxed text-center">
                How would you like to connect with us today?
              </p>
              <button onClick={() => setMode("ai")}
                className="w-full flex items-center gap-4 p-4 bg-[#C9A84C]/8 border border-[#C9A84C]/20 hover:bg-[#C9A84C]/15 hover:border-[#C9A84C]/40 transition-all group">
                <div className="w-10 h-10 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center shrink-0">
                  <Sparkles size={16} className="text-[#C9A84C]" />
                </div>
                <div className="text-left">
                  <p className="text-white/80 font-bold text-[13px] group-hover:text-white transition-colors">Chat with AI Advisor</p>
                  <p className="text-white/30 text-[11px] mt-0.5">Instant answers · Car comparisons · Finance analysis</p>
                </div>
              </button>
              <button onClick={() => setMode("human")}
                className="w-full flex items-center gap-4 p-4 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/15 transition-all group">
                <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center shrink-0">
                  <User size={16} className="text-white/50" />
                </div>
                <div className="text-left">
                  <p className="text-white/80 font-bold text-[13px] group-hover:text-white transition-colors">Chat with a Specialist</p>
                  <p className="text-white/30 text-[11px] mt-0.5">Personal service · Test drives · Private viewings</p>
                </div>
              </button>
              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-white/15 text-[10px] uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
              <a href="tel:+15551234567"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-white/[0.08] text-white/30 text-[11px] font-bold uppercase tracking-[0.15em] hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-colors">
                <Phone size={13} /> Call +1 (555) 123-4567
              </a>
            </div>
          )}

          {/* ── MESSAGES ── */}
          {mode !== "choose" && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-2.5 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                    {m.from !== "user" && (
                      <div className="w-6 h-6 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/25 flex items-center justify-center shrink-0 mt-0.5">
                        {mode === "ai" ? <Sparkles size={10} className="text-[#C9A84C]" /> : <span className="text-[#C9A84C] text-[8px] font-bold">VM</span>}
                      </div>
                    )}
                    <div className={`max-w-[78%] px-3.5 py-2.5 text-[12px] leading-relaxed whitespace-pre-wrap ${
                      m.from === "user"
                        ? "bg-[#C9A84C] text-black font-medium rounded-2xl rounded-br-sm"
                        : "bg-white/[0.06] text-white/70 rounded-2xl rounded-bl-sm"
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {aiLoading && mode === "ai" && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-6 h-6 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/25 flex items-center justify-center shrink-0">
                      <Sparkles size={10} className="text-[#C9A84C]" />
                    </div>
                    <div className="bg-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                      {[0,1,2].map((i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick replies */}
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {(mode === "ai" ? AI_QUICK : HUMAN_QUICK).map((q) => (
                  <button key={q} onClick={() => mode === "ai" ? sendAI(q) : sendHuman(q)}
                    className="text-[10px] px-3 py-1.5 rounded-full border border-white/[0.08] text-white/30 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors">
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.06] shrink-0">
                <input
                  value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); mode === "ai" ? sendAI(input) : sendHuman(input); }}}
                  placeholder={mode === "ai" ? "Ask me anything about cars..." : "Type a message..."}
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] text-white/70 placeholder:text-white/20 text-[12px] px-3 py-2 focus:outline-none focus:border-[#C9A84C]/40 transition-colors rounded-full"
                />
                <button onClick={() => mode === "ai" ? sendAI(input) : sendHuman(input)}
                  disabled={aiLoading || !input.trim()}
                  className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-black hover:bg-[#E8C97A] transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed">
                  <Send size={13} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Minimized bar */}
      {open && minimized && (
        <button onClick={() => setMinimized(false)}
          className="flex items-center gap-3 px-4 py-3 bg-[#0d0d0d] border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:border-[#C9A84C]/30 transition-colors">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-white/60 text-[12px] font-medium">VANTA {mode === "ai" ? "AI Advisor" : "Concierge"}</span>
          <X size={13} className="text-white/20 hover:text-white/60 ml-2" onClick={(e) => { e.stopPropagation(); setOpen(false); setMinimized(false); }} />
        </button>
      )}

      {/* Toggle button */}
      <button
        onClick={() => { setOpen((v) => !v); setMinimized(false); }}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#C9A84C] text-black flex items-center justify-center shadow-[0_8px_32px_rgba(201,168,76,0.4)] hover:bg-[#E8C97A] hover:shadow-[0_8px_40px_rgba(201,168,76,0.6)] transition-all duration-200 relative"
      >
        {open ? <X size={18} className="md:w-5 md:h-5" /> : <MessageSquare size={18} className="md:w-5 md:h-5" />}
        {!open && <span className="absolute -top-1 -right-1 w-3 h-3 md:w-3.5 md:h-3.5 bg-emerald-400 rounded-full border-2 border-[#080808]" />}
      </button>
    </div>
  );
}
