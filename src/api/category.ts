import axios from "axios";
import type { Category, PaginatedResponse, Product } from "../types";
import { redirect } from "react-router-dom";

// Lấy API URL từ biến môi trường hoặc sử dụng giá trị mặc định
const API_URL = "http://localhost:3501/api";

// Hàm helper để kiểm tra và xử lý response
const handleApiResponse = (response: any, errorMessage: string) => {
  if (!response || !response.data) {
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.data;
};

/**
 * Get all categories
 * @returns {Promise<Category[]>} List of categories
 */
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    // Kiểm tra nếu response có dữ liệu
    if (!response.data) {
      // console.error("API returned empty data for categories");
      // Trả về mảng rỗng thay vì ném lỗi để tránh crash UI
      return [];
    }

    // Kiểm tra nếu dữ liệu trả về là mảng
    if (!Array.isArray(response.data)) {
      console.warn(
        "API did not return an array for categories, attempting to extract data"
      );
      // Thử lấy dữ liệu từ các cấu trúc phổ biến
      const data =
        response.data.data ||
        response.data.categories ||
        response.data.items ||
        [];
      return data;
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.error(`Error fetching categories: ${error.message}`);
      // console.error("Response data:", error.response?.data);
      // console.error("Response status:", error.response?.status);
    } else {
      console.error("Error fetching categories:", error);
    }
    throw error;
  }
};

/**
 * Get a category by slug
 * @param {string} slug - The category slug
 * @returns {Promise<Category>} Category data
 */
export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  try {
    const response = await axios.get(`${API_URL}/categories/${slug}`);
    // console.log("API response received:", response.status);

    if (!response.data) {
      console.error(`API returned empty data for category slug: ${slug}`);
      throw new Error("Category not found");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      redirect("/not-found");
      // console.error(
      //   `Error fetching category with slug ${slug}: ${error.message}`
      // );
      // console.error("Response data:", error.response?.data);
      // console.error("Response status:", error.response?.status);
    } else {
      console.error(`Error fetching category with slug ${slug}:`, error);
    }
    throw error;
  }
};

/**
 * Get products by category
 * @param {number} categorySlug - The category slug
 * @param {Object} params - Query parameters (pagination, filters, etc.)
 * @returns {Promise<PaginatedResponse<Product>>} Products data
 */
export const getProductsByCategory = async (
  categorySlug: string,
  params: { page?: number; pageSize?: number; sort?: string } = {}
): Promise<PaginatedResponse<Product>> => {
  try {
    const response = await axios.get(
      `${API_URL}/categories/${categorySlug}/products`,
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
    redirect("/not-found");
    console.error(
      `Error fetching products for category ${categorySlug}:`,
      error
    );
    throw error;
  }
};
