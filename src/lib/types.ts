export type Product = {
  id: string;
  type: string;
  length_m: number | null;
  width_m: number | null;
  size_label: string | null;
  price_zar: number;
  price_note: string;
  currency: string;
  image: string;
  featured_score: number;
  featured_in_type: boolean;
};

export type Catalog = {
  store_name: string;
  store_name_note?: string;
  tagline?: string;
  enquiry_note?: string;
  currency: string;
  price_mode: string;
  price_disclaimer?: string;
  homepage_hero_id?: string;
  product_count: number;
  types: string[];
  type_counts: Record<string, number>;
  type_copy?: Record<string, string>;
  products: Product[];
};

export type CartItem = {
  id: string;
  type: string;
  size_label: string;
  price_zar: number;
  imageSrc: string;
};
