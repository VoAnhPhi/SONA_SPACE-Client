import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategory,
  getProductsByCategoryUsingTest,
} from "../api/category";
import type { Category, PaginatedResponse, Product } from "../types";
import axios from "axios";
import { formatProductForDisplay } from "./productService";

/**
 * Fetch all categories
 * @returns {Promise<Category[]>} List of categories
 */
export const fetchAllCategories = async (): Promise<Category[]> => {
  try {
    const categories = await getAllCategories();
    return categories;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === "ECONNREFUSED") {
    }
    return [];
  }
};

export const fetchCategoryBySlug = async (
  slug: string
): Promise<Category | null> => {
  try {
    const category = await getCategoryBySlug(slug);
    return category;
  } catch (error) {
    return null;
  }
};

export const fetchProductsByCategory = async (
  categorySlug: string,
  params: { page?: number; pageSize?: number; sort?: string } = {}
): Promise<PaginatedResponse<Product> | null> => {
  try {
    const productsData = await getProductsByCategory(categorySlug, params);
    return productsData;
  } catch (error) {
    return {
      items: [],
      total: 0,
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      totalPages: 1,
    };
  }
};

// New: use /products/test to fetch by category + filters
export const fetchProductsByCategoryUsingTest = async (
  categorySlug: string,
  params: {
    page?: number;
    pageSize?: number;
    sort?: string;
    price?: string;
    color?: string;
    roomSlug?: string;
  } = {}
): Promise<{ products: Product[]; totalPages: number }> => {
  try {
    const raw = await getProductsByCategoryUsingTest(categorySlug, params);
    return {
      products: raw.items.map(formatProductForDisplay),
      totalPages: raw.totalPages,
    };
  } catch (error) {
    return { products: [], totalPages: 1 };
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
