"use client";

import React from "react";

const tickerItems = [
  "100% GOTS Certified Organic Cotton",
  "Free Shipping Above ₹999",
  "Gentle on Sensitive Skin",
  "Designed in Kerala • Loved Nationwide",
  "Zero Toxic Dyes",
  "Machine Wash Safe 40°C",
  "Ethically Made",
];

export default function MarqueeTicker() {
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-track">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <div className="ticker-item" key={index}>
            <span>{item}</span>
            <span className="ticker-star">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
