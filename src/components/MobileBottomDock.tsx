"use client";

import React from "react";
import { motion } from "framer-motion";

interface MobileBottomDockProps {
  cartCount: number;
  onOpenSearch: () => void;
}

export default function MobileBottomDock({
  cartCount,
  onOpenSearch,
}: MobileBottomDockProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="mobile-bottom-dock">
      <div className="mobile-dock-inner">
        {/* Home / Top */}
        <motion.button
          className="dock-item"
          onClick={() => scrollToSection("hero")}
          whileTap={{ scale: 0.88 }}
          aria-label="Home"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </motion.button>

        {/* Shop / Collections */}
        <motion.button
          className="dock-item"
          onClick={() => scrollToSection("collections")}
          whileTap={{ scale: 0.88 }}
          aria-label="Shop Collections"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          <span>Shop</span>
        </motion.button>

        {/* Search */}
        <motion.button
          className="dock-item dock-item-highlight"
          onClick={onOpenSearch}
          whileTap={{ scale: 0.88 }}
          aria-label="Search"
        >
          <div className="dock-search-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <span>Search</span>
        </motion.button>

        {/* WhatsApp Store Concierge */}
        <motion.a
          href="https://wa.me/919747476002"
          target="_blank"
          rel="noopener noreferrer"
          className="dock-item"
          whileTap={{ scale: 0.88 }}
          aria-label="WhatsApp Store Concierge"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span>Chat</span>
        </motion.a>

        {/* Bag with Badge */}
        <motion.button
          className="dock-item"
          onClick={() => scrollToSection("collections")}
          whileTap={{ scale: 0.88 }}
          aria-label="Shopping Bag"
        >
          <div className="dock-bag-wrap">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                className="dock-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                {cartCount}
              </motion.span>
            )}
          </div>
          <span>Bag</span>
        </motion.button>
      </div>
    </div>
  );
}


