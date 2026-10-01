import fs from "fs";
import path from "path";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import * as cheerio from "cheerio";

const rl = readline.createInterface({ input, output });

const newsPath = path.join(
  process.cwd(),
  "src",
  "data",
  "news.ts"
);
const promotionsPath = path.join(
  process.cwd(),
  "src",
  "data",
  "promotions.ts"
);

const categories = [
  "Tin Mitsubishi",
  "Khuyến mãi",
  "Tư vấn mua xe",
  "Kinh nghiệm sử dụng",
  "Thị trường",
];

const MAX_CONTENT_IMAGES = 10;

function escapeText(text = "") {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, "\\n")
    .trim();
}

function cleanText(text = "") {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createSlug(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function absoluteUrl(value, baseUrl) {
  if (!value) return "";

  try {
    return new URL(value, baseUrl).href;
  } catch {
    return "";
  }
}

function normalizeImageUrl(value, baseUrl) {
  if (!value) return "";

  let imageUrl = value.trim();

  // Một số website dùng srcset
  if (imageUrl.includes(",")) {
    imageUrl = imageUrl.split(",")[0].trim();
  }

  // Nếu còn kích thước phía sau URL của srcset
  imageUrl = imageUrl.split(/\s+/)[0];

  if (
    !imageUrl ||
    imageUrl.startsWith("data:") ||
    imageUrl.startsWith("blob:")
  ) {
    return "";
  }

  return absoluteUrl(imageUrl, baseUrl);
}

function getImageUrl($, element, baseUrl) {
  const image = $(element);

  const candidates = [
    image.attr("data-src"),
    image.attr("data-lazy-src"),
    image.attr("data-original"),
    image.attr("data-url"),
    image.attr("data-image"),
    image.attr("src"),
    image.attr("srcset"),
    image.attr("data-srcset"),
  ];

  for (const candidate of candidates) {
    const normalized = normalizeImageUrl(candidate, baseUrl);

    if (normalized) {
      return normalized;
    }
  }

  return "";
}

function isLikelyContentImage($, element, imageUrl) {
  if (!imageUrl) return false;

  const image = $(element);

  const width = Number(
    image.attr("width") ||
      image.attr("data-width") ||
      0
  );

  const height = Number(
    image.attr("height") ||
      image.attr("data-height") ||
      0
  );

  // Loại icon / thumbnail rất nhỏ nếu website khai báo kích thước.
  if (
    (width > 0 && width < 250) ||
    (height > 0 && height < 150)
  ) {
    return false;
  }

  const info = [
    image.attr("class"),
    image.attr("id"),
    image.attr("alt"),
    image.attr("title"),
    image.parent().attr("class"),
    image.closest("figure").attr("class"),
    imageUrl,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const blockedWords = [
    "logo",
    "icon",
    "avatar",
    "emoji",
    "banner",
    "advert",
    "ads",
    "tracking",
    "pixel",
    "social",
    "share",
    "author",
    "loading",
    "spinner",
  ];

  if (blockedWords.some((word) => info.includes(word))) {
    return false;
  }

  return true;
}

function collectImagesFromContainer(
  $,
  container,
  baseUrl,
  coverImage
) {
  const results = [];
  const seen = new Set();

  const normalizedCover = coverImage
    ? coverImage.split("?")[0]
    : "";

  function addImage({
    url,
    alt = "",
    caption = "",
    element = null,
  }) {
    if (!url) return;

    if (results.length >= MAX_CONTENT_IMAGES) {
      return;
    }

    const normalizedSrc = url.split("?")[0];
    // Bỏ ảnh popup / modal không thuộc nội dung bài viết.
if (
  normalizedSrc.includes("/public/img/modal-xpander/")
) {
  return;
}

    // Không lấy lại ảnh đại diện.
    if (
      normalizedCover &&
      normalizedSrc === normalizedCover
    ) {
      return;
    }

    // Không lấy ảnh trùng.
    if (seen.has(normalizedSrc)) {
      return;
    }

    // Nếu đây là thẻ img thì tiếp tục dùng
    // bộ lọc logo/icon/banner hiện có.
    if (
      element &&
      !isLikelyContentImage(
        $,
        element,
        url
      )
    ) {
      return;
    }

    seen.add(normalizedSrc);

    results.push({
      url,
      alt: cleanText(alt),
      caption: cleanText(caption),
    });
  }

  // ========================================
  // 1. Ảnh thông thường: <img>
  // ========================================

  container.find("img").each((_, element) => {
    if (results.length >= MAX_CONTENT_IMAGES) {
      return false;
    }

    const image = $(element);

    const src = getImageUrl(
      $,
      element,
      baseUrl
    );

    if (!src) return;

    const figure = image.closest("figure");

    const alt =
      image.attr("alt") ||
      image.attr("title") ||
      "";

    const caption = figure.length
      ? figure.find("figcaption").first().text()
      : "";

    addImage({
      url: src,
      alt,
      caption,
      element,
    });
  });

  // ========================================
  // 2. Ảnh nằm trong link: <a href="...jpg">
  // Một số trang báo dùng kiểu này.
  // ========================================

  container.find("a[href]").each((_, element) => {
    if (results.length >= MAX_CONTENT_IMAGES) {
      return false;
    }

    const link = $(element);

    const href = absoluteUrl(
      link.attr("href"),
      baseUrl
    );

    if (!href) return;

    let pathname = "";

    try {
      pathname = new URL(href).pathname.toLowerCase();
    } catch {
      return;
    }

    const isImageFile =
      /\.(jpe?g|png|webp|avif)(?:$|\/)/i.test(
        pathname
      );

    if (!isImageFile) {
      return;
    }

    /*
     * Ưu tiên alt của img nằm bên trong link.
     * Nếu không có thì lấy title của link.
     */
    const childImage = link.find("img").first();

    const alt =
      childImage.attr("alt") ||
      childImage.attr("title") ||
      link.attr("title") ||
      "";

    const figure = link.closest("figure");

    const caption = figure.length
      ? figure.find("figcaption").first().text()
      : "";

    addImage({
      url: href,
      alt,
      caption,
    });
  });

  return results;
}

function uniqueImages(images) {
  const seen = new Set();

  return images.filter((image) => {
    if (!image?.url) return false;

    const key = image.url.split("?")[0];

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}
function extractTableText($, tableElement) {
  const rows = [];

  $(tableElement)
    .find("tr")
    .each((_, row) => {
      const cells = $(row)
        .find("th, td")
        .map((__, cell) => cleanText($(cell).text()))
        .get()
        .filter(Boolean);

      if (cells.length > 0) {
        rows.push(cells.join(" | "));
      }
    });

  if (rows.length === 0) {
    return "";
  }

  const tableText = rows.join("\n");

if (
  tableText.includes("2WD AT GLX") &&
  tableText.includes("4WD AT Athlete")
) {
  return `ALL NEW TRITON\n[TABLE]\n${tableText}\n[/TABLE]`;
}

return `[TABLE]\n${tableText}\n[/TABLE]`;
}

function getPromotionTables(paragraphs = []) {
  const promotionTables = [];
  let currentCarId = null;

  for (const item of paragraphs) {
    if (typeof item !== "string") {
      continue;
    }

    const detectedCarId = detectPromotionCar(item);

    if (detectedCarId) {
      currentCarId = detectedCarId;
    }

    if (
      item.includes("[TABLE]") &&
      item.includes("[/TABLE]")
    ) {
      promotionTables.push({
        carId: detectedCarId ?? currentCarId,
        tableText: item,
      });
    }
  }

  return promotionTables;
}

function detectPromotionCar(text = "") {
  const normalized = text.toUpperCase();

  if (normalized.includes("DESTINATOR")) {
    return "destinator";
  }

  if (normalized.includes("XPANDER CROSS")) {
    return "xpander-cross";
  }

  if (normalized.includes("XPANDER")) {
    return "xpander";
  }

  if (normalized.includes("XFORCE")) {
    return "xforce";
  }

  if (normalized.includes("ATTRAGE")) {
    return "attrage";
  }

  if (
    normalized.includes("ALL NEW TRITON") ||
    normalized.includes("2WD AT GLX") ||
    normalized.includes("4WD AT ATHLETE")
  ) {
    return "triton";
  }

  return null;
}

function parsePromotionTableRows(tableText = "") {
  const cleanTable = tableText
    .replace(/^ALL NEW TRITON\s*/i, "")
    .replace("[TABLE]", "")
    .replace("[/TABLE]", "")
    .trim();

  const lines = cleanTable
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  return lines.slice(1).map((line) => {
    const cells = line
      .split("|")
      .map((cell) => cell.trim());

    return {
      variantName: cells[0] || "",
      modelYear: cells[1] || "",
      retailPrice: cells[2] || "",
      offer: cells.slice(3).join(" | ").trim(),
    };
  });
}

function parseMoneyValue(value = "") {
  const digits = String(value).replace(/[^\d]/g, "");

  if (!digits) {
    return undefined;
  }

  const amount = Number(digits);

  return Number.isFinite(amount) ? amount : undefined;
}

function parseBenefitValue(text = "") {
  const match = text.match(
    /(?:~\s*)?(\d+(?:[.,]\d+)?)\s*triệu\s*VNĐ/i
  );

  if (!match) {
    return undefined;
  }

  const millionValue = Number(
    match[1].replace(",", ".")
  );

  if (!Number.isFinite(millionValue)) {
    return undefined;
  }

  return Math.round(millionValue * 1000000);
}

function parsePromotionBenefits(offer = "") {
  if (!offer) {
    return [];
  }

  return offer
    .split(/\n|•|–|-|;/)
    .map((item) => cleanText(item))
    .filter(Boolean)
    .map((item) => {
  const value = parseBenefitValue(item);

  return {
    label: item,
    ...(value !== undefined ? { value } : {}),
    description: item,
    calculable: false,
  };
});
}

function buildPromotionCars(paragraphs = []) {
  const tables = getPromotionTables(paragraphs);

  return tables
    .map(({ carId, tableText }) => {
      if (!carId) {
        return null;
      }

      const rows = parsePromotionTableRows(tableText);

      const variants = rows
        .filter((row) => row.variantName)
        .map((row) => ({
          variantName: row.variantName,
          modelYear: row.modelYear,
          retailPrice: parseMoneyValue(row.retailPrice),
          benefits: parsePromotionBenefits(row.offer),
        }));

      if (variants.length === 0) {
        return null;
      }

      return {
        carId,
        variants,
      };
    })
    .filter(Boolean);
}

function detectPromotionPeriod(title = "") {
 const match = title.match(
  /(?:tháng|thang)\s*(\d{1,2})\s*[\/\-]\s*(\d{4})/i
);

  if (!match) {
    return null;
  }

  const month = Number(match[1]);
  const year = Number(match[2]);

  if (
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12 ||
    !Number.isInteger(year)
  ) {
    return null;
  }

  return {
    month,
    year,
  };
}

function buildPromotionFileContent({
  title,
  paragraphs,
}) {
  const period = detectPromotionPeriod(title);
  const cars = buildPromotionCars(paragraphs);

  if (!period || cars.length === 0) {
    return null;
  }

  return `export type PromotionBenefit = {
  label: string;
  value?: number;
  description?: string;
  calculable: boolean;
};

export type VariantPromotion = {
  variantName: string;
  modelYear?: string;
  retailPrice?: number;
  benefits: PromotionBenefit[];
};

export type CarPromotion = {
  carId: string;
  variants: VariantPromotion[];
};

export type PromotionProgram = {
  month: number;
  year: number;
  title: string;
  source: string;
  cars: CarPromotion[];
};

export const currentPromotion: PromotionProgram = ${JSON.stringify(
    {
      month: period.month,
      year: period.year,
      title,
      source: "Mitsubishi Motors Việt Nam",
      cars,
    },
        null,
    2
  )};

export function getMaxPromotionValue(carId: string) {
  const carPromotion = currentPromotion.cars.find(
    (car) => car.carId === carId
  );

  if (!carPromotion) {
    return 0;
  }

  return Math.max(
    0,
    ...carPromotion.variants.map((variant) =>
      variant.benefits.reduce(
        (total, benefit) => total + (benefit.value ?? 0),
        0
      )
    )
  );
}
`;
}

function uniqueParagraphs(items) {
  const seen = new Set();

  return items.filter((text) => {
    const normalized = cleanText(text);

    if (
      (normalized.length < 60 &&
  !/^(DESTINATOR|XPANDER|XPANDER CROSS|XFORCE|ATTRAGE|ALL NEW TRITON)$/i.test(normalized)) ||
      normalized.length > 5000 ||
      seen.has(normalized)
    ) {
      return false;
    }

    seen.add(normalized);
    return true;
  });
}

function getExtensionFromContentType(contentType) {
  const type = (contentType || "").toLowerCase();

  if (type.includes("png")) return ".png";
  if (type.includes("webp")) return ".webp";
  if (type.includes("gif")) return ".gif";
  if (type.includes("avif")) return ".avif";

  return ".jpg";
}

async function downloadImage(
  imageUrl,
  directory,
  baseFileName
) {
  const response = await fetch(imageUrl, {
    redirect: "follow",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
      Accept:
        "image/avif,image/webp,image/png,image/jpeg,image/*,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const contentType =
    response.headers.get("content-type") || "";

  if (
    contentType &&
    !contentType.toLowerCase().includes("image/")
  ) {
    throw new Error(
      `URL không trả về ảnh (${contentType})`
    );
  }

  const extension =
    getExtensionFromContentType(contentType);

  fs.mkdirSync(directory, { recursive: true });

  const fileName = `${baseFileName}${extension}`;
  const filePath = path.join(directory, fileName);

  const arrayBuffer = await response.arrayBuffer();

  fs.writeFileSync(
    filePath,
    Buffer.from(arrayBuffer)
  );

  return {
    fileName,
    filePath,
  };
}

async function downloadCoverImage(imageUrl, slug) {
  if (!imageUrl) return "";

  try {
    console.log("");
    console.log("Đang tải ảnh đại diện về website...");

    const imageDirectory = path.join(
      process.cwd(),
      "public",
      "images",
      "news"
    );

    const result = await downloadImage(
      imageUrl,
      imageDirectory,
      slug
    );

    const localImagePath =
      `/images/news/${result.fileName}`;

    console.log(`Đã lưu ảnh: ${localImagePath}`);

    return localImagePath;
  } catch (error) {
    console.log("");
    console.log("Không tải được ảnh đại diện.");
    console.log(`Lý do: ${error.message}`);
    console.log("Sẽ giữ nguyên URL ảnh gốc.");

    return imageUrl;
  }
}

async function downloadContentImages(
  images,
  slug,
  fallbackAlt
) {
  if (!images.length) return [];

  const imageDirectory = path.join(
    process.cwd(),
    "public",
    "images",
    "news",
    slug
  );

  const downloaded = [];

  console.log("");
  console.log(
    `Đang tải ${images.length} ảnh nội dung về website...`
  );

  for (let index = 0; index < images.length; index++) {
    const image = images[index];

    try {
      const number = String(index + 1).padStart(2, "0");

      const result = await downloadImage(
        image.url,
        imageDirectory,
        `image-${number}`
      );

      const localPath =
        `/images/news/${slug}/${result.fileName}`;

      downloaded.push({
        src: localPath,
        alt: image.alt || fallbackAlt,
        caption: image.caption || "",
      });

      console.log(
        `[${index + 1}/${images.length}] ${localPath}`
      );
    } catch (error) {
      console.log(
        `[${index + 1}/${images.length}] Bỏ qua ảnh tải lỗi: ${error.message}`
      );
    }
  }

  return downloaded;
}

async function fetchArticle(url) {
  console.log("");
  console.log("Đang đọc bài viết...");

  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language":
        "vi-VN,vi;q=0.9,en;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Không tải được trang. HTTP ${response.status}`
    );
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  $(
    "script, style, noscript, iframe, form, nav, footer, aside"
  ).remove();

  const title = cleanText(
    $('meta[property="og:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      $("h1").first().text() ||
      $("title").text()
  );

  const description = cleanText(
    $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      ""
  );

  const image = absoluteUrl(
    $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      "",
    url
  );

  const siteName = cleanText(
    $('meta[property="og:site_name"]').attr("content") ||
      new URL(url).hostname.replace(/^www\./, "")
  );

  let paragraphs = [];
  let contentImages = [];

  // ========================================
  // 1. XenForo / AutoDaily
  // ========================================

  const forumPost = $(".message").first();

  if (forumPost.length) {
    const forumContent = forumPost
      .find(
        ".message-body .bbWrapper, .message-body, .bbWrapper"
      )
      .first();

    if (forumContent.length) {
      const forumParagraphs = [];

      forumContent.find("p").each((_, element) => {
        const text = cleanText($(element).text());

        if (text.length >= 40) {
          forumParagraphs.push(text);
        }
      });

      if (forumParagraphs.length < 3) {
        const htmlContent =
          forumContent.html() || "";

        const normalizedHtml = htmlContent
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/<\/p>/gi, "\n")
          .replace(/<\/div>/gi, "\n")
          .replace(/<\/blockquote>/gi, "\n");

        const temp = cheerio.load(
          `<div id="article-temp">${normalizedHtml}</div>`
        );

        const textContent =
          temp("#article-temp").text();

        const lines = textContent
          .split(/\n+/)
          .map((line) => cleanText(line))
          .filter((line) => line.length >= 40);

        forumParagraphs.push(...lines);
      }

      paragraphs =
        uniqueParagraphs(forumParagraphs);

      contentImages =
        collectImagesFromContainer(
          $,
          forumContent,
          url,
          image
        );
    }
  }

  // ========================================
  // 2. Bài báo thông thường
  // ========================================

  if (paragraphs.length < 2) {
    const selectors = [
            ".detail_content",
      ".news-detail-content",
      ".article-detail-content",
      "article",
      ".article-content",
      ".article-body",
      ".entry-content",
      ".post-content",
      ".post-body",
      ".content-detail",
      ".detail-content",
      ".news-content",
      ".detail__content",
      ".article__body",
      ".article-detail",
      ".news-detail",
      ".content-news",
      "main",
    ];

    let bestContainer = null;
    let bestParagraphs = [];

    for (const selector of selectors) {
      $(selector).each((_, element) => {
        const container = $(element);

        const found = container
  .find("p, h2, h3, h4, h5, h6, table")
  .map((__, element) => {
    const tagName = element.tagName?.toLowerCase();

    if (tagName === "table") {
      return extractTableText($, element);
    }

    return cleanText($(element).text());
  })
  .get()
  .filter(Boolean);

        const stopIndex = found.findIndex((text) =>
  [
    "Cám ơn Quý khách đã quan tâm và đăng ký thông tin",
    "Chính sách bảo mật",
    "dữ liệu cá nhân",
  ].some((marker) =>
    text.toLowerCase().includes(marker.toLowerCase())
  )
);

const articleOnly =
  stopIndex >= 0 ? found.slice(0, stopIndex) : found;

const usable = uniqueParagraphs(articleOnly);

        if (
          usable.length > bestParagraphs.length
        ) {
          bestParagraphs = usable;
          bestContainer = container;
        }
      });
    }

    if (bestParagraphs.length >= 2) {
      paragraphs = bestParagraphs;

      if (bestContainer) {
        contentImages =
          collectImagesFromContainer(
            $,
            bestContainer,
            url,
            image
          );
      }
    }
  }

  // ========================================
  // 3. Phương án cuối cùng
  // ========================================

  if (paragraphs.length < 2) {
    paragraphs = uniqueParagraphs(
      $("p")
        .map((_, element) =>
          cleanText($(element).text())
        )
        .get()
    );
  }

  /*
   * Nếu đã nhận diện được bài nhưng selector không lấy
   * được ảnh, thử tìm ảnh trong article/main.
   */
  if (contentImages.length === 0) {
    const fallbackContainer =
      $("article").first().length
        ? $("article").first()
        : $("main").first();

    if (fallbackContainer.length) {
      contentImages =
        collectImagesFromContainer(
          $,
          fallbackContainer,
          url,
          image
        );
    }
  }
    // ========================================
  // 4. Fallback riêng cho XeHay
  // ========================================

  if (
    contentImages.length === 0 &&
    new URL(url).hostname.includes("xehay.vn")
  ) {
    const xehayImages = [];

    $("img").each((_, element) => {
      const src = getImageUrl(
        $,
        element,
        url
      );

      if (!src) return;

      let pathname = "";

      try {
        pathname =
          new URL(src).pathname.toLowerCase();
      } catch {
        return;
      }

      // Chỉ lấy ảnh upload của XeHay.
      if (!pathname.includes("/uploads/images/")) {
  return;
}

if (
  pathname.includes("/banner") ||
  pathname.includes("quang%20cao") ||
  pathname.includes("quang cao") ||
  pathname.includes("logo")
) {
  return;
}

      // Không lấy thumbnail 640x480 làm ảnh nội dung.
      if (
        pathname.includes("/thumb/") ||
        pathname.includes("640x480")
      ) {
        return;
      }

      const imageElement = $(element);

      xehayImages.push({
        url: src,
        alt: cleanText(
          imageElement.attr("alt") ||
            imageElement.attr("title") ||
            ""
        ),
        caption: "",
      });
    });

    // Một số ảnh XeHay có thể nằm trực tiếp trong href.
    $("a[href]").each((_, element) => {
      const href = absoluteUrl(
        $(element).attr("href"),
        url
      );

      if (!href) return;

      let pathname = "";

      try {
        pathname =
          new URL(href).pathname.toLowerCase();
      } catch {
        return;
      }

      if (!pathname.includes("/uploads/images/")) {
  return;
}

if (
  pathname.includes("/banner") ||
  pathname.includes("quang%20cao") ||
  pathname.includes("quang cao") ||
  pathname.includes("logo")
) {
  return;
}

      if (
        !/\.(jpe?g|png|webp|avif)$/i.test(
          pathname
        )
      ) {
        return;
      }

      if (
        pathname.includes("/thumb/") ||
        pathname.includes("640x480")
      ) {
        return;
      }

      const childImage = $(element)
        .find("img")
        .first();

      xehayImages.push({
        url: href,
        alt: cleanText(
          childImage.attr("alt") ||
            $(element).attr("title") ||
            ""
        ),
        caption: "",
      });
    });

    contentImages = uniqueImages(xehayImages)
      .slice(0, MAX_CONTENT_IMAGES);
  }

  contentImages = uniqueImages(contentImages)
    .slice(0, MAX_CONTENT_IMAGES);

  return {
    title,
    description,
    image,
    siteName,
    paragraphs,
    contentImages,
  };
}

function createImagesCode(images) {
  if (!images.length) return "";

  const items = images
    .map((image) => {
      const captionLine = image.caption
        ? `\n            caption: "${escapeText(
            image.caption
          )}",`
        : "";

      return `          {
            src: "${escapeText(image.src)}",
            alt: "${escapeText(image.alt)}",${captionLine}
          },`;
    })
    .join("\n");

  return `
        images: [
${items}
        ],`;
}

function createArticleCode({
  id,
  title,
  slug,
  category,
  excerpt,
  publishedAt,
  image,
  featured,
  paragraphs,
  images,
  sourceName,
  sourceUrl,
}) {
  const paragraphsCode = paragraphs
    .map(
      (paragraph) =>
        `          "${escapeText(paragraph)}",`
    )
    .join("\n");

  const imagesCode = createImagesCode(images);

  return `  {
    id: "${id}",

    title: "${escapeText(title)}",

    slug: "${slug}",

    category: "${category}",

    excerpt:
      "${escapeText(excerpt)}",

    publishedAt: "${publishedAt}",

    image: "${escapeText(image)}",

    featured: ${featured},

    content: [
      {
        heading: "${escapeText(title)}",

        paragraphs: [
${paragraphsCode}
        ],${imagesCode}
      },
    ],

    source: {
      name: "${escapeText(sourceName)}",
      url: "${escapeText(sourceUrl)}",
    },
  },
`;
}

async function main() {
  if (!fs.existsSync(newsPath)) {
    throw new Error(
      `Không tìm thấy file: ${newsPath}`
    );
  }

  const newsFile =
    fs.readFileSync(newsPath, "utf8");

  console.log("");
  console.log("========================================");
  console.log("   NHẬP BÀI VIẾT TỪ URL - V2");
  console.log("========================================");
  console.log("");

  const sourceUrl = (
    await rl.question("Dán URL bài viết: ")
  ).trim();

  if (!sourceUrl) {
    console.log("Bạn chưa nhập URL.");
    return;
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(sourceUrl);
  } catch {
    console.log("URL không hợp lệ.");
    return;
  }

  if (
    !["http:", "https:"].includes(
      parsedUrl.protocol
    )
  ) {
    console.log(
      "Chỉ hỗ trợ URL http hoặc https."
    );
    return;
  }

  const article =
    await fetchArticle(sourceUrl);

  if (!article.title) {
    console.log(
      "Không tự nhận diện được tiêu đề bài viết."
    );
    return;
  }

  if (article.paragraphs.length === 0) {
    console.log(
      "Không tự nhận diện được nội dung chính của bài."
    );
    return;
  }

  console.log("");
  console.log("========================================");
  console.log("ĐÃ ĐỌC ĐƯỢC BÀI");
  console.log("========================================");
  console.log(`Tiêu đề: ${article.title}`);
  console.log(`Nguồn: ${article.siteName}`);
  console.log(
    `Số đoạn tìm được: ${article.paragraphs.length}`
  );
  console.log(
    `Số ảnh nội dung tìm được: ${article.contentImages.length}`
  );
  console.log(
    `Ảnh đại diện: ${
      article.image || "Không tìm thấy"
    }`
  );
  console.log("");

  const useDetectedTitle = (
    await rl.question(
      "Dùng tiêu đề trên? (y/n, mặc định y): "
    )
  )
    .trim()
    .toLowerCase();

  let title = article.title;

  if (useDetectedTitle === "n") {
    title = cleanText(
      await rl.question("Nhập tiêu đề mới: ")
    );
  }

  if (!title) {
    console.log(
      "Tiêu đề không được để trống."
    );
    return;
  }

  const slug = createSlug(title);

  if (!slug) {
    console.log("Không thể tạo slug.");
    return;
  }

  let articleAlreadyExists = false;

  if (
    newsFile.includes(`slug: "${slug}"`) ||
    newsFile.includes(`"slug": "${slug}"`)
  ) {
    console.log("");
    console.log(
      "Bài có slug này đã tồn tại:"
    );
    console.log(slug);
    console.log("");
    console.log(
  "Bài viết sẽ không được thêm lại vào Tin tức."
);
    articleAlreadyExists = true;
  }

  console.log("");
  console.log("Chọn chuyên mục:");

  categories.forEach((category, index) => {
    console.log(
      `${index + 1}. ${category}`
    );
  });

  console.log("");

  const categoryChoice = Number(
    await rl.question(
      "Nhập số chuyên mục (1-5): "
    )
  );

  if (
    !Number.isInteger(categoryChoice) ||
    categoryChoice < 1 ||
    categoryChoice > categories.length
  ) {
    console.log(
      "Chuyên mục không hợp lệ."
    );
    return;
  }

  const category =
    categories[categoryChoice - 1];

  let excerpt = article.description;

  if (!excerpt) {
    excerpt =
      article.paragraphs[0]?.slice(0, 250) ||
      "";
  }

  console.log("");
  console.log("Mô tả ngắn tự động:");
  console.log(excerpt);
  console.log("");

  const changeExcerpt = (
    await rl.question(
      "Muốn sửa mô tả ngắn? (y/n, mặc định n): "
    )
  )
    .trim()
    .toLowerCase();

  if (changeExcerpt === "y") {
    excerpt = cleanText(
      await rl.question(
        "Nhập mô tả ngắn: "
      )
    );
  }

  const imageInput = (
    await rl.question(
      "Ảnh đại diện (Enter = ảnh tìm được): "
    )
  ).trim();

  let image =
    imageInput ||
    article.image ||
    "/images/hero/hero-main.jpg";

  const sourceNameInput = (
    await rl.question(
      `Tên nguồn (Enter = ${article.siteName}): `
    )
  ).trim();

  const sourceName =
    sourceNameInput || article.siteName;

  const featuredAnswer = (
    await rl.question(
      "Đặt làm bài nổi bật? (y/n, mặc định n): "
    )
  )
    .trim()
    .toLowerCase();

  const featured =
    featuredAnswer === "y";

  console.log("");
  console.log("========================================");
  console.log("XEM TRƯỚC");
  console.log("========================================");
  console.log(`Tiêu đề: ${title}`);
  console.log(`Slug: ${slug}`);
  console.log(`Chuyên mục: ${category}`);
  console.log(`Ngày đăng: ${today()}`);
  console.log(`Nguồn: ${sourceName}`);
  console.log(
    `Số đoạn nội dung: ${article.paragraphs.length}`
  );
  console.log(
    `Số ảnh nội dung: ${article.contentImages.length}`
  );
  console.log(`Ảnh đại diện: ${image}`);
  console.log(
    `Bài nổi bật: ${
      featured ? "Có" : "Không"
    }`
  );

  console.log("");
  console.log(
    "---------- TOÀN BỘ NỘI DUNG ----------"
  );

  article.paragraphs.forEach(
    (paragraph, index) => {
      console.log("");
      console.log(
        `${index + 1}. ${paragraph}`
      );
    }
  );

  if (article.contentImages.length > 0) {
    console.log("");
    console.log(
      "---------- ẢNH NỘI DUNG ----------"
    );

    article.contentImages.forEach(
      (contentImage, index) => {
        console.log("");
        console.log(
          `${index + 1}. ${contentImage.url}`
        );

        if (contentImage.alt) {
          console.log(
            `   Alt: ${contentImage.alt}`
          );
        }

        if (contentImage.caption) {
          console.log(
            `   Chú thích: ${contentImage.caption}`
          );
        }
      }
    );
  }

  console.log("");

  const confirm = (
    await rl.question(
      "Thêm bài này vào website? (y/n): "
    )
  )
    .trim()
    .toLowerCase();

  if (confirm !== "y") {
    console.log("");
    console.log(
      "Đã hủy. news.ts không bị thay đổi."
    );
  }

  // ========================================
  // Chỉ tải ảnh sau khi xác nhận
  // ========================================

  if (/^https?:\/\//i.test(image)) {
    image = await downloadCoverImage(
      image,
      slug
    );
  }

  const downloadedContentImages =
    await downloadContentImages(
      article.contentImages,
      slug,
      title
    );

  // ========================================
  // Tạo code sau khi đã có đường dẫn local
  // ========================================

  const id = `news-${Date.now()}`;

  const articleCode =
    createArticleCode({
      id,
      title,
      slug,
      category,
      excerpt,
      publishedAt: today(),
      image,
      featured,
      paragraphs: article.paragraphs,
      images: downloadedContentImages,
      sourceName,
      sourceUrl,
    });

  const marker =
    "export const newsArticles: NewsArticle[] = [";

  const markerIndex =
    newsFile.indexOf(marker);

  if (markerIndex === -1) {
    console.log("");
    console.log(
      "Không tìm thấy newsArticles trong news.ts. Đã dừng."
    );
    return;
  }

  const insertPosition =
    markerIndex + marker.length;

  const updatedFile =
    newsFile.slice(0, insertPosition) +
    "\n" +
    articleCode +
    newsFile.slice(insertPosition);

    let promotionFileContent = null;

if (category === "Khuyến mãi") {
  promotionFileContent = buildPromotionFileContent({
    title,
    paragraphs: article.paragraphs,
  });

  if (!promotionFileContent) {
    console.log(
      "\n⚠️ Không thể tạo dữ liệu khuyến mãi tự động. promotions.ts sẽ không bị thay đổi."
    );
  }
}

if (promotionFileContent) {
  fs.writeFileSync(
    promotionsPath,
    promotionFileContent,
    "utf8"
  );

  console.log(
    "✓ Đã cập nhật dữ liệu khuyến mãi hiện hành."
  );
}

  if (!articleAlreadyExists) {
  fs.writeFileSync(
    newsPath,
    updatedFile,
    "utf8"
  );
}

  console.log("");
  console.log("========================================");
  console.log(
  articleAlreadyExists
    ? "ĐÃ CẬP NHẬT DỮ LIỆU LIÊN QUAN"
    : "ĐÃ XỬ LÝ BÀI VIẾT"
);
  console.log("========================================");
  console.log(`Tiêu đề: ${title}`);
  console.log(
    `Ảnh nội dung đã tải: ${downloadedContentImages.length}`
  );
  console.log(
    `Trang: /tin-tuc/${slug}`
  );
  console.log("");
  console.log(
    "Hãy kiểm tra website trước khi commit."
  );
}

try {
  await main();
} catch (error) {
  console.error("");
  console.error("CÓ LỖI:");
  console.error(
    error instanceof Error
      ? error.message
      : error
  );
  process.exitCode = 1;
} finally {
  rl.close();
}