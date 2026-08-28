# Contact and Contrast Validation

The Home page was inspected in light mode through its final access area. The new form remains inside the final access composition, uses a clear grid at desktop width, and keeps body copy legible against the white surface. The nearby infrastructure image is monochrome and the action/link details retain restrained olive wayfinding.

The next verification step is to submit the empty form locally, confirming that invalid state feedback is exposed without opening an email client.

Submitting the empty form retained the visitor on the page and exposed readable, per-field errors for name, work email, and message. The work-email field could then receive focus independently, which activates the separate focus-within treatment. Required controls include `aria-invalid` and associate their errors using `aria-describedby`.

The light-mode audit confirmed the root inversion is active and long-form Home copy now computes to Conscience Ivory at 82% opacity before inversion, yielding a dark gray on the white field sheet. This is substantially stronger than the previous muted copy treatment. Contact-entry text computes to full Conscience Ivory before inversion, yielding near-black text on the light form surface. The visual review also confirmed the mobile form stacks into a single column.
