import type { MetadataRoute } from "next";
import { cars } from "@/data/cars";
import { usedCars } from "@/data/usedCars";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mitsubishi-phuc-sales.vercel.app";

  const carPages = cars.map((car) => ({
    url: `${baseUrl}/xe/${car.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const usedCarPages = usedCars.map((car) => ({
    url: `${baseUrl}/xe-cu/${car.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
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
      url: `${baseUrl}/xe-cu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    ...usedCarPages,

    {
      url: `${baseUrl}/tu-van/chon-xe-mitsubishi-phu-hop`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tu-van/chi-phi-lan-banh-mitsubishi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tu-van/chon-phien-ban-xe-mitsubishi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/du-toan/gia-lan-banh`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/du-toan/tra-gop`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/ho-tro/chinh-sach-bao-hanh`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ho-tro/bao-duong-dinh-ky`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ho-tro/phu-tung-chinh-hang`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ho-tro/huong-dan-su-dung`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ho-tro/cau-hoi-thuong-gap`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}