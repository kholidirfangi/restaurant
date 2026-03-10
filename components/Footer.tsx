"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const NAV_LINKS = ["Home", "Tentang Kami", "Menu", "Testimoni", "Reservasi"];
const NAV_HREFS = ["#home", "#about", "#menu", "#testimoni", "#reservasi"];

const MENU_ITEMS = [
  "Nusantara Platter",
  "Soto Betawi",
  "Nasi Goreng Kampoeng",
  "Klepon Lava Cake",
  "Jamu Rempah",
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#080400] overflow-hidden">
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_20%_20%,rgba(196,105,42,0.07)_0%,transparent_60%)]" />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-size-[180px_180px]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── CTA STRIP ── */}
      <Reveal>
        <div className="relative text-center py-[4.5rem_4rem] px-6 border-t border-[rgba(232,160,69,0.15)]">
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(232,160,69,0.4)_30%,rgba(232,160,69,0.4)_70%,transparent)]" />

          <div className="inline-flex items-center gap-[10] mb-5">
            <div className="h-px w-6 bg-[rgba(232,160,69,0.5)]" />
            <span className="font-[Raleway] text-[#e8a045] text-[0.6rem] tracking-[0.38em] uppercase font-bold">
              Kunjungi Kami
            </span>
            <div className="h-px w-6 bg-[rgba(232,160,69,0.5)]" />
          </div>

          <h2 className="font-[Playfair_Display] text-[clamp(1.8rem,4.5vw,3rem)] font-bold text-white leading-[1.15] mb-5">
            Siap Merasakan{" "}
            <em className="italic bg-[linear-gradient(135deg,#e8a045,#f5c97a)] bg-clip-text text-transparent">
              Pengalaman
            </em>
            <br />
            Kuliner Terbaik?
          </h2>

          <p className="font-[Raleway] text-[rgba(212,184,150,0.45)] text-[0.9rem] max-w-[400] mx-auto mb-9 leading-[1.75]">
            Reservasi meja Anda sekarang dan dapatkan pengalaman makan malam
            yang tak terlupakan bersama orang-orang tersayang.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* Primary */}
            <a
              href="#reservasi"
              className="group relative inline-flex items-center px-[30] py-[13] rounded-full overflow-hidden no-underline"
            >
              <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#c4692a,#e8a045)]" />
              <span className="absolute inset-0 rounded-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.2),transparent)] -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative font-[Raleway] text-[#1a0e06] text-[0.72rem] font-bold tracking-[0.15em] uppercase">
                Pesan Sekarang
              </span>
            </a>

            {/* Secondary */}
            <a
              href="#menu"
              className="inline-flex items-center px-[30] py-[13] rounded-full no-underline border border-[rgba(232,160,69,0.45)] font-[Raleway] text-[#e8a045] text-[0.72rem] font-bold tracking-[0.15em] uppercase hover:bg-[rgba(232,160,69,0.1)] hover:border-[#e8a045] transition-all duration-300"
            >
              Lihat Menu
            </a>
          </div>
        </div>
      </Reveal>

      {/* ── MAIN GRID ── */}
      <div className="w-full px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-14 border-b border-[rgba(232,160,69,0.1)]">
          {/* Brand col */}
          <Reveal delay={0.05} className="sm:col-span-2 lg:col-span-1">
            <a
              href="#home"
              className="inline-flex items-center gap-[10] no-underline mb-5"
            >
              <div className="w-10 h-10 rounded-full shrink-0 relative bg-[linear-gradient(135deg,#e8a045,#c4692a)] flex items-center justify-center shadow-[0_4px_16px_rgba(196,105,42,0.35)]">
                <div className="absolute inset-[3] rounded-full bg-[#080400]" />
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#e8a045"
                  className="relative z-10"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.74 1.54 5.12 3.8 6.37L8 18h8l-.8-2.63C17.46 14.12 19 11.74 19 9c0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5 0 2.05-1.23 3.8-3 4.58V13H10v-1.42C8.23 10.8 7 9.05 7 7c0-2.76 2.24-5 5-5zM9 19h6v1H9v-1zm1 2h4v1h-4v-1z" />
                </svg>
              </div>
              <div>
                <div className="font-[Playfair_Display] text-[1.3rem] font-bold text-[#e8a045] tracking-[0.06em]">
                  bearasa
                </div>
                <div className="font-[Raleway] text-[0.48rem] tracking-[0.25em] uppercase text-[rgba(196,105,42,0.7)] font-semibold mt-[1p]">
                  Culinary Experience
                </div>
              </div>
            </a>
            <p className="font-[Raleway] text-[0.82rem] text-[rgba(212,184,150,0.45)] leading-[1.8] mb-6 max-w-[260]">
              Restoran keluarga dengan cita rasa autentik Nusantara. Melayani
              dengan sepenuh hati sejak 2008.
            </p>
            <div className="flex gap-[0.6rem]">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[rgba(232,160,69,0.1)] flex items-center justify-center no-underline text-[rgba(212,184,150,0.45)] hover:border-[rgba(232,160,69,0.4)] hover:bg-[rgba(232,160,69,0.08)] hover:text-[#e8a045] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </Reveal>

          {/* Navigasi */}
          <Reveal delay={0.1}>
            <div className="font-[Raleway] text-[0.62rem] tracking-[0.3em] uppercase text-[#e8a045] font-bold mb-5 pb-3 border-b border-[rgba(232,160,69,0.1)]">
              Navigasi
            </div>
            <ul className="list-none flex flex-col gap-[0.6rem]">
              {NAV_LINKS.map((label, i) => (
                <li key={label}>
                  <a
                    href={NAV_HREFS[i]}
                    className="group flex items-center gap-2 no-underline font-[Raleway] text-[0.82rem] text-[rgba(212,184,150,0.45)] hover:text-[#e8a045] transition-colors duration-200"
                  >
                    <span className="inline-block w-1 h-px bg-[#c4692a] group-hover:w-2 group-hover:bg-[#e8a045] transition-all duration-200" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Menu Favorit */}
          <Reveal delay={0.15}>
            <div className="font-[Raleway] text-[0.62rem] tracking-[0.3em] uppercase text-[#e8a045] font-bold mb-5 pb-3 border-b border-[rgba(232,160,69,0.1)]">
              Menu Favorit
            </div>
            <ul className="list-none flex flex-col gap-[0.6rem]">
              {MENU_ITEMS.map((item) => (
                <li key={item}>
                  <a
                    href="#menu"
                    className="group flex items-center gap-2 no-underline font-[Raleway] text-[0.82rem] text-[rgba(212,184,150,0.45)] hover:text-[#e8a045] transition-colors duration-200"
                  >
                    <span className="inline-block w-1 h-px bg-[#c4692a] group-hover:w-2 group-hover:bg-[#e8a045] transition-all duration-200" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Kontak */}
          <Reveal delay={0.2}>
            <div className="font-[Raleway] text-[0.62rem] tracking-[0.3em] uppercase text-[#e8a045] font-bold mb-5 pb-3 border-b border-[rgba(232,160,69,0.1)]">
              Hubungi Kami
            </div>

            {[
              {
                icon: (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e8a045"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
                label: "Alamat",
                value: "Jl. Rasa Sejati No. 17\nJakarta Selatan, 12430",
              },
              {
                icon: (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e8a045"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                ),
                label: "Telepon",
                value: "+62 21 8888 1708",
              },
              {
                icon: (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e8a045"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                label: "Email",
                value: "halo@bearasa.id",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-[0.85rem] mb-4"
              >
                <div className="w-8 h-8 rounded-full bg-[rgba(232,160,69,0.08)] border border-[rgba(232,160,69,0.1)] flex items-center justify-center shrink-0 mt-[1]">
                  {c.icon}
                </div>
                <div>
                  <div className="font-[Raleway] text-[0.58rem] tracking-[0.2em] uppercase text-[rgba(212,184,150,0.45)] mb-[2]">
                    {c.label}
                  </div>
                  <div className="font-[Raleway] text-[0.82rem] text-[#d4b896] whitespace-pre-line">
                    {c.value}
                  </div>
                </div>
              </div>
            ))}

            {/* Hours badge */}
            <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 border border-[rgba(232,160,69,0.2)] rounded-full bg-[rgba(232,160,69,0.05)]">
              <div className="w-[7] h-[7] rounded-full bg-[#4ade80] shadow-[0_0_6px_rgba(74,222,128,0.6)] shrink-0" />
              <span className="font-[Raleway] text-[0.6rem] text-[rgba(212,184,150,0.45)] tracking-[0.05em]">
                <strong className="text-[#d4b896]">Buka Setiap Hari</strong> ·
                10.00 – 22.00 WIB
              </span>
            </div>
          </Reveal>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="flex items-center justify-between py-6 gap-4 flex-wrap">
          <p className="font-[Raleway] text-[0.68rem] text-[rgba(212,184,150,0.45)] tracking-[0.05em]">
            © 2025 <span className="text-[rgba(232,160,69,0.5)]">Bearasa</span>.
            Seluruh hak cipta dilindungi.
          </p>
          <div className="flex gap-6">
            {["Kebijakan Privasi", "Syarat & Ketentuan"].map((l) => (
              <a
                key={l}
                href="#"
                className="font-[Raleway] text-[0.65rem] text-[rgba(212,184,150,0.45)] no-underline tracking-[0.05em] hover:text-[#e8a045] transition-colors duration-200"
              >
                {l}
              </a>
            ))}
          </div>
          <a
            href="#home"
            aria-label="Kembali ke atas"
            className="w-9 h-9 rounded-full border border-[rgba(232,160,69,0.1)] flex items-center justify-center no-underline text-[rgba(212,184,150,0.45)] hover:border-[rgba(232,160,69,0.4)] hover:bg-[rgba(232,160,69,0.08)] transition-all duration-200"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
