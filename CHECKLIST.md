# `smart-mailto` — Verification & Release Checklist

This checklist tracks the implementation, quality assurance, documentation, and release readiness of the `smart-mailto` open-source project.

---

## 1. Project Initialization & Tooling
- [x] Root monorepo configured with `pnpm-workspace.yaml`.
- [x] Core package workspace established under `packages/smart-mailto`.
- [x] Demo showcase web app workspace established under `apps/web`.
- [x] TypeScript configuration (`tsconfig.base.json`) supporting strict mode, modern ES modules, and DOM types.
- [x] `tsup` configured for dual output: ESM (`dist/index.js`), CJS (`dist/index.cjs`), and declarations (`dist/index.d.ts`).
- [x] Testing framework configured with `vitest` and `@testing-library/react`.
- [x] Git repository initialized with `.gitignore` covering `node_modules`, `dist`, `.turbo`, `.next`, etc.

---

## 2. Core Engine Implementation (`packages/smart-mailto`)
- [x] **Device Detection (`isMobileOrTablet`)**:
  - [x] Touch capability heuristic (`pointer: coarse`, `maxTouchPoints`).
  - [x] Viewport width check (< 1024px).
  - [x] User-Agent regex matching mobile platforms (`Android`, `iPhone`, `iPad`, etc.).
  - [x] SSR and hydration safe (guards against `window` / `navigator` being undefined).
- [x] **Multi-Provider Webmail Generators**:
  - [x] Gmail deep-linking (`https://mail.google.com/mail/?view=cm&fs=1...`).
  - [x] Outlook / Office 365 deep-linking (`https://outlook.live.com/mail/0/deeplink/compose...`).
  - [x] Yahoo Mail deep-linking (`https://compose.mail.yahoo.com/...`).
  - [x] ProtonMail deep-linking (`https://mail.proton.me/u/0/composer...`).
  - [x] Native `mailto:` fallback string generator.
  - [x] Robust query string parameter encoding (`encodeURIComponent` for to, subject, body, cc, bcc).
- [x] **Safe URL Length & Truncation Guard**:
  - [x] Detects when encoded compose URLs exceed safe browser limit (~2,000 characters).
  - [x] Gracefully copies body to clipboard and loads a placeholder notice in webmail to prevent `414 URI Too Long` crashes.
- [x] **Popup Blocker Detection & Dispatcher**:
  - [x] `window.open` execution with `noopener,noreferrer`.
  - [x] Blocker detection check (`!popup || popup.closed`).
  - [x] Automatic fallback to location redirect or native mailto on blocked popup.
- [x] **Clipboard Helper**:
  - [x] Modern `navigator.clipboard.writeText` implementation.
  - [x] `document.execCommand('copy')` fallback for legacy/restricted browser environments.
  - [x] Visual state tracking (`isCopied` timeout).

---

## 3. React Integration & Components
- [x] **Headless Hook (`useSmartMailto`)**:
  - [x] Exports `send(provider?)`, `copyAddress()`, `copyDraft()`, `isMobile`, `isCopied`.
  - [x] Dynamic recipient, subject, and body interpolation.
  - [x] Lead context generator helper (appends current page URL, timestamp, user device).
- [x] **`<SmartMailtoButton />`**:
  - [x] Accessible button/anchor progressive enhancement.
  - [x] Zero styling lock-in (clean default styles with full custom className support).
- [x] **`<SmartMailtoMenu />`**:
  - [x] Dropdown menu allowing users to select Gmail, Outlook, Yahoo, Proton, Native, or Copy.
  - [x] Full keyboard navigation (`Escape`, outside click listener).
- [x] **`<SmartMailtoModal />`**:
  - [x] Drop-in contact dialog with name, email, company, purpose, and question fields.
  - [x] Smooth dialog transitions, backdrop overlay, body scroll lock, and ESC key listener.

---

## 4. Quality Assurance & Automated Tests
- [x] Provider URL unit tests pass (correct parameters, special character preservation) — **8/8 passed**.
- [x] Device detection unit tests pass under simulated desktop, tablet, and mobile environments — **5/5 passed**.
- [x] Safe URL length guard tests pass (under 2,000 chars vs over 2,000 chars) — **4/4 passed**.
- [x] Clipboard fallback tests pass under standard and restricted clipboard mocks — **3/3 passed**.
- [x] Dispatcher tests pass with popup blocker recovery — **4/4 passed**.
- [x] Total automated tests: **24/24 passed**.
- [x] TypeScript typecheck passes with 0 errors (`pnpm typecheck`).
- [x] Bundle build passes (`pnpm build`) with dual ESM + CJS + DTS outputs generated.

---

## 5. Showcase Web App (`apps/web`)
- [x] Modern, high-converting landing page with clean dark theme.
- [x] **Live Interactive Playground**:
  - [x] Form to input recipient, subject, body.
  - [x] Real-time button to dispatch email directly into the user's webmail.
  - [x] Live log inspector showing provider, URL generated, and clipboard status.
- [x] **Device Simulator Mode**:
  - [x] Interactive toggle switch between "Desktop (Webmail)" and "Mobile (mailto:)" preview.
- [x] **Comparison Table**:
  - [x] 8-row breakdown comparing traditional mailto, backend forms, and smart-mailto.
- [x] **Dynamic Code Generator**:
  - [x] Interactive tabs showing copy-pasteable React Hook, Button/Menu, Modal, and Vanilla JS snippets.
- [x] **Live Deployment Ready**:
  - [x] Production build passes with Vite in 6.47s.

---

## 6. Open-Source Polish & GitHub Verification
- [x] **`README.md` (Root & Package)**:
  - [x] Badges: npm version, bundle size (< 2 kB), license (MIT), GitHub stars.
  - [x] Visual comparison table (`mailto:` vs backend vs `smart-mailto`).
  - [x] 30-second quickstart guide.
  - [x] Comprehensive API reference table.
  - [x] Monorepo workspace commands.
- [x] **Repository Governance**:
  - [x] `LICENSE` (MIT License with author attribution).
  - [x] `CONTRIBUTING.md` with PR guidelines and development setup.
  - [x] `.github/workflows/ci.yml` for automated GitHub Actions testing on pull requests.
- [ ] **Manual User Verification (Pending user review before push)**:
  - [ ] User verifies files and live showcase.
  - [ ] Push to public GitHub repo on user confirmation (`gh repo create akm2006/smart-mailto --public`).
