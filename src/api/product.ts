import axios from "axios";
import type { Product, PaginatedResponse, Variant } from "../types";

const API_URL = "http://localhost:3501/api";

const handleApiResponse = (response: any, errorMessage: string) => {
  if (!response || !response.data) {
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.data;
};

/**
 * Get all products (optionally with pagination or filter params)
 * @param {Object} params - Query parameters (pagination, filters, etc.)
 * @returns {Promise<PaginatedResponse<Product>>} List of products
 */
export const getAllProducts = async (
  page: number = 1,
  limit: number = 8
): Promise<PaginatedResponse<Product>> => {
  try {
    console.log(
      `Calling API: GET ${API_URL}/products?page=${page}&limit=${limit}`
    );
    const response = await axios.get(`${API_URL}/products`, {
      params: { page, limit },
    });

    const data = handleApiResponse(response, "No data received from API");

    if (!Array.isArray(data.products) || !data.pagination) {
      console.error("Invalid API response structure");
      return {
        items: [],
        total: 0,
        page,
        pageSize: limit,
        totalPages: 0,
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
    console.error("Error fetching paginated products:", error);
    throw error;
  }
};

/**
 * Get a product by slug
 * @param {string} slug - Product slug
 * @returns {Promise<Product>} Product data
 */

// product.api.ts
export const getProductBySlug = async (
  slug: string
): Promise<{
  product: any;
  colors: any[];
  related_products: any[];
}> => {
  try {
    const response = await axios.get(`${API_URL}/products/${slug}`);
    return handleApiResponse(response, "No data received from API");
  } catch (error) {
    // xử lý lỗi...
    throw error;
  }
};

/**
 * Search products by keyword
 * @param {string} keyword - Keyword to search
 * @param {Object} params - Additional params like pagination, sort...
 * @returns {Promise<PaginatedResponse<Product>>} Search results
 */
export const searchProducts = async (
  keyword: string,
  params: { page?: number; pageSize?: number; sort?: string } = {}
): Promise<PaginatedResponse<Product>> => {
  try {
    console.log(
      `Calling API: GET ${API_URL}/products/search with keyword: ${keyword}`
    );

    const response = await axios.get(`${API_URL}/products/search`, {
      params: { ...params, keyword },
    });

    const data = response.data;

    if (!data || !data.products || !data.pagination) {
      console.error("Invalid search API response structure");
      return {
        items: [],
        total: 0,
        page: params.page || 1,
        pageSize: params.pageSize || 10,
        totalPages: 0,
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
    console.error(`Error searching products with keyword "${keyword}":`, error);
    throw error;
  }
};
