// services/wishlistOrCartService.ts
import { saveToCart } from "./cart.api";
import { fetchCartFromDatabase } from "./cart.api";
import { getAuthToken } from "@/shared/auth/token-storage";
import { http } from "@/shared/api/http";
const notifyCartUpdated = () => {
  window.dispatchEvent(new CustomEvent("cart-updated"));
};

export const saveToOrCart = async (
  data: { status: number; cartItems: any[] }
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await saveToCart(data);
    notifyCartUpdated();
    return {
      success: true,
      message: response.message || "Đã thêm thành công",
    };
  } catch (error: any) {
    console.error("Lỗi trong saveToWishlistOrCart:", error);
    console.error("Lỗi chi tiết:", error?.response?.data || error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data); // 👈 log cụ thể để debug
    }

    return {
      success: false,
      message: "Thêm vào giỏ hàng thất bại",
    };
  }
};

export const loadCartService = async () => {
  try {
    const data = await fetchCartFromDatabase();
    return {
      success: true,
      wishlistItems: data,

    };

  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Lỗi khi tải giỏ hàng",
    };
  }
};

export const getCartCount = async (): Promise<number> => {
  try {
    const data = await fetchCartFromDatabase();
    const items = Array.isArray(data) ? data : data?.items || data?.wishlistItems || [];
    if (!Array.isArray(items)) return 0;

    return items.reduce((total: number, item: any) => {
      const quantity = Number(item?.quantity ?? item?.wishlist_quantity ?? 1);
      return total + (Number.isFinite(quantity) && quantity > 0 ? quantity : 1);
    }, 0);
  } catch {
    return 0;
  }
};

export const updateCartQuantityService = async (wishlistId: number, quantity: number) => {
  const token = getAuthToken();
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await http.put(`/wishlists/${wishlistId}`, {
    quantity,
  });
  notifyCartUpdated();
  return response.data;
};

export const removeFromCartService = async (wishlistId: number) => {
  const token = getAuthToken();
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await http.delete(`/wishlists/${wishlistId}`);
notifyCartUpdated();
  return response.data;
};

export const clearCartService = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("Bạn chưa đăng nhập");

  try {
    const response = await http.delete("/wishlists/clear");
    
notifyCartUpdated();
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API xóa toàn bộ:", error);
    return { success: false, message: "Lỗi server" };
  }
};

export const clearCartServiceid = async (selectedItemIds: number[]) => {
  const res = await http.delete("/wishlists/clearid", {
    data: { selectedItemIds }
  });
  return res.data;
};

