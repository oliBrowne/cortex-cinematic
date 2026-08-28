/**
 * CORTEX design reminder: the supplied scroll video is the product; asymmetric editorial copy,
 * warm off-white type, engraved rules, and dark infrastructure surfaces only support its story.
 */
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MorphicNavbar } from "../../../components/kokonutui/morphic-navbar";
import { CortexArchitectureExplorer } from "@/components/CortexArchitectureExplorer";
import { CortexMotionField } from "@/components/CortexMotionField";
import { ApplianceEstate } from "@/components/ApplianceEstate";
import { MemoryLattice } from "@/components/MemoryLattice";
import { CortexFooter } from "@/components/CortexFooter";
import "./home-visual-edits.css";
import "./home-repairs.css";
import "./home-performance.css";
import "./home-hardware-logo-scale.css";
import "./home-mobile-no-overlap.css";
import "./home-handdrawn-video.css";
import { Reveal } from "@/components/Reveal";
import { getScrollVideoTime, shouldSeekVideo } from "@/lib/scrollScrub";

const ASSETS = {
  video: "/manus-storage/cortex-handdrawn-hero-10s_f3f9d824.mp4",
  mark: "/manus-storage/cortex-mark_1f0b9bca.png",
  network: "/manus-storage/cortex-node-network-white-black_78d061bb.png",
  neuralBrain: "/manus-storage/cortex-engraving-neural-brain_766a2408.png",
  brain: "/manus-storage/cortex-engraving-brain_16a638bf.png",
  heart: "/manus-storage/cortex-engraving-heart_23dba992.png",
  eye: "/manus-storage/cortex-engraving-eye_b812e27e.png",
  hermes: "/manus-storage/cortex-engraving-hermes_a965cb8c.png",
  vine: "/manus-storage/cortex-engraving-vine_04bb9d28.png",
  owl: "/manus-storage/cortex-engraving-owl_4913bc7d.png",
  fieldPlate: "/manus-storage/cortex-engraving-final_5b8000e4.jpg",
  finalInfrastructure: "/manus-storage/cortex-final-infrastructure-cool-duotone_c768f1d9.png",
};

const navItems = [
  ["HOME", "/"],
  ["SUITE", "/suite.html"],
  ["ONE-PAGER", "/onepager.html"],
  ["FAQ", "/faq.html"],
  ["VALUES", "/values.html"],
  ["THE EDGE", "/edge.html"],
] as const;

const imageRows = [
  ["01", "STORE", "RECORD", "The appliance design groups the company record, retrieval indexes, decision graph, and governance log within one deployment boundary."],
  ["02", "INGEST", "CONNECTORS", "Sources can be connected through tenant-approved integrations and a deployment-defined outbound synchronization schedule."],
  ["03", "SURFACE", "CONNECTORS & MCP", "Co-Suite is designed to expose governed retrieval to the tools and agents a customer already uses."],
  ["04", "THINK", "MODEL PLANE", "In appliance mode, the startup guard is designed to reject an off-box model-plane configuration before the service starts."],
] as const;

const comparisonRows = [
  ["Where it runs", "Your qualifying local compute", "A supported system we source and set up for you"],
  ["Hardware path", "Compatibility review before deployment", "NVIDIA, AMD, Apple, or ASUS options selected to fit the deployment"],
  ["Model plane", "Local appliance-mode configuration", "Local appliance-mode configuration"],
  ["Setup", "Image and integration scope agreed with your team", "We source, image, configure, and hand over the local system"],
  ["Updates", "Deployment terms agreed with your team", "Deployment terms agreed with your team"],
  ["Ownership", "You retain your existing local compute", "You purchase the selected supported hardware path"],
] as const;

function clamp(value: number, lower = 0, upper = 1) {
  return Math.min(Math.max(value, lower), upper);
}

function storyOpacity(progress: number, start: number, end: number) {
  const inRamp = clamp((progress - start) / 0.045);
  const outRamp = clamp((end - progress) / 0.055);
  return Math.min(inRamp, outRamp);
}

