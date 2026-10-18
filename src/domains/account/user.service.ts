import { getAuthToken } from "@/shared/auth/token-storage";
import { http } from "@/shared/api/http";

/**
 * Hủy đơn hàng
 * @param orderId ID của đơn hàng cần hủy
 * @param reason Lý do hủy đơn hàng (tùy chọn)
 * @returns Kết quả từ API
 */
export const cancelOrder = async (orderId: number, reason?: string): Promise<any> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Không tìm thấy token xác thực');
    }

    const response = await http.put(
      `/orders-id/cancel/${orderId}`,
      { reason: reason || 'Hủy bởi khách hàng' },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
};
