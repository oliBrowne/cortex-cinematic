/**
 * CORTEX design reminder: a linear field instrument, never a circular dashboard chart.
 * Local memory, governed judgment, and proof are arranged as sequential infrastructure layers.
 */
import { useState } from "react";

const LAYERS = [
  { number: "01", name: "MEMORY", signal: "DECISIONS / SOURCES / CONTEXT", description: "A local record of what was decided, what it relied on, and the surrounding working context.", measures: ["DECISION RECORDS", "SOURCE LINKS", "LOCAL INDEX"] },
  { number: "02", name: "JUDGMENT", signal: "RULES / ROLES / ESCALATION", description: "A deterministic gate between a question and the material that is permitted to answer it.", measures: ["ROOM INHERITANCE", "ROLE GRANTS", "HUMAN CLINCH"] },
  { number: "03", name: "PROOF", signal: "FRESHNESS / CITATIONS / DELTA", description: "Every response remains traceable to its source state, including revisions that change the answer.", measures: ["SOURCE TRACE", "SYNC STATE", "CHANGE DELTA"] },
] as const;

export function CortexArchitectureExplorer() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = LAYERS[activeIndex ?? 0];

  return <div className="architecture-lattice" aria-label="CORTEX architecture explorer">
    <div className="architecture-lattice-head"><span>LOCAL SYSTEM / 03 LAYERS</span><i /><span>TRACE THE PATH</span></div>
    <div className="architecture-lattice-rail" role="tablist" aria-label="CORTEX system layers" onMouseLeave={() => setActiveIndex(null)}>
      {LAYERS.map((layer, index) => <button type="button" role="tab" key={layer.name} aria-selected={activeIndex === index} className={activeIndex === index ? "is-active" : ""} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)}><span>{layer.number}</span><strong>{layer.name}</strong><small>{layer.signal}</small><i /></button>)}
    </div>
    <div className="architecture-lattice-detail" role="tabpanel" aria-live="polite">
      <div className="architecture-detail-index"><span>{active.number}</span><i /><span>CORE → {active.name}</span></div>
      <h3>{active.name}<br />WITHIN THE BOUNDARY.</h3>
      <p>{active.description}</p>
      <div className="architecture-measures">{active.measures.map((measure, index) => <span key={measure}><i>{String(index + 1).padStart(2, "0")}</i>{measure}</span>)}</div>
    </div>
    <div className="architecture-lattice-foot"><span>REQUEST → CONSCIENCE → {active.name} → ANSWER</span><i /><span>OUTBOUND: NONE</span></div>
  </div>;
}
