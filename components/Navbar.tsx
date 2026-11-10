"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Heart,
  Gift,
  HelpCircle,
  Package,
  Instagram,
} from "lucide-react";
import { MEGA_MENU_DATA } from "@/data/megaMenu";
import { useCart } from "@/context/CartContext";
import { AgeGroup, Category, Gender } from "@/types";

interface NavbarProps {
  onOpenSearch: () => void;
  onSelectCategory?: (category: Category) => void;
  onSelectAgeGroup?: (age: AgeGroup) => void;
  onSelectGender?: (gender: Gender) => void;
  wishlistCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onSelectCategory,
  onSelectAgeGroup,
  onSelectGender,
  wishlistCount = 3,
}) => {
  const { totalCount, setIsCartOpen } = useCart();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<string | null>("Shop by Age");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Detect scroll for subtle shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuItemClick = (item: { filterCategory?: string; filterAge?: string; filterGender?: string }) => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    if (item.filterCategory && onSelectCategory) {
      onSelectCategory(item.filterCategory as Category);
    }
    if (item.filterAge && onSelectAgeGroup) {
      onSelectAgeGroup(item.filterAge as AgeGroup);
    }
    if (item.filterGender && onSelectGender) {
      onSelectGender(item.filterGender as Gender);
    }
    // Scroll to products
    const section = document.getElementById("catalog-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Shop by Age", key: "Shop by Age", color: "hover:text-brand-yellow-hover" },
    { label: "Shop by Gender", key: "Shop by Gender", color: "hover:text-brand-blue" },
    { label: "Toys", key: "Toys", color: "hover:text-brand-mint" },
    { label: "Accessories", key: "Accessories", color: "hover:text-brand-coral" },
    { label: "Sale", key: "Sale", color: "text-brand-coral font-bold hover:text-brand-coral-hover" },
  ];

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-200 border-b ${
        isScrolled ? "border-slate-200 shadow-sm" : "border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20 lg:h-24 py-1 sm:py-2">
          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 -ml-1 sm:-ml-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

          {/* Brand Name Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex items-center gap-1.5 sm:gap-3">
              <img
                src="/logo.png"
                alt="Trendora - Trend That Speaks"
                className="h-8 sm:h-12 lg:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <div className="flex flex-col justify-center select-none">
                <span className="font-logo font-black text-sm sm:text-lg lg:text-xl tracking-[0.04em] leading-none">
                  <span className="text-[#DB0416]">TREND</span>
                  <span className="text-[#FABD1B]">O</span>
                  <span className="text-[#DB0416]">RA</span>
                </span>
                <span className="self-end text-right text-[7px] sm:text-[9px] lg:text-[10px] font-heading font-extrabold uppercase tracking-[0.2em] text-slate-800 mt-[1px] sm:mt-[1.5px] leading-none">
                  kids hub
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isOpen = activeMenu === item.key;
              const isSale = item.key === "Sale";
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.key)}
                >
                  <button
                    onClick={() => setActiveMenu(isOpen ? null : item.key)}
                    className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1 ${
                      isOpen
                        ? "bg-slate-100 text-slate-900"
                        : isSale
                        ? "text-brand-coral bg-brand-coral/10 hover:bg-brand-coral/20"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-slate-900" : "text-slate-400"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 sm:p-2.5 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors relative group"
              aria-label="Search catalog"
              title="Search catalog (Cmd+K)"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform text-slate-600" />
            </button>

            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/trendora_kids_hub/#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2.5 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors relative group"
              aria-label="Follow Trendora Kids Hub on Instagram"
              title="Instagram (@trendora_kids_hub)"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform text-slate-600 group-hover:text-pink-600" />
            </a>

            {/* User Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-1.5 sm:p-2.5 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
                aria-label="User Account"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 sm:mt-3 w-56 sm:w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">emma.parent@trendora.com</p>
                    <span className="inline-block mt-1 text-[11px] font-bold text-brand-mint bg-brand-mint/10 px-2 py-0.5 rounded-full">
                      Kids Club Member (350 pts)
                    </span>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                    >
                      <Package className="w-4 h-4 text-slate-400" />
                      Track Orders
                    </button>
                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                    >
                      <Heart className="w-4 h-4 text-slate-400" />
                      Wishlist ({wishlistCount})
                    </button>
                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                    >
                      <Gift className="w-4 h-4 text-slate-400" />
                      Gift Registry
                    </button>
                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                    >
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                      Size & Fit Help
                    </button>
                  </div>
                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs text-red-500 font-medium hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 sm:p-2.5 rounded-full text-slate-800 hover:bg-brand-yellow/15 transition-all group"
              aria-label={`Shopping bag with ${totalCount} items`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 group-hover:text-slate-900 group-hover:scale-110 transition-transform" />
              {totalCount > 0 && (
                <span className="absolute top-0 right-0 sm:top-1 sm:right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-coral text-white text-[9px] sm:text-[11px] font-bold flex items-center justify-center shadow-md animate-soft-pulse">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {activeMenu && MEGA_MENU_DATA[activeMenu] && (
        <div
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
          className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-slate-200/80 shadow-2xl z-50 transition-all duration-200"
        >
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="grid grid-cols-12 gap-8 items-start">
              {/* Category Columns */}
              <div className="col-span-8 grid grid-cols-3 gap-6">
                {MEGA_MENU_DATA[activeMenu].sections?.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4
                      onClick={() => {
                        if (section.title.includes("Girls") && onSelectGender) {
                          setActiveMenu(null);
                          onSelectGender("Girls");
                        } else if (section.title.includes("Boys") && onSelectGender) {
                          setActiveMenu(null);
                          onSelectGender("Boys");
                        }
                      }}
                      className="text-xs font-bold text-slate-400 uppercase tracking-wider hover:text-slate-900 cursor-pointer transition-colors"
                    >
                      {section.title}
                    </h4>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <button
                            onClick={() => handleMenuItemClick(item)}
                            className="group flex items-center justify-between w-full text-left text-sm text-slate-600 hover:text-slate-900 py-1 transition-colors"
                          >
                            <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5 font-medium">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-mint-light text-brand-mint">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Promo Spotlight Banner in Mega Menu */}
              {MEGA_MENU_DATA[activeMenu].featured && (
                <div className="col-span-4 bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between overflow-hidden relative group">
                  <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 bg-white">
                    <img
                      src={MEGA_MENU_DATA[activeMenu].featured!.imageUrl}
                      alt={MEGA_MENU_DATA[activeMenu].featured!.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-slate-800 shadow-sm">
                        {MEGA_MENU_DATA[activeMenu].featured!.badge}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-slate-900 mb-1">
                      {MEGA_MENU_DATA[activeMenu].featured!.title}
                    </h4>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                      {MEGA_MENU_DATA[activeMenu].featured!.description}
                    </p>
                    <button
                      onClick={() => {
                        setActiveMenu(null);
                        if (activeMenu === "Shop by Gender" && onSelectGender) {
                          onSelectGender("Girls");
                        }
                        const section = document.getElementById("catalog-section");
                        if (section) section.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-coral hover:text-brand-coral-hover transition-colors"
                    >
                      {MEGA_MENU_DATA[activeMenu].featured!.cta}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-14 sm:top-20 bottom-0 z-50 bg-slate-950/60 backdrop-blur-xs flex flex-col justify-start animate-in fade-in duration-200">
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="bg-white w-full max-h-[80vh] overflow-y-auto rounded-b-3xl shadow-2xl p-4 sm:p-6 border-t border-slate-100 animate-in slide-in-from-top-3 duration-200">
            {/* Quick search input */}
            <div className="mb-4 sm:mb-5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 text-xs sm:text-sm font-medium border border-slate-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-400" />
                  Search dresses, toys, sizes...
                </span>
                <span className="text-[10px] sm:text-xs bg-white px-2 py-0.5 rounded text-slate-500 border border-slate-200">
                  Find
                </span>
              </button>
            </div>

            {/* Category tabs */}
            <div className="flex space-x-1.5 sm:space-x-2 border-b border-slate-200 pb-2.5 sm:pb-3 overflow-x-auto no-scrollbar">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setMobileActiveTab(item.key)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                    mobileActiveTab === item.key
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Tab Content */}
            {mobileActiveTab && MEGA_MENU_DATA[mobileActiveTab] && (
              <div className="mt-4 sm:mt-5 space-y-4 sm:space-y-5">
                {MEGA_MENU_DATA[mobileActiveTab].sections?.map((section, idx) => (
                  <div key={idx} className="space-y-1.5 sm:space-y-2">
                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                      {section.title}
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      {section.items.map((item, itemIdx) => (
                        <button
                          key={itemIdx}
                          onClick={() => handleMenuItemClick(item)}
                          className="text-left text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 p-2 sm:p-2.5 rounded-xl transition-colors line-clamp-1"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {MEGA_MENU_DATA[mobileActiveTab].featured && (
                  <div className="bg-brand-lavender/40 p-3 sm:p-4 rounded-2xl flex items-center gap-3 sm:gap-4">
                    <img
                      src={MEGA_MENU_DATA[mobileActiveTab].featured!.imageUrl}
                      alt="Featured"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-heading font-bold text-xs sm:text-sm text-slate-800 truncate">
                        {MEGA_MENU_DATA[mobileActiveTab].featured!.title}
                      </p>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          const section = document.getElementById("catalog-section");
                          if (section) section.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-[11px] sm:text-xs font-bold text-brand-coral mt-1 flex items-center gap-1 hover:underline"
                      >
                        Explore now <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

