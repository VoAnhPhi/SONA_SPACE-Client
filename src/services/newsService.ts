import { getAllNews } from '../api/new';
import type { NewsArticle } from '../types';
import axios from 'axios';


/**
 * Fetch all news
 * @returns {Promise<NewsArticle[]>} List of news
 */
export const fetchAllNews = async (): Promise<NewsArticle[]> => {
  try {
    // console.log('Service: Fetching all news');
    const news = await getAllNews();
    // console.log(`Service: Received ${news.length} news`);
    return news;
  } catch (error) {
    console.error('Error in fetchAllnews service:', error);
    if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
      console.error('API server is not running or not accessible');
    }
    return [];
  }
};