// Product related interfaces For All Users
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
  created_at?: string;
  priceSale?: number;
  slug: string;
  isWishlist?: boolean;
  description?: string;
  category: {
    id: number;
    name: string;
  };
  specifications?: ProductSpecification[];
  relatedProducts?: Product[];
}

export interface ProductSpecification {
  name: string;
  label: string;

  value: string;
}

export interface Category {
  category_id: number;
  category_name: string;
  category_slug: string;
  category_image: string;
  category_priority: number;
  category_status: number;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  product_count: number;

  children?: Category[];
}

// User related interfaces
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  wishlist?: Product[];
}

export interface Address {
  id: number;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  detail: string;
  isDefault: boolean;
}

// Order related interfaces
export interface Order {
  id: string;
  date: string;
  status: string;
  statusStep: number;
  recipientName: string;
  recipientPhone: string;
  address: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  products: OrderProduct[];
}

export interface OrderProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
}

export interface CartItem extends OrderProduct {
  slug: string;
}

// Promotion related interfaces
export interface PromoCode {
  code: string;
  discount: string;
  description: string;
  validUntil: string;
  minOrder: string;
  used: boolean;
}

// Form related interfaces
export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  agreeToTerms: boolean;
}

export interface ArchitectFormData extends ContactFormData {
  experience?: Experience[];
  skills?: Skill[];
  education?: Education[];
  portfolio?: string;
}

export interface Experience {
  position: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  university: string;
  degree: string;
  location: string;
}

export interface Recommendation {
  text: string;
  author: string;
  position?: string;
}

// Room/Space related interfaces
export interface Room {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
  products?: Product[];
}

// News/Blog related interfaces
export interface NewsArticle {
  news_id: number;
  news_name: string;
  news_slug: string;
  news_image: string;
  news_summary: string;
  news_content: string;
  news_publishDate: string;
  news_author?: string;
  news_tags?: string[];
}
export interface NewsCategory {
  news_category_id: number;
  title: string;
  news_category_slug: string;
  news_category_status: string;
  news_count: number;
  name: string;
}
// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination interface | Defind for all user
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
export interface Variant {
  color_id: number;
  color_name: string;
  color_hex: string;
  color_priority: number;
  variant_id: number;
  variant_slug: string;
  variant_price: number;
  variant_price_sale?: number;
  variant_images?: string;
  variant_height?: number;
  variant_width?: number;
  variant_depth?: number;
}
