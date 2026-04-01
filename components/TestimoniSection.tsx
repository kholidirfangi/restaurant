"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface Testimoni {
  id: number;
  name: string;
  role: string;
  platform: string;
  avatar: string;
  text: string;
  rating: number;
  date: string;
}

const FEATURED: Testimoni = {
  id: 0,
  name: "Sari Dewi",
  role: "Food Blogger · Jakarta",
  platform: "Google",
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
  text: "Bearasa bukan sekadar restoran — ini adalah perjalanan rasa yang membawa saya kembali ke masa kecil. Rendang wagyu mereka adalah yang terbaik yang pernah saya cicipi di seluruh Indonesia.",
  rating: 5,
  date: "",
};

const REVIEWS: Testimoni[] = [
  { id: 1, name: "Rudi Hartono", role: "", platform: "Karyawan Swasta", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop", text: "Soto Betawi di sini bikin saya lupa diet. Kuahnya kaya, dagingnya empuk, dan porsinya besar. Sudah 3 tahun jadi langganan tetap!", rating: 5, date: "2 minggu lalu" },
  { id: 2, name: "Maya Kusuma", role: "", platform: "Mahasiswa", avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=100&auto=format&fit=crop", text: "Suasananya hangat dan nyaman banget buat keluarga. Klepon lava cake-nya anak-anak suka banget! Pasti balik lagi bawa teman-teman.", rating: 5, date: "1 bulan lalu" },
  { id: 3, name: "Bram Setiawan", role: "", platform: "Karyawan", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop", text: "Pelayanannya luar biasa ramah. Jamu rempah Bearasa jadi favorit saya untuk mengakhiri makan malam. Rasanya autentik dan menghangatkan.", rating: 5, date: "3 minggu lalu" },
  { id: 4, name: "Nita Rahayu", role: "", platform: "Guru", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", text: "Makan di sini terasa seperti pulang ke rumah. Nasi goreng kampoeng-nya sederhana tapi kaya rasa — persis masakan ibu saya dulu.", rating: 5, date: "5 hari lalu" },
  { id: 5, name: "Dito Permana", role: "", platform: "CEO", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop", text: "Tempat terbaik untuk business dinner. Private dining-nya elegan, menunya beragam, dan staf sangat profesional. Klien saya sangat terkesan.", rating: 5, date: "2 bulan lalu" },
  { id: 6, name: "Lina Wulandari", role: "", platform: "Dosen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop", text: "Es cendol duriannya surgawi! Setiap kali ke Bearasa saya selalu pesan ini sebagai penutup. Tidak ada duanya di kota ini.", rating: 5, date: "1 minggu lalu" },
];

const STATS = [
  { value: "4.9", label: "Rating Google" },
  { value: "2.400+", label: "Ulasan Positif" },
  { value: "98%", label: "Tamu Puas" },
  { value: "15K+", label: "Pengunjung / Bulan" },
];

const BORDER = "1px solid rgba(232,160,69,0.12)";

function Stars() {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[0,1,2,3,4].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" style={{ fill: "#e8a045" }}>
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
        </svg>
      ))}
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ReviewCard({ item, delay }: { item: Testimoni; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "#160b04",
        border: BORDER,
        borderRadius: "12px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        cursor: "default",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
      }}
    >
      <Stars />

      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic",
        fontSize: "0.92rem",
        color: "#d4b896",
        lineHeight: 1.7,
        marginTop: "1rem",
        marginBottom: "1.25rem",
        flex: 1,
        paddingLeft: "1rem",
        position: "relative",
      }}>
        <span style={{
          position: "absolute",
          left: 0,
          top: "-0.1em",
          fontSize: "1.4rem",
          lineHeight: 1,
          color: "rgba(232,160,69,0.3)",
        }}>{`"`}</span>
        {item.text}
      </p>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.85rem",
        paddingTop: "1rem",
        borderTop: BORDER,
      }}>
        <div style={{
          position: "relative",
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          border: "1.5px solid rgba(232,160,69,0.25)",
        }}>
          <Image src={item.avatar} fill alt={item.name} style={{ objectFit: "cover" }} />
        </div>
        <div>
          <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#fff" }}>
            {item.name}
          </div>
          <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(212,184,150,0.5)", marginTop: "2px" }}>
            {item.platform}
          </div>
        </div>
        {item.date && (
          <div style={{ marginLeft: "auto", fontFamily: "'Raleway',sans-serif", fontSize: "0.6rem", color: "rgba(212,184,150,0.35)", whiteSpace: "nowrap" }}>
            {item.date}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function TestimoniSection() {
  return (
    <section id="testimoni" style={{ position: "relative", padding: "7rem 0", overflow: "hidden", background: "#0d0700" }}>

      {/* BG glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(196,105,42,0.09) 0%, transparent 60%)" }} />

      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "180px",
      }} />

      {/* Top / bottom HR */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(232,160,69,0.18) 20%, rgba(232,160,69,0.18) 80%, transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(232,160,69,0.18) 20%, rgba(232,160,69,0.18) 80%, transparent)" }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 mb-5">
            <div className="h-px w-7 bg-[rgba(232,160,69,0.6)]" />
            <span style={{ fontFamily: "'Raleway',sans-serif", color: "#e8a045", fontSize: "0.62rem", letterSpacing: "0.38em", textTransform: "uppercase", fontWeight: 700 }}>
              Kata Mereka
            </span>
            <div className="h-px w-7 bg-[rgba(232,160,69,0.6)]" />
          </div>
          <h2 className="mb-3" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
            Cerita{" "}
            <em style={{ fontStyle: "italic", background: "linear-gradient(135deg,#e8a045,#f5c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Nyata
            </em>{" "}
            dari Tamu Kami
          </h2>
          <p style={{ fontFamily: "'Raleway',sans-serif", color: "rgba(212,184,150,0.55)", fontSize: "0.9rem", maxWidth: "380px", margin: "0 auto", lineHeight: 1.75 }}>
            Setiap pujian adalah motivasi kami untuk terus menyajikan yang terbaik.
          </p>
        </Reveal>

        {/* Featured quote */}
        <Reveal delay={0.1} className="max-w-3xl mx-auto mb-20">
          <div style={{ position: "relative", textAlign: "center", padding: "2.5rem 3rem" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 56, height: 56, borderTop: "1px solid rgba(232,160,69,0.35)", borderLeft: "1px solid rgba(232,160,69,0.35)" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 56, height: 56, borderBottom: "1px solid rgba(232,160,69,0.35)", borderRight: "1px solid rgba(232,160,69,0.35)" }} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "5rem", lineHeight: 0.6, color: "rgba(232,160,69,0.15)", display: "block", marginBottom: "1rem" }}>{`"`}</span>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(1.05rem,2.5vw,1.35rem)", color: "#fff", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              {FEATURED.text}
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div style={{ position: "relative", width: 44, height: 44, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(232,160,69,0.35)", flexShrink: 0 }}>
                <Image src={FEATURED.avatar} fill alt={FEATURED.name} style={{ objectFit: "cover" }} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#e8a045", fontSize: "0.9rem" }}>{FEATURED.name}</div>
                <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,184,150,0.5)", marginTop: 2 }}>{FEATURED.role}</div>
              </div>
              <div className="sm:ml-4"><Stars /></div>
            </div>
          </div>
        </Reveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {REVIEWS.map((r, i) => (
            <ReviewCard key={r.id} item={r} delay={i * 0.08} />
          ))}
        </div>

        {/* Stats — semua border via inline style, zero Tailwind pseudo-class */}
        <Reveal delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: BORDER, borderRadius: "12px", overflow: "hidden" }}
               className="grid-cols-2 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "1.75rem 1rem",
                  borderRight: i < 3 ? BORDER : "none",
                }}
              >
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: "#e8a045", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,184,150,0.55)", marginTop: "0.4rem" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}