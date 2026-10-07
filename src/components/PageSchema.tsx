import type { Metadata } from "next";

// JSON-LD cho trang tĩnh: Article/WebPage (tác giả là #person khai báo trong layout.tsx)
// + BreadcrumbList. Tiêu đề và mô tả lấy từ metadata của trang để không bị lệch nhau.

const siteUrl = "https://www.mitsubishiauto.vn";

type Crumb = { name: string; path: string };

type PageSchemaProps = {
  metadata: Metadata;
  path: string;
  // Các cấp trung gian giữa "Trang chủ" và trang hiện tại, ví dụ [{ name: "Tư vấn", path: "/tu-van" }]
  parents?: Crumb[];
  // Tên ngắn của trang trong breadcrumb (mặc định lấy tiêu đề)
  name?: string;
  type?: "Article" | "WebPage" | "CollectionPage";
  datePublished?: string;
  dateModified?: string;
  // true khi thư mục trang có opengraph-image.tsx
  hasOgImage?: boolean;
};

export default function PageSchema({
  metadata,
  path,
  parents = [],
  name,
  type = "Article",
  datePublished,
  dateModified,
  hasOgImage = false,
}: PageSchemaProps) {
  const url = `${siteUrl}${path}`;
  const headline = String(metadata.title ?? "").replace(/ \| Lưu Hoàng Phúc$/, "");
  const description = metadata.description ?? undefined;
  const person = { "@id": `${siteUrl}/#person` };

  const pageSchema =
    type === "Article"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${url}#article`,
          headline,
          description,
          ...(hasOgImage ? { image: `${url}/opengraph-image` } : {}),
          ...(datePublished ? { datePublished } : {}),
          ...(dateModified ? { dateModified } : {}),
          inLanguage: "vi-VN",
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          author: person,
          publisher: person,
        }
      : {
          "@context": "https://schema.org",
          "@type": type,
          "@id": url,
          url,
          name: headline,
          description,
          ...(hasOgImage ? { image: `${url}/opengraph-image` } : {}),
          ...(dateModified ? { dateModified } : {}),
          inLanguage: "vi-VN",
          isPartOf: { "@id": `${siteUrl}/#website` },
          author: person,
        };

  const crumbs: Crumb[] = [
    { name: "Trang chủ", path: "" },
    ...parents,
    { name: name ?? headline, path },
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
