import { http } from "@/shared/api/http";
// src/api/comment.api.ts


export const getProductComments = async (productId: number, page = 1) => {
  try {
    const response = await http.get(
      `/comments/product/${productId}`,
      {
        params: { page },
      }
    );

    if (!response.data) {
      throw new Error("No data received for comments");
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for product ${productId}:`, error);
    throw error;
  }
};

export default getProductComments;
