import { beforeEach, describe, expect, it, vi } from "vitest";
import { detectDeviceType, hasTouchCapability, isBrowser, isMobileOrTablet } from "../src/core/detector";

describe("Device Detection", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("isBrowser returns true in happy-dom environment", () => {
    expect(isBrowser()).toBe(true);
  });

  it("detects mobile when screen width < 768", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 390 });
    Object.defineProperty(navigator, "userAgent", {
      writable: true,
      configurable: true,
      value: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    });

    expect(isMobileOrTablet()).toBe(true);
    expect(detectDeviceType()).toBe("mobile");
  });

  it("detects tablet for iPad user agent", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 820 });
    Object.defineProperty(navigator, "userAgent", {
      writable: true,
      configurable: true,
      value: "Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X)",
    });

    expect(isMobileOrTablet()).toBe(true);
    expect(detectDeviceType()).toBe("tablet");
  });

  it("detects desktop when large screen without mobile UA", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1440 });
    Object.defineProperty(navigator, "userAgent", {
      writable: true,
      configurable: true,
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0",
    });
    Object.defineProperty(navigator, "maxTouchPoints", { writable: true, configurable: true, value: 0 });

    expect(isMobileOrTablet()).toBe(false);
    expect(detectDeviceType()).toBe("desktop");
  });

  it("hasTouchCapability returns true if maxTouchPoints > 0", () => {
    Object.defineProperty(navigator, "maxTouchPoints", { writable: true, configurable: true, value: 5 });
    expect(hasTouchCapability()).toBe(true);
  });
});
