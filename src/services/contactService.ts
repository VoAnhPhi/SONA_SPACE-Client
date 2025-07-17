import type { ContactFormDesign } from "../types";

import { sendContactFormDesign } from "../api/contact";

export const sendContactFormDesignService = async (
  formData: ContactFormDesign
) => {
  try {
    const response = await sendContactFormDesign(formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const validateFormContactDesign = (formData: ContactFormDesign) => {
  const errors: { [key: string]: string } = {};
  if (!formData.name.trim()) {
    errors.name = "Họ và tên không được để trống";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Họ và tên không hợp lệ";
  }

  // Validate email
  if (!formData.email.trim()) {
    errors.email = "Email không được để trống";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Email không hợp lệ";
  }

  // Validate phone
  if (!formData.phone.trim()) {
    errors.phone = "Số điện thoại không được để trống";
  } else if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(formData.phone)) {
    errors.phone =
      "Số điện thoại không hợp lệ (phải bắt đầu bằng 0 hoặc +84 và có 10 số)";
  }

  if (!formData.room_name) {
    errors.room_name = "Vui lòng chọn không gian";
  } else if (formData.room_name == "__custom" && !formData.custom_room_name) {
    errors.custom_room_name = "Vui lòng nhập tên không gian";
  }

  // Validate password
  if (!formData.design_description) {
    errors.design_description = "Mô tả thiết kế không được để trống";
  } else if (formData.design_description.length < 6) {
    errors.design_description = "Mô tả thiết kế phải có ít nhất 6 ký tự";
  }

  // Validate confirmPassword
  if (!formData.require_design) {
    errors.require_design = "Yêu cầu thiết kế không được để trống";
  }

  // Validate address
  if (!formData.style_design) {
    errors.style_design = "Kiểu thiết kế không được để trống";
  }

  // Validate terms agreement
  if (!formData.budget) {
    errors.budget = "Ngân sách không được để trống";
  }
  return errors;
};
