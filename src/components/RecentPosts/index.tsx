import React from "react";
import { Link } from "react-router-dom";

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
}

const RecentPosts: React.FC<RecentPostsProps> = ({ newsItems }) => {
  return (
    <div className="recent-posts">
      <h2>Bài viết nổi bật</h2>
      <ul>
        {newsItems.slice(0, 4).map((item) => (
          <li key={item.id}>
            <Link to={`/news/${item.slug}`} className="recent-post-item">
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
    </div>
  );
};

export default RecentPosts;
