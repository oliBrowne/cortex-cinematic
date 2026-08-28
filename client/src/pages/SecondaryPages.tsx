/**
 * CORTEX design reminder: secondary pages are classified infrastructure documents—dark, exact,
 * physical, and signal-led. CSS ray and line constructions echo the linked site without raster overlays.
 */
import { ArrowLeft, ArrowRight, Check, ChevronDown, Copy, Download, Menu, X } from "lucide-react";
import { type MouseEvent, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { MorphicNavbar } from "../../../components/kokonutui/morphic-navbar";
import { Reveal } from "@/components/Reveal";
import { CortexFooter } from "@/components/CortexFooter";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import "./edge-cage.css";
import "./edge-cage-mobile-fix.css";
import "./edge-proof-plate.css";
import "./edge-proof-details.css";
import "./one-pager-refinement.css";
import "./one-pager-contrast.css";
import "./one-pager-density-repair.css";
import "./one-pager-actions.css";
import "./one-pager-anchor-nav.css";
import "./one-pager-material-proof.css";
import "./brain-art-motion.css";
import { Link004 } from "../../../components/ui/skiper-ui/skiper40";

const mark = "/manus-storage/cortex-mark_1f0b9bca.png";
const onePagerPdfUrl = "/manus-storage/cortex-one-pager-2026-olive_5f1afc2b.pdf";
const visualAssets = {
  network: "/manus-storage/cortex-node-network-white-black_78d061bb.png",
  brain: "/manus-storage/cortex-engraving-brain_16a638bf.png",
  heart: "/manus-storage/cortex-engraving-heart_23dba992.png",
  claspedHands: "/manus-storage/cortex-values-clasped-hands-duotone_9a59524e.png",
  eye: "/manus-storage/cortex-engraving-eye_b812e27e.png",
  hermes: "/manus-storage/cortex-engraving-hermes_a965cb8c.png",
  neuralBrain: "/manus-storage/cortex-engraving-neural-brain_766a2408.png",
  vine: "/manus-storage/cortex-engraving-vine_04bb9d28.png",
  owl: "/manus-storage/cortex-engraving-owl_4913bc7d.png",
  fieldPlate: "/manus-storage/cortex-engraving-final_5b8000e4.jpg",
};
const isBrainArtwork = (src?: string) => src === visualAssets.brain || src === visualAssets.neuralBrain;
type PageKind = "SUITE" | "ONE-PAGER" | "FAQ" | "VALUES" | "THE EDGE";

function SiteHeader({ active }: { active: PageKind }) {
  const [open, setOpen] = useState(false);
  return <header className="site-nav secondary-nav fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0a]">
    <div className="flex h-[66px] items-center justify-between bg-[#0a0a0a] px-5 md:px-8 xl:px-12">
      <a href="/index.html" className="brand-lockup"><img src={mark} alt="" className="brand-mark" /><span>CORTEX</span></a>
      <MorphicNavbar />
      <div className="flex items-center gap-3"><a href="mailto:hello@cortexbrain.ai?subject=Cortex%20Early%20Access" className="nav-cta hidden sm:inline-flex">ACCESS <ArrowRight size={13} strokeWidth={1.6} /></a><button className="mobile-menu-trigger md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X size={19} /> : <Menu size={20} />}</button></div>
    </div>
    {open && <div className="mobile-nav bg-[#0a0a0a] md:hidden"><MorphicNavbar variant="mobile" onNavigate={() => setOpen(false)} /><a href="mailto:hello@cortexbrain.ai?subject=Cortex%20Early%20Access" className="morphic-mobile-access">ACCESS <ArrowRight size={14} /></a></div>}
  </header>;
}


function RayGraphic({ type = "brain" }: { type?: "brain" | "eye" | "heart" | "nodes" }) {
  return <div className={`ray-graphic ray-${type}`} aria-hidden="true"><div className="ray-field" />{type === "brain" && <div className="wire-brain"><i /><i /><i /><i /><i /><i /></div>}{type === "eye" && <div className="wire-eye"><i /><b /></div>}{type === "heart" && <div className="wire-heart" />}{type === "nodes" && <div className="wire-nodes"><i /><i /><i /><i /><i /></div>}</div>;
}

function PageHero({ eyebrow, title, copy, type = "brain", stamp, artSrc }: { eyebrow: string; title: React.ReactNode; copy: string; type?: "brain" | "eye" | "heart" | "nodes"; stamp?: string; artSrc?: string }) {
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.95, ease: [0.22, 1, 0.36, 1] as const };
  return <section className="document-hero">{artSrc ? <motion.div className={`hero-engraving ${isBrainArtwork(artSrc) ? "brain-art-wrap" : ""}`} initial={reducedMotion ? false : { opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={transition}><img src={artSrc} alt="" className={`${artSrc === visualAssets.network ? "network-art" : "engraving-white"} ${isBrainArtwork(artSrc) ? "brain-art-interactive" : ""}`} /></motion.div> : <RayGraphic type={type} />}<motion.div className="document-hero-content" initial={reducedMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: reducedMotion ? 0 : 0.1 }}><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p>{stamp && <span className="hero-stamp">{stamp}</span>}<a className="button-primary" href="mailto:hello@cortexbrain.ai?subject=Cortex%20Early%20Access">REQUEST EARLY ACCESS <ArrowRight size={15} /></a></motion.div></section>;
}

function DocSection({ label, title, children, className = "" }: { label: string; title: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <section className={`document-section ${className}`}><Reveal><p className="document-label">{label}</p><h2>{title}</h2></Reveal><Reveal delay={70} className="document-copy">{children}</Reveal>{label === "WHY A SUITE" && <SuiteVisualTriad />}</section>;
}

function SuiteVisualTriad() {
  const [activeIndex, setActiveIndex] = useState(1);
  const reducedMotion = useReducedMotion();
  const panels = [
    ["CONSCIENCE", "JUDGMENT", "A governed answer begins with who may see it, and why.", visualAssets.heart],
    ["CORTEX", "MEMORY", "One synthesized record for the decisions that shape the company.", visualAssets.brain],
    ["CORNEA", "PROOF", "Freshness and provenance remain visible in every claim.", visualAssets.eye],
  ] as const;
  const [name, title, copy, image] = panels[activeIndex];
  return <div className="suite-visual-triad"><div className="suite-triad-frame"><motion.img key={image} src={image} alt={`${name} engraving`} className={`engraving-white ${isBrainArtwork(image) ? "brain-art-interactive" : ""}`} loading="lazy" decoding="async" initial={reducedMotion ? false : { opacity: 0, scale: 1.07 }} animate={{ opacity: 1, scale: 1 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }} /><div className="suite-triad-copy"><span>0{activeIndex + 1} / {name}</span><h3>{title}</h3><p>{copy}</p></div></div><div className="suite-triad-tabs" role="tablist" aria-label="Co-Suite layers">{panels.map(([label], index) => <button key={label} type="button" role="tab" aria-selected={activeIndex === index} className={activeIndex === index ? "active" : ""} onClick={() => setActiveIndex(index)}>{label}</button>)}</div><Link004 href="mailto:hello@cortexbrain.ai?subject=Cortex%20System%20Map" className="suite-triad-link">REQUEST A SYSTEM MAP</Link004></div>;
}

export function Suite() {
  const pillars = [
    ["THE MEMORY · CORTEX", "ONE RECORD YOUR AGENTS CAN QUERY", "Cortex is the memory engine inside Co-Suite: a proposed record of decisions, their reasoning, and the working context around them."],
    ["THE JUDGMENT · CONSCIENCE", "WHO SEES WHAT, AND WHY", "An all-knowing memory is undeployable without governance. Conscience sits on every query: deterministic room- and role-based rules first, a weighted jury for the grey, a named human for clinch calls."],
    ["THE EVIDENCE · DEPLOYMENT", "MEASURE WHAT THE SYSTEM CAN SHOW", "Customer-facing Co-Suite pairs Cortex retrieval with Conscience governance. Internal evaluation methods are not presented as a product claim."],
  ];
  const features = ["YOUR AGENTS QUERY IT", "THE DECISION GRAPH", "FRESH WHILE IT STILL MATTERS", "PROVENANCE ON EVERY ANSWER", "QUIET UNTIL CERTAIN", "CONSCIENCE: WHO SEES WHAT, AND WHY"];
  return <div className="document-page"><SiteHeader active="SUITE" /><main><PageHero eyebrow="CO-SUITE · CORTEX + CONSCIENCE" title={<>YOUR AI IS READY.<br />IS YOUR BUSINESS?</>} copy="The hard part is the company around an agent: a record it can query, rules for what it may see, and an appliance path that is explicit about its boundary." type="brain" artSrc={visualAssets.network} /><DocSection label="WHY CO-SUITE" title={<>POWERFUL TOOLS<br />NEED A BOUNDARY</>}><p>Co-Suite is the proposed machine plus software stack. Cortex is its memory engine; Conscience is its governance plane. The product claim is a combination and a deployment path—not an unsupported novelty claim.</p><p className="pull-line">One machine. One record. One governance plane.</p></DocSection><section className="pillar-stack">{pillars.map(([label, title, copy], index) => <Reveal key={label} delay={index * 60} className="pillar"><span>{String(index + 1).padStart(2, "0")}</span><div><p className="document-label">{label}</p><h2>{title}</h2><p>{copy}</p><b>IN YOUR BUSINESS <ArrowRight size={14} /></b></div></Reveal>)}</section><section className="feature-matrix"><div className="matrix-title"><p className="document-label">FEATURE SET</p><h2>INFRASTRUCTURE,<br />NOT ANOTHER ASSISTANT.</h2></div>{features.map((feature, index) => <Reveal className="feature-line" delay={index * 45} key={feature}><span>{String(index + 1).padStart(2, "0")}</span><h3>{feature}</h3><ArrowRight size={18} /></Reveal>)}</section><DocSection label="DEPLOYMENT MAP" title={<>START WITH THE<br />BOUNDARY</>}><p>Map the records, access rules, integrations, hardware path, and commercial scope before deployment. The component specification, procurement route, and cost model remain open in the reconstructed draft.</p><pre>DEPLOYMENT REVIEW {'→'} records + roles {'→'} prebuilt or bring-your-own path {'→'} appliance locality guard {'→'} deployment plan ready for review</pre></DocSection><section className="field-plate"><img src={visualAssets.fieldPlate} alt="Co-Suite deployment field plate" className="engraving-white" loading="lazy" decoding="async" /><span>DEPLOYMENT MAP / GOVERNED RECORD / SPEC PENDING</span></section><section className="timeline-section"><p className="document-label">THE DEPLOYMENT MAP</p><h2>WHAT NEEDS<br />TO BE DECIDED.</h2><div>{[["01","Record and access scope"],["02","Approved integrations"],["03","Hardware path and specification"],["04","Commercial and support terms"]].map(([time, text]) => <Reveal key={time} className="timeline-node"><span>{time}</span><b>{text}</b><i /></Reveal>)}</div></section><AccessBand title="CO-SUITE" artSrc={visualAssets.neuralBrain} /></main><CortexFooter /></div>;
}

const onePagerSections = [
  ["IN FIFTY WORDS", "Co-Suite is a proposed machine plus software stack. Cortex is the memory engine; Conscience is the governance plane. Together, they are designed to hold a governed company record inside an explicit deployment boundary."],
  ["WHAT WE CAN SAY", "The appliance model plane is designed to reject an off-box configuration at startup. End-to-end local-model performance, timing, and freshness figures are not claimed before they are demonstrated."],
  ["WHAT IT IS", "Two problems. Two organs. One system. The first is a captured company that cannot query its record. The second is the telephone game through which direction sheds its rationale. Cortex turns records into living memory; Conscience governs its paths."],
  ["HOW IT WORKS", "Capture-agnostic ingest, deterministic extraction, a decision graph, headless access over MCP, and calibrated confidence gating. The result is infrastructure rather than a workflow replacement."],
  ["GOVERNANCE", "Access is inherited from the room, role grants layer on top, sensitivity is classified per utterance, and policy is code. The ambiguous residue goes to a weighted council; clinch calls reach a named human."],
  ["ECONOMICS", "The hardware-led direction moves model execution toward customer-controlled compute. Hardware price, margin, lead time, unit economics, and token-cost arithmetic remain open in the reconstructed draft."],
];

const onePagerAnchors = [
  { id: "summary", label: "SUMMARY" },
  { id: "freshness", label: "FRESHNESS" },
  { id: "system", label: "SYSTEM" },
  { id: "method", label: "METHOD" },
  { id: "governance", label: "GOVERNANCE" },
  { id: "economics", label: "ECONOMICS" },
] as const;

export function OnePager() {
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "shared" | "failed">("idle");
  const [isPreparingPdf, setIsPreparingPdf] = useState(false);
  const scrollToOnePagerAnchor = (id: string, behavior: ScrollBehavior) => {
    const target = document.getElementById(id);
    if (!target) return false;
    target.scrollIntoView({ behavior, block: "start" });
    return true;
  };
  useEffect(() => {
    if (!window.location.hash) return;
    const anchorId = decodeURIComponent(window.location.hash.slice(1));
    const frame = window.requestAnimationFrame(() => scrollToOnePagerAnchor(anchorId, "auto"));
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const handleContentsNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    const anchorId = event.currentTarget.hash.slice(1);
    if (!anchorId) return;
    event.preventDefault();
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (scrollToOnePagerAnchor(anchorId, behavior)) window.history.pushState(null, "", `#${anchorId}`);
  };
  const handlePdfDownload = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isPreparingPdf) return;
    setIsPreparingPdf(true);
    window.setTimeout(() => {
      window.location.assign(onePagerPdfUrl);
      setIsPreparingPdf(false);
    }, 420);
  };
  const handleShare = async () => {
    const link = new URL("/onepager.html", window.location.origin).toString();
    if (navigator.share) {
      try {
        await navigator.share({ title: "CORTEX BRAIN — ONE-PAGER", text: "The company brain your existing agents query.", url: link });
        setShareStatus("shared");
        window.setTimeout(() => setShareStatus("idle"), 2200);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(link);
      setShareStatus("copied");
      toast.success("One-Pager link copied", { description: "Ready to paste and share.", duration: 2200 });
    } catch {
      const input = document.createElement("textarea");
      input.value = link;
      input.style.cssText = "position:fixed;opacity:0;pointer-events:none;";
      document.body.appendChild(input);
      input.select();
      const copied = document.execCommand("copy");
      input.remove();
      setShareStatus(copied ? "copied" : "failed");
      if (copied) toast.success("One-Pager link copied", { description: "Ready to paste and share.", duration: 2200 });
    }
    window.setTimeout(() => setShareStatus("idle"), 2200);
  };
  return <div className="paper-page"><SiteHeader active="ONE-PAGER" /><main><section className="paper-masthead"><img src={visualAssets.hermes} alt="" className="paper-hermes engraving-white" /><p className="eyebrow">CO-SUITE / CORTEX + CONSCIENCE</p><h1>CO-SUITE</h1><p>A proposed appliance-led stack: Cortex retrieves the record; Conscience governs what travels.</p><span>ONE-PAGER · DRAFT · 2026-08-20</span><div className="paper-actions"><Tooltip><TooltipTrigger asChild><a className={`paper-download ${isPreparingPdf ? "is-preparing" : ""}`} href={onePagerPdfUrl} download="cortex-brain-one-pager-2026.pdf" onClick={handlePdfDownload} aria-busy={isPreparingPdf} aria-label={isPreparingPdf ? "Preparing the CORTEX Brain One-Pager PDF" : "Download the CORTEX Brain One-Pager PDF"}>{isPreparingPdf ? <Spinner className="size-3" aria-label="Preparing PDF" /> : <Download size={14} />}{isPreparingPdf ? "PREPARING" : "DOWNLOAD PDF"}</a></TooltipTrigger><TooltipContent side="bottom" sideOffset={8}>{isPreparingPdf ? "Preparing your PDF" : "Download the compact PDF"}</TooltipContent></Tooltip><Tooltip><TooltipTrigger asChild><button className={`paper-share ${shareStatus !== "idle" ? "is-confirmed" : ""}`} type="button" onClick={handleShare} aria-label={shareStatus === "copied" ? "One-Pager link copied" : shareStatus === "shared" ? "One-Pager shared" : "Share One-Pager link"}>{shareStatus === "copied" || shareStatus === "shared" ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{shareStatus === "copied" ? "LINK COPIED" : shareStatus === "shared" ? "SHARED" : shareStatus === "failed" ? "COPY FAILED" : "SHARE"}</span></button></TooltipTrigger><TooltipContent side="bottom" sideOffset={8}>Share this One-Pager</TooltipContent></Tooltip></div></section><nav className="paper-section-nav" aria-label="One-Pager contents">{onePagerAnchors.map(anchor => <a key={anchor.id} href={`#${anchor.id}`} onClick={handleContentsNavigation}>{anchor.label}</a>)}</nav><article className="paper-document">{onePagerSections.map(([label, body], index) => <Reveal key={label} id={onePagerAnchors[index].id} delay={index * 40} className={index === 0 ? "paper-lede" : "paper-block"}><p className="paper-stamp">{label}</p>{index === 1 && <h2>FRESHNESS, DEFINED AT DEPLOYMENT</h2>}{index === 2 && <h2>TWO PROBLEMS. TWO ORGANS. ONE SYSTEM.</h2>}{index > 2 && <h2>{label}</h2>}<p>{body}</p>{index === 2 && <div className="paper-problem-grid"><span><b>01 / CORTEX</b>RECORD + RETRIEVAL</span><span><b>02 / CONSCIENCE</b>GOVERNED PATHS</span></div>}</Reveal>)}</article><AccessBand title="CO-SUITE" dark ctaHref="mailto:hello@cortexbrain.ai?subject=Co-Suite%20Deployment%20Map" /></main><CortexFooter /></div>;
}

  const questions = [
  ["IS THIS TWO PRODUCTS?", "No. Cortex is the memory; Conscience is the access control on that memory. Nobody calls a database and its permission system two products. You cannot ship one without the other."],
  ["ARE YOU COMPETING WITH MICROSOFT COPILOT?", "No. Cortex sits underneath assistants, across Slack, Teams, Zoom, email and documents. Copilot could be a client of Cortex—the substrate is intentionally cross-vendor."],
  ["HOW ARE YOU DIFFERENT FROM NOTE-TAKERS AND ENTERPRISE SEARCH?", "Note-takers produce records rather than cross-meeting memory. Enterprise search mirrors document ACLs. Conscience derives access for spoken information that never had an ACL at all."],
  ["WHAT EXACTLY IS CONSCIENCE?", "Every query passes through three tiers: deterministic rules first, a weighted jury for the residue, and named humans for the clinch calls. Every human ruling compiles into a new deterministic rule."],
  ["CAN ANSWERS LEAK INFORMATION INDIRECTLY?", "Compartmented content is absent from the candidate set before any answer is drafted. The design accounts for both aggregation leaks and refusals that confirm a thing exists."],
  ["HOW FRESH IS THE MEMORY?", "Freshness depends on the sources and synchronization posture chosen for a deployment. The site does not publish a fixed timing or end-to-end performance figure."],
  ["WHERE DOES OUR DATA LIVE?", "The appliance direction is designed to enforce local model-plane configuration at startup. The prebuilt and bring-your-own paths are draft direction pending a published hardware specification and demonstrated end-to-end run."],
];

export function Faq() { return <div className="document-page"><SiteHeader active="FAQ" /><main><PageHero eyebrow="CORTEX / COMMON QUESTIONS" title={<>COMMON<br />QUESTIONS</>} copy="The ones investors, founders, and CISOs actually ask—answered straight." type="eye" artSrc={visualAssets.eye} /><section className="faq-wrap">{questions.map(([question, answer], index) => <Reveal className="faq-item" delay={index * 38} key={question}><span>{String(index + 1).padStart(2, "0")}</span><div><p className="document-label">{index < 3 ? "POSITIONING" : index < 5 ? "GOVERNANCE" : "PRACTICAL"}</p><h2>{question}</h2><p>{answer}</p></div><ChevronDown size={18} /></Reveal>)}</section><AccessBand title="QUESTIONS, ANSWERED" artSrc={visualAssets.owl} /></main><CortexFooter /></div>; }

export function Values() {
  const values = [
    {
      index: "01",
      section: "VALUES",
      title: "SHIP AT BREAKNECK PACE",
      paragraphs: [
        "Speed is a value here, not a phase. The gap between deciding something and shipping it is where momentum dies, so we keep that gap brutally short. Small releases, every week, in front of real users. A feature that ships this Friday and gets corrected next Friday beats a perfect one that arrives next quarter.",
        "The plan is not the product. The thing running in front of a user is the product.",
      ],
    },
    {
      index: "02",
      section: "VALUES",
      title: "TEST LIKE THE ANSWER MATTERS",
      paragraphs: [
        "We can only move this fast because nothing ships untested. Every release is instrumented, every claim in the product is one we can measure, and safety is designed in before the first line, not audited in after the last. This is not caution competing with speed — it is what makes the speed survivable.",
        "We sell a product whose entire premise is that companies can trust it with everything they have ever said. A team that cut corners on testing and safety could not look a customer in the eye and make that pitch. We hold ourselves to the standard we sell.",
      ],
      callout: "EXTREME PACE AND EXTREME RIGOR ARE NOT A TRADE-OFF. RIGOR IS THE BRAKE THAT LETS YOU DRIVE FAST.",
    },
    {
      index: "03",
      section: "CULTURE",
      title: "VICTORY IS SHARED",
      paragraphs: [
        "Wins belong to the team. Nobody here lands a deal, closes a launch, or fixes an outage alone — someone reviewed the code, someone warmed the lead, someone covered the pager. So when it works, everyone who touched it gets the credit, and when it breaks, we debug the system instead of hunting for a name.",
      ],
    },
    {
      index: "04",
      section: "CULTURE",
      title: "NO ONE GETS LEFT BEHIND",
      paragraphs: [
        "We grow as a team or not at all. If one person is stuck, that is everyone's problem before it is their failure: we pair, we teach, we hand over context instead of hoarding it. Seniority here is measured by how many people are better at their jobs because you were in the room.",
        "The fastest team is not the one with the fastest person. It is the one where nobody is stuck for long.",
      ],
    },
  ];

  return <div className="document-page values-page"><SiteHeader active="VALUES" /><main><section className="values-hero"><div className="values-hero-grid" aria-hidden="true">{Array.from({ length: 6 }).map((_, index) => <i key={index} />)}</div><div className="values-hero-copy"><motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>VALUES &amp; CULTURE</motion.p><motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.82, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>HOW WE WORK,<br />AND WHO WE ARE<br />WHILE WE WORK.</motion.h1><motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}>The standards that let a fast team ship work it can stand behind.</motion.p><motion.div className="values-hero-rule" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.27, ease: [0.22, 1, 0.36, 1] }}><span>MOVE TOGETHER</span><i /><span>HOLD THE LINE</span></motion.div></div><motion.div className="values-hands-wrap" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}><img src={visualAssets.claspedHands} alt="Two people in a strong clasped forearm handshake" className="values-hands" /><span className="values-hands-caption">SHARED MOMENTUM / 01</span></motion.div></section><section className="values-manifest"><div className="values-manifest-rail" aria-hidden="true"><span>COMPANY OPERATING VALUES</span><i /><span>2026</span></div>{values.map((value, index) => <Reveal key={value.title} delay={index * 55} className={`value-manifest value-manifest-${value.index}`}><div className="value-manifest-meta">{(index === 0 || index === 2) && <p>{value.section}</p>}<span>{value.index} / 04</span></div><div className="value-manifest-body"><h2>{value.title}</h2>{value.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex} className={paragraphIndex === value.paragraphs.length - 1 && value.paragraphs.length > 1 ? "value-last-line" : ""}>{paragraph}</p>)}{value.callout && <aside>{value.callout}</aside>}</div><div className={`value-manifest-signal value-signal-${value.index}`} aria-hidden="true"><i /><em /><span>{index < 2 ? "SHIP / VERIFY" : "PAIR / SHARE"}</span></div></Reveal>)}</section><section className="values-build"><div className="values-build-grid" aria-hidden="true"><i /><i /><i /></div><Reveal><p>COME BUILD WITH US</p><h2>FAST ON PURPOSE.<br />PROVEN IN PRACTICE.<br />NO ONE LEFT BEHIND.</h2><a className="button-primary" href="mailto:hello@cortexbrain.ai?subject=Working%20at%20Cortex">COME BUILD WITH US <ArrowRight size={15} /></a><span>CORTEX · 2026 · CORTEXBRAIN.AI</span></Reveal></section></main><CortexFooter /></div>;
}

