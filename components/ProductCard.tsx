"use client";

import React, { useState } from "react";
import { Star, Eye, Heart, Ruler, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  activeColors?: string[];
  onQuickView: (product: Product) => void;
  onOpenSizeGuide: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  activeColors,
  onQuickView,
  onOpenSizeGuide,
  isWishlisted,
  onToggleWishlist,
}) => {
  const { addToCart } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Automatically update selected color when user checks/filters a color
  React.useEffect(() => {
    if (activeColors && activeColors.length > 0) {
      const matchIdx = product.colors.findIndex((c) => activeColors.includes(c.name));
      if (matchIdx !== -1) {
        setSelectedColorIndex(matchIdx);
      }
    }
  }, [activeColors, product.colors]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const currentImage =
    product.colors[selectedColorIndex]?.image ||
    product.images[selectedColorIndex] ||
    product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const color =
      product.colors[selectedColorIndex] ||
      product.colors[0] ||
      { name: "Default", hex: "#000000", tailwindClass: "bg-black" };
    const size = product.sizes[0] || "One Size";
    addToCart(product, color, size, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-3xl p-3 sm:p-3.5 border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
    >
      {/* Top Image Area */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-surface-subtle mb-3.5">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-2xs backdrop-blur-xs ${
                product.badge === "Sale"
                  ? "bg-brand-coral text-white"
                  : product.badge === "Bestseller"
                  ? "bg-brand-yellow text-slate-950"
                  : product.badge === "Organic"
                  ? "bg-brand-mint text-white"
                  : "bg-brand-blue text-white"
              }`}
            >
              {product.badge}
              {product.badge === "Sale" && discountPercent > 0 && ` -${discountPercent}%`}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-slate-400 hover:text-brand-coral shadow-xs transition-all active:scale-90"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "fill-brand-coral text-brand-coral" : ""
            }`}
          />
        </button>

        {/* Quick View Button — always visible on mobile; hover-reveal on desktop */}
        <div
          className={`absolute inset-x-3 bottom-3 z-10 transition-all duration-200 transform ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          } max-md:opacity-100 max-md:translate-y-0 max-md:pointer-events-auto`}
        >
          <button
            onClick={() => onQuickView(product)}
            className="w-full py-2.5 px-3 rounded-xl bg-white/95 hover:bg-white text-slate-900 font-heading font-bold text-xs shadow-lg backdrop-blur-sm flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95 border border-slate-100"
          >
            <Eye className="w-3.5 h-3.5 text-brand-coral" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="space-y-2 px-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold uppercase text-[10px] tracking-wider text-slate-400">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-700 text-xs">{product.rating}</span>
            <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="font-heading font-bold text-sm sm:text-base text-slate-900 hover:text-brand-coral transition-colors line-clamp-1 cursor-pointer"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Prominent Visual Sizing Guide Link */}
        <div className="pt-0.5">
          <button
            onClick={onOpenSizeGuide}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-brand-coral transition-colors group/guide"
          >
            <Ruler className="w-3 h-3 text-brand-coral group-hover/guide:rotate-45 transition-transform" />
            <span className="underline decoration-slate-300 hover:decoration-brand-coral decoration-1 underline-offset-2">
              Visual Sizing Guide
            </span>
          </button>
        </div>

        {/* Color Swatches preview */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full transition-transform ${
                  selectedColorIndex === idx
                    ? "ring-2 ring-slate-800 ring-offset-1 scale-110"
                    : "opacity-80 hover:opacity-100 hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={color.name}
              />
            ))}
            <span className="text-[10px] text-slate-400 font-medium ml-1">
              {product.colors[selectedColorIndex]?.name}
            </span>
          </div>
        )}

        {/* Price & Action Row */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-extrabold text-base sm:text-lg text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-brand-mint font-semibold">
              {product.sizes.length} sizes in stock
            </span>
          </div>

          {/* Quick Add to Bag CTA button */}
          <button
            onClick={handleQuickAdd}
            className={`p-2.5 rounded-xl font-bold transition-all duration-200 active:scale-95 shadow-xs flex items-center justify-center ${
              addedAnimation
                ? "bg-brand-mint text-white"
                : "bg-brand-yellow hover:bg-brand-yellow-hover text-slate-950 hover:shadow-md"
            }`}
            title="Quick add to bag"
            aria-label={`Add ${product.name} to bag`}
          >
            {addedAnimation ? (
              <Check className="w-4 h-4 stroke-[3]" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

