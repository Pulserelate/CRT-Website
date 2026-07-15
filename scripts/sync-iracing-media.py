#!/usr/bin/env python3
"""Generate gallery/posters manifests from MarcMasPictureDump iRacing images."""

from __future__ import annotations

import json
import os
import re
import subprocess
from pathlib import Path
from urllib.parse import quote

REPO = "https://github.com/Ememas07/MarcMasPictureDump.git"
BASE_URL = "https://raw.githubusercontent.com/Ememas07/MarcMasPictureDump/main/iRacing"
POSTER_RE = re.compile(r"promo|poster|lineup|graphic|event|banner|special event", re.I)
SERIES_RE = re.compile(r"\s*\(\d+\)\.png$", re.I)
NUM_RE = re.compile(r"\((\d+)\)\.png$", re.I)
ROOT = Path(__file__).resolve().parents[1]
CLONE_DIR = ROOT / ".cache" / "MarcMasPictureDump"
OUTPUT_DIR = ROOT / "public" / "data"


def series_key(name: str) -> str:
    """Group numbered shot variants of the same race/session together."""
    return SERIES_RE.sub("", name).strip()


def shot_number(name: str) -> int:
    match = NUM_RE.search(name)
    return int(match.group(1)) if match else 0


def caption(name: str) -> str:
    return series_key(name).replace(".png", "")


def alt_text(name: str) -> str:
    return f"Chimera Racing Team iRacing — {caption(name)}"


def media_item(name: str) -> dict[str, str]:
    return {
        "src": f"{BASE_URL}/{quote(name)}",
        "caption": caption(name),
        "alt": alt_text(name),
    }


def pick_one_per_series(names: list[str]) -> list[str]:
    """Keep a single representative image for each race/session series."""
    best: dict[str, str] = {}
    for name in names:
        key = series_key(name)
        current = best.get(key)
        if current is None or shot_number(name) < shot_number(current):
            best[key] = name
    return [best[key] for key in sorted(best)]


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
    posters: list[dict[str, str]] = []

    for name in sorted(os.listdir(iracing)):
        path = iracing / name
        if not path.is_file() or not name.lower().endswith(".png"):
            continue
        if POSTER_RE.search(name):
            posters.append(media_item(name))
        else:
            gallery_names.append(name)

    gallery = [media_item(name) for name in pick_one_per_series(gallery_names)]

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    write_json(OUTPUT_DIR / "gallery.json", gallery)
    write_json(OUTPUT_DIR / "posters.json", posters)
    print(f"Wrote {len(gallery)} gallery images and {len(posters)} posters.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
