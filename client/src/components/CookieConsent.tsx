import { useState } from "react";
import { createPortal } from "react-dom";
import "./cookie-consent.css";

const CONSENT_COOKIE = "cortex-cookie-consent";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

type ConsentChoice = "accepted" | "essential";

function getConsentChoice(): ConsentChoice | null {
  try {
    const entry = document.cookie.split("; ").find((value) => value.startsWith(`${CONSENT_COOKIE}=`));
    const choice = entry?.split("=")[1];
    return choice === "accepted" || choice === "essential" ? choice : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(getConsentChoice);

  const saveChoice = (nextChoice: ConsentChoice) => {
    try {
      document.cookie = `${CONSENT_COOKIE}=${nextChoice}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
    } catch {
      // If cookies are unavailable, the banner remains dismissible for the active page.
    }
    setChoice(nextChoice);
  };

  if (choice || typeof document === "undefined") return null;

  return createPortal(
    <section className="cookie-consent" role="region" aria-label="Cookie preferences">
      <div className="cookie-consent-copy">
        <p>PRIVACY PREFERENCE</p>
        <span>We use a necessary first-party cookie to remember this choice. No advertising, cross-site tracking, or display-theme storage.</span>
      </div>
      <div className="cookie-consent-actions">
        <a href="/privacy.html">PRIVACY POLICY</a>
        <button type="button" className="cookie-consent-essential" onClick={() => saveChoice("essential")}>ESSENTIAL ONLY</button>
        <button type="button" className="cookie-consent-accept" onClick={() => saveChoice("accepted")}>ACCEPT</button>
      </div>
    </section>,
    document.body,
  );
}
