import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock, ArrowRight, Mail } from "lucide-react";

export const metadata = { title: "Showrooms — VANTA Motors" };

const SHOWROOMS = [
  {
    city: "Beverly Hills",
    address: "123 Prestige Drive, Beverly Hills, CA 90210",
    phone: "+1 (555) 123-4567",
    email: "beverlyhills@vantamotors.com",
    hours: [["Mon – Fri", "9:00am – 7:00pm"], ["Saturday", "10:00am – 6:00pm"], ["Sunday", "11:00am – 5:00pm"]],
    img: "https://images.unsplash.com/photo-1562519819-016930ada31a?w=900&q=85&auto=format&fit=crop",
    tag: "Flagship",
    stock: 142,
    desc: "Our flagship showroom in the heart of Beverly Hills. Three floors of curated luxury vehicles, a private client lounge, and a dedicated finance suite.",
  },
  {
    city: "New York",
    address: "456 Fifth Avenue, New York, NY 10018",
    phone: "+1 (555) 987-6543",
    email: "newyork@vantamotors.com",
    hours: [["Mon – Fri", "9:00am – 7:00pm"], ["Saturday", "10:00am – 6:00pm"], ["Sunday", "Closed"]],
    img: "https://images.unsplash.com/photo-1567449303078-57ad995bd17f?w=900&q=85&auto=format&fit=crop",
    tag: "Showroom",
    stock: 98,
    desc: "Located on Fifth Avenue, our New York showroom brings the VANTA experience to the city. Featuring an exclusive selection of ultra-rare and collector vehicles.",
  },
  {
    city: "Miami",
    address: "789 Brickell Avenue, Miami, FL 33131",
    phone: "+1 (555) 456-7890",
    email: "miami@vantamotors.com",
    hours: [["Mon – Fri", "10:00am – 6:00pm"], ["Saturday", "10:00am – 5:00pm"], ["Sunday", "Closed"]],
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&q=85&auto=format&fit=crop",
    tag: "Showroom",
    stock: 76,
    desc: "Our Miami showroom specialises in convertibles, exotics, and performance vehicles — perfectly suited to the Florida lifestyle.",
  },
];

export default function ShowroomsPage() {
  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">

      {/* Hero */}
      <section className="relative bg-[#080808] border-b border-white/[0.05] py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <p className="text-[#C9A84C] text-[11px] font-bold uppercase tracking-[0.35em]">Our Locations</p>
            <div className="h-px w-8 bg-[#C9A84C]" />
          </div>
          <h1 className="text-white font-bold mb-4 leading-[0.95]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 300 }}>
            Visit us in person.<br /><em style={{ color: "#C9A84C" }}>Experience the difference.</em>
          </h1>
          <p className="text-white/35 text-[15px] leading-relaxed max-w-lg mx-auto">
            Three showrooms across the United States. Each one designed to deliver the VANTA experience — unhurried, personal, and exceptional.
          </p>
        </div>
      </section>

      {/* Showrooms */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-8">
        {SHOWROOMS.map(({ city, address, phone, email, hours, img, tag, stock, desc }, i) => (
          <div key={city} className="bg-[#0d0d0d] border border-white/[0.06] hover:border-[#C9A84C]/20 transition-colors overflow-hidden">
            <div className={`grid grid-cols-1 lg:grid-cols-2 ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>

              {/* Image */}
              <div className={`relative aspect-[16/10] lg:aspect-auto overflow-hidden ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <Image src={img} alt={city} fill sizes="700px" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-[#C9A84C] text-black">{tag}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white/60 border border-white/10">{stock} vehicles</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="h-px w-8 bg-[#C9A84C] mb-4" />
                  <h2 className="text-white font-bold text-2xl mb-3">{city}</h2>
                  <p className="text-white/35 text-[14px] leading-relaxed mb-6">{desc}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-[#C9A84C]/60 mt-0.5 shrink-0" />
                      <span className="text-white/50 text-[13px]">{address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={14} className="text-[#C9A84C]/60 shrink-0" />
                      <a href={`tel:${phone}`} className="text-white/50 text-[13px] hover:text-[#C9A84C] transition-colors">{phone}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={14} className="text-[#C9A84C]/60 shrink-0" />
                      <a href={`mailto:${email}`} className="text-white/50 text-[13px] hover:text-[#C9A84C] transition-colors">{email}</a>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={12} className="text-[#C9A84C]/60" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Opening Hours</span>
                    </div>
                    <div className="space-y-1.5">
                      {hours.map(([day, time]) => (
                        <div key={day} className="flex items-center justify-between">
                          <span className="text-white/35 text-[12px]">{day}</span>
                          <span className={`text-[12px] font-semibold ${time === "Closed" ? "text-white/20" : "text-white/60"}`}>{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href="/contact" className="btn-gold flex-1 flex items-center justify-center gap-2 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em]">
                    Book a Visit <ArrowRight size={12} />
                  </Link>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-white/[0.08] text-white/30 text-[11px] font-bold uppercase tracking-[0.15em] hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors">
                    <MapPin size={12} /> Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
