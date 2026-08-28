import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { CookieConsent } from "./CookieConsent";

describe("CookieConsent", () => {
  beforeEach(() => {
    document.cookie = "cortex-cookie-consent=; Path=/; Max-Age=0";
  });

  it("links to the privacy policy and persists an explicit choice", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/privacy.html");
    await user.click(screen.getByRole("button", { name: /^essential only$/i }));

    expect(screen.queryByRole("region", { name: /cookie preferences/i })).not.toBeInTheDocument();
    expect(document.cookie).toContain("cortex-cookie-consent=essential");
  });
});
