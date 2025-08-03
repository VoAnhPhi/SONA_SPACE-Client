// services/contactService.ts
import axios from "axios";
import type { ContactForm } from "../types";
import { convertToAdminApiUrl } from "../utils/url";

export const sendContactForm = async (formData: ContactForm) => {
  // Map the form data to match server expectations
  // Server only expects: name, email, phone, message
  const serverFormData = {
    name: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
  };

  const response = await axios.post(
    convertToAdminApiUrl("/contact-forms"),
    serverFormData
  );
  return response.data;
};
