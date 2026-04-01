"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const LOCATION = {
  address: "Jl. Rasa Sejati No. 17",
  city: "Jakarta Selatan, 12430",
  phone: "+62 21 8888 1708",
  email: "halo@bearasa.id",
  googleMapsUrl:
    "https://maps.google.com/?q=Jl.+Rasa+Sejati+No.17+Jakarta+Selatan",
  wazeUrl: "https://waze.com/ul?ll=-6.2566,106.8227&navigate=yes",
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521160782961!2d106.81519731476897!3d-6.211080395492816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f41b13a0f0b7%3A0x0!2sJl.+Rasa+Sejati+No.17%2C+Jakarta+Selatan!5e0!3m2!1sid!2sid!4v1680000000000!5m2!1sid!2sid",
};

const HOURS = [
  { day: "Senin – Jumat", time: "10.00 – 22.00" },
  { day: "Sabtu", time: "09.00 – 23.00" },
  { day: "Minggu", time: "09.00 – 22.00" },
  { day: "Hari Libur", time: "10.00 – 21.00" },
];

// ─── Icons ───────────────────────────────────────────────────────────────────

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-7-6.75-7-11a7 7 0 0 1 14 0c0 4.25-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 15.5" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1l-1.3 1.3a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9z" />
    </svg>
  );
}

function NavigationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  );
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.15 },
  },
};

// ─── InfoRow ─────────────────────────────────────────────────────────────────

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  delay?: number;
}

function InfoRow({ icon, label, children, delay = 0 }: InfoRowProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE, delay },
        },
      }}
      className="flex items-start gap-4"
    >
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-700/30 bg-amber-700/10">
        {icon}
      </div>
      <div>
        <p className="mb-1 text-[10px] font-medium uppercase tracking-[2px] text-amber-500">
          {label}
        </p>
        {children}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LocationMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="lokasi"
      ref={sectionRef}
      className="bg-[#faf7f2] py-20 md:py-28"
    >
      {/* ── Section Header ── */}
      <div className="mx-auto mb-14 max-w-xl px-6 text-center">
        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
          }}
          className="mb-3 text-[11px] font-medium uppercase tracking-[3px] text-amber-600"
        >
          Temukan Kami
        </motion.p>

        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.1 } },
          }}
          className="font-playfair mb-3 text-4xl font-normal leading-tight text-stone-900 md:text-5xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Kunjungi{" "}
          <em className="italic text-amber-600">Bearasa</em>
        </motion.h2>

        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.2 } },
          }}
          className="text-[15px] font-light text-stone-500"
        >
          Kami menunggu Anda di jantung Jakarta Selatan
        </motion.p>
      </div>

      {/* ── Card ── */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-2xl shadow-2xl shadow-stone-900/10 lg:grid lg:grid-cols-2">
          
          {/* ── Map Side ── */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeLeft}
            className="relative min-h-[300] bg-stone-200 lg:min-h-[480]"
          >
            {/* Badge overlay */}
            <div className="absolute left-4 top-4 z-10 rounded-full bg-stone-900/90 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[2px] text-stone-100 backdrop-blur-sm">
              Bearasa Restaurant
            </div>

            <iframe
              src={LOCATION.embedSrc}
              className="h-full min-h-[300] w-full border-0 lg:min-h-[480]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Bearasa Restaurant"
            />
          </motion.div>

          {/* ── Info Side ── */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeRight}
            className="flex min-h-[480px] flex-col bg-stone-900 px-10 py-12 md:px-12 md:py-14"
          >
            {/* Brand header */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.2 } },
              }}
              className="mb-8 border-b border-stone-800 pb-8"
            >
              <h3
                className="mb-1 text-[26px] font-normal leading-none text-stone-100"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Bearasa
              </h3>
              <p className="text-[10px] font-medium uppercase tracking-[2.5px] text-amber-500">
                Culinary Experience
              </p>
            </motion.div>

            {/* Info rows — grow to fill space */}
            <div className="flex flex-1 flex-col gap-7">
              {/* Address */}
              <InfoRow
                icon={<PinIcon className="h-4 w-4 text-amber-500" />}
                label="Alamat"
                delay={0.28}
              >
                <p className="text-[13px] font-light leading-relaxed text-stone-300">
                  {LOCATION.address}, {LOCATION.city}
                </p>
              </InfoRow>

              {/* Hours */}
              <InfoRow
                icon={<ClockIcon className="h-4 w-4 text-amber-500" />}
                label="Jam Operasional"
                delay={0.36}
              >
                <div className="mt-1 flex flex-col gap-2">
                  {HOURS.map(({ day, time }) => (
                    <div key={day} className="flex items-center justify-between text-[13px] font-light">
                      <span className="text-stone-500 mr-8">{day}</span>
                      <span className="tabular-nums text-stone-300">{time}</span>
                    </div>
                  ))}
                </div>
              </InfoRow>

              {/* Phone */}
              <InfoRow
                icon={<PhoneIcon className="h-4 w-4 text-amber-500" />}
                label="Telepon"
                delay={0.44}
              >
                <a
                  href={`tel:${LOCATION.phone.replace(/\s/g, "")}`}
                  className="text-[13px] font-light text-stone-300 transition-colors hover:text-amber-400"
                >
                  {LOCATION.phone}
                </a>
              </InfoRow>
            </div>

            {/* CTA Buttons — pinned to bottom */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.52 } },
              }}
              className="mt-8 flex flex-wrap gap-3 border-t border-stone-800 pt-8"
            >
              <a
                href={LOCATION.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-amber-500 active:scale-[0.98]"
              >
                <PinIcon className="h-3.5 w-3.5" />
                Buka di Google Maps
              </a>
              <a
                href={LOCATION.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-stone-700 px-5 py-2.5 text-[13px] font-light text-stone-400 transition-colors hover:border-stone-500 hover:text-stone-100 active:scale-[0.98]"
              >
                <NavigationIcon className="h-3.5 w-3.5" />
                Waze
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Bottom ambient decorative strip ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 h-px w-1/3 origin-center bg-linear-to-r from-transparent via-amber-700/40 to-transparent"
        />
      </div>
    </section>
  );
}