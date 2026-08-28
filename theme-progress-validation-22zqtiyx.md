# Theme Transition and Scroll Progress Validation

The Home page retains readable black-ink content when the system resolves to light mode at desktop and 390px mobile widths. Theme state changes now transition through the root material palette instead of snapping. The Back to Top utility calculates scroll progress from the document height, renders it as a circular stroke around the return action, and continues to use a smooth reduced-motion-aware scroll return. The control remains hidden at the top of the page and reveals after the primary section.
