export interface MenuItem {
  id: number;
  name: string;
  category: string;
  categoryLabel: string;
  desc: string;
  price: string;
  image: string;
  badge?: { label: string; type: "populer" | "baru" | "spesial" };
  tags: string[];
  featured?: boolean;
  cats: string[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    featured: true,
    name: "Signature Nusantara Platter",
    category: "Unggulan Chef",
    categoryLabel: "unggulan",
    desc: "Perpaduan sempurna rendang sapi wagyu, ayam bakar rempah, dan lalapan segar dengan sambal matah khas Bearasa yang menggugah selera.",
    price: "Rp 185.000",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    badge: { label: "⭐ Terlaris", type: "populer" },
    tags: ["Pedas", "Sharing"],
    cats: ["semua", "unggulan", "makanan"],
  },
  {
    id: 2,
    name: "Spageti Udang",
    category: "Mie",
    categoryLabel: "makanan",
    desc: "Kuah santan gurih kaya rempah dengan daging sapi empuk, tomat segar, dan emping melinjo renyah.",
    price: "Rp 65.000",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=700&auto=format&fit=crop",
    badge: { label: "Baru", type: "baru" },
    tags: ["Gurih", "Pedas"],
    cats: ["semua", "makanan"],
  },
  {
    id: 3,
    name: "Nasi Goreng Kampoeng",
    category: "Nasi",
    categoryLabel: "makanan",
    desc: "Nasi goreng dengan bumbu kuno dan telur mata sapi, disajikan dengan kerupuk udang dan acar.",
    price: "Rp 75.000",
    image: "https://images.unsplash.com/photo-1680674814945-7945d913319c?w=600&auto=format&fit=crop&q=60",
    badge: { label: "Populer", type: "populer" },
    tags: ["Sedang", "Best Seller"],
    cats: ["semua", "makanan", "unggulan"],
  },
  {
    id: 4,
    name: "Es Cendol Durian",
    category: "Minuman Tradisional",
    categoryLabel: "minuman",
    desc: "Cendol pandan segar dengan topping durian montong pilihan, gula merah cair, dan santan lembut.",
    price: "Rp 35.000",
    image: "https://images.unsplash.com/photo-1579888071069-c107a6f79d82?w=600&auto=format&fit=crop&q=60",
    badge: { label: "Seasonal", type: "spesial" },
    tags: ["Dingin", "Manis"],
    cats: ["semua", "minuman"],
  },
  {
    id: 5,
    name: "Donat Ceres",
    category: "Dessert Fusion",
    categoryLabel: "dessert",
    desc: "Perpaduan unik roti donat yang lembut dan ceres yang manis menjadikan rasa yang tak terlupakan.",
    price: "Rp 48.000",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=700&auto=format&fit=crop",
    badge: { label: "Baru", type: "baru" },
    tags: ["Manis", "Fusion"],
    cats: ["semua", "dessert"],
  },
  {
    id: 6,
    name: "Jus Buah",
    category: "Minuman Signature",
    categoryLabel: "minuman",
    desc: "Buah dan es yang berpadu menjadi satu, memberikan rasa segar dan menghilangkan rasa haus.",
    price: "Rp 42.000",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=700&auto=format&fit=crop",
    badge: { label: "Signature", type: "spesial" },
    tags: ["Hangat", "Herbal"],
    cats: ["semua", "minuman", "unggulan"],
  },
];

export const FILTERS = [
  { key: "semua", label: "Semua" },
  { key: "unggulan", label: "Unggulan" },
  { key: "makanan", label: "Makanan" },
  { key: "minuman", label: "Minuman" },
  { key: "dessert", label: "Dessert" },
];

export const BADGE_STYLE: Record<string, string> = {
  populer: "bg-gradient-to-r from-[#c4692a] to-[#e8a045] text-[#1a0e06]",
  baru: "bg-[rgba(232,160,69,0.15)] border border-[rgba(232,160,69,0.4)] text-[#e8a045]",
  spesial: "bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.2)] text-white",
};

export const parseHarga = (price: string) =>
  parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;

export const formatRupiah = (angka: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);