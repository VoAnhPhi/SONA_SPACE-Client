'use client';
import { Link } from "react-router-dom";
import type { NewsArticle } from "../../types";
import React, { useState, useEffect } from "react";
import { getAllNewsByView } from "../../api/new";

interface NewsItem {
  id: string;
  title: string;
  image: string;
  slug: string;
  category: string;
  date?: string;
}

interface RecentPostsProps {
  newsItems: NewsItem[];
  limit?: number;
}

const RecentPosts: React.FC<RecentPostsProps> = ({
  limit
}) => {
  const [newsByView, setNewsByView] = useState<NewsArticle[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllNewsByView();
        setDebugInfo(prev => `${prev}\nReceived ${data.length} news`);
        setNewsByView(data);
        setError(null);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, [limit]);
  return (
    <div className="recent-posts">
      <h2>Bài viết nổi bật</h2>
      <ul>
        {newsByView.slice(0, 4).map((item) => (
          <li key={item.news_id}>
            <Link to={`/tin-tuc/${item.news_slug}`} className="recent-post-item">
              {(() => {
                try {
                  return <img src={item.news_image} alt={item.news_title} />;
                } catch (error) {
                  return <img src="/fallback-image.jpg" alt={item.news_title} />;
                }
              })()}

              <div className="post-info">
                <span className="post-title">{item.news_title}</span>
                <span className="post-date">
                  {item.news_view}

                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPosts;
