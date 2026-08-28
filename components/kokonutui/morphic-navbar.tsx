/**
 * CORTEX integration note: official KokonutUI Morphic Navbar installed through shadcn.
 * The source layout is retained; only Next Link is mapped to Wouter Link for this Vite application.
 */
import clsx from "clsx";
import { animate } from "animejs/animation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import "./morphic-navbar.css";

interface NavItem {
  name: string;
}

interface MorphicNavbarProps {
  items?: Record<string, NavItem>;
  defaultPath?: string;
  className?: string;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

const DEFAULT_NAV_ITEMS: Record<string, NavItem> = {
  "/": { name: "HOME" },
  "/suite.html": { name: "SUITE" },
  "/values.html": { name: "VALUES" },
  "/edge.html": { name: "THE EDGE" },
  "/onepager.html": { name: "ONE-PAGER" },
  "/faq.html": { name: "FAQ" },
};

const canonicalPath = (path: string) => path.split("?")[0].replace("/index.html", "/") || "/";
const prefersReducedMotion = () => typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const resetDocumentScroll = (behavior: ScrollBehavior = "auto") => window.scrollTo({ top: 0, left: 0, behavior });
const currentDocumentPath = (location: string, defaultPath: string) => typeof window !== "undefined" && window.location.pathname
  ? canonicalPath(window.location.pathname)
  : canonicalPath(location || defaultPath);

export function MorphicNavbar({ items = DEFAULT_NAV_ITEMS, defaultPath = "/", className, variant = "desktop", onNavigate }: MorphicNavbarProps) {
  const [location, setLocation] = useLocation();
  const [activePath, setActivePath] = useState(() => currentDocumentPath(location, defaultPath));
  const railRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLSpanElement>(null);
  const selectionPosition = useRef({ left: 0, width: 0, ready: false });
  const navigationTimerRef = useRef<number | undefined>(undefined);

  useLayoutEffect(() => setActivePath(currentDocumentPath(location, defaultPath)), [location, defaultPath]);
  useEffect(() => () => {
    if (navigationTimerRef.current !== undefined) window.clearTimeout(navigationTimerRef.current);
  }, []);

  useLayoutEffect(() => {
    if (variant !== "desktop") return;
    const syncSelection = () => {
      const rail = railRef.current;
      const selection = selectionRef.current;
      const target = rail?.querySelector<HTMLElement>(".morphic-official-active");
      if (!rail || !selection || !target) return;
      const railRect = rail.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (!targetRect.width) return;
      const next = { left: targetRect.left - railRect.left, width: targetRect.width };
      const previous = selectionPosition.current;
      if (!previous.ready) {
        selection.style.transform = `translateX(${next.left}px)`;
        selection.style.width = `${next.width}px`;
        selection.style.opacity = "1";
      } else {
        animate(selection, { translateX: [previous.left, next.left], width: [previous.width, next.width], duration: 480, ease: "outExpo" });
      }
      selectionPosition.current = { ...next, ready: true };
    };
    const frame = window.requestAnimationFrame(syncSelection);
    window.addEventListener("resize", syncSelection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", syncSelection);
    };
  }, [activePath, items, variant]);

  const isActiveLink = (path: string) => path === "/" ? activePath === "/" : activePath.startsWith(path);

  return (
    <nav className={clsx("morphic-official", variant === "desktop" ? "morphic-official-desktop hidden md:block" : "morphic-official-mobile", className)} aria-label="Primary navigation">
      <div className={clsx("flex items-center justify-center", variant === "desktop" ? "mx-auto max-w-4xl px-4 py-2" : "w-full")}>
        <div className="morphic-official-shell">
          <div ref={railRef} className="glass flex items-center justify-between overflow-hidden rounded-xl">
            {variant === "desktop" && <span ref={selectionRef} className="morphic-gliding-selection" aria-hidden="true" />}
            {Object.entries(items).map(([path, { name }]) => {
              const isActive = isActiveLink(path);

              return (
                <Link
                  className={clsx(
                    "morphic-official-link flex items-center justify-center bg-black p-1.5 px-4 text-sm text-white transition-all duration-300",
                    isActive && "morphic-official-active font-semibold text-sm"
                  )}
                  href={path}
                  key={path}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    const clickedPathIsActive = currentDocumentPath(location, defaultPath) === path;
                    if (clickedPathIsActive) {
                      resetDocumentScroll(prefersReducedMotion() ? "auto" : "smooth");
                      onNavigate?.();
                      return;
                    }

                    resetDocumentScroll();
                    setActivePath(path);
                    onNavigate?.();
                    navigationTimerRef.current = window.setTimeout(() => {
                      setLocation(path);
                      window.requestAnimationFrame(() => resetDocumentScroll());
                    }, clickedPathIsActive || variant === "mobile" ? 0 : 210);
                  }}
                  onPointerEnter={(event) => {
                    if (isActive || prefersReducedMotion()) return;
                    animate(event.currentTarget, { translateY: [0, -2], scale: [1, 1.018], duration: 220, ease: "outExpo" });
                  }}
                  onPointerLeave={(event) => {
                    if (isActive || prefersReducedMotion()) return;
                    animate(event.currentTarget, { translateY: 0, scale: 1, duration: 220, ease: "outExpo" });
                  }}
                  onFocus={(event) => {
                    if (isActive || prefersReducedMotion()) return;
                    animate(event.currentTarget, { translateY: [0, -2], scale: [1, 1.018], duration: 220, ease: "outExpo" });
                  }}
                  onBlur={(event) => {
                    if (isActive || prefersReducedMotion()) return;
                    animate(event.currentTarget, { translateY: 0, scale: 1, duration: 180, ease: "outExpo" });
                  }}
                >
                  <span className="morphic-link-label">{name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MorphicNavbar;
