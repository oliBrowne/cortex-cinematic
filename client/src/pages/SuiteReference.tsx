/**
 * CORTEX design reminder: Suite extends the cinematic near-black appliance and boundary story.
 * Each feature receives one deliberate black-and-ivory reading act with its own supplied illustration.
 */
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, type MouseEvent } from "react";
import { MorphicNavbar } from "../../../components/kokonutui/morphic-navbar";
import { Reveal } from "@/components/Reveal";
import { CortexFooter } from "@/components/CortexFooter";
import "./suite-reference.css";
import "./suite-enhancements.css";

const mark = "/manus-storage/cortex-mark_1f0b9bca.png";
const art = {
  network: "/manus-storage/cortex-node-network-white-black_78d061bb.png",
  brain: "/manus-storage/brain-art_622d2f1a.webp",
  heart: "/manus-storage/soul-art_de262edc.webp",
  eye: "/manus-storage/eye-art_0af5cdb4.webp",
  hermes: "/manus-storage/fig-slack_12cd8595.webp",
  neural: "/manus-storage/fig-provenance_0b482cc5.webp",
  vine: "/manus-storage/fig-freshness_f4978533.webp",
  field: "/manus-storage/cortex-engraving-final_5b8000e4.jpg",
  owl: "/manus-storage/fig-channels_7250efe6.webp",
  pointingHand: "/manus-storage/pointing-hand-engraving_74b4fc2d.jpg",
  lungs: "/manus-storage/fig-confidence_f67343f5.webp",
};

const features = [
  { label: "THE MEMORY · CORTEX", number: "01", title: "ONE LOCAL RECORD. EVERY QUESTION TRACEABLE.", body: "Cortex is the memory engine inside Co-Suite: a proposed record of decisions, their reasoning, and the working context around them. Existing tools can be connected through a deployment-approved interface.", business: "The first question is practical: which records belong inside the boundary, and who should be allowed to query them?", image: art.brain },
  { label: "THE JUDGMENT · CONSCIENCE", number: "02", title: "EVERY QUERY STAYS INSIDE ITS DECISION BOUNDARY.", body: "Conscience is the governance plane proposed for every query. It carries access rules and a named human path for ambiguous decisions.", business: "Access design starts with the rooms and roles your organization already trusts—not with a broad claim about a model.", image: art.heart },
  { label: "THE EVIDENCE · DEPLOYMENT", number: "03", title: "PROOF THE DEPLOYMENT CAN SHOW.", body: "Measurement is part of the deployment conversation. The customer-facing product names are Co-Suite, Cortex, and Conscience; internal evaluation methods are not presented as a product claim.", business: "Define the evidence, decision record, and governance questions that matter before the system is put to work.", image: art.eye },
  { label: "FEATURE 1", number: "04", title: "CONNECT APPROVED TOOLS. KEEP THE BOUNDARY.", body: "Co-Suite is designed to bring governed retrieval to approved tools and agents without requiring a new control room.", business: "A deployment map identifies the records, integrations, and access rules that a first use case needs.", image: art.hermes },
  { label: "FEATURE 2", number: "05", title: "THE DECISION GRAPH KEEPS REASONING CONNECTED.", body: "Decision, rationale, evidence behind it, what it ruled out, and the bets downstream that depend on it—all linked into one structure instead of a pile of transcripts.", business: "A question three levels down resolves back to the room where the call was made.", image: art.neural },
  { label: "FEATURE 3", number: "06", title: "WHEN THE RECORD CHANGES, SHOW WHAT MOVES.", body: "Each deployment defines the sources, synchronization posture, and evidence needed to keep its record current. Timings and end-to-end performance are not claimed before they are demonstrated.", business: "When a decision changes, the team should be able to trace what depends on it and review the record behind it.", image: art.vine },
  { label: "FEATURE 4", number: "07", title: "EVERY ANSWER TRACES BACK TO THE RECORD.", body: "Every answer resolves to a speaker, timestamp, meeting, document, or source. Decisions get trusted without being reopened and challenged on their actual reasoning when they should be.", business: "The relay meeting becomes a query; the reasoning behind the answer remains within reach.", image: art.pointingHand },
  { label: "FEATURE 5", number: "08", title: "MAKE UNCERTAINTY VISIBLE BEFORE IT TRAVELS.", body: "The deployment should make it clear what record supports an answer, where uncertainty remains, and when a human decision is needed.", business: "A useful company record distinguishes a decision, the evidence behind it, and a question that still needs an owner.", image: art.lungs },
  { label: "FEATURE 6", number: "09", title: "GOVERNANCE AT THE POINT OF EVERY QUERY.", body: "Memory without governance is a leak. Every query passes through Conscience: deterministic access inherited from the room, role grants, and a named human for the clinch calls.", business: "Every ruling compiles into a new deterministic rule, so the system gets more explainable over time.", image: art.owl },
] as const;

