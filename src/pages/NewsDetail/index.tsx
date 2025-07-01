"use client";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsCategories from "../../components/CategoryNews";
import RecentPosts from "../../components/RecentPosts";
import type { NewsArticle } from "../../types";
import { getAllNews } from "../../api/new";

interface NewsProps {
  limit?: number;
}

const NewsDetail: React.FC<NewsProps> = ({ limit }) => {
  const { slug } = useParams<{ slug: string }>();
  const [newsDetailItem, setNewsDetail] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy danh sách và tìm bài theo slug
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getAllNews();
        const limitData = limit ? data.slice(0, limit) : data;
        // Tìm bài theo slug
        const foundNews = limitData.find(item => item.news_slug === slug);
        if (foundNews) {
          setNewsDetail(foundNews);
        } else {
          setNewsDetail(null);
        }
        setError(null);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
        setError("Không thể lấy dữ liệu");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug, limit]);

  const formatDate = (dateString: string): string | undefined => {
    const date = new Date(dateString);
    // Lấy các phần
    const DD = ('0' + date.getDate()).slice(-2);
    const MM = ('0' + (date.getMonth() + 1)).slice(-2);
    const YYYY = date.getFullYear();
    const HH = ('0' + date.getHours()).slice(-2);
    const mm = ('0' + date.getMinutes()).slice(-2);
    const ss = ('0' + date.getSeconds()).slice(-2);

    return `${DD}/${MM}/${YYYY} ${HH}:${mm}:${ss}`;
  };
  const getFormattedDate = (dateString?: string | undefined) => {
    if (!dateString) return 'Ngày không xác định';
    return formatDate(dateString);
  };
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="news-detail-page">
          <div className="container">
            <div className="loading">Đang tải...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!newsDetailItem) {
    return (
      <>
        <Header />
        <div className="news-detail-page">
          <div className="container">
            <div className="not-found">Không tìm thấy bài viết.</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="news-detail-page">
        <div className="container">
          <div className="news-detail-wrapper">
            <div className="news-main-content">
              <h1 className="news-title">{newsDetailItem.news_title}</h1>
              <div className="news-meta">
                <span className="date">
                  {formatDate(
                    newsDetailItem.created_at ? newsDetailItem.created_at.toString() : ""
                  )}
                </span>
                {/* <span className="category">{newsDetailItem.news_category_id}</span> */}
                <span className="views">
                  <img src="../images/news/eye.svg" alt="" />
                  {newsDetailItem.news_view} lượt xem
                </span>
              </div>
              <div
                className="news-body"
                dangerouslySetInnerHTML={{ __html: newsDetailItem.news_content }}
              />

              {/* <div className="news-tags">
                {newsDetailItem.map((newsDetail:  NewsArticle) => (
                  <Link to={`/tin-tuc/tag/${NewsDetail}`} className="tag">
                    {tag}
                  </Link>
                ))}
              </div> */}
            </div>
            <div className="news-sidebar">
              <NewsCategories limit={5} />
              <RecentPosts newsItems={[]} /> {/* Tùy ý truyền dữ liệu khác */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;