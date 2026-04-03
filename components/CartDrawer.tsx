"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const NOMOR_WA_ADMIN = "6281234567890"; // ← Ganti nomor WA admin cafe

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, increaseQty, decreaseQty, removeItem, totalHarga, totalItem, clearCart } = useCart();
  const [catatan, setCatatan] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [nomorMeja, setNomorMeja] = useState("");
  const [namaPemesan, setNamaPemesan] = useState("");

  const formatRupiah = (angka: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);

  const parseHarga = (price: string) => parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;

  const kirimPesanan = () => {
    if (cart.length === 0) return;

    let pesan = `🍽️ *PESANAN BARU*\n`;
    pesan += `👤 Nama: ${namaPemesan || "—"}\n`;
    pesan += `📍 Meja: ${nomorMeja || "—"}\n\n`;
    pesan += `*Detail Pesanan:*\n`;
    cart.forEach((item) => {
      pesan += `• ${item.name} x${item.qty} = ${formatRupiah(parseHarga(item.price) * item.qty)}\n`;
    });
    pesan += `\n*Total: ${formatRupiah(totalHarga)}*`;
    if (catatan) pesan += `\n\n📝 Catatan: ${catatan}`;

    window.open(`https://wa.me/${NOMOR_WA_ADMIN}?text=${encodeURIComponent(pesan)}`, "_blank");

    clearCart();
    setCatatan("");
    setNomorMeja("");
    setNamaPemesan("");
    setIsOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <>
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            className="fixed top-6 left-0 right-0 flex justify-center z-9999 px-4"
          >
            <div className="bg-[#25d366] text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-2xl flex items-center gap-2">
              ✅ Pesanan berhasil dikirim ke WhatsApp!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-998"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0d0700] border-l border-[rgba(232,160,69,0.15)] z-999 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(232,160,69,0.12)]">
                <div>
                  <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Keranjang Pesanan
                  </h2>
                  <p className="text-[rgba(212,184,150,0.5)] text-xs mt-0.5">{totalItem} item dipilih</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full border border-[rgba(232,160,69,0.2)] text-[rgba(212,184,150,0.5)] hover:text-[#e8a045] hover:border-[#e8a045] transition-all flex items-center justify-center text-lg"
                >
                  ×
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <div className="text-5xl mb-4">🍽️</div>
                    <p className="text-[rgba(212,184,150,0.4)] text-sm">Keranjang masih kosong</p>
                    <p className="text-[rgba(212,184,150,0.25)] text-xs mt-1">Pilih menu favoritmu</p>
                  </div>
                ) : (
                  <>
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30, height: 0 }}
                          className="flex gap-3 bg-[#160c04] border border-[rgba(232,160,69,0.08)] rounded-xl p-3"
                        >
                          {/* Image */}
                          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                            <Image src={item.image} alt={item.name} width={56} height={56} className="w-full h-full object-cover" />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-semibold leading-snug line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                              {item.name}
                            </p>
                            <p className="text-[#e8a045] text-xs font-bold mt-0.5">
                              {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(parseHarga(item.price) * item.qty)}
                            </p>

                            {/* Qty & Remove */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1.5 bg-[#0d0700] border border-[rgba(232,160,69,0.15)] rounded-full px-1 py-0.5">
                                <button onClick={() => decreaseQty(item.id)} className="w-5 h-5 rounded-full bg-[rgba(232,160,69,0.1)] text-[#e8a045] font-bold text-xs flex items-center justify-center hover:bg-[rgba(232,160,69,0.2)] transition-colors">
                                  −
                                </button>
                                <span className="text-white font-bold text-xs w-4 text-center">{item.qty}</span>
                                <button onClick={() => increaseQty(item.id)} className="w-5 h-5 rounded-full bg-[#e8a045] text-[#0d0700] font-bold text-xs flex items-center justify-center hover:bg-[#f5c97a] transition-colors">
                                  +
                                </button>
                              </div>
                              <button onClick={() => removeItem(item.id)} className="text-[rgba(212,184,150,0.3)] hover:text-red-400 transition-colors text-xs">
                                Hapus
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Nama Pemesan */}
                    <div>
                      <label className="text-[rgba(212,184,150,0.5)] text-xs mb-1.5 block tracking-wide">
                        Nama Pemesan <span className="text-[#c4692a]">*</span>
                      </label>
                      <input
                        type="text"
                        value={namaPemesan}
                        onChange={(e) => setNamaPemesan(e.target.value)}
                        placeholder="Contoh: Budi"
                        className="w-full bg-[#160c04] border border-[rgba(232,160,69,0.15)] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[rgba(212,184,150,0.2)] focus:outline-none focus:border-[rgba(232,160,69,0.5)]"
                      />
                    </div>

                    {/* Nomor Meja */}
                    <div>
                      <label className="text-[rgba(212,184,150,0.5)] text-xs mb-1.5 block tracking-wide">
                        Nomor Meja <span className="text-[#c4692a]">*</span>
                      </label>
                      <input
                        type="text"
                        value={nomorMeja}
                        onChange={(e) => setNomorMeja(e.target.value)}
                        placeholder="Contoh: 5"
                        className="w-full bg-[#160c04] border border-[rgba(232,160,69,0.15)] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[rgba(212,184,150,0.2)] focus:outline-none focus:border-[rgba(232,160,69,0.5)]"
                      />
                    </div>

                    {/* Catatan */}
                    <div>
                      <label className="text-[rgba(212,184,150,0.5)] text-xs mb-1.5 block tracking-wide">
                        Catatan (opsional)
                      </label>
                      <textarea
                        value={catatan}
                        onChange={(e) => setCatatan(e.target.value)}
                        placeholder="Contoh: tidak pedas, tanpa bawang..."
                        rows={2}
                        className="w-full bg-[#160c04] border border-[rgba(232,160,69,0.15)] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[rgba(212,184,150,0.2)] focus:outline-none focus:border-[rgba(232,160,69,0.5)] resize-none"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="px-5 py-4 border-t border-[rgba(232,160,69,0.12)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[rgba(212,184,150,0.6)] text-sm">Total Pesanan</span>
                    <span className="text-[#e8a045] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {formatRupiah(totalHarga)}
                    </span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={kirimPesanan}
                    disabled={!nomorMeja || !namaPemesan}
                    className="w-full bg-[#25d366] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#20b858] transition-colors"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    📲 Kirim Pesanan via WhatsApp
                  </motion.button>
                  {(!nomorMeja || !namaPemesan) && (
                    <p className="text-[rgba(212,184,150,0.35)] text-xs text-center">Isi nama pemesan & nomor meja terlebih dahulu</p>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}