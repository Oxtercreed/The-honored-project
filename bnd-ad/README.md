# B&D v9 — motion-graphics ad (60.7 s, 1080×1920, 30 fps)

- `B-and-D_v9_ad.mp4` — the rendered ad, **silent** (visuals only; VO, music and SFX get added at assembly).
- `S01_…S14_*.html` — one self-contained HTML per scene (open in a browser; `?debug=1` shows timer, beats and safe areas, `?t=3.5` seeks, Space plays/pauses, arrows step a frame). Each exposes `__duration`, `__seek`, `__play`, `__pause`, `__labels`, `__sfx`, `__ready`.
- `src/` — shared engine (`core.js`, `core.css`), reusable screens (`mods/`) and per-scene sources (`scenes/`). Timings live in the `T` / `D` objects at the top of each scene.
- `build.js` — `node build.js [S01 …]` inlines the engine into each scene HTML.
- `tools/render.js` — renders a scene frame-by-frame with Playwright; `tools/shot.js` makes contact sheets.

Constants to switch later: `WHATSAPP_NUMBER` (S14), `CLIENT_NAME` (S12).
Re-render: `node tools/render.js S07 <framesDir>` per scene, then `ffmpeg -framerate 30 -i %05d.jpg …` and concat.
