/**
 * CORTEX design reminder: readable local evidence, not decorative graph noise.
 * The memory visual behaves like a quiet, source-backed record moving through the boundary.
 */
import { animate } from "animejs/animation";
import { useEffect, useRef } from "react";
import "./memory-vault.css";

const RECORDS = ["MEETING / 14:20", "DECISION / 14:23", "RISK / 14:31", "SOURCE / 14:34"];

export function MemoryLattice() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      root.querySelectorAll<HTMLElement>(".memory-record").forEach((record, index) => animate(record, { opacity: [0, 1], translateX: [30, 0], duration: 650, delay: index * 115, ease: "outExpo" }));
      observer.unobserve(root);
    }, { threshold: 0.3 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="memory-vault" aria-hidden="true"><div className="memory-vault-orbit"><i /><i /><i /></div><div className="memory-vault-core"><b>C</b><span>LOCAL<br />MEMORY</span></div><div className="memory-records">{RECORDS.map((record, index) => <div className="memory-record" key={record}><span>{String(index + 1).padStart(2, "0")}</span><b>{record}</b><i /></div>)}</div><span className="memory-vault-caption">SOURCE-BACKED · CURRENT · GOVERNED</span></div>;
}
