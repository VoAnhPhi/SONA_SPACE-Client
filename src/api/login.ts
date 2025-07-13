import axios from "axios";
import type { ApiResponse, User } from "../types";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export const loginUser = async (
  userData: LoginData
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await axios.post(
      "http://localhost:3501/api/auth/login",
      userData
    );
    return {
      success: true,
      data: response.data,
      message: "Đăng nhập thành công",
    };
  } catch (error: any) {
    const statusCode = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Email hoặc mật khẩu không đúng. Vui lòng thử lại.";

    return {
      success: false,
      status: statusCode,
      error: errorMessage,
      message: errorMessage,
    };
  }
};
