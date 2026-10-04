export type ShirtSize = "S" | "M" | "L" | "XL";

export interface Colorway {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  gsm: number;
  fit: string;
  tagline: string;
  description: string;
  badge?: string;
  colors: Colorway[];
  sizes: ShirtSize[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: ShirtSize;
  selectedColor: string;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "foxy";
  text: string;
  timestamp: string;
}