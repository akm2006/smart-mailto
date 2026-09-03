import { useState } from "react";

export function DeviceSimulator() {
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile">("desktop");

  return (
    <section className="py-16 bg-slate-900/30 border-y border-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 font-medium mb-3">
            <span>📱 Smart Dual-Path Routing</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            How smart-mailto routes your users
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Different platforms need completely different handling. See how smart-mailto eliminates dead-ends across devices.
          </p>

          {/* Toggle pill */}
          <div className="inline-flex p-1 bg-slate-950 border border-slate-800 rounded-xl mt-6">
            <button
              type="button"
              onClick={() => setActiveTab("desktop")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "desktop"
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              💻 Desktop Experience
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("mobile")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "mobile"
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              📱 Mobile & Tablet Experience
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl">
          {activeTab === "desktop" ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
                  💻
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">Desktop Environment (Chrome, Edge, Safari, Firefox)</h3>
                  <p className="text-xs text-slate-400">Where 90%+ of traditional mailto: clicks fail.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
                    <span>❌ Traditional mailto:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Triggers an unconfigured native app like Windows Mail or Apple Mail. Causes a system dialog prompt (<em>"Choose default application"</em>), leading most users to give up.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    <span>✅ smart-mailto:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Deep-links cleanly into <strong>Gmail</strong>, <strong>Outlook.com</strong>, or <strong>Proton</strong> in a new browser tab with subject, body, and context prefilled. Zero disruption to the site.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center text-lg">
                  📱
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">Mobile & Tablet (iOS, Android, iPadOS)</h3>
                  <p className="text-xs text-slate-400">Where native mail apps are already configured.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  <span>✨ Intelligent Native Fallback</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  On mobile devices, users almost always have default mail apps configured (Apple Mail on iPhone, Gmail on Android). 
                  <strong> smart-mailto</strong> detects touch screens and mobile user agents, smoothly invoking native <code className="text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded">mailto:</code> protocols so the user's native compose sheet slides up immediately.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
