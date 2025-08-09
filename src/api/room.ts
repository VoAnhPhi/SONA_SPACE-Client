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
    const response = await axios.get(
      convertToAdminApiUrl(`/rooms/${roomSlug}/products`),
      {
        params,
      }
    );

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

export const getProductsByRoomWithFilters = async (
  roomSlug: string,
  page: number = 1,
  limit: number = 8,
  filters: {
    category?: string;
    room?: string;
    price?: string;
    color?: string;
    sort?: string;
  } = {}
): Promise<PaginatedResponse<Product>> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      roomSlug: roomSlug,
      ...(filters?.category && { categorySlug: filters.category }),
      ...(filters?.price && { price: filters.price }),
      ...(filters?.color && { color: filters.color }),
      ...(filters?.sort && { sort: filters.sort }),
    });

    const response = await axios.get(convertToAdminApiUrl("/products/all"), {
      params: queryParams,
    });

    const data = response.data;

    if (!data || !data.products || !data.pagination) {
      return {
        items: [],
        total: 0,
        page: 1,
        pageSize: limit,
        totalPages: 1,
      };
    }

    return {
      items: data.products,
      total: data.pagination.totalProducts,
      page: data.pagination.currentPage,
      pageSize: data.pagination.productsPerPage,
      totalPages: data.pagination.totalPages,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Kiểm tra nếu server không chạy
      if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
      }
    }
    throw error;
  }
};
