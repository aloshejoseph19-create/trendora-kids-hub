"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  cartCount: number;
  onOpenSearch: () => void;
  onOpenDrawer: () => void;
  isDrawerOpen: boolean;
}

export default function Navbar({
  cartCount,
  onOpenSearch,
  onOpenDrawer,
  isDrawerOpen,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={isScrolled ? "scrolled" : ""}>
      <div className="nav-left-group">
        <a href="#" className="nav-logo">
          TRENDORA
          <span className="nav-logo-sub">Kids Hub</span>
        </a>
      </div>

      <ul className="nav-links">
        <li>
          <a href="#collections">Collections</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#testimonials">Reviews</a>
        </li>
        <li>
          <a href="#enquiry">Contact & Enquiry</a>
        </li>
      </ul>

      <div className="nav-actions">
        {/* Search button */}
        <motion.button
          className="nav-icon"
          onClick={onOpenSearch}
          aria-label="Search"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </motion.button>

        {/* Bag button */}
        <motion.button
          className="nav-icon"
          aria-label="Shopping bag"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <motion.span
            key={cartCount}
            className="cart-badge"
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            {cartCount}
          </motion.span>
        </motion.button>

        {/* Mobile Hamburger */}
        <button
          className={`nav-hamburger ${isDrawerOpen ? "active" : ""}`}
          onClick={onOpenDrawer}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
