# Scroll Stability Validation

## Initial Browser Findings

The Home route loaded without runtime errors. At a programmatic 8% position within the cinematic section, the visible progress guide updated to `08`, the opening video frame remained rendered, and the page retained substantial scrollable content below the viewport. The global smooth-scroll rule is overridden only while Home is mounted so direct scroll input and scrubbed video state remain immediate; secondary-route anchors retain their existing smooth behavior.

Native downward input progressed the guide from the opening state through the final sequence (`93`) and rendered the late-frame cable/brain visual. Repeated native upward input moved the guide back through `72` and `51`, with corresponding earlier cable frames rendered and no trapped scroll position. A settled forward sample reported a 10.042-second video with a 5.887-second timestamp; a subsequent reverse-stage sample reported 7.197 seconds after the then-current input sequence, confirming media seeking remained active during the scrub test.

The One-Pager initially rendered at its masthead on a direct `#freshness` visit while React was mounting. The post-render anchor handler now settles the same URL at the Freshness proof section (`1,045px` above the viewport), with its headline and content fully clear of the fixed navigation. Contents links use an explicit smooth scroll for standard motion preferences and an immediate scroll for reduced-motion preferences.

The One-Pager System contents control reached its `#system` target and settled at `1,386px`, clear of the fixed header. The Suite Judgment contents rail likewise reached `#suite-judgment` at `1,657px`; its heart feature heading and artwork were visibly positioned below the fixed header, with no overlay or trapped scroll state.

## Final Checks

`pnpm test`, `pnpm check`, and `pnpm build` passed after the changes. The only build notices were the existing runtime-resolved infrastructure-image advisory and Vite’s standard large-chunk suggestion. Desktop and 375px mobile full-page captures completed for Home, the One-Pager Freshness anchor, and the Suite Judgment anchor. Runtime diagnostics showed no new scroll or media errors; historical HMR and lifecycle failures predate this repair.
