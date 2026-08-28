ADR-0014 — CO-SUITE HARDWARE-LED PIVOT
Reconstruction package. INTERNAL — not for outside contractors.

  0014-cosuite-hardware-led-pivot.md
      The reconstructed ADR. Status is RECONSTRUCTED DRAFT, not accepted.
      Every clause is tagged:
        [quoted]  near-verbatim from a tracker issue quoting the ADR
        [derived] inferred from what the issues require it to have said
        [GAP]     referenced but not reproduced - fill from your copy

  vision-doc-s6-and-changelog.patch
      Patch against docs/vision/understand-the-cortex-vision.md.
      Adds a superseding note to section 6 (kept, not rewritten, per the
      supersede-do-not-delete convention) and a changelog entry.
      Apply with:  git apply vision-doc-s6-and-changelog.patch

WHY THIS EXISTS
The original ADR-0014 was authored outside version control and has never been
committed. It is not on main, not on any of the 14 remote branches, and not
anywhere on this machine's filesystem. Twenty tracker issues cite it by path
and several quote it verbatim. Until it is committed, every one of those
issues traces its authority to a document nobody else can read.

GAPS TO FILL BEFORE ACCEPTING
  1. Ruling attribution - the tracker never names who decided.
  2. Compute-cost arithmetic - no cost model, unit economics or token math
     exists in the repo, the tracker, or the site.
  3. Pricing - no hardware price, spec, margin or lead time exists.
  4. THE ICP RULING. Tracker #57 states this ADR is what settles it: "Three
     ICPs are now in play (ledger, site, Taj's answer). One must win, and
     0014 must then update the ledger." Until it does, the site rewrite has
     no audience to write for and outbound gates against the old one.
  5. How a box is procured - capital purchase vs subscription, and whether
     departmental budget still reaches it. No accepted decision covers this.

The ADR now carries a Commercial posture section (ICP, buyer, pricing,
motion) assembled from ADR-0011, vision sections 7 and 12, and tracker #57.
Everything in it is sourced; nothing is invented. Items the pivot forces but
no decision has made are marked [unresolved] rather than answered.

ALSO WORTH KNOWING
The canonical vision doc currently argues AGAINST the pivot: section 6 still
reads "never manufactured hardware", and projs-CLAUDE.md designates that doc
canonical - "it wins every disagreement". The patch above resolves that.
