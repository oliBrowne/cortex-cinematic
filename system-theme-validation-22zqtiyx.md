# System Theme and Persistence Validation

On a first visit without a stored preference, the Home page resolved to the browser’s light system theme and retained readable black-ink content over the inverted CORTEX material palette at desktop and 390px mobile widths. Explicit selections are stored under the dedicated `cortex-theme` key; future page loads use that value rather than a system change. When no stored value exists, the provider continues to follow operating-system preference changes during the visit.
