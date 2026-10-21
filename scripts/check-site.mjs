// Kiểm tra sức khỏe toàn website trước khi push (21/10/2026).
// Cách dùng: npm run build → npx next start -p 3100 → npm run check-site
//   (hoặc kiểm tra web thật: npm run check-site -- https://www.mitsubishiauto.vn)
// Mỗi URL trong sitemap (+ landing /uu-dai/*) được mở ở 2 khổ: điện thoại 390px và máy tính 1366px:
// - mã HTTP, lỗi JavaScript, request hỏng cùng tên miền, ảnh lỗi, tràn ngang, số h1 và <main>
// - axe-core (lỗi trợ năng, gồm độ tương phản chữ) ở khổ điện thoại
// Sau đó kiểm tra mọi link nội bộ gom được. Có lỗi thì in ra và thoát mã 1 (không push).
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const BASE = (process.argv[2] || "http://localhost:3100").replace(/\/$/, "");
const SITE = "https://www.mitsubishiauto.vn";
const browsers = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
];
const browser = browsers.find((file) => fs.existsSync(file));
if (!browser) {
  console.error("Không tìm thấy Edge hoặc Chrome.");
  process.exit(2);
}
const axePath = path.resolve("node_modules/axe-core/axe.min.js");
const axe = fs.existsSync(axePath) ? fs.readFileSync(axePath, "utf8") : null;
// Script thống kê Vercel chỉ có trên Vercel; chạy ở máy sẽ 404, không phải lỗi
const ignoredRequest = (url) => url.includes("/_vercel/");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const port = 9300 + Math.floor(Math.random() * 600);
const profile = path.join(process.env.TEMP || ".", `check-site-${Date.now()}`);
const proc = spawn(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });

let sitemap;
try {
  sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
} catch {
  console.error(`Không mở được ${BASE}. Đã chạy "npx next start -p 3100" chưa?`);
  proc.kill();
  process.exit(2);
}
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replace(SITE, BASE));
for (const extra of ["/uu-dai/destinator", "/uu-dai/xforce", "/uu-dai/xpander", "/uu-dai/triton"]) urls.push(BASE + extra);

let tabs;
for (let i = 0; i < 160 && !tabs?.length; i++) {
  try {
    tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  } catch {
    await sleep(250);
  }
}
const ws = new WebSocket(tabs.find((tab) => tab.type === "page").webSocketDebuggerUrl);
let seq = 0;
const pending = {};
let errors = [];
let badRequests = [];
let docStatus = 0;
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending[msg.id]) {
    pending[msg.id](msg.result);
    delete pending[msg.id];
  }
  if (msg.method === "Runtime.exceptionThrown") errors.push(`Lỗi JS: ${(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text || "").slice(0, 160)}`);
  if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") errors.push(`console.error: ${msg.params.args.map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 160)}`);
  if (msg.method === "Network.responseReceived") {
    const { response, type } = msg.params;
    if (type === "Document" && response.url.startsWith(BASE)) docStatus = response.status;
    if (response.status >= 400 && response.url.startsWith(BASE) && !ignoredRequest(response.url)) badRequests.push(`${response.status} ${response.url.replace(BASE, "")}`);
  }
};
await new Promise((resolve) => (ws.onopen = resolve));
// Mỗi lệnh gửi trình duyệt chờ tối đa 30 giây (21/10/2026: từng bị treo 28 phút khi trình duyệt không trả lời)
const TIMEOUT = 30000;
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++seq;
  const timer = setTimeout(() => {
    delete pending[id];
    reject(new Error(`Trình duyệt không phản hồi ${method} sau ${TIMEOUT / 1000} giây`));
  }, TIMEOUT);
  pending[id] = (result) => {
    clearTimeout(timer);
    resolve(result);
  };
  ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => ((await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result || {}).value;
await send("Runtime.enable");
await send("Network.enable");
await send("Page.enable");

const problems = [];
const links = new Set();
for (const [width, height, mobile] of [[390, 844, true], [1366, 900, false]]) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
  for (const url of urls) {
    errors = [];
    badRequests = [];
    docStatus = 0;
    try {
    await send("Page.navigate", { url });
    await sleep(2000);
    // Cuộn hết trang để ảnh tải chậm (lazy) cũng được tải
    await evaluate("new Promise(async (r) => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((s) => setTimeout(s, 50)); } scrollTo(0, 0); setTimeout(r, 300); })");
    const info = await evaluate(`(() => {
      const brokenImages = [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src.slice(-60));
      const hrefs = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).filter((h) => h.startsWith("/") && !h.startsWith("//"));
      return { overflow: document.documentElement.scrollWidth - innerWidth, brokenImages, hrefs, h1: document.querySelectorAll("h1").length, main: document.querySelectorAll("main").length };
    })()`);
    info.hrefs.forEach((href) => links.add(href.split("#")[0].split("?")[0] || "/"));
    const page = `${url.replace(BASE, "") || "/"} @${width}`;
    const list = [];
    if (docStatus !== 200) list.push(`mã HTTP ${docStatus}`);
    if (info.overflow > 0) list.push(`tràn ngang ${info.overflow}px`);
    if (info.h1 !== 1) list.push(`${info.h1} thẻ h1`);
    if (info.main !== 1) list.push(`${info.main} thẻ main`);
    list.push(...info.brokenImages.map((src) => `ảnh lỗi ${src}`), ...new Set(badRequests), ...new Set(errors));
    if (axe && mobile) {
      await evaluate(`${axe};1`);
      const violations = await evaluate("axe.run().then((r) => r.violations.map((v) => v.id + ' (' + v.nodes.length + ')'))");
      if (violations?.length) list.push(`axe: ${violations.join(", ")}`);
    }
    if (list.length) {
      problems.push(`${page}: ${list.join(" | ")}`);
      console.log(`✗ ${page}: ${list.join(" | ")}`);
    }
    } catch (error) {
      // Trang bị treo: ghi thành lỗi rồi đi tiếp, không đứng chờ mãi
      const page = `${url.replace(BASE, "") || "/"} @${width}`;
      problems.push(`${page}: ${error.message}`);
      console.log(`✗ ${page}: ${error.message}`);
    }
  }
}

// Link nội bộ
for (const href of links) {
  const res = await fetch(BASE + href, { redirect: "manual" }).catch(() => ({ status: 0 }));
  if (![200, 307, 308].includes(res.status)) problems.push(`Link hỏng ${res.status} ${href}`);
}
// Trang không tồn tại phải trả 404
const missing = await fetch(`${BASE}/trang-khong-ton-tai-${Date.now()}`).catch(() => ({ status: 0 }));
if (missing.status !== 404) problems.push(`Trang không tồn tại trả mã ${missing.status} (đúng phải là 404)`);

ws.close();
proc.kill();
console.log(`\nĐã kiểm tra ${urls.length} trang × 2 khổ màn hình, ${links.size} link nội bộ${axe ? ", có axe-core" : " (không có axe-core)"}.`);
if (problems.length) {
  console.log(`CÓ ${problems.length} LỖI:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log("Không có lỗi. Có thể push.");
process.exit(0);
