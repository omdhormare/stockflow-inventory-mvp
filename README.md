# StockFlow — Inventory Management MVP

A multi-tenant inventory management application built with Next.js, TypeScript, Prisma, and PostgreSQL.

## Features

- Organization-based signup and login
- Secure HTTP-only JWT session cookie
- Product create, read, update, and delete
- Search products by name or SKU
- Dashboard inventory summary and low-stock count
- Organization-level default low-stock threshold
- Per-product low-stock threshold
- PostgreSQL schema and Prisma migration

## Tech stack

- Next.js 15 / React / TypeScript
- Tailwind CSS 4
- PostgreSQL and Prisma ORM
- Zod validation
- bcryptjs password hashing
- jose JWT signing and verification
- Vitest validation tests

## Local setup

1. Install Node.js 20 or later and PostgreSQL.
2. Copy `.env.example` to `.env`.
3. Set `DATABASE_URL` to your PostgreSQL connection string.
4. Set `AUTH_SECRET` to a random secret with at least 32 characters.
5. Install dependencies: `npm install`
6. Generate Prisma Client: `npm run db:generate`
7. Apply migrations: `npm run db:migrate`
8. Run checks: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`
9. Start the app: `npm run dev`

## Production deployment (Vercel)

1. Import this GitHub repository into Vercel.
2. Provision a PostgreSQL database (for example, Neon or Supabase).
3. Add `DATABASE_URL` and `AUTH_SECRET` to Vercel Project Settings → Environment Variables for Production (and Preview if required). Never commit real secrets.
4. Ensure the production database migration is applied with `npx prisma migrate deploy` against the production `DATABASE_URL`.
5. Deploy or redeploy the project, then verify signup, login, product CRUD, search, dashboard, and settings.

The application uses Next.js route handlers for backend APIs; it is deployed together with the frontend as one Next.js project.

## Environment variables

See `.env.example`. Do not commit `.env` or production credentials.
