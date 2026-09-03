# smart-mailto

> **The zero-dependency, zero-backend smart email dispatcher for modern web apps.**  
> Intelligently deep-links directly to Gmail, Outlook, Yahoo, and Proton webmail on desktop, with native `mailto:` fallback on mobile.

[![npm version](https://img.shields.io/npm/v/smart-mailto.svg?style=flat-square&color=10b981)](https://www.npmjs.com/package/smart-mailto)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/smart-mailto?style=flat-square&color=06b6d4)](https://bundlephobia.com/package/smart-mailto)
[![Tests](https://img.shields.io/badge/tests-26%20passed-10b981?style=flat-square)](https://github.com/akm2006/smart-mailto)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/akm2006/smart-mailto/blob/main/LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg?style=flat-square)](https://www.npmjs.com/package/smart-mailto)

---

## ⚡ Why `smart-mailto`?

* ❌ **Standard `mailto:` is broken on desktop**: Clicking `mailto:` triggers unconfigured native mail apps (Apple Mail, Windows Mail), leading to dead-ends and 40%+ lost leads.
* ⚠️ **Backend contact forms are heavy**: Setting up contact forms requires servers, databases, SMTP relays (Resend, SendGrid), and spam captchas.
* 💀 **`mailgo` is dead**: The older alternative (`mailgo`, 3,200+ GitHub stars) was officially **archived and deprecated in January 2024**.
* ✅ **`smart-mailto` fixes this**: Zero backend, < 2 kB gzipped, automatically launches Gmail / Outlook / Yahoo / Proton webmail compose tabs on desktop, and falls back to native mail apps on mobile!

---

## 📦 Installation

```bash
# pnpm
pnpm add smart-mailto

# npm
npm install smart-mailto

# yarn / bun
yarn add smart-mailto
```

---

## 🚀 Quickstart

### 1. Pure TypeScript / JavaScript (Zero Frameworks)

```ts
import { dispatchSmartEmail } from "smart-mailto";

// Automatically opens Gmail compose tab on desktop, or native mail app on mobile!
await dispatchSmartEmail({
  recipient: "contact@company.com",
  subject: "Partnership Inquiry",
  body: "Hi! I would love to explore collaborating on...",
});
```

---

### 2. Headless React Hook (`useSmartMailto`)

Build any 100% custom UI (Tailwind, shadcn/ui, Radix, Mantine):

```tsx
import { useSmartMailto } from "smart-mailto/react";

export function ContactButton() {
  const { send, isCopied, copyAddress, isDispatching } = useSmartMailto({
    recipient: "sales@company.com",
    subject: "Product Inquiry",
    body: "Here are my questions regarding the enterprise plan...",
    telemetry: true, // Automatically appends source page URL & timestamp
  });

  return (
    <div className="flex gap-2">
      <button onClick={() => send()} disabled={isDispatching}>
        {isDispatching ? "Opening..." : "Email Us (Smart Dispatch)"}
      </button>

      <button onClick={copyAddress}>
        {isCopied ? "Copied!" : "Copy Email"}
      </button>
    </div>
  );
}
```

---

### 3. Drop-in React Components

#### `<SmartMailtoButton />` (Progressive Enhancement)
```tsx
import { SmartMailtoButton } from "smart-mailto/react";

<SmartMailtoButton
  recipient="hello@company.com"
  subject="General Inquiry"
  className="btn-primary"
>
  Send an Email
</SmartMailtoButton>
```

#### `<SmartMailtoMenu />` (Multi-Provider Dropdown)
```tsx
import { SmartMailtoMenu } from "smart-mailto/react";

<SmartMailtoMenu
  recipient="support@company.com"
  subject="Help Needed"
  triggerLabel="Contact Support"
  theme="dark" // "dark" | "light"
/>
```

#### `<SmartMailtoModal />` (Plug-and-Play Contact Dialog)
```tsx
import { useState } from "react";
import { SmartMailtoModal } from "smart-mailto/react";

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Contact Form</button>

      <SmartMailtoModal
        isOpen={open}
        onClose={() => setOpen(false)}
        recipient="contact@company.com"
        title="Get in Touch"
        theme="dark" // "dark" | "light"
      />
    </>
  );
}
```

---

## 🛠️ API Reference

### `SmartMailtoOptions`

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `recipient` | `string` | *(Required)* | Destination email address (`"team@acme.com"`). |
| `subject` | `string` | `""` | Pre-filled email subject. |
| `body` | `string` | `""` | Pre-filled email body. |
| `cc` | `string \| string[]` | `undefined` | CC recipient(s). |
| `bcc` | `string \| string[]` | `undefined` | BCC recipient(s). |
| `defaultProvider` | `EmailProvider \| "auto"` | `"gmail"` | Preferred webmail provider for desktop. |
| `fallbackToMailtoOnMobile` | `boolean` | `true` | Routes to native `mailto:` on touch/mobile devices. |
| `copyOnPopupBlock` | `boolean` | `true` | Auto-copies body to clipboard if browser blocks popup. |
| `maxUrlLength` | `number` | `2000` | Safe URL length limit to prevent 414 HTTP crashes. |
| `telemetry` | `boolean \| TelemetryOptions` | `false` | Attaches current URL, timestamp, and device metadata. |

---

## 📄 License

MIT © [Akash (akm2006)](https://github.com/akm2006)
