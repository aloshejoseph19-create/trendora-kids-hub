"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "#hero", label: "Home", sub: "Featured Autumn Collection" },
  { href: "#collections", label: "Collections", sub: "Curated Wardrobe for Kids" },
  { href: "#about", label: "Our Story", sub: "100% Organic Fabrics" },
  { href: "#testimonials", label: "Parent Reviews", sub: "Loved by 6,000+ Families" },
  { href: "#enquiry", label: "Enquiry & Reviews", sub: "Let’s hear from you" },
];

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-drawer"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top category quick tags */}
          <div className="mobile-drawer-top">
            <span className="mobile-drawer-kicker">Navigation & Wardrobe</span>
          </div>

          <motion.ul
            className="mobile-links"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                transition: { staggerChildren: 0.06, delayChildren: 0.1 },
              },
              closed: {
                transition: { staggerChildren: 0.04, staggerDirection: -1 },
              },
            }}
          >
            {navLinks.map((item) => (
              <motion.li
                key={item.href}
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -16 },
                }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              >
                <a href={item.href} onClick={onClose} className="mobile-link-item">
                  <span className="mobile-link-title">{item.label}</span>
                  <span className="mobile-link-sub">{item.sub}</span>
                </a>
              </motion.li>
            ))}
          </motion.ul>

          {/* Quick Concierge & Store Info Card */}
          <motion.div
            className="mobile-drawer-bottom"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            <a
              href="https://wa.me/919747476002"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-drawer-whatsapp-btn"
            >
              <span className="online-dot" />
              <span>Chat with Store on WhatsApp</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>

            <div className="mobile-drawer-location">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Opp. NSS School, Alakode, Kerala</span>
            </div>

            <div className="mobile-drawer-socials">
              <a
                href="https://www.instagram.com/trendora_kids_hub/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a href="#collections" onClick={onClose}>
                Shop All
              </a>
              <a href="#about" onClick={onClose}>
                Story
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

 