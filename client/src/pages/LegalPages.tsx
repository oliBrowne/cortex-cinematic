import { ArrowRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { MorphicNavbar } from "../../../components/kokonutui/morphic-navbar";
import { CortexFooter } from "@/components/CortexFooter";

const mark = "/manus-storage/cortex-mark_1f0b9bca.png";

type LegalPageProps = {
  kind: "PRIVACY" | "TERMS";
  title: ReactNode;
  sections: Array<{ label: string; title: string; copy: string }>;
};

function LegalHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav secondary-nav fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0a]">
      <div className="flex h-[66px] items-center justify-between bg-[#0a0a0a] px-5 md:px-8 xl:px-12">
        <a href="/" className="brand-lockup" aria-label="CORTEX home"><img src={mark} alt="" className="brand-mark" /><span>CORTEX</span></a>
        <MorphicNavbar />
        <div className="flex items-center gap-3"><a href="mailto:hello@cortexbrain.ai?subject=Cortex%20Early%20Access" className="nav-cta hidden sm:inline-flex">ACCESS <ArrowRight size={13} strokeWidth={1.6} /></a><button className="mobile-menu-trigger md:hidden" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X size={19} /> : <Menu size={20} />}</button></div>
      </div>
      {open && <div className="mobile-nav bg-[#0a0a0a] md:hidden"><MorphicNavbar variant="mobile" onNavigate={() => setOpen(false)} /><a href="mailto:hello@cortexbrain.ai?subject=Cortex%20Early%20Access" className="morphic-mobile-access" onClick={() => setOpen(false)}>ACCESS <ArrowRight size={14} /></a></div>}
    </header>
  );
}

function LegalPage({ kind, title, sections }: LegalPageProps) {
  return (
    <div className="document-page min-h-screen">
      <LegalHeader />
      <main>
        <section className="relative overflow-hidden border-b border-white/15 bg-[#0c0c0b] px-5 pb-16 pt-40 md:px-8 md:pb-24 md:pt-48 xl:px-12">
          <div className="absolute inset-0 opacity-40" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgb(238 233 221 / .05) 1px, transparent 1px), linear-gradient(90deg, rgb(238 233 221 / .05) 1px, transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(circle at 68% 36%, black, transparent 55%)" }} />
          <div className="relative max-w-5xl"><p className="eyebrow">CORTEX / PUBLIC SITE / {kind}</p><h1 className="mt-7 max-w-4xl text-[clamp(3.2rem,8vw,8rem)] font-bold leading-[.82] tracking-[-.09em]">{title}</h1><p className="mt-8 max-w-xl text-base leading-7 text-[#eee9dd]/72">These Terms govern use of the public CORTEX website. A separate written agreement applies to any CORTEX or Co-Suite product deployment, support, hardware, or customer data.</p></div>
        </section>
        <article className="mx-auto grid max-w-[1720px] gap-x-20 px-5 py-16 md:grid-cols-[minmax(0,.42fr)_minmax(0,1fr)] md:px-8 md:py-24 xl:px-12">
          <aside className="mb-10 md:mb-0"><p className="document-label">DOCUMENT STATUS</p><p className="mt-4 text-sm leading-6 text-[#eee9dd]/58">PUBLIC SITE TERMS<br />EFFECTIVE / 27 AUG 2026</p></aside>
          <div className="border-t border-white/15">
            {sections.map((section, index) => <section className="grid gap-5 border-b border-white/15 py-9 md:grid-cols-[68px_minmax(0,1fr)]" key={section.label}><span className="text-[9px] font-semibold tracking-[.16em] text-[#eee9dd]/46">{String(index + 1).padStart(2, "0")}</span><div><p className="document-label">{section.label}</p><h2 className="mt-4 text-2xl font-semibold tracking-[-.05em] md:text-4xl">{section.title}</h2><p className="mt-4 max-w-2xl text-[.95rem] leading-7 text-[#eee9dd]/68">{section.copy}</p></div></section>)}
          </div>
        </article>
      </main>
      <CortexFooter />
    </div>
  );
}

const termsSections = [
  { label: "01 / ACCEPTANCE", title: "TERMS OF SERVICE", copy: "By accessing or using this public website, you agree to these Terms of Service. If you do not agree, do not use the site. These Terms apply only to the public CORTEX website and do not create a customer, employment, partnership, agency, or reseller relationship." },
  { label: "02 / SITE PURPOSE", title: "INFORMATIONAL, NOT AN OFFER", copy: "The site provides general information about CORTEX, Co-Suite, and potential deployment paths. It is not an offer to sell, a guarantee of product availability, a technical specification, or professional advice. Any product, hardware, support, price, implementation, security, or data-handling commitment must be set out in a separate written agreement signed by the applicable parties." },
  { label: "03 / ACCEPTABLE USE", title: "USE THE SITE RESPONSIBLY", copy: "You may use this site for lawful, personal, or internal business evaluation. You must not interfere with the site, probe or bypass security controls, introduce malicious code, scrape the site at a disruptive rate, impersonate another person, or use site materials in a way that infringes rights or violates law." },
  { label: "04 / SITE MATERIALS", title: "CONTENT & INTELLECTUAL PROPERTY", copy: "The CORTEX name, marks, design, copy, software concepts, and other site materials are owned by CORTEX or its licensors and are protected by applicable law. You may view the site for its intended purpose, but may not copy, modify, republish, sell, license, reverse engineer, or exploit its materials without prior written permission, except where law does not permit that restriction." },
  { label: "05 / CONTACT", title: "YOUR COMMUNICATIONS", copy: "When you use a contact action, the site opens a draft in your own email application; the site does not store the draft before you send it. Do not send confidential, regulated, or sensitive information through a public-site inquiry. Our handling of personal information is described in the Privacy Policy." },
  { label: "06 / AVAILABILITY", title: "CHANGES & CONTINUITY", copy: "We may update, suspend, or discontinue any part of the public site at any time. We do not promise that the site will always be available, uninterrupted, secure, or error-free. We may update these Terms when the site or our practices change; the effective date identifies the current version." },
  { label: "07 / DISCLAIMERS", title: "NO WARRANTY", copy: "The public site is provided on an “as is” and “as available” basis. To the maximum extent permitted by law, CORTEX disclaims warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, and availability. Product roadmaps, performance statements, and forward-looking information are illustrative and may change." },
  { label: "08 / LIABILITY", title: "LIMITATION OF LIABILITY", copy: "To the maximum extent permitted by law, CORTEX will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from or related to use of, or inability to use, the public site. Nothing in these Terms excludes liability that cannot lawfully be excluded or limited." },
  { label: "09 / CONTACT", title: "QUESTIONS ABOUT THESE TERMS", copy: "For questions about these Terms or a potential CORTEX deployment, contact hello@cortexbrain.ai. Privacy requests should use the contact path in the Privacy Policy. If you are using the site on behalf of an organization, you confirm that you have authority to accept these Terms for that organization." },
];

export function Terms() { return <LegalPage kind="TERMS" title={<>TERMS OF<br />SERVICE.</>} sections={termsSections} />; }
