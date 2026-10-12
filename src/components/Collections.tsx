"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CollectionsProps {
  onAddToBag: (productName: string) => void;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export interface ProductItem {
  id: number;
  name: string;
  category: "Boys" | "Girls";
  age: string;
  price: string;
  badge: string;
  image: string;
  desc: string;
  material: string;
  sizes: string[];
}

const categories = ["All", "Boys", "Girls"];

const departmentCards = [
  {
    key: "Boys",
    title: "Boys",
    badge: "10 Showpieces",
    icon: "👦",
    desc: "10 Curated styles: quarter-zips, denim sets, tailored shirts & casual layers.",
    linkText: "Shop Boys",
  },
  {
    key: "Girls",
    title: "Girls",
    badge: "Ages 2–14",
    icon: "👧",
    desc: "Organic comfort dresses, classic knitwear & wool coats made to cherish.",
    linkText: "Shop Girls",
  },
];

const products: ProductItem[] = [
  // 10 Boys Dresses (from user's 'boys wear' collection, studio showpieces with clean white backgrounds)
  {
    id: 1,
    name: "Italia Club Quarter-Zip Sweatshirt",
    category: "Boys",
    age: "Ages 4–12",
    price: "₹1,499",
    badge: "Trending",
    image: "/boys-wear/boys-1.jpg",
    desc: "Premium crimson fleece pullover featuring collegiate embroidery, high-stand collar, and polished quarter-zip closure.",
    material: "100% Brushed Fleece Cotton",
    sizes: ["4–5Y", "6–7Y", "8–9Y", "10–12Y"],
  },
  {
    id: 2,
    name: "Indigo Plaid Western Denim Shirt",
    category: "Boys",
    age: "Ages 3–12",
    price: "₹1,399",
    badge: "100% Cotton",
    image: "/boys-wear/boys-2.jpg",
    desc: "Dual-contrast western shirt with authentic washed denim yoke and soft yarn-dyed tartan plaid body.",
    material: "Cotton Denim & Flannel",
    sizes: ["3–4Y", "5–6Y", "7–8Y", "9–10Y", "11–12Y"],
  },
  {
    id: 3,
    name: "Gentleman's Bowtie Polo & Chino Set",
    category: "Boys",
    age: "Ages 2–8",
    price: "₹1,899",
    badge: "Occasion Set",
    image: "/boys-wear/boys-3.jpg",
    desc: "Refined 2-piece celebration set featuring a navy polo with structured collar, beige bowtie, and coordinated tailored shorts.",
    material: "Cotton Piqué & Chino Weave",
    sizes: ["2–3Y", "4–5Y", "6–7Y", "7–8Y"],
  },
  {
    id: 4,
    name: "Timber Plaid Flannel Overshirt",
    category: "Boys",
    age: "Ages 4–14",
    price: "₹1,599",
    badge: "New Arrival",
    image: "/boys-wear/boys-4.jpg",
    desc: "Layered autumn staple with warm earth-tone checks, brass snap hardware, and integrated graphic undershirt look.",
    material: "Heavyweight Cotton Flannel",
    sizes: ["4–5Y", "6–7Y", "8–9Y", "10–12Y", "13–14Y"],
  },
  {
    id: 5,
    name: "Citrus Raglan Active Piping Sweatshirt",
    category: "Boys",
    age: "Ages 3–10",
    price: "₹1,199",
    badge: "Bestseller",
    image: "/boys-wear/boys-5.jpg",
    desc: "Energetic lemon yellow crewneck sweatshirt enhanced with athletic contrast piping along raglan shoulder seams.",
    material: "Organic Cotton Terry",
    sizes: ["3–4Y", "5–6Y", "7–8Y", "9–10Y"],
  },
  {
    id: 6,
    name: "Heritage '1977' Tailored Oxford Shirt",
    category: "Boys",
    age: "Ages 4–14",
    price: "₹1,349",
    badge: "Classic Fit",
    image: "/boys-wear/boys-6.jpg",
    desc: "Vintage typography patterned button-down crafted from breathable natural linen-cotton blend with crisp point collar.",
    material: "Cotton & Linen Blend",
    sizes: ["4–5Y", "6–7Y", "8–9Y", "10–12Y", "13–14Y"],
  },
  {
    id: 7,
    name: "Olive Utility Knit Vest & Striped Set",
    category: "Boys",
    age: "Ages 3–10",
    price: "₹1,699",
    badge: "2-Piece Set",
    image: "/boys-wear/boys-7.jpg",
    desc: "Contemporary streetwear set combining an olive utility knit vest with monochromatic striped long-sleeve tee.",
    material: "Soft Ribbed Cotton",
    sizes: ["3–4Y", "5–6Y", "7–8Y", "9–10Y"],
  },
  {
    id: 8,
    name: "Waffle Knit 'Picnic' Vest & Denim Shirt",
    category: "Boys",
    age: "Ages 2–9",
    price: "₹1,749",
    badge: "Limited Drop",
    image: "/boys-wear/boys-8.jpg",
    desc: "Artisanal textured oatmeal waffle sweater vest layered over an indigo chambray shirt with roll-tab sleeves.",
    material: "Waffle Cotton & Indigo Chambray",
    sizes: ["2–3Y", "4–5Y", "6–7Y", "8–9Y"],
  },
  {
    id: 9,
    name: "Raw Indigo Denim Jacket & Trouser Set",
    category: "Boys",
    age: "Ages 4–14",
    price: "₹2,299",
    badge: "Premium Denim",
    image: "/boys-wear/boys-9.jpg",
    desc: "Architectural raw indigo denim co-ord set with polished metallic rivet buttons and relaxed-taper jeans.",
    material: "100% Selvedge Look Denim",
    sizes: ["4–5Y", "6–7Y", "8–9Y", "10–12Y", "13–14Y"],
  },
  {
    id: 10,
    name: "Alpine Graphic Fleece & Layered Top",
    category: "Boys",
    age: "Ages 4–12",
    price: "₹1,449",
    badge: "Cozy Winter",
    image: "/boys-wear/boys-10.jpg",
    desc: "Off-white relaxed outdoor sweatshirt featuring vibrant retro typography and doubled thermal knit collar.",
    material: "Super-Soft Cotton Fleece",
    sizes: ["4–5Y", "6–7Y", "8–9Y", "10–12Y"],
  },

  // Girls Collection Showpieces
  {
    id: 11,
    name: "Houndstooth Wool Coat",
    category: "Girls",
    age: "Ages 3–10",
    price: "₹2,499",
    badge: "New Drop",
    image: "/girls-wear/girls-1.jpg",
    desc: "Heirloom-grade monochrome houndstooth outerwear tailored with turn-down collar and double flap pockets.",
    material: "Wool Blend & Satin Lining",
    sizes: ["3–4Y", "5–6Y", "7–8Y", "9–10Y"],
  },
  {
    id: 12,
    name: "Classic Cable Knit Cardigan",
    category: "Girls",
    age: "Ages 2–10",
    price: "₹1,599",
    badge: "Soft Touch",
    image: "/girls-wear/girls-2.jpg",
    desc: "Timeless cream cardigan knitted with intricate cable and honeycomb patterns, finished with tortoiseshell buttons.",
    material: "100% Merino Wool Feel Cotton",
    sizes: ["2–3Y", "4–5Y", "6–7Y", "8–10Y"],
  },
  {
    id: 13,
    name: "Everyday Ruffle Floral Dress",
    category: "Girls",
    age: "Ages 2–12",
    price: "₹1,499",
    badge: "Bestseller",
    image: "/girls-wear/girls-3.jpg",
    desc: "Tiered botanical dress with gentle ruffled flutter sleeves, delicate frill collar, and soft vintage floral print.",
    material: "100% Breathable Organic Cotton",
    sizes: ["2–3Y", "4–5Y", "6–7Y", "8–9Y", "10–12Y"],
  },
];

