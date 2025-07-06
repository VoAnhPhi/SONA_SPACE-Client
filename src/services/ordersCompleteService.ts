import axios from 'axios';

export const getOrderByHash = async (orderHash: string) => {
    const token = sessionStorage.getItem("authToken"); 
  try {
    const response = await axios.get(`http://localhost:3501/api/orders/complete/${orderHash}`, {
      headers: {
        Authorization: `Bearer ${token}`, // ← Thêm token vào header
      },
    });
    console.log(" Dữ liệu từ API:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy đơn hàng:", error);
    return { success: false, message: "Lỗi khi gọi API" };
  }
};
