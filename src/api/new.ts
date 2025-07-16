import axios from "axios";
import type { NewsArticle, NewsCategory } from "../types";

// Lấy API URL từ biến môi trường hoặc sử dụng giá trị mặc định
const API_URL = "http://localhost:3501/api";

// Hàm helper để kiểm tra và xử lý response
// const handleApiResponse = (response: any, errorMessage: string) => {
//   if (!response || !response.data) {
//     console.error(errorMessage);
//     throw new Error(errorMessage);
//   }
//   return response.data;
// };

/**
 * Get all news
 * @returns {Promise<NewsArticle[]>} List of news
 */

export const getAllNews = async (
  tryFallback = false
): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get(`${API_URL}/news`);

    if (!response.data) {
      return [];
    }
    if (!Array.isArray(response.data)) {
      const data =
        response.data.data || response.data.news || response.data.items || [];
      return data;
    }
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 404 &&
      !tryFallback
    ) {
      return await getAllNews(true);
    }
    throw error;
  }
};

export const getNewsBySlugDetail = async (
  slug: string
): Promise<NewsArticle> => {
  try {
    const response = await axios.get(`${API_URL}/news/${slug}`);
    if (!response.data) {
      throw new Error("news not found");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllNewsSimple = async (
  tryFallback = false
): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get(`${API_URL}/news/simple`);

    if (!response.data) {
      return [];
    }
    if (!Array.isArray(response.data)) {
      // Xử lý dữ liệu không đúng định dạng
      const data =
        response.data.data || response.data.news || response.data.items || [];
      return data;
    }
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 404 &&
      !tryFallback
    ) {
      // Chỉ gọi lại API fallback một lần
      return await getAllNews(true); // gọi lại với tryFallback=true
    }
    throw error;
  }
};

export const getAllNewsByView = async (
  tryFallback = false
): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get(`${API_URL}/news/views`);
    if (!response.data) return [];
    if (!Array.isArray(response.data)) {
      const data =
        response.data.data || response.data.news || response.data.items || [];
      return data;
    }
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 404 &&
      !tryFallback
    ) {
      return await getAllNewsByView(true);
    }
    throw error;
  }
};

export const getAllNewsCategories = async (): Promise<NewsCategory[]> => {
  try {
    const response = await axios.get(`${API_URL}/news-categories`);

    // Kiểm tra nếu response có dữ liệu
    if (!response.data) {
      console.error("API returned empty data for news");
      // Trả về mảng rỗng thay vì ném lỗi để tránh crash UI
      return [];
    }

    // Kiểm tra nếu dữ liệu trả về là mảng
    if (!Array.isArray(response.data)) {
      console.warn(
        "API did not return an array for news, attempting to extract data"
      );

      // Thử lấy dữ liệu từ các cấu trúc phổ biến
      const data =
        response.data.data || response.data.news || response.data.items || [];
      return data;
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        try {
          const altResponse = await axios.get(`${API_URL}/news`);
          return altResponse.data;
        } catch (altError) {}
      }
    } else {
    }
    throw error;
  }
};
export const getNewsBySlug = async (slug: string): Promise<NewsArticle> => {
  try {
    const response = await axios.get(`${API_URL}/news/${slug}`);

    if (!response.data) {
      throw new Error("news not found");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        try {
          const altResponse = await axios.get(`${API_URL}/news/${slug}`);
          return altResponse.data;
        } catch (altError) {}
      }
    } else {
    }
    throw error;
  }
};

/**
 * Get NewsCategory by news
 * @param {number} newsId - The news ID
 * @param {Object} params - Query parameters (pagination, filters, etc.)

 */
export const getNewsCategoryBynews = async (
  newsId: number,
  params: { [key: string]: any } = {}
): Promise<NewsCategory> => {
  try {
    const response = await axios.get(
      `${API_URL}/news-categories/${newsId}/NewsCategory`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        try {
          const altResponse = await axios.get(
            `${API_URL}/news-categories/${newsId}/NewsCategory`,
            { params }
          );
          return altResponse.data;
        } catch (altError) {}
      }
    } else {
    }
    throw error;
  }
};
