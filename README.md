# Trendora Kids Hub 🌈

A modern, responsive e-commerce layout for **Trendora Kids Hub** — a curated children's clothing, toys, and accessories destination crafted with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **Lucide React**.

## 🎨 Design System & Aesthetic: "Minimal but Vibrant"

- **Base Surfaces & Whitespace**: Generous negative space using stark white (`#FFFFFF`) and delicate pastel gray/slate (`#F8FAFC`) to keep the experience uncluttered, airy, and calming for parents.
- **Vibrant Accent Palette**: Strategic, high-contrast pops of color strictly reserved for action items, CTAs, tags, and interactive states:
  - ☀️ **Sunshine Yellow** (`#FFB800`): Featured badges, primary add-to-bag CTAs.
  - 🪸 **Coral Pink** (`#FF5E62`): Hero "Shop the Collection" CTA, discount tags, active wishlist hearts.
  - 🌿 **Mint Green** (`#10B981`): Organic certifications, stock indicators, sustainability badges.
  - ⚡ **Electric Blue** (`#3B82F6`): Collection tags and navigation highlights.
- **Typography Pairing**:
  - **Headings**: *Fredoka* / *Quicksand* — warm, friendly, rounded sans-serif that radiates childhood charm without feeling childish.
  - **Body & Pricing**: *Plus Jakarta Sans* / *Inter* — crisp, high-legibility sans-serif for product specifications, sizing charts, and prices.
- **Micro-Interactions**:
  - Product Card image hover zoom (`group-hover:scale-105 transition-transform duration-500`).
  - Button hover elevations with gentle drop-shadows and tactile click shrink (`active:scale-95`).
  - Quick View overlay reveal on card hover.
  - Real-time cart slide-out drawer with free shipping progress meter.

---

## 🧩 Core Architecture & Components

| Component | File Path | Highlights |
|---|---|---|
| **Mega Menu Navbar** | `components/Navbar.tsx` | Brand badge, horizontal links (Shop by Age, Shop by Gender, Toys, Accessories, Sale) with rich mega-menu dropdowns, search trigger, user account menu, and dynamic cart badge. |
| **Hero Section** | `components/Hero.tsx` | High-contrast "Shop the Collection" button, playful headline, fast age-picker shortcut chips, and floating organic certification badges. |
| **Trust Indicators** | `components/TrustIndicators.tsx` | Minimalist row highlighting "Organic Cotton", "Non-Toxic Dyes", "Machine Washable", and "Free Express Shipping". |
| **Sticky Sidebar Filter** | `components/SidebarFilter.tsx` | Sticky desktop sidebar & mobile slide-out drawer with toggles for Age Groups (Baby, Toddler, Kids), Size buttons, visual Color Swatches, and price range. |
| **Product Grid** | `components/ProductGrid.tsx` | Clean 3-column responsive grid, active filter chip removal, sort by (Price, Rating, Newest), and empty state handling. |
| **Product Card** | `components/ProductCard.tsx` | Pastel background image container, hover zoom, discount tags, color swatch preview dots, prominent visual sizing guide link, and hover "Quick View" button. |
| **Visual Size Guide** | `components/SizeGuideModal.tsx` | Interactive modal with tabs for Baby, Toddler, Kids, inch/cm unit toggle, measurement table, and pre-washed cotton fit tips. |
| **Quick View Modal** | `components/QuickViewModal.tsx` | Instant inspection modal with image gallery, color swatches, size selection, quantity stepper, and "Add to Bag". |
| **Slide-over Cart Drawer** | `components/CartDrawer.tsx` | Slide-in drawer with item quantity adjustment, interactive promo code (`PLAYTIME20`), free shipping threshold progress, and checkout CTA. |
| **Search Dialog** | `components/SearchModal.tsx` | Instant search modal with live keyboard navigation, popular categories, and instant matching. |

---

## 🚀 Getting Started

### 1. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Production Build
```bash
npm run build
npm start
```

---

## 📦 Project Structure

```
├── app/
│   ├── globals.css         # Custom typography and Tailwind utilities
│   ├── layout.tsx          # Root layout with CartProvider & SEO metadata
│   └── page.tsx            # Main responsive e-commerce page
├── components/
│   ├── AnnouncementBar.tsx # Top dismissible announcement bar
│   ├── CartDrawer.tsx      # Slide-out shopping bag with free shipping bar
│   ├── Footer.tsx          # Play Club newsletter & categorized links
│   ├── Hero.tsx            # Playful hero banner with CTAs
│   ├── Navbar.tsx          # Desktop Mega Menu & mobile navigation
│   ├── ProductCard.tsx     # Clean product card with micro-interactions
│   ├── ProductGrid.tsx     # Responsive grid with sorting & filter pills
│   ├── QuickViewModal.tsx  # Interactive quick view modal
│   ├── SearchModal.tsx     # Instant search dialog
│   ├── SidebarFilter.tsx   # Sticky filter sidebar & swatches
│   ├── SizeGuideModal.tsx  # Visual sizing chart modal with inch/cm toggle
│   └── TrustIndicators.tsx # Minimalist trust row
├── context/
│   └── CartContext.tsx     # React Context for cart state, toasts, & quantities
├── data/
│   ├── megaMenu.ts         # Mega menu structure & featured promos
│   └── products.ts         # Curated organic childrenswear & toy catalog
├── types/
│   └── index.ts            # TypeScript interfaces
└── tailwind.config.js      # Custom theme, playful fonts & vibrant colors
```

