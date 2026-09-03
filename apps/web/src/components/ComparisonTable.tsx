import { Check, SplitSquareVertical, X } from "lucide-react";

export function ComparisonTable() {
  const rows = [
    {
      feature: "Desktop Webmail Compose (Gmail, Outlook, Proton)",
      mailto: "Fails (triggers unconfigured native OS app)",
      mailtoFail: true,
      backend: "Form only (no direct tab)",
      backendFail: true,
      smart: "Direct Webmail Tab",
    },
    {
      feature: "Mobile Native Mail App Routing",
      mailto: "Yes (system default)",
      mailtoFail: false,
      backend: "None",
      backendFail: true,
      smart: "Seamless Native Sheet",
    },
    {
      feature: "Monthly Infrastructure Cost",
      mailto: "$0",
      mailtoFail: false,
      backend: "$20–$100+/mo (Resend / SendGrid)",
      backendFail: true,
      smart: "$0 (Forever)",
    },
    {
      feature: "Spam Bot Scraping Resistance",
      mailto: "Raw HTML scraped by crawlers",
      mailtoFail: true,
      backend: "Requires Captcha / Turnstile",
      backendFail: false,
      smart: "Interactive Client Dispatch",
    },
    {
      feature: "Popup Blocker Resiliency",
      mailto: "None",
      mailtoFail: true,
      backend: "None",
      backendFail: true,
      smart: "Auto-Copy & Fallback Recovery",
    },
    {
      feature: "Safe URL Length Guard (>2,000 chars)",
      mailto: "Browser crashes or truncates",
      mailtoFail: true,
      backend: "Handled on server",
      backendFail: false,
      smart: "Auto-Clipboard Safe Guard",
    },
    {
      feature: "Lead Context Telemetry (URL & Time)",
      mailto: "None",
      mailtoFail: true,
      backend: "Custom server headers code",
      backendFail: false,
      smart: "Built-in Client Telemetry",
    },
    {
      feature: "Client Bundle Footprint",
      mailto: "0 kB",
      mailtoFail: false,
      backend: "50–150 kB (React Hook Form / Zod)",
      backendFail: true,
      smart: "< 2 kB gzipped",
    },
  ];

  return (
    <section id="comparison" className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-gray-300 font-mono mb-3">
          <SplitSquareVertical className="w-3.5 h-3.5 text-emerald-400" />
          <span>// COMPARISON</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.03em]">
          Compare the alternatives.
        </h2>
        <p className="text-[#8a8f98] text-sm sm:text-base max-w-xl mx-auto mt-3 leading-relaxed">
          Why top engineering teams are replacing native mailto links and heavy contact form APIs with smart-mailto.
        </p>
      </div>

      <div className="obsidian-panel rounded-2xl overflow-hidden border border-white/[0.08]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#090a0d] text-gray-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="p-4 sm:p-5 font-semibold text-white">Feature</th>
                <th className="p-4 sm:p-5 font-medium text-gray-400">Traditional mailto:</th>
                <th className="p-4 sm:p-5 font-medium text-gray-400">Backend Server Form</th>
                <th className="p-4 sm:p-5 font-bold text-white bg-white/[0.04] border-l border-r border-white/[0.08]">
                  smart-mailto
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05] text-[#8a8f98] font-sans">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.015] transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-gray-200">{row.feature}</td>
                  <td className="p-4 sm:p-5 text-gray-400">
                    <span className="flex items-center gap-1.5">
                      {row.mailtoFail && <X className="w-3.5 h-3.5 text-rose-400/80 shrink-0" />}
                      <span>{row.mailto}</span>
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-400">
                    <span className="flex items-center gap-1.5">
                      {row.backendFail && <X className="w-3.5 h-3.5 text-rose-400/80 shrink-0" />}
                      <span>{row.backend}</span>
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-white bg-white/[0.02] border-l border-r border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{row.smart}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
