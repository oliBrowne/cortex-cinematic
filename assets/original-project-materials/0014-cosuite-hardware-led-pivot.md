# ADR-0014: Co-Suite is a hardware-led product

Date: 2026-08-20. Status: **RECONSTRUCTED DRAFT — not yet accepted.**

> **Provenance warning.** The original ADR-0014 was authored outside this repository and has never
> been committed. It does not exist on `main`, on any of the fourteen remote branches, or anywhere
> on the authoring machine's filesystem. This file is a reconstruction assembled from the twenty
> tracker issues that cite it — several of which quote it verbatim — plus the code on
> `feat/appliance-model-plane` that implements it.
>
> Every clause below is sourced. Clauses marked **[quoted]** are near-verbatim from a tracker issue
> that was quoting the ADR; clauses marked **[derived]** are inferred from what the issues require
> the ADR to have said; clauses marked **[GAP]** are things the issues reference but do not
> reproduce, and must be filled from the original before this is accepted.
>
> Reconcile against the authoritative copy, then change Status to `accepted` and delete this block.

Ruling by **[GAP — attribution not recoverable from the tracker]**, 2026-08-20. This ADR records the
hardware-led pivot, narrows the meaning of "Cortex", introduces "Co-Suite" as the product name, and
amends §6 and §12 of `docs/vision/understand-the-cortex-vision.md`.

## Context

Three pressures converged. The first is unchanged from the pre-pivot product; the second and third
are new and are what moved the decision.

**1. The problems already defined.** Nothing in §1–§5 of the vision doc is repealed. The company
memory problem, the per-utterance sensitivity moat, and the governance story survive the pivot
intact. Co-Suite is a different *delivery vehicle* for them, not a different thesis. **[derived]**

**2. Compute and token cost.** Per-token inference against a hosted API is a recurring, usage-scaled
cost that the customer pays forever and that grows with exactly the behaviour the product wants to
encourage. Compute the customer already owns is capital they have already spent. **[derived from
Carson, 2026-08-26 — see Open, item 6: this driver currently has no cost model behind it anywhere
in the repo.]**

**3. Information security as locality, not only as access control.** The existing security story is
Conscience: provenance-inherited ACLs deciding who may receive which chunk. That is access control,
and it is real. It is a different argument from *the data never leaves the building*, which is the
argument a regulated buyer actually tests. Today the second argument cannot be made: both shipped
providers hardcode `api.fireworks.ai`, so transcript text and query text leave the boundary on every
ingest and every answer (§6, corrected 2026-08-06). A box the customer owns, running the model plane
on its own silicon, is the only configuration in which the claim is true. **[derived]**

The pre-pivot answer to all of this was §12's "certified appliance (Spark tier)": a signed image on
a partner-supplied, off-the-shelf Spark-class box, where *"hardware warranty stays with NVIDIA/the
partner, never our balance sheet."* That is no longer the plan. ADR-0014 moves assembly and warranty
onto us.

## Decision

