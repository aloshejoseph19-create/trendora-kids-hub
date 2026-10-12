"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const values = [
  { num: "100%", label: "Organic cotton" },
  { num: "6K+", label: "Happy families" },
  { num: "40+", label: "Collections" },
  { num: "0", label: "Harmful dyes" },
];

export default function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id="about" ref={containerRef}>
      <div className="about-grid">
        {/* Left Column: Visual with Parallax */}
        <div className="about-visual">
          <motion.div
            style={{
              position: "absolute",
              top: "-8%",
              left: 0,
              width: "100%",
              height: "116%",
              y: imageY,
            }}
          >
            <Image
              src="/our-story.jpg"
              alt="Child in TRENDORA knitwear - Our Story"
              fill
              className="about-visual-img"
            />
          </motion.div>
          <div className="about-visual-overlay" />
          <motion.p
            className="about-visual-num"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Est. 2021
          </motion.p>
          <motion.p
            className="about-visual-tagline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Clothes that
            <br />
            grow with
            <br />
            <em>every child.</em>
          </motion.p>
        </div>

        {/* Right Column: Story Copy & Metrics */}
        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-label">Our story</p>
          <h2 className="section-heading" style={{ marginBottom: "2rem" }}>
            Built for the
            <br />
            way kids live
          </h2>
          <p className="about-body">
            TRENDORA was born from a simple belief — that children&apos;s clothing
            should be as considered as the children who wear it. Not loud. Not busy.
            Just beautifully made, easy to wear, and designed to last longer than
            a single growth spurt.
          </p>
          <p className="about-body">
            Every piece is crafted from thoughtfully sourced fabrics that move freely,
            wash well, and feel gentle on young skin. We design for real childhood —
            messy mornings, playgrounds, and everything in between.
          </p>
          <motion.a
            className="btn-outline"
            href="#collections"
            style={{ alignSelf: "flex-start" }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore collections
          </motion.a>

          {/* Values Grid */}
          <div className="about-values">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                className="about-value-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="about-value-num">{v.num}</div>
                <div className="about-value-label">{v.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
