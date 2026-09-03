import { describe, expect, it } from "vitest";
import { generateProviderUrl, getAllProviderUrls, PROVIDERS_META } from "../src/core/providers";
import type { SmartMailtoOptions } from "../src/core/types";

describe("Webmail Provider URL Generation", () => {
  const baseOptions: SmartMailtoOptions = {
    recipient: "hello@company.com",
    subject: "Partnership & Inquiry",
    body: "Line 1: Hello!\nLine 2: Ready to connect?",
  };

  it("generates correct Gmail compose deep link", () => {
    const url = generateProviderUrl("gmail", baseOptions);
    expect(url).toContain("https://mail.google.com/mail/?view=cm&fs=1&to=hello%40company.com");
    expect(url).toContain("su=Partnership%20%26%20Inquiry");
    expect(url).toContain("body=Line%201%3A%20Hello!%0ALine%202%3A%20Ready%20to%20connect%3F");
  });

  it("generates correct Outlook deep link", () => {
    const url = generateProviderUrl("outlook", baseOptions);
    expect(url).toContain("https://outlook.live.com/mail/0/deeplink/compose?to=hello%40company.com");
    expect(url).toContain("subject=Partnership%20%26%20Inquiry");
    expect(url).toContain("body=");
  });

  it("generates correct Yahoo Mail deep link", () => {
    const url = generateProviderUrl("yahoo", baseOptions);
    expect(url).toContain("https://compose.mail.yahoo.com/?to=hello%40company.com");
    expect(url).toContain("subject=Partnership%20%26%20Inquiry");
  });

  it("generates correct ProtonMail clean webmail URL", () => {
    const url = generateProviderUrl("proton", baseOptions);
    expect(url).toBe("https://mail.proton.me/");
  });

  it("generates valid mailto: link with query parameters", () => {
    const url = generateProviderUrl("mailto", baseOptions);
    expect(url).toBe(
      "mailto:hello%40company.com?subject=Partnership%20%26%20Inquiry&body=Line%201%3A%20Hello!%0ALine%202%3A%20Ready%20to%20connect%3F"
    );
  });

  it("correctly handles CC and BCC addresses", () => {
    const optionsWithCc: SmartMailtoOptions = {
      ...baseOptions,
      cc: ["team@company.com", "lead@company.com"],
      bcc: "audit@company.com",
    };

    const gmailUrl = generateProviderUrl("gmail", optionsWithCc);
    expect(gmailUrl).toContain("cc=team%40company.com%2Clead%40company.com");
    expect(gmailUrl).toContain("bcc=audit%40company.com");

    const mailtoUrl = generateProviderUrl("mailto", optionsWithCc);
    expect(mailtoUrl).toContain("cc=team%40company.com%2Clead%40company.com");
    expect(mailtoUrl).toContain("bcc=audit%40company.com");
  });

  it("getAllProviderUrls returns valid URLs for all 5 providers", () => {
    const urls = getAllProviderUrls(baseOptions);
    expect(urls.gmail).toBeDefined();
    expect(urls.outlook).toBeDefined();
    expect(urls.yahoo).toBeDefined();
    expect(urls.proton).toBeDefined();
    expect(urls.mailto).toBeDefined();
  });

  it("PROVIDERS_META has complete metadata for all providers", () => {
    const providers = ["gmail", "outlook", "yahoo", "proton", "mailto"] as const;
    for (const p of providers) {
      expect(PROVIDERS_META[p].id).toBe(p);
      expect(PROVIDERS_META[p].name).toBeTruthy();
      expect(PROVIDERS_META[p].color).toMatch(/^#/);
    }
  });
});
