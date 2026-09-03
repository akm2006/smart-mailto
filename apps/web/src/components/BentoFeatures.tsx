import { useState } from "react";
import { GlowCard } from "glow-card-react";
import {
  Activity,
  AlertTriangle,
  Coins,
  Cpu,
  Laptop,
  Layers,
  MousePointer,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export function BentoFeatures() {
  const [deviceSim, setDeviceSim] = useState<"desktop" | "mobile">("desktop");

  const glowColor = "rgba(52, 211, 153, 0.18)";

  return (
    <section id="architecture" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 relative">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-gray-300 font-mono mb-3">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>// ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.03em]">
          Engineered for 100% lead capture.
        </h2>
        <p className="text-[#8a8f98] text-sm sm:text-base max-w-xl mx-auto mt-3 leading-relaxed">
          Traditional mailto links lose 40%+ of desktop leads. smart-mailto eliminates dead-ends through intelligent multi-signal device routing.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Large Feature 1: Dual-Path Routing Engine (Spans 8 cols) */}
        <GlowCard
          color={glowColor}
          size={400}
          className="md:col-span-8 obsidian-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                01 / DUAL-PATH DISPATCH ENGINE
              </span>

              {/* Toggle */}
              <div className="inline-flex p-0.5 rounded-lg bg-black/60 border border-white/[0.08] font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setDeviceSim("desktop")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
                    deviceSim === "desktop"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Laptop className="w-3 h-3" />
                  <span>Desktop View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceSim("mobile")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
                    deviceSim === "mobile"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Mobile View</span>
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Multi-Signal Device Detection
            </h3>
            <p className="text-sm text-[#8a8f98] max-w-xl leading-relaxed">
              Analyzes pointer precision (`matchMedia("(pointer: coarse)")`), touch capabilities (`navigator.maxTouchPoints`), and viewport width with 100% SSR safety.
            </p>
          </div>

          {/* Interactive Flow Visualizer */}
          <div className="mt-6 p-4 rounded-xl bg-[#090a0d] border border-white/[0.06] font-mono text-xs">
            {deviceSim === "desktop" ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <MousePointer className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Desktop Routing Path (Fine Pointer · Width ≥ 1024px)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-[#8a8f98]">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-gray-400 block mb-1">01. Click Intercept</span>
                    Default action prevented; suppresses unconfigured mail client
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-emerald-400 block mb-1">02. Webmail Deep-link</span>
                    Gmail / Outlook / Proton compose tab opened in background
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-white block mb-1">03. Context Preserved</span>
                    Recipient, subject, and body prefilled ready for user to hit send
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Mobile Routing Path (Coarse Pointer · maxTouchPoints &gt; 0)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-[#8a8f98]">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-gray-400 block mb-1">01. Tap Registered</span>
                    Native mobile touch gesture recognized
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-cyan-400 block mb-1">02. mailto: Activated</span>
                    Clean standard mailto URI generated with encoding
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-white block mb-1">03. OS Sheet Opens</span>
                    Apple Mail, Gmail app, or Outlook app presents native compose
                  </div>
                </div>
              </div>
            )}
          </div>
        </GlowCard>

        {/* Feature 2: Zero Backend (Spans 4 cols) */}
        <GlowCard
          color={glowColor}
          size={320}
          className="md:col-span-4 obsidian-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              02 / ZERO BACKEND
            </span>
            <h3 className="text-xl font-bold text-white mt-2 mb-2">
              $0 Infrastructure
            </h3>
            <p className="text-sm text-[#8a8f98] leading-relaxed">
              No SMTP servers, no SendGrid or Resend bills, no database schemas, and zero API credentials bundled in client code.
            </p>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[#090a0d] border border-white/[0.06] font-mono text-xs space-y-2.5">
            <div className="flex justify-between">
              <span className="text-gray-400">Server Cost:</span>
              <strong className="text-emerald-400 font-bold">$0.00 / month</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Cold Starts:</span>
              <strong className="text-white font-bold">0 ms</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Bundle Size:</span>
              <strong className="text-emerald-400 font-bold">&lt; 2 kB</strong>
            </div>
          </div>
        </GlowCard>

        {/* Feature 3: Popup Blocker Resiliency (Spans 4 cols) */}
        <GlowCard
          color={glowColor}
          size={320}
          className="md:col-span-4 obsidian-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              03 / PRIVACY-SAFE
            </span>
            <h3 className="text-lg font-bold text-white mt-2 mb-2">
              Popup Blocker Recovery
            </h3>
            <p className="text-sm text-[#8a8f98] leading-relaxed">
              If Brave or Safari suppresses the new tab, smart-mailto automatically catches the block, auto-copies the draft, and triggers native mailto.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-white/[0.06] text-xs font-mono text-gray-400 flex items-center justify-between">
            <span>Fail-safe recovery</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Active
            </span>
          </div>
        </GlowCard>

        {/* Feature 4: Safe URL Length Guard (Spans 4 cols) */}
        <GlowCard
          color={glowColor}
          size={320}
          className="md:col-span-4 obsidian-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              04 / LENGTH GUARD
            </span>
            <h3 className="text-lg font-bold text-white mt-2 mb-2">
              414 URI Crash Shield
            </h3>
            <p className="text-sm text-[#8a8f98] leading-relaxed">
              If a message exceeds safe browser GET limits (2,000 characters), smart-mailto auto-copies the draft to clipboard and loads a clean placeholder.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-white/[0.06] text-xs font-mono text-gray-400 flex items-center justify-between">
            <span>2,000 char threshold</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Guarded
            </span>
          </div>
        </GlowCard>

        {/* Feature 5: Context Telemetry (Spans 4 cols) */}
        <GlowCard
          color={glowColor}
          size={320}
          className="md:col-span-4 obsidian-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              05 / TELEMETRY
            </span>
            <h3 className="text-lg font-bold text-white mt-2 mb-2">
              Context Telemetry
            </h3>
            <p className="text-sm text-[#8a8f98] leading-relaxed">
              Optionally attaches page URL, timestamp, and device environment to the message footer without cookies or third-party trackers.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-white/[0.06] text-xs font-mono text-gray-400 flex items-center justify-between">
            <span>Zero cookies</span>
            <span className="text-emerald-400">100% Private</span>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}
