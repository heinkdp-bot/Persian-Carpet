# Steenberg Carpets

Online gallery for a Persian carpet dealer. Working store name: **Steenberg Carpets** (temporary — change it in one place).

The catalog and photographs come from the dealer handoff. Prices are **substitute placeholders** until the gallery replaces them.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional; Stripe keys are not required
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

Requires Node.js 20+.

## Edit the store name

Change `store_name` in [`data/catalog.json`](data/catalog.json). The UI reads it through `STORE_NAME` in [`src/lib/config.ts`](src/lib/config.ts). Tagline, price disclaimer, and homepage hero id are in the same JSON file.

## Replace substitute prices

Every product has `price_zar` and `price_note: "SUBSTITUTE — replace with real price"`. Catalog-level flags:

- `price_mode`: `substitute_placeholders`
- `price_disclaimer`: shown under every price (“Indicative price — confirm with the gallery”)

Edit `price_zar` on each product in `data/catalog.json`. No redesign needed. Amounts display in South African Rand (ZAR).

## Types and sizes

Types, type copy, and measurements also live in `data/catalog.json`. OCR on the original photo labels was imperfect: many pieces are typed as `Persian`, and some sizes are missing. Prefer correcting `type`, `length_m`, `width_m`, and `size_label` in that file. Set `featured_in_type` to choose the large carpet at the top of a type page.

## Add more photos

1. Add a web-sized JPEG to `public/carpets/`.
2. Append a product object to `products` in `data/catalog.json`:

```json
{
  "id": "1234",
  "type": "Kashan",
  "length_m": 3.5,
  "width_m": 2.5,
  "size_label": "3.5×2.5 m",
  "price_zar": 75000,
  "price_note": "SUBSTITUTE — replace with real price",
  "currency": "ZAR",
  "image": "images/1234-kashan.jpg",
  "featured_score": 0,
  "featured_in_type": false
}
```

`image` is `images/<filename>` (handoff convention). The site maps that path to `/carpets/<filename>`.

## Stripe Checkout

Leave keys empty for the **demo payment path** (name, email, place demo order, success page). No live keys are included.

To enable Stripe Checkout, set in `.env.local`:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is reserved for a later client-side Stripe.js integration; Checkout Sessions only need `STRIPE_SECRET_KEY`. Restart the dev server after changing env vars.

## Project layout

- `data/catalog.json` — store name, copy, types, products, substitute prices
- `public/carpets/` — product JPEGs
- `src/lib/config.ts` — `STORE_NAME` and other UI constants sourced from the catalog
- `src/app/` — App Router pages (home, type, product, cart, checkout)
- `src/app/api/checkout/route.ts` — Stripe session or demo redirect

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Featured carpets and browse-by-type cards |
| `/type/kashan` | Featured carpet, then all of that type |
| `/carpet/U069` | Photo, type, size (metres), ZAR price, add to cart |
| `/collection` | Full catalog |
| `/cart` | Cart |
| `/checkout` | Stripe or demo checkout |
