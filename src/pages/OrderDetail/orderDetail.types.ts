export interface OrderProduct {
  order_item_id: string;
  product_id: string;
  name: string;
  image: string;
  price: number;
  color: { name: string; hex: string };
  size: string;
  quantity: number;
  slug: string;
  has_comment?: boolean;
  commented?: boolean;
  is_cancelled?: boolean;
  status?: string;
}

export interface OrderDetails {
  id?: number;
  order_hash: string;
  date: string;
  status: string;
  statusStep: number;
  processType?: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  subtotal: number;
  shippingFee: number;
  couponValue: number;
  discount: number;
  total: number;
  products: OrderProduct[];
  returnInfo?: {
    return_id: number;
    reason: string;
    return_type: string;
    total_refund: string;
    return_status: string;
    return_created_at: string;
    return_updated_at: string;
  };
}
