"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Star,
  Check,
  ShoppingBag,
  Ruler,
  ShieldCheck,
  Heart,
  Truck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Product, ColorSwatch } from "@/types";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
  product: Product | null;
  activeColor?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenSizeGuide: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  activeColor,
  isOpen,
  onClose,
  onOpenSizeGuide,
  isWishlisted,
  onToggleWishlist,
}) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<ColorSwatch | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (product) {
      const matchColor = activeColor
        ? product.colors.find((c) => c.name === activeColor)
        : null;
      const initial = matchColor || product.colors[0] || null;
      setSelectedColor(initial);
      setSelectedSize(product.sizes[0] || "");
      setQuantity(1);
      if (initial?.image) {
        const imgIdx = product.images.indexOf(initial.image);
        setActiveImageIndex(imgIdx !== -1 ? imgIdx : 0);
      } else {
        setActiveImageIndex(0);
      }
    }
  }, [product, activeColor]);

  // Keyboard navigation to browse images one-by-one with Arrow keys
  useEffect(() => {
    if (!isOpen || !product || product.images.length <= 1) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev + 1) % product.images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    const colorToUse =
      selectedColor ||
      product.colors[0] ||
      { name: "Default", hex: "#000000", tailwindClass: "bg-black" };
    if (selectedSize) {
      addToCart(product, colorToUse, selectedSize, quantity);
      onClose();
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col md:flex-row relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-slate-800 shadow-md backdrop-blur-xs transition-colors"
          aria-label="Close quick view"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Left: Product Images Gallery */}
        <div className="w-full md:w-1/2 p-3 sm:p-6 bg-surface-subtle flex flex-col justify-between max-md:max-h-[36vh] max-md:overflow-y-auto">
          <div className="relative aspect-[4/3] sm:aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-slate-200/60 mb-2 sm:mb-4 group select-none">
            <img
              src={product.images[activeImageIndex] || selectedColor?.image || product.images[0]}
              alt={`${product.name} - view ${activeImageIndex + 1}`}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-brand-coral text-white shadow-sm z-10">
                {product.badge}
              </span>
            )}
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2.5 rounded-full bg-white/90 hover:bg-white shadow-sm text-slate-400 hover:text-brand-coral transition-colors z-10"
              aria-label="Wishlist item"
            >
              <Heart
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  isWishlisted ? "fill-brand-coral text-brand-coral" : ""
                }`}
              />
            </button>

            {/* Prev / Next Buttons to step through glasses one-by-one */}
            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex(
                      (prev) => (prev - 1 + product.images.length) % product.images.length
                    )
                  }
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                  aria-label="Previous glass"
                  title="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev + 1) % product.images.length)
                  }
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                  aria-label="Next glass"
                  title="Next image"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Counter Badge */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-slate-900/75 text-white text-[10px] sm:text-[11px] font-semibold tracking-wide backdrop-blur-xs flex items-center gap-1 shadow-sm">
                  <span>{activeImageIndex + 1} / {product.images.length}</span>
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(idx);
                    const matchingColor = product.colors.find((c) => c.image === img);
                    if (matchingColor) setSelectedColor(matchingColor);
                  }}
                  className={`w-11 h-11 sm:w-16 sm:h-16 shrink-0 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-brand-coral scale-105 shadow-sm"
                      : "border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300"
                  }`}
                  aria-label={`View glass ${idx + 1}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-slate-200/60 flex items-center gap-2 text-[10px] sm:text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-mint shrink-0" />
            <span className="truncate">100% GOTS Certified • Non-Toxic Safety Standard</span>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="w-full md:w-1/2 p-3.5 sm:p-6 md:p-8 overflow-y-auto space-y-3 sm:space-y-5">
          {/* Category & Age Group badge */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
              {product.category}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
              {product.ageGroup}
            </span>
          </div>

          {/* Title & Price */}
          <div>
            <h2 className="font-heading font-extrabold text-lg sm:text-2xl text-slate-900 leading-snug">
              {product.name}
            </h2>
            <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xs sm:text-base text-slate-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-brand-coral bg-brand-coral/10 px-1.5 py-0.5 rounded-full">
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-1.5 mt-1 sm:mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                      }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">{product.rating}</span>
              <span className="text-[11px] sm:text-xs text-slate-400">({product.reviewCount} parent reviews)</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{product.description}</p>

          {/* Color Selector */}
          {product.colors.length > 1 && (
            <div>
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                  Color:{" "}
                  <span className="text-slate-900 font-semibold">{selectedColor?.name}</span>
                </label>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5">
                {product.colors.map((color) => {
                  const isSelected = selectedColor?.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color);
                        if (color.image) {
                          const imgIdx = product.images.indexOf(color.image);
                          if (imgIdx !== -1) {
                            setActiveImageIndex(imgIdx);
                          }
                        }
                      }}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${isSelected
                          ? "ring-2 ring-slate-900 ring-offset-2 scale-110"
                          : "hover:scale-105 border border-slate-200"
                        }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${color.name === "Soft Cream" ? "text-slate-900" : "text-white"
                            }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selector + Size Guide Link */}
          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                Select Size
              </label>
              <button
                onClick={onOpenSizeGuide}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-brand-coral hover:text-brand-coral-hover underline decoration-dotted transition-colors"
              >
                <Ruler className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Visual Sizing Guide
              </button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-1.5 sm:py-2 px-2 sm:px-3 text-xs font-bold rounded-lg sm:rounded-xl border text-center transition-all ${isSelected
                        ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Add to Cart Action */}
          <div className="pt-1 sm:pt-2 space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-slate-200 rounded-xl bg-surface-subtle p-0.5 sm:p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition-colors font-bold text-sm"
                >
                  -
                </button>
                <span className="w-8 sm:w-10 text-center font-bold text-xs sm:text-sm text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition-colors font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                disabled={(product.colors.length > 0 && !selectedColor) || !selectedSize}
                className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-brand-yellow hover:bg-brand-yellow-hover text-slate-950 font-heading font-bold text-xs sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 shrink-0" />
                <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 pt-1.5 sm:pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1 sm:gap-1.5">
                <Truck className="w-3.5 h-3.5 text-brand-mint shrink-0" />
                In stock, ships today
              </span>
              <span>Free 30-day trial & exchanges</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

