import { http } from "@/shared/api/http";

export const validateCouponService = async (code: string, cartTotal: number) => {
  try {
    const response = await http.post("/couponcodes/validate", { code, cart_total: cartTotal });
    // console.log(`Service: validateCouponService response:`, response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Lỗi không xác định khi xác thực mã giảm giá',
    };
  }
};
