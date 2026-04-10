import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages, system } = await req.json();

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: system },
        ...messages,
      ],
      max_tokens: 400,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Groq error:", err);
    return NextResponse.json({ message: "AI service unavailable. Please try again." }, { status: 500 });
  }

  const data = await res.json();
  const message = data.choices?.[0]?.message?.content ?? "I couldn't generate a response. Please try again.";
  return NextResponse.json({ message });
}
