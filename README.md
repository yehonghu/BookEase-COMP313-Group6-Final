# BookEase

> A full-stack local-service marketplace that turns a request into comparable provider offers and a conflict-aware booking.

BookEase is a portfolio-grade React, Express, and MongoDB application for customers, independent service providers, and administrators. Its public experience is rebuilt as **Neighbourhood in Motion**: a warm editorial service field with a pointer-responsive Three.js orbit, scroll-led product storytelling, original community-service visuals, and readable request-to-booking states.

The visual layer does not replace the product. The application preserves the real marketplace workflow behind the public experience and can run against the included Express and MongoDB backend.

## Product Flow

```text
Customer request → provider offers → bid selection → availability verification → booking creation → review
```

| Role | Core capabilities |
|---|---|
| Customer | Create service requests, compare offers, select a provider, track bookings, save favourites, and review completed work. |
| Provider | Browse relevant requests, submit and manage offers, maintain availability, manage bookings, and build a service profile. |
| Administrator | Monitor marketplace activity and manage users, providers, services, bookings, reviews, and contact messages. |

## Technology

| Area | Tools |
|---|---|
| Frontend | React 18, Vite, React Router, Tailwind CSS, Bootstrap compatibility layer |
| Interaction | Framer Motion, Three.js, React Three Fiber, Drei, reduced-motion support |
| Backend | Node.js, Express, Mongoose, JWT, express-validator |
| Database | MongoDB |
| Deployment | Render-compatible Express configuration plus a GitHub Pages read-only public demo |

## Local Development

### Prerequisites

- Node.js 18 or later
- MongoDB 6 or later, available locally or through a managed connection

### Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Configure the backend

Create `backend/.env` with real deployment credentials kept outside Git.

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookease
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Run locally

Use two terminals during development.

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

The Vite development server proxies `/api` to `http://localhost:5001` by default. Set `VITE_DEV_API_PROXY` if your local Express server uses another address.

## Real Production Deployment

Build the frontend in its normal production mode for Express, Render, or another application host.

```bash
cd frontend
npm run build

cd ../backend
npm start
```

The normal production build uses `BrowserRouter` and the same-origin `/api` path. If frontend and API are hosted on different domains, configure the frontend build with:

```env
VITE_API_BASE_URL=https://api.example.com/api
```

Do **not** set `VITE_DEMO_MODE` in a real deployment. That mode exists only for the static public showcase.

## GitHub Pages Demonstration

The public Pages build is deliberately read-only. It includes representative service requests so visitors can browse the redesigned product, filter the request board, and inspect service details without a database or credentials.

```bash
cd frontend
npm run build:pages
```

The Pages build automatically uses the repository base path and `HashRouter`. It is controlled by `frontend/.env.pages`:

```env
VITE_DEPLOY_TARGET=pages
VITE_ROUTER_MODE=hash
VITE_DEMO_MODE=true
```

The public demonstration does not simulate writes. Authentication, request creation, provider offers, bid acceptance, bookings, reviews, favourites, contact messages, and administration remain connected to the real API in normal application mode.

## Structure

```text
backend/
  src/
    controllers/      # Business logic for requests, bids, availability, bookings, and reviews
    models/           # MongoDB models
    routes/           # API routes
    middleware/       # Authentication, role checks, validation, and error handling
frontend/
  public/images/      # Original BookEase visual assets
  src/
    app/              # Environment-aware route map
    api/              # Real API wrappers and Pages demo boundary
    auth/             # Authentication provider and route guards
    components/       # Shared marketplace UI
    data/             # Read-only Pages demonstration data
    layouts/          # Public, customer, provider, and admin shells
    pages/            # Marketplace, customer, provider, admin, and public routes
    three/            # Interactive service-orbit scene
render.yaml           # Render deployment blueprint
```

## Accessibility and Motion

The public surface supports keyboard-accessible navigation, legible text overlays, reduced-motion preferences, responsive reflow, and non-essential animation fallbacks. The Three.js service orbit has accompanying text controls that navigate to the request board.

## Contributor

**Yehong Hu (James Hu)**