function EdgeProofPlate() {
  const [detailFocus, setDetailFocus] = useState<"appliance" | "boundary" | "signal" | null>(null);
  const details = { appliance: { index: "01", label: "APPLIANCE PATH", title: "ONE SIGNED IMAGE.", copy: "The draft direction assembles the software stack as a signed image for either a prebuilt or qualifying customer-owned machine." }, boundary: { index: "02", label: "LOCALITY GUARD", title: "STARTUP ENFORCEMENT.", copy: "In appliance mode, the startup guard is designed to fail when the configured model plane points off-box." }, signal: { index: "03", label: "APPROVED INTEGRATIONS", title: "DEPLOYMENT-DEFINED.", copy: "The customer and deployment plan determine the approved integrations and synchronization posture." } } as const;
  const activeDetail = detailFocus ? details[detailFocus] : null;
  return <div className="edge-proof-plate" aria-label="Co-Suite appliance locality-guard diagram"><div className="edge-plate-grid" aria-hidden="true" /><header><span>APPLIANCE PATH / FIELD PLATE</span><i /><span>DRAFT DIRECTION</span></header><div className="edge-plate-appliance"><button type="button" className="edge-plate-id" onClick={() => setDetailFocus("appliance")} aria-expanded={detailFocus === "appliance"} aria-controls="edge-appliance-detail"><span>01</span><b>SIGNED IMAGE</b></button><div className="edge-plate-vent" aria-hidden="true">{Array.from({ length: 11 }).map((_, index) => <i key={index} />)}</div><div className="edge-plate-console"><span>CO-SUITE</span><i /><b>MODEL PLANE</b></div><footer>SIGNED IMAGE / STARTUP CHECK</footer></div><button type="button" className="edge-plate-boundary" onClick={() => setDetailFocus("boundary")} aria-expanded={detailFocus === "boundary"} aria-controls="edge-appliance-detail"><span>02</span><i /><b>LOCALITY<br />GUARD</b><small>OFF-BOX REJECTED</small></button><button type="button" className="edge-plate-egress" onClick={() => setDetailFocus("signal")} aria-expanded={detailFocus === "signal"} aria-controls="edge-appliance-detail"><span>03 / INTEGRATIONS</span><i /><em>DEPLOYMENT-DEFINED</em></button><div className="edge-plate-caption">YOUR SCOPE / YOUR HARDWARE PATH / YOUR REVIEW</div>{activeDetail && <aside id="edge-appliance-detail" className="edge-plate-detail" aria-live="polite"><button type="button" className="edge-detail-close" onClick={() => setDetailFocus(null)} aria-label="Close Edge detail">CLOSE <X size={12} /></button><span>EDGE DETAIL / {activeDetail.index}</span><h2>{activeDetail.title}</h2><p>{activeDetail.copy}</p><b>{activeDetail.label}</b></aside>}</div>;
}

