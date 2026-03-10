"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Testimoni", href: "#testimoni" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1a0e06]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* ── LOGO ── */}
            <motion.a
              href="#home"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {/* Emblem */}
              <div className="relative w-11 h-11 shrink-0">
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#e8a045] to-[#c4692a] shadow-lg shadow-amber-900/40" />
                <div className="absolute inset-[3] rounded-full bg-[#1a0e06] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#e8a045]">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 2.74 1.54 5.12 3.8 6.37L8 18h8l-.8-2.63C17.46 14.12 19 11.74 19 9c0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5 0 2.05-1.23 3.8-3 4.58V13H10v-1.42C8.23 10.8 7 9.05 7 7c0-2.76 2.24-5 5-5zM9 19h6v1H9v-1zm1 2h4v1h-4v-1z" />
                  </svg>
                </div>
              </div>

              {/* Wordmark */}
              <div className="flex flex-col leading-none">
                <span
                  className="text-[1.45rem] font-bold tracking-wide text-[#e8a045]"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    letterSpacing: "0.06em",
                  }}
                >
                  bearasa
                </span>
                <span
                  className="text-[0.55rem] tracking-[0.25em] uppercase text-[#c4692a]/80 font-medium"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Culinary Experience
                </span>
              </div>
            </motion.a>

            {/* ── DESKTOP NAV ── */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setActiveLink(link.label)}
                    className="relative px-5 py-2 group flex flex-col items-center"
                  >
                    <span
                      className={`text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                        activeLink === link.label
                          ? "text-[#e8a045]"
                          : "text-[#d4b896] group-hover:text-[#e8a045]"
                      }`}
                      style={{
                        fontFamily: "'Raleway', sans-serif",
                        letterSpacing: "0.18em",
                      }}
                    >
                      {link.label}
                    </span>

                    {/* Animated underline */}
                    <motion.span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-linear-to-r from-transparent via-[#e8a045] to-transparent rounded-full"
                      initial={false}
                      animate={{
                        width: activeLink === link.label ? "60%" : "0%",
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />

                    {/* Hover underline */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] w-0 group-hover:w-[60%] bg-linear-to-r from-transparent via-[#e8a045]/50 to-transparent transition-all duration-300 rounded-full" />
                  </a>
                </motion.li>
              ))}

              {/* CTA Button */}
              <motion.li
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="ml-4"
              >
                <Link
                  href="#reservasi"
                  className="relative inline-flex items-center gap-2 px-6 py-2.5 overflow-hidden group"
                >
                  <span className="absolute inset-0 rounded-full border border-[#e8a045]/60 group-hover:border-[#e8a045] transition-colors duration-300" />
                  <span className="absolute inset-0 rounded-full bg-[#e8a045]/0 group-hover:bg-[#e8a045]/10 transition-colors duration-300" />
                  <span
                    className="relative text-sm font-semibold tracking-widest uppercase text-[#e8a045]"
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                      letterSpacing: "0.15em",
                    }}
                  >
                    Pesan
                  </span>
                  <svg
                    className="relative w-3.5 h-3.5 text-[#e8a045] group-hover:translate-x-0.5 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </motion.li>
            </ul>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5] z-50"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-[1.5px] bg-[#e8a045] rounded-full origin-center"
                  animate={
                    menuOpen
                      ? i === 0
                        ? { rotate: 45, y: 6.5, width: "24px" }
                        : i === 1
                          ? { opacity: 0, width: "24px" }
                          : { rotate: -45, y: -6.5, width: "24px" }
                      : {
                          rotate: 0,
                          y: 0,
                          opacity: 1,
                          width: i === 1 ? "16px" : "24px",
                        }
                  }
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Bottom border glow when scrolled */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1] bg-linear-to-r from-transparent via-[#e8a045]/30 to-transparent"
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#0d0700]/95 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-[75%] max-w-xs bg-[#160b04] border-l border-[#e8a045]/15 flex flex-col"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-7 pt-7 pb-10">
                <span
                  className="text-[#e8a045]/50 text-xs tracking-[0.3em] uppercase"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Navigasi
                </span>
                <div className="w-8 h-[1] bg-[#e8a045]/30" />
              </div>

              {/* Links */}
              <nav className="flex flex-col px-7 gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                    onClick={() => {
                      setActiveLink(link.label);
                      setMenuOpen(false);
                    }}
                    className={`group flex items-center gap-4 py-4 border-b border-[#e8a045]/10 last:border-0 transition-colors duration-200 ${
                      activeLink === link.label
                        ? "text-[#e8a045]"
                        : "text-[#c4a882] hover:text-[#e8a045]"
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${
                        activeLink === link.label
                          ? "bg-[#e8a045] scale-150"
                          : "bg-[#e8a045]/30 group-hover:bg-[#e8a045]"
                      }`}
                    />
                    <span
                      className="text-lg font-medium tracking-widest uppercase"
                      style={{
                        fontFamily: "'Raleway', sans-serif",
                        letterSpacing: "0.2em",
                      }}
                    >
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="px-7 py-10"
              >
                <a
                  href="#reservasi"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-3.5 border border-[#e8a045]/60 rounded-full hover:bg-[#e8a045]/10 transition-colors duration-300 group"
                >
                  <span
                    className="text-sm font-bold tracking-[0.2em] uppercase text-[#e8a045]"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    Reservasi Sekarang
                  </span>
                  <svg
                    className="w-4 h-4 text-[#e8a045] group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </motion.div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                <div className="absolute -top-8 -right-8 w-16 h-16 border border-[#e8a045]/20 rotate-45" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
