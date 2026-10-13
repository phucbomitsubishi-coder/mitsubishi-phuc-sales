// Báo Bing (và các công cụ tìm kiếm dùng IndexNow: Yandex, Naver, Seznam...) toàn bộ URL trong sitemap.
// Chạy SAU KHI đã push và Vercel deploy xong: npm run indexnow
// File khóa: public/95c0ab24549746f582100da40385e0bb.txt (phải truy cập được tại https://www.mitsubishiauto.vn/95c0ab24549746f582100da40385e0bb.txt)
const host = "www.mitsubishiauto.vn";
const key = "95c0ab24549746f582100da40385e0bb";

const sitemap = await (await fetch(`https://${host}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(`Đã gửi ${urlList.length} URL tới IndexNow: HTTP ${res.status}`, res.status === 200 || res.status === 202 ? "(thành công)" : await res.text());
