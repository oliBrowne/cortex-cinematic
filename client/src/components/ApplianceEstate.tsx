/**
 * CORTEX design reminder: a physical estate, not an illustration background.
 * Every mini appliance is a discrete compute node; the cluster is one local operating surface.
 */
import { animate } from "animejs/animation";
import { useEffect, useRef } from "react";
import "./appliance-network.css";

type SparkNode = { id: string; label: string; x: number; y: number; scale: number; delay: number; core?: boolean };

const SPARKS: SparkNode[] = [
  { id: "A", label: "SPARK A", x: 30, y: 63, scale: 0.78, delay: 120 },
  { id: "B", label: "SPARK B", x: 43, y: 37, scale: 0.9, delay: 200 },
  { id: "CORE", label: "CORTEX CORE", x: 56, y: 54, scale: 1.15, delay: 40, core: true },
  { id: "C", label: "SPARK C", x: 70, y: 37, scale: 0.86, delay: 280 },
  { id: "D", label: "SPARK D", x: 77, y: 69, scale: 0.74, delay: 360 },
] as const;

export function ApplianceEstate() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = ref.current;
    if (!scope || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      scope.querySelectorAll<HTMLElement>(".spark-node").forEach((node) => animate(node, { opacity: [0, 1], translateY: [22, 0], scale: [0.84, 1], duration: 740, delay: Number(node.dataset.delay || 0), ease: "outExpo" }));
      scope.querySelectorAll<SVGPathElement>(".spark-link").forEach((line, index) => animate(line, { strokeDashoffset: [160, 0], opacity: [0, index === 2 ? 0.85 : 0.44], duration: 980, delay: 220 + index * 110, ease: "outExpo" }));
      observer.unobserve(scope);
    }, { threshold: 0.3 });
    observer.observe(scope);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="appliance-estate spark-estate" aria-label="Interconnected local Spark appliance network">
    <div className="spark-ambient" aria-hidden="true" />
    <svg className="spark-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path className="spark-link" d="M 31 62 L 54 55" /><path className="spark-link" d="M 44 38 L 54 52" /><path className="spark-link spark-link-primary" d="M 58 52 L 69 38" /><path className="spark-link" d="M 58 57 L 76 68" /><path className="spark-link" d="M 44 37 L 69 37" /></svg>
    {SPARKS.map((spark) => <div key={spark.id} className={`spark-node ${spark.core ? "spark-node-core" : ""}`} data-delay={spark.delay} style={{ left: `${spark.x}%`, top: `${spark.y}%`, "--spark-scale": spark.scale } as React.CSSProperties}><div className="spark-box"><i /><b>{spark.label}</b><span>{spark.core ? "SIGNED IMAGE" : "LOCAL NODE"}</span><em>{spark.core ? "LIVE" : spark.id}</em></div><small>{spark.core ? "GOVERNED MEMORY" : "128 GB UNIFIED"}</small></div>)}
    <div className="spark-caption"><span>INTERCONNECTED LOCAL COMPUTE</span><i /><span>ONE GOVERNED BRAIN</span></div>
  </div>;
}
