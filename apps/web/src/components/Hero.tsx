import { ArrowRight, ExternalLink, Feather, Send, ServerOff, ShieldCheck, Sparkles } from "lucide-react";

export function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden text-center">
      {/* Linear fine grid texture */}
      <div className="absolute inset-0 linear-grid pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* Understated kicker badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.18] text-xs text-gray-300 font-medium mb-8 transition-colors shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>smart-mailto 1.0</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-400">Zero-backend email routing</span>
          <ArrowRight className="w-3 h-3 text-gray-500" />
        </div>

        {/* Linear bold white headline */}
        <h1 className="text-5xl sm:text-7xl font-bold tracking-[-0.035em] text-white leading-[1.08] mb-6 font-sans">
          Never lose another lead to <br />
          broken desktop mailto links.
        </h1>

        {/* Linear muted subtitle with sharp white accents */}
        <p className="text-base sm:text-lg text-[#8a8f98] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Traditional <code className="text-gray-200 bg-white/[0.06] border border-white/[0.1] px-1.5 py-0.5 rounded text-xs font-mono">mailto:</code> links fail on desktop browsers by opening unconfigured native apps. 
          <strong className="text-white font-medium"> smart-mailto</strong> opens Gmail, Outlook, or Proton webmail in a new tab on desktop, and routes seamlessly to native mail on mobile.
        </p>

        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#playground"
            className="btn-tactile px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 cursor-pointer group"
          >
            <span>Try Interactive Studio</span>
            <span className="kbd-badge group-hover:border-white/40 transition-colors">↵</span>
          </a>

          <button
            type="button"
            onClick={onOpenModal}
            className="px-5 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-200 hover:text-white border border-white/[0.08] hover:border-white/[0.15] font-medium text-sm transition flex items-center gap-2 cursor-pointer"
          >
            <span>Preview Modal</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>

        {/* Key Metrics Bar with Lucide icons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-16 pt-8 border-t border-white/[0.06] max-w-3xl mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <Feather className="w-4 h-4 text-emerald-400 mb-2" />
            <div className="text-white font-bold text-xl tracking-tight font-mono">0 kB</div>
            <div className="text-[11px] text-[#8a8f98] mt-0.5 font-medium">Dependencies</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <ServerOff className="w-4 h-4 text-cyan-400 mb-2" />
            <div className="text-white font-bold text-xl tracking-tight font-mono">100%</div>
            <div className="text-[11px] text-[#8a8f98] mt-0.5 font-medium">Client-Side (Zero Server)</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <Send className="w-4 h-4 text-purple-400 mb-2" />
            <div className="text-white font-bold text-xl tracking-tight font-mono">5+</div>
            <div className="text-[11px] text-[#8a8f98] mt-0.5 font-medium">Webmail Targets</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mb-2" />
            <div className="text-white font-bold text-xl tracking-tight font-mono">SSR-Safe</div>
            <div className="text-[11px] text-[#8a8f98] mt-0.5 font-medium">Next.js, Astro & Remix</div>
          </div>
        </div>
      </div>
    </section>
  );
}