**1. Co-Suite is the product.** Co-Suite is the machine plus the software stack that ships on it.
**Cortex** narrows to mean only the memory engine inside Co-Suite. **Conscience** remains the
governance plane. **Cornea** is internal-only and is never named to a customer. Customer-facing
writing says Co-Suite; Cortex remains correct for retrieval internals. **[quoted — `skills`
repo `projs-CLAUDE.md`, synced from the ADR under tracker #129]**

**2. Two purchase paths against one signed image.** **[quoted — #119]**
   - **Prebuilt by us** — we *"assemble, image, certify and ship"* the unit from off-the-shelf
     components. Build-to-order against a signed contract; *"no speculative inventory."*
     **[quoted — #119, #122]**
   - **Bring-your-own-box** — the same signed image on a customer machine *"meeting the spec."*
     **[quoted — #119]**

   Both paths are blocked on one document that does not exist: the hardware spec and component
   list (#119).

**3. This is assembly, not design.** *"No custom silicon, no custom board, no custom enclosure"* —
commodity parts only, which normally arrive already certified themselves. **[quoted — #119, #124]**

**4. Mass ingest is demoted.** It moves from the pitch to a benefit of owning the box. **[quoted —
#128]**

**5. The moat is stated as assembled by combination and by deployment.** The permitted form is
*"nobody has assembled this"*; the forbidden form is *"nobody has thought of this."* **[quoted —
#128]** This is consistent with the 2026-07-31 moat rework, which already narrowed novelty to
by-combination.

**6. The retention posture from §12 carries over and matters more.** Runtime-only signed images,
per-client time-boxed license files, and the never-brick-a-customer's-memory rule are retained —
and the ADR says the posture *"now matters more, because the code now sits on hardware we handed
over."* **[quoted — #123]**

**7. The demo is the pitch.** A unit booting with the network unplugged and answering a query is
the demonstration the product is sold on. **[quoted — #124]**

## Commercial posture

Design, copy and outbound all depend on this section. It is assembled from ADR-0011, §7, §12 and
tracker #57; where the pivot forces a change that no accepted decision has yet made, it is marked
**[unresolved]** rather than answered here.

### Who this is for — **[unresolved, and the ADR is expected to settle it]**

Three ICPs are live at once, and tracker #57 states that they cannot all survive: *"Three ICPs are
now in play (ledger, site, Taj's answer). One must win, and 0014 must then update the ledger."*

| Source | ICP | Status |
|---|---|---|
| `cortex-raise/claims/ledger.json` (`v-icp`) | 200–500 people, fintech / medical / banking, local storage as an advantage | What the outbound gate currently enforces |
| The one-pager / site | 200–500, regulated sectors | Pre-pivot copy |
| Taj | 100–1000, department-agnostic | Broader, unreconciled |

**The pivot pushes hard toward the regulated-data ICP.** A box in the customer's building is a
data-locality argument, and #57 already records that the regulated-data thesis *"pairs naturally
with the governance/permission-model positioning — which 0003 identified as the only uncontested
differentiator left."* The GTM-engineering alternative *"does not obviously pair with anything that
survived the audit."* **[derived — the reasoning is #57's; the ruling is not recorded anywhere and
must be made.]**

### Who buys it

- **Falsified:** deployment / implementation / solutions teams. #57 — *"no budget authority and no
  practitioner community anywhere. Do not build a target list against them."* Forward Deployed
  Engineer is a seller-side title, not a buyer. **[quoted]**
- **Untested:** GTM Engineer. A real title with real communities, but it *"buys outbound/enrichment
  tooling… and has never been observed buying anything in this category."* Budget authority
  undocumented. #57's own framing: *"is the GTM-engineering persona a real hypothesis or a
  convenient one?"* **[quoted]**
- **Economic buyer under the box: [unresolved].** Per-node pricing was designed so a department
  procures on its own budget. A capital purchase of a physical machine is a different procurement
  path from a software subscription, and #57 already doubted the software version *"survives contact
  with a 500-person company's security review."* Nothing has decided how the box is procured.

### How it is priced

- **Software and services, from ADR-0011 (accepted):** charge implementation explicitly rather than
  absorbing it — **$25–75K**, the band comparables establish (Glean $20–50K, Sigma $20–75K,
  Moveworks $50–200K+). Take the FDE money, not the FDE identity.
- **The shape of the engagement, from ADR-0011 and §7:** *fast to first value, long to full value*.
  Palantir's own bootcamp reaches a working use case on real customer data in 1–5 days, then 8–12
  weeks to production. §7: *"setup speed sells the demo; memory + governance sell the contract."*
  Setup speed is a demo property, never the moat.
- **Subscription, from §12:** covers the software brain, updates, and governance. Retention is
  structural — the living product, not code secrecy.
- **Hardware: [GAP].** No price, no margin, no BOM, no lead time (#119, #19). The box is the lead
  product and it is the one line with no number behind it.

### The motion

The pre-pivot model was *"deployment path = business model: solo → department appliance → nodes
multiply → Conscience becomes the obvious paid question."* The pivot makes the second step a
physical purchase rather than a deploy, which is a higher-friction entry with a stronger security
story. **Whether the land step survives that friction is [unresolved]** and is the commercial risk
the pivot takes.

### Two assumptions ADR-0011 records as unevidenced

Both are load-bearing for the box and neither has been tested. Do not present either as fact.

1. That regulated buyers prefer high-touch deployment — *"no procurement study, buyer survey or
   analyst report comparing the tradeoff was found."*
2. That services work compiles into product — correlation only, with a published counter-argument.

## What this does not change

- **§6's refusal of custom hardware is not repealed.** The supply-chain argument that killed mic
  hardware still stands; ADR-0014 *"knowingly takes the smaller version of the exposure for
  commodity assembly."* **[quoted — #120]** The mic-hardware verdict is untouched.
- **No code renaming.** The product rename is product-only. Package names, the Postgres schema, the
  `cortex` CLI binary, env vars, and file paths — including the vision doc's own path — are
  unchanged. Code renaming is deferred as a separate costed change. Do not "fix" an identifier to
  say cosuite. **[quoted — `projs-CLAUDE.md`]**
- **Tracker label strings.** They predate this ADR and were deliberately left alone; `cortex` remains
  a tracker area bucket whose scope did not narrow because the product term did, and `suite` has no
  recorded definition as "Co-Suite". **[quoted — #127]**

## Evidence in the repo today

What a stranger's own engineer can verify, as of this writing — all on
`feat/appliance-model-plane`, which is **not merged to `main`**:

1. **The model plane is relocatable.** `packages/shared/src/model-plane.ts` resolves the generation
   and embedding base URLs from `GENERATION_BASE_URL` / `EMBEDDING_BASE_URL` / `MODEL_BASE_URL`,
   defaulting to Fireworks. Both shipped providers speak the OpenAI wire format and so does vLLM,
   so the difference between phoning home and staying in boundary is a base URL and a model name.
2. **Locality is a positive test.** `model-plane.ts` tests *for* locality rather than against a
   denylist of hosted hostnames, so an unknown future provider reads as off-boundary by default.
3. **The appliance promise is enforced, not documented.** `packages/shared/src/startup-guard.ts:85`
   — with `CORTEX_DEPLOYMENT=appliance`, a model plane pointing off-box is a startup failure at
   every `NODE_ENV`. The source comment is explicit: *"`CORTEX_DEPLOYMENT=appliance` is a PROMISE,
   so it is enforced."*
4. **`deploy/appliance/`** exists with a compose file, a demo corpus, seed and verify scripts.

**What has never happened:** the box answering. `docs/handoff/PILOT-DOGFOOD-RUNBOOK.md:362` records
that the vLLM path has never been run end to end because no GPU box was available. Until #130 lands,
every outward claim must stay in the *enforcement* form ("the appliance refuses to start if the
model plane is off-box"), never the *performance* form.

## Consequences

The pivot moves four categories of risk onto our balance sheet that §12 had deliberately kept off it:

| Risk | Owner before | Owner after | Tracker |
|---|---|---|---|
| Component supply and lead time | Partner | Us | #120 |
| Working capital (parts bought before payment clears) | Partner | Us | #121 |
| Warranty and RMA on a failed unit | NVIDIA / partner | Us | #123 |
| Assembly, imaging, certification | Partner | Us | #124 |

Spares policy (#122) is downstream of the build-to-order rule in Decision 2: with no spare, a failed
box means the customer waits a full component lead time.

`certify` is load-bearing and ambiguous — it can mean regulatory certification (safety, EMC) on an
assembled machine placed on the market, or an internal QA gate. #124 exists to disambiguate it.
**[quoted — #124]**

## Open

1. **Hardware spec and component list** — neither exists; both purchase paths are blocked (#119).
2. **Cost model** at 1 / 6 / 20 nodes, including the AGPL licensing call for any copyleft component
   in a distributed image, per ADR-0004 (#19).
3. **Product-area label** for hardware work — Taj's call (#127).
4. **Tuned models.** *"Until the labeled per-utterance corpus exists, tuning has no labeled target
   beyond generic instruction-following"* **[quoted verbatim from the ADR's own Open section —
   #125]**, gated on #7. "Tuned local models" is half the moat claim and currently has no number
   behind it (#125).
5. **License-lapse behaviour** — inherited OPEN from §12, still undecided.
6. **[GAP] The compute-cost argument has no arithmetic anywhere.** No cost model, no unit economics,
   no token math exists in the repo, the tracker, or the site. If cost is a load-bearing reason for
   the pivot, it needs a number before it goes in front of an investor (#61) or a customer (#128).
7. **[GAP] No pricing.** No hardware price, margin, or lead time exists.
8. **The ICP ruling, which this ADR is expected to make** (#57). Three ICPs are live; the outbound
   gate enforces the ledger's version; the site states another. Until one wins and
   `cortex-raise/claims/ledger.json` is updated, the site rewrite (#128) has no audience to write
   for and the investor narrative (#61) has no segment to name.
9. **How a box is procured** — capital purchase versus subscription, and whether departmental budget
   still reaches it. Unaddressed by any accepted decision.

## Relationship to prior decisions

- **Amends §6** of the vision doc. §6 currently reads *"Local compute node: yes — as software
  appliance, never manufactured hardware"* and *"the seam is built, the local implementation is
  not."* The first is now half-wrong (we assemble; we still do not manufacture) and the second is
  superseded by `feat/appliance-model-plane`. See the patch in tracker #130's "Done when".
- **Amends §12.** The Spark-tier framing — partner-supplied hardware, warranty off our balance
  sheet — is replaced by Decision 2. §12's retention posture is retained by Decision 6.
- **Does not disturb** ADR-0004 (one-database appliance backend), ADR-0011 (services and pricing
  posture), or the 2026-07-31 moat rework, all of which the pivot leans on rather than revises.

## Blocked on this ADR being committed

#119, #120, #121, #122, #123, #124, #125, #126, #127, #128, #129, #130, and the investor narrative
(#61). Each cites this file by path.
