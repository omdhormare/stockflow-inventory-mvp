# StockFlow Inventory Management System

A multi-tenant inventory management MVP built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

## Features
- Organization signup and secure password-based login
- HTTP-only, signed session cookies
- Organization-scoped product CRUD, per-organization SKU uniqueness, optional cost and selling prices
- Inventory dashboard with low-stock summary
- Organization-wide low-stock default setting

## Setup
1. Install Node.js 20+ and PostgreSQL.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` and a random `AUTH_SECRET` (32+ characters).
3. Install dependencies: `npm install`.
4. Generate Prisma client and apply migrations: `npx prisma migrate deploy`.
5. Start the app: `npm run dev`.

## Security notes
All product reads and writes must be scoped by the authenticated user's `organizationId`. Never trust an organization ID supplied by the browser. Passwords are hashed with bcrypt and sessions are stored in signed HTTP-only cookies.

## Assessment status
This repository is an in-progress assessment implementation. Production deployment requires a provisioned PostgreSQL database and authorized hosting credentials.

## Deploy to Vercel (production)

The frontend and backend API routes are part of the same Next.js application, so they deploy together as one Vercel project. PostgreSQL is a separate managed database (for example, Neon or Supabase).

1. Push this repository to GitHub and import it into Vercel.
2. Create a PostgreSQL database with your chosen provider.
3. In Vercel → Project → Settings → Environment Variables, add:
   - `DATABASE_URL`: the production PostgreSQL connection string supplied by the database provider.
   - `AUTH_SECRET`: a cryptographically random secret of at least 32 characters.
4. Ensure the variables are enabled for Production (and Preview if needed).
5. Deploy the project. The build command generates the Prisma Client; apply the checked-in migration to the production database with `npx prisma migrate deploy` before using the app.
6. Redeploy if you change environment variables.

Do not commit `.env` files or paste production secrets into chat. Configure them directly in the hosting/database dashboards. The production URL is only ready to share after signup, login, product create/edit/delete, dashboard totals, and low-stock settings have been tested against the production database.

## Local checks

```bash
npm install
npm run db:generate
npm run typecheck
npm run lint
npm test
npm run build
```

The project has not yet been build-verified in this environment because the npm registry previously failed with a DNS/network error. Run the checks above after dependencies are available.
