import axios from "axios";
import type { Room, Product, PaginatedResponse } from "../types";
import { convertToAdminApiUrl } from "../utils/url";

/**
 * Get all rooms
 * @returns {Promise<Room[]>} List of rooms
 */
export const getAllRooms = async (): Promise<Room[]> => {
  try {
    const response = await axios.get(convertToAdminApiUrl("/rooms"));

    // Kiểm tra nếu response có dữ liệu
    // if (!response.data) {
    //   console.error("API returned empty data for rooms");
    //   Trả về mảng rỗng thay vì ném lỗi để tránh crash UI
    //   return [];
    // }

    // Kiểm tra nếu dữ liệu trả về là mảng
    if (!Array.isArray(response.data)) {
      // console.warn(
      //   "API did not return an array for rooms, attempting to extract data"
      // );

      // Thử lấy dữ liệu từ các cấu trúc phổ biến
      const data =
        response.data.data || response.data.rooms || response.data.items || [];
      // console.log("Extracted data:", response.data);
      return data;
    }

    return response.data;
  } catch (error) {
    // console.error("Error fetching rooms:", error);
    throw error;
  }
};

/**
 * Get a room by slug
 * @param {string} slug - The room slug
 * @returns {Promise<Room>} Room data
 */
export const getRoomBySlug = async (slug: string): Promise<Room> => {
  try {
    const response = await axios.get(convertToAdminApiUrl(`/rooms/${slug}`));

    if (!response.data) {
      console.error(`API returned empty data for category slug: ${slug}`);
      throw new Error("Category not found");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching room by slug:", error);
    throw error;
  }
};

/**
 * Get products by category
 * @param {number} roomSlug - The category ID
 * @param {Object} params - Query parameters (pagination, filters, etc.)
 * @returns {Promise<PaginatedResponse<Product>>} Products data
 */
export const getProductsByRoom = async (
  roomSlug: string,
  params: { page?: number; pageSize?: number; sort?: string } = {}
): Promise<PaginatedResponse<Product>> => {
  try {
    const response = await axios.get(convertToAdminApiUrl(`/rooms/${roomSlug}/products`), {
      params,
    });

    const { products, pagination } = response.data;
    return {
      items: products,
      total: pagination.total,
      page: pagination.currentPage,
      pageSize: pagination.productsPerPage,
      totalPages: pagination.totalPages,
    };
  } catch (error) {
    console.error(`Error fetching products for room ${roomSlug}:`, error);
    throw error;
  }
};
