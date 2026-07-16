#!/usr/bin/env python3
"""Generate gallery/posters manifests.

Gallery race shots and poster-named images come from MarcMasPictureDump.
Posters tab includes only files with "poster" in the filename.
"""

from __future__ import annotations

import json
import os
import re
import subprocess
from pathlib import Path
from urllib.parse import quote

REPO = "https://github.com/Ememas07/MarcMasPictureDump.git"
BASE_URL = "https://raw.githubusercontent.com/Ememas07/MarcMasPictureDump/main/iRacing"
POSTER_RE = re.compile(r"poster", re.I)
PROMO_RE = re.compile(r"promo", re.I)
SERIES_RE = re.compile(r"\s*\(\d+\)\.png$", re.I)
NUM_RE = re.compile(r"\((\d+)\)\.png$", re.I)
# Liveries, memes, and studio shots — keep those out of the race gallery.
SKIP_GALLERY_RE = re.compile(
    r"livery|wip|showcase|meme|\bfinished\b|attempt|i got bored|"
    r"rose gold version|cipher|cypher|miyabi|kayoko|abydos|alonso|"
    r"new crt|old crt|teto mercedes|blue gem|lead the way|"
    r"next gen nords grahh|ringmeister|seboing|holy avoidance|"
    r"i found kayoko|flying indy|close to the wall|gt4 avoidance|"
    r"mx5|gr86 crt|m2 livery|shakedown",
    re.I,
)
ROOT = Path(__file__).resolve().parents[1]
CLONE_DIR = ROOT / ".cache" / "MarcMasPictureDump"
OUTPUT_DIR = ROOT / "public" / "data"


def series_key(name: str) -> str:
    """Strip trailing (N).png shot numbers."""
    return SERIES_RE.sub("", name).strip()


def shot_number(name: str) -> int:
    match = NUM_RE.search(name)
    return int(match.group(1)) if match else 0


def event_key(name: str) -> str:
    """Collapse car/day/night/post-race variants of the same race weekend."""
    text = re.sub(r"\.png$", "", series_key(name), flags=re.I).lower()
    text = text.replace("petit le mans", "plm")
    text = re.sub(r"\bd24\b", "daytona 24", text)
    text = re.sub(r"\bcrt daytona 24\b", "daytona 24", text)
    text = re.sub(r"#\d+\b", " ", text)
    text = re.sub(r"\b(gtd|gtp|lmp[23]?|amr|evo|992|gt[34]|p\d+)\d*\b", " ", text)
    text = re.sub(
        r"\b(day|night|dry|wet|post race|pics?|pictures|shenanigans|flying|and|crashes)\b",
        " ",
        text,
    )
    text = re.sub(r"\b20\d{2}\b", " ", text)
    text = re.sub(r"\b\d+\b", " ", text)
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def caption(name: str) -> str:
    stem = Path(name).stem
    stem = re.sub(r"\s*\(\d+\)$", "", stem).strip()
    return stem.replace("_", " ").strip()


def alt_text(name: str, kind: str = "iRacing") -> str:
    return f"Chimera Racing Team {kind} — {caption(name)}"


def media_item(name: str) -> dict[str, str]:
    return {
        "src": f"{BASE_URL}/{quote(name)}",
        "caption": caption(name),
        "alt": alt_text(name),
    }


def poster_item(name: str) -> dict[str, str]:
    base = caption(name)
    match = NUM_RE.search(name)
    label = f"{base} — {match.group(1)}" if match else base
    return {
        "src": f"{BASE_URL}/{quote(name)}",
        "caption": label,
        "alt": f"Chimera Racing Team poster — {label}",
    }


def pick_one_per_race(names: list[str]) -> list[str]:
    """Keep a single representative image for each race weekend."""
    best: dict[str, str] = {}
    for name in names:
        if SKIP_GALLERY_RE.search(series_key(name)):
            continue
        key = event_key(name)
        if not key:
            continue
        current = best.get(key)
        if current is None or shot_number(name) < shot_number(current):
            best[key] = name
    return [best[key] for key in sorted(best)]


def is_poster(name: str) -> bool:
    """Any dump file with 'poster' in the name (including promo poster sets)."""
    return bool(POSTER_RE.search(name))


def is_promo(name: str) -> bool:
    return bool(PROMO_RE.search(name)) and not is_poster(name)


def ensure_clone() -> Path:
    iracing = CLONE_DIR / "iRacing"
    if iracing.is_dir():
        return iracing

    CLONE_DIR.parent.mkdir(parents=True, exist_ok=True)
    if CLONE_DIR.exists():
        subprocess.run(["git", "-C", str(CLONE_DIR), "pull", "--ff-only"], check=True)
    else:
        subprocess.run(
            [
                "git",
                "clone",
                "--depth",
                "1",
                "--filter=blob:none",
                "--sparse",
                str(REPO),
                str(CLONE_DIR),
            ],
            check=True,
        )
        subprocess.run(["git", "-C", str(CLONE_DIR), "sparse-checkout", "set", "iRacing"], check=True)

    return iracing


def write_json(path: Path, items: list[dict[str, str]]) -> None:
    path.write_text(json.dumps(items, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> int:
    iracing = ensure_clone()
    gallery_names: list[str] = []
    poster_names: list[str] = []

    for name in sorted(os.listdir(iracing)):
        path = iracing / name
        if not path.is_file() or not name.lower().endswith(".png"):
            continue
        if is_poster(name):
            poster_names.append(name)
        elif is_promo(name):
            # Non-poster promo dumps stay out of Gallery and Posters.
            continue
        else:
            gallery_names.append(name)

    gallery = [media_item(name) for name in pick_one_per_race(gallery_names)]
    posters = [poster_item(name) for name in poster_names]

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    write_json(OUTPUT_DIR / "gallery.json", gallery)
    write_json(OUTPUT_DIR / "posters.json", posters)
    print(f"Wrote {len(gallery)} gallery images and {len(posters)} posters.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
