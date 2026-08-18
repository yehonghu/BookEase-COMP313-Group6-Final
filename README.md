# BookEase

> A full-stack local-service marketplace that turns a service request into comparable bids and a conflict-aware booking.

BookEase is a portfolio-grade React, Express, and MongoDB application for customers, independent service providers, and administrators. The interface now uses the **Night Market Orbit** system: a dark, spatial public experience with layered request, bid, and booking states, depth-based motion, and scroll-led storytelling. The operational product routes preserve the real marketplace workflow behind the visual presentation.

## Product Flow

```text
Customer request → provider proposals → bid selection → availability verification → booking creation → review
```

The product supports three roles. Customers create requests and choose between bids. Providers publish bids and manage availability. Administrators oversee users, providers, bookings, reviews, and contact messages.

## Technology

| Area | Tools |
|---|---|
| Frontend | React 18, Vite, React Router, Tailwind CSS |
| Interaction | Framer Motion, CSS perspective and reduced-motion support |
| Backend | Node.js, Express, Mongoose, JWT, express-validator |
| Database | MongoDB |
| Deployment | Render-compatible production configuration and static GitHub Pages preview |

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

Create `backend/.env` from the following template. Keep all real credentials outside Git.

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookease
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Seed demo data (optional)

```bash
cd backend
npm run seed
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

Vite will display the frontend URL. The Express server uses port `5000` by default.

### Build for production

```bash
cd frontend
npm run build

cd ../backend
npm start
```

In production, Express serves the built frontend alongside the API.

## Structure

```text
backend/
  src/
    controllers/      # Business logic for requests, bids, availability, bookings, and reviews
    models/           # MongoDB models
    routes/           # API routes
    middleware/       # Authentication, role checks, validation, and error handling
frontend/
  src/
    app/              # Role-aware route map
    auth/             # Authentication provider and route guards
    components/       # Shared UI and motion primitives
    layouts/          # Public, customer, provider, and admin shells
    pages/            # Marketplace, customer, provider, admin, and public routes
render.yaml           # Render deployment blueprint
```

## Key Capabilities

| Customer | Provider | Administrator |
|---|---|---|
| Publish service requests | Browse relevant requests | Monitor marketplace activity |
| Compare price, availability, and provider context | Submit and manage competitive bids | Manage users and providers |
| Confirm bids and track bookings | Manage bookings and weekly availability | Review bookings, reviews, and contact messages |
| Rate completed services | Track ratings and service activity | Maintain platform quality |

## Accessibility and Motion

The public marketing surface uses scroll progress, perspective-based card movement, parallax lighting, and responsive hover depth. Visitors who set `prefers-reduced-motion` receive a stable, reduced-motion presentation.

## Contributor

**Yehong Hu (James Hu)**
