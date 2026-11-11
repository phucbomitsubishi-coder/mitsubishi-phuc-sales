// Video POV (góc nhìn người lái) từ cảnh quay thật, 11/11/2026. Chỉ cần ffmpeg (có libass), không cần trình duyệt.
// npm run pov -- <tên>   → đọc ../anh-facebook/pov/<tên>/ (các đoạn quay + kich-ban.txt), xuất video.mp4 + caption.txt cùng thư mục.
// Chưa có thư mục thì tool tạo sẵn kich-ban.txt mẫu và hướng dẫn.
// Dọc 9:16: đoạn quay dọc được cắt vừa khung; đoạn quay ngang đặt giữa trên nền chính nó làm mờ.
// An toàn: chỉ dùng cảnh quay bằng camera gắn cố định, bật trước khi chạy; không quay sếp/khách; làm mờ logo, biển số bằng "mo".
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const W = 1080;
const H = 1920;
const FPS = 30;
const END = 2.8; // cảnh cuối mời theo dõi (giây)

function findFfmpeg() {
  const candidates = [process.env.FFMPEG, "ffmpeg", "C:/ffmpeg/bin/ffmpeg.exe"].filter(Boolean);
  if (process.platform === "win32") {
    const wingetDir = path.join(process.env.LOCALAPPDATA ?? "", "Microsoft/WinGet/Packages");
    if (fs.existsSync(wingetDir)) {
      for (const pkg of fs.readdirSync(wingetDir).filter((name) => /ffmpeg/i.test(name))) {
        for (const sub of fs.readdirSync(path.join(wingetDir, pkg))) candidates.push(path.join(wingetDir, pkg, sub, "bin/ffmpeg.exe"));
      }
    }
  }
  return candidates.find((file) => spawnSync(file, ["-version"], { stdio: "ignore" }).status === 0);
}
const ffmpeg = findFfmpeg();
if (!ffmpeg) {
  console.error("Không tìm thấy ffmpeg. Cài bằng lệnh: winget install Gyan.FFmpeg  (rồi mở lại cửa sổ dòng lệnh)");
  process.exit(1);
}
const ffprobe = ffmpeg.replace(/ffmpeg(\.exe)?$/i, (match, ext) => `ffprobe${ext ?? ""}`);
const probe = (file, entries, stream = "") =>
  spawnSync(ffprobe, ["-v", "error", ...(stream ? ["-select_streams", stream] : []), "-show_entries", entries, "-of", "csv=p=0", file], { encoding: "utf8" }).stdout.trim();
function run(args, cwd) {
  const result = spawnSync(ffmpeg, ["-y", "-v", "error", ...args], { cwd, encoding: "utf8" });
  if (result.status !== 0) {
    console.error(result.stderr);
    process.exit(1);
  }
}

const name = process.argv[2];
if (!name) {
  console.error("Cách dùng: npm run pov -- <tên thư mục trong ../anh-facebook/pov/>");
  process.exit(1);
}
const dir = path.resolve(root, "..", "anh-facebook", "pov", name);
const scriptFile = path.join(dir, "kich-ban.txt");
if (!fs.existsSync(scriptFile)) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    scriptFile,
    `# KỊCH BẢN VIDEO POV. Dòng bắt đầu bằng # là ghi chú, tool bỏ qua.
# Bỏ các đoạn quay (mp4, mov) vào cùng thư mục này rồi sửa các dòng dưới.

# Câu hook hiện to ở đầu video (2–3 giây đầu quyết định người xem có ở lại không)
POV: bạn là tài xế công ty, 5h30 sáng

# Tên kênh (in ở cảnh cuối mời theo dõi). Bỏ trống thì chỉ ghi "Theo dõi để xem tiếp"
kenh:

# Âm thanh gốc của cảnh quay: giu (giữ, nhỏ lại khi có nhạc) hoặc tat. Nhạc nền: đặt file nhac-nen.mp3 vào thư mục này
am-thanh: giu

# Mỗi dòng 1 đoạn:  tên file | giây bắt đầu-giây kết thúc (bỏ trống = cả đoạn) | chữ hiện trên đoạn đó | mo x,y,rộng,cao
# "mo" (không bắt buộc) làm mờ 1 vùng tính theo % khung hình gốc, đo từ góc trên trái, vd logo hoặc biển số.
# Nhiều vùng cách nhau bằng dấu ;   vd: mo 40,80,20,8; 5,5,15,10
01.mp4 | 0-4 | Xe còn ướt sương
02.mp4 | 2-7 | Đổ xăng, kiểm tra lốp
03.mp4 |  | Đường còn vắng, chạy thong thả | mo 40,82,20,8
`,
  );
  console.log(`Đã tạo ${scriptFile}\nBỏ các đoạn quay vào thư mục đó, sửa kich-ban.txt rồi chạy lại: npm run pov -- ${name}`);
  process.exit(0);
}

// ---------- Đọc kịch bản ----------
const lines = fs
  .readFileSync(scriptFile, "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"));