function EdgeCage() {
  return <section className="edge-cage"><div className="edge-cage-grid" aria-hidden="true" /><div className="edge-cage-copy"><p className="eyebrow">YOUR FLOOR · YOUR BOUNDARY · YOUR REVIEW</p><h1>THE RECORD<br />STAYS EXPLICIT</h1><p>Co-Suite is draft hardware-led direction: a signed image on either a prebuilt machine or a qualifying customer-owned box. Appliance mode is designed to enforce local model-plane configuration at startup.</p><a className="button-primary" href="mailto:hello@cortexbrain.ai?subject=Co-Suite%20Edge%20Access">REQUEST THE DEPLOYMENT MAP <ArrowRight size={15} /></a></div><div className="edge-appliance-stage"><EdgeProofPlate /><div className="edge-proof-signal" aria-hidden="true"><i /><span /></div></div><div className="edge-cage-foot"><span>APPLIANCE DIRECTION / DRAFT</span><i /><span>LOCALITY GUARD</span><i /><span>SPECIFICATION PENDING</span></div></section>;
}

export function Edge() {
  const systems = [
    { index: "01", label: "STORE", title: "GOVERNED RECORD", trace: "RETRIEVAL · POLICY · TRACE", copy: "Cortex and Conscience are proposed to share an explicit deployment boundary for the company record and its governance." },
    { index: "02", label: "INGEST", title: "APPROVED SOURCES", trace: "DEPLOYMENT · SCOPE · REVIEW", copy: "The deployment map identifies the approved sources, record scope, and synchronization posture." },
    { index: "03", label: "SURFACE", title: "CONNECTORS & MCP", trace: "CUSTOMER-APPROVED · GOVERNED", copy: "Co-Suite is designed to connect retrieval to approved agents and integrations through the chosen deployment interface." },
    { index: "04", label: "THINK", title: "MODEL PLANE", trace: "APPLIANCE · STARTUP · GUARD", copy: "In appliance mode, the startup guard is designed to reject an off-box model-plane configuration." },
  ];

  return <div className="document-page edge-page"><SiteHeader active="THE EDGE" /><main><EdgeCage /><DocSection label="THE BOUNDARY" title={<>START WITH<br />THE GUARD</>}><p>The appliance direction is specific about one enforceable control: in appliance mode, startup is designed to fail if the model plane is configured off-box. Other integration and network controls are deployment-defined.</p><p className="tech-badge mt-7">APPLIANCE MODE <span /> LOCALITY CHECK</p><div className="edge-boundary-plate" aria-label="Annotated appliance locality guard"><div><span>APPLIANCE SIDE</span><b>MODEL PLANE</b></div><i aria-hidden="true" /><div><span>DEPLOYMENT RULE</span><b>OFF-BOX REJECTED</b></div><em>CHECKED BEFORE STARTUP</em></div></DocSection><section className="edge-readout" aria-label="Edge deployment status"><div className="edge-readout-material" aria-hidden="true"><i /><span>COMMODITY ASSEMBLY / LOCALITY GUARD</span></div><Reveal className="edge-readout-primary"><span>ENFORCEMENT / 01</span><strong>LOCAL</strong><b>MODEL-PLANE GUARD</b><p>The hardware-led direction uses a startup check rather than an unverified performance claim.</p></Reveal><div className="edge-readout-secondary"><Reveal delay={70}><span>ECONOMICS</span><strong>OPEN</strong><p>Cost model, unit economics, and token arithmetic remain unpublished.</p></Reveal><Reveal delay={140}><span>HARDWARE</span><strong>DRAFT</strong><p>Prebuilt and bring-your-own paths depend on a specification not yet published.</p></Reveal></div></section><section className="edge-assembly"><div className="edge-assembly-intro"><Reveal><p className="document-label">THE IMAGE</p><h2>ONE SIGNED IMAGE.<br />ONE EXPLICIT GUARD.</h2></Reveal><Reveal delay={70}><p>The proposed appliance groups the software stack into a signed image. Customer scope, hardware, and commercial terms are agreed before deployment.</p><span>APPLIANCE DIRECTION / RECONSTRUCTED DRAFT</span></Reveal></div><div className="edge-assembly-rack"><div className="edge-assembly-axis" aria-hidden="true"><i /></div><div className="edge-assembly-chassis" aria-hidden="true"><span>CO-SUITE / APPLIANCE PATH</span><div><i /><b>SIGNED IMAGE</b><em>DRAFT</em></div><small>RECORD · POLICY · CONNECTORS · MODEL PLANE</small></div>{systems.map((system, index) => <Reveal key={system.label} delay={index * 55} className={`edge-part edge-part-${index + 1}`}><div className="edge-part-code"><span>{system.index}</span><b>{system.label}</b></div><div><small>{system.trace}</small><h3>{system.title}</h3><p>{system.copy}</p></div></Reveal>)}</div></section><section className="edge-decision"><Reveal className="edge-decision-copy"><p className="document-label">HARDWARE PATHS</p><h2>TWO PATHS.<br />SPEC PENDING.</h2><p>The reconstructed draft records two paths against one signed image. Component specifications, procurement, pricing, support, warranty, and RMA terms remain open.</p></Reveal><div className="edge-route-set"><Reveal delay={60} className="edge-route"><span>PATH / 01</span><i aria-hidden="true" /><h3>PREBUILT</h3><p>Co-Suite would assemble, image, certify, and ship commodity components only after a signed contract.</p><b>BUILD TO ORDER · NO SPECULATIVE INVENTORY</b></Reveal><Reveal delay={130} className="edge-route edge-route-appliance"><span>PATH / 02</span><i aria-hidden="true" /><h3>BRING YOUR OWN BOX</h3><p>The same image is proposed for a customer machine meeting a hardware specification that is not yet published.</p><b>CUSTOMER MACHINE · SPECIFICATION PENDING</b></Reveal></div></section><AccessBand title="MAP THE DEPLOYMENT" edge /></main><CortexFooter /></div>;
}

function AccessBand({ title, dark = false, artSrc, edge = false, ctaHref = "mailto:hello@cortexbrain.ai?subject=Co-Suite%20Early%20Access" }: { title: string; dark?: boolean; artSrc?: string; edge?: boolean; ctaHref?: string }) { return <section className={`access-band ${dark ? "access-dark" : ""} ${edge ? "edge-access-band" : ""}`}>{artSrc && !edge && <img src={artSrc} alt="" className={`access-engraving engraving-white ${isBrainArtwork(artSrc) ? "brain-art-interactive" : ""}`} loading="lazy" decoding="async" />}<p>EARLY ACCESS · DEPLOYMENT MAP · AI INFRASTRUCTURE</p><h2>{title}</h2><span>{edge ? "SIGNED IMAGE · LOCALITY GUARD · SPECIFICATION PENDING" : "Mens omnium. Memoria una. Conscientia custos."}</span><a className="button-primary" href={ctaHref}>REQUEST EARLY ACCESS <ArrowRight size={15} /></a></section>; }
