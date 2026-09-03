import { isBrowser } from "./detector";

/**
 * Copies the given text to the user's system clipboard.
 * Uses modern Clipboard API when available with a seamless fallback for older browsers.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isBrowser() || !text) return false;

  // Modern Clipboard API
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // If permission denied or insecure context, fallback to execCommand below
    }
  }

  // Fallback for non-HTTPS or legacy environments
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    textArea.style.opacity = "0";
    textArea.setAttribute("readonly", "");
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textArea);
    return success;
  } catch {
    return false;
  }
}
