"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  return (
    <section id="newsletter">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="newsletter-eyebrow">Stay in the loop</p>
        <h2 className="newsletter-heading">
          New arrivals,
          <br />
          first in your inbox.
        </h2>
        <p className="newsletter-sub">
          Join 6,000+ parents who get early access to drops and exclusive offers.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <motion.button type="submit" whileTap={{ scale: 0.95 }}>
            Subscribe
          </motion.button>
        </form>

        <AnimatePresence>
          {isSubscribed && (
            <motion.p
              className="newsletter-success"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              ✓ You&apos;re in. Welcome to the TRENDORA family.
            </motion.p>
          )}
        </AnimatePresence>

        <p className="newsletter-store-info">
          Opp. NSS School, Alakode • Kids Cloth Hub
        </p>
      </motion.div>
    </section>
  );
}