const suiteContents = [
  { number: "01", label: "MEMORY", id: "suite-memory", tone: "memory" },
  { number: "02", label: "JUDGMENT", id: "suite-judgment", tone: "judgment" },
  { number: "03", label: "EVIDENCE", id: "suite-sight", tone: "sight" },
] as const;

function SuiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="suite-paper-nav fixed inset-x-0 top-0 z-50"><div className="flex h-[66px] items-center justify-between px-5 md:px-8 xl:px-12"><a href="/index.html" className="suite-paper-brand"><img src={mark} alt="" /><span>CORTEX</span></a><MorphicNavbar /><div className="flex items-center gap-3"><a className="suite-paper-access hidden sm:inline-flex" href="mailto:hello@cortexbrain.ai?subject=Cortex%20Early%20Access">ACCESS <ArrowRight size={13} /></a><button className="suite-paper-menu md:hidden" type="button" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? <X size={19} /> : <Menu size={20} />}</button></div></div>{open && <div className="suite-paper-mobile md:hidden"><MorphicNavbar variant="mobile" onNavigate={() => setOpen(false)} /><a href="mailto:hello@cortexbrain.ai?subject=Cortex%20Early%20Access" className="morphic-mobile-access">ACCESS <ArrowRight size={14} /></a></div>}</header>;
}

function FeatureAct({ feature, index }: { feature: typeof features[number]; index: number }) {
  const reducedMotion = useReducedMotion();
  const artRef = useRef<HTMLDivElement>(null);
  const imageFirst = index % 2 === 1;
  const revealFromLeft = index % 2 === 0;
  const entryX = imageFirst ? 64 : -64;
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.78, ease: [0.22, 1, 0.36, 1] as const };
  const closedMask = revealFromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
  const artInView = useInView(artRef, { once: true, amount: 0.28 }) || reducedMotion;
  const sectionId = feature.number === "01" ? "suite-memory" : feature.number === "02" ? "suite-judgment" : feature.number === "03" ? "suite-sight" : `suite-feature-${feature.number}`;
  const tone = feature.number === "01" ? "is-memory" : feature.number === "02" ? "is-judgment" : feature.number === "03" ? "is-sight" : "";
  return <section id={sectionId} className={`suite-act ${imageFirst ? "is-reversed" : ""} ${tone}`}><motion.div className="suite-act-copy" initial={reducedMotion ? false : { opacity: 0, x: entryX }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.28 }} transition={transition}><span className="suite-act-label">{feature.label}</span><h2>{feature.title}</h2><p>{feature.body}</p><aside><b>IN YOUR BUSINESS</b><span>{feature.business}</span></aside></motion.div><motion.div ref={artRef} className={`suite-act-art ${revealFromLeft ? "reveal-ltr" : "reveal-rtl"}`} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: artInView ? 1 : 0 }} transition={transition}><motion.div className="suite-act-art-image" initial={false} animate={{ clipPath: artInView ? "inset(0 0 0 0)" : closedMask }} transition={reducedMotion ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: artInView ? 0.08 : 0 }}><motion.img src={feature.image} alt={`${feature.label}: ${feature.title}`} loading="lazy" decoding="async" initial={false} animate={{ scale: artInView ? 1 : 1.1, x: artInView ? 0 : revealFromLeft ? "-7%" : "7%" }} transition={reducedMotion ? { duration: 0 } : { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: artInView ? 0.08 : 0 }} /></motion.div><span>{feature.number} / 09</span></motion.div></section>;
}

