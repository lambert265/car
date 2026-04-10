"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

const EMPTY = {
  name: "", brand: "", year: new Date().getFullYear(), price: "", mileage: "",
  fuel: "Petrol", category: "Sedan", badge: "New Arrival", available: true,
  description: "", horsepower: "", torque: "", engine: "", transmission: "",
  drivetrain: "", top_speed: "", zero_to_sixty: "", mpg: "", range: "",
  seating: "", infotainment: "",
  images: [""],
  specs: { engine: "", power: "", torque: "", transmission: "", drivetrain: "", seats: "" },
};

function Field({ label, name, type = "text", placeholder = "", value, onChange }: any) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">{label}</label>
      <input type={type} value={value ?? ""} onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
    </div>
  );
}

export default function NewCarPage() {
  const router = useRouter();
  const [form,   setForm]   = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState("");

  function set(k: string, v: any) { setForm((f: any) => ({ ...f, [k]: v })); }
  function setSpec(k: string, v: string) { setForm((f: any) => ({ ...f, specs: { ...f.specs, [k]: v } })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");
    const payload = {
      ...form,
      year:          Number(form.year),
      price:         Number(form.price),
      mileage:       Number(form.mileage),
      horsepower:    form.horsepower    ? Number(form.horsepower)    : null,
      torque:        form.torque        ? Number(form.torque)        : null,
      top_speed:     form.top_speed     ? Number(form.top_speed)     : null,
      zero_to_sixty: form.zero_to_sixty ? Number(form.zero_to_sixty) : null,
      seating:       form.seating       ? Number(form.seating)       : null,
      images:        form.images.filter(Boolean),
    };
    const { error } = await supabase.from("cars").insert(payload);
    if (error) { setError(error.message); setSaving(false); return; }
    router.push("/admin/inventory");
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/inventory" className="text-white/25 hover:text-white/60 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <div className="h-px w-8 bg-[#C9A84C] mb-2" />
          <h1 className="text-white font-bold text-2xl">Add New Vehicle</h1>
        </div>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 text-[12px]">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic info */}
        <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]/60 mb-5">Basic Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Brand *"        name="brand"    value={form.brand}    onChange={set} placeholder="e.g. Porsche" />
            <Field label="Model Name *"   name="name"     value={form.name}     onChange={set} placeholder="e.g. 911 Carrera S" />
            <Field label="Year *"         name="year"     value={form.year}     onChange={set} type="number" />
            <Field label="Price ($) *"    name="price"    value={form.price}    onChange={set} type="number" placeholder="142000" />
            <Field label="Mileage (mi) *" name="mileage"  value={form.mileage}  onChange={set} type="number" />
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Category *</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.08] text-white/60 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 [color-scheme:dark]">
                {["SUV","Sedan","Sport","Electric"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Fuel *</label>
              <select value={form.fuel} onChange={(e) => set("fuel", e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.08] text-white/60 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 [color-scheme:dark]">
                {["Petrol","Electric","Hybrid"].map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Badge</label>
              <select value={form.badge} onChange={(e) => set("badge", e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.08] text-white/60 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 [color-scheme:dark]">
                {["Featured","New Arrival","Low Mileage","Electric","Premium","Exotic","Sold"].map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <button type="button" onClick={() => set("available", !form.available)}
                className={`w-10 h-6 rounded-full transition-colors relative ${form.available ? "bg-emerald-500" : "bg-white/10"}`}>
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.available ? "left-5" : "left-1"}`} />
              </button>
              <span className="text-white/50 text-[12px]">{form.available ? "Available" : "Sold"}</span>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Description</label>
            <textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)}
              placeholder="Vehicle description..."
              className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 resize-none" />
          </div>
        </div>

        {/* Performance */}
        <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]/60 mb-5">Performance & Specs</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Field label="Engine"         name="engine"        value={form.engine}        onChange={set} placeholder="3.0L Flat-6" />
            <Field label="Horsepower"     name="horsepower"    value={form.horsepower}    onChange={set} type="number" placeholder="443" />
            <Field label="Torque (lb-ft)" name="torque"        value={form.torque}        onChange={set} type="number" placeholder="390" />
            <Field label="Transmission"   name="transmission"  value={form.transmission}  onChange={set} placeholder="8-Speed PDK" />
            <Field label="Drivetrain"     name="drivetrain"    value={form.drivetrain}    onChange={set} placeholder="RWD" />
            <Field label="Top Speed (mph)"name="top_speed"     value={form.top_speed}     onChange={set} type="number" placeholder="191" />
            <Field label="0–60 (sec)"     name="zero_to_sixty" value={form.zero_to_sixty} onChange={set} type="number" placeholder="3.5" />
            <Field label="MPG"            name="mpg"           value={form.mpg}           onChange={set} placeholder="18 city / 24 hwy" />
            <Field label="Range"          name="range"         value={form.range}         onChange={set} placeholder="300 miles" />
            <Field label="Seating"        name="seating"       value={form.seating}       onChange={set} type="number" placeholder="4" />
            <Field label="Infotainment"   name="infotainment"  value={form.infotainment}  onChange={set} placeholder="PCM 12-inch" />
          </div>
        </div>

        {/* Display specs */}
        <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]/60 mb-5">Card Display Specs</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["engine","power","torque","transmission","drivetrain","seats"].map((k) => (
              <div key={k}>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">{k}</label>
                <input type="text" value={form.specs[k] ?? ""} onChange={(e) => setSpec(k, e.target.value)}
                  placeholder={k === "power" ? "443 hp" : k === "seats" ? "4" : ""}
                  className="w-full bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]/60 mb-5">Image URLs</p>
          <div className="space-y-3">
            {form.images.map((img: string, i: number) => (
              <div key={i} className="flex gap-2">
                <input type="url" value={img} onChange={(e) => {
                  const imgs = [...form.images]; imgs[i] = e.target.value; set("images", imgs);
                }} placeholder="https://images.unsplash.com/..."
                  className="flex-1 bg-white/[0.03] border border-white/[0.08] text-white/70 placeholder:text-white/15 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                {form.images.length > 1 && (
                  <button type="button" onClick={() => set("images", form.images.filter((_: any, j: number) => j !== i))}
                    className="w-10 h-10 flex items-center justify-center border border-white/[0.08] text-white/20 hover:text-red-400 hover:border-red-400/30 transition-colors">
                    <X size={13} />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => set("images", [...form.images, ""])}
              className="flex items-center gap-2 text-[11px] text-white/25 hover:text-[#C9A84C] transition-colors uppercase tracking-wider">
              <Plus size={13} /> Add Image URL
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="btn-gold flex items-center gap-2 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] disabled:opacity-50">
            <Save size={14} /> {saving ? "Saving..." : "Save Vehicle"}
          </button>
          <Link href="/admin/inventory"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.08] text-white/30 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-white/20 hover:text-white/60 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
