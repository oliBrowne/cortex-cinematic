/**
 * CORTEX design reminder: motion here suggests a living local system—measured radial breathing,
 * deliberate node pulses, and signal travel. It never becomes decorative spectacle.
 */
import { animate } from "animejs/animation";
import { useEffect, useRef } from "react";

type MotionMode = "hero" | "estate" | "arrival";

export function CortexMotionField({ mode, intensity = 1 }: { mode: MotionMode; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rays = Array.from(root.querySelectorAll<HTMLElement>(".cortex-motion-ray"));
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".cortex-motion-node"));
    const pulses = Array.from(root.querySelectorAll<HTMLElement>(".cortex-motion-pulse"));
    const rayAnimation = animate(rays, { scale: [0.94, 1.06], opacity: [0.24, 0.74], duration: mode === "hero" ? 4600 : 3600, alternate: true, loop: true, ease: "inOutSine", delay: (_target: unknown, index = 0) => index * 22 });
    const nodeAnimation = animate(nodes, { scale: [0.74, 1.16], opacity: [0.38, 1], duration: 1800, alternate: true, loop: true, ease: "inOutSine", delay: (_target: unknown, index = 0) => index * 240 });
    const pulseAnimation = animate(pulses, { translateX: ["-120%", "120%"], opacity: [0, 0.95, 0], duration: 3000, loop: true, ease: "linear", delay: (_target: unknown, index = 0) => index * 780 });
    return () => { rayAnimation.revert(); nodeAnimation.revert(); pulseAnimation.revert(); };
  }, [mode]);

  return <div ref={ref} className={`cortex-motion-field cortex-motion-${mode}`} style={{ opacity: intensity }} aria-hidden="true">
    <div className="cortex-motion-core" />
    {Array.from({ length: mode === "estate" ? 14 : 28 }).map((_, index) => <span className="cortex-motion-ray" key={index}><i style={{ transform: `rotate(${(360 / (mode === "estate" ? 14 : 28)) * index}deg)` }} /></span>)}
    {mode !== "hero" && <>{[12, 31, 51, 71, 87].map((position, index) => <b className="cortex-motion-node" key={position} style={{ left: `${position}%`, top: `${index % 2 ? 36 : 62}%` }} />)}<em className="cortex-motion-pulse" /><em className="cortex-motion-pulse" /></>}
  </div>;
}