export default function Collections({
  onAddToBag,
  activeCategory: propCategory,
  onSelectCategory,
}: CollectionsProps) {
  const [internalCategory, setInternalCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeSize, setActiveSize] = useState<string>("");

  const activeCategory = propCategory !== undefined ? propCategory : internalCategory;

  const handleCategoryChange = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      setInternalCategory(cat);
    }
  };

  const handleShopDepartmentClick = (deptKey: string) => {
    handleCategoryChange(deptKey);
    setTimeout(() => {
      const anchor =
        document.getElementById("collections-grid-anchor") ||
        document.getElementById("collections-grid");
      if (anchor) {
        const navOffset = 80;
        const targetTop =
          anchor.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    }, 60);
  };

  const openQuickView = (product: ProductItem) => {
    setSelectedProduct(product);
    setActiveSize(product.sizes[0] || "");
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="collections">
      {/* Visual Category Showcase Cards (Boys, Girls) */}
      <motion.div
        className="category-showcase-wrap"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="category-showcase-header">
          <p className="category-showcase-label">Shop by Gender</p>
          <h3 className="category-showcase-title">Thoughtfully curated for every child</h3>
        </div>

        <div className="category-cards-grid">
          {departmentCards.map((dept) => {
            const isSelected = activeCategory === dept.key;
            return (
              <motion.button
                key={dept.key}
                type="button"
                className={`category-card ${isSelected ? "active" : ""}`}
                onClick={() => handleShopDepartmentClick(isSelected ? "All" : dept.key)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Filter by ${dept.title}`}
              >
                <div className="category-card-top">
                  <span className="category-card-badge">{dept.badge}</span>
                  <span className="category-card-icon">{dept.icon}</span>
                </div>
                <div>
                  <h4 className="category-card-title">{dept.title}</h4>
                  <p className="category-card-desc">{dept.desc}</p>
                </div>
                <div className="category-card-link">
                  <span>{isSelected ? `Showing ${dept.title} (Click to Show All)` : dept.linkText}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <div id="collections-grid-anchor" style={{ scrollMarginTop: "90px" }} />

      <motion.div
        className="collections-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <div>
          <p className="section-label">
            {activeCategory === "Boys"
              ? "Boys Wear Gallery • 10 Showpieces"
              : activeCategory === "Girls"
              ? "Girls Wear Gallery • 3 Showpieces"
              : "Featured collections"}
          </p>
          <h2 className="section-heading">
            {activeCategory === "Boys" ? (
              <>
                Boys&apos; Collection<br />
                <span style={{ fontSize: "1.35rem", fontWeight: 400, color: "var(--grey-mid)" }}>
                  Pure White Showpiece Display
                </span>
              </>
            ) : activeCategory === "Girls" ? (
              <>
                Girls&apos; Collection<br />
                <span style={{ fontSize: "1.35rem", fontWeight: 400, color: "var(--grey-mid)" }}>
                  Pure White Showpiece Display
                </span>
              </>
            ) : (
              <>
                This season&apos;s<br />picks
              </>
            )}
          </h2>
        </div>

        {/* Category Tabs with Horizontal Snap Scroll for Mobile */}
        <div className="category-tabs-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`category-tab-btn ${activeCategory === cat ? "active" : ""}`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="category-tab-pill"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span>
                {cat} {cat === "Boys" ? "(10)" : cat === "Girls" ? "(3)" : `(${products.length})`}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Showing count indicator badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <p style={{ fontSize: "0.82rem", color: "var(--grey-mid)", letterSpacing: "0.04em", margin: 0 }}>
          Showing {filteredProducts.length} {activeCategory === "All" ? "total showpieces" : `${activeCategory} wear showpieces`}
        </p>
        {activeCategory !== "All" && (
          <button
            onClick={() => handleCategoryChange("All")}
            style={{
              background: "transparent",
              border: "1px solid var(--border-color, #E5E7EB)",
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              fontSize: "0.75rem",
              cursor: "pointer",
              color: "var(--black)",
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <span>Show all collections ({products.length})</span>
            <span>✕</span>
          </button>
        )}
      </div>

      {/* Grid with Framer Motion layout transitions */}
      <motion.div layout className="collections-grid">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              className="collection-item"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -6 }}
              onClick={() => openQuickView(product)}
              style={{ cursor: "pointer" }}
            >
              <div className="collection-visual showpiece-display">
                <span className="collection-badge">{product.badge}</span>
                <span className="collection-showpiece-tag">Showpiece</span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="collection-product-img"
                  loading="lazy"
                />
                <motion.button
                  className="collection-quick-add"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToBag(product.name);
                  }}
                  whileTap={{ scale: 0.93 }}
                  aria-label={`Add ${product.name} to bag`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span className="quick-add-text">Quick Add</span>
                </motion.button>
              </div>

              <div className="collection-info">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p className="collection-tag">{product.age}</p>
                  <span style={{ fontSize: "0.7rem", color: "var(--grey-mid)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {product.category}
                  </span>
                </div>
                <p className="collection-name">{product.name}</p>
                <p className="collection-price">From {product.price}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Showpiece Quick View Lightbox Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="showpiece-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(8px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <motion.div
              className="showpiece-modal-content"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                maxWidth: "880px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeQuickView}
                aria-label="Close modal"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "#F3F4F6",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  color: "#111827",
                  zIndex: 10,
                  transition: "background 0.2s",
                }}
              >
                ✕
              </button>

              {/* Showpiece Image on Pure White Background */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem",
                  borderRight: "1px solid #F3F4F6",
                  position: "relative",
                  minHeight: "360px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "1.25rem",
                    left: "1.25rem",
                    background: "#0D0D0D",
                    color: "#FFFFFF",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "4px",
                  }}
                >
                  {selectedProduct.badge}
                </span>

                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "440px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.1))",
                  }}
                />
              </div>

              {/* Product Info & Actions */}
              <div
                style={{
                  padding: "2.5rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "#4B5563",
                        fontWeight: 600,
                      }}
                    >
                      {selectedProduct.category} Collection • {selectedProduct.age}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--serif, Georgia, serif)",
                      fontSize: "1.75rem",
                      fontWeight: 600,
                      color: "#111827",
                      margin: "0 0 0.75rem 0",
                      lineHeight: 1.25,
                    }}
                  >
                    {selectedProduct.name}
                  </h3>

                  <p
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "#0D0D0D",
                      margin: "0 0 1.25rem 0",
                      fontFamily: "var(--sans)",
                    }}
                  >
                    {selectedProduct.price}
                  </p>

                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      color: "#4B5563",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {selectedProduct.desc}
                  </p>

                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      background: "#F9FAFB",
                      borderRadius: "8px",
                      marginBottom: "1.5rem",
                      border: "1px solid #F3F4F6",
                    }}
                  >
                    <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7280", display: "block", marginBottom: "0.25rem" }}>
                      Fabric & Care
                    </span>
                    <span style={{ fontSize: "0.85rem", color: "#1F2937", fontWeight: 500 }}>
                      {selectedProduct.material}
                    </span>
                  </div>

                  {/* Size Selector */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#4B5563", display: "block", marginBottom: "0.6rem", fontWeight: 600 }}>
                      Select Size
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setActiveSize(size)}
                          style={{
                            padding: "0.5rem 0.85rem",
                            fontSize: "0.8rem",
                            borderRadius: "6px",
                            border: activeSize === size ? "2px solid #0D0D0D" : "1px solid #D1D5DB",
                            background: activeSize === size ? "#0D0D0D" : "#FFFFFF",
                            color: activeSize === size ? "#FFFFFF" : "#374151",
                            cursor: "pointer",
                            fontWeight: activeSize === size ? 600 : 500,
                            transition: "all 0.2s",
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Add to Bag Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      onAddToBag(`${selectedProduct.name} (${activeSize})`);
                      closeQuickView();
                    }}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      background: "#0D0D0D",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "0.88rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.6rem",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                      transition: "transform 0.2s, background 0.2s",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <span>Add to Bag • {selectedProduct.price}</span>
                  </button>
                  <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#9CA3AF", marginTop: "0.6rem", letterSpacing: "0.04em" }}>
                    Complimentary express delivery & 14-day effortless home trials
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
