import { convertToAdminApiUrl } from '../utils/url';

export interface Order {
  id: number;
  order_hash: string;
  date: string;
  status: string;
  statusStep: number;
  processType: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  products: OrderProduct[];
  returnInfo?: OrderReturnInfo;
}

export interface OrderProduct {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  color?: {
    name: string;
    hex: string;
  };
  category?: string;
  rating?: {
    count: number;
    average: number;
  };
}

export interface OrderReturnInfo {
  return_id: number;
  reason: string;
  return_type: string;
  total_refund: number;
  return_status: string;
  return_created_at: string;
  return_updated_at: string;
}

export interface OrderItem {
  item_id: number;
  variant_id: number;
  product: {
    id: number;
    name: string;
    slug: string;
    image: string;
    category: string;
  };
  color?: {
    name: string;
    hex: string;
  };
  quantity: number;
  price: number;
  item_total: number;
  status: string;
  can_cancel: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrderResponse {
  user_id: number;
  order_count: number;
  orders: Order[];
}

export interface OrderItemsResponse {
  success: boolean;
  data: {
    order: {
      id: number;
      hash: string;
      status: string;
    };
    items: OrderItem[];
    summary: {
      total_items: number;
      active_items: number;
      cancelled_items: number;
      total_value: number;
    };
  };
}

export interface CancelOrderResponse {
  success: boolean;
  message: string;
  order_id: number;
  order_hash: string;
}

export interface CancelProductResponse {
  success: boolean;
  message: string;
  data: {
    order_id: number;
    order_hash: string;
    cancelled_item: {
      item_id: number;
      product_name: string;
      quantity: number;
      refund_amount: number;
    };
    remaining_items: number;
  };
}

// Lấy danh sách đơn hàng của user
export async function getUserOrders(userId: number): Promise<OrderResponse> {
  const response = await fetch(convertToAdminApiUrl(`/orders-id/${userId}`));
  
  if (!response.ok) {
    throw new Error('Không thể lấy danh sách đơn hàng');
  }
  
  return response.json();
}

// Lấy danh sách sản phẩm trong đơn hàng
export async function getOrderItems(orderId: number, token: string): Promise<OrderItemsResponse> {
  const response = await fetch(convertToAdminApiUrl(`/orders-id/items/${orderId}`), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Không thể lấy danh sách sản phẩm trong đơn hàng');
  }
  
  return response.json();
}

// Hủy toàn bộ đơn hàng
export async function cancelOrder(orderId: number, reason: string, token: string): Promise<CancelOrderResponse> {
  const response = await fetch(convertToAdminApiUrl(`/orders-id/cancel/${orderId}`), {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reason }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Không thể hủy đơn hàng');
  }
  
  return response.json();
}

// Hủy một sản phẩm trong đơn hàng
export async function cancelOrderProduct(
  orderId: number, 
  itemId: number, 
  reason: string, 
  token: string
): Promise<CancelProductResponse> {
  const response = await fetch(convertToAdminApiUrl(`/orders-id/cancel-item/${orderId}/${itemId}`), {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reason }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Không thể hủy sản phẩm');
  }
  
  return response.json();
}
