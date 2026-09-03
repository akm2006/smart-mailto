import { describe, expect, it } from "vitest";
import { checkUrlSafety, compileEmailBody } from "../src/core/url-guard";

describe("URL Guard & Safety", () => {
  it("compiles email body without telemetry when disabled", () => {
    const body = compileEmailBody({ recipient: "test@example.com", body: "Simple message" });
    expect(body).toBe("Simple message");
  });

  it("appends context telemetry when enabled", () => {
    const body = compileEmailBody({
      recipient: "test@example.com",
      body: "Inquiry details",
      telemetry: {
        customData: {
          Plan: "Enterprise",
          Referral: "ProductHunt",
        },
      },
    });

    expect(body).toContain("Inquiry details");
    expect(body).toContain("Context Telemetry:");
    expect(body).toContain("Plan: Enterprise");
    expect(body).toContain("Referral: ProductHunt");
  });

  it("flags URLs under safe limit as safe", () => {
    const shortUrl = "https://mail.google.com/mail/?view=cm&to=test@test.com&su=Hello";
    const check = checkUrlSafety(shortUrl, 2000);
    expect(check.isSafeLength).toBe(true);
    expect(check.length).toBe(shortUrl.length);
  });

  it("flags URLs over limit as unsafe and provides fallback notice", () => {
    const longString = "A".repeat(2500);
    const longUrl = `https://mail.google.com/mail/?view=cm&body=${longString}`;
    const check = checkUrlSafety(longUrl, 2000);
    expect(check.isSafeLength).toBe(false);
    expect(check.fallbackBodyNotice).toContain("copied to your clipboard");
  });
});
