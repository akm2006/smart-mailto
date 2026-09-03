"use client";

import React from "react";
import type { EmailProvider, SmartMailtoOptions } from "../core/types";
import { useSmartMailto } from "./use-smart-mailto";

export interface SmartMailtoButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    SmartMailtoOptions {
  children?: React.ReactNode;
  provider?: EmailProvider;
  onDispatch?: (success: boolean) => void;
}

/**
 * Drop-in accessible button/link that intercepts clicks to run smart webmail dispatch.
 * Preserves semantic mailto: href for SEO and screen readers.
 */
export function SmartMailtoButton({
  children = "Contact via Email",
  recipient,
  subject,
  body,
  cc,
  bcc,
  defaultProvider,
  fallbackToMailtoOnMobile,
  copyOnPopupBlock,
  maxUrlLength,
  telemetry,
  provider,
  onDispatch,
  className = "",
  style,
  ...rest
}: SmartMailtoButtonProps) {
  const { send, providerUrls, isDispatching } = useSmartMailto({
    recipient,
    subject,
    body,
    cc,
    bcc,
    defaultProvider,
    fallbackToMailtoOnMobile,
    copyOnPopupBlock,
    maxUrlLength,
    telemetry,
  });

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const result = await send(provider);
    onDispatch?.(result.success);
  };

  return (
    <a
      href={providerUrls.mailto}
      onClick={handleClick}
      role="button"
      aria-busy={isDispatching}
      className={`smart-mailto-btn ${className}`.trim()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        textDecoration: "none",
        ...style,
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