function StoryCopy({
  progress,
  start,
  end,
  className,
  children,
}: {
  progress: number;
  start: number;
  end: number;
  className: string;
  children: React.ReactNode;
}) {
  const opacity = storyOpacity(progress, start, end);
  return (
    <div
      className={`cinema-beat ${className}`}
      style={{ opacity, transform: `translateY(${(1 - opacity) * 28}px)` }}
      aria-hidden={opacity < 0.08}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cinemaRef = useRef<HTMLElement>(null);
  const targetProgress = useRef(0);
  const smoothedProgress = useRef(0);
  const emittedProgress = useRef(0);
  const queueVideoSync = useRef<(() => void) | null>(null);
  const [progress, setProgress] = useState(0);
  const [visualProgress, setVisualProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    return () => {
      root.style.scrollBehavior = previousBehavior;
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    let frame: number | undefined;
    let emittedGuideProgress = -1;
    let emittedScrolled = false;

    const updateProgress = () => {
      frame = undefined;
      const section = cinemaRef.current;
      if (!section) return;
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const localScroll = window.scrollY - section.offsetTop;
      const nextProgress = clamp(localScroll / distance);
      const nextScrolled = window.scrollY > 24;

      targetProgress.current = nextProgress;
      if (Math.abs(emittedGuideProgress - nextProgress) >= 0.001) {
        emittedGuideProgress = nextProgress;
        setProgress(nextProgress);
      }
      if (emittedScrolled !== nextScrolled) {
        emittedScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    const queueProgressUpdate = () => {
      if (frame !== undefined) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", queueProgressUpdate, { passive: true });
    window.addEventListener("resize", queueProgressUpdate);
    return () => {
      window.removeEventListener("scroll", queueProgressUpdate);
      window.removeEventListener("resize", queueProgressUpdate);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let frame: number | undefined;
    const updateVideo = () => {
      frame = undefined;
      const difference = targetProgress.current - smoothedProgress.current;
      smoothedProgress.current = reducedMotion || Math.abs(difference) < 0.00015
        ? targetProgress.current
        : smoothedProgress.current + difference * 0.18;
      const video = videoRef.current;
      if (video && videoReady && !reducedMotion && video.readyState >= HTMLMediaElement.HAVE_METADATA && Number.isFinite(video.duration)) {
        const intendedTime = getScrollVideoTime(smoothedProgress.current, video.duration);
        // Browsers cannot render every rapid `currentTime` assignment. Let an in-flight
        // seek resolve, then schedule only a meaningful next frame; this stays reversible.
        if (shouldSeekVideo(video.currentTime, intendedTime, video.seeking)) {
          video.currentTime = intendedTime;
        }
      }
      if (Math.abs(emittedProgress.current - smoothedProgress.current) > 0.001) {
        emittedProgress.current = smoothedProgress.current;
        setVisualProgress(smoothedProgress.current);
      }

      if (!reducedMotion && Math.abs(targetProgress.current - smoothedProgress.current) >= 0.00015) {
        frame = window.requestAnimationFrame(updateVideo);
      }
    };

    const queueVideoUpdate = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(updateVideo);
    };

    queueVideoSync.current = queueVideoUpdate;
    queueVideoUpdate();
    window.addEventListener("scroll", queueVideoUpdate, { passive: true });
    window.addEventListener("resize", queueVideoUpdate);
    return () => {
      window.removeEventListener("scroll", queueVideoUpdate);
      window.removeEventListener("resize", queueVideoUpdate);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      if (queueVideoSync.current === queueVideoUpdate) queueVideoSync.current = null;
    };
  }, [reducedMotion, videoReady]);

  const handleVideoSeeked = () => {
    // A rapid reverse scroll can change the target during a prior seek. Pick up the latest
    // target as soon as that seek finishes instead of leaving the video on an old frame.
    queueVideoSync.current?.();
  };

  const closeMenu = () => setMenuOpen(false);
  const finalArrival = clamp((visualProgress - 0.84) / 0.14);
  const cinematicParallax = reducedMotion ? 0 : (visualProgress - 0.5) * 24;
  const haloParallax = reducedMotion ? 0 : (visualProgress - 0.5) * -34;

  return (
    <div className="cortex-home min-h-screen bg-[#0a0a0a] text-[#eee9dd] selection:bg-[#eee9dd] selection:text-[#0a0a0a]">
      <header className={`site-nav fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "bg-[#0a0a0a]/58" : "bg-black/10"}`}>
        <div className="flex h-[66px] items-center justify-between px-5 md:px-8 xl:px-12">
          <a href="#top" className="brand-lockup group" aria-label="CORTEX home">
            <img src={ASSETS.mark} alt="" className="brand-mark" />
            <span>CORTEX</span>
          </a>
          <MorphicNavbar />
          <div className="flex items-center gap-3">
            <a href="mailto:hello@cortexbrain.ai?subject=Cortex%20Appliance%20Early%20Access" className="nav-cta hidden sm:inline-flex">
              ACCESS <ArrowRight size={13} strokeWidth={1.6} />
            </a>
            <button className="mobile-menu-trigger md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
              {menuOpen ? <X size={19} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-nav md:hidden" aria-label="Mobile navigation"><MorphicNavbar variant="mobile" onNavigate={closeMenu} /><a href="mailto:hello@cortexbrain.ai?subject=Cortex%20Appliance%20Early%20Access" className="morphic-mobile-access" onClick={closeMenu}>ACCESS <ArrowRight size={14} /></a></div>
        )}
      </header>

      <main className="relative z-10" id="top">
        <section ref={cinemaRef} className="relative h-[600svh] min-h-[600vh]" aria-label="CORTEX product story">
          <div className="sticky top-0 h-[100svh] min-h-screen overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]" aria-hidden="true">
              <div className="video-fallback absolute inset-0" />
              <video
                ref={videoRef}
                src={ASSETS.video}
                muted
                playsInline
                preload="auto"
                onCanPlay={() => setVideoReady(true)}
                onSeeked={handleVideoSeeked}
                className={`handdrawn-hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoReady && !reducedMotion ? "opacity-100" : "opacity-0"}`}
                style={{ transform: `translate3d(0, ${cinematicParallax}px, 0) scale(1.035)` }}
              />
              <div className="hero-scrim absolute inset-0" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_30%,rgba(0,0,0,0.25)_100%)]" />
              <div className="hero-depth-halo" style={{ transform: `translate3d(0, ${haloParallax}px, 0)` }} />
            </div>
            <div className="story-guide absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 md:flex" aria-hidden="true">
              <span>SCROLL TO TRACE</span>
              <i><b style={{ transform: `scaleY(${Math.max(progress, 0.06)})` }} /></i>
              <span>{String(Math.round(progress * 100)).padStart(2, "0")}</span>
            </div>

            <StoryCopy progress={visualProgress} start={-0.04} end={0.23} className="left-rail top-[29%] md:top-[27%]">
              <p className="eyebrow">ON YOUR FLOOR <i /> YOUR BOUNDARY <i /> YOUR ELECTRICITY</p>
              <h1 className="hero-title mt-5">THE BRAIN<br />NEVER LEAVES<br />THE BUILDING</h1>
              <p className="hero-copy mt-6">A proposed company-brain stack for the boundary where your information already lives.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="button-primary" href="mailto:hello@cortexbrain.ai?subject=Cortex%20Appliance%20Early%20Access">REQUEST EARLY ACCESS <ArrowRight size={15} /></a>
                <a className="button-quiet" href="#image">EXPLORE THE EDGE</a>
              </div>
            </StoryCopy>

            <StoryCopy progress={visualProgress} start={0.18} end={0.48} className="right-rail top-[23%] md:top-[24%] max-w-[22rem]">
              <p className="eyebrow">THE BOUNDARY</p>
              <h2 className="cinema-heading mt-5">NOTHING LISTENS<br />FROM OUTSIDE</h2>
              <p className="cinema-copy mt-5">The proposed appliance posture uses tenant-approved connectors and outbound synchronization. In appliance mode, the model-plane guard is designed to reject an off-box setting before startup.</p>
              <p className="tech-badge mt-6">APPLIANCE MODE <span /> LOCALITY GUARD</p>
            </StoryCopy>

            <StoryCopy progress={visualProgress} start={0.43} end={0.67} className="left-rail top-[42%] md:top-[38%]">
              <p className="eyebrow">YOUR BOUNDARY</p>
              <p className="boundary-line mt-5">STARTUP ENFORCEMENT.<br />OFF-BOX MODEL PLANE REJECTED.</p>
            </StoryCopy>

            <StoryCopy progress={visualProgress} start={0.61} end={0.87} className="left-rail top-[20%] md:top-[22%] max-w-[28rem]">
              <p className="eyebrow">THE IMAGE</p>
              <h2 className="cinema-heading mt-5">ONE SIGNED IMAGE.<br />FOUR MOVING PARTS.</h2>
              <p className="cinema-copy mt-5">Record, connectors, governance, and the model plane are designed as one governed system.</p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                {["STORE", "INGEST", "SURFACE", "THINK"].map((label) => <span key={label} className="signal-label">{label}</span>)}
              </div>
            </StoryCopy>

            <div className="cinema-beat final-beat left-rail top-[22%] md:top-[20%]" style={{ opacity: finalArrival, transform: `translateY(${(1 - finalArrival) * 28}px)` }}>
              <p className="eyebrow">CORTEX</p>
              <h2 className="hero-title mt-5">YOUR<br />COMPANY BRAIN</h2>
              <p className="hero-copy mt-6">With Cortex retrieval and Conscience governance inside Co-Suite.</p>
              <div className="mt-9 border-l border-[#eee9dd]/40 pl-4">
                <p className="font-serif text-base italic text-[#eee9dd]">Mens omnium. Memoria una. Conscientia custos.</p>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#eee9dd]/62">The brain stays in the building.</p>
              </div>
            </div>
            <div className="arrival-lockup" aria-hidden="true" style={{ opacity: finalArrival, transform: `translate(-50%, -50%) scale(${0.78 + finalArrival * 0.22})` }}>
              <span className="arrival-rule" style={{ transform: `scaleX(${finalArrival})` }} />
              <div className="arrival-core"><img src={ASSETS.mark} alt="" loading="lazy" decoding="async" /><b>CORTEX</b></div>
              <em>CORTEX / COMPANY BRAIN / LOCAL MEMORY</em>
            </div>

            <div className="absolute bottom-6 left-5 flex items-center gap-3 text-[9px] font-semibold tracking-[0.18em] text-[#eee9dd]/62 md:bottom-8 md:left-8 xl:left-12">
              <ChevronDown size={15} strokeWidth={1.4} />
              <span>USE YOUR SCROLL TO FOLLOW THE CABLE</span>
            </div>
            <div className="cinema-signal absolute bottom-7 right-16 hidden items-center gap-3 text-[8px] font-semibold tracking-[0.16em] text-[#eee9dd]/65 md:flex" aria-hidden="true">
              <span>LOCAL COMPUTE</span><i /><span>BOUNDARY</span><i /><span>COMPANY BRAIN</span>
            </div>
          </div>
        </section>

        <section id="boundary" className="section-shell section-boundary">
          <div className="section-rule" />
          <div className="section-split grid gap-16 xl:grid-cols-[0.8fr_1.2fr] xl:gap-24">
            <Reveal>
              <p className="eyebrow text-[#bcb6aa]">THE BOUNDARY</p>
              <h2 className="editorial-title mt-6">NOTHING LISTENS<br />FROM OUTSIDE</h2>
              <p className="section-index mt-9">01 / LOCAL FIRST</p>
            </Reveal>
            <Reveal delay={90} className="max-w-2xl xl:pt-10">
              <p className="body-copy">The proposed appliance posture is outbound-oriented: integrations are approved by the customer, and the appliance guard is designed to reject an off-box model plane at startup.</p>
              <p className="body-copy mt-5">The prebuilt and bring-your-own paths both depend on a hardware specification that has not yet been published. Procurement and deployment scope are agreed per engagement.</p>
              <p className="body-copy mt-5">Co-Suite’s hardware direction is assembly from commodity components, not custom silicon, boards, or enclosures.</p>
            </Reveal>
          </div>
          <Reveal delay={160} className="boundary-diagram mt-20">
            <div className="diagram-topline"><span>YOUR COMPANY BOUNDARY</span><span>APPLIANCE LOCALITY CHECK</span></div>
            <div className="diagram-flow">
              <div><b>SLACK</b><b>DOCUMENTS</b><b>SYSTEMS</b></div>
              <span className="diagram-arrow">↓</span>
              <div className="diagram-sync">APPROVED SYNC</div>
              <span className="diagram-arrow">↓</span>
              <div className="diagram-cortex"><img src={ASSETS.mark} alt="" loading="lazy" decoding="async" /> CORTEX</div>
            </div>
            <div className="diagram-bottomline"><span>MODEL PLANE</span><b>GUARDED</b><span>APPLIANCE STARTUP · OFF-BOX ROUTING REJECTED</span></div>
          </Reveal>
        </section>

        <section className="architecture-explorer" aria-labelledby="architecture-title">
          <div className="architecture-copy">
            <Reveal><p className="eyebrow">THE CORTEX SYSTEM</p><h2 id="architecture-title">MEMORY, JUDGMENT,<br />AND PROOF—<i>CONNECTED.</i></h2></Reveal>
            <Reveal delay={90}><p>Follow the rings to see how a company record becomes governed intelligence: captured context, decision authority, and evidence that stays close to the source.</p></Reveal>
          </div>
          <Reveal delay={120} className="architecture-chart"><CortexArchitectureExplorer /></Reveal>
        </section>

        <section id="economics" className="section-shell section-economics">
          <Reveal>
            <p className="eyebrow text-[#bcb6aa]">THE ECONOMICS</p>
            <h2 className="editorial-title mt-6">LOCAL COMPUTE.<br />OPEN TERMS.</h2>
            <p className="mt-7 max-w-[37rem] body-copy">The hardware-led direction is intended to move model execution onto customer-controlled compute. No published cost model, unit economics, or token arithmetic supports a savings claim yet.</p>
          </Reveal>
          <div className="metric-band mt-18 grid md:grid-cols-3">
            <Reveal className="metric-cell" delay={30}><strong>LOCAL</strong><p>APPLIANCE MODE</p><span>The startup guard is designed to fail when its model plane points off-box.</span></Reveal>
            <Reveal className="metric-cell" delay={100}><strong>OPEN</strong><p>COST MODEL</p><span>Hardware, unit economics, and token-cost arithmetic remain unpublished.</span></Reveal>
            <Reveal className="metric-cell" delay={170}><strong>ONE</strong><p>GOVERNED RECORD</p><span>The appliance direction retains a single deployment boundary for the company record and its policy.</span></Reveal>
          </div>
          <Reveal delay={90} className="economics-callout">
            <p>THE APPLIANCE DIRECTION REPLACES HOSTED-MODEL USAGE WITH CUSTOMER-CONTROLLED COMPUTE. COST AND PROCUREMENT TERMS ARE NOT YET PUBLISHED.</p>
            <span>Software, support, hardware, warranty, and RMA terms are agreed as part of the engagement.</span>
          </Reveal>
        </section>

        <section className="floor-evidence" aria-label="CORTEX appliance evidence">
          <ApplianceEstate />
        </section>

        <section className="memory-evidence" aria-label="CORTEX memory evidence">
          <MemoryLattice />
          <div><p className="eyebrow">FIELD PROOF / 02</p><h2>THE MEMORY<br />STAYS INSIDE.</h2><p>Every decision, rationale, and source record remains governed inside the system you operate.</p></div>
        </section>

        <section id="image" className="section-shell section-image">
          <Reveal>
            <p className="eyebrow text-[#bcb6aa]">THE IMAGE</p>
            <h2 className="editorial-title mt-6">ONE SIGNED IMAGE,<br />FOUR MOVING PARTS</h2>
          </Reveal>
          <div className="image-rows mt-16">
            {imageRows.map(([number, label, title, copy], index) => (
              <Reveal key={number} delay={index * 65} className="image-row">
                <span className="row-number">{number}</span>
                <span className="row-label">{label}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
                <ChevronDown className="row-chevron" size={17} strokeWidth={1.35} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="appliance" className="section-shell section-appliance">
          <div className="appliance-grid">
            <Reveal className="appliance-copy">
              <p className="eyebrow text-[#bcb6aa]">THE APPLIANCE</p>
              <h2 className="editorial-title mt-6">RUN IT ON YOUR<br />LOCAL COMPUTE</h2>
              <div className="mt-8 max-w-xl space-y-5 body-copy">
                <p>Co-Suite runs on local compute. If you already operate a qualifying system, we can scope the image, integrations, and setup around the hardware you have.</p>
                <p>If you need a system, we can source and set up a supported NVIDIA, AMD, Apple, or ASUS option with your deployment requirements in mind.</p>
                <p>The hardware is selected for the deployment; final compatibility, commercial, warranty, and support terms are confirmed with your team before an order or setup begins.</p>
              </div>
              <p className="tech-badge mt-8">YOUR LOCAL COMPUTE · OR A SUPPORTED SYSTEM, SOURCED + SET UP</p>
              <div className="hardware-profile-notes"><span>EXISTING LOCAL COMPUTE</span><span>SOURCE + SETUP AVAILABLE</span><span>COMPATIBILITY SCOPED</span><span>YOUR DEPLOYMENT · YOUR BOUNDARY</span></div>
            </Reveal>
            <div className="hardware-logo-rail" aria-label="Supported local-compute hardware options">
              <p>SUPPORTED LOCAL COMPUTE / 04</p>
              <motion.a href="https://www.nvidia.com/en-us/products/workstations/dgx-spark/" target="_blank" rel="noreferrer" className="hardware-rail-brand" initial={reduceMotion ? false : { opacity: 0, x: 62 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.45 }} transition={reduceMotion ? { duration: 0 } : { duration: 0.62, ease: [0.22, 1, 0.36, 1] }}><img src="/manus-storage/nvidia_0719afb4.svg" alt="NVIDIA" loading="lazy" decoding="async" /><span>DGX SPARK</span></motion.a>
              <motion.a href="https://www.amd.com/en/products/processors/laptop/ryzen/ai-300-series/amd-ryzen-ai-max-plus-395.html" target="_blank" rel="noreferrer" className="hardware-rail-brand" initial={reduceMotion ? false : { opacity: 0, x: 62 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.45 }} transition={reduceMotion ? { duration: 0 } : { duration: 0.62, delay: 0.13, ease: [0.22, 1, 0.36, 1] }}><img src="/manus-storage/amd_a073a30a.svg" alt="AMD" loading="lazy" decoding="async" /><span>RYZEN AI MAX+</span></motion.a>
              <motion.a href="https://www.apple.com/mac-studio/specs/" target="_blank" rel="noreferrer" className="hardware-rail-brand" initial={reduceMotion ? false : { opacity: 0, x: 62 }} whileInView={{ opacity: 1, x: 0 }} transition={reduceMotion ? { duration: 0 } : { duration: 0.62, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}><img src="/manus-storage/apple_a28847dc.svg" alt="Apple" loading="lazy" decoding="async" /><span>MAC STUDIO</span></motion.a>
              <motion.a href="https://www.asus.com/networking-iot-servers/aiot-industrial-solutions/ai-servers/asus-ascent-gx10/" target="_blank" rel="noreferrer" className="hardware-rail-brand" initial={reduceMotion ? false : { opacity: 0, x: 62 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.45 }} transition={reduceMotion ? { duration: 0 } : { duration: 0.62, delay: 0.39, ease: [0.22, 1, 0.36, 1] }}><img src="/manus-storage/asus-wordmark_ffc2fc33.png" alt="ASUS" loading="lazy" decoding="async" /><span>ASCENT GX10</span></motion.a>
            </div>
          </div>
        </section>

        <section id="deployment" className="section-shell section-deployment">
          <Reveal>
            <p className="eyebrow text-[#bcb6aa]">DEPLOYMENT</p>
            <h2 className="editorial-title mt-6">TWO WAYS TO RUN<br />THE SAME BRAIN</h2>
          </Reveal>
          <Reveal delay={100} className="deployment-table mt-16">
            <div className="deployment-head"><span>LOCAL COMPUTE PATH</span><strong>YOUR EXISTING SYSTEM</strong><strong>SOURCED + SET UP</strong></div>
            {comparisonRows.map(([topic, managed, appliance]) => (
              <div className="deployment-row" key={topic}>
                <span>{topic}</span><p>{managed}</p><p>{appliance}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={150} className="deployment-note">CHOOSE THE LOCAL COMPUTE PATH THAT FITS YOUR ENVIRONMENT: USE A QUALIFYING SYSTEM YOU ALREADY OWN, OR HAVE CO-SUITE SOURCE AND SET UP A SUPPORTED OPTION FOR YOU.</Reveal>
        </section>

        <section id="access" className="final-cta">
          <img src={ASSETS.finalInfrastructure} alt="CORTEX local infrastructure appliance" className="final-cta-art" loading="lazy" decoding="async" />
          <div className="final-cta-scrim" />
          <Reveal className="final-cta-copy">
            <motion.h2 className="final-title mt-7" initial={reduceMotion ? false : { opacity: 0, y: 38, letterSpacing: "0.03em" }} whileInView={{ opacity: 1, y: 0, letterSpacing: "-0.08em" }} viewport={{ once: true, amount: 0.55 }} transition={reduceMotion ? { duration: 0 } : { duration: 0.92, ease: [0.22, 1, 0.36, 1] }}>THE BRAIN STAYS<br />IN THE BUILDING.</motion.h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-7 text-[#eee9dd]/80">Co-Suite: the proposed machine and stack around Cortex retrieval and Conscience governance.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="button-primary" href="mailto:hello@cortexbrain.ai?subject=Cortex%20Appliance%20Early%20Access">REQUEST EARLY ACCESS <ArrowRight size={15} /></a>
              <a className="button-quiet" href="#image">EXPLORE THE EDGE</a>
            </div>
          </Reveal>
        </section>
      </main>

      <CortexFooter />
    </div>
  );
}
