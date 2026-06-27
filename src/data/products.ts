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
