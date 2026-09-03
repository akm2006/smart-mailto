# `smart-mailto` — Open Source Architecture & Implementation Plan

> **The zero-dependency, zero-backend smart email dispatcher for modern web apps.**
> Fixes broken desktop `mailto:` dead-ends by intelligently deep-linking directly to webmail providers (Gmail, Outlook, Yahoo, Proton) with native mobile fallback and prefilled templates.

---

## 1. Executive Summary & Value Proposition

### The Problem
* **Standard `mailto:` is broken on desktop**: Clicking `mailto:` in Chrome, Safari, Edge, or Firefox typically triggers unconfigured desktop clients (Apple Mail, Windows Mail, Outlook desktop), confusing users and losing high-intent leads.
* **Backend forms are heavy & expensive**: Setting up contact forms requires backend API endpoints, SMTP servers, third-party relays (SendGrid/Resend), database storage, Captchas, and spam filters.
* **`mailgo` is dead**: The historically dominant tool (`mailgo`, 3.2k+ GitHub stars) was officially **deprecated and archived on January 1, 2024**, leaving no modern, maintained, zero-dependency successor.

### The Solution: `smart-mailto`
A modern, modular, zero-dependency open-source library built with TypeScript:
1. **Core Engine**: < 2 kB gzipped, pure TypeScript, works in any JavaScript framework or vanilla HTML.
2. **Multi-Provider Webmail Deep-Linking**: Gmail, Outlook / Office 365, Yahoo Mail, ProtonMail, and native `mailto:`.
3. **Multi-Signal Device Detection**: Touch screen, viewport width, and user-agent heuristics with full SSR/hydration safety (Next.js, Astro, Remix, Vite).
4. **Popup Blocker Resiliency**: Detects blocked popups and gracefully falls back to direct redirect, native mailto, or clipboard copy.
5. **One-Click Clipboard & Safe URL Guard**: Truncation-safe encoding for long messages and one-click copy with feedback.
6. **Pre-Built React Components & Hooks**: Headless hook (`useSmartMailto`), sleek `<SmartMailtoButton />`, accessible `<SmartMailtoMenu />`, and a drop-in inquiry modal.
7. **Interactive Showcase & Playground**: Live demo web app where developers can test providers, toggle mobile simulation, and generate copy-paste code.

---

## 2. Monorepo Architecture

We use a **pnpm Workspace Monorepo** separating the publishable npm package from the interactive demo app:

```text
smart-mailto/
├── packages/
│   └── smart-mailto/                  # 📦 The Publishable NPM Package
│       ├── src/
│       │   ├── core/
│       │   │   ├── detector.ts        # Robust SSR-safe device detection (touch, UA, viewport)
│       │   │   ├── providers.ts       # Deep link URL builders (Gmail, Outlook, Yahoo, Proton, mailto)
│       │   │   ├── dispatcher.ts      # Window opener, popup blocker detector, redirect fallback
│       │   │   ├── clipboard.ts       # Cross-browser clipboard copy with fallback
│       │   │   └── types.ts           # Full TypeScript interfaces & options
│       │   ├── react/
│       │   │   ├── use-smart-mailto.ts# Headless React hook
│       │   │   ├── SmartMailtoButton.tsx
│       │   │   ├── SmartMailtoMenu.tsx# Accessible multi-provider dropdown
│       │   │   └── SmartMailtoModal.tsx# Plug-and-play inquiry contact dialog
│       │   ├── index.ts               # Primary library entry point
│       │   └── react.ts               # React exports entry point
│       ├── tests/
│       │   ├── detector.test.ts       # Device detection unit tests
│       │   ├── providers.test.ts      # URL generation & encoding tests
│       │   ├── dispatcher.test.ts     # Dispatching & popup detection tests
│       │   └── hook.test.ts           # React hook lifecycle tests
│       ├── package.json               # Dual exports (ESM + CJS + Types)
│       ├── tsup.config.ts             # esbuild-powered zero-config bundler
│       └── tsconfig.json
│
├── apps/
│   └── web/                           # 🌐 Interactive Showcase & Playground Site
│       ├── src/
│       │   ├── components/
│       │   │   ├── Hero.tsx           # Visual headline, quick install, live badges
│       │   │   ├── Playground.tsx     # Interactive message composer & test dispatcher
│       │   │   ├── DeviceSimulator.tsx# Real-time toggle: Desktop vs Mobile simulator
│       │   │   ├── ProviderGrid.tsx   # Visual test buttons for all webmail providers
│       │   │   ├── CodeGenerator.tsx  # Dynamic React/HTML code snippet generator
│       │   │   └── Features.tsx       # Feature comparison table (mailto vs backend vs smart-mailto)
│       │   ├── app/ or main.tsx
│       │   ├── package.json           # Consumes "smart-mailto": "workspace:*"
│       │   └── tailwind.config.ts
│
├── .github/
│   └── workflows/
│       ├── ci.yml                     # PR verification (lint, typecheck, Vitest)
│       └── release.yml                # Automatic npm publish with provenance & GitHub releases
│
├── .gitignore
├── pnpm-workspace.yaml
├── package.json                       # Root workspace scripts (build, test, dev, lint)
├── LICENSE                            # MIT License
├── README.md                          # Comprehensive GitHub landing page
├── CONTRIBUTING.md                    # Open source contribution guide
└── CHECKLIST.md                       # Verification matrix
```

