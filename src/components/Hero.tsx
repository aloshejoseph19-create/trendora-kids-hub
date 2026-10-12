"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const heroImages = [
  { src: "/hero-1.jpg", alt: "Child in TRENDORA Houndstooth Coat - Pose 1" },
  { src: "/hero-2.jpg", alt: "Child in TRENDORA Houndstooth Coat - Pose 2" },
  { src: "/hero-3.jpg", alt: "Child in TRENDORA Houndstooth Coat - Pose 3" },
];

// Synchronized leaf-detachment:
// 1. Leaf begins visibly attached to tree-branch hanger on the hero video.
// 2. Attached quiver in the wind, then snaps loose at stem.
// 3. Falls continuously downward, visibly passing IN FRONT of "Dress them in tomorrow." headline.
// 4. Continues downward into space below headline, dissolves near bottom, and resets seamlessly.
const fallingLeaves = [
  {
    id: 1,
    name: "Left outermost tip leaf",
    startX: 23.98,
    startY: 56.39,
    baseAngle: -15,
    size: 16,
    color: "#242426",
    pathType: 0,
    duration: 9.2,
    delay: 0.3,
    times: [0, 0.14, 0.22, 0.35, 0.48, 0.62, 0.75, 0.88, 0.95, 0.97, 1],
    y: [0, 0, 10, 115, 245, 380, 515, 650, 750, 0, 0],
    x: [0, 0, 4, -22, 26, -24, 20, -12, 0, 0, 0],
    rotate: [-15, -13, 10, 75, 155, 240, 325, 405, 440, -15, -15],
    scaleX: [1, 1.02, 0.92, 0.50, -0.85, 0.60, -0.75, 0.85, 1, 1, 1],
    opacity: [0.95, 0.95, 0.95, 0.95, 0.95, 0.92, 0.88, 0.65, 0, 0, 0.95],
  },
  {
    id: 2,
    name: "Left lower twig leaf",
    startX: 27.73,
    startY: 66.39,
    baseAngle: 82,
    size: 15,
    color: "#2B2B2E",
    pathType: 2,
    duration: 10.0,
    delay: 1.8,
    times: [0, 0.14, 0.22, 0.35, 0.48, 0.62, 0.75, 0.88, 0.95, 0.97, 1],
    y: [0, 0, 10, 110, 240, 375, 510, 645, 740, 0, 0],
    x: [0, 0, -3, 25, -28, 22, -18, 10, 0, 0, 0],
    rotate: [82, 85, 105, 175, 255, 335, 415, 490, 525, 82, 82],
    scaleX: [0.90, 0.92, 0.85, -0.60, 0.75, -0.80, 0.70, 0.85, 0.90, 0.90, 0.90],
    opacity: [0.95, 0.95, 0.95, 0.95, 0.95, 0.92, 0.88, 0.65, 0, 0, 0.95],
  },
  {
    id: 3,
    name: "Left mid branch silver leaf",
    startX: 31.09,
    startY: 50.56,
    baseAngle: -25,
    size: 14,
    color: "#7E7E84",
    pathType: 1,
    duration: 8.8,
    delay: 3.2,
    times: [0, 0.14, 0.22, 0.35, 0.48, 0.62, 0.75, 0.88, 0.95, 0.97, 1],
    y: [0, 0, 11, 120, 250, 385, 520, 655, 755, 0, 0],
    x: [0, 0, 5, -26, 30, -20, 24, -14, 0, 0, 0],
    rotate: [-25, -23, -2, 60, 140, 220, 305, 385, 420, -25, -25],
    scaleX: [0.85, 0.87, 0.80, 0.60, -0.70, 0.80, -0.65, 0.75, 0.85, 0.85, 0.85],
    opacity: [0.92, 0.92, 0.92, 0.92, 0.92, 0.88, 0.82, 0.60, 0, 0, 0.92],
  },
  {
    id: 4,
    name: "Left arch leaf",
    startX: 35.08,
    startY: 45.28,
    baseAngle: 40,
    size: 15,
    color: "#262628",
    pathType: 0,
    duration: 9.6,
    delay: 4.8,
    times: [0, 0.14, 0.22, 0.35, 0.48, 0.62, 0.75, 0.88, 0.95, 0.97, 1],
    y: [0, 0, 12, 125, 255, 390, 525, 660, 765, 0, 0],
    x: [0, 0, -4, 28, -25, 28, -16, 12, 0, 0, 0],
    rotate: [40, 38, 62, 135, 220, 305, 385, 460, 495, 40, 40],
    scaleX: [1, 1.02, 0.90, -0.60, 0.80, -0.50, 0.85, 0.95, 1, 1, 1],
    opacity: [0.95, 0.95, 0.95, 0.95, 0.95, 0.92, 0.88, 0.65, 0, 0, 0.95],
  },
  {
    id: 5,
    name: "Right inner hook leaf",
    startX: 55.16,
    startY: 29.31,
    baseAngle: 12,
    size: 15,
    color: "#2C2C2E",
    pathType: 0,
    duration: 10.4,
    delay: 1.0,
    times: [0, 0.14, 0.22, 0.35, 0.48, 0.62, 0.75, 0.88, 0.95, 0.97, 1],
    y: [0, 0, 12, 135, 270, 405, 540, 680, 785, 0, 0],
    x: [0, 0, 4, -30, 32, -26, 22, -10, 0, 0, 0],
    rotate: [12, 15, 38, 115, 195, 275, 355, 430, 465, 12, 12],
    scaleX: [0.92, 0.94, 0.84, 0.40, -0.90, -0.40, 0.80, 0.88, 0.92, 0.92, 0.92],
    opacity: [0.95, 0.95, 0.95, 0.95, 0.95, 0.92, 0.88, 0.65, 0, 0, 0.95],
  },
  {
    id: 6,
    name: "Right inner silver leaf",
    startX: 59.30,
    startY: 28.06,
    baseAngle: 28,
    size: 14,
    color: "#6E6E74",
    pathType: 1,
    duration: 9.0,
    delay: 5.8,
    times: [0, 0.14, 0.22, 0.35, 0.48, 0.62, 0.75, 0.88, 0.95, 0.97, 1],
    y: [0, 0, 11, 135, 270, 405, 540, 680, 785, 0, 0],
    x: [0, 0, -5, 26, -30, 24, -18, 8, 0, 0, 0],
    rotate: [28, 26, 50, 130, 210, 295, 375, 450, 485, 28, 28],
    scaleX: [0.82, 0.84, 0.75, -0.70, 0.50, -0.80, 0.60, 0.76, 0.82, 0.82, 0.82],
    opacity: [0.92, 0.92, 0.92, 0.92, 0.92, 0.88, 0.82, 0.60, 0, 0, 0.92],
  },
  {
    id: 7,
    name: "Right top arch leaf",
    startX: 65.86,
    startY: 22.50,
    baseAngle: 45,
    size: 17,
    color: "#222224",
    pathType: 2,
    duration: 10.2,
    delay: 3.8,
    times: [0, 0.14, 0.22, 0.35, 0.48, 0.62, 0.75, 0.88, 0.95, 0.97, 1],
    y: [0, 0, 12, 140, 280, 415, 555, 695, 800, 0, 0],
    x: [0, 0, 6, -34, 28, -28, 20, -12, 0, 0, 0],
    rotate: [45, 48, 72, 155, 240, 325, 410, 485, 520, 45, 45],
    scaleX: [1, 1.02, 0.94, -0.50, 0.90, -0.40, 0.80, 0.95, 1, 1, 1],
    opacity: [0.95, 0.95, 0.95, 0.95, 0.95, 0.92, 0.88, 0.65, 0, 0, 0.95],
  },
];

