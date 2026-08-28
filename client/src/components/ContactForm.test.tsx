import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactForm } from "./ContactForm";

describe("contact form privacy safeguards", () => {
  it("limits the personal data that can be composed into an email draft", () => {
    render(<ContactForm />);

    expect(screen.getByRole("textbox", { name: /your name/i })).toHaveAttribute("maxlength", "80");
    expect(screen.getByRole("textbox", { name: /work email/i })).toHaveAttribute("maxlength", "254");
    expect(screen.getByRole("textbox", { name: /company/i })).toHaveAttribute("maxlength", "120");
    expect(screen.getByRole("textbox", { name: /what should stay inside/i })).toHaveAttribute("maxlength", "1200");
    expect(screen.getByText(/this site does not store your message/i)).toBeInTheDocument();
  });
});

describe("browser security policy", () => {
  const documentHead = readFileSync(resolve(process.cwd(), "client", "index.html"), "utf8");

  it("keeps a restrictive policy and avoids third-party analytics or font scripts", () => {
    expect(documentHead).toContain('http-equiv="Content-Security-Policy"');
    expect(documentHead).toContain("default-src 'self'");
    expect(documentHead).toContain("connect-src 'none'");
    expect(documentHead).toContain("object-src 'none'");
    expect(documentHead).not.toContain("umami");
    expect(documentHead).not.toContain("fonts.googleapis.com");
  });
});
