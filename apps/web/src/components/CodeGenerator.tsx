import { useState } from "react";
import { Check, Code2, Copy, FileCode, Layers, Terminal } from "lucide-react";

export function CodeGenerator() {
  const [activeTab, setActiveTab] = useState<"hook" | "components" | "modal" | "vanilla">("hook");
  const [copied, setCopied] = useState(false);

  const snippets = {
    hook: `import { useSmartMailto } from "smart-mailto/react";

export function ContactButton() {
  const { send, isCopied, copyAddress } = useSmartMailto({
    recipient: "founders@yourcompany.com",
    subject: "Product Inquiry",
    body: "Hi! I would like to learn more...",
    telemetry: true, // Attaches URL, timestamp, and client environment
  });

  return (
    <div className="flex items-center gap-3">
      {/* Smart Dispatch: opens Gmail on desktop, or native mail on mobile! */}
      <button 
        onClick={() => send()}
        className="px-4 py-2 bg-white text-black font-semibold rounded-lg shadow-sm"
      >
        Email Us
      </button>

      {/* 1-Click Clipboard copy backup */}
      <button 
        onClick={copyAddress}
        className="px-4 py-2 bg-zinc-900 text-white rounded-lg border border-zinc-800"
      >
        {isCopied ? "Copied!" : "Copy Email"}
      </button>
    </div>
  );
}`,
    components: `import { SmartMailtoButton, SmartMailtoMenu } from "smart-mailto/react";

export function HeaderActions() {
  return (
    <div className="flex items-center gap-4">
      {/* 1. Drop-in button (preserves semantic mailto: href for SEO) */}
      <SmartMailtoButton
        recipient="sales@company.com"
        subject="Enterprise Demo Request"
        className="btn-primary"
      >
        Get in Touch
      </SmartMailtoButton>

      {/* 2. Accessible multi-provider menu (Gmail, Outlook, Proton, Yahoo) */}
      <SmartMailtoMenu
        recipient="support@company.com"
        subject="Technical Assistance"
        triggerLabel="Contact Support"
      />
    </div>
  );
}`,
    modal: `import { useState } from "react";
import { SmartMailtoModal } from "smart-mailto/react";

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Contact Form
      </button>

      {/* Zero-backend inquiry modal: gathers Name, Company, Purpose, Message */}
      <SmartMailtoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        recipient="office@company.com"
        title="Start a Project"
        subtitle="Your email client will open ready to send with full context."
      />
    </>
  );
}`,
    vanilla: `import { dispatchSmartEmail } from "smart-mailto";

// Framework-agnostic: Works in Vanilla JS, Svelte, Vue, or plain HTML buttons
const button = document.getElementById("contact-btn");

button?.addEventListener("click", async () => {
  const result = await dispatchSmartEmail({
    recipient: "team@company.com",
    subject: "Website Inquiry",
    body: "Hi, I would like to get in touch.",
  });

  console.log("Dispatched to:", result.provider);
});`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quickstart" className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-gray-300 font-mono mb-3">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>// QUICKSTART</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.03em]">
          Integrate in seconds.
        </h2>
        <p className="text-[#8a8f98] text-sm sm:text-base max-w-xl mx-auto mt-3 leading-relaxed">
          Zero configuration. Import the hook, button, or vanilla function and ship.
        </p>

        {/* Tab switcher */}
        <div className="inline-flex p-1 bg-[#0d0e12] border border-white/[0.08] rounded-xl mt-8 flex-wrap justify-center font-mono text-xs shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab("hook")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
              activeTab === "hook" ? "bg-white text-black font-semibold shadow-sm" : "text-gray-400 hover:text-white"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>useSmartMailto()</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("components")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
              activeTab === "components" ? "bg-white text-black font-semibold shadow-sm" : "text-gray-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>&lt;Components /&gt;</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("modal")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
              activeTab === "modal" ? "bg-white text-black font-semibold shadow-sm" : "text-gray-400 hover:text-white"
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>&lt;Modal /&gt;</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("vanilla")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
              activeTab === "vanilla" ? "bg-white text-black font-semibold shadow-sm" : "text-gray-400 hover:text-white"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Vanilla TS / JS</span>
          </button>
        </div>
      </div>

      {/* Terminal Frame */}
      <div className="obsidian-panel rounded-2xl overflow-hidden border border-white/[0.08]">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#090a0d] border-b border-white/[0.08] text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-white font-medium text-[11px]">
              {activeTab === "vanilla" ? "index.ts" : "Contact.tsx"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition cursor-pointer px-2.5 py-1 rounded bg-white/[0.05] border border-white/[0.08]"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-gray-400" />
                <span>Copy</span>
              </>
            )}
            <span className="kbd-badge">⌘C</span>
          </button>
        </div>

        <pre className="p-5 sm:p-6 text-xs sm:text-sm font-mono text-gray-200 overflow-x-auto leading-relaxed bg-[#0c0d10]">
          <code>{snippets[activeTab]}</code>
        </pre>
      </div>
    </section>
  );
}
