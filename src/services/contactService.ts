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
