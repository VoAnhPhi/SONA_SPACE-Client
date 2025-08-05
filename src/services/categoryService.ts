import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "../api/category";
import type { Category, PaginatedResponse, Product } from "../types";
import axios from "axios";

/**
 * Fetch all categories
 * @returns {Promise<Category[]>} List of categories
 */
export const fetchAllCategories = async (): Promise<Category[]> => {
  try {
    const categories = await getAllCategories();
    // console.log("Service: Received categories:", categories);
    return categories;
  } catch (error) {
    // console.error("Error in fetchAllCategories service:", error);
    if (axios.isAxiosError(error) && error.code === "ECONNREFUSED") {
      // console.error("API server is not running or not accessible");
    }
    return [];
  }
};

// getAllCategories

/**
 * Fetch a category by slug
 * @param {string} slug - The category slug
 * @returns {Promise<Category | null>} Category data or null if not found
 */
export const fetchCategoryBySlug = async (
  slug: string
): Promise<Category | null> => {
  try {
    // console.log(`Service: Fetching category with slug: ${slug}`);
    const category = await getCategoryBySlug(slug);
    return category;
  } catch (error) {
    // console.error(
    //   `Error in fetchCategoryBySlug service for slug ${slug}:`,
    //   error
    // );
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        // console.error(`Category with slug ${slug} not found`);
      } else if (error.code === "ECONNREFUSED") {
        // console.error("API server is not running or not accessible");
      }
    }
    return null;
  }
};

/**
 * Fetch products by category ID
 * @param {number} categoryId - The category ID
 * @param {Object} params - Query parameters (pagination, filters, etc.)
 * @returns {Promise<PaginatedResponse<Product> | null>} Paginated products data or null if error
 */
export const fetchProductsByCategory = async (
  categorySlug: string,
  params: { page?: number; pageSize?: number; sort?: string } = {}
): Promise<PaginatedResponse<Product> | null> => {
  try {
    const productsData = await getProductsByCategory(categorySlug, params);
    // console.log(`Service: Received ${productsData.items.length} products`);
    // console.log("productsData", productsData);
    return productsData;
  } catch (error) {
    console.error(
      `Error in fetchProductsByCategory service for category ${categorySlug}:`,
      error
    );
    // Return empty paginated response on error
    return {
      items: [],
      total: 0,
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      totalPages: 1,
    };
  }
};

/**
 * Get featured categories (with highest priority or most products)
 * @param {number} limit - Number of categories to return
 * @returns {Promise<Category[]>} List of featured categories
 */
export const getFeaturedCategories = async (
  limit: number = 5
): Promise<Category[]> => {
  try {
    console.log(`Service: Fetching featured categories, limit: ${limit}`);
    const allCategories = await fetchAllCategories();
    // Sort by priority (lower number means higher priority) and then by product count
    const featuredCategories = allCategories
      .sort((a, b) => {
        if (a.category_priority !== b.category_priority) {
          return a.category_priority - b.category_priority;
        }
        return b.product_count - a.product_count;
      })
      .slice(0, limit);

    console.log(
      `Service: Returning ${featuredCategories.length} featured categories`
    );
    return featuredCategories;
  } catch (error) {
    console.error("Error in getFeaturedCategories service:", error);
    return [];
  }
};

// Define the return type for formatCategoryForDisplay
interface FormattedCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  children?: FormattedCategory[];
}

/**
 * Format category data for display
 * @param {Category} category - The category to format
 * @returns {FormattedCategory} Formatted category data
 */
export const formatCategoryForDisplay = (
  category: Category
): FormattedCategory => {
  return {
    id: category.category_id,
    name: category.category_name,
    slug: category.slug,
    image: category.category_image,
    productCount: category.product_count,
    children: category.children?.map((child) =>
      formatCategoryForDisplay(child)
    ),
  };
};
