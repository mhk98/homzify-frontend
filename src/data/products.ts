// ─── Types ───────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  image: string;
  gallery?: string[];
  features?: string[];
  sku?: string | null;
  freeShipping?: boolean;
  hasVariants?: boolean;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  category?: string | null;
  subCategory?: string | null;
  childCategory?: string | null;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface NavItem {
  label: string;
  sub: NavSubItem[];
}

export interface NavSubItem {
  Id?: number;
  label: string;
  childItems?: NavChildItem[];
}

export interface NavChildItem {
  Id?: number;
  label: string;
}

// ─── Static UI data (images live on the old CDN — not in backend) ─────────────

const BASE = "https://sellpixer.websolutionit.com/public/uploads";

export const LOGO_URL = `${BASE}/settings/1768213593-1764914927-1764847480-1729703474-sell-pixer.webp`;
export const DELIVERY_PARTNER_URL =
  "https://sellpixer.websolutionit.com/public/frontEnd/images/delivery-partner.png";

export const navItems: NavItem[] = [
  { label: "MENS FASHION",         sub: ["Clothing", "Shoes", "Accessories", "Watches", "Eyewear", "Mens Shoes"].map((label) => ({ label })) },
  { label: "WOMENS FASHION",       sub: ["Bags", "Watches", "Salwar Kameez", "Womens Sharee", "Jewellery", "Shoes", "Innerwear", "Sharee"].map((label) => ({ label })) },
  { label: "COSMETICS",            sub: ["Personal Care", "Fragrances", "Hair Care", "Man's Care", "Skin Care", "Makeup", "Body & Massage Oils"].map((label) => ({ label })) },
  { label: "GADGETS",              sub: ["Head Phones", "Mobile Accessories", "Computer Accessories", "Speaker/Microphone"].map((label) => ({ label })) },
  { label: "GROCERY",              sub: ["Fruits/Meat/Frozen", "Snacks & Beverages", "Dairy & Eggs", "Herbs/Spices & Sauces", "Cooking"].map((label) => ({ label })) },
  { label: "HOME & LIFESTYLE",     sub: ["Kitchen & Dining", "Cleaning", "Bedding", "Bath", "Furniture"].map((label) => ({ label })) },
  { label: "EID COLLECTION",       sub: ["Panjabi", "3 Piece"].map((label) => ({ label })) },
  { label: "STATIONARY AND CRAFT", sub: [] },
];

export const topCategories: Category[] = [
  { id: 1, name: "Grocery",              image: `${BASE}/category/1729871263-grocery.webp` },
  { id: 2, name: "Home & Lifestyle",     image: `${BASE}/category/1729957138-home-lifestyle.webp` },
  { id: 3, name: "Eid Collection",       image: `${BASE}/category/1763539426-winter-collection.webp` },
  { id: 4, name: "Stationary And Craft", image: `${BASE}/category/1777020877-all-color.webp` },
  { id: 5, name: "Mens Fashion",         image: `${BASE}/category/1729870308-men-fashion.webp` },
  { id: 6, name: "Womens Fashion",       image: `${BASE}/category/1729870638-womens-fashion.webp` },
  { id: 7, name: "Cosmetics",            image: `${BASE}/category/1729870761-cosmetics.webp` },
  { id: 8, name: "Gadgets",              image: `${BASE}/category/1729870905-gadgets.webp` },
];

export const brands = [
  { id: 1,  name: "Easy",       image: `${BASE}/brand/1730008604-easy-brands.webp` },
  { id: 2,  name: "Bata",       image: `${BASE}/brand/1730127739-bata.webp` },
  { id: 3,  name: "Ielgy",      image: `${BASE}/brand/1730175336-ielgy.webp` },
  { id: 4,  name: "Choetech",   image: `${BASE}/brand/1730303474-choetech.webp` },
  { id: 5,  name: "Nike",       image: `${BASE}/brand/1753617366-34480_logo_nike.webp` },
  { id: 6,  name: "Unilever",   image: `${BASE}/brand/1753617442-58148_logo_unilever.webp` },
  { id: 7,  name: "Adidas",     image: `${BASE}/brand/1753617501-company_logo_32459.webp` },
  { id: 8,  name: "Lotto",      image: `${BASE}/brand/1753617660-screenshot-(2).webp` },
  { id: 9,  name: "Samsung",    image: `${BASE}/brand/1763608536-samsung_old_logo_before_year_2015.svg.webp` },
  { id: 10, name: "Basundhara", image: `${BASE}/brand/1766463139-basundhara.webp` },
];
