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

// Interface cho dữ liệu đơn hàng từ API
export interface OrderItemAPI {
  product_id: number;
  product_name: string;
  product_image: string;
  product_price: string;
  variant_id: number;
  quantity: number;
}

export interface OrderAPI {
  order_id: number;
  created_at: string;
  order_status_name: string;
  items: OrderItemAPI[];
}

export interface OrdersResponse {
  user_id: string;
  order_count: number;
  orders: OrderAPI[];
}

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  date: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  status: string;
  customerInfo?: {
    name: string;
    phone: string;
    address: string;
  };
  orderNumber?: string;
  refundDate?: string;
}
