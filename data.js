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
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=85&auto=format&fit=crop"
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
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop"
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
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 9,
    name: "Ferrari SF90 Stradale",
    year: 2023,
    price: 507000,
    mileage: 2800,
    fuel: "Hybrid",
    category: "Sport",
    brand: "Ferrari",
    available: true,
    badge: "Exotic",
    specs: { engine: "4.0L V8 + 3 Electric Motors", power: "986 hp", torque: "590 lb-ft", transmission: "8-Speed DCT", drivetrain: "AWD", seats: 2 },
    description: "Ferrari's most powerful road car ever. The SF90 Stradale combines a twin-turbo V8 with three electric motors to produce 986 hp.",
    images: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 10,
    name: "Rolls-Royce Ghost",
    year: 2024,
    price: 332000,
    mileage: 900,
    fuel: "Petrol",
    category: "Sedan",
    brand: "Rolls-Royce",
    available: true,
    badge: "Premium",
    specs: { engine: "6.75L V12 Twin-Turbo", power: "563 hp", torque: "627 lb-ft", transmission: "8-Speed Auto", drivetrain: "AWD", seats: 5 },
    description: "Post Opulence. The Ghost is the most technologically advanced Rolls-Royce ever created.",
    images: [
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 11,
    name: "McLaren 720S",
    year: 2023,
    price: 299000,
    mileage: 4100,
    fuel: "Petrol",
    category: "Sport",
    brand: "McLaren",
    available: true,
    badge: "Exotic",
    specs: { engine: "4.0L V8 Twin-Turbo", power: "710 hp", torque: "568 lb-ft", transmission: "7-Speed SSG", drivetrain: "RWD", seats: 2 },
    description: "Pure McLaren. The 720S is built around a carbon fibre MonoCell II chassis. Dihedral doors and active aerodynamics.",
    images: [
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 12,
    name: "Aston Martin DB12",
    year: 2024,
    price: 245000,
    mileage: 1800,
    fuel: "Petrol",
    category: "Sport",
    brand: "Aston Martin",
    available: true,
    badge: "New Arrival",
    specs: { engine: "4.0L V8 Twin-Turbo", power: "671 hp", torque: "590 lb-ft", transmission: "8-Speed Auto", drivetrain: "RWD", seats: 4 },
    description: "The world's first Super Tourer. The DB12 represents a complete reinvention of the Aston Martin grand tourer.",
    images: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 13,
    name: "BMW M5 Competition",
    year: 2024,
    price: 125000,
    mileage: 3200,
    fuel: "Petrol",
    category: "Sedan",
    brand: "BMW",
    available: true,
    badge: "Performance",
    specs: { engine: "4.4L V8 Twin-Turbo", power: "617 hp", torque: "553 lb-ft", transmission: "8-Speed Auto", drivetrain: "AWD", seats: 5 },
    description: "The ultimate sports sedan. The M5 Competition combines supercar performance with everyday usability.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 14,
    name: "Audi RS7 Sportback",
    year: 2024,
    price: 135000,
    mileage: 2800,
    fuel: "Petrol",
    category: "Sedan",
    brand: "Audi",
    available: true,
    badge: "Featured",
    specs: { engine: "4.0L V8 Twin-Turbo", power: "591 hp", torque: "590 lb-ft", transmission: "8-Speed Auto", drivetrain: "AWD", seats: 5 },
    description: "Performance meets elegance. The RS7 Sportback is a four-door coupe that delivers supercar acceleration.",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 15,
    name: "Porsche Cayenne Turbo GT",
    year: 2024,
    price: 185000,
    mileage: 1900,
    fuel: "Petrol",
    category: "SUV",
    brand: "Porsche",
    available: true,
    badge: "Performance",
    specs: { engine: "4.0L V8 Twin-Turbo", power: "631 hp", torque: "626 lb-ft", transmission: "8-Speed PDK", drivetrain: "AWD", seats: 5 },
    description: "The most powerful Cayenne ever built. The Turbo GT combines SUV practicality with GT3-inspired performance.",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 16,
    name: "Bentley Bentayga EWB",
    year: 2024,
    price: 265000,
    mileage: 1200,
    fuel: "Hybrid",
    category: "SUV",
    brand: "Bentley",
    available: true,
    badge: "Premium",
    specs: { engine: "4.0L V8 Twin-Turbo", power: "542 hp", torque: "568 lb-ft", transmission: "8-Speed Auto", drivetrain: "AWD", seats: 5 },
    description: "The pinnacle of luxury SUVs. The Bentayga Extended Wheelbase offers unparalleled rear-seat comfort.",
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 17,
    name: "Maserati Levante Trofeo",
    year: 2024,
    price: 165000,
    mileage: 2400,
    fuel: "Petrol",
    category: "SUV",
    brand: "Maserati",
    available: true,
    badge: "New Arrival",
    specs: { engine: "3.8L V8 Twin-Turbo", power: "580 hp", torque: "538 lb-ft", transmission: "8-Speed Auto", drivetrain: "AWD", seats: 5 },
    description: "Italian passion meets SUV versatility. The Levante Trofeo features a Ferrari-derived V8 engine.",
    images: [
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 18,
    name: "Porsche 911 Turbo S",
    year: 2024,
    price: 230000,
    mileage: 1800,
    fuel: "Petrol",
    category: "Sport",
    brand: "Porsche",
    available: true,
    badge: "Exotic",
    specs: { engine: "3.8L Flat-6 Twin-Turbo", power: "640 hp", torque: "590 lb-ft", transmission: "8-Speed PDK", drivetrain: "AWD", seats: 4 },
    description: "The ultimate 911. The Turbo S delivers 640 hp through all four wheels with launch control that defies physics.",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 19,
    name: "Lamborghini Huracán STO",
    year: 2023,
    price: 335000,
    mileage: 3200,
    fuel: "Petrol",
    category: "Sport",
    brand: "Lamborghini",
    available: true,
    badge: "Exotic",
    specs: { engine: "5.2L V10", power: "631 hp", torque: "417 lb-ft", transmission: "7-Speed DCT", drivetrain: "RWD", seats: 2 },
    description: "Super Trofeo Omologata. The Huracán STO is a race car for the road.",
    images: [
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=85&auto=format&fit=crop"
    ]
  },
  {
    id: 20,
    name: "Mercedes-AMG GT R Pro",
    year: 2023,
    price: 195000,
    mileage: 4200,
    fuel: "Petrol",
    category: "Sport",
    brand: "Mercedes-Benz",
    available: true,
    badge: "Performance",
    specs: { engine: "4.0L V8 Twin-Turbo", power: "577 hp", torque: "516 lb-ft", transmission: "7-Speed DCT", drivetrain: "RWD", seats: 2 },
    description: "Track-focused perfection. The AMG GT R Pro is the most extreme GT ever built.",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=85&auto=format&fit=crop"
    ]
  }
];
