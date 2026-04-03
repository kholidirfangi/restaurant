"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: string;   // e.g. "Rp 185.000"
  image: string;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
  totalItem: number;
  totalHarga: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (item: Omit<CartItem, "qty">) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: number) => setCart((prev) => prev.filter((c) => c.id !== id));

  const increaseQty = (id: number) =>
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty: c.qty + 1 } : c));

  const decreaseQty = (id: number) =>
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing && existing.qty === 1) return prev.filter((c) => c.id !== id);
      return prev.map((c) => c.id === id ? { ...c, qty: c.qty - 1 } : c);
    });

  const clearCart = () => setCart([]);

  // Parse "Rp 185.000" → 185000
  const parseHarga = (price: string) =>
    parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;

  const totalItem = cart.reduce((sum, c) => sum + c.qty, 0);
  const totalHarga = cart.reduce((sum, c) => sum + parseHarga(c.price) * c.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, increaseQty, decreaseQty, clearCart, totalItem, totalHarga, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}