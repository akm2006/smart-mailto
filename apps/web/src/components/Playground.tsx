import { useState } from "react";
import {
  Activity,
  Bug,
  Check,
  Code2,
  Copy,
  Eye,
  Handshake,
  Laptop,
  MessageSquare,
  Rocket,
  Smartphone,
  Zap,
} from "lucide-react";
import {
  PROVIDERS_META,
  type DispatchResult,
  type EmailProvider,
} from "smart-mailto";
import { useSmartMailto } from "smart-mailto/react";
import { GmailIcon, MailtoIcon, OutlookIcon, ProtonIcon, YahooIcon } from "./ProviderIcons";
import type { ToastMessage } from "./Toast";

const PRESET_TEMPLATES = [
  {
    id: "partnership",
    label: "Partnership",
    icon: Handshake,
    iconColor: "text-blue-400",
    recipient: "partners@acmecorp.com",
    subject: "Strategic Partnership & API Integration",
    body: "Hi Team,\n\nI came across your platform and believe our products could create substantial mutual value through an API integration.\n\nCould we schedule a 15-minute introductory call next week?\n\nBest regards,\nAlex",
  },
  {
    id: "bug",
    label: "Bug Report",
    icon: Bug,
    iconColor: "text-rose-400",
    recipient: "support@acmecorp.com",
    subject: "Bug Report: Checkout Page Latency",
    body: "Hello Support,\n\nI observed an unexpected delay when clicking the checkout button on desktop Safari.\n\nSteps to reproduce:\n1. Add item to cart\n2. Click Proceed to Checkout\n3. Observed 4-second freeze\n\nHope this helps your team diagnose the issue!",
  },
  {
    id: "demo",
    label: "Enterprise Pilot",
    icon: Rocket,
    iconColor: "text-purple-400",
    recipient: "sales@acmecorp.com",
    subject: "Request for Enterprise Pilot Brief",
    body: "Hi Sales Team,\n\nWe are evaluating infrastructure intelligence solutions for our Q4 deployment across 12 facilities.\n\nCould you share pricing tiers and documentation regarding your enterprise pilot program?",
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: MessageSquare,
    iconColor: "text-emerald-400",
    recipient: "founders@acmecorp.com",
    subject: "Developer Feedback: smart-mailto",
    body: "Hi Team,\n\nWe evaluated smart-mailto for our marketing landing pages. Routing desktop users directly to their preferred webmail while keeping mobile mailto native solved an ongoing lead drop-off issue for our team.\n\nThanks for open-sourcing this!",
  },
];

