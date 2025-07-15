// src/api/variant.api.ts
import axios from "axios";

const API_URL = "http://localhost:3501/api";

export const getVariantBySlugAndColor = async (
  slug: string,
  colorId: number
): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/variants/${slug}/${colorId}`);
    if (!response.data) throw new Error("No data received for variant");
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching variant for slug "${slug}" and colorId ${colorId}:`,
      error
    );
    throw error;
  }
};
