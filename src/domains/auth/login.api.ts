import type { ApiResponse } from "@/shared/api/types";
import type { User } from "./types";
import { http } from "@/shared/api/http";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface GoogleLoginData {
  accessToken: string;
}

interface GoogleLoginResponse {
  user: User;
  token: string;
}

export const loginUser = async (
  userData: LoginData
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await http.post(
      "/auth/login",
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

export const googleLogin = async (
  data: GoogleLoginData
): Promise<ApiResponse<GoogleLoginResponse>> => {
  try {
    const response = await http.post(
      "/auth/google-login",
      { token: data.accessToken }
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
      "Đăng nhập thất bại. Vui lòng thử lại.";

    return {
      success: false,
      status: statusCode,
      error: errorMessage,
      message: errorMessage,
    };
  }
};
