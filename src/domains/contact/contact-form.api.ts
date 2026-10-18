// services/contactService.ts
import type { ContactForm } from "./types";
import { http } from "@/shared/api/http";

export const sendContactForm = async (formData: ContactForm) => {
  // Map the form data to match server expectations
  // Server only expects: name, email, phone, message
  const serverFormData = {
    name: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
  };

  const response = await http.post(
    "/contact-forms",
    serverFormData
  );
  return response.data;
};
