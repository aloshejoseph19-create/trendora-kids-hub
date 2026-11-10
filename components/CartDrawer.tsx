"use client";

import React, { useState } from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalCount,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(
    null
  );
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 50.0;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = (freeShippingThreshold - subtotal).toFixed(2);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (promoCode.trim().toUpperCase() === "PLAYTIME20") {
      setAppliedPromo({ code: "PLAYTIME20", discountPercent: 20 });
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code. Try PLAYTIME20");
    }
  };

  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 5.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <aside aria-label="Shopping Bag" className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-3.5 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-surface-subtle">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-coral/10 text-brand-coral flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">
                  Your Play Bag
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                  {totalCount} {totalCount === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-3.5 sm:px-5 py-2.5 sm:py-3.5 bg-brand-lavender/30 border-b border-purple-100">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-slate-700 text-[11px] sm:text-xs">
                <Truck className="w-3.5 h-3.5 text-brand-mint shrink-0" />
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-brand-mint font-bold">
                    You unlocked FREE Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-brand-coral font-bold">${amountNeeded}</strong> for Free Shipping
                  </span>
                )}
              </span>
              <span className="text-slate-500 font-bold text-xs">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 sm:h-2 bg-purple-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-yellow via-brand-coral to-brand-mint transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 sm:space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h4 className="font-heading font-bold text-base sm:text-lg text-slate-800">
                  Your bag is empty
                </h4>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Discover colorful organic dresses, handcrafted wooden toys, and baby essentials designed for joyful play.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-brand-coral text-white font-heading font-bold text-xs shadow-md hover:bg-brand-coral-hover transition-colors"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-3 sm:py-4 flex gap-3 sm:gap-4 items-start group">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover bg-surface-subtle flex-shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1.5">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-300 hover:text-red-500 p-0.5 sm:p-1 transition-colors shrink-0"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    {/* Color & Size Specs */}
                    <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-slate-500">
                      {item.selectedColor?.name && item.selectedColor.name !== "Default" && (
                        <>
                          <span className="flex items-center gap-1 font-medium truncate">
                            <span
                              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-slate-200 shrink-0"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span className="truncate max-w-[65px] sm:max-w-none">{item.selectedColor.name}</span>
                          </span>
                          <span>•</span>
                        </>
                      )}
                      <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] sm:text-xs">
                        {item.selectedSize}
                      </span>
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between mt-2 sm:mt-3">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-surface-subtle p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-slate-600 hover:bg-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </button>
                        <span className="w-6 sm:w-7 text-center font-bold text-xs text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-slate-600 hover:bg-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </button>
                      </div>

                      <span className="font-heading font-extrabold text-xs sm:text-sm text-slate-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-3.5 sm:p-5 border-t border-slate-100 bg-surface-subtle/80 space-y-3 sm:space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo code (PLAYTIME20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-xs rounded-xl py-2 pl-8 pr-2 sm:pr-3 uppercase font-mono tracking-wider focus:outline-hidden focus:ring-2 focus:ring-brand-yellow"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 sm:px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-heading rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-[10px] sm:text-[11px] text-brand-mint font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Code {appliedPromo.code} applied (20% off)
                  </p>
                )}
                {promoError && (
                  <p className="text-[10px] sm:text-[11px] text-red-500 font-medium">{promoError}</p>
                )}
              </form>

              {/* Totals Breakdown */}
              <div className="space-y-1 sm:space-y-1.5 text-xs text-slate-600 pt-0.5 sm:pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-brand-mint font-semibold">
                    <span>Discount ({appliedPromo.discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-brand-mint font-bold uppercase text-[10px]">
                        FREE
                      </span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-heading font-extrabold text-slate-900 pt-1.5 sm:pt-2 border-t border-slate-200">
                  <span>Estimated Total</span>
                  <span className="text-brand-coral">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <button
                onClick={() => {
                  alert(
                    `Thank you for shopping at Trendora Kids Hub!\nYour order total is $${finalTotal.toFixed(
                      2
                    )}. Proceeding to secure payment...`
                  );
                }}
                className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-brand-coral hover:bg-brand-coral-hover text-white font-heading font-bold text-sm sm:text-base shadow-lg shadow-coral-200/50 flex items-center justify-center gap-2 transition-all active:scale-95 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>256-Bit SSL Encrypted • 30-Day Money Back</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

