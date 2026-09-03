import { useEffect } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "info" | "warning";
  title: string;
  message: string;
}

export function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastMessage | null;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const bgBorder =
    toast.type === "success"
      ? "bg-[#0d0e12]/95 border-emerald-500/30 text-emerald-400 shadow-[0_10px_30px_rgba(16,185,129,0.15)]"
      : toast.type === "warning"
      ? "bg-[#0d0e12]/95 border-amber-500/30 text-amber-400 shadow-[0_10px_30px_rgba(245,158,11,0.15)]"
      : "bg-[#0d0e12]/95 border-cyan-500/30 text-cyan-400 shadow-[0_10px_30px_rgba(6,182,212,0.15)]";

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`p-4 rounded-2xl border backdrop-blur-2xl flex items-start gap-3.5 ${bgBorder}`}>
        <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] mt-0.5 shrink-0">
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : toast.type === "warning" ? (
            <AlertCircle className="w-4 h-4 text-amber-400" />
          ) : (
            <Info className="w-4 h-4 text-cyan-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white tracking-wide">
              {toast.title}
            </h4>
            <button
              type="button"
              onClick={onDismiss}
              className="text-gray-500 hover:text-white transition p-0.5 -mr-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-[#8a8f98] mt-1 leading-relaxed">
            {toast.message}
          </p>
        </div>
      </div>
    </div>
  );
}
