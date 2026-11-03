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
} from "lucide-react";
import { Product, ColorSwatch } from "@/types";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSizeGuide: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
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
      setSelectedColor(product.colors[0] || null);
      setSelectedSize(product.sizes[0] || "");
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      addToCart(product, selectedColor, selectedSize, quantity);
      onClose();
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col md:flex-row relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 shadow-md backdrop-blur-xs transition-colors"
          aria-label="Close quick view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Images Gallery */}
        <div className="w-full md:w-1/2 p-6 bg-surface-subtle flex flex-col justify-between">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200/60 mb-4 group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-coral text-white shadow-sm">
                {product.badge}
              </span>
            )}
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 hover:bg-white shadow-sm text-slate-400 hover:text-brand-coral transition-colors"
              aria-label="Wishlist item"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? "fill-brand-coral text-brand-coral" : ""
                }`}
              />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-brand-coral scale-105 shadow-xs"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-brand-mint" />
            <span>100% GOTS Certified • Non-Toxic Safety Standard</span>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto space-y-5">
          {/* Category & Age Group badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-2.5 py-1 rounded-full">
              {product.category}
            </span>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {product.ageGroup}
            </span>
          </div>

          {/* Title & Price */}
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-slate-900 leading-snug">
              {product.name}
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-extrabold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-slate-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-brand-coral bg-brand-coral/10 px-2 py-0.5 rounded-full">
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewCount} parent reviews)</span>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>

          {/* Color Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Color:{" "}
                <span className="text-slate-900 font-semibold">{selectedColor?.name}</span>
              </label>
            </div>
            <div className="flex items-center gap-2.5">
              {product.colors.map((color) => {
                const isSelected = selectedColor?.name === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "ring-2 ring-slate-900 ring-offset-2 scale-110"
                        : "hover:scale-105 border border-slate-200"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 ${
                          color.name === "Soft Cream" ? "text-slate-900" : "text-white"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector + Size Guide Link */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Select Size
              </label>
              <button
                onClick={onOpenSizeGuide}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-coral hover:text-brand-coral-hover underline decoration-dotted transition-colors"
              >
                <Ruler className="w-3.5 h-3.5" />
                Visual Sizing Guide
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                      isSelected
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
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-slate-200 rounded-xl bg-surface-subtle p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition-colors font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition-colors font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedColor || !selectedSize}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-brand-yellow hover:bg-brand-yellow-hover text-slate-950 font-heading font-bold text-base shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
              >
                <ShoppingBag className="w-5 h-5 text-slate-950" />
                <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-brand-mint" />
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
