import { useEffect } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

/** CORTEX visual contract: one fixed near-black environment, independent of user or OS preferences. */
export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    root.style.colorScheme = "dark";
    try {
      localStorage.removeItem("cortex-theme");
    } catch {
      // Restricted browser storage does not affect the fixed presentation.
    }
  }, []);

  return children;
}
