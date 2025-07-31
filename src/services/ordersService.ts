// services/paymentService.ts
import axios from "axios";
import { convertToAdminApiUrl } from "../utils/url";

export const createOrderService = async (orderData: any) => {
  const token = sessionStorage.getItem("authToken"); 
  try {
    const res = await axios.post(convertToAdminApiUrl("/orders"), orderData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi gọi API tạo đơn hàng:", error);
    throw error;
  }
};

/**
 * Gửi yêu cầu trả hàng
 * @param orderId ID của đơn hàng cần trả
 * @param reason Lý do trả hàng
 * @returns Kết quả từ API
 */
export const returnOrder = async (orderId: number | string, reason: string): Promise<any> => {
  try {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      throw new Error('Không tìm thấy token xác thực');
    }

    const response = await axios.post(
      convertToAdminApiUrl(`/orders/return/${orderId}`),
      { reason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error returning order:', error);
    throw error;
  }
};
