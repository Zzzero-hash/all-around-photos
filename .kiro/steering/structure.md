# Project Structure

## Root Directory Organization

```
├── .env                    # Environment variables (not in git)
├── .env.example           # Environment template
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      # Prisma schema definition
│   └── seed.ts           # Database seeding script
├── scripts/               # Utility scripts
├── public/                # Static assets (images, icons)
└── src/                   # Application source code
```

## Source Code Structure (`src/`)

### App Router (`src/app/`)
- **Route Groups**: Use parentheses for organization without affecting URL structure
  - `(public)/` - Public pages (home, gallery, services)
  - `(protected)/` - Protected pages (client galleries, admin)
  - `api/` - API routes and endpoints
- **Special Files**:
  - `layout.tsx` - Root layout with global providers
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles with Tailwind directives

### Components (`src/components/`)
- **ui/** - Reusable UI components (buttons, inputs, modals)
- **layout/** - Layout components (Header, Footer, Navigation)
- **gallery/** - Gallery-related components (photo grids, viewers)
- **forms/** - Form components with validation

### Library (`src/lib/`)
- **repositories/** - Data access layer for database operations
- **utils.ts** - Common utility functions (cn for className merging)
- **constants.ts** - Application constants and configuration
- **database.ts** - Database connection and utilities
- **prisma.ts** - Prisma client configuration
- **validations.ts** - Zod schemas for data validation

### Types (`src/types/`)
- **index.ts** - Core application types
- **api.ts** - API request/response types
- **database.ts** - Database model types
- **globals.d.ts** - Global TypeScript declarations

## Naming Conventions

### Files & Folders
- **Components**: PascalCase (`PhotoGallery.tsx`)
- **Pages**: lowercase with hyphens (`client-gallery/`)
- **Utilities**: camelCase (`utils.ts`, `dbUtils.ts`)
- **Types**: camelCase with descriptive suffixes (`api.ts`, `database.ts`)

### Code Conventions
- **React Components**: PascalCase with descriptive names
- **Functions**: camelCase with verb-noun pattern (`getUserById`, `createGallery`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`, `DEFAULT_GALLERY_EXPIRY`)
- **Database Models**: PascalCase matching Prisma schema

## Import Organization
1. **External libraries** (react, next, prisma)
2. **Internal utilities** (@/lib/*)
3. **Components** (@/components/*)
4. **Types** (@/types/*)
5. **Relative imports** (./components, ../utils)

## Route Organization Patterns
- **Public routes**: Direct in `(public)/` group
- **Protected routes**: Require authentication in `(protected)/` group
- **API routes**: RESTful structure in `api/` with proper HTTP methods
- **Dynamic routes**: Use `[param]` syntax for dynamic segments