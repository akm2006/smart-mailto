# AGENTS.md — AI Agent Guidelines & Project Manual

> **Welcome AI Agents (Antigravity, Claude Code, Cursor, Windsurf, Aider, GitHub Copilot).**  
> This file is your operational ground truth for working within the `smart-mailto` repository. Follow these conventions and constraints strictly.

---

## 1. Project Overview

**smart-mailto** is an open-source, zero-backend, zero-dependency smart email routing engine and UI suite for modern web applications (React, Next.js, Remix, Astro, Vanilla JS).

### Core Problem Solved
Traditional `mailto:` links fail on desktop browsers by trying to trigger unconfigured native OS mail applications (e.g., Apple Mail, Windows Mail), causing 40%+ lead drop-off.  
`smart-mailto` solves this by:
1. **Desktop Browsers**: Intercepting clicks and deep-linking directly into active webmail clients (Gmail, Outlook 365, ProtonMail, Yahoo Mail) in a background tab with recipient, subject, and body prefilled.
2. **Mobile Devices**: Gracefully preserving native `mailto:` routing to present the system-native OS mail sheet.
3. **Resiliency**: Auto-detecting popup blockers and URI length limits (>2,000 characters), safely syncing drafts to the clipboard as a fallback.

---

## 2. Architecture & Monorepo Structure

The repository is organized as a lightweight `pnpm` workspace:

```
smart-mailto/
├── packages/
│   └── smart-mailto/             # Core library package (published to npm)
│       ├── src/
│       │   ├── core/             # Framework-agnostic email engine
│       │   │   ├── detector.ts   # Multi-signal device detection (pointer, touch, width)
│       │   │   ├── dispatcher.ts # Smart email dispatch orchestrator
│       │   │   ├── providers.ts  # Webmail URI generators (Gmail, Outlook, Proton, Yahoo)
│       │   │   ├── clipboard.ts  # Clipboard copy helpers & fallback recovery
│       │   │   ├── url-guard.ts  # 2,000 char URL safe length guard
│       │   │   ├── telemetry.ts  # Zero-cookie client telemetry
│       │   │   └── types.ts      # TypeScript interfaces & types
│       │   ├── react/            # React 18 & 19 bindings & components
│       │   │   ├── use-smart-mailto.ts   # Primary React hook
│       │   │   ├── SmartMailtoButton.tsx # Drop-in accessible button
│       │   │   ├── SmartMailtoMenu.tsx   # Multi-provider selector menu
│       │   │   └── SmartMailtoModal.tsx  # Zero-backend contact inquiry dialog
│       │   ├── index.ts          # Main core export ("smart-mailto")
│       │   └── react.ts          # React sub-path export ("smart-mailto/react")
│       ├── tests/                # Vitest unit test suite (26+ tests)
│       ├── package.json
│       ├── tsup.config.ts        # Bundles to CJS + ESM + DTS
│       └── SKILL.md              # AI Agent integration skill
├── apps/
│   └── web/                      # Interactive landing page & studio docs
│       ├── src/
│       │   ├── components/       # Header, Hero, Playground, BentoFeatures, etc.
│       │   ├── App.tsx
│       │   └── index.css         # Tailwind v3 + custom obsidian theme
│       ├── public/               # Official brand SVG logos, llms.txt, favicon
│       └── vite.config.ts
├── AGENTS.md                     # Universal agent instructions (this file)
├── CLAUDE.md                     # Claude Code memory anchor
└── .cursorrules                  # Cursor & Windsurf rule configurations
```

---

## 3. Essential Commands & Verification

Always use **`pnpm`** (v10+). Never use `npm` or `yarn` directly.

| Command | Action | Description |
| :--- | :--- | :--- |
| `pnpm test` | Run Unit Tests | Runs Vitest across core tests (`detector`, `providers`, `dispatcher`, etc.) |
| `pnpm -r typecheck` | TypeScript Check | Runs `tsc --noEmit` across all workspace packages with 0 errors |
| `pnpm -r build` | Production Build | Builds `smart-mailto` (tsup) and `web` (vite production bundle) |
| `pnpm --filter smart-mailto build` | Build Package | Compiles library to `dist/index.js`, `dist/react.js`, and `.d.ts` |
| `pnpm --filter web dev` | Run Dev Server | Starts landing page at `http://localhost:5173/` |

> **Always run `pnpm test; pnpm -r typecheck` before finishing any task to guarantee 0 regressions.**

---

## 4. Coding Standards & Invariants

### A. Zero Dependencies in Core
* `packages/smart-mailto` must have **0 external runtime dependencies**.
* Only peer dependencies are `react` and `react-dom` (optional, `>=18.0.0`).
* Do not introduce axios, lodash, date-fns, or any third-party routing utilities into core.

### B. Strict SSR Safety
* Always check `typeof window !== "undefined"` and `typeof navigator !== "undefined"` before accessing browser APIs.
* When executing DOM methods (like `window.open` or `navigator.clipboard`), wrap in try/catch to prevent SSR hydration errors in Next.js App Router, Remix, and Astro.

### C. Multi-Signal Detection Order
* Mobile vs. Desktop classification uses a composite heuristic:
  1. Pointer precision: `window.matchMedia("(pointer: coarse)").matches`
  2. Touch capabilities: `navigator.maxTouchPoints > 0`
  3. Viewport width: `window.innerWidth < 1024`
* Never rely solely on user-agent strings (which are deprecated and easily spoofed).

### D. Styling & Design Language (Landing Page)
* **Design Philosophy**: Linear / Raycast obsidian dark theme (`#08090a` base, `#0d0e11` cards).
* **Accent Colors**: Electric emerald (`#10b981` / `#34d399`) and subtle cyan (`#06b6d4`).
* **Icons**: Always use `lucide-react` for UI icons. Never use generic emojis or ad-hoc inline SVGs.
* **Logos**: Official vector SVG files reside in `apps/web/public/logos/`. Use semantic `<img>` tags pointing to `/logos/*.svg`.

---

## 5. Security & Verification Constraints

* **Strict Constraint**: Do **NOT** push code to remote git repositories or public GitHub without explicit manual verification and permission from the user. Keep all commits strictly local.
* **Zero Telemetry Leaks**: Telemetry in `smart-mailto` is 100% client-side, optional, and only appends benign context (current URL, timestamp) into the message body for recipient convenience. Never transmit user data to any external API or telemetry service.
