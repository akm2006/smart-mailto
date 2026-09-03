import type { DeviceType } from "./types";

/**
 * Checks whether the execution environment is running in a browser.
 * Safe for Next.js SSR, Remix, Astro, and Node.js.
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof navigator !== "undefined";
}

/**
 * Checks if the current environment has touch screen capabilities.
 */
export function hasTouchCapability(): boolean {
  if (!isBrowser()) return false;

  try {
    return (
      (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
      // Legacy touch check
      "ontouchstart" in window
    );
  } catch {
    return false;
  }
}

/**
 * Detects whether the user is on a mobile or tablet device.
 * Employs a multi-heuristic strategy: screen width + user agent + touch pointer.
 */
export function isMobileOrTablet(): boolean {
  if (!isBrowser()) return false;

  const isSmallScreen = window.innerWidth < 1024;
  const touch = hasTouchCapability();

  const ua = (navigator.userAgent || "").toLowerCase();
  const isMobileUA =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(
      ua
    );

  // iPads on modern iOS report MacIntel in UA, but have maxTouchPoints > 1
  const isIPadOS =
    /macintosh/i.test(ua) &&
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1;

  return isSmallScreen || isMobileUA || isIPadOS || (touch && isSmallScreen);
}

/**
 * Classifies the client into "mobile", "tablet", or "desktop".
 */
export function detectDeviceType(): DeviceType {
  if (!isBrowser()) return "desktop";

  const width = window.innerWidth;
  const ua = (navigator.userAgent || "").toLowerCase();

  const isTabletUA = /ipad|tablet|(android(?!.*mobile))/i.test(ua);
  const isIPadOS =
    /macintosh/i.test(ua) &&
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1;

  if (isTabletUA || isIPadOS || (width >= 768 && width < 1024 && hasTouchCapability())) {
    return "tablet";
  }

  if (width < 768 || /iphone|ipod|android.*mobile|blackberry|iemobile/i.test(ua)) {
    return "mobile";
  }

  return "desktop";
}
