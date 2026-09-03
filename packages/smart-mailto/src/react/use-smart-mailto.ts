"use client";

import { useEffect, useMemo, useState } from "react";
import { copyToClipboard } from "../core/clipboard";
import { detectDeviceType, isMobileOrTablet } from "../core/detector";
import { dispatchSmartEmail } from "../core/dispatcher";
import { getAllProviderUrls } from "../core/providers";
import type {
  DeviceType,
  DispatchResult,
  EmailProvider,
  SmartMailtoOptions,
} from "../core/types";
import { compileEmailBody } from "../core/url-guard";

export interface UseSmartMailtoReturn {
  /**
   * Dispatches the email to the chosen provider (or default based on device).
   */
  send: (explicitProvider?: EmailProvider) => Promise<DispatchResult>;

  /**
   * Copies the recipient email address to clipboard.
   */
  copyAddress: () => Promise<boolean>;

  /**
   * Copies the formatted draft body to clipboard.
   */
  copyDraft: () => Promise<boolean>;

  /**
   * Pre-computed deep link URLs for all supported providers.
   */
  providerUrls: Record<EmailProvider, string>;

  /**
   * True if the user is on mobile or tablet.
   */
  isMobile: boolean;

  /**
   * Detected device category: 'mobile' | 'tablet' | 'desktop'.
   */
  deviceType: DeviceType;

  /**
   * True for 2 seconds after any successful clipboard copy.
   */
  isCopied: boolean;

  /**
   * True while a dispatch operation is executing.
   */
  isDispatching: boolean;

  /**
   * Outcome of the most recent dispatch operation.
   */
  lastResult: DispatchResult | null;
}

/**
 * Headless React hook for zero-dependency smart email dispatching.
 */
export function useSmartMailto(options: SmartMailtoOptions): UseSmartMailtoReturn {
  const [isCopied, setIsCopied] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);
  const [lastResult, setLastResult] = useState<DispatchResult | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  // SSR-safe client device detection
  useEffect(() => {
    setIsMobile(isMobileOrTablet());
    setDeviceType(detectDeviceType());
  }, []);

  // Provider URLs memoized against options
  const providerUrls = useMemo(() => {
    return getAllProviderUrls(options);
  }, [
    options.recipient,
    options.subject,
    options.body,
    options.cc,
    options.bcc,
    options.telemetry,
  ]);

  const setCopiedTemporary = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const copyAddress = async (): Promise<boolean> => {
    const success = await copyToClipboard(options.recipient);
    if (success) setCopiedTemporary();
    return success;
  };

  const copyDraft = async (): Promise<boolean> => {
    const body = compileEmailBody(options);
    const success = await copyToClipboard(body);
    if (success) setCopiedTemporary();
    return success;
  };

  const send = async (explicitProvider?: EmailProvider): Promise<DispatchResult> => {
    setIsDispatching(true);
    try {
      const result = await dispatchSmartEmail(options, explicitProvider);
      setLastResult(result);
      if (result.bodyCopiedToClipboard) {
        setCopiedTemporary();
      }
      return result;
    } finally {
      setIsDispatching(false);
    }
  };

  return {
    send,
    copyAddress,
    copyDraft,
    providerUrls,
    isMobile,
    deviceType,
    isCopied,
    isDispatching,
    lastResult,
  };
}
