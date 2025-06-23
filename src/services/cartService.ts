// services/wishlistOrCartService.ts
import axios from "axios";
import { saveToCart } from "../api/cart";
import { fetchCartFromDatabase } from "../api/cart";
export const saveToOrCart = async (
  data: { status: number; cartItems: any[] }
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await saveToCart(data);
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
      message: error.message || "Lỗi không xác định khi load wishlist",
    };
  }
};
export const updateCartQuantityService = async (wishlistId: number, quantity: number) => {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await axios.put(`http://localhost:3501/api/wishlists/${wishlistId}`, {
    quantity,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const removeFromCartService = async (wishlistId: number) => {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await axios.delete(`http://localhost:3501/api/wishlists/${wishlistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const clearCartService = async () => {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  try {
    const response = await axios.delete("http://localhost:3501/api/wishlists/clear", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API xóa toàn bộ:", error);
    return { success: false, message: "Lỗi server" };
  }
};