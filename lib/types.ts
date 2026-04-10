export interface CarSpecs {
  engine: string;
  power: string;
  torque: string;
  transmission: string;
  drivetrain: string;
  seats: number;
}

export interface Car {
  id: number;
  name: string;
  year: number;
  price: number;
  mileage: number;
  fuel: "Petrol" | "Electric" | "Hybrid";
  category: "SUV" | "Sedan" | "Sport" | "Electric";
  brand: string;
  available: boolean;
  badge: string;
  specs: CarSpecs;
  description: string;
  images: string[];
  horsepower?: number;
  torque?: number;
  engine?: string;
  transmission?: string;
  drivetrain?: string;
  topSpeed?: number;
  zeroToSixty?: number;
  fuelType?: string;
  mpg?: string;
  range?: string;
  seating?: number;
  infotainment?: string;
  safetyFeatures?: string[];
  colors?: { name: string; hex: string; img: string }[];
}
