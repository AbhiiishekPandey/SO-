export interface ProductSize {
  size: string;
  available: boolean;
}

export interface Product {
  id: number;
  title: string;
  subtitle?: string;
  handle: string;
  price: number;
  currency: string;
  sizes: ProductSize[];
  images: string[];
  tags: string[];
  isPreOrder?: boolean;
  preOrderNote?: string;
  fitNote?: string;
  description: string;
  fabric: string;
  silhouette: string;
  careInstructions?: string[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export type ViewCategory = 'all' | 'midi' | 'new-edit' | 'pre-order' | 'occasion' | 'floral';
export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
export type GridMode = 'editorial' | 'compact';
