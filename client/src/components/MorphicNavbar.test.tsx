/** CORTEX accessibility test: the official KokonutUI navigation must remain keyboard reachable and visibly focusable. */
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { MorphicNavbar } from "../../../components/kokonutui/morphic-navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";

const setTestPath = (path: string) => {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

beforeEach(() => {
  setTestPath("/");
});

const NAV_DESTINATIONS = [
  { name: "HOME", path: "/" },
  { name: "SUITE", path: "/suite.html" },
  { name: "ONE-PAGER", path: "/onepager.html" },
  { name: "FAQ", path: "/faq.html" },
  { name: "VALUES", path: "/values.html" },
  { name: "THE EDGE", path: "/edge.html" },
] as const;

describe("official KokonutUI Morphic Navbar accessibility", () => {
  it("keeps each route link keyboard reachable in a logical tab order", async () => {
    const user = userEvent.setup();
    render(<ThemeProvider><MorphicNavbar /></ThemeProvider>);

    const home = screen.getByRole("link", { name: "HOME" });
    const suite = screen.getByRole("link", { name: "SUITE" });

    await user.tab();
    expect(home).toHaveFocus();
    expect(home).toHaveAttribute("aria-current", "page");

    await user.tab();
    expect(suite).toHaveFocus();
    expect(suite).toHaveAttribute("href", "/suite.html");
  });

  it("ships visible high-contrast focus styles for both inactive and active links", () => {
    const css = readFileSync(resolve(import.meta.dirname, "../../../components/kokonutui/morphic-navbar.css"), "utf8");
    expect(css).toContain(".morphic-official-link:focus-visible");
    expect(css).toContain("outline:2px solid #eee9dd");
    expect(css).toContain(".morphic-official-active:focus-visible");
    expect(css).toContain("outline-color:#eee9dd");
  });

  it("gives inactive desktop links a restrained ivory hover signal", () => {
    const css = readFileSync(resolve(import.meta.dirname, "../../../components/kokonutui/morphic-navbar.css"), "utf8");
    expect(css).toContain(".morphic-official-link:not(.morphic-official-active):hover");
    expect(css).toContain("background:rgb(238 233 221 / .07)");
    expect(css).toContain("transform:translateY(-1px)");
  });

  it.each(NAV_DESTINATIONS)("smoothly returns the active desktop $name route to the page top", async ({ name, path }) => {
    setTestPath(path);
    const user = userEvent.setup();
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<ThemeProvider><MorphicNavbar /></ThemeProvider>);

    await user.click(screen.getByRole("link", { name }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "smooth" });
  });

  it.each(NAV_DESTINATIONS)("smoothly returns the active mobile $name route to the page top", async ({ name, path }) => {
    setTestPath(path);
    const user = userEvent.setup();
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<ThemeProvider><MorphicNavbar variant="mobile" /></ThemeProvider>);

    await user.click(screen.getByRole("link", { name }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "smooth" });
  });

  it.each(NAV_DESTINATIONS)("immediately clears inherited scroll before opening the $name route", async ({ name, path }) => {
    setTestPath(path === "/" ? "/suite.html" : "/");
    const user = userEvent.setup();
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<ThemeProvider><MorphicNavbar /></ThemeProvider>);

    await user.click(screen.getByRole("link", { name }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" });
  });

  it.each(NAV_DESTINATIONS)("immediately clears inherited scroll before opening the $name route from mobile navigation", async ({ name, path }) => {
    setTestPath(path === "/" ? "/suite.html" : "/");
    const user = userEvent.setup();
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<ThemeProvider><MorphicNavbar variant="mobile" /></ThemeProvider>);

    await user.click(screen.getByRole("link", { name }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" });
  });

  it("uses an immediate top reset when reduced motion is requested", async () => {
    setTestPath("/suite.html");
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as MediaQueryList);
    const user = userEvent.setup();
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<ThemeProvider><MorphicNavbar /></ThemeProvider>);

    await user.click(screen.getByRole("link", { name: "SUITE" }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" });
  });
});
