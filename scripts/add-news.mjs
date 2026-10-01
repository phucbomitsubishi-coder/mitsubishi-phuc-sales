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

const categories = [
  "Tin Mitsubishi",
  "Khuyến mãi",
  "Tư vấn mua xe",
  "Kinh nghiệm sử dụng",
  "Thị trường",
];

function escapeText(text = "") {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, " ")
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
async function downloadArticleImage(imageUrl, slug) {
  if (!imageUrl) return "";

  try {
    console.log("");
    console.log("Đang tải ảnh đại diện về website...");

    const response = await fetch(imageUrl, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
        Accept: "image/avif,image/webp,image/png,image/jpeg,image/*,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const contentType =
      response.headers.get("content-type")?.toLowerCase() || "";

    let extension = ".jpg";

    if (contentType.includes("png")) {
      extension = ".png";
    } else if (contentType.includes("webp")) {
      extension = ".webp";
    } else if (contentType.includes("gif")) {
      extension = ".gif";
    } else if (
      contentType.includes("jpeg") ||
      contentType.includes("jpg")
    ) {
      extension = ".jpg";
    }

    const imageDirectory = path.join(
      process.cwd(),
      "public",
      "images",
      "news"
    );

    fs.mkdirSync(imageDirectory, { recursive: true });

    const fileName = `${slug}${extension}`;
    const filePath = path.join(imageDirectory, fileName);

    const arrayBuffer = await response.arrayBuffer();

    fs.writeFileSync(
      filePath,
      Buffer.from(arrayBuffer)
    );

    const localImagePath = `/images/news/${fileName}`;

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

function uniqueParagraphs(items) {
  const seen = new Set();

  return items.filter((text) => {
    const normalized = cleanText(text);

    if (
      normalized.length < 60 ||
      normalized.length > 5000 ||
      seen.has(normalized)
    ) {
      return false;
    }

    seen.add(normalized);
    return true;
  });
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
      "Accept-Language": "vi-VN,vi;q=0.9,en;q=0.8",
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

// Ưu tiên nội dung bài đăng đầu tiên trên forum XenForo / AutoDaily
const forumPost = $(".message").first();

if (forumPost.length) {
  const forumContent = forumPost
    .find(".message-body .bbWrapper, .message-body, .bbWrapper")
    .first();

  if (forumContent.length) {
    const forumParagraphs = [];

    // Trường hợp nội dung được chia bằng thẻ <p>
    forumContent.find("p").each((_, element) => {
      const text = cleanText($(element).text());

      if (text.length >= 40) {
        forumParagraphs.push(text);
      }
    });

    // XenForo thường dùng <br> thay vì <p>,
    // nên nếu lấy được quá ít đoạn thì tách theo xuống dòng.
    if (forumParagraphs.length < 3) {
      const htmlContent = forumContent.html() || "";

      const normalizedHtml = htmlContent
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n")
        .replace(/<\/div>/gi, "\n")
        .replace(/<\/blockquote>/gi, "\n");

      const temp = cheerio.load(
        `<div id="article-temp">${normalizedHtml}</div>`
      );

      const textContent = temp("#article-temp").text();

      const lines = textContent
        .split(/\n+/)
        .map((line) => cleanText(line))
        .filter((line) => line.length >= 40);

      forumParagraphs.push(...lines);
    }

    paragraphs = uniqueParagraphs(forumParagraphs);
  }
}

// Nếu không phải forum hoặc forum không lấy được nội dung,
// dùng bộ nhận diện bài báo thông thường.
if (paragraphs.length < 2) {
  const selectors = [
    "article",
    ".article-content",
    ".article-body",
    ".entry-content",
    ".post-content",
    ".post-body",
    ".content-detail",
    ".detail-content",
    ".news-content",
    "main",
  ];

  for (const selector of selectors) {
    const container = $(selector).first();

    if (!container.length) continue;

    const found = container
      .find("p")
      .map((_, element) => cleanText($(element).text()))
      .get();

    const usable = uniqueParagraphs(found);

    if (usable.length > paragraphs.length) {
      paragraphs = usable;
    }
  }
}

// Phương án cuối cùng
if (paragraphs.length < 2) {
  paragraphs = uniqueParagraphs(
    $("p")
      .map((_, element) => cleanText($(element).text()))
      .get()
  );
}

  return {
    title,
    description,
    image,
    siteName,
    paragraphs,
  };
}

async function main() {
  if (!fs.existsSync(newsPath)) {
    throw new Error(`Không tìm thấy file: ${newsPath}`);
  }

  const newsFile = fs.readFileSync(newsPath, "utf8");

  console.log("");
  console.log("========================================");
  console.log("   NHẬP BÀI VIẾT TỪ URL");
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

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    console.log("Chỉ hỗ trợ URL http hoặc https.");
    return;
  }

  const article = await fetchArticle(sourceUrl);

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
    `Ảnh đại diện: ${article.image || "Không tìm thấy"}`
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
    console.log("Tiêu đề không được để trống.");
    return;
  }

  const slug = createSlug(title);

  if (!slug) {
    console.log("Không thể tạo slug.");
    return;
  }

  if (
    newsFile.includes(`slug: "${slug}"`) ||
    newsFile.includes(`"slug": "${slug}"`)
  ) {
    console.log("");
    console.log("Bài có slug này đã tồn tại:");
    console.log(slug);
    return;
  }

  console.log("");
  console.log("Chọn chuyên mục:");

  categories.forEach((category, index) => {
    console.log(`${index + 1}. ${category}`);
  });

  console.log("");

  const categoryChoice = Number(
    await rl.question("Nhập số chuyên mục (1-5): ")
  );

  if (
    !Number.isInteger(categoryChoice) ||
    categoryChoice < 1 ||
    categoryChoice > categories.length
  ) {
    console.log("Chuyên mục không hợp lệ.");
    return;
  }

  const category = categories[categoryChoice - 1];

  let excerpt = article.description;

  if (!excerpt) {
    excerpt =
      article.paragraphs[0]?.slice(0, 250) || "";
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
      await rl.question("Nhập mô tả ngắn: ")
    );
  }

  const imageInput = (
    await rl.question(
      `Ảnh đại diện (Enter = ảnh tìm được): `
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

  const featured = featuredAnswer === "y";

  /*
   * Hiện tại importer gom các đoạn đã nhận diện
   * thành một section để tương thích NewsArticle
   * hiện có của website.
   */
  const heading = title;

  const paragraphsCode = article.paragraphs
    .map(
      (paragraph) =>
        `          "${escapeText(paragraph)}",`
    )
    .join("\n");

  const id = `news-${Date.now()}`;

  let articleCode = `  {
    id: "${id}",

    title: "${escapeText(title)}",

    slug: "${slug}",

    category: "${category}",

    excerpt:
      "${escapeText(excerpt)}",

    publishedAt: "${today()}",

    image: "${escapeText(image)}",

    featured: ${featured},

    content: [
      {
        heading: "${escapeText(heading)}",
        paragraphs: [
${paragraphsCode}
        ],
      },
    ],

    source: {
      name: "${escapeText(sourceName)}",
      url: "${escapeText(sourceUrl)}",
    },
  },
`;

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
  console.log(`Ảnh: ${image}`);
  console.log(
    `Bài nổi bật: ${featured ? "Có" : "Không"}`
  );

  console.log("");
  console.log("--- Nội dung mẫu ---");

  article.paragraphs
    .slice(0, 3)
    .forEach((paragraph, index) => {
      console.log("");
      console.log(`${index + 1}. ${paragraph}`);
    });

  if (article.paragraphs.length > 3) {
    console.log("");
    console.log(
      `... còn ${article.paragraphs.length - 3} đoạn.`
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
    return;
  }
  // Chỉ tải ảnh sau khi người dùng xác nhận đăng bài
if (/^https?:\/\//i.test(image)) {
  image = await downloadArticleImage(image, slug);

  // Cập nhật lại đường dẫn ảnh trong articleCode
  articleCode = articleCode.replace(
    /image:\s*"[^"]*",/,
    `image: "${escapeText(image)}",`
  );
}

  const marker =
    "export const newsArticles: NewsArticle[] = [";

  const markerIndex = newsFile.indexOf(marker);

  if (markerIndex === -1) {
    console.log("");
    console.log(
      "Không tìm thấy newsArticles trong news.ts. Đã dừng."
    );
    return;
  }

  const insertPosition = markerIndex + marker.length;

  const updatedFile =
    newsFile.slice(0, insertPosition) +
    "\n" +
    articleCode +
    newsFile.slice(insertPosition);

  fs.writeFileSync(newsPath, updatedFile, "utf8");

  console.log("");
  console.log("========================================");
  console.log("ĐÃ THÊM BÀI VIẾT");
  console.log("========================================");
  console.log(`Tiêu đề: ${title}`);
  console.log(`Trang: /tin-tuc/${slug}`);
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
    error instanceof Error ? error.message : error
  );
  process.exitCode = 1;
} finally {
  rl.close();
}