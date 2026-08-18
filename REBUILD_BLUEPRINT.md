# BookEase Rebuild Blueprint — Neighbourhood in Motion

## Decision

The previous **Service Almanac** visual upgrade will be fully replaced. BookEase will be rebuilt as a **local-service coordination product**: a customer can request help, a provider can respond with an offer, an accepted offer becomes a scheduled booking, and both sides can close the loop through status changes and reviews.

The new front end will retain the existing Express/MongoDB/JWT contract rather than replacing it with a mock-only experience. Public GitHub Pages will remain an interaction-rich presentation build, while the same source remains ready to run with the production Express API.

## Product Position

> **BookEase — Neighbourhood in Motion**
>
> A calm, high-trust service marketplace that makes local requests feel visible, considered, and easy to resolve.

The visual direction combines the spatial restraint of the Game Library with the progressive, scroll-led storytelling of psychology-study. It will not reuse either project’s dark indigo archive or research-editorial identity. BookEase will use a brighter, domestic civic palette: warm paper, midnight ink, cobalt, coral, moss, and soft sunlight.

## Experience System

| Surface | New interaction and visual treatment | Functional responsibility retained |
|---|---|---|
| Home | Animated editorial opening with an interactive 3D service-orbit object, progressive scroll scenes, availability signals, and a live request preview. | Entry points to browse, create a request, register, and sign in. |
| Service directory | Image-supported request cards, search, service-type filters, status treatment, and motion-aware card transitions. | Public listing, filtering, pagination, and service navigation. |
| Service detail | Timeline-like request state, provider offer comparison, availability feedback, and role-aware actions. | View request, submit/update bids, select a bid, cancel/delete, and transition accepted work into a booking. |
| Customer workspace | A personal request-and-booking board with visual status lanes and an expandable request composer. | Create/update/delete owned requests, manage bookings, favorites, account, and ratings. |
| Provider workspace | Opportunity queue, bid composer, active-work board, and availability calendar surface. | Browse open requests, submit/update offers, manage services, availability, bookings, and account. |
| Admin workspace | Clear operational tables and calm activity summaries rather than a generic dashboard. | Users, providers, bookings, reviews, contact messages, and moderation. |

## Interaction Principles

The hero will use a purposeful 3D stage rather than decorative motion: floating service tokens respond to pointer movement and direct the viewer toward service categories. Scroll progress will unlock small narrative changes in the home experience. Cards will have shallow physical lift, not continuous animation. All motion will respect `prefers-reduced-motion`.

Original concept imagery will be used as atmospheric, category-level visual support. No image will claim to be an official provider, customer, or service listing. Core workflow information remains text- and state-led so that it continues to work with real API data.

## Backend-Ready Architecture

| Concern | Implementation rule |
|---|---|
| API target | Use `VITE_API_BASE_URL` when supplied; otherwise use `/api` for the Express deployment. |
| Authentication | Retain JWT local-storage keys, existing Axios bearer-token interceptor, `AuthProvider`, and protected role routes. |
| Role behavior | Preserve customer, provider, and admin guards and routes; redesign their visual containers without reducing API-backed actions. |
| Local development | Keep the Vite `/api` proxy to the local Express server. |
| Production server | Build the Vite app and serve it from the existing Express app; use BrowserRouter and same-origin `/api`. |
| Public GitHub Pages demo | Build with `VITE_ROUTER_MODE=hash` and an optional API base URL. Demo-only placeholders must never replace the real API layer. |
| Deployment configuration | Keep `render.yaml`, `render-build.sh`, database environment variables, CORS settings, API health endpoint, and SPA fallback. |

## Delivery Checks

The rebuilt version must preserve request browsing, registration/login, role guards, request creation, provider offers, offer selection, booking lifecycle updates, availability, reviews, favorites, contact, and administrative views. Before release, the public presentation build and the production API-target mode will each be built and verified independently.
