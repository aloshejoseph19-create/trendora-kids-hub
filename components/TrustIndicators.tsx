"use client";

import React from "react";
import { Sparkles, Leaf, Shield, RefreshCw, Truck, Droplets } from "lucide-react";

export const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: Leaf,
      title: "100% Organic Cotton",
      subtitle: "GOTS & OEKO-TEX Standard 100 certified gentle fibers",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      icon: Droplets,
      title: "Non-Toxic Dyes",
      subtitle: "Water-based & skin-safe pigments free from heavy metals",
      badgeColor: "bg-sky-50 text-sky-600 border-sky-100",
    },
    {
      icon: RefreshCw,
      title: "Machine Washable",
      subtitle: "Engineered for real life, mud stains, and 50+ wash cycles",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      icon: Truck,
      title: "Free Express Shipping",
      subtitle: "Fast 2-4 business day dispatch on all orders over $50",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100",
    },
  ];

  return (
    <section className="border-y border-slate-100 bg-surface-subtle/60 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {indicators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100/80 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border ${item.badgeColor}`}
                >
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

