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
      className="group bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
    >
      {/* Top Image Area */}
      <div
        className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-surface-subtle mb-2 sm:mb-3.5 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold uppercase tracking-wider shadow-2xs backdrop-blur-xs ${
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
          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-slate-400 hover:text-brand-coral shadow-xs transition-all active:scale-90"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              isWishlisted ? "fill-brand-coral text-brand-coral" : ""
            }`}
          />
        </button>

        {/* Quick View Button — sleek glass pill on mobile, hover-reveal on desktop */}
        <div
          className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 z-10 transition-all duration-200 transform opacity-90 sm:opacity-0 sm:translate-y-2 sm:pointer-events-none sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:group-hover:pointer-events-auto"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-white/95 hover:bg-white text-slate-900 font-heading font-bold text-[10px] sm:text-xs shadow-md backdrop-blur-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all hover:scale-[1.02] active:scale-95 border border-slate-100/80"
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-coral shrink-0" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="space-y-1 sm:space-y-1.5 px-0.5 sm:px-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-slate-400">
          <span className="font-semibold uppercase text-[9px] sm:text-[10px] tracking-wider text-slate-400 truncate max-w-[85px] sm:max-w-none">
            {product.category}
          </span>
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-700 text-[10px] sm:text-xs">{product.rating}</span>
            <span className="text-[9px] sm:text-[11px] text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="font-heading font-bold text-xs sm:text-sm md:text-base text-slate-900 hover:text-brand-coral transition-colors line-clamp-1 cursor-pointer leading-tight sm:leading-normal"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Prominent Visual Sizing Guide Link */}
        <div className="pt-0.5">
          <button
            onClick={onOpenSizeGuide}
            className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-500 hover:text-brand-coral transition-colors group/guide"
          >
            <Ruler className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-coral group-hover/guide:rotate-45 transition-transform shrink-0" />
            <span className="underline decoration-slate-300 hover:decoration-brand-coral decoration-1 underline-offset-2 truncate">
              Visual Sizing Guide
            </span>
          </button>
        </div>

        {/* Color Swatches preview */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1 sm:gap-1.5 pt-0.5">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-transform shrink-0 ${
                  selectedColorIndex === idx
                    ? "ring-2 ring-slate-800 ring-offset-1 scale-110"
                    : "opacity-80 hover:opacity-100 hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={color.name}
              />
            ))}
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium ml-0.5 sm:ml-1 truncate max-w-[70px] sm:max-w-none">
              {product.colors[selectedColorIndex]?.name}
            </span>
          </div>
        )}

        {/* Price & Action Row */}
        <div className="pt-1.5 sm:pt-2 flex items-center justify-between border-t border-slate-100 gap-1">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
              <span className="font-heading font-extrabold text-sm sm:text-base lg:text-lg text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-brand-mint font-semibold block leading-none mt-0.5">
              {product.sizes.length} sizes
            </span>
          </div>

          {/* Quick Add to Bag CTA button */}
          <button
            onClick={handleQuickAdd}
            className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl font-bold transition-all duration-200 active:scale-95 shadow-2xs flex items-center justify-center shrink-0 ${
              addedAnimation
                ? "bg-brand-mint text-white"
                : "bg-brand-yellow hover:bg-brand-yellow-hover text-slate-950 hover:shadow-md"
            }`}
            title="Quick add to bag"
            aria-label={`Add ${product.name} to bag`}
          >
            {addedAnimation ? (
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

