import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "wouter";
import "./page-transition.css";

const PAGE_TRANSITION_EVENT = "cortex:page-transition";
const prefersReducedMotion = () => typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function requestPageTransition() {
  if (!prefersReducedMotion()) window.dispatchEvent(new CustomEvent(PAGE_TRANSITION_EVENT));
}

export function PageTransition() {
  const [location] = useLocation();
  const [active, setActive] = useState(false);
  const pendingRef = useRef(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const clearFinishTimer = () => {
      if (timeoutRef.current !== undefined) window.clearTimeout(timeoutRef.current);
    };
    const start = () => {
      clearFinishTimer();
      pendingRef.current = true;
      setActive(true);
      timeoutRef.current = window.setTimeout(() => {
        pendingRef.current = false;
        setActive(false);
      }, 900);
    };
    window.addEventListener(PAGE_TRANSITION_EVENT, start);
    return () => {
      window.removeEventListener(PAGE_TRANSITION_EVENT, start);
      clearFinishTimer();
    };
  }, []);

  useEffect(() => {
    if (!pendingRef.current) return;
    const frame = window.requestAnimationFrame(() => {
      if (timeoutRef.current !== undefined) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        pendingRef.current = false;
        setActive(false);
      }, 230);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  if (typeof document === "undefined") return null;
  return createPortal(
    <div className={`cortex-page-transition${active ? " is-active" : ""}`} role="status" aria-live="polite" aria-label={active ? "Loading page" : undefined}>
      <span className="cortex-page-transition-track" aria-hidden="true"><i /></span>
    </div>,
    document.body,
  );
}
