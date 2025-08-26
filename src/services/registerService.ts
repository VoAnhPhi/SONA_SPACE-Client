import { registerUser } from '../api/register';
import type { ApiResponse } from '../types';

export interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  agreeToTerms: boolean;
  provinceCode: string;
  wardCode: string;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  agreeToTerms?: string;
  provinceCode?: string;
  wardCode?: string;
}

export const validateRegisterForm = (data: RegisterFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate fullName
  if (!data.fullName.trim()) {
    errors.fullName = 'Họ và tên không được để trống';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Họ và tên phải có ít nhất 2 ký tự';
  }

  // Validate email
  if (!data.email.trim()) {
    errors.email = 'Email không được để trống';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email không hợp lệ';
  }

  // Validate phone
  if (!data.phone.trim()) {
    errors.phone = 'Số điện thoại không được để trống';
  } else if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(data.phone)) {
    errors.phone = 'Số điện thoại không hợp lệ (phải bắt đầu bằng 0 hoặc +84 và có 10 số)';
  }

  // Validate password
  if (!data.password) {
    errors.password = 'Mật khẩu không được để trống';
  } else if (data.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
  }

  // Validate confirmPassword
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
  }

  if (!data.provinceCode) {
    errors.provinceCode = 'Tỉnh/Thành phố không được để trống';
  }

  if (!data.wardCode) {
    errors.wardCode = 'Phường/Xã không được để trống';
  }

  // Validate address
  if (!data.address.trim()) {
    errors.address = 'Địa chỉ không được để trống';
  } else if (data.address.trim().length < 10) {
    errors.address = 'Địa chỉ phải có ít nhất 20 ký tự';
  }

  // Validate terms agreement
  if (!data.agreeToTerms) {
    errors.agreeToTerms = 'Bạn phải đồng ý với điều khoản và chính sách';
  }

  return errors;
};

export const submitRegisterForm = async (data: RegisterFormData): Promise<ApiResponse<any>> => {
  // Chuyển đổi dữ liệu form sang định dạng API yêu cầu
  const apiData = {
    email: data.email,
    password: data.password,
    full_name: data.fullName,
    phone: data.phone,
    address: data.address
  };

  // Gọi API đăng ký
  return await registerUser(apiData);
};
