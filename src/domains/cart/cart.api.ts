// api/cart.ts
import { getAuthToken } from "@/shared/auth/token-storage";
import { http } from "@/shared/api/http";

export const saveToCart = async (data: { status: number; cartItems: any[] }) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Token không tồn tại, vui lòng đăng nhập.");
  }

  // Kiểm tra dữ liệu đầu vào trước khi gửi
  if (!Array.isArray(data.cartItems) || data.cartItems.length === 0) {
    throw new Error("Không có sản phẩm trong cartItems.");
  }
  
const cartItem = data.cartItems[0]; // Lấy item đầu tiên từ mảng cartItems
// console.log('variant_id gửi lên:', cartItem.variant_id);
const response = await http.post(
  "/wishlists",
  {
    variant_id: cartItem.variant_id,
    quantity: cartItem.quantity,
    status: data.status,
  }
);

  return response.data;
};


export const fetchCartFromDatabase = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await http.get("/wishlists?status=0");

  return response.data;
};
