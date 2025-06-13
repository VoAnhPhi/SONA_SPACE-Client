"use client";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsCategories from "../../components/CategoryNews";
import RecentPosts from "../../components/RecentPosts";
import React, { useState, useEffect } from "react";
import PolicyProduct from "../../components/Policy";
import type { NewsArticle, NewsCategory } from "../../types";
import { getAllNews } from "../../api/new"; // Import hàm API
import { fetchAllNews } from "../../services/newsService";

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
const News: React.FC<NewsProps> = ({
  limit
}) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllNews();
        console.log(data, "news");
        setDebugInfo(prev => `${prev}\nReceived ${data.length} news`);
        // Apply limit if provided
        const limitedData = limit ? data.slice(0, limit) : data;
        setNews(limitedData);
        setError(null); // gọi API lấy danh sách news
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, [limit]);
  return (
    <>
      <Header />

      <div className="news-page">
        {/* Banner Section */}
        <div className="news-banner">
          <div className="container-fluid">
            <div className="banner-image">
              <img
                src="/images/news/banner-news (2).jpg"
                alt="Tin tức và sự kiện mới nhất"
              />
            </div>
            <div className="banner-content">
              <h1>Tin Tức & Sự Kiện</h1>
              <p>Cập nhật những xu hướng mới nhất trong thiết kế nội thất</p>
            </div>
          </div>
        </div>

        {/* New Content */}
        <div className="container">
          <div className="news-content">
            <div className="content-right">
              <div className="news-grid">
                {news.map((news: NewsArticle) => (
                  <div className="news-item" key={news.news_id}>
                    <Link to={`/tin-tuc/${news.news_slug}`}>
                      {(() => {
                        try {
                          const imagesArray = JSON.parse(news.news_image);
                          const firstImage = imagesArray[0];
                          return <img src={firstImage} alt={news.news_name} />;
                        } catch (error) {
                          return <img src="/fallback-image.jpg" alt={news.news_name} />;
                        }
                      })()}
                      <h3>{news.news_name}</h3>
                      {/* <p>{item.category}</p> */}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="content-left">
              {/* <div className="news-categories">
                <h2>Danh mục tin tức</h2>
                <ul>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/news/${category.slug}`}
                        className="category-item"
                      >
                        <span className="category-name">{category.name}</span>
                        <span className="post-count">
                          {getPostCountByCategory(category.name)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul> */}
              <NewsCategories limit={5} />
              {/* </div> */}
              {/* Recent post */}
              {/* <div className="recent-posts">
                <h2>Bài viết nổi bật</h2>
                <ul>
                  {newsItems.slice(0, 5).map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/news/${item.slug}`}
                        className="recent-post-item"
                      >
                        <img src={item.image} alt={item.title} />
                        <div className="post-info">
                          <span className="post-title">{item.title}</span>
                          <span className="post-date">
                            {item.date
                              ? new Date(item.date).toLocaleDateString("vi-VN")
                              : "-"}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}
              <RecentPosts newsItems={newsItems} />
            </div>
          </div>
        </div>
        {/* Policy Section */}
        <PolicyProduct />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default News;
