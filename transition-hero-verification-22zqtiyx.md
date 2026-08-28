# Transition and Light-Mode Hero Verification

The Home preview was opened while the navigation toggle indicated light mode. The scroll-controlled video remained visible at the initial frame and advanced to the next cinematic composition when the page progressed from 00 to 21 percent. This confirms that moving the video layer from the filtered fixed root into the sticky cinematic section preserves its active scroll behavior under the site’s light-mode inversion.

An internal Suite navigation also completed normally from the shared header, preserving the correct selected navigation state on arrival. The remaining verification step is to sample the active olive trace directly while it is displayed.

The page-transition trace was sampled while active: it mounted directly under `BODY`, was visible, and computed to the established olive `rgb(105, 117, 68)`. This avoids the root’s light-mode inversion. The theme switch then successfully changed the shared Suite shell to dark mode without disrupting the transition component.

The Home route was then opened in dark mode and scrolled from 00 to 21 percent through the cinematic sequence. The video remained visible and moved to its next frame while the story progress advanced, confirming parity between dark and light modes.
