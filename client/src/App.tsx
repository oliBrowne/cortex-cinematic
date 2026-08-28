/** CORTEX design reminder: an almost-black, physical-infrastructure experience with minimal navigation chrome. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
/** CORTEX interaction reminder: every top-level route opens as a fresh, top-aligned field view. */
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { BackToTop } from "./components/BackToTop";
import { CookieConsent } from "./components/CookieConsent";
import { PageTransition, requestPageTransition } from "./components/PageTransition";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./components/theme-utilities.css";
import "./components/share-toast.css";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { Edge, Faq, OnePager, Suite, Values } from "./pages/SecondaryPages";
import { Terms } from "./pages/LegalPages";
import SuiteReference from "./pages/SuiteReference";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/index.html" component={Home} />
      <Route path="/suite.html" component={SuiteReference} />
      <Route path="/onepager.html" component={OnePager} />
      <Route path="/faq.html" component={Faq} />
      <Route path="/values.html" component={Values} />
      <Route path="/edge.html" component={Edge} />
      <Route path="/terms.html" component={Terms} />
      <Route path="/privacy.html" component={PrivacyPolicy} />
      <Route path="/:page.html" component={Home} />
      <Route component={Home} />
    </Switch>
  );
}

function RouteScrollReset() {
  const [location] = useLocation();

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const frame = window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previousRestoration;
    };
  }, [location]);

  return null;
}

function App() {
  const handleInternalLink = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !(event.target instanceof Element)) return;
    const link = event.target.closest("a[href]");
    if (!(link instanceof HTMLAnchorElement) || link.target || link.hasAttribute("download")) return;
    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin || destination.hash || destination.pathname === window.location.pathname) return;
    requestPageTransition();
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <TooltipProvider><div onClickCapture={handleInternalLink}><RouteScrollReset /><Toaster /><Router /><BackToTop /></div><PageTransition /><CookieConsent /></TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
