import { ArrowUpRight, Github, Instagram, Linkedin, Mail, MoveRight } from "lucide-react";
import { animate, stagger } from "animejs";
import { useEffect, useRef, useState, type FormEvent } from "react";
import "./cortex-footer-mobile.css";

const ASSETS = {
  mark: "/manus-storage/cortex-mark_1f0b9bca.png",
};

const systemLinks = [
  { label: "HOME", href: "/" },
  { label: "THE SUITE", href: "/suite.html" },
  { label: "THE EDGE", href: "/edge.html" },
];

const documentLinks = [
  { label: "ONE-PAGER", href: "/onepager.html" },
  { label: "VALUES & CULTURE", href: "/values.html" },
  { label: "FAQ", href: "/faq.html" },
  { label: "PRIVACY", href: "/privacy.html" },
  { label: "TERMS", href: "/terms.html" },
];

const socialPlaceholders = [
  { label: "LinkedIn placeholder", icon: Linkedin },
  { label: "Instagram placeholder", icon: Instagram },
  { label: "GitHub placeholder", icon: Github },
] as const;

function FooterMottoGraphic() {
  const graphicRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const graphic = graphicRef.current;
    if (!graphic) return;

    const parts = Array.from(graphic.querySelectorAll<HTMLElement | SVGElement>("[data-motto-part]"));
    const orbit = graphic.querySelector<SVGGElement>("[data-motto-orbit]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let hasAnimated = false;

    const showStill = () => {
      graphic.dataset.mottoState = "complete";
      parts.forEach((part) => {
        (part as HTMLElement).style.opacity = "1";
        (part as HTMLElement).style.transform = "none";
      });
      if (orbit) {
        orbit.style.opacity = "1";
        orbit.style.transform = "none";
      }
    };

    if (reducedMotion.matches) {
      showStill();
      return;
    }

    const revealMotto = () => {
      if (hasAnimated) return;
      hasAnimated = true;
      graphic.dataset.mottoState = "complete";

      if (orbit) {
        animate(orbit, {
          opacity: [0, 1],
          rotate: [-72, 0],
          scale: [0.8, 1],
          duration: 760,
          ease: "outExpo",
        });
      }

      animate(parts, {
        opacity: [0, 1],
        scale: [0.72, 1],
        duration: 520,
        delay: stagger(62, { start: 120 }),
        ease: "outExpo",
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        revealMotto();
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(graphic);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={graphicRef} className="cortex-footer-motto-graphic" role="img" aria-label="Mens omnium. Memoria una. Conscientia custos.">
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <g data-motto-orbit>
          <circle cx="36" cy="36" r="31.5" />
          <path d="M36 4.5v6M67.5 36h-6M36 67.5v-6M4.5 36h6" />
          <path d="M14 14l4.25 4.25M58 14l-4.25 4.25M58 58l-4.25-4.25M14 58l4.25-4.25" />
        </g>
        <text data-motto-part x="36" y="12.5" textAnchor="middle">M</text>
        <text data-motto-part x="63" y="39" textAnchor="middle">M</text>
        <text data-motto-part x="36" y="65.5" textAnchor="middle">C</text>
      </svg>
    </span>
  );
}

export function CortexFooter() {
  const [email, setEmail] = useState("");

  const handleInterest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) || trimmedEmail.length > 254) return;

    const subject = encodeURIComponent("CORTEX / FIELD NOTES");
    const body = encodeURIComponent(`Please keep me informed about CORTEX.\n\nReply address: ${trimmedEmail}`);
    window.location.href = `mailto:hello@cortexbrain.ai?subject=${subject}&body=${body}`;
  };

  return (
    <footer id="footer" className="cortex-footer relative z-10 overflow-hidden border-t border-white/10 bg-[#090909] text-[#eee9dd]" aria-label="CORTEX site footer">
      <div className="cortex-footer-grid" aria-hidden="true" />

      <div className="cortex-footer-stage relative mx-auto w-full max-w-[1720px] px-5 md:px-8 xl:px-12">
        <div className="cortex-footer-calibration grid gap-4 border-b border-white/10 py-4 text-[8px] font-semibold tracking-[0.17em] text-[#eee9dd]/48 sm:grid-cols-3">
          <span>COORDINATE / 40.7128° N · 74.0060° W</span>
          <span className="sm:text-center">LOCAL INTELLIGENCE / CLOSED LOOP</span>
          <span className="sm:text-right">SYSTEM STATUS / PRESENT</span>
        </div>

        <div className="grid gap-x-7 gap-y-12 py-14 md:grid-cols-12 md:gap-x-8 lg:gap-x-12 lg:py-20">
          <section className="max-w-[25rem] md:col-span-4 xl:col-span-5" aria-label="CORTEX identity">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href="/" className="cortex-footer-brand group inline-flex items-center gap-3" aria-label="CORTEX home">
                <span className="cortex-footer-brand-orbit"><FooterMottoGraphic /><span className="cortex-footer-mark"><img src={ASSETS.mark} alt="" /></span></span>
                <span>CORTEX</span>
              </a>
              <div className="cortex-footer-social" aria-label="Social profile placeholders">
                {socialPlaceholders.map(({ label, icon: Icon }) => <span className="cortex-footer-social-icon" key={label} title={label} aria-label={label}><Icon size={14} strokeWidth={1.45} aria-hidden="true" /></span>)}
              </div>
            </div>
            <p className="mt-6 text-[1.05rem] font-medium leading-7 tracking-[-0.025em] text-[#eee9dd]/82">The governed company brain that runs inside the boundary where your information already lives.</p>
            <div className="cortex-footer-signal mt-8" aria-hidden="true"><i /><b /><i /><b /><i /></div>
            <p className="mt-4 text-[8px] font-semibold tracking-[0.16em] text-[#eee9dd]/48">RETRIEVAL · GOVERNANCE · LOCAL MEMORY</p>
          </section>

          <nav className="md:col-span-2" aria-label="CORTEX system links">
            <p className="cortex-footer-label">SYSTEM</p>
            <ul className="cortex-footer-links mt-5">
              {systemLinks.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}<MoveRight size={13} strokeWidth={1.4} /></a></li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="CORTEX document links">
            <p className="cortex-footer-label">FIELD DOCUMENTS</p>
            <ul className="cortex-footer-links mt-5">
              {documentLinks.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}<MoveRight size={13} strokeWidth={1.4} /></a></li>
              ))}
            </ul>
          </nav>

          <section className="cortex-footer-access md:col-span-4 xl:col-span-3" aria-labelledby="footer-access-title">
            <p className="cortex-footer-label">FIELD NOTES / EARLY ACCESS</p>
            <h2 id="footer-access-title" className="mt-5">KEEP THE BRAIN<br />IN THE BUILDING.</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#eee9dd]/62">Leave an address and we will open a direct note to the CORTEX team. No outside listener is introduced.</p>
            <form onSubmit={handleInterest} className="mt-6" aria-label="Request CORTEX field notes">
              <label className="sr-only" htmlFor="cortex-footer-email">Your email address</label>
              <div className="cortex-footer-form-row">
                <Mail size={15} strokeWidth={1.35} aria-hidden="true" />
                <input id="cortex-footer-email" type="email" inputMode="email" maxLength={254} required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="YOUR EMAIL ADDRESS" autoComplete="email" />
                <button type="submit" aria-label="Draft access email"><ArrowUpRight size={17} strokeWidth={1.45} /></button>
              </div>
              <p className="mt-3 text-[7px] font-semibold leading-4 tracking-[0.14em] text-[#eee9dd]/40">OPENS A DIRECT EMAIL · THE SITE DOES NOT STORE THIS ADDRESS</p>
            </form>
          </section>
        </div>

        <div className="cortex-footer-manifest grid gap-5 border-t border-white/10 py-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-4xl text-[7px] font-semibold leading-5 tracking-[0.13em] text-[#eee9dd]/42">BRAIN ENGRAVINGS: GALL &amp; SPURZHEIM 1810, NEELE &amp; SON CA. 1810 · HEART ENGRAVING: T. MILTON 1814 · EYE ENGRAVING: T. MILTON 1809 · WELLCOME COLLECTION, CC BY 4.0 / PDM · FEATURE ART: ORIGINAL</p>
          <a href="mailto:hello@cortexbrain.ai" className="inline-flex items-center gap-2 text-[8px] font-semibold tracking-[0.16em] text-[#eee9dd]/62 transition-colors hover:text-[#eee9dd]">HELLO@CORTEXBRAIN.AI <ArrowUpRight size={13} strokeWidth={1.35} /></a>
        </div>

        <div className="cortex-footer-legal flex flex-col gap-4 border-t border-white/10 py-5 text-[8px] font-semibold tracking-[0.16em] text-[#eee9dd]/48 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          <span>© 2026 CORTEX</span>
          <span className="font-serif text-[0.9rem] font-normal italic tracking-normal text-[#eee9dd]/68 md:text-center">Mens omnium. Memoria una. Conscientia custos.</span>
          <span className="md:text-right"><a className="transition-colors hover:text-[#eee9dd]" href="/privacy.html">PRIVACY</a><i className="mx-2 not-italic text-[#eee9dd]/30">/</i><a className="transition-colors hover:text-[#eee9dd]" href="/terms.html">TERMS</a><i className="mx-2 not-italic text-[#eee9dd]/30">/</i>THE BRAIN STAYS IN THE BUILDING.</span>
        </div>
      </div>
    </footer>
  );
}
