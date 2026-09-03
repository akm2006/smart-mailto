import { useState } from "react";
import { SmartMailtoModal } from "smart-mailto/react";
import { BentoFeatures } from "./components/BentoFeatures";
import { CodeGenerator } from "./components/CodeGenerator";
import { ComparisonTable } from "./components/ComparisonTable";
import { CursorGlow } from "./components/CursorGlow";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Playground } from "./components/Playground";
import { Toast, type ToastMessage } from "./components/Toast";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (t: ToastMessage) => {
    setToast(t);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090a] text-gray-100 selection:bg-emerald-500 selection:text-gray-950 font-sans antialiased relative">
      {/* Open-Source Developer Cursor Spotlight & Fluid Ring Follower */}
      <CursorGlow />

      <Header
        onCopyInstall={(cmd) =>
          showToast({
            id: Date.now().toString(),
            type: "success",
            title: "Command Copied",
            message: `Copied "${cmd}" to your clipboard.`,
          })
        }
      />
      <main className="flex-1">
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <Playground onShowToast={showToast} />
        <BentoFeatures />
        <ComparisonTable />
        <CodeGenerator />
      </main>
      <Footer />

      {/* Live Drop-in Contact Modal demonstration */}
      <SmartMailtoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipient="contact@company.com"
        title="Start a Conversation"
        subtitle="This inquiry dialog uses smart-mailto client-side with zero backend infrastructure."
      />

      {/* Floating interactive feedback toast */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
