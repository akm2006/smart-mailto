import { isBrowser } from "./detector";
import type { SmartMailtoOptions, TelemetryOptions } from "./types";

const SAFE_MAX_URL_LENGTH = 2000;

/**
 * Builds optional context telemetry to append to the email body.
 */
export function buildTelemetryString(options?: boolean | TelemetryOptions): string {
  if (!options || !isBrowser()) return "";

  const config = typeof options === "object" ? options : {};
  const includeUrl = config.includeUrl ?? true;
  const includeTimestamp = config.includeTimestamp ?? true;
  const includeDevice = config.includeDevice ?? true;

  const lines: string[] = [];

  if (includeTimestamp) {
    lines.push(`Sent: ${new Date().toLocaleString()}`);
  }
  if (includeUrl && window.location?.href) {
    lines.push(`Page: ${window.location.href}`);
  }
  if (includeDevice && navigator?.userAgent) {
    lines.push(`Device: ${navigator.userAgent.slice(0, 80)}...`);
  }
  if (config.customData) {
    for (const [key, value] of Object.entries(config.customData)) {
      lines.push(`${key}: ${value}`);
    }
  }

  if (lines.length === 0) return "";

  return `\n\n---\nContext Telemetry:\n${lines.join("\n")}`;
}

/**
 * Compiles the final body text including optional telemetry.
 */
export function compileEmailBody(options: SmartMailtoOptions): string {
  const baseBody = options.body ?? "";
  const telemetry = buildTelemetryString(options.telemetry);
  return `${baseBody}${telemetry}`.trim();
}

export interface UrlSafetyCheck {
  isSafeLength: boolean;
  length: number;
  maxAllowed: number;
  fallbackBodyNotice: string;
}

/**
 * Evaluates whether a generated webmail URL is within safe browser URL length constraints.
 * If too long, returns a safe fallback notice to be inserted in the URL, while the full body is copied.
 */
export function checkUrlSafety(
  url: string,
  maxAllowed: number = SAFE_MAX_URL_LENGTH
): UrlSafetyCheck {
  const length = url.length;
  const isSafeLength = length <= maxAllowed;

  return {
    isSafeLength,
    length,
    maxAllowed,
    fallbackBodyNotice:
      "[Notice: Full inquiry details were copied to your clipboard. Please paste (Ctrl+V / Cmd+V) to insert your message.]",
  };
}
