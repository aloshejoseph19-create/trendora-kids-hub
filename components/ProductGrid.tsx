"use client";

import React from "react";
import { SlidersHorizontal, ArrowUpDown, X, Sparkles, PackageX } from "lucide-react";
import { Product, FilterState } from "@/types";
import { ProductCard } from "@/components/ProductCard";

interface ProductGridProps {
  products: Product[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  onQuickView: (product: Product) => void;
  onOpenSizeGuide: () => void;
  onToggleMobileFilter: () => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  filters,
  onFilterChange,
  onResetFilters,
  onQuickView,
  onOpenSizeGuide,
  onToggleMobileFilter,
  wishlist,
  onToggleWishlist,
}) => {
  const activeFilterChips = [
    ...(filters.category !== "All"
      ? [{ label: filters.category, remove: () => onFilterChange({ ...filters, category: "All" }) }]
      : []),
    ...(filters.gender !== "All"
      ? [{ label: filters.gender, remove: () => onFilterChange({ ...filters, gender: "All" }) }]
      : []),
    ...filters.ageGroups.map((age) => ({
      label: age,
      remove: () =>
        onFilterChange({
          ...filters,
          ageGroups: filters.ageGroups.filter((a) => a !== age),
        }),
    })),
    ...filters.sizes.map((size) => ({
      label: `Size: ${size}`,
      remove: () =>
        onFilterChange({
          ...filters,
          sizes: filters.sizes.filter((s) => s !== size),
        }),
    })),
    ...filters.colors.map((color) => ({
      label: `Color: ${color}`,
      remove: () =>
        onFilterChange({
          ...filters,
          colors: filters.colors.filter((c) => c !== color),
        }),
    })),
    ...(filters.priceRange[1] < 100
      ? [
          {
            label: `Max $${filters.priceRange[1]}`,
            remove: () => onFilterChange({ ...filters, priceRange: [0, 100] }),
          },
        ]
      : []),
    ...(filters.searchQuery
      ? [
          {
            label: `"${filters.searchQuery}"`,
            remove: () => onFilterChange({ ...filters, searchQuery: "" }),
          },
        ]
      : []),
  ];

  return (
    <section className="space-y-6">
      {/* Grid Controls Topbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Count & Mobile Filter Trigger */}
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <button
            onClick={onToggleMobileFilter}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-coral" />
            <span>Filter</span>
            {activeFilterChips.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-brand-coral text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterChips.length}
              </span>
            )}
          </button>

          <div>
            <p className="font-heading font-bold text-slate-900 text-base">
              Explore Our Collection
            </p>
            <p className="text-xs text-slate-400 font-medium">
              Showing <span className="font-bold text-slate-700">{products.length}</span> verified organic & play-ready products
            </p>
          </div>
        </div>

        {/* Right: Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="sort-select" className="text-xs font-bold text-slate-400 whitespace-nowrap">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  sortBy: e.target.value as FilterState["sortBy"],
                })
              }
              className="appearance-none bg-surface-subtle hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold py-2 pl-3 pr-8 rounded-xl cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-brand-coral transition-colors"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-slate-400">Active filters:</span>
          {activeFilterChips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface-subtle border border-slate-200 text-slate-700"
            >
              {chip.label}
              <button
                onClick={chip.remove}
                className="hover:text-brand-coral transition-colors"
                aria-label={`Remove filter ${chip.label}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
          <button
            onClick={onResetFilters}
            className="text-xs font-bold text-brand-coral hover:underline ml-1"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Products Grid or Empty State */}
      {products.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-md mx-auto my-12 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
            <PackageX className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-900">
            No matching items found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            We couldn&apos;t find any products matching your specific combination of filters. Try removing a few filters or resetting.
          </p>
          <button
            onClick={onResetFilters}
            className="px-6 py-2.5 rounded-xl bg-brand-coral hover:bg-brand-coral-hover text-white text-xs font-bold font-heading shadow-md transition-all"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              activeColors={filters.colors}
              onQuickView={onQuickView}
              onOpenSizeGuide={onOpenSizeGuide}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </section>
  );
};

