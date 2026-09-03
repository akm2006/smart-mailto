export type EmailProvider = "gmail" | "outlook" | "yahoo" | "proton" | "mailto";

export type DeviceType = "mobile" | "tablet" | "desktop";

export interface TelemetryOptions {
  includeUrl?: boolean;
  includeTimestamp?: boolean;
  includeDevice?: boolean;
  customData?: Record<string, string | number | boolean>;
}

export interface SmartMailtoOptions {
  /**
   * Primary email recipient (e.g. "contact@company.com")
   */
  recipient: string;

  /**
   * Email subject line
   */
  subject?: string;

  /**
   * Email message body
   */
  body?: string;

  /**
   * Optional CC email address(es)
   */
  cc?: string | string[];

  /**
   * Optional BCC email address(es)
   */
  bcc?: string | string[];

  /**
   * Default provider to use on desktop when not specified. Defaults to 'gmail'
   */
  defaultProvider?: EmailProvider | "auto";

  /**
   * Whether to fallback to native mailto: on mobile devices. Defaults to true
   */
  fallbackToMailtoOnMobile?: boolean;

  /**
   * If true and popup is blocked by browser, automatically copy draft to clipboard. Defaults to true
   */
  copyOnPopupBlock?: boolean;

  /**
   * Maximum safe URL character limit for webmail query strings. Defaults to 2000
   */
  maxUrlLength?: number;

  /**
   * Attach context telemetry (e.g., source URL, local time) at the bottom of the email body
   */
  telemetry?: boolean | TelemetryOptions;
}

export interface DispatchResult {
  success: boolean;
  provider: EmailProvider;
  url: string;
  popupBlocked: boolean;
  bodyCopiedToClipboard: boolean;
  notice?: string;
  error?: string;
}

export interface ProviderMeta {
  id: EmailProvider;
  name: string;
  description: string;
  color: string;
  isWebmail: boolean;
}
