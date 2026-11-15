# AGENTS.md — Project & Operator Context

> **Instruction for AI Agents:** Read this file first. It contains the complete context, design system, persona, architecture, and current state for **The Honored One Vibe Command Deck**. Maintain these standards across all future edits.

---

## 1. Identity & Persona
* **Operator Name:** **THE HONORED ONE 🥶**
* **Brand / Monogram:** `THO` / `HONORED.`
* **Core Title:** **THE BEST VIBE-CODER IN EXISTENCE 🥶**
* **GitHub Username:** `Oxtercreed`
* **Philosophy / Tone:** Unapologetic, high-octane "vibe-coding" ethos. Commands frontier models (Claude 3.5, ChatGPT o1) with supreme taste and conviction. Zero corporate template slop; 100% intent-driven architecture.

---

## 2. Project Overview & Repository
* **Project Name:** Genesis Deployment #01 — Sovereign Vibe Command Deck
* **Repository:** [https://github.com/Oxtercreed/The-honored-project](https://github.com/Oxtercreed/The-honored-project)
* **GitHub Pages (Live URL):** [https://oxtercreed.github.io/The-honored-project/](https://oxtercreed.github.io/The-honored-project/)
* **Tech Stack:** **100% Pure Vanilla** (HTML5, modern CSS3, vanilla ES6+ JavaScript). **No frameworks, no build step, no npm packages.**

---

## 3. Design System & Tokens
* **Aesthetic:** Noir & Crimson Op-Art (Geometric Brutalism + Optical Concentric Pulse).
* **Color Palette:**
  * Obsidian Black Background: `#050505`
  * Surface Background: `#0a0a0a`
  * Cards Background: `rgba(14, 14, 14, 0.78)` with `backdrop-filter: blur(16px)`
  * Crimson Red Accent: `#ef4444` (Hover: `#dc2626`, Glow: `rgba(239, 68, 68, 0.22)`)
  * Monochrome Text: `#f5f5f5` (Bright: `#ffffff`, Muted: `#a3a3a3`, Dim: `#737373`)
* **Typography Hierarchy:**
  * Display Headings: `'Bebas Neue', sans-serif`
  * Handwritten Accent: `'Caveat', cursive` (*"Throughout heaven and earth..."*)
  * Telemetry & Monospace: `'JetBrains Mono', monospace` (for badges, stats, IDs, coords)
  * UI & Body: `'Plus Jakarta Sans', sans-serif`

---

## 4. Key Interactive Systems

### A. Swarm Rebuild Takeover Engine (`swarm-init.js` & `swarm/swarm.js`)
* Vendored tribute engine based on Joel Califa's *Swarm* & Dhvanil Patel's *swarm-cursors*.
* Vector blueprints the DOM on page load, blanks out, and spawns simulated multiplayer cursors assembling the site in real time.
* HUD controls: `Tour`, `1×` speed, `Tap for sound`, `Go live` (restores interactive page), `Replay`, `✕` (Close / ESC).
* Supports query params: `?swarm=off` (bypass), `?swarm=once` (session only), `?swarm=always`.

### B. Ambient Op-Art Canvas (`#aurora-canvas` in `app.js`)
* Renders drifting crimson/ghost monochrome radial gradient orbs and concentric pulse rings.
* Smooth mouse parallax tracking (`mouse.x += (target - mouse.x) * 0.04`).
* Automatically pauses rendering when out of viewport (`IntersectionObserver`) or when tab is hidden (`visibilitychange`) to conserve GPU/battery.

### C. 7-Layer Vibe-Coding Constitutional Stack (`#flagships`)
* Interactive tab switcher detailing the prompt architecture:
  * **L1:** Vibe Inception & Zeroth-Principle Intent
  * **L2:** Dual-Brain Routing (Claude 3.5 Sonnet + ChatGPT o1)
  * **L3:** Swarm Rebuild Engine
  * **L4:** Zero-Syntax Rapid Velocity Loop
  * **L5:** Deep Context Window Retention
  * **L6:** Ruthless Anti-Slop Aesthetic Filter
  * **L7:** Infinite Meta-Cognitive Self-Evolution

### D. The Systems Matrix (Bento Grid in `#matrix`)
* Filterable bento grid across: `all`, `ai` (Frontier AI), `systems` (Core Visuals), `vibes` (Vibe Engineering).

### E. Direct Connect / Summon (`#contact`)
* One-click clipboard copy for `honored@vibe.pro` with accessible floating toast notification (`#toast`).

---

## 5. File Map
```
some shittt/
├── index.html        # Main semantic markup & layout
├── style.css         # Complete Noir & Crimson design tokens & styles
├── app.js            # Ambient canvas, 7-layer tab switcher, bento filter, toast
├── swarm-init.js     # Bootloader for Swarm rebuild engine
├── swarm/
│   └── swarm.js      # Full multiplayer cursor rebuild engine
├── README.md         # Public GitHub repository documentation
├── .gitignore        # Ignores OS & log files
└── AGENTS.md         # This instruction & context file
```

---

## 6. Next Refinement Priorities (For Future Agent Turns)
1. **Audio Integration:** Hook up custom click/tap audio effects to the Swarm engine and UI interactions.
2. **Socials & Links:** Update placeholder links (`github.com`, `x.com`) with the user's real personal links or custom domain.
3. **New Project Entries:** Slot real personal projects into the Systems Matrix or Flagships as they are created.
4. **Visual Flair / Easter Eggs:** Add custom sound bites, terminal easter eggs (e.g., typing `domain expansion` in the console triggers a red visual wave), or custom avatar artwork.
