import { useEffect, useRef, useState } from "react";

/**
 * Open-source developer cursor spotlight:
 * - Refined, subtle ambient background glow (tasteful ~11% peak emerald aura)
 * - 100% mathematically centered (translate(-50%, -50%))
 * - Elegant magnetic halo follower with tactile hover states
 */
export function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Mouse coords & lerp spring coords
  const mouse = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    // Only activate on devices with a mouse/trackpad pointer
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setMounted(true);

    const onPointerMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible) setVisible(true);

      // Instant update for the ambient background spotlight (zero lag)
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest("button, a, input, textarea, select, [role='button'], .btn-tactile, .kbd-badge, tr, .obsidian-panel")
        );
        setIsHovering(interactive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onPointerLeave = () => setVisible(false);
    const onPointerEnter = () => setVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onPointerLeave);
    document.addEventListener("mouseenter", onPointerEnter);

    // Smooth trailing ring follower with exact 50% center offset
    let frameId: number;
    const lerp = 0.22; // responsive spring

    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * lerp;
      pos.current.y += (mouse.current.y - pos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("mouseenter", onPointerEnter);
      cancelAnimationFrame(frameId);
    };
  }, [visible]);

  if (!mounted) return null;

  return (
    <>
      {/* 1. Subtle, Refined Ambient Background Spotlight (Gentle ~11% lift over dark background) */}
      <div
        ref={spotlightRef}
        className={`fixed top-0 left-0 pointer-events-none z-[1] transition-opacity duration-300 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "650px",
          height: "650px",
          background:
            "radial-gradient(circle 325px at center, rgba(52, 211, 153, 0.11) 0%, rgba(16, 185, 129, 0.05) 35%, rgba(6, 182, 212, 0.02) 55%, transparent 75%)",
          willChange: "transform",
        }}
      />

      {/* 2. Magnetic Halo Follower */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          className={`relative rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
            isClicking
              ? "w-8 h-8 scale-90 border-2 border-emerald-400 bg-emerald-400/30 shadow-[0_0_20px_rgba(52,211,153,0.5)]"
              : isHovering
              ? "w-11 h-11 border-2 border-emerald-400/80 bg-emerald-400/15 shadow-[0_0_25px_rgba(52,211,153,0.35)] backdrop-blur-[0.5px]"
              : "w-7 h-7 border border-emerald-400/50 bg-emerald-500/[0.06] shadow-[0_0_12px_rgba(52,211,153,0.25)]"
          }`}
        >
          {/* Subtle center precision nucleus */}
          <div
            className={`rounded-full transition-all duration-150 ${
              isHovering
                ? "w-2 h-2 bg-white shadow-[0_0_8px_#ffffff]"
                : "w-1.5 h-1.5 bg-emerald-300 shadow-[0_0_5px_#34d399]"
            }`}
          />
        </div>
      </div>
    </>
  );
}
