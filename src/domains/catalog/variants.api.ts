import { http } from "@/shared/api/http";
// src/api/variant.api.ts

export const getVariantBySlugAndColor = async (
  slug: string,
  colorId: number
): Promise<any> => {
  try {
    const response = await http.get(`/variants/${slug}/${colorId}`);
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
