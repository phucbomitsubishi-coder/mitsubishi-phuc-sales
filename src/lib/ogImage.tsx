import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/config/site";

// Khung ảnh chia sẻ (Open Graph) dùng chung cho các trang có file opengraph-image.tsx.
// Ảnh được tạo sẵn khi build; trang bảng giá tự đổi tháng theo promotions.ts.
// Font Roboto nằm trong src/assets/fonts (bản đầy đủ, có dấu tiếng Việt).

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgImageInput = {
  kicker: string;
  title: string;
  subtitle?: string;
  // Đường dẫn ảnh trong public/, ví dụ car.image. Ảnh đầu hiện lớn, các ảnh sau hiện nhỏ bên dưới.
  images?: string[];
  // Tên xe đối thủ trong bài so sánh, hiện dưới ảnh xe dạng "VS ..."
  versus?: string;
  // Ảnh chân dung khổ dọc (trang Giới thiệu)
  portrait?: boolean;
};

const fontFile = (name: string) => readFile(join(process.cwd(), "src/assets/fonts", name));

async function toDataUrl(publicPath: string) {
  const data = await readFile(join(process.cwd(), "public", publicPath));
  const type = publicPath.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${data.toString("base64")}`;
}

export async function renderOgImage({ kicker, title, subtitle, images = [], versus, portrait }: OgImageInput) {
  const [medium, black, ...pictures] = await Promise.all([
    fontFile("Roboto-Medium.ttf"),
    fontFile("Roboto-Black.ttf"),
    ...images.map(toDataUrl),
  ]);
  const [mainPicture, ...smallPictures] = pictures;
  const isPhoto = !portrait && images[0] !== undefined && !images[0].endsWith(".png");
  const pictureSize = portrait
    ? { width: 300, height: 450 }
    : isPhoto
      ? { width: 480, height: 360 }
      : { width: 540, height: 330 };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "Roboto",
        }}
      >
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ width: 14, background: "#dc2626" }} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: 620,
              padding: "0 24px 0 56px",
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 500, color: "#f87171", letterSpacing: 2 }}>
              {kicker.toUpperCase()}
            </div>
            <div
              style={{
                fontSize: title.length > 48 ? 50 : 58,
                fontWeight: 900,
                lineHeight: 1.12,
                marginTop: 16,
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: 28, fontWeight: 500, color: "#d1d5db", marginTop: 20, lineHeight: 1.3 }}>
                {subtitle}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              paddingRight: 24,
            }}
          >
            {mainPicture && (
              // eslint-disable-next-line @next/next/no-img-element -- ImageResponse chỉ nhận thẻ img
              <img
                src={mainPicture}
                alt=""
                width={pictureSize.width}
                height={pictureSize.height}
                style={{
                  objectFit: isPhoto ? "cover" : "contain",
                  borderRadius: isPhoto || portrait ? 20 : 0,
                }}
              />
            )}
            {versus && (
              <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                <div
                  style={{
                    background: "#dc2626",
                    borderRadius: 999,
                    padding: "6px 18px",
                    fontSize: 28,
                    fontWeight: 900,
                  }}
                >
                  VS
                </div>
                <div style={{ fontSize: 36, fontWeight: 900, marginLeft: 16 }}>{versus}</div>
              </div>
            )}
            {smallPictures.length > 0 && (
              <div style={{ display: "flex", marginTop: 4 }}>
                {smallPictures.map((picture, index) => (
                  // eslint-disable-next-line @next/next/no-img-element -- ImageResponse chỉ nhận thẻ img
                  <img key={index} src={picture} alt="" width={180} height={110} style={{ objectFit: "contain" }} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 92,
            padding: "0 48px 0 70px",
            background: "#dc2626",
            fontSize: 28,
            fontWeight: 500,
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ fontWeight: 900 }}>{siteConfig.sales.name}</span>
            <span style={{ marginLeft: 12 }}>· Tư vấn bán hàng Mitsubishi</span>
          </div>
          <div style={{ display: "flex", fontWeight: 900 }}>
            {siteConfig.sales.phoneDisplay} · mitsubishiauto.vn
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Roboto", data: medium, style: "normal", weight: 500 },
        { name: "Roboto", data: black, style: "normal", weight: 900 },
      ],
    }
  );
}
