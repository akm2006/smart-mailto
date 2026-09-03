"use client";

import React, { useEffect, useState } from "react";
import type { EmailProvider } from "../core/types";
import { useSmartMailto } from "./use-smart-mailto";

export interface SmartMailtoModalLabels {
  name?: string;
  email?: string;
  company?: string;
  purpose?: string;
  message?: string;
  submit?: string;
  dispatching?: string;
}

export interface SmartMailtoModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: string;
  defaultSubject?: string;
  title?: string;
  subtitle?: string;
  purposePlaceholder?: string;
  initialPurpose?: string;
  preferredProvider?: EmailProvider;
  onSuccess?: () => void;
  theme?: "dark" | "light";

  // Advanced Customization Props:
  showCompanyField?: boolean;
  showPurposeField?: boolean;
  labels?: SmartMailtoModalLabels;
  className?: string;
  style?: React.CSSProperties;
  modalStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  footerNode?: React.ReactNode;
}

export function SmartMailtoModal({
  isOpen,
  onClose,
  recipient,
  defaultSubject,
  title = "Start a Conversation",
  subtitle = "Fill out the inquiry details below. Your email client will open ready to send.",
  purposePlaceholder = "e.g. Partnership inquiry, Enterprise demo",
  initialPurpose = "",
  preferredProvider,
  onSuccess,
  theme = "dark",
  showCompanyField = true,
  showPurposeField = true,
  labels,
  className = "",
  style,
  modalStyle,
  inputStyle,
  buttonStyle,
  footerNode,
}: SmartMailtoModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [purpose, setPurpose] = useState(initialPurpose);
  const [message, setMessage] = useState("");

  const isDark = theme === "dark";

  const lblName = labels?.name || "Full Name *";
  const lblEmail = labels?.email || "Email Address *";
  const lblCompany = labels?.company || "Company / Org";
  const lblPurpose = labels?.purpose || "Purpose / Topic";
  const lblMessage = labels?.message || "Message / Inquiry Details";
  const lblSubmit = labels?.submit || "Continue in Email";
  const lblDispatching = labels?.dispatching || "Opening Webmail...";

  const subject =
    defaultSubject ||
    `Inquiry: ${purpose || "General Inquiry"} - ${name || "Anonymous"} ${company ? `(${company})` : ""}`.trim();

  const detailsList: string[] = [];
  if (name) detailsList.push(`- Name: ${name}`);
  if (email) detailsList.push(`- Email: ${email}`);
  if (showCompanyField && company) detailsList.push(`- Company: ${company}`);
  if (showPurposeField && purpose) detailsList.push(`- Purpose: ${purpose}`);

  const body = `Hello Team,

Here are the details from my inquiry:

${detailsList.join("\n")}

Message / Question:
------------------------------------------
${message || "No specific message provided."}
------------------------------------------
`.trim();

  const { send, isDispatching } = useSmartMailto({
    recipient,
    subject,
    body,
  });

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard escape & ⌘↵ submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleSubmit(e as unknown as React.FormEvent);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, name, email, company, purpose, message]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await send(preferredProvider);
    if (result.success || result.bodyCopiedToClipboard) {
      onSuccess?.();
      onClose();
    }
  };

  const defaultInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 12px",
    borderRadius: "9px",
    backgroundColor: isDark ? "#121318" : "#f8fafc",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.09)" : "1px solid #cbd5e1",
    color: isDark ? "#ffffff" : "#0f172a",
    fontSize: "13px",
    boxSizing: "border-box",
    outline: "none",
    transition: "border 0.15s ease, box-shadow 0.15s ease",
    ...inputStyle,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "10.5px",
    fontWeight: 600,
    fontFamily: "monospace",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: isDark ? "#9ca3af" : "#475569",
    marginBottom: "5px",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`smart-mailto-modal-portal ${className}`.trim()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        ...style,
      }}
    >
      {/* Backdrop with high-end obsidian blur */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: isDark ? "rgba(0, 0, 0, 0.78)" : "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Modal Window Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "500px",
          backgroundColor: isDark ? "#0d0e12" : "#ffffff",
          borderRadius: "20px",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: isDark
            ? "0 0 0 1px rgba(0, 0, 0, 0.8), 0 30px 70px -15px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          padding: "24px 26px",
          zIndex: 10,
          maxHeight: "92vh",
          overflowY: "auto",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: isDark ? "#f7f8f8" : "#0f172a",
          ...modalStyle,
        }}
      >
        {/* macOS Traffic Lights + Window Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ff5f56", display: "inline-block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ffbd2e", display: "inline-block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#27c93f", display: "inline-block" }} />
            <span style={{ marginLeft: "6px", fontSize: "11px", fontFamily: "monospace", color: isDark ? "#8a8f98" : "#64748b" }}>
              // DISPATCH DIALOG
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: isDark ? "rgba(255, 255, 255, 0.06)" : "#f1f5f9",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
              borderRadius: "8px",
              padding: "5px",
              cursor: "pointer",
              color: isDark ? "#9ca3af" : "#64748b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Title Header */}
        <div style={{ marginBottom: "20px" }}>
          <h3
            style={{
              margin: 0,
              fontSize: "19px",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: isDark ? "#ffffff" : "#0f172a",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              margin: "5px 0 0",
              fontSize: "12.5px",
              lineHeight: 1.5,
              color: isDark ? "#8a8f98" : "#64748b",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Form Controls */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={labelStyle}>{lblName}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                style={defaultInputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>{lblEmail}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                style={defaultInputStyle}
              />
            </div>
          </div>

          {(showCompanyField || showPurposeField) && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: showCompanyField && showPurposeField ? "1fr 1fr" : "1fr",
                gap: "12px",
              }}
            >
              {showCompanyField && (
                <div>
                  <label style={labelStyle}>{lblCompany}</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Technologies"
                    style={defaultInputStyle}
                  />
                </div>
              )}

              {showPurposeField && (
                <div>
                  <label style={labelStyle}>{lblPurpose}</label>
                  <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder={purposePlaceholder}
                    style={defaultInputStyle}
                  />
                </div>
              )}
            </div>
          )}

          <div>
            <label style={labelStyle}>{lblMessage}</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you would like to discuss..."
              style={{
                ...defaultInputStyle,
                lineHeight: 1.5,
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Action Row */}
          <div style={{ marginTop: "6px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
            <div style={{ fontSize: "11px", fontFamily: "monospace", color: isDark ? "#6b7280" : "#94a3b8" }}>
              Press <span style={{ padding: "2px 5px", borderRadius: "4px", backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "none" }}>⌘↵</span> to dispatch
            </div>

            <button
              type="submit"
              disabled={isDispatching}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: isDark ? "#ffffff" : "#0f172a",
                color: isDark ? "#08090a" : "#ffffff",
                fontSize: "13px",
                fontWeight: 700,
                cursor: isDispatching ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: isDark
                  ? "0 1px 2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)"
                  : "0 1px 2px rgba(0, 0, 0, 0.1)",
                transition: "all 0.15s ease",
                ...buttonStyle,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={isDark ? "#10b981" : "#38bdf8"} stroke={isDark ? "#10b981" : "#38bdf8"} strokeWidth="1">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
              <span>{isDispatching ? lblDispatching : lblSubmit}</span>
            </button>
          </div>
        </form>

        {/* Footer Privacy Badge or Custom Footer Node */}
        {footerNode !== undefined ? (
          footerNode
        ) : (
          <div
            style={{
              marginTop: "18px",
              paddingTop: "12px",
              borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "10.5px",
              fontFamily: "monospace",
              color: isDark ? "#6b7280" : "#94a3b8",
            }}
          >
            <span>100% Client-Side Privacy</span>
            <span>Zero Server Storage</span>
          </div>
        )}
      </div>
    </div>
  );
}