interface HeroProps {
  onSelectCategory?: (category: string) => void;
}

export default function Hero({ onSelectCategory }: HeroProps = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Ensure video plays once from beginning to end and reliably freezes on the final logo frame permanently
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.defaultMuted = true;
    vid.muted = true;
    vid.loop = false;
    // Mobile WebKit / Safari inline playback enforcement
    (vid as any).playsInline = true;
    (vid as any)["webkit-playsinline"] = true;

    let hasEnded = false;

    const stopAtEnd = () => {
      if (hasEnded) return;
      hasEnded = true;
      vid.pause();
      if (vid.duration && Number.isFinite(vid.duration)) {
        // Holding slightly before duration prevents WebKit/Blink from rewinding or looping back to frame 0
        const endFrameTime = Math.max(0, vid.duration - 0.03);
        try {
          vid.currentTime = endFrameTime;
        } catch {
          // ignore seek restrictions
        }
      }
      setIsVideoEnded(true);
    };

    const handleEnded = () => {
      stopAtEnd();
    };

    const handleTimeUpdate = () => {
      if (vid.duration && Number.isFinite(vid.duration)) {
        if (vid.currentTime >= vid.duration - 0.06) {
          stopAtEnd();
        }
      }
    };

    const handlePlay = () => {
      if (hasEnded) {
        vid.pause();
      }
    };

    vid.addEventListener("ended", handleEnded);
    vid.addEventListener("timeupdate", handleTimeUpdate);
    vid.addEventListener("play", handlePlay);

    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Handled: mobile low-power or restricted autoplay
      });
    }

    return () => {
      vid.removeEventListener("ended", handleEnded);
      vid.removeEventListener("timeupdate", handleTimeUpdate);
      vid.removeEventListener("play", handlePlay);
    };
  }, []);

  // Reset 3D flip card to front when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const cardEl = document.getElementById("hero-card-3d");
      if (cardEl && !cardEl.contains(e.target as Node)) {
        setIsCardFlipped(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // 1.8s photo showcase duration with interactive pause & manual selection
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Multi-line flowing wave ribbon animation BEHIND the floating logo tile
  useEffect(() => {
    const card = cardWrapperRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PAD = 40; // Bleed margin around card
    const R = 14;   // Refined rounded corner radius
    const NUM_LINES = 10;

    const LINE_CONFIGS = [
      { color: "rgba(24, 24, 28, 0.28)",    width: 0.46 }, // muted obsidian
      { color: "rgba(48, 48, 54, 0.34)",    width: 0.50 }, // subtle graphite
      { color: "rgba(78, 78, 86, 0.38)",    width: 0.52 }, // soft charcoal
      { color: "rgba(115, 115, 125, 0.44)", width: 0.55 }, // slate grey
      { color: "rgba(155, 155, 165, 0.48)", width: 0.58 }, // liquid silver
      { color: "rgba(195, 195, 205, 0.52)", width: 0.60 }, // pale platinum
      { color: "rgba(232, 232, 240, 0.50)", width: 0.55 }, // translucent silk off-white
      { color: "rgba(140, 140, 150, 0.42)", width: 0.50 }, // fine silver filament
      { color: "rgba(70, 70, 78, 0.34)",    width: 0.48 }, // hushed shadow contour
      { color: "rgba(32, 32, 36, 0.25)",    width: 0.42 }, // delicate outer wisp
    ];

    let width = 0;
    let height = 0;
    let animId: number | null = null;

    let mouseX = -9999;
    let mouseY = -9999;
    let targetIntensity = 0.0;
    let currentIntensity = 0.0;
    let hasCursor = false;

    function resize() {
      if (!card || !canvas || !ctx) return;
      const rect = card.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const canvasW = width + PAD * 2;
      const canvasH = height + PAD * 2;

      canvas.width = Math.round(canvasW * dpr);
      canvas.height = Math.round(canvasH * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function getPerimeterPoint(
      s: number,
      P: number,
      L_top: number,
      L_arc: number,
      L_side: number,
      curR: number
    ) {
      s = ((s % P) + P) % P;

      if (s < L_top) {
        return { x: curR + s, y: 0, nx: 0, ny: -1 };
      }
      s -= L_top;

      if (s < L_arc) {
        const th = -Math.PI / 2 + s / curR;
        return {
          x: width - curR + curR * Math.cos(th),
          y: curR + curR * Math.sin(th),
          nx: Math.cos(th),
          ny: Math.sin(th),
        };
      }
      s -= L_arc;

      if (s < L_side) {
        return { x: width, y: curR + s, nx: 1, ny: 0 };
      }
      s -= L_side;

      if (s < L_arc) {
        const th = s / curR;
        return {
          x: width - curR + curR * Math.cos(th),
          y: height - curR + curR * Math.sin(th),
          nx: Math.cos(th),
          ny: Math.sin(th),
        };
      }
      s -= L_arc;

      if (s < L_top) {
        return { x: width - curR - s, y: height, nx: 0, ny: 1 };
      }
      s -= L_top;

      if (s < L_arc) {
        const th = Math.PI / 2 + s / curR;
        return {
          x: curR + curR * Math.cos(th),
          y: height - curR + curR * Math.sin(th),
          nx: Math.cos(th),
          ny: Math.sin(th),
        };
      }
      s -= L_arc;

      if (s < L_side) {
        return { x: 0, y: height - curR - s, nx: -1, ny: 0 };
      }
      s -= L_side;

      const th = Math.PI + s / curR;
      return {
        x: curR + curR * Math.cos(th),
        y: curR + curR * Math.sin(th),
        nx: Math.cos(th),
        ny: Math.sin(th),
      };
    }

    let lastTimestamp: number | null = null;
    let animTime = 0;

    function render(timestamp: number) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const dt = Math.min((timestamp - lastTimestamp) * 0.001, 0.05);
      lastTimestamp = timestamp;

      // Smooth non-linear intensity easing: wakes up swiftly, fades down gracefully
      currentIntensity += (targetIntensity - currentIntensity) * 0.05;

      // Flow speed calibrated to 2x (1 time more speed) for smooth, elegant ribbon movement
      const flowSpeed = 1.1;
      animTime += dt * flowSpeed;
      const time = animTime;

      if (currentIntensity < 0.002) {
        currentIntensity = 0;
        ctx!.clearRect(0, 0, width + PAD * 2, height + PAD * 2);
        animId = requestAnimationFrame(render);
        return;
      }

      ctx!.clearRect(0, 0, width + PAD * 2, height + PAD * 2);

      if (width > 0 && height > 0) {
        const curR = Math.min(R, width / 4, height / 4);
        const L_top = width - 2 * curR;
        const L_side = height - 2 * curR;
        const L_arc = (Math.PI / 2) * curR;
        const P = 2 * L_top + 2 * L_side + 4 * L_arc;

        const step = 2.4;
        const numPoints = Math.ceil(P / step);
        const TWO_PI = Math.PI * 2;

        for (let i = 0; i < NUM_LINES; i++) {
          const cfg = LINE_CONFIGS[i];
          const normIdx = i / (NUM_LINES - 1);
          const baseOutward = 1.6 + normIdx * 9.6;

          ctx!.save();
          ctx!.beginPath();

          ctx!.strokeStyle = cfg.color;
          ctx!.globalAlpha = currentIntensity;
          ctx!.lineWidth = cfg.width;
          ctx!.lineCap = "round";
          ctx!.lineJoin = "round";

          let firstPt: { x: number; y: number } | null = null;

          for (let j = 0; j <= numPoints; j++) {
            const s = (j % numPoints) * step;
            const phi = (s / P) * TWO_PI;

            // Refined organic hand-drawn harmonic waves with gentle fashion-editorial drape
            const w1 = Math.sin(6 * phi - time * 0.85 + normIdx * 0.9) * (1.6 + normIdx * 2.6);
            const w2 = Math.sin(11 * phi - time * 1.25 + i * 0.42) * (1.0 + normIdx * 1.5);
            const w3 = Math.sin(17 * phi - time * 1.65 + i * 0.58) * (0.5 + normIdx * 0.8);
            const breathing = Math.sin(3 * phi + time * 0.50 + i * 0.46) * (0.65 * (normIdx - 0.5));

            let d = (baseOutward + w1 + w2 + w3 + breathing) * currentIntensity;

            const pt = getPerimeterPoint(s, P, L_top, L_arc, L_side, curR);

            // Wave reacts gracefully to cursor position with serene, subtle ripple speed
            if (hasCursor && currentIntensity > 0.05) {
              const distToMouse = Math.hypot(pt.x - mouseX, pt.y - mouseY);
              const radius = 110;
              if (distToMouse < radius) {
                const proximity = Math.pow(1 - distToMouse / radius, 1.8) * currentIntensity;
                const cursorSurge = proximity * (2.8 + normIdx * 2.2);
                const cursorRipple = Math.sin(24 * phi - time * 1.6 + i * 0.5) * (1.4 * proximity);
                d += cursorSurge + cursorRipple;
              }
            }

            const px = pt.x + PAD + d * pt.nx;
            const py = pt.y + PAD + d * pt.ny;

            if (j === 0) {
              firstPt = { x: px, y: py };
              ctx!.moveTo(px, py);
            } else {
              ctx!.lineTo(px, py);
            }
          }

          if (firstPt) {
            ctx!.lineTo(firstPt.x, firstPt.y);
          }
          ctx!.stroke();
          ctx!.restore();
        }
      }

      animId = requestAnimationFrame(render);
    }

    function onMouseMove(e: MouseEvent) {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const curX = e.clientX;
      const curY = e.clientY;

      mouseX = curX - rect.left;
      mouseY = curY - rect.top;

      const dx = Math.max(rect.left - curX, 0, curX - rect.right);
      const dy = Math.max(rect.top - curY, 0, curY - rect.bottom);
      const dist = Math.hypot(dx, dy);

      const proximityThreshold = 55;
      if (dist === 0) {
        targetIntensity = 1.0;
        hasCursor = true;
      } else if (dist < proximityThreshold) {
        const norm = 1 - dist / proximityThreshold;
        targetIntensity = Math.pow(norm, 1.6) * 0.55;
        hasCursor = true;
      } else {
        targetIntensity = 0.0;
        hasCursor = false;
      }
    }

    function onMouseLeave() {
      targetIntensity = 0.0;
      hasCursor = false;
      mouseX = -9999;
      mouseY = -9999;
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => resize());
      ro.observe(card);
    } else {
      window.addEventListener("resize", resize, { passive: true });
    }

    resize();
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
      if (animId !== null) cancelAnimationFrame(animId);
    };
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="hero" id="hero">
      {/* Left Column: Typography & CTAs */}
      <div className="hero-left">
        <motion.div
          ref={cardWrapperRef}
          className="hero-video-wrapper"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* BACK: Multi-line flowing wave canvas behind the tile */}
          <canvas
            ref={canvasRef}
            className="logo-card-wave-canvas"
            aria-hidden="true"
          />

          {/* 3D FLIP CONTAINER: Flips 180° on hover/touch */}
          <div
            className={`hero-card-3d ${isCardFlipped ? "is-flipped" : ""}`}
            id="hero-card-3d"
            onClick={(e) => {
              if ((e.target as HTMLElement)?.closest("a")) return;
              setIsCardFlipped((prev) => !prev);
            }}
          >
            <div className="hero-card-inner">
              {/* FRONT: Clean floating logo tile (solid background, shadow, masks wave behind it) */}
              <div className="hero-card-face hero-card-front">
                <div className="hero-logo-tile">
                  <video
                    ref={videoRef}
                    poster="/trendora-logo.png"
                    src="/gemini_generated_video_9b227397.mp4"
                    autoPlay
                    muted
                    playsInline
                    loop={false}
                    preload="auto"
                    {...({ "webkit-playsinline": "true" } as any)}
                  />
                </div>

                {/* Synchronized Organic Falling Leaves from Visible Branch Hanger */}
                <motion.div
                  className={`hero-falling-leaves-container ${isVideoEnded ? "ended" : ""}`}
                  aria-hidden="true"
                  animate={{ opacity: isVideoEnded ? 0 : 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {fallingLeaves.map((leaf) => (
                    <motion.div
                      key={leaf.id}
                      className="hero-falling-leaf"
                      style={{
                        left: `calc(${leaf.startX}% - ${leaf.size / 2}px)`,
                        top: `calc(${leaf.startY}% - ${leaf.size / 2}px)`,
                        width: leaf.size,
                        height: leaf.size,
                      }}
                      animate={{
                        y: isVideoEnded ? 0 : leaf.y,
                        x: isVideoEnded ? 0 : leaf.x,
                        rotate: isVideoEnded ? 0 : leaf.rotate,
                        scaleX: isVideoEnded ? 1 : leaf.scaleX,
                        opacity: isVideoEnded ? 0 : leaf.opacity,
                      }}
                      transition={{
                        duration: leaf.duration,
                        repeat: isVideoEnded ? 0 : Infinity,
                        delay: leaf.delay,
                        ease: "linear",
                        times: leaf.times,
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="100%" height="100%" fill={leaf.color}>
                        {leaf.pathType === 0 && (
                          <path d="M12 2C7.5 4 4 9 4.5 14.5c.5 4 3 6.5 4.5 7.5 2-1.5 5.5-4 6.5-9C16.5 7.5 15.5 3.5 12 2z" />
                        )}
                        {leaf.pathType === 1 && (
                          <path d="M17 2.5C11 3.5 6.5 8 5 13.5c-1 3.5.5 6.5 2 8 2.5-1.5 5-4.5 6.5-9 1.5-4 4-8 3.5-10z" />
                        )}
                        {leaf.pathType === 2 && (
                          <path d="M12 3C8 4.5 5 8.5 5 13c0 4 2.5 7 4.5 8 2-1 4.5-4 5-8.5C15 8 14 4.5 12 3z" />
                        )}
                      </svg>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* BACK: Clean Minimal Luxury Business Card Face */}
              <div className="hero-card-face hero-card-back">
                <div className="biz-card-inner">
                  <div className="biz-card-header">
                    <div className="biz-card-brand">
                      <h3 className="biz-card-title">TRENDORA</h3>
                      <span className="biz-card-subtitle">KIDS HUB</span>
                    </div>
                    <span className="biz-card-pill">BOUTIQUE</span>
                  </div>

                  <p className="biz-card-quote">“Dressing little dreamers in comfort and joy.”</p>

                  <div className="biz-card-separator" />

                  <div className="biz-card-grid">
                    <div className="biz-card-item">
                      <svg className="biz-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="biz-card-val" title="Opp. NSS School, Alakode">Opp. NSS School, Alakode</span>
                    </div>

                    <div className="biz-card-item">
                      <svg className="biz-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="biz-card-val" title="Mon–Sat · 9am–6pm IST">Mon–Sat · 9am–6pm IST</span>
                    </div>

                    <div className="biz-card-item">
                      <svg className="biz-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <a href="tel:+919876543210" className="biz-card-val biz-card-link">+91 98765 43210</a>
                    </div>

                    <div className="biz-card-item">
                      <svg className="biz-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <a href="mailto:hello@trendorakidshub.com" className="biz-card-val biz-card-link">hello@trendorakidshub.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <motion.span
            className="eyebrow-dot"
            animate={{ scale: [1, 1.6, 1], opacity: [0.9, 0.4, 0.9] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          New collection — 2024
        </motion.p>

        <h1 className="hero-headline">
          <span className="headline-mask">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Dress
            </motion.span>
          </span>
          <span className="headline-mask">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              them in
            </motion.span>
          </span>
          <span className="headline-mask">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <em>tomorrow.</em>
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          Minimal, thoughtfully crafted clothing for children who move, explore, and grow. Quality that keeps up with them.
        </motion.p>

        <motion.div
          className="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            href="#collections"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("collections");
              if (el) {
                const navOffset = 70;
                const targetTop = el.getBoundingClientRect().top + window.scrollY - navOffset;
                window.scrollTo({ top: targetTop, behavior: "smooth" });
              }
            }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Shop now
            <svg
              className="btn-arrow"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </motion.a>
          <motion.a
            href="#about"
            className="btn-outline"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("about");
              if (el) {
                const navOffset = 70;
                const targetTop = el.getBoundingClientRect().top + window.scrollY - navOffset;
                window.scrollTo({ top: targetTop, behavior: "smooth" });
              }
            }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Our story
          </motion.a>
        </motion.div>

        {/* Quick Gender Selector for Parents */}
        <motion.div
          className="hero-gender-quickbar"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <span className="hero-gender-label">Quick shop by child:</span>
          <div className="hero-gender-pills">
            <motion.button
              type="button"
              className="hero-gender-pill"
              onClick={() => onSelectCategory?.("Boys")}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>👦 Boys</span>
              <span className="gender-pill-age">Ages 2–14</span>
            </motion.button>
            <motion.button
              type="button"
              className="hero-gender-pill"
              onClick={() => onSelectCategory?.("Girls")}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>👧 Girls</span>
              <span className="gender-pill-age">Ages 2–14</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Photo Showcase */}
      <div
        className="hero-right"
        id="hero-interactive"
        onTouchStart={(e) => {
          const touch = e.touches[0];
          (e.currentTarget as any)._startX = touch.clientX;
        }}
        onTouchEnd={(e) => {
          const startX = (e.currentTarget as any)._startX;
          if (startX !== undefined) {
            const diff = e.changedTouches[0].clientX - startX;
            if (diff > 40) handlePrevSlide();
            if (diff < -40) handleNextSlide();
          }
        }}
      >
        <div className="hero-slider">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentSlide}
              className="hero-slide active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Image
                src={heroImages[currentSlide].src}
                alt={heroImages[currentSlide].alt}
                fill
                priority
                className="hero-img"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="hero-img-overlay" />

        {/* Slide Progress Indicators (App-style) */}
        <div className="hero-indicators" aria-label="Photo carousel indicators">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              className={`hero-indicator-bar ${currentSlide === idx ? "active" : ""}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1} of ${heroImages.length}`}
            >
              <span className="hero-indicator-fill" />
            </button>
          ))}
        </div>

        {/* Floating luxury badge in top corner */}
        <motion.div
          className="hero-floating-card"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 1.2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.05, y: -8 }}
        >
          <div className="floating-pill" />
          <div>
            <div className="floating-text-top">Autumn Drop</div>
            <div className="floating-text-main">Houndstooth Coat</div>
          </div>
        </motion.div>

        {/* Stat card */}
        <motion.div
          className="hero-stat"
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="hero-stat-num">
            <span>400</span>
            <span>+</span>
          </div>
          <div className="hero-stat-label">Styles for every age</div>
        </motion.div>
      </div>
    </section>
  );
}
