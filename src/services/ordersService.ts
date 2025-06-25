// services/paymentService.ts
import axios from "axios";

export const createOrderService = async (orderData: any) => {
  const token = sessionStorage.getItem("authToken"); // ← Lấy token từ localStorage
  try {
    const res = await axios.post("http://localhost:3501/api/orders", orderData, {
      headers: {
        Authorization: `Bearer ${token}`, // ← Thêm token vào header
      },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi gọi API tạo đơn hàng:", error);
    throw error;
  }
};
