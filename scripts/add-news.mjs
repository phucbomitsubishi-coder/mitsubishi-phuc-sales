import fs from "fs";
import path from "path";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({
  input,
  output,
});

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
  "Thị trường ô tô",
];

function createSlug(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeText(text) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, " ");
}

function today() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

async function main() {
  if (!fs.existsSync(newsPath)) {
    console.log("");
    console.log("Không tìm thấy src/data/news.ts");
    process.exit(1);
  }

  const newsFile = fs.readFileSync(newsPath, "utf8");

  console.log("");
  console.log("========================================");
  console.log("       THÊM BÀI TIN TỨC MỚI");
  console.log("========================================");
  console.log("");

  const title = (
    await rl.question("Tiêu đề bài viết: ")
  ).trim();

  if (!title) {
    console.log("Tiêu đề không được để trống.");
    return;
  }

  const slug = createSlug(title);

  if (!slug) {
    console.log("Không thể tạo slug từ tiêu đề.");
    return;
  }

  if (
    newsFile.includes(`slug: "${slug}"`) ||
    newsFile.includes(`"slug": "${slug}"`)
  ) {
    console.log("");
    console.log("Bài viết có slug này đã tồn tại:");
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

  const excerpt = (
    await rl.question("Mô tả ngắn: ")
  ).trim();

  if (!excerpt) {
    console.log("Mô tả ngắn không được để trống.");
    return;
  }

  const dateInput = (
    await rl.question(
      `Ngày đăng YYYY-MM-DD (Enter = ${today()}): `
    )
  ).trim();

  const publishedAt = dateInput || today();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    console.log("Ngày đăng phải có dạng YYYY-MM-DD.");
    return;
  }

  const imageInput = (
    await rl.question(
      "Đường dẫn ảnh (Enter = /images/hero/hero-main.jpg): "
    )
  ).trim();

  const image =
    imageInput || "/images/hero/hero-main.jpg";

  console.log("");
  console.log("Bây giờ nhập nội dung bài viết.");
  console.log(
    "Mỗi phần gồm một tiêu đề và một đoạn nội dung."
  );
  console.log("");

  const sections = [];

  while (true) {
    const heading = (
      await rl.question(
        `Tiêu đề phần ${sections.length + 1}: `
      )
    ).trim();

    if (!heading) {
      if (sections.length === 0) {
        console.log(
          "Bài viết cần ít nhất một phần nội dung."
        );
        continue;
      }

      break;
    }

    const paragraph = (
      await rl.question("Nội dung phần này: ")
    ).trim();

    if (!paragraph) {
      console.log(
        "Nội dung không được để trống. Vui lòng nhập lại phần này."
      );
      continue;
    }

    sections.push({
      heading,
      paragraph,
    });

    console.log("");
    console.log(
      "Nhấn Enter ở tiêu đề phần tiếp theo để kết thúc."
    );
    console.log("");
  }

  const sourceName = (
    await rl.question(
      "Tên nguồn tham khảo (Enter nếu không có): "
    )
  ).trim();

  let sourceUrl = "";

  if (sourceName) {
    sourceUrl = (
      await rl.question("URL nguồn tham khảo: ")
    ).trim();

    if (!sourceUrl) {
      console.log(
        "Đã có tên nguồn nhưng chưa có URL. Đã dừng để tránh tạo nguồn thiếu."
      );
      return;
    }
  }

  const featuredAnswer = (
    await rl.question(
      "Đặt làm bài nổi bật? (y/n, mặc định n): "
    )
  )
    .trim()
    .toLowerCase();

  const featured = featuredAnswer === "y";

  const id = `news-${Date.now()}`;

  const sectionsCode = sections
    .map(
      (section) => `      {
        heading: "${escapeText(section.heading)}",
        paragraphs: [
          "${escapeText(section.paragraph)}",
        ],
      }`
    )
    .join(",\n");

  const sourceCode = sourceName
    ? `
    source: {
      name: "${escapeText(sourceName)}",
      url: "${escapeText(sourceUrl)}",
    },`
    : "";

  const articleCode = `  {
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
${sectionsCode}
    ],${sourceCode}
  },
`;

  console.log("");
  console.log("========================================");
  console.log("KIỂM TRA BÀI VIẾT");
  console.log("========================================");
  console.log(`Tiêu đề: ${title}`);
  console.log(`Slug: ${slug}`);
  console.log(`Chuyên mục: ${category}`);
  console.log(`Ngày đăng: ${publishedAt}`);
  console.log(`Số phần nội dung: ${sections.length}`);
  console.log(
    `Nguồn: ${sourceName || "Không có"}`
  );
  console.log(
    `Bài nổi bật: ${featured ? "Có" : "Không"}`
  );
  console.log("");

  const confirm = (
    await rl.question(
      "Thêm bài viết này vào website? (y/n): "
    )
  )
    .trim()
    .toLowerCase();

  if (confirm !== "y") {
    console.log("");
    console.log(
      "Đã hủy. Không có dữ liệu nào bị thay đổi."
    );
    return;
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

  fs.writeFileSync(
    newsPath,
    updatedFile,
    "utf8"
  );

  console.log("");
  console.log("========================================");
  console.log("ĐÃ THÊM BÀI VIẾT");
  console.log("========================================");
  console.log(`Tiêu đề: ${title}`);
  console.log(`Slug: ${slug}`);
  console.log("");
  console.log(
    `Trang bài viết: /tin-tuc/${slug}`
  );
  console.log("");
  console.log(
    "Hãy chạy npm run dev hoặc npm run build để kiểm tra."
  );
}

try {
  await main();
} catch (error) {
  if (
    error?.code === "ABORT_ERR" ||
    error?.code === "ERR_USE_AFTER_CLOSE"
  ) {
    console.log("");
    console.log("Đã thoát công cụ. Không có dữ liệu nào bị thay đổi.");
    process.exit(0);
  }

  console.error("");
  console.error("Có lỗi xảy ra:");
  console.error(error);
  process.exitCode = 1;
} finally {
  rl.close();
}