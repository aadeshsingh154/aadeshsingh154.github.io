#!/usr/bin/env python3
"""Asset pipeline for the Aadesh Singh portfolio.

- Wellnest / PediaTrack: case-study slide PNGs -> optimised WebP
- Artho: tall mobile Figma screens -> iPhone device mockups (single + paired)
- DENSI: wide desktop Figma screens -> browser-window mockups
- All three GIFs -> mp4 + webm + poster (the DENSI GIF is 187MB, well over
  GitHub's 100MB per-file hard limit, so shipping it as a GIF is not an option)
"""

import os
import re
import glob
import shutil
import subprocess
from PIL import Image, ImageDraw, ImageFilter

Image.MAX_IMAGE_PIXELS = None

import pathlib
# Source material lives one level up from the repo, alongside it.
SRC = os.environ.get("ASSET_SRC", str(pathlib.Path(__file__).resolve().parents[2]))
ROOT = str(pathlib.Path(__file__).resolve().parents[1])
OUT = f"{ROOT}/public/images/projects"

# ---------------------------------------------------------------- helpers

def ensure(p):
    os.makedirs(p, exist_ok=True)
    return p


def save_webp(im, path, width=None, quality=82):
    im = im.convert("RGB")
    if width and im.width > width:
        h = round(im.height * width / im.width)
        im = im.resize((width, h), Image.LANCZOS)
    im.save(path, "WEBP", quality=quality, method=6)
    print(f"  {os.path.basename(path):<34} {im.width}x{im.height}  {os.path.getsize(path)//1024}KB")
    return im.size


def rounded_mask(size, radius, supersample=4):
    w, h = size
    m = Image.new("L", (w * supersample, h * supersample), 0)
    ImageDraw.Draw(m).rounded_rectangle(
        [0, 0, w * supersample - 1, h * supersample - 1],
        radius=radius * supersample, fill=255)
    return m.resize((w, h), Image.LANCZOS)


