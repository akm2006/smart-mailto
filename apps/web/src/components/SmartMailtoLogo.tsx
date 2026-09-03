export function SmartMailtoLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="smart-mailto logo"
      className={`${className} rounded-md object-contain shrink-0 shadow-sm`}
      width={24}
      height={24}
    />
  );
}