export function Playground({
  onShowToast,
}: {
  onShowToast: (toast: ToastMessage) => void;
}) {
  const [activeTemplate, setActiveTemplate] = useState(PRESET_TEMPLATES[0].id);
  const [recipient, setRecipient] = useState(PRESET_TEMPLATES[0].recipient);
  const [subject, setSubject] = useState(PRESET_TEMPLATES[0].subject);
  const [body, setBody] = useState(PRESET_TEMPLATES[0].body);
  const [includeTelemetry, setIncludeTelemetry] = useState(true);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [lastDispatched, setLastDispatched] = useState<DispatchResult | null>(null);

  const {
    send,
    copyAddress,
    copyDraft,
    isMobile,
    isDispatching,
  } = useSmartMailto({
    recipient,
    subject,
    body,
    telemetry: includeTelemetry ? { includeUrl: true, includeTimestamp: true } : false,
  });

  const handleApplyTemplate = (tpl: typeof PRESET_TEMPLATES[0]) => {
    setActiveTemplate(tpl.id);
    setRecipient(tpl.recipient);
    setSubject(tpl.subject);
    setBody(tpl.body);
    onShowToast({
      id: Date.now().toString(),
      type: "info",
      title: "Preset Loaded",
      message: `Applied "${tpl.label}" configuration.`,
    });
  };

  const handleSend = async (provider?: EmailProvider) => {
    const result = await send(provider);
    setLastDispatched(result);

    const providerName = provider ? PROVIDERS_META[provider].name : (isMobile ? "Native Mail" : "Gmail");

    if (result.provider === "proton") {
      onShowToast({
        id: Date.now().toString(),
        type: "success",
        title: "ProtonMail Opened",
        message: "Opened Proton webmail. Message draft and recipient have been copied to your clipboard.",
      });
    } else if (result.provider === "yahoo") {
      onShowToast({
        id: Date.now().toString(),
        type: "info",
        title: "Yahoo Mail Opened",
        message: "Opened Yahoo Mail compose. Message draft backed up to clipboard.",
      });
    } else if (result.popupBlocked) {
      onShowToast({
        id: Date.now().toString(),
        type: "warning",
        title: "Popup Window Suppressed",
        message: "Browser blocked the new tab. Draft copied to clipboard; activating native fallback.",
      });
    } else {
      onShowToast({
        id: Date.now().toString(),
        type: "success",
        title: "Dispatched Successfully",
        message: `Routed via ${providerName}. Recipient, subject, and body prefilled.`,
      });
    }
  };

  const [copiedType, setCopiedType] = useState<"draft" | "address" | null>(null);

  const handleCopyDraft = async () => {
    const ok = await copyDraft();
    if (ok) {
      setCopiedType("draft");
      setTimeout(() => setCopiedType(null), 2000);
      onShowToast({
        id: Date.now().toString(),
        type: "success",
        title: "Draft Copied",
        message: "Full email draft copied to clipboard.",
      });
    }
  };

  const handleCopyAddress = async () => {
    const ok = await copyAddress();
    if (ok) {
      setCopiedType("address");
      setTimeout(() => setCopiedType(null), 2000);
      onShowToast({
        id: Date.now().toString(),
        type: "success",
        title: "Address Copied",
        message: `Copied "${recipient}" to clipboard.`,
      });
    }
  };

  // Safe URI limits calculation
  const rawMailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const urlLength = rawMailto.length;
  const lengthPercent = Math.min(100, Math.round((urlLength / 2000) * 100));

  return (
    <section id="playground" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 relative">
      {/* Studio Header Window Chrome */}
      <div className="obsidian-panel rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl">
        {/* Window Top Titlebar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0a0b0e] border-b border-white/[0.08] text-xs">
          {/* Traffic lights + App Name */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="h-4 w-px bg-white/[0.1] mx-0.5" />
            <span className="font-mono text-gray-300 font-semibold text-[11px] tracking-tight">
              smart-mailto studio <span className="text-gray-500 font-normal">v1.0.0</span>
            </span>
          </div>

          {/* Template presets */}
          <div className="hidden sm:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] p-0.5 rounded-lg font-mono text-[11px]">
            <span className="text-gray-500 px-2 py-0.5">Presets:</span>
            {PRESET_TEMPLATES.map((tpl) => {
              const Icon = tpl.icon;
              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleApplyTemplate(tpl)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition ${
                    activeTemplate === tpl.id
                      ? "bg-white/[0.1] text-white font-medium shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className={`w-3 h-3 ${tpl.iconColor}`} />
                  <span>{tpl.label}</span>
                </button>
              );
            })}
          </div>

          {/* Device & Viewmode */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.06]">
              {isMobile ? (
                <>
                  <Smartphone className="w-3 h-3 text-cyan-400" />
                  <span>Client: Mobile</span>
                </>
              ) : (
                <>
                  <Laptop className="w-3 h-3 text-emerald-400" />
                  <span>Client: Desktop</span>
                </>
              )}
            </div>

            <div className="flex items-center bg-black/40 border border-white/[0.08] p-0.5 rounded-md font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setViewMode("edit")}
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium transition ${
                  viewMode === "edit"
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("preview")}
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium transition ${
                  viewMode === "preview"
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Preview</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08] bg-[#0c0d10]">
          {/* Left: Editor Pane */}
          <div className="lg:col-span-6 p-6 space-y-4">
            {viewMode === "edit" ? (
              <>
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1 font-mono uppercase tracking-wider">
                    Recipient Address
                  </label>
                  <input
                    type="email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="input-obsidian w-full rounded-lg px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1 font-mono uppercase tracking-wider">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="input-obsidian w-full rounded-lg px-3 py-2 text-xs text-white font-sans"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-medium text-gray-400 font-mono uppercase tracking-wider">
                      Body Content
                    </label>
                    <span className="text-[10px] font-mono text-gray-500">
                      {urlLength} / 2,000 bytes ({lengthPercent}%)
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="input-obsidian w-full rounded-lg px-3 py-2 text-xs text-white font-sans leading-relaxed resize-y"
                  />
                  {/* Length Guard Progress Bar */}
                  <div className="w-full h-1 bg-white/[0.05] rounded-full mt-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        lengthPercent > 90 ? "bg-amber-400" : "bg-emerald-400"
                      }`}
                      style={{ width: `${lengthPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs">
                  <label className="flex items-center gap-2.5 cursor-pointer text-gray-400 hover:text-gray-200 select-none">
                    <input
                      type="checkbox"
                      checked={includeTelemetry}
                      onChange={(e) => setIncludeTelemetry(e.target.checked)}
                      className="checkbox-custom"
                    />
                    <span className="text-[11px] font-medium">Append context telemetry</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white border border-white/[0.08] text-[11px] transition cursor-pointer"
                    >
                      {copiedType === "draft" ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-gray-400" />
                          <span>Copy Draft</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white border border-white/[0.08] text-[11px] transition cursor-pointer"
                    >
                      {copiedType === "address" ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-gray-400" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Simulated Email View */
              <div className="p-4 rounded-xl bg-[#111216] border border-white/[0.06] space-y-3 font-sans text-xs">
                <div className="border-b border-white/[0.06] pb-2.5 space-y-1">
                  <div>
                    <span className="text-gray-500 font-mono text-[11px]">TO:</span>{" "}
                    <span className="text-emerald-400 font-mono">{recipient}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-mono text-[11px]">SUBJECT:</span>{" "}
                    <span className="text-white font-medium">{subject}</span>
                  </div>
                </div>
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed min-h-[140px]">
                  {body}
                </div>
                {includeTelemetry && (
                  <div className="pt-2.5 border-t border-white/[0.06] text-[11px] font-mono text-gray-500">
                    <div>--- Context Telemetry:</div>
                    <div>Source: {window.location?.href || "https://yourdomain.com"}</div>
                    <div>Sent: {new Date().toLocaleTimeString()}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Dispatch Deck & Telemetry Terminal */}
          <div className="lg:col-span-6 p-6 space-y-5 bg-[#0a0b0d]/50">
            {/* Primary Command Button */}
            <button
              type="button"
              disabled={isDispatching}
              onClick={() => handleSend()}
              className="w-full btn-tactile py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-between transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                <span>{isDispatching ? "Opening Webmail..." : "Smart Dispatch (Auto-Detect)"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono opacity-70">
                  {isMobile ? "→ mailto:" : "→ Gmail"}
                </span>
                <span className="kbd-badge">⌘↵</span>
              </div>
            </button>

            {/* Provider Grid with official downloaded icons */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Gmail */}
              <button
                type="button"
                onClick={() => handleSend("gmail")}
                className="p-3 rounded-xl bg-[#111216] hover:bg-[#16181e] border border-white/[0.06] hover:border-white/[0.14] text-left transition flex flex-col justify-between cursor-pointer group"
              >
                <div className="flex items-center justify-between w-full mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <GmailIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-white">Gmail</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">Deep link</span>
                </div>
                <span className="text-[11px] text-[#8a8f98]">Direct compose tab</span>
              </button>

              {/* Outlook */}
              <button
                type="button"
                onClick={() => handleSend("outlook")}
                className="p-3 rounded-xl bg-[#111216] hover:bg-[#16181e] border border-white/[0.06] hover:border-white/[0.14] text-left transition flex flex-col justify-between cursor-pointer group"
              >
                <div className="flex items-center justify-between w-full mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <OutlookIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-white">Outlook</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">Office 365</span>
                </div>
                <span className="text-[11px] text-[#8a8f98]">Webmail deeplink</span>
              </button>

              {/* Proton */}
              <button
                type="button"
                onClick={() => handleSend("proton")}
                className="p-3 rounded-xl bg-[#111216] hover:bg-[#16181e] border border-white/[0.06] hover:border-white/[0.14] text-left transition flex flex-col justify-between cursor-pointer group"
              >
                <div className="flex items-center justify-between w-full mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <ProtonIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-white">ProtonMail</span>
                  </div>
                  <span className="text-[10px] text-purple-400 font-mono">Copy + Web</span>
                </div>
                <span className="text-[11px] text-[#8a8f98]">Zero-access encryption</span>
              </button>

              {/* Yahoo */}
              <button
                type="button"
                onClick={() => handleSend("yahoo")}
                className="p-3 rounded-xl bg-[#111216] hover:bg-[#16181e] border border-white/[0.06] hover:border-white/[0.14] text-left transition flex flex-col justify-between cursor-pointer group"
              >
                <div className="flex items-center justify-between w-full mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <YahooIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-white">Yahoo Mail</span>
                  </div>
                  <span className="text-[10px] text-indigo-400 font-mono">Protected</span>
                </div>
                <span className="text-[11px] text-[#8a8f98]">Compose with copy backup</span>
              </button>
            </div>

            {/* Native mailto */}
            <button
              type="button"
              onClick={() => handleSend("mailto")}
              className="w-full p-2.5 rounded-xl bg-[#111216]/50 hover:bg-[#111216] border border-white/[0.05] hover:border-white/[0.1] text-left transition flex items-center justify-between cursor-pointer text-xs group"
            >
              <div className="flex items-center gap-2.5 text-gray-300">
                <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                  <MailtoIcon className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <span>Standard mailto: (Native Device Client)</span>
              </div>
              <span className="text-[10px] font-mono text-gray-500">OS Default</span>
            </button>

            {/* Live Debug & Telemetry Terminal */}
            <div className="p-3.5 rounded-xl bg-[#090a0c] border border-white/[0.08] font-mono text-[11px] space-y-1.5 text-[#8a8f98]">
              <div className="flex items-center justify-between text-gray-400 pb-1.5 border-b border-white/[0.06]">
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  Telemetry Inspector
                </span>
                <span className={lastDispatched ? "text-emerald-400 font-bold" : "text-gray-500"}>
                  {lastDispatched ? "● 200 OK" : "idle"}
                </span>
              </div>

              {lastDispatched ? (
                <div className="space-y-1 text-gray-300">
                  <div>target: <span className="text-emerald-400 font-bold">{lastDispatched.provider}</span></div>
                  <div>popup_blocked: <span className="text-white">{String(lastDispatched.popupBlocked)}</span></div>
                  <div>clipboard_sync: <span className="text-white">{String(lastDispatched.bodyCopiedToClipboard)}</span></div>
                  <div className="truncate text-gray-500">uri: {lastDispatched.url}</div>
                  {lastDispatched.notice && (
                    <div className="mt-2 p-2 rounded bg-amber-950/30 border border-amber-800/40 text-amber-200 text-[10px]">
                      notice: {lastDispatched.notice}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-600 text-[10px] italic">
                  Click any trigger above to inspect real-time URI parameters, device classification, and clipboard sync.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
