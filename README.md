DeFi Yield Dashboard

#### Video Demo:

#### Description

A fast, responsive Next.js app for exploring top DeFi pools by TVL & APY.  
Built with Next.js 15, Tailwind CSS, shadcn/ui, recharts and the DefiLlama API.

---

## Features

- 📊 **Live Data** — Fetches real-time pool metrics (TVL, APY, base vs. reward breakdown)
- 🔍 **Search & Filter** — Quickly find by symbol, project or chain; advanced pop-over filters
- 🔄 **Infinite Scroll** — Lazy loads more pools as you scroll
- 📈 **Interactive Charts** — Dual-axis TVL & APY history with tooltips
- 🌓 **Dark/Light Themes** — System-aware toggle via `next-themes`
- 📥 **Export CSV** — Download the currently displayed data
- 🔗 **Pool Detail Pages** — Deep dive into each pool’s historical performance

---

## Motivation & Goals

When jumping between multiple DeFi aggregators, we often lose sight of key metrics like TVL shifts, split APY (base vs. reward), and protocol-by-protocol comparisons. This project aims to:

- **Centralize** top yield-bearing pools in a single dashboard
- **Empower** users to search/filter by symbol, project, and chain
- **Visualize** historical trends via dual-axis interactive charts
- **Streamline** export of on-screen data for further analysis

By focusing on clarity and performance, we can spot emerging high-yield opportunities while maintaining a clean, user-friendly interface.

---

## Architecture & File Structure

/src
├─ /app
│ ├─ layout.tsx # Root layout: theme provider, global header
│ └─ page.tsx # Home page: fetches pool list + spawns <PoolsShell>
├─ /components
│ ├─ DashboardHeader.tsx # Title, description, theme toggle, “Live Data” badge
│ ├─ PoolsShell.tsx # Client wrapper: SearchBar + Filter/Export buttons + PoolTable
│ ├─ SearchBar.tsx # Controlled search input with Lucide icon
│ ├─ PoolTable.tsx # Client component: table of pools, expandable rows
│ ├─ PoolDetail.tsx # Server component: pool metadata + deep dive
│ ├─ PoolCharts.tsx # Client component: recharts dual-axis TVL & APY lines
│ └─ ui/… # shadcn/ui primitives (Table, Tooltip, Button, etc.)
├─ /lib
│ ├─ getDefiLlamaPools.ts # Fetch list of all pools from DefiLlama
│ ├─ getDefiLlamaPoolById.ts # Fetch details for one pool by ID
│ ├─ getDefiLlamaPoolChart.ts # Fetch historical timeseries for a pool
│ └─ utils.ts # Formatting helpers: currency, dates, abbreviations
├─ globals.css # Tailwind imports + global resets
└─ tsconfig.json # Path aliases, strict TypeScript settings

## Key Components & Pages

### `DashboardHeader.tsx`

Renders the dashboard title & subtitle, a theme toggle (light/dark via `next-themes`), and a “Live Data” indicator. Kept as a **server** component to minimize bundle size.

### `PoolsShell.tsx`

A **client** component that maintains search & filter state. Hosts:

- **SearchBar** (controlled input)
- **Filter** & **Export** buttons (shadcn/ui `Button`, Lucide icons)
- **PoolTable** with infinite scroll

### `PoolTable.tsx`

Renders all pools in a Tailwind-styled table. Each row can expand to show:

- Pool logo placeholder
- Chain badge (custom `getChainColor` mapping)
- APY base/reward breakdown via hover **Tooltip**
- Trend arrow (1-day APY direction)

### `PoolDetail.tsx` & `PoolCharts.tsx`

When a user clicks a pool, Next.js dynamic routing (`/pool/[id]`) loads server-fetched metadata alongside a **client** chart. Charts use Recharts with dual Y-axes:

- Left axis for TVL in billions (formatted with `utils.formatCurrency`)
- Right axis for APY percent

---

## Design Decisions

- **Next.js 15 App Router**: Enables hybrid server-client components. We load only the minimal UI interactivity pieces on the client.
- **Tailwind CSS & shadcn/ui**: Rapid styling with consistent dark/light theming. Custom theme tokens (in `tailwind.config.ts`) ensure brand-able colors.
- **Lucide for icons**: Lightweight, unopinionated icons; we combine with shadcn/ui primitives seamlessly.
- **DefiLlama API**: Chosen for its comprehensive coverage, up-to-date pool data, and straightforward REST endpoints.
- **Recharts**: Stable, declarative React chart library; easy dual-axis support and tooltip customization.
- **Infinite Scroll**: Simplifies user exploration vs. page-by-page pagination. Could swap in virtualization later for performance on tens of thousands of rows.

---

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

# practice-1
