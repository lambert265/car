export interface Rental {
  id: number;
  name: string;
  brand: string;
  category: "Sedan" | "SUV" | "Sport" | "Convertible";
  year: number;
  dailyRate: number;
  weeklyRate: number;
  seats: number;
  fuel: string;
  transmission: string;
  features: string[];
  available: boolean;
  badge: string;
  img: string;
}

export const RENTALS: Rental[] = [
  {
    id: 1,
    name: "Mercedes-Benz S 580",
    brand: "Mercedes-Benz",
    category: "Sedan",
    year: 2024,
    dailyRate: 850,
    weeklyRate: 4900,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    features: ["Chauffeur Available", "Massage Seats", "Burmester 3D Sound", "Night Vision"],
    available: true,
    badge: "Most Popular",
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=90&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Rolls-Royce Ghost",
    brand: "Rolls-Royce",
    category: "Sedan",
    year: 2024,
    dailyRate: 2200,
    weeklyRate: 13500,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    features: ["Starlight Headliner", "Bespoke Audio", "Champagne Cooler", "White Glove Delivery"],
    available: true,
    badge: "Ultra Luxury",
    img: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=90&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Lamborghini Urus S",
    brand: "Lamborghini",
    category: "SUV",
    year: 2024,
    dailyRate: 1800,
    weeklyRate: 10500,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    features: ["657 HP V8", "0–60 in 3.5s", "Carbon Ceramic Brakes", "Sport Exhaust"],
    available: true,
    badge: "Exotic",
    img: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=90&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Range Rover Autobiography",
    brand: "Land Rover",
    category: "SUV",
    year: 2024,
    dailyRate: 950,
    weeklyRate: 5800,
    seats: 5,
    fuel: "Hybrid",
    transmission: "Automatic",
    features: ["Panoramic Roof", "Meridian Sound", "Air Suspension", "Executive Rear Seats"],
    available: true,
    badge: "Premium SUV",
    img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=90&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Porsche 911 Carrera S",
    brand: "Porsche",
    category: "Sport",
    year: 2024,
    dailyRate: 1200,
    weeklyRate: 7200,
    seats: 4,
    fuel: "Petrol",
    transmission: "PDK",
    features: ["443 HP Flat-6", "Sport Chrono", "PASM Suspension", "Bose Surround"],
    available: true,
    badge: "Iconic",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=90&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Ferrari SF90 Stradale",
    brand: "Ferrari",
    category: "Sport",
    year: 2023,
    dailyRate: 3500,
    weeklyRate: 21000,
    seats: 2,
    fuel: "Hybrid",
    transmission: "DCT",
    features: ["986 HP Hybrid V8", "0–60 in 2.5s", "Full Electric Mode", "Carbon Fibre Body"],
    available: false,
    badge: "Reserved",
    img: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=90&auto=format&fit=crop",
  },
];
