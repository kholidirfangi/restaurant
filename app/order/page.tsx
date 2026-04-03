"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  MENU_ITEMS,
  FILTERS,
  BADGE_STYLE,
  parseHarga,
  formatRupiah,
  type MenuItem,
} from "@/lib/menuData";

// ── Types
interface CartItem extends MenuItem {
  qty: number;
}

// ── Nomor WA Admin
const NOMOR_WA_ADMIN = "6281325913225"; // ← Ganti nomor WA admin

// ─────────────────────────────────────────────
// LEFT PANEL — Menu List
// ─────────────────────────────────────────────
function MenuPanel({
  cart,
  onAdd,
  onIncrease,
  onDecrease,
}: {
  cart: CartItem[];
  onAdd: (item: MenuItem) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}) {
  const [activeFilter, setActiveFilter] = useState("semua");
  const [search, setSearch] = useState("");

  const filtered = MENU_ITEMS.filter(
    (item) =>
      item.cats.includes(activeFilter) &&
      item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const getQty = (id: number) => cart.find((c) => c.id === id)?.qty || 0;

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-5 pt-5 pb-3">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(212,184,150,0.3)]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari menu..."
            className="w-full bg-[#160c04] border border-[rgba(232,160,69,0.12)] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[rgba(212,184,150,0.25)] focus:outline-none focus:border-[rgba(232,160,69,0.4)] transition-colors"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-5 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`shrink-0 px-4 py-1.5 rounded-full border text-[0.65rem] font-bold tracking-[0.15em] uppercase transition-all duration-200 ${
              activeFilter === f.key
                ? "bg-linear-to-r from-[#c4692a] to-[#e8a045] border-[#e8a045] text-[#1a0e06]"
                : "border-[rgba(232,160,69,0.15)] text-[rgba(212,184,150,0.5)] hover:text-[#e8a045] hover:border-[rgba(232,160,69,0.3)]"
            }`}
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-[rgba(232,160,69,0.12)] to-transparent mx-5 mb-3" />

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-3 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[rgba(212,184,150,0.3)] text-sm">
              Menu tidak ditemukan
            </div>
          ) : (
            filtered.map((item, i) => {
              const qty = getQty(item.id);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  className="flex gap-3 bg-[#160c04] border border-[rgba(232,160,69,0.08)] hover:border-[rgba(232,160,69,0.25)] rounded-2xl p-3 transition-colors group"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.badge && (
                      <span
                        className={`absolute top-1 left-1 px-1.5 py-0.5 rounded-full text-[0.48rem] font-bold tracking-wider uppercase ${BADGE_STYLE[item.badge.type]}`}
                      >
                        {item.badge.label}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p
                        className="text-[0.58rem] font-semibold tracking-[0.2em] uppercase text-[#c4692a] mb-0.5"
                        style={{ fontFamily: "'Raleway', sans-serif" }}
                      >
                        {item.category}
                      </p>
                      <h3
                        className="text-white font-bold text-sm leading-snug line-clamp-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.name}
                      </h3>
                      <p className="text-[rgba(212,184,150,0.45)] text-[0.7rem] leading-relaxed line-clamp-2 mt-0.5">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span
                        className="text-[#e8a045] font-bold text-sm"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.price}
                      </span>

                      {/* Add / Counter */}
                      <AnimatePresence mode="wait">
                        {qty === 0 ? (
                          <motion.button
                            key="add"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onAdd(item)}
                            className="flex items-center gap-1 px-3 py-1 rounded-full border border-[rgba(232,160,69,0.4)] text-[#e8a045] text-[0.6rem] font-bold tracking-[0.12em] uppercase hover:bg-[rgba(232,160,69,0.1)] transition-all"
                            style={{ fontFamily: "'Raleway', sans-serif" }}
                          >
                            + Tambah
                          </motion.button>
                        ) : (
                          <motion.div
                            key="counter"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="flex items-center gap-2 bg-[#0d0700] border border-[rgba(232,160,69,0.2)] rounded-full px-1 py-0.5"
                          >
                            <button
                              onClick={() => onDecrease(item.id)}
                              className="w-5 h-5 rounded-full bg-[rgba(232,160,69,0.1)] text-[#e8a045] font-bold text-sm flex items-center justify-center hover:bg-[rgba(232,160,69,0.2)] transition-colors"
                            >
                              −
                            </button>
                            <span className="text-white font-bold text-xs w-4 text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => onIncrease(item.id)}
                              className="w-5 h-5 rounded-full bg-[#e8a045] text-[#0d0700] font-bold text-sm flex items-center justify-center hover:bg-[#f5c97a] transition-colors"
                            >
                              +
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// RIGHT PANEL — Order Summary
// ─────────────────────────────────────────────
function OrderPanel({
  cart,
  nomorMeja,
  onIncrease,
  onDecrease,
  onRemove,
  onSend,
}: {
  cart: CartItem[];
  nomorMeja: string;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  onSend: () => void;
}) {
  const [namaPemesan, setNamaPemesan] = useState("");
  const [catatan, setCatatan] = useState("");

  const totalHarga = cart.reduce(
    (sum, item) => sum + parseHarga(item.price) * item.qty,
    0,
  );
  const totalItem = cart.reduce((sum, item) => sum + item.qty, 0);
  const canSend = cart.length > 0 && namaPemesan.trim() !== "";

  const handleSend = () => {
    if (!canSend) return;

    let pesan = `🍽️ *PESANAN BARU*\n`;
    pesan += `👤 Nama: ${namaPemesan}\n`;
    pesan += `📍 Meja: ${nomorMeja}\n\n`;
    pesan += `*Detail Pesanan:*\n`;
    cart.forEach((item) => {
      pesan += `• ${item.name} x${item.qty} = ${formatRupiah(parseHarga(item.price) * item.qty)}\n`;
    });
    pesan += `\n*Total: ${formatRupiah(totalHarga)}*`;
    if (catatan) pesan += `\n\n📝 Catatan: ${catatan}`;

    window.open(
      `https://wa.me/${NOMOR_WA_ADMIN}?text=${encodeURIComponent(pesan)}`,
      "_blank",
    );
    onSend();
    setNamaPemesan("");
    setCatatan("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[rgba(232,160,69,0.1)]">
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-white font-bold text-base"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Daftar Pesanan
            </h2>
            <p className="text-[rgba(212,184,150,0.4)] text-xs mt-0.5">
              📍 Meja {nomorMeja}
            </p>
          </div>
          {totalItem > 0 && (
            <span className="bg-[rgba(232,160,69,0.12)] border border-[rgba(232,160,69,0.2)] text-[#e8a045] text-xs font-bold px-3 py-1 rounded-full">
              {totalItem} item
            </span>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-hide">
        <AnimatePresence>
          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full py-16 text-center"
            >
              <div className="text-5xl mb-4 opacity-30">🍽️</div>
              <p className="text-[rgba(212,184,150,0.35)] text-sm">
                Belum ada pesanan
              </p>
              <p className="text-[rgba(212,184,150,0.2)] text-xs mt-1">
                Pilih menu dari sebelah kiri
              </p>
            </motion.div>
          ) : (
            <div className="space-y-2.5">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="flex items-center gap-3 bg-[#160c04] border border-[rgba(232,160,69,0.08)] rounded-xl p-2.5"
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-white text-xs font-semibold line-clamp-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.name}
                    </p>
                    <p className="text-[#e8a045] text-xs font-bold">
                      {formatRupiah(parseHarga(item.price) * item.qty)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onDecrease(item.id)}
                      className="w-5 h-5 rounded-full bg-[rgba(232,160,69,0.08)] text-[#e8a045] font-bold text-xs flex items-center justify-center hover:bg-[rgba(232,160,69,0.18)] transition-colors"
                    >
                      −
                    </button>
                    <span className="text-white font-bold text-xs w-4 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onIncrease(item.id)}
                      className="w-5 h-5 rounded-full bg-[#e8a045] text-[#0d0700] font-bold text-xs flex items-center justify-center hover:bg-[#f5c97a] transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-1 text-[rgba(212,184,150,0.2)] hover:text-red-400 transition-colors text-base leading-none"
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Form & Footer */}
      <div className="px-5 pb-5 space-y-3 border-t border-[rgba(232,160,69,0.1)] pt-4">
        {/* Nama Pemesan */}
        <div>
          <label
            className="text-[rgba(212,184,150,0.5)] text-xs mb-1.5 block"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Nama Pemesan <span className="text-[#c4692a]">*</span>
          </label>
          <input
            type="text"
            value={namaPemesan}
            onChange={(e) => setNamaPemesan(e.target.value)}
            placeholder="Masukkan nama kamu"
            className="w-full bg-[#160c04] border border-[rgba(232,160,69,0.12)] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[rgba(212,184,150,0.2)] focus:outline-none focus:border-[rgba(232,160,69,0.45)] transition-colors"
          />
        </div>

        {/* Catatan */}
        <div>
          <label
            className="text-[rgba(212,184,150,0.5)] text-xs mb-1.5 block"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Catatan (opsional)
          </label>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="Contoh: tidak pedas, tanpa bawang..."
            rows={2}
            className="w-full bg-[#160c04] border border-[rgba(232,160,69,0.12)] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[rgba(212,184,150,0.2)] focus:outline-none focus:border-[rgba(232,160,69,0.45)] transition-colors resize-none"
          />
        </div>

        {/* Divider + Total */}
        {cart.length > 0 && (
          <div className="flex items-center justify-between py-2 border-t border-[rgba(232,160,69,0.08)]">
            <span
              className="text-[rgba(212,184,150,0.5)] text-sm"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Total
            </span>
            <motion.span
              key={totalHarga}
              initial={{ scale: 1.1, color: "#f5c97a" }}
              animate={{ scale: 1, color: "#e8a045" }}
              className="font-bold text-lg"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {formatRupiah(totalHarga)}
            </motion.span>
          </div>
        )}

        {/* Send Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSend}
          disabled={!canSend}
          className="w-full bg-[#25d366] disabled:opacity-30 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#20b858] transition-colors"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          📲 Kirim Pesanan via WhatsApp
        </motion.button>

        {!canSend && cart.length > 0 && (
          <p className="text-[rgba(212,184,150,0.3)] text-xs text-center">
            Isi nama pemesan terlebih dahulu
          </p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
function OrderPageContent() {
  const searchParams = useSearchParams();
  const nomorMeja = searchParams.get("meja") || "?";

  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);

  const addItem = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing)
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c,
        );
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const increaseQty = useCallback((id: number) => {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c)),
    );
  }, []);

  const decreaseQty = useCallback((id: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing?.qty === 1) return prev.filter((c) => c.id !== id);
      return prev.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c));
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleSend = useCallback(() => {
    setCart([]);
    setShowMobileCart(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  }, []);

  const totalItem = cart.reduce((sum, c) => sum + c.qty, 0);

  return (
    <div className="h-screen bg-[#0d0700] flex flex-col overflow-hidden">
      {/* Top Bar */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-[rgba(232,160,69,0.12)] bg-[#0d0700]/95 backdrop-blur-md z-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#c4692a] to-[#e8a045] flex items-center justify-center">
            <span className="text-[#0d0700] text-xs font-black">B</span>
          </div>
          <div>
            <h1
              className="text-white font-bold text-sm leading-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              bearasa
            </h1>
            <p className="text-[rgba(212,184,150,0.4)] text-[0.6rem] tracking-widest uppercase mt-0.5">
              Meja {nomorMeja}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block text-[rgba(212,184,150,0.35)] text-xs">
            Pilih menu & kirim pesanan ke dapur
          </span>
          {/* Mobile cart toggle */}
          <button
            onClick={() => setShowMobileCart(true)}
            className="lg:hidden relative flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[rgba(232,160,69,0.3)] text-[#e8a045] text-xs font-bold"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            🛒
            {totalItem > 0 && (
              <motion.span
                key={totalItem}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 bg-[#c4692a] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
              >
                {totalItem}
              </motion.span>
            )}
          </button>
        </div>
      </motion.header>

      {/* Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT — Menu */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 lg:w-[60%] overflow-hidden border-r border-[rgba(232,160,69,0.08)]"
        >
          <MenuPanel
            cart={cart}
            onAdd={addItem}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
          />
        </motion.div>

        {/* RIGHT — Order Summary (desktop only) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="hidden lg:flex lg:w-[40%] xl:w-[35%] flex-col bg-[#0a0500]"
        >
          <OrderPanel
            cart={cart}
            nomorMeja={nomorMeja}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
            onRemove={removeItem}
            onSend={handleSend}
          />
        </motion.div>
      </div>

      {/* Mobile Order Drawer */}
      <AnimatePresence>
        {showMobileCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileCart(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed bottom-0 left-0 right-0 bg-[#0a0500] rounded-t-3xl z-50 max-h-[88vh] flex flex-col border-t border-[rgba(232,160,69,0.15)] lg:hidden"
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-[rgba(232,160,69,0.15)] rounded-full" />
              </div>
              <button
                onClick={() => setShowMobileCart(false)}
                className="absolute top-4 right-4 text-[rgba(212,184,150,0.4)] hover:text-white text-xl"
              >
                ×
              </button>
              <OrderPanel
                cart={cart}
                nomorMeja={nomorMeja}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
                onRemove={removeItem}
                onSend={handleSend}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            className="fixed top-16 left-0 right-0 flex justify-center px-4 z-50"
          >
            <div className="bg-[#25d366] text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-2xl flex items-center gap-2">
              ✅ Pesanan berhasil dikirim ke WhatsApp!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-[#0d0700] flex items-center justify-center">
          <div
            className="text-[#e8a045] animate-pulse"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Memuat menu...
          </div>
        </div>
      }
    >
      <OrderPageContent />
    </Suspense>
  );
}
