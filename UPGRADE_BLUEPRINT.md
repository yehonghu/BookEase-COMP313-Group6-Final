# BookEase Upgrade Blueprint

## Product Positioning

BookEase is a three-sided local-service marketplace, not merely a directory. Its most valuable promise is the transition from **service request** to **competitive bids** to a **conflict-aware booking**. The public experience should make that sequence instantly understandable, while the authenticated customer, provider, and administrator spaces remain operationally efficient.

## Visual Direction: Night Market Orbit

The public product surface will move from a bright Apple-inspired interface to a confident dark spatial system. The visual language combines ink-black space, electric blue, ultraviolet, emerald signals, translucent panels, soft grain, and radial light fields. It is designed to feel like a live marketplace: clear enough for a booking task, but distinctive enough to be a portfolio-grade product case study.

## Interaction System

| Surface | Interaction | Purpose |
|---|---|---|
| Page frame | Thin scroll-progress rail and fixed translucent navigation | Gives long-form content an intentional reading rhythm. |
| Hero | Pointer-responsive service orbit, layered request/bid/booking cards, depth lights | Demonstrates the product loop without requiring a demo account. |
| Scroll sections | Perspective-based reveal, parallax light fields, staggered cards | Makes vertical scrolling feel spatial rather than decorative. |
| Category cards | Controlled three-dimensional hover tilt and luminous outlines | Makes marketplace discovery feel tactile while preserving accessibility. |
| Booking loop | Request, bid, and confirmation cards connected by animated paths | Explains the real marketplace workflow in one visual sequence. |
| Reduced-motion mode | Static hierarchy with no continuous or depth-heavy animation | Preserves usability for visitors who request less motion. |

## Scope of This Upgrade

1. Retain all existing public, customer, provider, and administrator routes and authorization guards.
2. Rebuild the shared public frame, navigation, landing page, and global visual tokens around the new system.
3. Preserve the real request, bid, availability, booking, review, and role-based workflows already implemented by the API.
4. Keep the entire source tree English. The audit found no Chinese user-facing text in the current codebase, so the work focuses on maintaining English-only content rather than translating a mixed-language interface.
5. Publish the compiled static application to the repository's `gh-pages` branch for a direct public preview. The full backend deployment remains represented through the existing Render configuration and requires a configured MongoDB service for live role-based API data.

## Engineering and Attribution Rules

All commits will use the GitHub identity `yehonghu` with the user-owned GitHub noreply address. The project documentation will list Yehong Hu (James Hu) as the sole contributor. No agent or third-party author attribution will be added.

The fixed development JWT value currently present in the Render configuration will be replaced with an environment-managed value, avoiding the retention of a hard-coded application secret in the deployment configuration.
