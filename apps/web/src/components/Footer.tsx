import { NextjsIcon, ReactIcon, TypeScriptIcon } from "./ProviderIcons";
import { SmartMailtoLogo } from "./SmartMailtoLogo";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07080a] py-14 text-xs text-[#8a8f98]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Stack support bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.05]">
          <span className="text-gray-500 font-mono text-[11px] uppercase tracking-wider">
            Works with any modern framework:
          </span>
          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <ReactIcon className="w-4 h-4" />
              <span className="text-gray-300 font-medium">React 18/19</span>
            </div>
            <div className="flex items-center gap-2">
              <NextjsIcon className="w-4 h-4" />
              <span className="text-gray-300 font-medium">Next.js App/Pages</span>
            </div>
            <div className="flex items-center gap-2">
              <TypeScriptIcon className="w-4 h-4" />
              <span className="text-gray-300 font-medium">TypeScript</span>
            </div>
          </div>
        </div>

        {/* Bottom credits & links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <SmartMailtoLogo className="w-6 h-6" />
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-bold text-white text-sm tracking-tight font-sans">smart-mailto</span>
                <span className="text-[10px] text-gray-400 font-mono">v1.0.0</span>
              </div>
              <p className="text-[#8a8f98]">
                Released under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noreferrer" className="text-gray-300 underline hover:text-white">MIT License</a>. Created for the open source community.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-medium text-gray-400">
            <a
              href="https://github.com/akm2006/smart-mailto"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/smart-mailto"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              npm Registry
            </a>
            <a
              href="#playground"
              className="hover:text-white transition"
            >
              Studio
            </a>
            <a
              href="#architecture"
              className="hover:text-white transition"
            >
              Architecture
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
