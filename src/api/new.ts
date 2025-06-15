import axios from 'axios';
import type { NewsArticle , NewsCategory } from '../types';

// Lấy API URL từ biến môi trường hoặc sử dụng giá trị mặc định
const API_URL = 'http://localhost:3501/api';

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

export const getAllNews = async (): Promise<NewsArticle[]> => {
  try {
    console.log(`Calling API: GET ${API_URL}/news`);
    const response = await axios.get(`${API_URL}/news`);
    console.log('API response received:', response.status);
    
    // Kiểm tra nếu response có dữ liệu
    if (!response.data) {
      console.error('API returned empty data for news');
      // Trả về mảng rỗng thay vì ném lỗi để tránh crash UI
      return [];
    }
    
    // Kiểm tra nếu dữ liệu trả về là mảng
    if (!Array.isArray(response.data)) {
      console.warn('API did not return an array for news, attempting to extract data');
      
      // Thử lấy dữ liệu từ các cấu trúc phổ biến
      const data = response.data.data || response.data.news || response.data.items || [];
      console.log('Extracted data:', data);
      return data;
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching news: ${error.message}`);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      
      // Thử endpoint khác nếu endpoint chính không hoạt động
      if (error.response?.status === 404) {
        try {
          console.log('Trying alternative endpoint...');
          const altResponse = await axios.get(`${API_URL}/news`);
          return altResponse.data;
        } catch (altError) {
          console.error('Alternative endpoint also failed');
        }
      }
    } else {
      console.error('Error fetching news:', error);
    }
    throw error;
  }
};
export const getAllNewsByView = async (): Promise<NewsArticle[]> => {
  try {
    console.log(`Calling API: GET ${API_URL}/news/views`);
    const response = await axios.get(`${API_URL}/news/views`);
    console.log('API response received:', response.status);
    
    // Kiểm tra nếu response có dữ liệu
    if (!response.data) {
      console.error('API returned empty data for news');
      // Trả về mảng rỗng thay vì ném lỗi để tránh crash UI
      return [];
    }
    
    // Kiểm tra nếu dữ liệu trả về là mảng
    if (!Array.isArray(response.data)) {
      console.warn('API did not return an array for news, attempting to extract data');
      
      // Thử lấy dữ liệu từ các cấu trúc phổ biến
      const data = response.data.data || response.data.news || response.data.items || [];
      console.log('Extracted data new by view:', data);
      return data;
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching news: ${error.message}`);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      
      // Thử endpoint khác nếu endpoint chính không hoạt động
      if (error.response?.status === 404) {
        try {
          console.log('Trying alternative endpoint...');
          const altResponse = await axios.get(`${API_URL}/news/views`);
          return altResponse.data;
        } catch (altError) {
          console.error('Alternative endpoint also failed');
        }
      }
    } else {
      console.error('Error fetching news:', error);
    }
    throw error;
  }
};
export const getAllNewsCategories = async (): Promise<NewsCategory[]> => {
  try {
    console.log(`Calling API: GET ${API_URL}/news-categories`);
    const response = await axios.get(`${API_URL}/news-categories`);
    console.log('API response received:', response.status);
    
    // Kiểm tra nếu response có dữ liệu
    if (!response.data) {
      console.error('API returned empty data for news');
      // Trả về mảng rỗng thay vì ném lỗi để tránh crash UI
      return [];
    }
    
    // Kiểm tra nếu dữ liệu trả về là mảng
    if (!Array.isArray(response.data)) {
      console.warn('API did not return an array for news, attempting to extract data');
      
      // Thử lấy dữ liệu từ các cấu trúc phổ biến
      const data = response.data.data || response.data.news || response.data.items || [];
      console.log('Extracted data:', data);
      return data;
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching news: ${error.message}`);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      
      // Thử endpoint khác nếu endpoint chính không hoạt động
      if (error.response?.status === 404) {
        try {
          console.log('Trying alternative endpoint...');
          const altResponse = await axios.get(`${API_URL}/news`);
          return altResponse.data;
        } catch (altError) {
          console.error('Alternative endpoint also failed');
        }
      }
    } else {
      console.error('Error fetching news:', error);
    }
    throw error;
  }
};
export const getNewsBySlug = async (slug: string): Promise<NewsArticle> => {
  try {
    console.log(`Calling API: GET ${API_URL}/news/${slug}`);
    const response = await axios.get(`${API_URL}/news/${slug}`);
    console.log('API response received:', response.status);
    
    if (!response.data) {
      console.error(`API returned empty data for news slug: ${slug}`);
      throw new Error('news not found');
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching news with slug ${slug}: ${error.message}`);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      
      // Thử endpoint khác nếu endpoint chính không hoạt động
      if (error.response?.status === 404) {
        try {
          console.log('Trying alternative endpoint...');
          const altResponse = await axios.get(`${API_URL}/news/${slug}`);
          return altResponse.data;
        } catch (altError) {
          console.error('Alternative endpoint also failed');
        }
      }
    } else {
      console.error(`Error fetching news with slug ${slug}:`, error);
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
    console.log(`Calling API: GET ${API_URL}/news-categories/${newsId}/NewsCategory with params:`, params);
    const response = await axios.get(`${API_URL}/news-categories/${newsId}/NewsCategory`, { params });
    console.log('API response received:', response.status);


    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching NewsCategory for news ${newsId}: ${error.message}`);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);

      if (error.response?.status === 404) {
        try {
          console.log('Trying alternative endpoint...');
          const altResponse = await axios.get(`${API_URL}/news-categories/${newsId}/NewsCategory`, { params });
          return altResponse.data;
        } catch (altError) {
          console.error('Alternative endpoint also failed');
        }
      }
    } else {
      console.error(`Error fetching NewsCategory for news ${newsId}:`, error);
    }
    throw error;
  }
}