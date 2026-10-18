import type { ContactFormDesign } from "./types";
import { http } from "@/shared/api/http";

export const sendContactFormDesign = async (formData: ContactFormDesign) => {
  const response = await http.post(
    "/contact-form-design",
    formData
  );
  return response.data;
};
