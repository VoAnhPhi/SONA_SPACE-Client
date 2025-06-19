import axios from 'axios';
import type { ApiResponse } from '../types';

interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  address: string;
}

export const registerUser = async (userData: RegisterData): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post('http://localhost:3501/api/auth/register', userData);
    return {
      success: true,
      data: response.data,
      message: 'Đăng ký thành công'
    };
  } catch (error: any) {
    // Xử lý lỗi từ API
    const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi khi đăng ký';
    return {
      success: false,
      error: errorMessage,
      message: errorMessage
    };
  }
};
