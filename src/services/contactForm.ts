import type { ContactForm } from "../types";
import { sendContactForm } from "../api/contact-form";

export const sendContactFormService = async (formData: ContactForm) => {
  try {
    const response = await sendContactForm(formData);
    return response;
  } catch (error) {
    throw error;
  }
};
export const validateContactForm = (formData: ContactForm) => {
  const errors: { [key: string]: string } = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Vui lòng nhập họ và tên.";
  }

  if (!formData.email.trim()) {
    errors.email = "Vui lòng nhập email.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email không hợp lệ.";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Vui lòng nhập số điện thoại.";
  } else if (!/^(\+84|84|0)[0-9]{9}$/.test(formData.phone.replace(/\s/g, ""))) {
    errors.phone = "Số điện thoại không hợp lệ.";
  }

  if (!formData.message.trim()) {
    errors.message = "Vui lòng nhập tin nhắn.";
  }

  if (!formData.agreeToTerms) {
    errors.agreeToTerms =
      "Bạn phải đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.";
  }

  return errors;
};
