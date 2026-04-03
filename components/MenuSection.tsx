/* eslint-disable react-hooks/refs */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MENU_ITEMS, FILTERS, BADGE_STYLE, type MenuItem } from "@/lib/menuData";

// ── Scroll reveal hook
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Card component
function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative rounded-2xl overflow-hidden bg-[#160c04] border border-[rgba(232,160,69,0.12)] hover:border-[rgba(232,160,69,0.35)] transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer ${
        item.featured ? "sm:col-span-2 sm:flex" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden shrink-0 ${item.featured ? "sm:w-[55%] h-56 sm:h-auto" : "h-48"}`}
      >
        <Image
          width={500}
          height={500}
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[rgba(13,7,0,0.9)]" />
        {item.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[0.55rem] font-bold tracking-[0.2em] uppercase ${BADGE_STYLE[item.badge.type]}`}
          >
            {item.badge.label}
          </span>
        )}
        <span
          className="absolute bottom-3 right-3 font-bold text-[#e8a045] drop-shadow-lg"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.05rem",
          }}
        >
          {item.price}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col p-5 flex-1">
        <div className="text-[0.58rem] font-semibold tracking-[0.25em] uppercase text-[#c4692a] mb-1.5">
          {item.category}
        </div>
        <h3
          className="text-white font-bold mb-2 leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem",
          }}
        >
          {item.name}
        </h3>
        <p className="text-[rgba(212,184,150,0.6)] text-[0.78rem] leading-relaxed mb-auto line-clamp-2">
          {item.desc}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3.5 mt-4 border-t border-[rgba(232,160,69,0.1)]">
          <div className="flex gap-1.5 flex-wrap">
            {item.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full bg-[rgba(232,160,69,0.08)] border border-[rgba(232,160,69,0.15)] text-[rgba(212,184,150,0.6)] text-[0.52rem] tracking-[0.15em] uppercase"
              >
                {t}
              </span>
            ))}
          </div>
          <button
            className="group/btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[rgba(232,160,69,0.45)] text-[#e8a045] text-[0.6rem] font-bold tracking-[0.15em] uppercase hover:bg-[rgba(232,160,69,0.12)] hover:border-[#e8a045] transition-all duration-200 whitespace-nowrap"
          >
            Pesan
            <svg
              className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 transition-transform"
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
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main
export default function MenuSection() {
  const [activeFilter, setActiveFilter] = useState("semua");
  const headerReveal = useReveal();
  const filterReveal = useReveal();
  const loadReveal = useReveal();

  const filtered = MENU_ITEMS.filter((item) =>
    item.cats.includes(activeFilter),
  );

  return (
    <section id="menu" className="relative py-24 overflow-hidden bg-[#0d0700]">
      {/* BG radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600] h-[400] bg-[radial-gradient(ellipse,rgba(196,105,42,0.07)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[500] h-[350] bg-[radial-gradient(ellipse,rgba(232,160,69,0.05)_0%,transparent_65%)]" />
      </div>
      {/* Top/bottom HR */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[rgba(232,160,69,0.2)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[rgba(232,160,69,0.2)] to-transparent" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          ref={headerReveal.ref}
          initial={{ opacity: 0, y: 24 }}
          animate={headerReveal.visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2.5 mb-5">
            <div className="h-px w-7 bg-[rgba(232,160,69,0.6)]" />
            <span
              className="text-[#e8a045] text-[0.62rem] tracking-[0.38em] uppercase font-bold"
              style={{ fontFamily: "'Raleway',sans-serif" }}
            >
              Pilihan Kami
            </span>
            <div className="h-px w-7 bg-[rgba(232,160,69,0.6)]" />
          </div>
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,5vw,3.2rem)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Menu{" "}
            <em className="italic bg-[linear-gradient(135deg,#e8a045,#f5c97a)] bg-clip-text text-transparent">
              Spesial
            </em>{" "}
            Bearasa
          </h2>
          <p
            className="text-[rgba(212,184,150,0.6)] text-sm max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "'Raleway',sans-serif" }}
          >
            Setiap hidangan diracik dengan teknik memasak terbaik dan
            bahan-bahan segar berkualitas tinggi.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          ref={filterReveal.ref}
          initial={{ opacity: 0, y: 16 }}
          animate={filterReveal.visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-5 py-2 rounded-full border text-[0.68rem] font-bold tracking-[0.18em] uppercase transition-all duration-250 ${
                activeFilter === f.key
                  ? "bg-linear-to-r from-[#c4692a] to-[#e8a045] border-[#e8a045] text-[#1a0e06]"
                  : "border-[rgba(232,160,69,0.15)] text-[rgba(212,184,150,0.6)] hover:text-[#e8a045] hover:border-[rgba(232,160,69,0.35)] bg-transparent"
              }`}
              style={{ fontFamily: "'Raleway',sans-serif" }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load more */}
        <motion.div
          ref={loadReveal.ref}
          initial={{ opacity: 0, y: 16 }}
          animate={loadReveal.visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            className="group inline-flex items-center gap-2.5 px-9 py-3.5 rounded-full border border-[rgba(232,160,69,0.4)] text-[#e8a045] text-[0.72rem] font-bold tracking-[0.18em] uppercase hover:bg-[rgba(232,160,69,0.1)] hover:border-[#e8a045] transition-all duration-300"
            style={{ fontFamily: "'Raleway',sans-serif" }}
          >
            Lihat Semua Menu
            <svg
              className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
