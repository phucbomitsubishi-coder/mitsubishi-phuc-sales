import type { MetadataRoute } from "next";
import { cars } from "@/data/cars";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mitsubishi-phuc-sales.vercel.app";

  const carPages = cars.map((car) => ({
    url: `${baseUrl}/xe/${car.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
  {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  ...carPages,
  {
    url: `${baseUrl}/tu-van/chon-xe-mitsubishi-phu-hop`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
];
}