"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Heart, ShieldCheck, Mail, Check, MapPin, MessageCircle, Phone, Instagram, Navigation } from "lucide-react";

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
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-white p-1.5 rounded-2xl shadow-md flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Trendora - Trend That Speaks"
                  className="h-14 sm:h-16 w-auto object-contain rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-logo font-black text-lg sm:text-xl tracking-[0.04em] leading-none">
                  <span className="text-[#DB0416]">TREND</span>
                  <span className="text-[#FABD1B]">O</span>
                  <span className="text-[#DB0416]">RA</span>
                </span>
                <span className="self-end text-right text-[9px] sm:text-[10px] font-heading font-extrabold uppercase tracking-[0.2em] text-white mt-[1.5px] leading-none">
                  kids hub
                </span>
                <p className="text-[11px] text-brand-yellow font-semibold tracking-wide mt-1">
                  Trend That Speaks.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Curated minimal aesthetic childrenswear, organic cotton essentials, and heirloom wooden toys made for barefoot adventure and messy magic.
            </p>

            {/* Store Location & WhatsApp Details */}
            <div className="pt-2 space-y-2.5 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=12.192970996477367,75.46639052329934"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/map flex items-start gap-2 text-xs text-slate-300 hover:text-white transition-colors"
                  title="Store Location (12.192970996477367, 75.46639052329934)"
                >
                  <MapPin className="w-4 h-4 text-brand-coral flex-shrink-0 mt-0.5 group-hover/map:scale-110 group-hover/map:text-brand-yellow transition-all" />
                  <span className="group-hover/map:underline decoration-brand-coral underline-offset-2">
                    Opp. NSS School, Alakode
                  </span>
                </a>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=12.192970996477367,75.46639052329934"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-brand-yellow hover:text-slate-950 text-white text-[11px] font-bold border border-white/20 transition-all group/dir w-fit"
                  title="Navigate with Google Maps directions"
                >
                  <Navigation className="w-3 h-3 group-hover/dir:rotate-45 transition-transform" />
                  <span>Get Directions</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://wa.me/919747476002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-colors group"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp: 9747476002</span>
                </a>

                <a
                  href="https://www.instagram.com/trendora_kids_hub/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 text-pink-400 border border-pink-500/30 text-xs font-bold transition-colors group"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span>@trendora_kids_hub</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-brand-mint font-semibold pt-1">
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

          {/* Column 3: Customer Care & Store */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Support & Store
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://wa.me/919747476002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp: 9747476002
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=12.192970996477367,75.46639052329934"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/loc flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                  title="Get Directions in Google Maps"
                >
                  <span className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-coral flex-shrink-0 mt-0.5 group-hover/loc:scale-110 group-hover/loc:text-brand-yellow transition-all" />
                    <span className="group-hover/loc:underline decoration-brand-coral underline-offset-2">
                      Opp. NSS School, Alakode
                    </span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30 flex items-center gap-1 group-hover/loc:bg-brand-yellow group-hover/loc:text-slate-950 transition-colors">
                    <Navigation className="w-2.5 h-2.5" />
                    Directions ↗
                  </span>
                </a>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Sizing Chart & Fit Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Your Parcel</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Free Returns & Exchanges</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-center sm:text-left">
            <p className="text-slate-400">
              © 2026 <strong className="text-white font-semibold">KIDS HUB</strong> — <span className="text-brand-yellow font-medium">Trend That Speaks.</span>
            </p>
            <span className="hidden sm:inline text-slate-700">•</span>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=12.192970996477367,75.46639052329934"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors hover:underline decoration-brand-coral underline-offset-2 flex items-center gap-1"
              title="Get Directions on Google Maps"
            >
              Opp. NSS School, Alakode • Directions ↗
            </a>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
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

