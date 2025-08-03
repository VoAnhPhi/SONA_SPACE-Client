import axios from "axios";
import type { ContactFormDesign } from "../types";
import { convertToAdminApiUrl } from "../utils/url";

export const sendContactFormDesign = async (formData: ContactFormDesign) => {
  const response = await axios.post(
    convertToAdminApiUrl("/contact-form-design"),
    formData
  );
  return response.data;
};
