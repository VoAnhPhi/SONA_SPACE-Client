// services/paymentService.ts
import axios from "axios";

export const createOrderService = async (orderData: any) => {
  const token = sessionStorage.getItem("authToken"); 
  try {
    const res = await axios.post("http://localhost:3501/api/orders", orderData, {
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
