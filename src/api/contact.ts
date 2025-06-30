import axios from "axios";
import type { ContactFormDesign } from "../types";

const API_URL = "http://localhost:3501/api";

export const sendContactFormDesign = async (formData: ContactFormDesign) => {
  const response = await axios.post(`${API_URL}/contact-form-design`, formData);
  return response.data;
};