function CortexSignalMonument() {
  return <div className="suite-signal-monument" aria-label="Cortex local intelligence signal monument"><div className="suite-monument-rings" aria-hidden="true"><i /><i /><i /><i /></div><div className="suite-monument-core"><img src={mark} alt="" loading="lazy" decoding="async" /><span>LOCAL<br />ACTIVE</span></div><div className="suite-monument-scale"><span>MEMORY</span><i /><span>JUDGMENT</span><i /><span>PROOF</span></div></div>;
}

export default function SuiteReference() {
  const handleContentsNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    const hash = event.currentTarget.getAttribute("href");
    const target = hash ? document.querySelector<HTMLElement>(hash) : null;
    if (!target) return;

    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    window.history.pushState(null, "", hash);

    const heading = target.querySelector<HTMLElement>("h2");
    if (heading) {
      heading.tabIndex = -1;
      window.setTimeout(() => heading.focus({ preventScroll: true }), reducedMotion ? 0 : 520);
    }
  };

  return <div className="suite-paper"><SuiteHeader /><main><section className="suite-paper-intro"><div><p>CO-SUITE · CORTEX + CONSCIENCE</p><h1>YOUR COMPANY RECORD.<br />WITHIN ITS BOUNDARY.</h1><span>ONE MACHINE. ONE RECORD. ONE GOVERNANCE PLANE.</span></div></section><nav className="suite-contents-rail" aria-label="Suite foundations">{suiteContents.map(item => <a key={item.id} href={`#${item.id}`} onClick={handleContentsNavigation} className={`suite-rail-link is-${item.tone}`}><i className="suite-rail-status" aria-hidden="true" /><span>{item.number}</span>{item.label}</a>)}</nav>{features.map((feature, index) => <FeatureAct key={feature.number} feature={feature} index={index} />)}<section className="suite-terminal"><div className="suite-terminal-copy"><span>DEPLOYMENT MAP</span><h2>START WITH THE<br />BOUNDARY.</h2><p>Map the records, integrations, hardware path, and access rules that a first use case requires. Appliance scope and commercial terms are agreed before deployment.</p></div><pre aria-label="Co-Suite deployment map">DEPLOYMENT REVIEW{`\n`}→ identify records, roles, and approved integrations{`\n`}→ choose prebuilt or bring-your-own-box path{`\n`}→ confirm appliance locality guard and model-plane scope{`\n`}→ agree hardware, support, and commercial terms{`\n`}✓ deployment plan ready for review</pre></section><section className="suite-paper-close"><div className="suite-close-signal" aria-hidden="true"><i /><i /><i /><i /><span /></div><div className="suite-close-cta"><p>THE DEPLOYMENT MAP · THE SYSTEM RECORD</p><h2>PUT THE RECORD<br />WHERE THE WORK IS.</h2><span>Bring the rooms, records, and decisions your team already trusts. We will map the Co-Suite deployment path: what Cortex retrieves, what Conscience governs, and what the appliance must prove.</span><div className="suite-close-actions"><a className="suite-close-button" href="mailto:hello@cortexbrain.ai?subject=Request%20a%20Co-Suite%20Deployment%20Map">REQUEST A DEPLOYMENT MAP <ArrowRight size={16} /></a><a className="suite-close-secondary" href="mailto:hello@cortexbrain.ai?subject=Co-Suite%20Early%20Access">TALK TO THE TEAM <ArrowRight size={14} /></a></div><small>COMMODITY ASSEMBLY · SPEC PENDING · YOUR BOUNDARY</small></div><CortexSignalMonument /></section></main><CortexFooter /></div>;
}
