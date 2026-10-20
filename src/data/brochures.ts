// Brochure (leaflet PDF) chính thức trên web Mitsubishi Motors Việt Nam (trang /tai-brochure, kiểm tra 19/10/2026).
// Chỉ link ra file của MMV, không tải file về repo. MMV đổi file thì cập nhật link ở đây.
const base = "https://www.mitsubishi-motors.com.vn/w/wp-content/uploads";

export const brochures: Record<string, { url: string; size: string }> = {
  xforce: { url: `${base}/2026/05/MMV_XFORCE_Leaflet_FA_260604.pdf`, size: "6,7 MB" },
  destinator: { url: `${base}/2025/11/Destinator_Leaflet-for-website.pdf`, size: "3,6 MB" },
  // Xpander và Xpander Cross dùng chung 1 brochure
  xpander: { url: `${base}/2025/09/260410_MMV-RNRNX25_Leaflet_V5_Single_FA_Website.pdf`, size: "7,2 MB" },
  "xpander-cross": { url: `${base}/2025/09/260410_MMV-RNRNX25_Leaflet_V5_Single_FA_Website.pdf`, size: "7,2 MB" },
  triton: { url: `${base}/2022/06/Mitsubishi-Triton-Online-Brochure.pdf`, size: "5,7 MB" },
  attrage: { url: `${base}/2022/06/Attrage-Leaflet-Updated-on-20112023.pdf`, size: "3,3 MB" },
};
