"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="search-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            className="search-close"
            onClick={onClose}
            aria-label="Close search"
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
          <motion.div
            className="search-box"
            initial={{ y: 35, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          >
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search collections..."
              onKeyDown={(e) => {
                if (e.key === "Escape") onClose();
              }}
            />
            <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--grey-mid)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Press ESC to close • Try &ldquo;Coats&rdquo;, &ldquo;Dresses&rdquo;, &ldquo;Knitwear&rdquo;
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
