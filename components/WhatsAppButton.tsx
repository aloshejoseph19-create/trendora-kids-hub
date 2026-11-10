"use client";

import React from "react";

const WHATSAPP_NUMBER = "919747476002"; // Store owner's WhatsApp
const DEFAULT_MESSAGE = "Hi! I'm browsing Trendora Kids Hub and would love some help 😊";

export const WhatsAppButton: React.FC = () => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 active:scale-95"
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        className="h-5 w-5 sm:h-7 sm:w-7"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0Zm9.342 22.616c-.39 1.1-1.932 2.014-3.178 2.28-.852.18-1.964.324-5.71-1.228-4.8-1.986-7.886-6.86-8.124-7.18-.228-.318-1.924-2.562-1.924-4.886 0-2.324 1.218-3.466 1.65-3.938.39-.426.918-.606 1.218-.606.15 0 .318.006.456.012.432.018.648.042 .932.72.354.846 1.218 2.97 1.326 3.186.108.216.216.504.066.804-.138.306-.258.498-.474.762-.216.264-.456.588-.648.786-.216.228-.444.474-.186.906.258.432 1.152 1.902 2.472 3.078 1.698 1.512 3.132 1.98 3.576 2.196.342.168.756.138 1.02-.138.33-.348.738-.924 1.152-1.494.294-.408.666-.462 1.044-.306.384.15 2.43 1.146 2.844 1.356.414.21.69.312.792.486.108.174.108 1.014-.282 2.114Z" />
      </svg>
    </a>
  );
};

