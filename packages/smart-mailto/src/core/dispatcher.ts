import { copyToClipboard } from "./clipboard";
import { isBrowser, isMobileOrTablet } from "./detector";
import { generateProviderUrl } from "./providers";
import type { DispatchResult, EmailProvider, SmartMailtoOptions } from "./types";
import { checkUrlSafety, compileEmailBody } from "./url-guard";

/**
 * Dispatches an email action according to user options, target provider, and device environment.
 */
export async function dispatchSmartEmail(
  options: SmartMailtoOptions,
  explicitProvider?: EmailProvider
): Promise<DispatchResult> {
  if (!isBrowser()) {
    return {
      success: false,
      provider: explicitProvider || "mailto",
      url: "",
      popupBlocked: false,
      bodyCopiedToClipboard: false,
      error: "Cannot dispatch email in non-browser environment.",
    };
  }

  const isMobile = isMobileOrTablet();
  const fallbackToMailto = options.fallbackToMailtoOnMobile ?? true;

  // Determine provider
  let provider: EmailProvider;
  if (explicitProvider) {
    provider = explicitProvider;
  } else if (isMobile && fallbackToMailto) {
    provider = "mailto";
  } else if (options.defaultProvider && options.defaultProvider !== "auto") {
    provider = options.defaultProvider;
  } else {
    provider = "gmail";
  }

  let finalUrl = generateProviderUrl(provider, options);
  let bodyCopied = false;
  let customNotice: string | undefined;

  // ProtonMail does not accept external URL compose parameters due to client-side encryption.
  // We automatically copy the full message to clipboard so the user can paste directly.
  if (provider === "proton") {
    const fullBody = compileEmailBody(options);
    await copyToClipboard(fullBody);
    bodyCopied = true;
    customNotice = "ProtonMail's encryption prevents external pre-filled links. Draft copied to clipboard — paste (Ctrl+V / Cmd+V) to insert.";
  }

  // Yahoo Mail often returns HTTP 429 Too Many Requests if the user is unauthenticated or has tracking prevention.
  // We proactively copy the message to clipboard so nothing is ever lost.
  if (provider === "yahoo") {
    const fullBody = compileEmailBody(options);
    await copyToClipboard(fullBody);
    bodyCopied = true;
    customNotice = "Draft copied to clipboard. (Note: If Yahoo rate-limits, log into Yahoo first or paste into your client).";
  }

  // URL length guard for webmail URLs
  if (provider !== "mailto" && provider !== "proton") {
    const safety = checkUrlSafety(finalUrl, options.maxUrlLength);
    if (!safety.isSafeLength) {
      // Message is too long for safe GET URL: copy full body to clipboard and use safe notice in URL
      const fullBody = compileEmailBody(options);
      await copyToClipboard(fullBody);
      bodyCopied = true;
      customNotice = "Message exceeded safe URL limit: draft copied to clipboard!";

      const safeOptions: SmartMailtoOptions = {
        ...options,
        body: safety.fallbackBodyNotice,
      };
      finalUrl = generateProviderUrl(provider, safeOptions);
    }
  }

  // Native mailto route
  if (provider === "mailto") {
    try {
      window.location.href = finalUrl;
      return {
        success: true,
        provider,
        url: finalUrl,
        popupBlocked: false,
        bodyCopiedToClipboard: bodyCopied,
      };
    } catch (err) {
      return {
        success: false,
        provider,
        url: finalUrl,
        popupBlocked: false,
        bodyCopiedToClipboard: bodyCopied,
        error: String(err),
      };
    }
  }

  // Desktop webmail route (opens new tab with popup blocker detection)
  let popupBlocked = false;
  try {
    const popup = window.open(finalUrl, "_blank", "noopener,noreferrer");

    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      popupBlocked = true;
    }
  } catch {
    popupBlocked = true;
  }

  if (popupBlocked) {
    // Popup was blocked by browser
    if (options.copyOnPopupBlock !== false && !bodyCopied) {
      const fullBody = compileEmailBody(options);
      await copyToClipboard(fullBody);
      bodyCopied = true;
    }

    // Fallback: trigger native mailto
    const mailtoUrl = generateProviderUrl("mailto", options);
    try {
      window.location.href = mailtoUrl;
    } catch {
      // Silent catch
    }

    return {
      success: false,
      provider,
      url: finalUrl,
      popupBlocked: true,
      bodyCopiedToClipboard: bodyCopied,
      error: "Browser blocked the webmail popup window. Fallback mailto triggered.",
    };
  }

  return {
    success: true,
    provider,
    url: finalUrl,
    popupBlocked: false,
    bodyCopiedToClipboard: bodyCopied,
    notice: customNotice,
  };
}
