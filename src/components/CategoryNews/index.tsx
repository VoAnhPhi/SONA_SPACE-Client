"use client";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import type { NewsArticle, NewsCategory } from "../../types";
import {  getAllNewsCategories } from "../../api/new"; // Import hàm API

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface NewsItem {
  id: string;
  title: string;
  image: string;
  slug: string;
  category: string;
  date?: string;
}

interface NewsProps {
  limit?: number;
  showProductCount?: boolean;
}
const NewsCategories: React.FC<NewsProps> = ({
  limit
}) => {
  const [news, setNews] = useState<NewsCategory[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllNewsCategories();
        setDebugInfo(prev => `${prev}\nReceived ${data.length} news`);
        // Apply limit if provided
        const limitedData = limit ? data.slice(0, limit) : data;
        setNews(limitedData);
        setError(null); 
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, [limit]);
  return (
    <div className="news-categories">
      <h2>Danh mục tin tức</h2>
      <ul>
        {news.map((category) => (
          <li key={category.news_category_id}>
            <div className="category-item">
              <span className="category-name">{category.name}</span>
              <span className="post-count">
                {category.news_count}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsCategories;