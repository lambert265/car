const CARS = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    year: 2024,
    price: 115000,
    mileage: 4200,
    fuel: "Petrol",
    category: "Sedan",
    brand: "Mercedes-Benz",
    available: true,
    badge: "Featured",
    specs: { engine: "3.0L Inline-6 Turbo", power: "429 hp", torque: "384 lb-ft", transmission: "9-Speed Auto", drivetrain: "RWD", seats: 5 },
    description: "The pinnacle of automotive luxury. The S-Class sets the benchmark for comfort, technology, and refinement — a moving sanctuary for those who demand the very best.",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    name: "BMW X7 xDrive50i",
    year: 2024,
    price: 98500,
    mileage: 6100,
    fuel: "Petrol",
    category: "SUV",
    brand: "BMW",
    available: true,
    badge: "New Arrival",
    specs: { engine: "4.4L V8 Twin-Turbo", power: "523 hp", torque: "553 lb-ft", transmission: "8-Speed Auto", drivetrain: "AWD", seats: 7 },
    description: "Commanding presence meets effortless performance. The X7 redefines what a luxury SUV can be — spacious, powerful, and unmistakably BMW.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    name: "Porsche 911 Carrera S",
    year: 2023,
    price: 142000,
    mileage: 8900,
    fuel: "Petrol",
    category: "Sport",
    brand: "Porsche",
    available: true,
    badge: "Low Mileage",
    specs: { engine: "3.0L Flat-6 Twin-Turbo", power: "443 hp", torque: "390 lb-ft", transmission: "8-Speed PDK", drivetrain: "RWD", seats: 4 },
    description: "Sixty years of motorsport DNA distilled into one iconic silhouette. The 911 Carrera S is not just a sports car — it is the sports car.",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 4,
    name: "Audi Q8 e-tron",
    year: 2024,
    price: 87000,
    mileage: 2100,
    fuel: "Electric",
    category: "SUV",
    brand: "Audi",
    available: true,
    badge: "Electric",
    specs: { engine: "Dual Electric Motor", power: "402 hp", torque: "490 lb-ft", transmission: "Single-Speed", drivetrain: "AWD", seats: 5 },
    description: "The future of luxury SUVs is electric. The Q8 e-tron delivers Audi's signature quattro performance with zero emissions and a 300-mile range.",
    images: [
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 5,
    name: "Range Rover Autobiography",
    year: 2024,
    price: 178000,
    mileage: 1500,
    fuel: "Hybrid",
    category: "SUV",
    brand: "Land Rover",
    available: true,
    badge: "Premium",
    specs: { engine: "4.4L V8 Twin-Turbo", power: "530 hp", torque: "553 lb-ft", transmission: "8-Speed Auto", drivetrain: "AWD", seats: 5 },
    description: "The definitive luxury SUV. The Range Rover Autobiography combines unmatched off-road capability with a cabin that rivals the finest private jets.",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 6,
    name: "Bentley Continental GT",
    year: 2023,
    price: 225000,
    mileage: 5600,
    fuel: "Petrol",
    category: "Sport",
    brand: "Bentley",
    available: false,
    badge: "Sold",
    specs: { engine: "6.0L W12 Twin-Turbo", power: "626 hp", torque: "664 lb-ft", transmission: "8-Speed DCT", drivetrain: "AWD", seats: 4 },
    description: "Hand-crafted in Crewe, England. The Continental GT is the grand tourer that defines the genre — effortless power wrapped in the finest materials on earth.",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 7,
    name: "Tesla Model S Plaid",
    year: 2024,
    price: 94990,
    mileage: 3300,
    fuel: "Electric",
    category: "Sedan",
    brand: "Tesla",
    available: true,
    badge: "Electric",
    specs: { engine: "Tri-Motor Electric", power: "1020 hp", torque: "1050 lb-ft", transmission: "Single-Speed", drivetrain: "AWD", seats: 5 },
    description: "0–60 in 1.99 seconds. The Model S Plaid is the fastest production sedan ever built — a technological marvel that redefines what performance means.",
    images: [
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 8,
    name: "Lamborghini Urus S",
    year: 2024,
    price: 248000,
    mileage: 1200,
    fuel: "Petrol",
    category: "SUV",
    brand: "Lamborghini",
    available: true,
    badge: "Exotic",
    specs: { engine: "4.0L V8 Twin-Turbo", power: "657 hp", torque: "627 lb-ft", transmission: "8-Speed Auto", drivetrain: "AWD", seats: 5 },
    description: "The world's first Super Sport Utility Vehicle. The Urus S delivers Lamborghini's racing DNA in a package that seats five and conquers any terrain.",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&auto=format&fit=crop"
    ]
  }
];
