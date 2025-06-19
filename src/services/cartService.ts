import { saveToCart } from "../api/cart";

/**
 * Service: Lưu vào wishlist hoặc cart
 * @param data gồm status (0: cart, 1: wishlist) + cartItems
 */
export const saveToWishlistOrCart = async (
  data: { status: number; cartItems: any[] }
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await saveToCart(data);
    return {
      success: true,
      message: response.message || "Đã thêm thành công",
    };
  } catch (error) {
    console.error("Lỗi trong saveToWishlistOrCart:", error);
    return {
      success: false,
      message: "Thêm vào giỏ hàng thất bại",
    };
  }
};