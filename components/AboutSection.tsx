"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ── Reusable reveal wrapper
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 28 : 0,
    x: direction === "left" ? -32 : direction === "right" ? 32 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const VALUES = [
  {
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.02 12.02l.707.707M1 12h2m18 0h2M4.22 19.78l.707-.707M18.95 5.05l-.707.707M12 7a5 5 0 100 10A5 5 0 0012 7z"
        />
      </svg>
    ),
    title: "Bahan Segar Setiap Hari",
    desc: "Kami memilih bahan langsung dari petani lokal dan pasar tradisional setiap pagi.",
  },
  {
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    title: "Resep Turun-Temurun",
    desc: "Bumbu rahasia kami diwariskan tiga generasi, dijaga keasliannya hingga hari ini.",
  },
  {
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Kehangatan Keluarga",
    desc: "Setiap tamu adalah bagian dari keluarga besar Bearasa yang kami jaga dengan sepenuh hati.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 overflow-hidden bg-[#0d0700]">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600] h-[500] bg-[radial-linear(ellipse,rgba(196,105,42,0.08)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-[400] h-[400] bg-[radial-linear(ellipse,rgba(232,160,69,0.05)_0%,transparent_60%)]" />
      </div>
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />
      {/* HR lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[rgba(232,160,69,0.18)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[rgba(232,160,69,0.18)] to-transparent" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* ── LEFT: IMAGE COLLAGE ── */}
          <Reveal direction="left">
            <div
              className="relative mx-auto max-w-[480] w-full"
              style={{ aspectRatio: "4/5" }}
            >
              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-[60%] aspect-square border border-[rgba(232,160,69,0.2)] rounded-sm pointer-events-none" />

              {/* Main image */}
              <div className="absolute top-0 left-0 right-[10%] bottom-[10%] rounded-sm overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <Image
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop"
                  fill
                  alt="Chef Bearasa memasak"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-br from-[rgba(13,7,0,0.2)] via-transparent to-[rgba(13,7,0,0.3)]" />
              </div>

              {/* Accent image */}
              <div className="absolute bottom-0 right-0 w-[52%] aspect-square rounded-sm overflow-hidden border-[3px] border-[#0d0700] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image
                  src="https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=600&auto=format&fit=crop"
                  fill
                  alt="Hidangan Bearasa"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-tl from-[rgba(232,160,69,0.15)] to-transparent" />
              </div>

              {/* Year badge */}
              <div className="absolute top-1/2 -left-8 -translate-y-1/2 w-[72] h-[72] rounded-full bg-linear-to-br from-[#c4692a] to-[#e8a045] shadow-[0_8px_30px_rgba(196,105,42,0.4)] hidden flex-col items-center justify-center z-10 sm:flex">
                <span
                  className="text-[#1a0e06] font-bold leading-none"
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.3rem",
                  }}
                >
                  17
                </span>
                <span
                  className="text-[#1a0e06]/75 font-semibold"
                  style={{
                    fontSize: "0.42rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  tahun
                </span>
              </div>
            </div>
          </Reveal>

          {/* ── RIGHT: CONTENT ── */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <Reveal delay={0.1}>
              <div className="inline-flex items-center gap-2.5 mb-5">
                <div className="h-px w-7 bg-[rgba(232,160,69,0.6)]" />
                <span
                  className="text-[#e8a045] text-[0.62rem] tracking-[0.38em] uppercase font-bold"
                  style={{ fontFamily: "'Raleway',sans-serif" }}
                >
                  Tentang Kami
                </span>
              </div>
            </Reveal>

            {/* Title */}
            <Reveal delay={0.2}>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2rem,4.5vw,3rem)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.15,
                }}
              >
                Dapur Penuh Cinta,{" "}
                <em className="block not-italic bg-[linear-gradient(135deg,#e8a045,#f5c97a)] bg-clip-text text-transparent">
                  Sejak 2008
                </em>
              </h2>
            </Reveal>

            {/* Lead quote */}
            <Reveal delay={0.25}>
              <p
                className="border-l-2 border-[rgba(232,160,69,0.4)] pl-5 mb-5 italic"
                style={{
                  fontFamily: "'Raleway',sans-serif",
                  fontSize: "1rem",
                  color: "#d4b896",
                  lineHeight: 1.8,
                }}
              >
                {`"Bearasa lahir dari satu keyakinan sederhana — makanan terbaik
                adalah yang dimasak dengan hati."`}
              </p>
            </Reveal>

            {/* Body */}
            <Reveal delay={0.3}>
              <p
                className="mb-8"
                style={{
                  fontFamily: "'Raleway',sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(212,184,150,0.6)",
                  lineHeight: 1.85,
                }}
              >
                Bermula dari warung kecil di sudut kota, Bearasa tumbuh menjadi
                restoran keluarga yang dipercaya ribuan pelanggan setia. Kami
                percaya bahwa setiap hidangan adalah cerita — tentang tanah yang
                menumbuhkan bahan, tangan yang meramu bumbu, dan meja yang
                menyatukan keluarga.
              </p>
            </Reveal>

            {/* Values */}
            <div className="flex flex-col gap-4 mb-10">
              {VALUES.map((v, i) => (
                <Reveal key={i} delay={0.35 + i * 0.1}>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-9 h-9 rounded-full bg-[rgba(232,160,69,0.1)] border border-[rgba(232,160,69,0.25)] flex items-center justify-center mt-0.5 text-[#e8a045]">
                      {v.icon}
                    </div>
                    <div>
                      <h4
                        className="text-white font-bold mb-1"
                        style={{
                          fontFamily: "'Raleway',sans-serif",
                          fontSize: "0.82rem",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {v.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "'Raleway',sans-serif",
                          fontSize: "0.78rem",
                          color: "rgba(212,184,150,0.6)",
                          lineHeight: 1.65,
                        }}
                      >
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Chef signature */}
            <Reveal delay={0.65}>
              <div className="flex items-center gap-4 pt-6 border-t border-[rgba(232,160,69,0.12)]">
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-[rgba(232,160,69,0.3)] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1607631568010-a87245c0daf8?q=80&w=200&auto=format&fit=crop"
                    fill
                    alt="Chef Bearasa"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div
                    className="text-white font-bold"
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "0.95rem",
                    }}
                  >
                    Budi Santoso
                  </div>
                  <div
                    className="text-[#c4692a] font-semibold mt-0.5"
                    style={{
                      fontFamily: "'Raleway',sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                    }}
                  >
                    Executive Chef & Pendiri
                  </div>
                </div>
                <div
                  className="ml-auto"
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontStyle: "italic",
                    fontSize: "1.6rem",
                    color: "rgba(232,160,69,0.35)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Bearasa
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
