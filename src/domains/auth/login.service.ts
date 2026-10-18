import { clearAuthData } from "@/shared/auth/token-storage";
import { googleLogin, loginUser } from "./login.api";
import type { ApiResponse } from "@/shared/api/types";

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
}

export const validateLoginForm = (data: LoginFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate email
  if (!data.email.trim()) {
    errors.email = "Email không được để trống";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Email không hợp lệ";
  }

  // Validate password
  if (!data.password) {
    errors.password = "Mật khẩu không được để trống";
  }

  return errors;
};

export const submitLoginForm = async (
  data: LoginFormData
): Promise<ApiResponse<any>> => {
  // Chuyển đổi dữ liệu form sang định dạng API yêu cầu
  const apiData = {
    email: data.email,
    password: data.password,
  };

  // Gọi API đăng nhập
  return await loginUser(apiData);
};

// đăng nhập với google
export const submitGoogleLoginForm = async (accessToken: string) => {
  return await googleLogin({ accessToken });
};

// Đăng xuất
export const logout = () => {
  clearAuthData();
};
