# TextileHarmony

Online store for home textiles and decor (bedding, curtains, rugs, tableware, glassware and other home goods). Single-page React application with a full catalog, cart, checkout flow and GDPR-compliant legal pages. All content is in English, all prices in EUR.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 7** - build tool and dev server
- **Tailwind CSS 4** - styling (via `@tailwindcss/vite`)
- **React Router 7** - client-side routing with lazy-loaded pages
- **Zustand 5** - state management (cart, cookie consent)
- **Framer Motion** - page transitions and animations
- **lucide-react** - icons

## Getting started

Requires Node.js 20+.

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check and build for production
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Project structure

```
src/
  assets/        # logo and static SVG assets
  components/
    cart/        # cart item, cart summary
    common/      # breadcrumb, scroll-to-top
    home/        # hero, category grid, best sellers, newsletter, etc.
    layout/      # header, footer, cookie banner
    product/     # product card, gallery, filters
    ui/          # reusable primitives (button, modal, input, toast, ...)
  constants/     # site config, routes, promo codes, sort options
  data/          # product and category catalog data
  hooks/         # useScrollAnimation, useMediaQuery
  lib/           # shared animation variants
  pages/         # route-level pages (lazy loaded)
  store/         # Zustand stores (cart, cookie consent)
  types/         # shared TypeScript types
  utils/         # helper functions
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/catalog`, `/catalog/:category` | Catalog with filtering and sorting |
| `/product/:id` | Product detail |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/contact` | Contact |
| `/privacy-policy` | Privacy Policy (GDPR) |
| `/terms-of-use` | Terms of Use |
| `/return-policy` | Return Policy |

## Notable features

- Cart and cookie-consent state persisted via Zustand.
- Cookie banner and privacy / terms / return policy pages for GDPR compliance.
- Free shipping threshold and flat shipping cost, promo codes, and a 14-day return window - all configured in `src/constants/index.ts`.
- Animated route transitions via Framer Motion `AnimatePresence`.

## Configuration

Store-wide settings (currency, shipping, promo codes, social links, registration data) live in `src/constants/index.ts`. Catalog content lives in `src/data/`.
