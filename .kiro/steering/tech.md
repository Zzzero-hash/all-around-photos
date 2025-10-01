# Technology Stack

## Core Framework
- **Next.js 15** with App Router and Turbopack for fast development builds
- **React 19** with TypeScript for type safety
- **Node.js 18+** runtime requirement

## Database & ORM
- **PostgreSQL** as primary database
- **Prisma** as ORM with schema-first approach
- Database models: Users, Photos, ClientGalleries, Orders, Services

## Styling & UI
- **Tailwind CSS** with custom design system
- **Custom color palette**: Primary (deep blue), Secondary (sky blue), Accent (orange)
- **Typography**: Inter (primary), Playfair Display (accent)
- **Responsive breakpoints**: Mobile (320px+), Tablet (768px+), Desktop (1024px+), Large (1440px+)

## Code Quality
- **ESLint** with Next.js and TypeScript rules
- **Prettier** with Tailwind CSS plugin for consistent formatting
- **TypeScript** with strict mode and additional safety checks

## Key Dependencies
- **@prisma/client** - Database client
- **zod** - Runtime type validation
- **clsx & tailwind-merge** - Conditional styling utilities
- **bcryptjs** - Password hashing (dev dependency)

## Common Commands

### Development
```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build with Turbopack
npm run start        # Start production server
npm run type-check   # TypeScript validation
npm run clean        # Clean build artifacts
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

### Database
```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with initial data
npm run db:studio    # Open Prisma Studio
```

## Path Aliases
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`
- `@/types/*` → `./src/types/*`
- `@/app/*` → `./src/app/*`