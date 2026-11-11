"""Am thanh cho doi-song-01.html (qua bong da). Moc thoi gian khop object T trong file html.
Cach dung: python3 am-thanh-doi-song-01.py <ra.wav>"""
import sys, wave, numpy as np
SR = 48000
T = dict(rew0=3.5, rew1=5.5, cut0=9, cut1=15, cnt0=15, inf0=19, inf1=22.5, end=22.5, DUR=27)
mix = np.zeros(int(SR * T["DUR"])); rng = np.random.default_rng(2)
def add(sig, t, g=1.0):
    i = int(t * SR); j = min(len(mix), i + len(sig))
    if i < len(mix): mix[i:j] += sig[: j - i] * g
def tt(d): return np.arange(int(SR * d)) / SR
def lowpass(s, a):
    y = np.empty_like(s); acc = 0.0
    for i, v in enumerate(s): acc += a * (v - acc); y[i] = acc
    return y
def bell(f, d=0.6, dec=6.0):
    x = tt(d); e = np.exp(-dec * x) * np.minimum(1, x / 0.003)
    return e * (np.sin(2*np.pi*f*x) + .45*np.sin(2*np.pi*2.01*f*x)*np.exp(-4*x) + .2*np.sin(2*np.pi*3.02*f*x)*np.exp(-8*x))
def sweep(f0, f1, d, dec=0.0):
    x = tt(d); f = f0 * (f1 / f0) ** (x / d); ph = 2*np.pi*np.cumsum(f) / SR
    return np.sin(ph) * np.sin(np.pi * x / d) ** 2 * np.exp(-dec * x)
def whoosh(d, a=0.08):
    x = tt(d); return lowpass(rng.standard_normal(len(x)), a) * np.sin(np.pi * x / d) ** 2 * 2.5
def snip(f=2400):
    x = tt(0.07); return np.exp(-60*x) * (np.sin(2*np.pi*f*x) + 0.6*rng.standard_normal(len(x))*np.exp(-150*x))
def thump(f=70, d=0.35):
    x = tt(d); return np.sin(2*np.pi*f*x*np.exp(-3*x)) * np.exp(-9*x) + 0.4*lowpass(rng.standard_normal(len(x)), .05)*np.exp(-30*x)*4

add(whoosh(0.6), 0, .5); add(bell(660, .3, 14), .05, .35)                       # mo dau
add(whoosh(2.0, .05), T["rew0"], .35); add(sweep(900, 220, 2.0), T["rew0"], .25)  # tua nguoc
add(bell(392, 1.2, 3), T["rew1"], .4)                                             # hien khoi 20 mat
CUTD = 1.0; STEP = (T["cut1"] - T["cut0"] - CUTD) / 11
for k in range(12):                                                               # cat tung dinh
    add(whoosh(0.35, .2), T["cut0"] + k*STEP, .12)
    add(snip(2000 + 90*k), T["cut0"] + k*STEP + CUTD, .7)
for i, f in enumerate((523.25, 659.25)): add(bell(f, .4, 10), T["cnt0"] + .4 + i*.25, .35)   # dem mat
for i, f in enumerate((523.25, 659.25, 783.99)): add(bell(f, 1.6, 2.8), T["cnt0"] + 1.0 + i*.06, .32)
add(sweep(180, 720, T["inf1"] - T["inf0"]), T["inf0"], .3); add(whoosh(T["inf1"] - T["inf0"], .03), T["inf0"], .2)  # bom cang
for n in range(3): add(thump(), T["end"] + n * np.pi / 3.2, 1.0 * np.exp(-n * .8))       # bong nay
for i, f in enumerate((523.25, 659.25, 783.99, 1046.5)): add(bell(f, 2.2, 2.2), T["end"] + .1 + i*.07, .3)
add(bell(880, .25, 16), T["end"] + .8, .3); add(bell(988, .25, 16), T["end"] + 2.0, .25)
mix /= np.abs(mix).max() / 0.7
with wave.open(sys.argv[1] if len(sys.argv) > 1 else "am-thanh.wav", "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.stack([mix, mix], 1) * 32767).astype("<i2").tobytes())
print("xong")
