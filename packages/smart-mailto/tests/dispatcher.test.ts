import { beforeEach, describe, expect, it, vi } from "vitest";
import { dispatchSmartEmail } from "../src/core/dispatcher";

describe("Smart Email Dispatcher", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("dispatches to native mailto when on mobile", async () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 375 });
    Object.defineProperty(navigator, "userAgent", {
      writable: true,
      configurable: true,
      value: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    });

    const result = await dispatchSmartEmail({
      recipient: "mobile@test.com",
      subject: "Mobile Test",
    });

    expect(result.provider).toBe("mailto");
    expect(result.url).toContain("mailto:mobile%40test.com");
  });

  it("dispatches to Gmail on desktop by default", async () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1440 });
    Object.defineProperty(navigator, "userAgent", {
      writable: true,
      configurable: true,
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    });
    Object.defineProperty(navigator, "maxTouchPoints", { writable: true, configurable: true, value: 0 });

    const mockOpen = vi.fn().mockReturnValue({ closed: false });
    window.open = mockOpen;

    const result = await dispatchSmartEmail({
      recipient: "desktop@test.com",
      subject: "Desktop Test",
    });

    expect(result.provider).toBe("gmail");
    expect(mockOpen).toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.popupBlocked).toBe(false);
  });

  it("detects blocked popups and triggers mailto fallback", async () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1440 });
    Object.defineProperty(navigator, "userAgent", {
      writable: true,
      configurable: true,
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    });
    Object.defineProperty(navigator, "maxTouchPoints", { writable: true, configurable: true, value: 0 });

    // Simulate popup blocker returning null
    window.open = vi.fn().mockReturnValue(null);

    const result = await dispatchSmartEmail({
      recipient: "blocked@test.com",
      subject: "Blocked Popup",
    });

    expect(result.popupBlocked).toBe(true);
    expect(result.success).toBe(false);
  });

  it("honors explicitProvider override", async () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1440 });
    window.open = vi.fn().mockReturnValue({ closed: false });

    const result = await dispatchSmartEmail(
      { recipient: "test@test.com", subject: "Override" },
      "outlook"
    );

    expect(result.provider).toBe("outlook");
    expect(result.url).toContain("outlook.live.com");
  });

  it("handles ProtonMail by auto-copying message and opening mail.proton.me", async () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1440 });
    const mockOpen = vi.fn().mockReturnValue({ closed: false });
    window.open = mockOpen;

    const result = await dispatchSmartEmail(
      { recipient: "secure@proton.me", subject: "Confidential", body: "Top secret content" },
      "proton"
    );

    expect(result.provider).toBe("proton");
    expect(result.url).toBe("https://mail.proton.me/");
    expect(result.bodyCopiedToClipboard).toBe(true);
    expect(result.notice).toContain("ProtonMail's encryption");
  });

  it("handles Yahoo Mail by copying message as backup and generating compose URL", async () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1440 });
    const mockOpen = vi.fn().mockReturnValue({ closed: false });
    window.open = mockOpen;

    const result = await dispatchSmartEmail(
      { recipient: "user@yahoo.com", subject: "Inquiry", body: "Hello Yahoo" },
      "yahoo"
    );

    expect(result.provider).toBe("yahoo");
    expect(result.url).toContain("compose.mail.yahoo.com");
    expect(result.bodyCopiedToClipboard).toBe(true);
    expect(result.notice).toContain("Draft copied to clipboard");
  });
});
