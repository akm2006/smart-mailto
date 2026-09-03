import { useState } from "react";
import { Check, Copy, Star } from "lucide-react";
import { SmartMailtoLogo } from "./SmartMailtoLogo";

export function Header({ onCopyInstall }: { onCopyInstall?: (cmd: string) => void }) {
  const [copied, setCopied] = useState(false);
  const [pm, setPm] = useState<"pnpm" | "npm" | "bun">("pnpm");

  const installCommands = {
    pnpm: "pnpm add smart-mailto",
    npm: "npm i smart-mailto",
    bun: "bun add smart-mailto",
  };

  const copyInstall = () => {
    const cmd = installCommands[pm];
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    onCopyInstall?.(cmd);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 py-2.5 rounded-full bg-[#0d0e12]/90 backdrop-blur-2xl border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.7)] text-xs">
        {/* Brand with bigger logo */}
        <a href="#top" className="flex items-center gap-2.5 group">
          <SmartMailtoLogo className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-105 transition-transform duration-200" />
          <span className="font-bold text-white text-sm sm:text-base tracking-tight font-sans">
            smart-mailto
          </span>
        </a>

        {/* Minimal Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-gray-400 font-medium">
          <a href="#playground" className="hover:text-white transition">Studio</a>
          <a href="#architecture" className="hover:text-white transition">Architecture</a>
          <a href="#comparison" className="hover:text-white transition">Comparison</a>
          <a href="#quickstart" className="hover:text-white transition">Quickstart</a>
        </nav>

        {/* Right Tools */}
        <div className="flex items-center gap-3">
          {/* Package Manager Pill */}
          <div className="hidden sm:flex items-center rounded-full bg-white/[0.05] border border-white/[0.08] p-1 font-mono text-[11px]">
            <div className="flex items-center gap-0.5 px-1 border-r border-white/[0.08] mr-1.5">
              {(["pnpm", "npm", "bun"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPm(item)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition ${
                    pm === item
                      ? "bg-white text-black font-bold shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={copyInstall}
              className="flex items-center gap-2 text-gray-300 hover:text-white px-2 py-0.5 transition cursor-pointer"
              title="Click to copy install command"
            >
              <span>{installCommands[pm]}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
              )}
            </button>
          </div>

          {/* GitHub Star Pill */}
          <a
            href="https://github.com/akm2006/smart-mailto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.12] font-semibold text-xs transition"
          >
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span>Star</span>
          </a>
        </div>
      </div>
    </header>
  );
}
