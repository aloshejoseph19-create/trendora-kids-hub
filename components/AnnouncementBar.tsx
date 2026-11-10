"use client";

import React, { useState } from "react";
import { Sparkles, X, ChevronRight } from "lucide-react";

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Special Offers" className="bg-slate-900 text-white text-[11px] sm:text-xs md:text-sm font-medium py-1.5 sm:py-2.5 px-3 sm:px-4 relative z-50 transition-all border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 text-center flex-wrap leading-tight sm:leading-normal">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full bg-brand-coral text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase animate-soft-pulse shrink-0">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Special
          </span>
          <span className="text-slate-200">
            Spring Smiles Sale: Get <strong className="text-brand-yellow font-bold">20% OFF</strong> your first order with code:
          </span>
          <code className="bg-white/10 hover:bg-white/20 text-white font-mono px-1.5 py-0.5 rounded text-[11px] sm:text-xs font-bold border border-white/20 transition-colors cursor-pointer shrink-0" title="Click to copy">
            PLAYTIME20
          </code>
          <span className="hidden sm:inline text-slate-400">| Free shipping on orders over $50</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white p-1 rounded-full transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </aside>
  );
};

