"use client";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsCategories from "../../components/CategoryNews";
import RecentPosts from "../../components/RecentPosts";
import React, { useState, useEffect } from "react";
import PolicyProduct from "../../components/Policy";

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

const News: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [isFetching, setIsFetching] = useState(false);

  const [categories] = useState<Category[]>([
    {
      id: "1",
      name: "Xu Hướng Thiết Kế",
      slug: "xu-huong-thiet-ke",
      icon: "/images/icons/design-trend.svg",
    },
    {
      id: "2",
      name: "Trang Trí Nhà Đẹp",
      slug: "trang-tri-nha-dep",
      icon: "/images/icons/home-decor.svg",
    },
    {
      id: "3",
      name: "Tư Vấn Thiết Kế",
      slug: "tu-van-thiet-ke",
      icon: "/images/icons/design-advice.svg",
    },
    {
      id: "4",
      name: "Mẹo & Bí Quyết",
      slug: "meo-bi-quyet",
      icon: "/images/icons/tips-tricks.svg",
    },
    {
      id: "5",
      name: "Sản Phẩm Nội Thất",
      slug: "san-pham-noi-that",
      icon: "/images/icons/furniture.svg",
    },
  ]);

  // News articles data
  const [newsItems] = useState<NewsItem[]>([
    {
      id: "1",
      title: "Nội thất gỗ sồi - sự giao thoa giữa vẻ đẹp và chất lượng",
      image: "https://picsum.photos/800/600?seed=1",
      slug: "noi-that-go-soi",
      category: "Trang Trí Nhà Đẹp",
      date: "2023-10-01",
    },
    {
      id: "2",
      title: "Tạo lập phòng ăn chất lượng với 5 cách đơn giản",
      image: "https://picsum.photos/800/600?seed=2",
      slug: "tao-lap-phong-an",
      category: "Tư Vấn Thiết Kế",
      date: "2023-10-02",
    },
    {
      id: "3",
      title: "Không gian tươi mới, đón tết đoàn viên",
      image: "https://picsum.photos/800/600?seed=3",
      slug: "khong-gian-tuoi-moi",
      category: "Mẹo & Bí Quyết",
      date: "2023-10-03",
    },
    {
      id: "4",
      title: "Những ý tưởng trang trí phòng khách nổi bật",
      image: "https://picsum.photos/800/600?seed=4",
      slug: "y-tuong-trang-tri-phong-khach",
      category: "Xu Hướng Thiết Kế",
      date: "2023-10-04",
    },
    {
      id: "5",
      title: "Mang tần giỏ Lagom đến không gian sống của bạn",
      image: "https://picsum.photos/800/600?seed=5",
      slug: "mang-tan-gio-lagom",
      category: "Tư Liệu Nội Thất",
      date: "2023-10-05",
    },
    {
      id: "6",
      title: "Có nên mua sofa da công nghiệp không?",
      image: "https://picsum.photos/800/600?seed=6",
      slug: "co-nen-mua-sofa-da-cong-nghiep",
      category: "Sản Phẩm Nội Thất",
      date: "2023-10-06",
    },
    {
      id: "7",
      title: "Những mẫu phòng khách nhà đẹp kiểu châu Âu đẹp hút hồn",
      image: "https://picsum.photos/800/600?seed=7",
      slug: "mau-phong-khach-chau-au",
      category: "Trang Trí Nhà Đẹp",
    },
    {
      id: "8",
      title: "Chọn màu bàn ghế nhà đẹp cho phòng khách",
      image: "https://picsum.photos/800/600?seed=8",
      slug: "chon-mau-ban-ghe-nha-dep",
      category: "Tư Vấn Thiết Kế",
    },
    {
      id: "9",
      title: "Kinh nghiệm lựa chọn nội thất chung cư",
      image: "https://picsum.photos/800/600?seed=9",
      slug: "kinh-nghiem-lua-chon-noi-that",
      category: "Mẹo & Bí Quyết",
    },
    {
      id: "10",
      title: "Bảo quản đồ gỗ khi độ ẩm không khí cao",
      image: "https://picsum.photos/800/600?seed=10",
      slug: "bao-quan-do-go",
      category: "Tư Liệu Nội Thất",
    },
    {
      id: "11",
      title: "Mẹo bảo quản & vệ sinh các đồ nội thất",
      image: "https://picsum.photos/800/600?seed=11",
      slug: "meo-bao-quan-ve-sinh",
      category: "Mẹo & Bí Quyết",
    },
    {
      id: "12",
      title: "5 sai lầm cần tránh khi mua bàn ghế sofa",
      image: "https://picsum.photos/800/600?seed=12",
      slug: "sai-lam-khi-mua-sofa",
      category: "Tư Vấn Thiết Kế",
    },
    {
      id: "13",
      title: "Xu hướng nội thất 2024 - Sự trở lại của gỗ tự nhiên",
      image: "https://picsum.photos/800/600?seed=13",
      slug: "xu-huong-noi-that-2024",
      category: "Xu Hướng Thiết Kế",
    },
    {
      id: "14",
      title: "Cách chọn sofa phù hợp với không gian sống",
      image: "https://picsum.photos/800/600?seed=14",
      slug: "chon-sofa-phu-hop",
      category: "Sản Phẩm Nội Thất",
    },
    {
      id: "15",
      title: "Những mẫu bàn ăn đẹp cho gia đình hiện đại",
      image: "https://picsum.photos/800/600?seed=15",
      slug: "mau-ban-an-gia-dinh-hien-dai",
      category: "Trang Trí Nhà Đẹp",
    },
    {
      id: "16",
      title: "Cách bảo quản sofa da để bền đẹp",
      image: "https://picsum.photos/800/600?seed=16",
      slug: "bao-quan-sofa-da",
      category: "Sản Phẩm Nội Thất",
    },
  ]);

  const getPostCountByCategory = (categoryName: string) => {
    return newsItems.filter((item) => item.category === categoryName).length;
  };

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

      if (bottom && !isFetching && visibleCount < newsItems.length) {
        setIsFetching(true);
        setTimeout(() => {
          setVisibleCount((prev) => prev + 4);
          setIsFetching(false);
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, visibleCount, newsItems.length]);

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
                {newsItems.slice(0, visibleCount).map((item) => (
                  <div className="news-item" key={item.id}>
                    <Link to={`/tin-tuc/${item.slug}`}>
                      <img src={item.image} alt={item.title} />
                      <h3>{item.title}</h3>
                      <p>{item.category}</p>
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
              <NewsCategories
                categories={categories}
                getPostCountByCategory={getPostCountByCategory}
              />
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
