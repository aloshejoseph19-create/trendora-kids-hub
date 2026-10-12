"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import MobileDrawer from "@/components/MobileDrawer";
import SearchModal from "@/components/SearchModal";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import MarqueeTicker from "@/components/MarqueeTicker";
import Collections from "@/components/Collections";
import OurStory from "@/components/OurStory";
import Testimonials from "@/components/Testimonials";
import EnquiryForm from "@/components/EnquiryForm";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import MobileBottomDock from "@/components/MobileBottomDock";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setTimeout(() => {
      const collectionsEl =
        document.getElementById("collections-grid-anchor") ||
        document.getElementById("collections");
      if (collectionsEl) {
        const navOffset = 80;
        const targetTop =
          collectionsEl.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    }, 60);
  };

  const handleAddToBag = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setToastMsg(`Added ${productName} to bag`);
    setTimeout(() => {
      setToastMsg(null);
    }, 2800);
  };

  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      <Navbar
        cartCount={cartCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen((prev) => !prev)}
        isDrawerOpen={isDrawerOpen}
      />

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <main>
        <Hero onSelectCategory={handleSelectCategory} />
        <MarqueeTicker />
        <Collections
          onAddToBag={handleAddToBag}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <hr className="section-divider" />
        <OurStory />
        <Testimonials />
        <EnquiryForm />
        <Newsletter />
      </main>

      <Footer />

      <Toast message={toastMsg} />

      <MobileBottomDock
        cartCount={cartCount}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
