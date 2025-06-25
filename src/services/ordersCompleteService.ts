import axios from 'axios';

export const getOrderByHash = async (orderHash: string) => {
  try {
    const response = await axios.get(`http://localhost:3501/api/orders/${orderHash}`);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy đơn hàng:", error);
    return { success: false, message: "Lỗi khi gọi API" };
  }
};