const setting = (key) => lines.find((line) => line.toLowerCase().startsWith(`${key}:`))?.slice(key.length + 1).trim() ?? "";
const hook = lines.find((line) => !line.includes("|") && !/^(kenh|am-thanh):/i.test(line)) ?? "";
const channel = setting("kenh");
const keepAudio = setting("am-thanh").toLowerCase() !== "tat";
const shots = lines
  .filter((line) => line.includes("|"))
  .map((line, index) => {
    const [file, range = "", caption = "", blur = ""] = line.split("|").map((part) => part.trim());
    const [from, to] = range.split("-").map((value) => (value === undefined || value === "" ? undefined : Number(value.replace(",", "."))));
    const regions = blur
      .replace(/^mo\s*/i, "")
      .split(";")
      .map((item) => item.split(",").map((value) => Number(value.trim())))
      .filter((item) => item.length === 4 && item.every(Number.isFinite));
    const source = path.join(dir, file);
    if (!fs.existsSync(source)) {
      console.error(`Dòng ${index + 1}: không thấy file "${file}" trong ${dir}`);
      process.exit(1);
    }
    return { source, from, to, caption, regions };
  });
if (!shots.length) {
  console.error("kich-ban.txt chưa có dòng đoạn quay nào (dạng: 01.mp4 | 0-4 | chữ hiện trên hình)");
  process.exit(1);
}

// ---------- 1. Chuẩn hóa từng đoạn về 1080×1920, 30 hình/giây ----------
const work = fs.mkdtempSync(path.join(os.tmpdir(), "pov-"));
const clips = [];
for (const [i, shot] of shots.entries()) {
  const [sw, sh] = probe(shot.source, "stream=width,height", "v:0").split(",").map(Number);
  const hasAudio = probe(shot.source, "stream=codec_type", "a") !== "";
  const trim = [...(shot.from !== undefined ? ["-ss", String(shot.from)] : []), ...(shot.to !== undefined ? ["-to", String(shot.to)] : [])];
  // Làm mờ vùng (tính trên khung gốc, trước khi đổi cỡ)
  let chain = "[0:v]setsar=1";
  const blurParts = [];
  shot.regions.forEach(([x, y, w, h], r) => {
    const box = `${Math.round((sw * w) / 100 / 2) * 2}:${Math.round((sh * h) / 100 / 2) * 2}:${Math.round((sw * x) / 100)}:${Math.round((sh * y) / 100)}`;
    blurParts.push(`[b${r}in]crop=${box},boxblur=luma_radius='min(w,h)/4':luma_power=3:chroma_radius='min(cw,ch)/4':chroma_power=3[b${r}]`);
  });
  let graph;
  if (shot.regions.length) {
    const splits = shot.regions.map((_, r) => `[b${r}in]`).join("");
    graph = `${chain},split=${shot.regions.length + 1}[base]${splits};${blurParts.join(";")}`;
    let current = "[base]";
    shot.regions.forEach(([x, y], r) => {
      graph += `;${current}[b${r}]overlay=${Math.round((sw * x) / 100)}:${Math.round((sh * y) / 100)}[o${r}]`;
      current = `[o${r}]`;
    });
    graph += `;${current}null[src]`;
  } else {
    graph = `${chain}[src]`;
  }
  if (sw / sh >= 0.75) {
    // Quay ngang: hình giữa + nền chính nó phóng to làm mờ
    graph += `;[src]split[f][g];[g]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},boxblur=30:2,eq=brightness=-0.12[bg];[f]scale=${W}:-2[fg];[bg][fg]overlay=0:(H-h)/2`;
  } else {
    graph += `;[src]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}`;
  }
  graph += `,fps=${FPS},format=yuv420p[v]`;
  const out = path.join(work, `clip${i}.mp4`);
  const audioIn = hasAudio && keepAudio ? [] : ["-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo"];
  run([
    ...trim, "-i", shot.source, ...audioIn,
    "-filter_complex", graph, "-map", "[v]", "-map", hasAudio && keepAudio ? "0:a:0" : "1:a:0",
    "-shortest", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-c:a", "aac", "-ar", "44100", "-ac", "2", out,
  ]);
  shot.duration = Number(probe(out, "format=duration"));
  clips.push(out);
  console.log(`  Đoạn ${i + 1}/${shots.length}: ${path.basename(shot.source)} (${shot.duration.toFixed(1)} giây)`);
}

// ---------- 2. Ghép các đoạn ----------
fs.writeFileSync(path.join(work, "list.txt"), clips.map((clip) => `file '${path.basename(clip)}'`).join("\n"));
run(["-f", "concat", "-safe", "0", "-i", "list.txt", "-c", "copy", "joined.mp4"], work);
const total = shots.reduce((sum, shot) => sum + shot.duration, 0);

