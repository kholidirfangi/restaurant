"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

// Unsplash restaurant images (free to use)
const BG_IMAGE =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop";

const WORDS = ["Autentik", "Menggugah", "Istimewa"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  // Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Rotating words
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % WORDS.length),
      2800,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen min-h-[600] overflow-hidden flex items-center justify-center"
    >
      {/* ── BACKGROUND IMAGE with parallax ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <Image
          src={BG_IMAGE}
          width={1000}
          height={600}
          alt="Restaurant interior"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* ── LAYERED OVERLAYS ── */}
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0d0700]/60 via-[#0d0700]/30 to-[#0d0700]/85" />
      {/* Left fade */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0d0700]/70 via-transparent to-[#0d0700]/30" />
      {/* Warm tone overlay */}
      <div className="absolute inset-0 bg-[#6b2e08]/15 mix-blend-multiply" />
      {/* Noise grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* ── DECORATIVE FRAME LINES ── */}
      <div className="xl:block hidden absolute inset-6 sm:inset-10 pointer-events-none">
        {/* Corner TL */}
        <div className="absolute top-0 left-0 w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-[1] bg-linear-to-r from-[#e8a045]/60 to-transparent" />
          <div className="absolute top-0 left-0 h-full w-[1] bg-linear-to-b from-[#e8a045]/60 to-transparent" />
        </div>
        {/* Corner TR */}
        <div className="absolute top-0 right-0 w-16 h-16">
          <div className="absolute top-0 right-0 w-full h-[1] bg-linear-to-l from-[#e8a045]/60 to-transparent" />
          <div className="absolute top-0 right-0 h-full w-[1] bg-linear-to-b from-[#e8a045]/60 to-transparent" />
        </div>
        {/* Corner BL */}
        <div className="absolute bottom-0 left-0 w-16 h-16">
          <div className="absolute bottom-0 left-0 w-full h-[1] bg-linear-to-r from-[#e8a045]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 h-full w-[1] bg-linear-to-t from-[#e8a045]/60 to-transparent" />
        </div>
        {/* Corner BR */}
        <div className="absolute bottom-0 right-0 w-16 h-16">
          <div className="absolute bottom-0 right-0 w-full h-[1] bg-linear-to-l from-[#e8a045]/60 to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-[1] bg-linear-to-t from-[#e8a045]/60 to-transparent" />
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 text-center px-5 sm:px-10 max-w-5xl mx-auto mt-20"
      >
        {/* Pre-label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-[1] w-8 bg-[#e8a045]/70" />
          <span
            className="text-[#e8a045] text-xs tracking-[0.35em] uppercase font-semibold"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Selamat Datang di Bearasa
          </span>
          <div className="h-[1] w-8 bg-[#e8a045]/70" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 leading-[1.05]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          <span className="block text-white text-[clamp(2.6rem,7vw,5.5rem)] font-bold drop-shadow-2xl">
            Cita Rasa yang
          </span>
          {/* Animated rotating word */}

          <span className="block text-[clamp(2.6rem,7vw,5.5rem)] font-bold relative min-h-[1.1em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="block absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
                style={{
                  background:
                    "linear-gradient(135deg, #e8a045, #f5c97a, #c4692a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 2px 20px rgba(232,160,69,0.4))",
                }}
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Divider ornament */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center gap-3 my-6"
        >
          <div className="h-[1] w-12 bg-linear-to-r from-transparent to-[#e8a045]/60" />
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#e8a045]">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <div className="h-[1] w-12 bg-linear-to-l from-transparent to-[#e8a045]/60" />
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="text-[#d4b896]/85 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          Nikmati pengalaman kuliner istimewa dengan bahan-bahan segar pilihan,
          diracik oleh tangan-tangan berbakat untuk memanjakan setiap selera
          Anda.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <a
            href="#menu"
            className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-full"
          >
            {/* BG fill */}
            <span className="absolute inset-0 rounded-full bg-linear-to-r from-[#c4692a] to-[#e8a045]" />
            {/* Shine sweep */}
            <span className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span
              className="relative text-[#1a0e06] text-sm font-bold tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Lihat Menu
            </span>
            <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#1a0e06]/20 group-hover:bg-[#1a0e06]/30 transition-colors">
              <svg
                className="w-3.5 h-3.5 text-[#1a0e06] group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#reservasi"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#e8a045]/50 hover:border-[#e8a045] hover:bg-[#e8a045]/8 transition-all duration-300"
          >
            <span className="relative flex items-center justify-center w-7 h-7 rounded-full border border-[#e8a045]/50 group-hover:border-[#e8a045] transition-colors">
              <svg
                className="w-3.5 h-3.5 text-[#e8a045]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </span>
            <span
              className="text-[#e8a045] text-sm font-bold tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Pesan Sekarang
            </span>
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="flex items-center justify-center gap-8 sm:gap-12 mt-14"
        >
          {[
            { value: "120+", label: "Menu Pilihan" },
            { value: "8th", label: "Tahun Berdiri" },
            { value: "4.9★", label: "Rating Tamu" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span
                className="text-[#e8a045] text-xl sm:text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </span>
              <span
                className="text-[#d4b896]/60 text-[0.6rem] tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span
          className="text-[#e8a045]/50 text-[0.55rem] tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Gulir
        </span>
        <div className="w-[1] h-10 bg-linear-to-b from-[#e8a045]/50 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-[#e8a045]"
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div> */}
    </section>
  );
}
