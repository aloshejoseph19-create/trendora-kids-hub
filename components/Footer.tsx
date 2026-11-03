"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Heart, ShieldCheck, Mail, Check } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Callout Card */}
        <div className="bg-gradient-to-r from-brand-coral via-rose-500 to-amber-500 rounded-3xl p-8 sm:p-10 mb-16 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Join the Play Club
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Get 15% off + Free Printable Coloring Pages every month!
            </h3>
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
              Be the first to hear about organic fabric drops, seasonal sales, and pediatric play tips delivered right to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md">
              {isSubscribed ? (
                <div className="bg-white text-emerald-800 px-4 py-3 rounded-2xl flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Welcome to the Club! Check your inbox for your 15% code.
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white px-4 py-3.5 rounded-2xl text-slate-800 text-xs sm:text-sm placeholder-slate-400 focus:outline-hidden font-medium"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-heading font-bold text-xs sm:text-sm shadow-md transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Decorative playful circles */}
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full bg-white/10 blur-xl pointer-events-none" />
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-coral via-brand-yellow to-brand-mint flex items-center justify-center text-white font-heading font-extrabold text-lg shadow-md">
                T
              </span>
              <span className="font-heading font-bold text-xl text-white tracking-tight">
                Trendora <span className="text-brand-yellow">Kids Hub</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Curated minimal aesthetic childrenswear, organic cotton essentials, and heirloom wooden toys made for barefoot adventure and messy magic.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-mint font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>GOTS Organic Certified • ASTM Toy Safe</span>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Baby (0-24 Months)</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Toddler (2-4 Years)</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Kids (5-12 Years)</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Wooden Toys & Games</a></li>
              <li><a href="#catalog-section" className="hover:text-brand-coral transition-colors font-semibold">Sale & Clearance</a></li>
            </ul>
          </div>

          {/* Column 2: Our Standards */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Standards
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">100% GOTS Cotton</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Non-Toxic Pigments</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FSC Sustainable Wood</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ethical Supply Chain</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pre-Washed Guarantee</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Sizing Chart & Fit Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Your Parcel</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Free Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Registry</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Our Stylists</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Trendora Kids Hub Inc. Built with love for curious explorers.</p>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-slate-800 rounded font-mono text-[10px] text-slate-300">
              Apple Pay
            </span>
            <span className="px-2 py-1 bg-slate-800 rounded font-mono text-[10px] text-slate-300">
              Google Pay
            </span>
            <span className="px-2 py-1 bg-slate-800 rounded font-mono text-[10px] text-slate-300">
              Visa / MC
            </span>
            <span className="px-2 py-1 bg-slate-800 rounded font-mono text-[10px] text-slate-300">
              PayPal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
