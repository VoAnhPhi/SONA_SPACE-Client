import { http } from "@/shared/api/http";

export const getOrderByHash = async (orderHash: string) => {
  try {
    const response = await http.get(`/orders/complete/${orderHash}`);
    // console.log(" Dữ liệu từ API:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy đơn hàng:", error);
    return { success: false, message: "Lỗi khi gọi API" };
  }
};
