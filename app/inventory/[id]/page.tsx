import { notFound } from "next/navigation";
import { CARS, getCarById, getSimilarCars } from "@/lib/cars";
import CarDetailClient from "./CarDetailClient";

export async function generateStaticParams() {
  return CARS.map((c) => ({ id: String(c.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = getCarById(Number(id));
  if (!car) return {};
  return { title: `${car.year} ${car.name} — VANTA Motors` };
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = getCarById(Number(id));
  if (!car) notFound();
  const similar = getSimilarCars(car);
  return <CarDetailClient car={car} similar={similar} />;
}
