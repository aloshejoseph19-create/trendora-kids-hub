export type AgeGroup = "Baby (0-24M)" | "Toddler (2-4Y)" | "Kids (5-12Y)";

export type Category = "All" | "Dresses & Outfits" | "Toys & Games" | "Accessories" | "Everyday Basics";

export type Gender = "All" | "Girls" | "Boys" | "Gender Neutral";

export interface ColorSwatch {
  name: string;
  hex: string;
  tailwindClass: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  category: "Dresses & Outfits" | "Toys & Games" | "Accessories" | "Everyday Basics";
  categories?: Category[];
  ageGroup: AgeGroup;
  ageGroups?: AgeGroup[];
  gender: Gender;
  genders?: Gender[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: "Bestseller" | "Organic" | "Sale" | "New" | "Staff Pick";
  images: string[];
  colors: ColorSwatch[];
  sizes: string[];
  description: string;
  features: string[];
  material: string;
  careInstructions: string;
  inStock: boolean;
}

export interface FilterState {
  searchQuery: string;
  category: Category;
  ageGroups: AgeGroup[];
  gender: Gender;
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  sortBy: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ColorSwatch;
  selectedSize: string;
  quantity: number;
}

