import axios from 'axios';

const API_URL = 'http://localhost:3501/api/couponcodes';

export const validateCouponService = async (code: string, cartTotal: number, token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/validate`,
      { code, cart_total: cartTotal },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`Service: validateCouponService response:`, response.data);
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
