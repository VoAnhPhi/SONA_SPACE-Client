// src/api/variant.api.ts
import axios from "axios";
import { convertToAdminApiUrl } from "../utils/url";

export const getVariantBySlugAndColor = async (
  slug: string,
  colorId: number
): Promise<any> => {
  try {
    const response = await axios.get(convertToAdminApiUrl(`/variants/${slug}/${colorId}`));
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
