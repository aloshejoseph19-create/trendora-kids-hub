"use client";

import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="footer-brand-wrap">
        <a className="footer-logo" href="#">
          TRENDORA
        </a>
        <p className="footer-address">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Opp. NSS School, Alakode
        </p>
      </div>

      <ul className="footer-links">
        <li>
          <a
            href="https://www.instagram.com/trendora_kids_hub/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </li>
        <li>
          <a
            href="https://wa.me/919747476002"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </li>
        <li>
          <a href="#">Shipping</a>
        </li>
        <li>
          <a href="#">Returns</a>
        </li>
      </ul>

      <p className="footer-copy">© 2024 Trendora Kids Hub. All rights reserved.</p>
    </footer>
  );
}
