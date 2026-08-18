# BookEase Upgrade Blueprint

## Product Positioning

BookEase is a three-sided local-service marketplace, not merely a directory. Its most valuable promise is the transition from **service request** to **competitive bids** to a **conflict-aware booking**. The public experience should make that sequence instantly understandable, while the authenticated customer, provider, and administrator spaces remain operationally efficient.

## Visual Direction: The Service Almanac

This upgrade intentionally moves BookEase away from dark glass and the portfolio’s cinematic interface language. **The Service Almanac** is a warm, editorial product system inspired by a useful city bulletin: paper-white fields, oat and saffron surfaces, ink-blue typography, brick-red decision markers, and clipped cobalt information cards. The mood is social, tactile, and optimistic rather than futuristic.

The hero becomes a layered paper-board model of a real booking journey. Cards feel printed, pinned, and physically stacked; the depth comes from controlled perspective, offset shadows, rounded cut-paper shapes, and animated connector lines instead of luminous glass. The style communicates a marketplace made for real neighborhoods and real schedules.

## Interaction System

| Surface | Interaction | Purpose |
|---|---|---|
| Page frame | A narrow cobalt reading rail and warm fixed navigation | Gives the long-form page a clear editorial rhythm. |
| Hero | Pointer-responsive paper-board with stacked request, bid, and booking slips | Shows the product loop in a tactile, non-futuristic way. |
| Scroll sections | Staggered paper reveals, moving editorial markers, and subtle depth shifts | Makes scrolling feel composed and physical rather than decorative. |
| Category cards | Printed-label hover lift with restrained tilt and color tabs | Makes discovery feel approachable and crafted. |
| Booking loop | Request, bid, and confirmation modules linked by a travelling line | Explains the real marketplace workflow as an intelligible sequence. |
| Reduced-motion mode | Static composition without continuous shifts or pointer depth | Preserves access for visitors who request less motion. |

## Scope of This Upgrade

1. Retain all existing public, customer, provider, and administrator routes and authorization guards.
2. Rebuild the shared public frame, navigation, landing page, and global visual tokens around the Service Almanac system.
3. Preserve the real request, bid, availability, booking, review, and role-based workflows already implemented by the API.
4. Keep the entire source tree English. The audit found no Chinese user-facing text in the current codebase, so the work focuses on maintaining English-only content rather than translating a mixed-language interface.
5. Publish the compiled static application to the repository's `gh-pages` branch for a direct public preview. The full backend deployment remains represented through the existing Render configuration and requires a configured MongoDB service for live role-based API data.

## Engineering and Attribution Rules

All commits will use the GitHub identity `yehonghu` with the user-owned GitHub noreply address. The project documentation will list Yehong Hu (James Hu) as the sole contributor. No agent or third-party author attribution will be added.

The deployment configuration uses an environment-managed JWT value rather than a hard-coded authentication secret.
