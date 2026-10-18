// Định nghĩa interface cho API mới
export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductRating {
  count: number;
  average: string;
}

export interface Coupon {
  couponStatus: number;
}

export interface ProductItem {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
  color: ProductColor;
  category: string;
  rating: ProductRating;
  status?: string; // ACTIVE, CANCELLED, etc.
  can_cancel?: boolean;
  item_id?: number; // API item ID for cancellation
}

export interface OrderData {
  id: number;
  order_hash: string;
  date: string;
  status: string;
  statusStep: number;
  recipientName: string;
  recipientPhone: string;
  address: string;
  subtotal: string;
  shippingFee: number;
  discount: number;
  total: string;
  products: ProductItem[];
}

export interface OrdersAPIResponse {
  user_id: string;
  order_count: number;
  orders: OrderData[];
}
