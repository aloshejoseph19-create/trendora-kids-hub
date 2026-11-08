"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, ShieldCheck, Heart, Star } from "lucide-react";
import { AgeGroup, Category } from "@/types";

interface HeroProps {
  onShopNowClick: () => void;
  onSelectAgeGroup: (age: AgeGroup) => void;
  onSelectCategory: (category: Category) => void;
}

const HERO_SLIDES = [
  {
    image: "/hero/hero-1.jpg",
    alt: "Streetwear hoodie and denim set for boys",
    tag: "Trending Streetwear",
    title: "Oversized Vintage Car Pullover",
    price: "$38.00",
  },
  {
    image: "/hero/hero-2.jpg",
    alt: "Striped sunset cardigan and denim shorts for girls",
    tag: "Summer Knits",
    title: "Striped Sunset Button Cardigan",
    price: "$34.00",
  },
  {
    image: "/hero/hero-3.jpg",
    alt: "Classic blue plaid flannel shirt and beanie",
    tag: "Everyday Classics",
    title: "Heritage Check Flannel Shirt",
    price: "$32.00",
  },
  {
    image: "/hero/hero-4.jpg",
    alt: "Joyful play vest and relaxed chinos outfit",
    tag: "Playful Explorer",
    title: "Adventure Utility Vest & Chinos",
    price: "$42.00",
  },
];

export const Hero: React.FC<HeroProps> = ({
  onShopNowClick,
  onSelectAgeGroup,
  onSelectCategory,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 2-second automatic slideshow timeline
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-subtle via-white to-white pt-8 pb-14 sm:pt-12 sm:pb-20">
      {/* Subtle organic decorative background circles (minimalist, low opacity) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-amber-100/40 via-rose-100/30 to-emerald-100/30 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Playful Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Playful pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/15 text-slate-800 text-xs sm:text-sm font-semibold tracking-wide border border-brand-yellow/30 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
              <span>New Spring & Summer Edit 2026</span>
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow-hover ml-0.5" />
            </div>

            {/* Main Playful Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.12]">
              Dressed for <span className="text-brand-coral underline decoration-brand-yellow/60 decoration-wavy decoration-2">Wonder</span>, Built for Pure Everyday Play.
            </h1>

            {/* Subtitle with generous whitespace */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Thoughtfully curated childrenswear, heirloom wooden toys, and baby essentials crafted with <strong className="font-semibold text-slate-800">100% GOTS organic cotton</strong> and baby-safe non-toxic dyes.
            </p>

            {/* Call-to-Action Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onShopNowClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-brand-coral hover:bg-brand-coral-hover text-white font-heading font-bold text-base sm:text-lg shadow-lg hover:shadow-coral-200 transition-all duration-200 active:scale-95 group"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </button>

              <button
                onClick={() => onSelectCategory("Toys & Games")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-heading font-semibold text-base border-2 border-slate-200/80 hover:border-slate-300 transition-all duration-200"
              >
                <span>Montessori Toys</span>
                <span className="text-xs bg-brand-mint/15 text-brand-mint font-bold px-2 py-0.5 rounded-full">
                  FSC Wood
                </span>
              </button>
            </div>

            {/* Quick age filter shortcut chips */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                Fast Pick:
              </span>
              <button
                onClick={() => onSelectAgeGroup("Baby (0-24M)")}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 hover:border-brand-coral hover:text-brand-coral transition-colors shadow-2xs"
              >
                👶 Baby (0-24M)
              </button>
              <button
                onClick={() => onSelectAgeGroup("Toddler (2-4Y)")}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 hover:border-brand-yellow-hover hover:text-brand-yellow-hover transition-colors shadow-2xs"
              >
                🧒 Toddler (2-4Y)
              </button>
              <button
                onClick={() => onSelectAgeGroup("Kids (5-12Y)")}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 hover:border-brand-blue hover:text-brand-blue transition-colors shadow-2xs"
              >
                🎒 Kids (5-12Y)
              </button>
            </div>

            {/* Parent social proof rating */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-500">
              <div className="flex -space-x-1.5">
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Customer"
                />
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-slate-700">4.9 / 5</span>
                <span>(3,400+ Happy Families)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Visual Showcase with Micro-interactions */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Lifestyle Image Card Slideshow (2s timeline) */}
              <div
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="relative z-10 rounded-3xl overflow-hidden bg-white shadow-2xl border-4 border-white aspect-[4/5] sm:aspect-[3/4] group"
              >
                {/* Images Layer */}
                {HERO_SLIDES.map((slide, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
                          isActive ? "scale-100" : "scale-105"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  );
                })}

                {/* Floating On-Image Tag */}
                <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between text-white backdrop-blur-md bg-white/20 p-3 rounded-2xl border border-white/30 transition-all duration-300">
                  <div className="min-w-0 pr-2">
                    <p className="text-[10px] uppercase tracking-wider text-slate-100 font-bold truncate">
                      {HERO_SLIDES[currentSlide].tag}
                    </p>
                    <p className="font-heading font-bold text-sm text-white truncate">
                      {HERO_SLIDES[currentSlide].title}
                    </p>
                  </div>
                  <span className="font-bold text-brand-yellow text-base flex-shrink-0">
                    {HERO_SLIDES[currentSlide].price}
                  </span>
                </div>

                {/* Slideshow Progress / Pagination Dots */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/35 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20">
                  {HERO_SLIDES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-6 bg-brand-yellow shadow-xs"
                          : "w-1.5 bg-white/60 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Badge 1 (Top Right): Machine Washable guarantee */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl bg-brand-mint/20 text-brand-mint flex items-center justify-center font-bold">
                  🌱
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-400">Pure Quality</p>
                  <p className="text-xs font-bold text-slate-800">100% GOTS Cotton</p>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Left): Non-toxic & Safe */}
              <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/20 text-brand-yellow-hover flex items-center justify-center font-bold">
                  ✨
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-400">Baby Safe</p>
                  <p className="text-xs font-bold text-slate-800">Zero Toxic Chemicals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

