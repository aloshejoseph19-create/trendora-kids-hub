"use client";

import React, { useState, useMemo } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustIndicators } from "@/components/TrustIndicators";
import { SidebarFilter } from "@/components/SidebarFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { QuickViewModal } from "@/components/QuickViewModal";
import { SizeGuideModal } from "@/components/SizeGuideModal";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";
import { Footer } from "@/components/Footer";
import { PRODUCTS } from "@/data/products";
import { Product, FilterState, AgeGroup, Category, Gender } from "@/types";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, X } from "lucide-react";

export default function Home() {
  const { toastMessage, clearToast } = useCart();

  // Filter State
  const initialFilters: FilterState = {
    searchQuery: "",
    category: "All",
    ageGroups: [],
    gender: "All",
    sizes: [],
    colors: [],
    priceRange: [0, 100],
    sortBy: "featured",
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(["prod-1", "prod-8"]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Scroll smoothly to catalog
  const scrollToCatalog = () => {
    const el = document.getElementById("catalog-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectCategory = (cat: Category) => {
    setFilters((prev) => ({ ...prev, category: cat }));
    scrollToCatalog();
  };

  const handleSelectAgeGroup = (age: AgeGroup) => {
    setFilters((prev) => ({
      ...prev,
      ageGroups: prev.ageGroups.includes(age) ? prev.ageGroups : [...prev.ageGroups, age],
    }));
    scrollToCatalog();
  };

  const handleSelectGender = (gender: Gender) => {
    setFilters((prev) => ({ ...prev, gender }));
    scrollToCatalog();
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }

      // 2. Category
      if (filters.category !== "All" && product.category !== filters.category) {
        return false;
      }

      // 3. Age Group
      if (
        filters.ageGroups.length > 0 &&
        !filters.ageGroups.includes(product.ageGroup)
      ) {
        return false;
      }

      // 4. Gender
      if (filters.gender !== "All") {
        if (filters.gender === "Gender Neutral") {
          if (product.gender !== "Gender Neutral") return false;
        } else if (
          product.gender !== filters.gender &&
          product.gender !== "Gender Neutral"
        ) {
          return false;
        }
      }

      // 5. Sizes
      if (filters.sizes.length > 0) {
        const hasSize = product.sizes.some((s) => filters.sizes.includes(s));
        if (!hasSize) return false;
      }

      // 6. Colors
      if (filters.colors.length > 0) {
        const hasColor = product.colors.some((c) => filters.colors.includes(c.name));
        if (!hasColor) return false;
      }

      // 7. Price
      if (product.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "price-asc") return a.price - b.price;
      if (filters.sortBy === "price-desc") return b.price - a.price;
      if (filters.sortBy === "rating") return b.rating - a.rating;
      if (filters.sortBy === "newest") {
        if (a.badge === "New") return -1;
        if (b.badge === "New") return 1;
        return 0;
      }
      return 0; // featured default
    });
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Announcement Banner */}
      <AnnouncementBar />

      {/* 2. Navigation Bar (Mega Menu structure) */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={handleSelectCategory}
        onSelectAgeGroup={handleSelectAgeGroup}
        onSelectGender={handleSelectGender}
        wishlistCount={wishlist.length}
      />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero
          onShopNowClick={scrollToCatalog}
          onSelectAgeGroup={handleSelectAgeGroup}
          onSelectCategory={handleSelectCategory}
        />

        {/* 4. Trust & Checkout Indicators */}
        <TrustIndicators />

        {/* 5. Main Catalog Section with Sidebar Filter & Product Grid */}
        <section id="catalog-section" className="py-12 lg:py-16 bg-surface-subtle/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral bg-brand-coral/10 px-3 py-1 rounded-full">
                Playful Kids Collection
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2">
                Pure Comfort for Active Days
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Browse our sustainably sourced double gauze dresses, organic knitwear, and non-toxic wooden toys designed to outlast the wildest playtime.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Desktop Sticky Left-Sidebar Filter */}
              <div className="hidden lg:block lg:col-span-3">
                <SidebarFilter
                  filters={filters}
                  onFilterChange={setFilters}
                  onResetFilters={handleResetFilters}
                  totalFilteredCount={filteredProducts.length}
                />
              </div>

              {/* Product Grid Area */}
              <div className="lg:col-span-9">
                <ProductGrid
                  products={filteredProducts}
                  filters={filters}
                  onFilterChange={setFilters}
                  onResetFilters={handleResetFilters}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
                  onToggleMobileFilter={() => setMobileFilterOpen(true)}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <Footer />

      {/* Mobile Filter Sheet / Modal */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            <aside aria-label="Filters" className="w-screen max-w-xs bg-white shadow-2xl flex flex-col justify-between overflow-y-auto p-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Filter Catalog
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4">
                <SidebarFilter
                  filters={filters}
                  onFilterChange={setFilters}
                  onResetFilters={handleResetFilters}
                  totalFilteredCount={filteredProducts.length}
                />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-heading font-bold text-sm shadow-md"
                >
                  View {filteredProducts.length} Results
                </button>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => {
          setQuickViewProduct(null);
          setIsSizeGuideOpen(true);
        }}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={toggleWishlist}
      />

      {/* Visual Sizing Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-brand-mint flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={clearToast}
            className="p-1 text-slate-400 hover:text-white transition-colors ml-1"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
