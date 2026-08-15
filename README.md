This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


```
stock-analysis
├─ AGENTS.md
├─ app
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ overviews
│  │  ├─ page.module.css
│  │  └─ page.tsx
│  ├─ page.tsx
│  ├─ stocks
│  │  └─ [ticker]
│  │     └─ page.tsx
│  └─ stockviews
│     └─ page.tsx
├─ CLAUDE.md
├─ components
│  ├─ dashboard
│  │  ├─ ChartTooltip.module.css
│  │  ├─ ChartTooltip.tsx
│  │  ├─ MarketMovers.module.css
│  │  ├─ MarketMovers.tsx
│  │  ├─ MarketOverview.module.css
│  │  ├─ MarketOverview.tsx
│  │  ├─ MarketTicker.module.css
│  │  ├─ MarketTicker.tsx
│  │  ├─ StockCandlestickChart.module.css
│  │  ├─ StockCandlestickChart.tsx
│  │  ├─ StockTable.module.css
│  │  ├─ StockTable.tsx
│  │  ├─ StockTableRow.module.css
│  │  ├─ StockTableRow.tsx
│  │  ├─ TooltipStockHistory.module.css
│  │  └─ TooltipStockHistory.tsx
│  ├─ layout
│  │  ├─ Header.module.css
│  │  ├─ Header.tsx
│  │  ├─ SideBar.module.css
│  │  └─ SideBar.tsx
│  └─ stock
│     ├─ StockHeader.module.css
│     └─ StockHeader.tsx
├─ data
│  ├─ mock-history.ts
│  ├─ mock-market-index.ts
│  └─ mock-stocks.ts
├─ eslint.config.mjs
├─ lib
│  └─ api.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ services
│  ├─ dashboard.service.ts
│  ├─ market.service.ts
│  └─ stock.service.ts
├─ tsconfig.json
└─ types
   ├─ DashboardSummary.ts
   ├─ MarketHistory.ts
   ├─ MarketIndexItem.ts
   ├─ PriceHistoryPoint.ts
   ├─ RealtimePrice.ts
   └─ StockDetail.ts

```