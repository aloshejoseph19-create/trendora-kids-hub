"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ColorSwatch, CartItem } from "@/types";

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, color: ColorSwatch, size: string, quantity?: number) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  totalCount: number;
  subtotal: number;
  toastMessage: string | null;
  clearToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "demo-item-1",
      product: {
        id: "prod-1",
        name: "Sunbeam Tiered Cotton Meadow Dress",
        category: "Dresses & Outfits",
        ageGroup: "Toddler (2-4Y)",
        gender: "Girls",
        price: 36.00,
        originalPrice: 48.00,
        rating: 4.9,
        reviewCount: 128,
        images: ["https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80"],
        colors: [{ name: "Sunshine Yellow", hex: "#FFB800", tailwindClass: "bg-[#FFB800]" }],
        sizes: ["3T"],
        description: "Organic airy cotton tiered meadow dress.",
        features: ["100% GOTS Organic Cotton"],
        material: "100% Organic Double Gauze",
        careInstructions: "Machine wash cold",
        inStock: true,
      },
      selectedColor: { name: "Sunshine Yellow", hex: "#FFB800", tailwindClass: "bg-[#FFB800]" },
      selectedSize: "3T",
      quantity: 1,
    },
    {
      id: "demo-item-2",
      product: {
        id: "prod-2",
        name: "Pastel Montessori Arch Rainbow Stacker",
        category: "Toys & Games",
        ageGroup: "Toddler (2-4Y)",
        gender: "Gender Neutral",
        price: 42.00,
        rating: 5.0,
        reviewCount: 312,
        images: ["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80"],
        colors: [{ name: "Mint Green", hex: "#10B981", tailwindClass: "bg-[#10B981]" }],
        sizes: ["One Size"],
        description: "Open-ended play essential handcrafted from solid beechwood.",
        features: ["FSC Beechwood"],
        material: "Beech Wood",
        careInstructions: "Wipe clean",
        inStock: true,
      },
      selectedColor: { name: "Mint Green", hex: "#10B981", tailwindClass: "bg-[#10B981]" },
      selectedSize: "One Size",
      quantity: 1,
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const addToCart = (product: Product, color: ColorSwatch, size: string, quantity = 1) => {
    const itemKey = `${product.id}-${color.name}-${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
        },
      ];
    });

    setToastMessage(`Added "${product.name}" to bag!`);
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const clearToast = () => setToastMessage(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalCount,
        subtotal,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
