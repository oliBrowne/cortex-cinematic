/** CORTEX interaction reminder: a fixed utility should stay quiet, compositor-friendly, and never compete with the cinematic scroll. */
/** CORTEX interaction reminder: a fixed utility stays quiet, compositor-friendly, and never competes with the cinematic scroll. */
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number | undefined;
    let lastVisible = false;
    let lastProgressValue = -1;
    const updateVisibility = () => {
      if (frame !== undefined) return;
      frame = window.requestAnimationFrame(() => {
        const maximumScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const nextProgress = Math.min(Math.max(window.scrollY / maximumScroll, 0), 1);
        const nextVisible = window.scrollY > 560;
        const nextProgressValue = Math.round(nextProgress * 100);
        if (nextVisible !== lastVisible) {
          lastVisible = nextVisible;
          setVisible(nextVisible);
        }
        if (nextProgressValue !== lastProgressValue) {
          lastProgressValue = nextProgressValue;
          setProgress(nextProgressValue / 100);
        }
        frame = undefined;
      });
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, []);

  const returnToTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });

  const progressValue = Math.round(progress * 100);
  return <button type="button" className={`back-to-top ${visible ? "is-visible" : ""}`} aria-label={`Back to top — ${progressValue}% through page`} onClick={returnToTop}><svg className="back-to-top-progress" viewBox="0 0 36 36" aria-hidden="true"><circle className="back-to-top-progress-track" cx="18" cy="18" r="15.5" pathLength="100" /><circle className="back-to-top-progress-value" cx="18" cy="18" r="15.5" pathLength="100" style={{ strokeDasharray: `${progressValue} 100` }} /></svg><span className="back-to-top-content"><ArrowUp size={15} /><i>TOP</i></span></button>;
}
