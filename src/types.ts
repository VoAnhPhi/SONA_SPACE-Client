// Product related interfaces For All Users
export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  priority: number;
  images: string[];
  view: number;
  stock: number; // là số lượng sản phẩm còn trong kho
  status: number;
  sold: number; // số lượng sản phẩm đã bán
  price: number;
  price_sale: number;
  material: string;
  height: number;
  quantity: number;
  color_name: string;
  width: number;
  depth: number;
  seating_height?: number; // chiều cao ghế ngồi, có thể không có cho một số sản phẩm
  maxium_weight?: number; // trọng lượng tối đa, có thể không có cho một số sản phẩm
  image: string;

  isNew?: boolean;
  isSale?: boolean;
  created_at?: string;
  priceSale?: number;
  isWishlist?: boolean;
  colors: string[];
  category: {
    id: number;
    name: string;
  };
  specifications?: ProductSpecification[];
  relatedProducts?: Product[];
  variants?: Variant[];
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

// User related interfaces
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  wishlist?: Product[];
  full_name?: string;
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
  room_id: number;
  room_name: string;
  slug: string;
  room_image: string;
  room_description?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  product_count: number;
  products?: Product[];
}

// News/Blog related interfaces
export interface NewsArticle {
  news_id: number;
  news_name: string;
  news_slug: string;
  news_image: string;
  news_summary: string;
  news_view: number;
  news_content: string;
  news_publishDate: string;
  news_author?: string;
  news_tags?: string[];
  created_at?: String | undefined;
  news_category_id: string;
}
export interface NewsCategory {
  news_category_id: number;
  title: string;
  news_category_slug: string;
  news_category_status: string;
  news_count: number;
  name: string;
  news_slug: string;
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
  variant_images?: string; // dùng nếu ảnh là chuỗi (dùng split sau)
  image: string[];
  // listImage: string[];
  variant_price_sale?: number;

  variant_height?: number;
  variant_width?: number;
  variant_depth?: number;
}
