import type { MetadataRoute } from "next";
import { cars } from "@/data/cars";
import { usedCars } from "@/data/usedCars";
import { newsArticles } from "@/data/news";
import { isRepublishedArticle } from "@/lib/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mitsubishiauto.vn";

  const carPages = cars.map((car) => ({
    url: `${baseUrl}/xe/${car.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const usedCarPages = usedCars.map((car) => ({
    url: `${baseUrl}/xe-cu/${car.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  // Bài đăng lại từ báo khác đang noindex, nên không đưa vào sitemap
  const newsPages = newsArticles
    .filter((article) => !isRepublishedArticle(article))
    .map((article) => ({
  url: `${baseUrl}/tin-tuc/${article.slug}`,
  lastModified: new Date(`${article.publishedAt}T00:00:00+07:00`),
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
        {
      url: `${baseUrl}/gioi-thieu`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lien-he`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dang-ky-lai-thu`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ho-tro`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tu-van`,
      changeFrequency: "monthly",
      priority: 0.8,
    },


    ...carPages,

    {
      url: `${baseUrl}/xe-cu`,
      changeFrequency: "daily",
      priority: 0.8,
    },

    ...usedCarPages,

    {
  url: `${baseUrl}/tin-tuc`,
  changeFrequency: "daily",
  priority: 0.8,
},

...newsPages,

    {
      url: `${baseUrl}/tu-van/chon-xe-mitsubishi-phu-hop`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tu-van/chi-phi-lan-banh-mitsubishi`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tu-van/chon-phien-ban-xe-mitsubishi`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tu-van/so-sanh-xforce-va-creta`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tu-van/so-sanh-xpander-va-veloz-cross`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tu-van/so-sanh-triton-va-ford-ranger`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tu-van/so-sanh-attrage-va-toyota-vios`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/bang-gia-xe-mitsubishi`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/du-toan/gia-lan-banh`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/du-toan/tra-gop`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mua-xe-mitsubishi-toan-quoc`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/ho-tro/chinh-sach-bao-hanh`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ho-tro/bao-duong-dinh-ky`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ho-tro/huong-dan-su-dung`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ho-tro/cau-hoi-thuong-gap`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/chinh-sach-bao-mat`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}