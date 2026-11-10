"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { PRODUCTS } from "@/data/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = searchTerm.trim()
    ? PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sizes.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    : [];

  const quickPicks = ["Meadow Dress", "Rainbow Stacker", "Cotton Romper", "UV400 Sunnies", "Merino Beanie"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-20 p-2.5 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-3 sm:p-5 border-b border-slate-100 flex items-center gap-2 sm:gap-3">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dresses, toys, sizes (2T, 4T)..."
            className="w-full text-xs sm:text-base text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-[11px] sm:text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Quick suggestions when input is empty */}
        {!searchTerm.trim() && (
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {quickPicks.map((pick) => (
                  <button
                    key={pick}
                    onClick={() => setSearchTerm(pick)}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-surface-subtle hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors border border-slate-200"
                  >
                    {pick}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Trending Categories
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => setSearchTerm("Dress")}
                  className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-rose-50/50 hover:bg-rose-50 text-left border border-rose-100 transition-colors"
                >
                  <p className="font-heading font-bold text-xs text-rose-900">
                    👗 Dresses & Sets
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-rose-600">Organic flutter dresses</p>
                </button>
                <button
                  onClick={() => setSearchTerm("Montessori")}
                  className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-amber-50/50 hover:bg-amber-50 text-left border border-amber-100 transition-colors"
                >
                  <p className="font-heading font-bold text-xs text-amber-900">
                    🧸 Montessori Toys
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-amber-600">FSC Beechwood toys</p>
                </button>
                <button
                  onClick={() => setSearchTerm("Baby")}
                  className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 text-left border border-emerald-100 transition-colors"
                >
                  <p className="font-heading font-bold text-xs text-emerald-900">
                    👶 Baby Basics
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-600">Ribbed knits & rompers</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {searchTerm.trim() && (
          <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No products found matching &quot;{searchTerm}&quot;
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50 p-2 rounded-2xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover bg-surface-subtle"
                    />
                    <div>
                      <p className="font-heading font-bold text-sm text-slate-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {item.category} • {item.ageGroup}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-extrabold text-sm text-slate-900">
                      ${item.price.toFixed(2)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

