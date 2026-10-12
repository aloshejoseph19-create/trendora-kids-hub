"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "My daughter refuses to take off her TRENDORA dress. I've washed it 30 times and it still looks brand new. That's rare.",
    author: "Priya M. — Alakode",
  },
  {
    quote:
      "Finally a kids brand that doesn't look like a carnival. Clean, minimal, and my son actually wants to wear these clothes.",
    author: "Rahul K. — Karuvanchal",
  },
  {
    quote:
      "The fabric quality is unmatched. Soft, breathable, and safe. I've recommended TRENDORA to every parent I know.",
    author: "Ananya S. — Alakode",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveIndex(Math.min(Math.max(index, 0), testimonials.length - 1));
  };

  const scrollToTestimonial = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section id="testimonials">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="testimonials-header"
      >
        <div>
          <p className="section-label">What parents say</p>
          <h2 className="section-heading">Loved by families</h2>
        </div>
      </motion.div>

      <div
        className="testimonials-grid"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.author}
            className="testimonial-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -8 }}
          >
            <div className="stars">
              {"★★★★★".split("").map((star, sIdx) => (
                <span key={sIdx} style={{ marginRight: "3px" }}>
                  {star}
                </span>
              ))}
            </div>
            <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="testimonial-divider" />
            <p className="testimonial-author">{t.author}</p>
          </motion.div>
        ))}
      </div>

      {/* Mobile Snap Pagination Dots */}
      <div className="testimonial-dots" aria-label="Review pagination">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`testimonial-dot ${activeIndex === i ? "active" : ""}`}
            onClick={() => scrollToTestimonial(i)}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

