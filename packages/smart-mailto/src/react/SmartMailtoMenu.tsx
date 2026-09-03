"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROVIDERS_META } from "../core/providers";
import type { EmailProvider, ProviderMeta, SmartMailtoOptions } from "../core/types";
import { useSmartMailto } from "./use-smart-mailto";

export interface SmartMailtoMenuProps extends SmartMailtoOptions {
  triggerLabel?: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
  showCopyOption?: boolean;
  theme?: "dark" | "light";
  style?: React.CSSProperties;
  triggerStyle?: React.CSSProperties;
  menuStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  /**
   * Custom render function for the menu trigger button.
   */
  renderTrigger?: (props: {
    isOpen: boolean;
    toggle: () => void;
    isCopied: boolean;
  }) => React.ReactNode;
  /**
   * Custom render function for individual provider menu items.
   */
  renderItem?: (props: {
    provider: EmailProvider;
    meta: ProviderMeta;
    onClick: () => void;
  }) => React.ReactNode;
}

const ORDERED_PROVIDERS: EmailProvider[] = [
  "gmail",
  "outlook",
  "proton",
  "yahoo",
  "mailto",
];

export function SmartMailtoMenu({
  triggerLabel = "Email Us",
  className = "",
  triggerClassName = "",
  menuClassName = "",
  itemClassName = "",
  showCopyOption = true,
  theme = "light",
  style,
  triggerStyle,
  menuStyle,
  itemStyle,
  renderTrigger,
  renderItem,
  ...options
}: SmartMailtoMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { send, copyAddress, isCopied } = useSmartMailto(options);
  const isDark = theme === "dark";

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleProviderClick = (provider: EmailProvider) => {
    send(provider);
    setIsOpen(false);
  };

  const defaultTrigger = (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      aria-haspopup="true"
      aria-expanded={isOpen}
      className={`smart-mailto-trigger ${triggerClassName}`.trim()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        borderRadius: "8px",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #e2e8f0",
        backgroundColor: isDark ? "#121318" : "#ffffff",
        color: isDark ? "#ffffff" : "#0f172a",
        fontSize: "14px",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.15s ease",
        ...triggerStyle,
      }}
    >
      <span>{triggerLabel}</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
        }}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );

  return (
    <div
      ref={menuRef}
      className={`smart-mailto-menu-container ${className}`.trim()}
      style={{ position: "relative", display: "inline-block", ...style }}
    >
      {renderTrigger
        ? renderTrigger({ isOpen, toggle: () => setIsOpen(!isOpen), isCopied })
        : defaultTrigger}

      {isOpen && (
        <div
          role="menu"
          className={`smart-mailto-dropdown ${menuClassName}`.trim()}
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 9999,
            minWidth: "220px",
            backgroundColor: isDark ? "#0d0e12" : "#ffffff",
            borderRadius: "12px",
            boxShadow: isDark
              ? "0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 40px -10px rgba(0, 0, 0, 0.8)"
              : "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e2e8f0",
            padding: "6px",
            ...menuStyle,
          }}
        >
          <div
            style={{
              padding: "6px 8px",
              fontSize: "10.5px",
              fontFamily: "monospace",
              color: isDark ? "#8a8f98" : "#64748b",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Choose Email Provider
          </div>

          {ORDERED_PROVIDERS.map((providerKey) => {
            const meta = PROVIDERS_META[providerKey];
            const onClick = () => handleProviderClick(providerKey);

            if (renderItem) {
              return (
                <React.Fragment key={providerKey}>
                  {renderItem({ provider: providerKey, meta, onClick })}
                </React.Fragment>
              );
            }

            return (
              <button
                key={providerKey}
                type="button"
                role="menuitem"
                onClick={onClick}
                className={`smart-mailto-item ${itemClassName}`.trim()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "transparent",
                  textAlign: "left",
                  fontSize: "13px",
                  color: isDark ? "#f3f4f6" : "#1e293b",
                  cursor: "pointer",
                  transition: "background-color 0.15s ease",
                  ...itemStyle,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = isDark
                    ? "rgba(255, 255, 255, 0.06)"
                    : "#f1f5f9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: meta.color,
                    }}
                  />
                  <span style={{ fontWeight: 500 }}>{meta.name}</span>
                </div>
              </button>
            );
          })}

          {showCopyOption && (
            <>
              <div
                style={{
                  height: "1px",
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "#f1f5f9",
                  margin: "4px 0",
                }}
              />
              <button
                type="button"
                role="menuitem"
                onClick={() => copyAddress()}
                className={`smart-mailto-item ${itemClassName}`.trim()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "transparent",
                  textAlign: "left",
                  fontSize: "13px",
                  color: isCopied
                    ? "#10b981"
                    : isDark
                    ? "#9ca3af"
                    : "#475569",
                  cursor: "pointer",
                  transition: "background-color 0.15s ease",
                  ...itemStyle,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = isDark
                    ? "rgba(255, 255, 255, 0.06)"
                    : "#f1f5f9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>{isCopied ? "Address Copied!" : "Copy Email Address"}</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
