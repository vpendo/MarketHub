# MarketHub Frontend

React + Vite + TypeScript + Tailwind (v4) frontend for the MarketHub e-commerce project.

## Status & Notes

- Custom e-commerce palette (primary blues, secondary greens, accent orange) is defined in `tailwind.config.js` with light/dark mode support. Palette usage is being applied across the app, but we haven’t run contrast audits or documented WCAG 2.1 AA verification; if you want, I can standardize CTA/background/text colors across the UI and add a quick contrast check pass.
- Features scaffolded: auth forms (React Hook Form + Zod), product catalog with search/filter, wishlist, cart/checkout, orders, admin shell. Data wiring expects backend API endpoints.
- State/query: Zustand stores and React Query for data fetching.
- Testing: Vitest + React Testing Library ready; example store test in `src/__tests__/cartStore.test.ts`.

## Scripts

- `pnpm dev` — start dev server
- `pnpm build` — type-check and build
- `pnpm lint` — run ESLint
- `pnpm test` — run Vitest

## Next Steps (frontend)

- Wire to Django/DRF backend (auth via Simple JWT, products, cart, orders, admin).
- Add remaining required extra features (e.g., live order tracking, analytics, etc.).
- Run/document accessibility checks (WCAG 2.1 AA) and finalize palette usage across all components.