// ---------- 3. Chữ (phụ đề ASS: hook, chữ từng đoạn, cảnh cuối) ----------
const assTime = (t) => {
  const cs = Math.round(t * 100);
  return `${Math.floor(cs / 360000)}:${String(Math.floor(cs / 6000) % 60).padStart(2, "0")}:${String(Math.floor(cs / 100) % 60).padStart(2, "0")}.${String(cs % 100).padStart(2, "0")}`;
};
const assText = (text) => text.replace(/[{}]/g, "").replace(/\n/g, "\\N");
const events = [];
// Hook: to, giữa trên, bật lên (chữ "POV:" tô vàng)
if (hook) {
  const styled = assText(hook).replace(/^POV:/i, "{\\c&H2FD8FF&}POV:{\\c&HFFFFFF&}");
  events.push(`Dialogue: 1,${assTime(0)},${assTime(Math.min(3, total))},Hook,,0,0,0,,{\\fad(120,250)\\fscx70\\fscy70\\t(0,220,\\fscx100\\fscy100)}${styled}`);
}
// Chữ từng đoạn: khung đen mờ, ở khoảng 62% chiều cao (tránh nút và chữ của TikTok/Reels ở đáy)
let t = 0;
for (const shot of shots) {
  const start = t + (hook && t === 0 ? Math.min(2.6, shot.duration * 0.5) : 0.15);
  if (shot.caption && start < t + shot.duration - 0.3) {
    events.push(`Dialogue: 0,${assTime(start)},${assTime(t + shot.duration - 0.1)},Caption,,0,0,0,,{\\fad(150,120)}${assText(shot.caption)}`);
  }
  t += shot.duration;
}
// Cảnh cuối: hình dừng, làm mờ, mời theo dõi
events.push(`Dialogue: 2,${assTime(total + 0.1)},${assTime(total + END)},Follow,,0,0,0,,{\\fad(200,0)\\fscx75\\fscy75\\t(0,250,\\fscx100\\fscy100)}+ THEO DÕI`);
events.push(`Dialogue: 2,${assTime(total + 0.4)},${assTime(total + END)},Small,,0,0,0,,{\\fad(200,0)}${assText(channel ? `${channel}\\Nxem tiếp hành trình mỗi ngày` : "để xem tiếp hành trình mỗi ngày")}`);
fs.writeFileSync(
  path.join(work, "pov.ass"),
  `[Script Info]
ScriptType: v4.00+
PlayResX: ${W}
PlayResY: ${H}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Hook,Roboto Black,92,&H00FFFFFF,&H00FFFFFF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,7,3,8,80,80,330,1
Style: Caption,Roboto Black,68,&H00FFFFFF,&H00FFFFFF,&H50000000,&H50000000,0,0,0,0,100,100,0,0,3,18,0,2,90,90,640,1
Style: Follow,Roboto Black,104,&H00FFFFFF,&H00FFFFFF,&H000000E1,&H000000E1,0,0,0,0,100,100,2,0,3,30,0,5,80,80,0,1
Style: Small,Roboto Black,54,&H00FFFFFF,&H00FFFFFF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,4,2,2,80,80,700,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
${events.join("\n")}
`,
);
// Phông Roboto chép vào thư mục tạm: đường dẫn tương đối tránh lỗi dấu ":" của ổ đĩa Windows trong bộ lọc ass
fs.mkdirSync(path.join(work, "fonts"), { recursive: true });
for (const font of ["Roboto-Black.ttf", "Roboto-Medium.ttf"]) fs.copyFileSync(path.join(root, "src/assets/fonts", font), path.join(work, "fonts", font));

// ---------- 4. Cảnh cuối + chữ + nhạc nền ----------
const music = ["mp3", "m4a", "wav"].map((ext) => path.join(dir, `nhac-nen.${ext}`)).find((file) => fs.existsSync(file));
const videoGraph = `[0:v]tpad=stop_mode=clone:stop_duration=${END},boxblur=enable='gte(t,${total.toFixed(2)})':luma_radius=25:luma_power=2,eq=enable='gte(t,${total.toFixed(2)})':brightness=-0.15,ass=pov.ass:fontsdir=fonts[v]`;
// Tiếng gốc nhỏ lại khi có nhạc; nhạc nhỏ dần ở cảnh cuối
const audioGraph = music
  ? `[0:a]volume=${keepAudio ? 0.45 : 0},apad[a0];[1:a]volume=0.35,afade=t=out:st=${(total + END - 1.5).toFixed(2)}:d=1.5[a1];[a0][a1]amix=inputs=2:duration=first:normalize=0[a]`
  : `[0:a]apad,afade=t=out:st=${total.toFixed(2)}:d=1[a]`;
const output = path.join(dir, "video.mp4");
run([
  "-i", "joined.mp4", ...(music ? ["-stream_loop", "-1", "-i", music] : []),
  "-filter_complex", `${videoGraph};${audioGraph}`, "-map", "[v]", "-map", "[a]",
  "-t", (total + END).toFixed(2), "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
  "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", output,
], work);
fs.rmSync(work, { recursive: true, force: true });

fs.writeFileSync(
  path.join(dir, "caption.txt"),
  `${hook}
${shots.filter((shot) => shot.caption).map((shot) => `▫️ ${shot.caption}`).join("\n")}

👉 Theo dõi ${channel || "kênh"} để xem tiếp hành trình mỗi ngày
#POV #TaiXe #DoiTaiXe #LaiXe #CuocSongTaiXe
`,
);
console.log(`→ ${output} (${(total + END).toFixed(1)} giây)\n→ ${path.join(dir, "caption.txt")}`);
