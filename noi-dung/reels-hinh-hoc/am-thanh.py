"""Tao hieu ung am thanh cho reel cau do (tick dem nguoc, het gio, ting tung mat, nhac dap an).
Cach dung: python3 am-thanh.py <ra.wav> [CD0 CD1 RV0 RV1 DUR SO_MAT]
Moc thoi gian phai khop dong `const CD0=...` trong file tap."""
import sys, wave, numpy as np
SR = 48000
out = sys.argv[1] if len(sys.argv) > 1 else "am-thanh.wav"
CD0, CD1, RV0, RV1, DUR, N = [float(x) for x in sys.argv[2:8]] if len(sys.argv) >= 8 else (2.5, 12.5, 13.0, 18.0, 22.5, 20)
N = int(N)
mix = np.zeros(int(SR * DUR))
rng = np.random.default_rng(1)

def add(sig, t, gain=1.0):
    i = int(t * SR); j = min(len(mix), i + len(sig))
    if i < len(mix): mix[i:j] += sig[: j - i] * gain

def tt(d): return np.arange(int(SR * d)) / SR

def bell(f, d=0.6, decay=6.0):
    x = tt(d); env = np.exp(-decay * x) * np.minimum(1, x / 0.003)
    return env * (np.sin(2*np.pi*f*x) + 0.45*np.sin(2*np.pi*2.01*f*x)*np.exp(-4*x) + 0.2*np.sin(2*np.pi*3.02*f*x)*np.exp(-8*x))

def tick(f, d=0.06):
    x = tt(d); env = np.exp(-70 * x)
    return env * (np.sin(2*np.pi*f*x) + 0.4*rng.standard_normal(len(x)) * np.exp(-200*x))

def lowpass(s, a):
    y = np.empty_like(s); acc = 0.0
    for i, v in enumerate(s): acc += a * (v - acc); y[i] = acc
    return y

# 1. whoosh mo dau + pop cau moi
x = tt(0.6); n = rng.standard_normal(len(x)) * np.sin(np.pi * x / 0.6) ** 2
add(lowpass(n, 0.08) * 2.2, 0.0, 0.5)
add(bell(660, 0.3, 14), 0.05, 0.35)
# 2. tich tac moi giay dem nguoc; 3 giay cuoi cao va to hon
k = 0
while CD0 + k < CD1 - 1e-6:
    remain = int(round(CD1 - (CD0 + k)))
    hi = remain <= 3
    add(tick(1900 if not hi else 2600), CD0 + k, 1.0 if not hi else 1.4)
    add(tick(1300 if not hi else 1700), CD0 + k + 0.5, 0.55 if not hi else 0.8)
    k += 1
# 3. het gio: coi bao hai not
for i, f in enumerate((523.25, 392.0)):
    x = tt(0.28); s = np.sign(np.sin(2*np.pi*f*x)) * 0.5 + np.sin(2*np.pi*f*x)
    add(lowpass(s * np.exp(-5*x) * np.minimum(1, x/0.005), 0.25), CD1 + i * 0.16, 0.45)
# 4. ting tung mat, cao dan theo thang ngu cung
scale = [0, 2, 4, 7, 9]
per = (RV1 - RV0) / N
for i in range(N):
    semi = scale[i % 5] + 12 * (i // 5)
    add(bell(523.25 * 2 ** (semi / 12) / 1.6, 0.35, 11), RV0 + i * per, 0.28)
# 5. nhac dap an: hop am Do truong rai not + lap lanh
for i, f in enumerate((523.25, 659.25, 783.99, 1046.5)):
    add(bell(f, 2.2, 2.2), RV1 + i * 0.07, 0.38)
add(bell(130.81, 2.5, 1.6), RV1, 0.5)
for i in range(10):
    add(bell(2000 + 300 * rng.random() * 4, 0.25, 18), RV1 + 0.3 + i * 0.09, 0.12)
# 6. pop khi hien loi moi theo doi
add(bell(880, 0.25, 16), RV1 + 1.0, 0.3)

mix /= np.abs(mix).max() / 0.7
st = np.stack([mix, mix], 1)
with wave.open(out, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st * 32767).astype("<i2").tobytes())
print("ghi", out)