---

## 3. Technical Specifications

### A. Provider URL Engine
Supported providers and their standardized compose parameters:

| Provider | Compose URL Template | Notes |
| :--- | :--- | :--- |
| **Gmail** | `https://mail.google.com/mail/?view=cm&fs=1&to={to}&su={su}&body={body}` | Fullscreen compose window |
| **Outlook.com / 365** | `https://outlook.live.com/mail/0/deeplink/compose?to={to}&subject={su}&body={body}` | Universal Outlook deep link |
| **Yahoo Mail** | `https://compose.mail.yahoo.com/?to={to}&subj={su}&body={body}` | Yahoo web compose |
| **ProtonMail** | `https://mail.proton.me/u/0/composer?to={to}&subject={su}&body={body}` | Proton secure webmail |
| **Native `mailto:`** | `mailto:{to}?subject={su}&body={body}` | Standard system protocol handler |

### B. Device Detection Heuristics
```ts
export function isMobileOrTablet(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const hasTouch = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth < 1024;
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent.toLowerCase()
  );
  return isSmallScreen || isMobileUA || hasTouch;
}
```

### C. Popup Blocker Detection & Fallback
Browsers block `window.open` if not executed synchronously in response to a user click, or under strict privacy modes.
```ts
export function dispatchEmail(url: string, fallbackUrl?: string): { success: boolean; popupBlocked: boolean } {
  try {
    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      // Popup blocked -> execute fallback
      if (fallbackUrl) window.location.href = fallbackUrl;
      return { success: false, popupBlocked: true };
    }
    return { success: true, popupBlocked: false };
  } catch {
    if (fallbackUrl) window.location.href = fallbackUrl;
    return { success: false, popupBlocked: true };
  }
}
```

### D. Safe URL Length & Truncation Guard
URLs longer than 2,000 characters can crash or get truncated by browsers or webmail servers:
* If encoded URL `< 2,000` chars: Proceed directly to webmail compose.
* If encoded URL `>= 2,000` chars: Automatically copy the full formatted message to the user's clipboard and append a polite parameter: `body="[Message copied to your clipboard. Press Ctrl+V / Cmd+V to paste here]"` so no data is ever lost.

---

## 4. Testing Strategy (Vitest)
* **Unit Tests**:
  * Accurate parameter encoding (`encodeURIComponent` formatting, special characters, spaces, newlines).
  * Safe length truncation and fallback alerts.
  * Device detector emulation (simulating touch points, user agents, and window sizes).
  * Provider URL matching.
* **Component / Hook Tests**:
  * `useSmartMailto` state updates (`isCopied`, `isMobile`, active provider).
  * Component accessibility (`aria-expanded`, keyboard navigation `Escape`, `Enter`).

---

## 5. GitHub & Community Launch Strategy
1. **GitHub Repository Setup**:
   * Create public repository under `akm2006/smart-mailto`.
   * Add MIT License, badges, clean social preview banner, descriptive tags (`mailto`, `gmail`, `outlook`, `webmail`, `contact-form`, `react`, `typescript`).
2. **npm Publishing**:
   * Zero external dependencies.
   * Dual ESM/CJS exports via `tsup`.
   * Typescript `.d.ts` declaration generation.
3. **Community Traction**:
   * Submit to Hacker News (`Show HN: smart-mailto`).
   * Share on Reddit (`r/webdev`, `r/reactjs`, `r/nextjs`).
   * Highlight the death of `mailgo` as the core motivation for this modern replacement.
