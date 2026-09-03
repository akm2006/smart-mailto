import type { EmailProvider, ProviderMeta, SmartMailtoOptions } from "./types";
import { compileEmailBody } from "./url-guard";

/**
 * Metadata for supported email providers.
 */
export const PROVIDERS_META: Record<EmailProvider, ProviderMeta> = {
  gmail: {
    id: "gmail",
    name: "Gmail",
    description: "Open in Google Gmail webmail",
    color: "#EA4335",
    isWebmail: true,
  },
  outlook: {
    id: "outlook",
    name: "Outlook / 365",
    description: "Open in Microsoft Outlook or Office 365",
    color: "#0078D4",
    isWebmail: true,
  },
  yahoo: {
    id: "yahoo",
    name: "Yahoo Mail",
    description: "Open in Yahoo Mail (with clipboard backup)",
    color: "#6001D2",
    isWebmail: true,
  },
  proton: {
    id: "proton",
    name: "ProtonMail",
    description: "Open in ProtonMail (auto-copies draft to clipboard)",
    color: "#6D4AFF",
    isWebmail: true,
  },
  mailto: {
    id: "mailto",
    name: "Default Mail App",
    description: "Open in your device's native mail client",
    color: "#64748B",
    isWebmail: false,
  },
};

function formatAddressList(addresses?: string | string[]): string {
  if (!addresses) return "";
  return Array.isArray(addresses) ? addresses.join(",") : addresses;
}

/**
 * Generates the direct compose deep link for a specific email provider.
 */
export function generateProviderUrl(
  provider: EmailProvider,
  options: SmartMailtoOptions
): string {
  const { recipient, subject = "" } = options;
  const body = compileEmailBody(options);

  const encRecipient = encodeURIComponent(recipient.trim());
  const encSubject = encodeURIComponent(subject);
  const encBody = encodeURIComponent(body);

  const ccStr = formatAddressList(options.cc);
  const bccStr = formatAddressList(options.bcc);

  switch (provider) {
    case "gmail": {
      let url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encRecipient}`;
      if (encSubject) url += `&su=${encSubject}`;
      if (encBody) url += `&body=${encBody}`;
      if (ccStr) url += `&cc=${encodeURIComponent(ccStr)}`;
      if (bccStr) url += `&bcc=${encodeURIComponent(bccStr)}`;
      return url;
    }

    case "outlook": {
      let url = `https://outlook.live.com/mail/0/deeplink/compose?to=${encRecipient}`;
      if (encSubject) url += `&subject=${encSubject}`;
      if (encBody) url += `&body=${encBody}`;
      if (ccStr) url += `&cc=${encodeURIComponent(ccStr)}`;
      if (bccStr) url += `&bcc=${encodeURIComponent(bccStr)}`;
      return url;
    }

    case "yahoo": {
      let url = `https://compose.mail.yahoo.com/?to=${encRecipient}`;
      if (encSubject) url += `&subject=${encSubject}`;
      if (encBody) url += `&body=${encBody}`;
      if (ccStr) url += `&cc=${encodeURIComponent(ccStr)}`;
      if (bccStr) url += `&bcc=${encodeURIComponent(bccStr)}`;
      return url;
    }

    case "proton": {
      // ProtonMail's client-side encryption architecture does not accept external URL compose parameters.
      // We route to ProtonMail web client directly, while the dispatcher copies the draft to clipboard.
      return "https://mail.proton.me/";
    }

    case "mailto":
    default: {
      const queryParts: string[] = [];
      if (encSubject) queryParts.push(`subject=${encSubject}`);
      if (encBody) queryParts.push(`body=${encBody}`);
      if (ccStr) queryParts.push(`cc=${encodeURIComponent(ccStr)}`);
      if (bccStr) queryParts.push(`bcc=${encodeURIComponent(bccStr)}`);

      const queryString = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
      return `mailto:${encRecipient}${queryString}`;
    }
  }
}

/**
 * Returns an object with deep link URLs for all supported providers.
 */
export function getAllProviderUrls(
  options: SmartMailtoOptions
): Record<EmailProvider, string> {
  return {
    gmail: generateProviderUrl("gmail", options),
    outlook: generateProviderUrl("outlook", options),
    yahoo: generateProviderUrl("yahoo", options),
    proton: generateProviderUrl("proton", options),
    mailto: generateProviderUrl("mailto", options),
  };
}