def drop_shadow(canvas, box, radius, blur=60, offset=(0, 26), opacity=58):
    """Paint a soft shadow for a rounded rect onto `canvas` (RGB)."""
    x, y, w, h = box
    pad = blur * 3
    layer = Image.new("RGBA", (canvas.width, canvas.height), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle([x + offset[0], y + offset[1], x + w + offset[0], y + h + offset[1]],
                        radius=radius, fill=(20, 20, 26, opacity))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    canvas.alpha_composite(layer)
    return canvas


def backdrop(w, h, top=(238, 238, 241), bottom=(226, 226, 231)):
    """Soft vertical gradient backdrop, deliberately neutral."""
    grad = Image.new("RGB", (1, h))
    px = grad.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        px[0, y] = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
    return grad.resize((w, h), Image.BICUBIC).convert("RGBA")


# ---------------------------------------------------------------- devices

def phone(screen, screen_w=560):
    """Render a screen inside an iPhone-style frame. Returns RGBA."""
    ratio = 2556 / 1179                      # iPhone 15 Pro logical aspect
    sw = screen_w
    sh = round(sw * ratio)

    src = screen.convert("RGB")
    target_h = round(src.width * ratio)
    src = src.crop((0, 0, src.width, min(target_h, src.height)))
    if src.height < target_h:                # pad short screens with their own bg
        pad = Image.new("RGB", (src.width, target_h), src.getpixel((src.width // 2, src.height - 2)))
        pad.paste(src, (0, 0))
        src = pad
    src = src.resize((sw, sh), Image.LANCZOS)

    bezel = max(round(sw * 0.026), 8)
    band = max(round(bezel * 0.42), 3)       # titanium rail
    fw, fh = sw + 2 * (bezel + band), sh + 2 * (bezel + band)
    radius_out = round(fw * 0.152)
    radius_in = round(sw * 0.135)

    dev = Image.new("RGBA", (fw, fh), (0, 0, 0, 0))
    rail = Image.new("RGBA", (fw, fh), (176, 176, 182, 255))
    dev.paste(rail, (0, 0), rounded_mask((fw, fh), radius_out))

    body = Image.new("RGBA", (fw - 2 * band, fh - 2 * band), (16, 16, 18, 255))
    dev.paste(body, (band, band), rounded_mask(body.size, radius_out - band))

    scr = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    scr.paste(src, (0, 0))
    dev.paste(scr, (bezel + band, bezel + band), rounded_mask((sw, sh), radius_in))

    # dynamic island
    iw, ih = round(sw * 0.30), round(sw * 0.083)
    ix = (fw - iw) // 2
    iy = bezel + band + round(sh * 0.014)
    isl = Image.new("RGBA", (iw, ih), (10, 10, 12, 255))
    dev.paste(isl, (ix, iy), rounded_mask((iw, ih), ih // 2))
    return dev


def browser(screen, inner_w=2200, dark=None):
    """Render a wide screen inside a minimal browser window. Returns RGBA."""
    src = screen.convert("RGB")
    h = round(src.height * inner_w / src.width)
    src = src.resize((inner_w, h), Image.LANCZOS)

    if dark is None:
        c = src.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
        dark = sum(c) / 3 < 120

    bar_h = round(inner_w * 0.019)
    bar_h = max(bar_h, 34)
    chrome = (34, 34, 38) if dark else (240, 240, 243)
    dot = [(255, 95, 87), (255, 189, 46), (40, 201, 64)]

    fw, fh = inner_w, h + bar_h
    radius = round(inner_w * 0.007)
    win = Image.new("RGBA", (fw, fh), (0, 0, 0, 0))
    top = Image.new("RGBA", (fw, bar_h), chrome + (255,))
    d = ImageDraw.Draw(top)
    r = round(bar_h * 0.185)
    for i, col in enumerate(dot):
        cx = round(bar_h * 0.62) + i * round(bar_h * 0.52)
        cy = bar_h // 2
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)
    win.paste(top, (0, 0))
    win.paste(src, (0, bar_h))
    win.putalpha(rounded_mask((fw, fh), radius))
    return win


def compose(devices, out_w, out_h, scale=0.82, gap_frac=0.045, shadow=True,
            bg=((238, 238, 241), (226, 226, 231))):
    """Lay devices out horizontally, centred, on a neutral backdrop."""
    canvas = backdrop(out_w, out_h, *bg)
    gap = round(out_w * gap_frac)
    max_h = round(out_h * scale)
    scaled = []
    for d in devices:
        if d.height > max_h:
            w = round(d.width * max_h / d.height)
            d = d.resize((w, max_h), Image.LANCZOS)
        scaled.append(d)
    total = sum(d.width for d in scaled) + gap * (len(scaled) - 1)
    if total > out_w * 0.92:
        f = out_w * 0.92 / total
        scaled = [d.resize((round(d.width * f), round(d.height * f)), Image.LANCZOS) for d in scaled]
        total = sum(d.width for d in scaled) + gap * (len(scaled) - 1)
    x = (out_w - total) // 2
    for d in scaled:
        y = (out_h - d.height) // 2
        if shadow:
            rad = round(d.width * 0.14) if d.height > d.width else round(d.width * 0.01)
            drop_shadow(canvas, (x, y, d.width, d.height), rad,
                        blur=round(out_w * 0.022), offset=(0, round(out_h * 0.022)))
        canvas.alpha_composite(d, (x, y))
        x += d.width + gap
    return canvas.convert("RGB")


# ---------------------------------------------------------------- video

def gif_to_video(gif, stem, out_dir, width):
    mp4 = os.path.join(out_dir, stem + ".mp4")
    webm = os.path.join(out_dir, stem + ".webm")
    poster = os.path.join(out_dir, stem + "-poster.webp")
    vf = f"scale={width}:-2:flags=lanczos,fps=24"
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", gif, "-vf", vf,
                    "-c:v", "libx264", "-preset", "slow", "-crf", "27",
                    "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", mp4], check=True)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", gif, "-vf", vf,
                    "-c:v", "libvpx-vp9", "-crf", "38", "-b:v", "0",
                    "-row-mt", "1", "-deadline", "good", "-cpu-used", "4", "-an", webm], check=True)
    im = Image.open(gif)
    im.seek(0)
    save_webp(im.convert("RGB"), poster, width=width)
    for p in (mp4, webm):
        print(f"  {os.path.basename(p):<34} {os.path.getsize(p)//1024}KB")
    return os.path.getsize(mp4)


# ---------------------------------------------------------------- projects

def do_wellnest():
    d = ensure(f"{OUT}/wellnest")
    order = ["page 1", "page 2", "page 3", "page 3a", "page 4", "page 4a",
             "page 5", "page 5a", "page 6", "page 7", "page 8", "page 9"]
    print("\nWELLNEST")
    for i, name in enumerate(order, 1):
        im = Image.open(f"{SRC}/Wellnest/{name}.png")
        save_webp(im, f"{d}/wellnest-{i:02d}.webp", width=1800)


def do_pediatrack():
    d = ensure(f"{OUT}/pediatrack")
    print("\nPEDIATRACK")
    files = sorted(glob.glob(f"{SRC}/Pediatrack/*.png"),
                   key=lambda f: int(re.search(r"(\d+)\.png$", f).group(1)))
    for f in files:
        n = int(re.search(r"(\d+)\.png$", f).group(1))
        save_webp(Image.open(f), f"{d}/pediatrack-{n:02d}.webp", width=1800)
    gif_to_video(f"{SRC}/Pediatrack/pediatrack_ui_video.gif", "pediatrack-ui", d, 1280)


ARTHO_ORDER = ["Dashboard", "Dashboard-1", "Expenses", "Investments",
               "Goals", "Debts", "Resources", "My Page"]


def do_artho():
    d = ensure(f"{OUT}/artho")
    print("\nARTHO")
    screens = {n: Image.open(f"{SRC}/Artho/Figma Screens/{n}.png") for n in ARTHO_ORDER}
    ph = {n: phone(s, 620) for n, s in screens.items()}

    # hero — three phones, centre one raised
    hero = compose([ph["Expenses"], ph["Dashboard"], ph["Investments"]],
                   2000, 1500, scale=0.86, gap_frac=0.035)
    save_webp(hero, f"{d}/artho-hero.webp", width=1800)

    pairs = [("Dashboard", "Dashboard-1"), ("Expenses", "Investments"),
             ("Goals", "Debts"), ("Resources", "My Page")]
    for i, (a, b) in enumerate(pairs, 1):
        c = compose([ph[a], ph[b]], 2000, 1500, scale=0.9, gap_frac=0.07)
        save_webp(c, f"{d}/artho-{i:02d}.webp", width=1800)

    # tall full-length screens for the detail gallery
    for n in ("Dashboard", "Expenses", "Goals"):
        save_webp(screens[n], f"{d}/artho-full-{n.lower().replace(' ', '-')}.webp", width=786)

    gif_to_video(f"{SRC}/Artho/Artho Screen Recording final edit.gif", "artho-ui", d, 720)


DENSI_ORDER = ["Dashboard", "Dashboard-1", "Total reports", "Total reports-1",
               "Report", "Sectors covered", "Analyst connect",
               "Canvas", "Canvas-1", "Canvas-2", "Canvas-3"]


def densi_card(d):
    """4:3 card image — the window is scaled to fit rather than cropped."""
    im = Image.open(f"{SRC}/Densi/Figma Screens/Dashboard.png")
    win = browser(im, 2200)
    W, H = 2000, 1500
    target_w = round(W * 0.90)
    win = win.resize((target_w, round(win.height * target_w / win.width)), Image.LANCZOS)
    canvas = backdrop(W, H)
    x, y = (W - win.width) // 2, (H - win.height) // 2
    drop_shadow(canvas, (x, y, win.width, win.height), round(win.width * 0.008),
                blur=48, offset=(0, 26), opacity=66)
    canvas.alpha_composite(win, (x, y))
    save_webp(canvas.convert("RGB"), f"{d}/densi-card.webp", width=1600)


def do_densi():
    d = ensure(f"{OUT}/densi")
    print("\nDENSI")
    densi_card(d)
    for i, name in enumerate(DENSI_ORDER, 1):
        im = Image.open(f"{SRC}/Densi/Figma Screens/{name}.png")
        win = browser(im, 2200)
        canvas = backdrop(2400, round(win.height * 2400 / 2200) + 190)
        x = (2400 - win.width) // 2
        y = (canvas.height - win.height) // 2
        drop_shadow(canvas, (x, y, win.width, win.height), round(win.width * 0.007),
                    blur=54, offset=(0, 30), opacity=64)
        canvas.alpha_composite(win, (x, y))
        out = canvas.convert("RGB")
        if i == 1:
            save_webp(out, f"{d}/densi-hero.webp", width=2000)
        save_webp(out, f"{d}/densi-{i:02d}.webp", width=2000)
    gif_to_video(f"{SRC}/Densi/Densi Screen Recording final edit.gif", "densi-ui", d, 1440)


def do_extras():
    p = ensure(f"{ROOT}/public")
    shutil.copy(f"{SRC}/Aadesh_PD_Resume_2026.pdf", f"{p}/Aadesh-Singh-Resume.pdf")
    print("\nresume pdf copied")


if __name__ == "__main__":
    ensure(OUT)
    do_wellnest()
    do_pediatrack()
    do_artho()
    do_densi()
    do_extras()
    total = sum(os.path.getsize(os.path.join(r, f))
                for r, _, fs in os.walk(f"{ROOT}/public") for f in fs)
    print(f"\nTOTAL public/ = {total/1024/1024:.1f} MB")
