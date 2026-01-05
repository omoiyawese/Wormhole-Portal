# WORM (EIP-7503) Community Portal

## Overview

This is an interactive educational portal for the WORM project, built around Ethereum's EIP-7503 (Private Proof-of-Burn using zk-SNARKs). The application features two main sections: an Education tab explaining how WORM works with an interactive burn simulator, and a Mastery Quiz tab with a 10-question multiple-choice quiz that rewards perfect scores with a shareable badge.

The project uses a modern React frontend with Express backend, PostgreSQL database, and follows a full-stack TypeScript monorepo structure.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix primitives)
- **Animations**: Framer Motion for complex transitions and effects
- **Build Tool**: Vite with HMR support

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts`
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Schema Validation**: Zod for request/response validation

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route-level page components
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  routes.ts       # API route handlers
  storage.ts      # Database operations layer
  db.ts           # Database connection
shared/           # Shared types and schemas
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod
```

### Design Patterns
- **Shared Schema**: Database schema and API contracts defined once in `shared/` and used by both frontend and backend
- **Type-Safe API**: Zod schemas for runtime validation with TypeScript inference
- **Storage Abstraction**: `IStorage` interface in `storage.ts` separates database operations from route handlers
- **Component-First UI**: shadcn/ui provides accessible, customizable component primitives

### Theme
- Deep sea dark theme with dark blues/blacks
- Glowing purple accents (primary: `hsl(270 95% 65%)`)
- Electric cyan secondary color
- Custom fonts: Space Grotesk (display), Inter (body), JetBrains Mono (code)

## External Dependencies

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and query building
- **drizzle-kit**: Database migrations (`npm run db:push`)

### Key NPM Packages
- `@tanstack/react-query`: Server state management
- `framer-motion`: Animation library for wormhole effects
- `canvas-confetti`: Celebration effects for perfect quiz scores
- `wouter`: Lightweight client-side routing
- `zod`: Schema validation
- `lucide-react`: Icon library

### Deployment
- Configured for Vercel deployment (`vercel.json`)
- Supports both development (Vite dev server) and production (static build) modes