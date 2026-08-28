import { ArrowLeft, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { MorphicNavbar } from "../../../components/kokonutui/morphic-navbar";
import { CortexFooter } from "@/components/CortexFooter";
import "./privacy-policy.css";

const mark = "/manus-storage/cortex-mark_1f0b9bca.png";

const sections = [
  {
    id: "scope",
    number: "01",
    title: "SCOPE OF THIS NOTICE",
    content: <><p>This Privacy Policy explains how CORTEX handles personal information collected through the public CORTEX website, including this page and an access-request inquiry. It does not govern a separately provisioned CORTEX or Co-Suite deployment, customer content, or enterprise service data. Those uses are governed by the applicable customer agreement, data-processing terms, and deployment documentation.</p><p>By using the website or sending an inquiry, you acknowledge the practices described here. If you do not agree, please do not submit information through the website.</p></>,
  },
  {
    id: "collect",
    number: "02",
    title: "INFORMATION WE COLLECT",
    content: <><p>We collect information you choose to provide when you request access or contact us, including your name, work email address, company name, and the contents of your message. The website creates an email draft in your own mail application; the site does not store that draft or transmit the form contents before you choose to send it.</p><p>As with most websites, the hosting and email providers involved in delivering the site or receiving your message may process limited technical information, such as IP address, browser type, device data, timestamps, and request logs. We do not use the public website to collect sensitive personal information, payment data, precise location data, or customer AI inputs.</p></>,
  },
  {
    id: "use",
    number: "03",
    title: "HOW WE USE INFORMATION",
    content: <><p>We use inquiry information to respond to your request, evaluate a potential business relationship, communicate about CORTEX, protect the website, and comply with legal obligations. We use technical information to deliver, secure, troubleshoot, and improve the website.</p><p>We do not sell personal information or use public-site information for cross-context behavioral advertising. We do not use public-site contact inquiries to train AI models. Any future product-data use will be described in the applicable product terms and data-processing documentation.</p></>,
  },
  {
    id: "cookies",
    number: "04",
    title: "COOKIES, ANALYTICS & LOCAL STORAGE",
    content: <><p>The public website does not deploy advertising cookies or third-party analytics tags. It uses one necessary first-party cookie to remember your cookie-banner choice. CORTEX uses a fixed dark display and does not store a browser theme preference.</p><p>We do not use the public website to conduct cross-site tracking. Third parties may process information under their own policies when you choose to open an email client or follow a link away from this site.</p></>,
  },
  {
    id: "sharing",
    number: "05",
    title: "WHEN INFORMATION IS DISCLOSED",
    content: <><p>We disclose personal information only as reasonably necessary to operate the site and respond to you: to hosting, email, security, and professional service providers acting on our instructions; to comply with law or valid legal process; to protect rights, safety, and security; or in connection with a corporate transaction, subject to applicable law.</p><p>We require service providers to handle personal information only for authorized purposes and with appropriate safeguards. We do not disclose inquiry information to data brokers.</p></>,
  },
  {
    id: "ai",
    number: "06",
    title: "AI SERVICES & CUSTOMER DATA",
    content: <><p>CORTEX and Co-Suite are designed for deployments where customer data practices, access controls, integrations, retention, and model configuration are defined for that customer environment. Public-site visitors should not send confidential, regulated, or sensitive data through an inquiry email.</p><p>If you become a customer, the applicable agreement and deployment documentation will describe the service data, roles, security measures, retention approach, and instructions that apply to your implementation.</p></>,
  },
  {
    id: "retention",
    number: "07",
    title: "RETENTION & SECURITY",
    content: <><p>We retain inquiry information only for as long as reasonably needed to respond, maintain business records, resolve disputes, meet legal obligations, or protect the site. We use reasonable administrative, technical, and organizational safeguards appropriate to the nature of the information. No system can guarantee absolute security.</p><p>Please use care when communicating with us. Do not include passwords, financial-account data, government identifiers, or other sensitive information in an inquiry email.</p></>,
  },
  {
    id: "rights",
    number: "08",
    title: "YOUR PRIVACY CHOICES & RIGHTS",
    content: <><p>Depending on your location and applicable law, you may have rights to request access, correction, deletion, portability, restriction, objection, or information about our handling of your personal information. You may also opt out of non-essential communications at any time. To make a request, email <a href="mailto:hello@cortexbrain.ai?subject=Privacy%20Request">hello@cortexbrain.ai</a> with the subject line “Privacy Request.”</p><p>We may need to verify your request and may retain limited information as required or permitted by law. If you are in the EEA, UK, or another jurisdiction with a supervisory authority, you may also have the right to lodge a complaint with the relevant authority.</p></>,
  },
  {
    id: "international",
    number: "09",
    title: "INTERNATIONAL PROCESSING & UPDATES",
    content: <><p>Information may be processed in countries where CORTEX or its service providers operate. Where applicable law requires a transfer mechanism or supplemental safeguards, we will use measures appropriate to the transfer.</p><p>We may update this policy as the website or our practices change. The “Last updated” date will identify the current version. Material changes will be reflected on this page before they take effect, except where law requires another method of notice.</p></>,
  },
] as const;

export default function PrivacyPolicy() {
  return <div className="privacy-page">
    <header className="privacy-nav">
      <a href="/index.html" className="privacy-wordmark" aria-label="CORTEX home"><img src={mark} alt="" /><span>CORTEX</span></a>
      <MorphicNavbar />
      <a href="/index.html" className="privacy-return"><ArrowLeft size={14} /> RETURN</a>
    </header>
    <main>
      <section className="privacy-hero" aria-labelledby="privacy-title">
        <div className="privacy-hero-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="privacy-hero-copy"><p>PUBLIC SITE / PRIVACY NOTICE</p><h1 id="privacy-title">YOUR INFORMATION<br />STAYS IN VIEW.</h1><span>This notice covers the CORTEX public website and access inquiries.</span></div>
        <div className="privacy-status" aria-label="Privacy policy status"><ShieldCheck size={18} /><div><span>LAST UPDATED</span><b>27 AUG 2026</b></div></div>
      </section>
      <section className="privacy-layout">
        <aside className="privacy-rail" aria-label="Privacy policy contents"><p>READOUT / 09</p>{sections.map(section => <a href={`#${section.id}`} key={section.id}><span>{section.number}</span>{section.title}</a>)}</aside>
        <article className="privacy-document">{sections.map(section => <section id={section.id} key={section.id} className="privacy-section"><div className="privacy-section-code"><span>{section.number}</span><i /></div><div><p>POLICY FIELD</p><h2>{section.title}</h2>{section.content}</div></section>)}</article>
      </section>
      <section className="privacy-contact" aria-labelledby="privacy-contact-title"><div><p>PRIVACY CONTACT</p><h2 id="privacy-contact-title">A DIRECT LINE,<br />NOT A DATA TRAIL.</h2><span>For a privacy question or request, contact the CORTEX team directly.</span></div><a href="mailto:hello@cortexbrain.ai?subject=Privacy%20Request">EMAIL PRIVACY <ArrowUpRight size={16} /></a></section>
    </main>
    <CortexFooter />
  </div>;
}
