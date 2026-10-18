export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  attributes: Attribute[];
  category: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at?: string;

  price?: number | null;
  price_sale?: number | null;
  color_hex?: string[];

  description?: string;
  priority?: number;
  images?: string[];
  view?: number;
  stock?: number;
  status?: number;
  sold?: number;
  material?: string;
  height?: number;
  quantity?: number;
  color_name?: string;
  width?: number;
  depth?: number;
  seating_height?: number;
  maxium_weight?: number;

  isNew?: boolean;
  isSale?: boolean;
  priceSale?: number;
  isWishlist?: boolean;
  product_id: number;
  product_slug: string;
  colors?: string[];
  specifications?: ProductSpecification[];
  relatedProducts?: Product[];
  variants?: Variant[];
  variant_id: number;
  rooms?: string[];
}

export interface Attribute {
  name: string;
  value: string | number | null;
  unit?: string;
  is_required: boolean | 0 | 1;
}

export interface ProductSpecification {
  name: string;
  label: string;
  value: string;
}

export interface Category {
  category_id: number;
  category_name: string;
  slug: string;
  category_image: string;
  category_banner: string;
  category_priority: number;
  category_status: number;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  product_count: number;
  children?: Category[];
}

// Room/Space related interfaces
export interface Room {
  room_id: number;
  room_name: string;
  slug: string;
  room_image: string;
  room_banner: string;
  room_description?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  product_count: number;
  products?: Product[];
}

export interface Variant {
  color_id: number;
  color_name: string;
  color_hex: string;
  color_priority: number;
  variant_id: number;
  variantId: number;
  variant_slug: string;
  variant_price: number;
  variant_images?: string; // dùng nếu ảnh là chuỗi (dùng split sau)
  image: string[];
  variant_price_sale?: number;
  productId: number;
  variant_height?: number;
  quantity: number;
  price: number;
  priceSale: number;
  variant_width?: number;
  color: {
    id: number;
    name: string;
    hex: string;
    priority: number;
    slug: string;
  };
  variant_depth?: number;
}
