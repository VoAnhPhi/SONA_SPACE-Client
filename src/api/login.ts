import axios from 'axios';
import type { ApiResponse, User } from '../types';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export const loginUser = async (userData: LoginData): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await axios.post('http://localhost:3500/api/auth/login', userData);
    return {
      success: true,
      data: response.data,
      message: 'Đăng nhập thành công'
    };
  } catch (error: any) {
    // Xử lý lỗi từ API
    const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi khi đăng nhập';
    return {
      success: false,
      error: errorMessage,
      message: errorMessage
    };
  }
};
