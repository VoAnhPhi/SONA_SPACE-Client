import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
}

const News: React.FC = () => {
  // Categories for filtering
  const [categories] = useState<Category[]>([
    { id: "1", name: "Xu Hướng Thiết Kế", slug: "xu-huong-thiet-ke", icon: "/images/icons/design-trend.svg" },
    { id: "2", name: "Trang Trí Nhà Đẹp", slug: "trang-tri-nha-dep", icon: "/images/icons/home-decor.svg" },
    { id: "3", name: "Tư Vấn Thiết Kế", slug: "tu-van-thiet-ke", icon: "/images/icons/design-advice.svg" },
    { id: "4", name: "Mẹo & Bí Quyết", slug: "meo-bi-quyet", icon: "/images/icons/tips-tricks.svg" },
    { id: "5", name: "Sản Phẩm Nội Thất", slug: "san-pham-noi-that", icon: "/images/icons/furniture.svg" },
    { id: "6", name: "Tư Liệu Nội Thất", slug: "tu-lieu-noi-that", icon: "/images/icons/resources.svg" },
    { id: "7", name: "Nội Thất Xanh Bền Vững", slug: "noi-that-xanh-ben-vung", icon: "/images/icons/sustainable.svg" },
    { id: "8", name: "Cảm Hứng Sống Đẹp", slug: "cam-hung-song-dep", icon: "/images/icons/inspiration.svg" },
  ]);

  // News articles data
  const [newsItems] = useState<NewsItem[]>([
    {
      id: "1",
      title: "Nội thất gỗ sồi - sự giao thoa giữa vẻ đẹp và chất lượng",
      image: "/images/news/news-1.jpg",
      slug: "noi-that-go-soi",
      category: "Trang Trí Nhà Đẹp"
    },
    {
      id: "2",
      title: "Tạo lập phòng ăn chất lượng với 5 cách đơn giản",
      image: "/images/news/news-2.jpg",
      slug: "tao-lap-phong-an",
      category: "Tư Vấn Thiết Kế"
    },
    {
      id: "3",
      title: "Không gian tươi mới, đón tết đoàn viên",
      image: "/images/news/news-3.jpg",
      slug: "khong-gian-tuoi-moi",
      category: "Mẹo & Bí Quyết"
    },
    {
      id: "4",
      title: "Những ý tưởng trang trí phòng khách nổi bật",
      image: "/images/news/news-4.jpg",
      slug: "y-tuong-trang-tri-phong-khach",
      category: "Xu Hướng Thiết Kế"
    },
    {
      id: "5",
      title: "Mang tần giỏ Lagom đến không gian sống của bạn",
      image: "/images/news/news-5.jpg",
      slug: "mang-tan-gio-lagom",
      category: "Tư Liệu Nội Thất"
    },
    {
      id: "6",
      title: "Có nên mua sofa da công nghiệp không?",
      image: "/images/news/news-6.jpg",
      slug: "co-nen-mua-sofa-da-cong-nghiep",
      category: "Sản Phẩm Nội Thất"
    },
    {
      id: "7",
      title: "Những mẫu phòng khách nhà đẹp kiểu châu Âu đẹp hút hồn",
      image: "/images/news/news-7.jpg",
      slug: "mau-phong-khach-chau-au",
      category: "Trang Trí Nhà Đẹp"
    },
    {
      id: "8",
      title: "Chọn màu bàn ghế nhà đẹp cho phòng khách",
      image: "/images/news/news-8.jpg",
      slug: "chon-mau-ban-ghe-nha-dep",
      category: "Tư Vấn Thiết Kế"
    },
    {
      id: "9",
      title: "Kinh nghiệm lựa chọn nội thất chung cư",
      image: "/images/news/news-9.jpg",
      slug: "kinh-nghiem-lua-chon-noi-that",
      category: "Mẹo & Bí Quyết"
    },
    {
      id: "10",
      title: "Bảo quản đồ gỗ khi độ ẩm không khí cao",
      image: "/images/news/news-10.jpg",
      slug: "bao-quan-do-go",
      category: "Tư Liệu Nội Thất"
    },
    {
      id: "11",
      title: "Mẹo bảo quản & vệ sinh các đồ nội thất",
      image: "/images/news/news-11.jpg",
      slug: "meo-bao-quan-ve-sinh",
      category: "Mẹo & Bí Quyết"
    },
    {
      id: "12",
      title: "5 sai lầm cần tránh khi mua bàn ghế sofa",
      image: "/images/news/news-12.jpg",
      slug: "sai-lam-khi-mua-sofa",
      category: "Tư Vấn Thiết Kế"
    }
  ]);

  return (
    <>
      <Header />
      <div className="news-page">
        {/* Categories Navigation */}
        <div className="categories-nav">
          <div className="container">
            <div className="categories-slider">
              {categories.map((category) => (
                <div className="category-item" key={category.id}>
                  <Link to={`/tin-tuc/${category.slug}`} className="category-link">
                    <div className="category-icon">
                      <img src={category.icon} alt={category.name} />
                    </div>
                    <div className="category-name">{category.name}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* News Content */}
        <div className="container">
          <h1 className="page-title">TIN TỨC</h1>
          
          <div className="news-grid">
            {newsItems.map((item) => (
              <div className="news-item" key={item.id}>
                <div className="news-image">
                  <Link to={`/tin-tuc/${item.slug}`}>
                    <img src={item.image} alt={item.title} />
                  </Link>
                </div>
                <div className="news-content">
                  <h3 className="news-title">
                    <Link to={`/tin-tuc/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <div className="news-actions">
                    <button className="btn-view">
                      <i className="icon-eye"></i>
                      <span>Xem thêm</span>
                    </button>
                    <button className="btn-favorite">
                      <i className="icon-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design Services Showcase */}
        <div className="design-services">
          <div className="container">
            <div className="services-grid">
              <div className="service-item">
                <Link to="/thiet-ke-ca-nhan-hoa">
                  <img src="/images/design/personalized-design.jpg" alt="Thiết kế cá nhân hóa" />
                  <div className="service-content">
                    <h3>Thiết kế cá nhân hóa</h3>
                    <p>Liên hệ ngay để được tư vấn</p>
                  </div>
                </Link>
              </div>
              
              <div className="service-item">
                <Link to="/tim-hieu-mau-vat-lieu">
                  <img src="/images/design/material-samples.jpg" alt="Tìm hiểu về các mẫu vật liệu" />
                  <div className="service-content">
                    <h3>Tìm hiểu thêm về các mẫu vật liệu</h3>
                  </div>
                </Link>
              </div>
              
              <div className="service-item">
                <Link to="/lien-he-ho-tro">
                  <img src="/images/design/design-consultation.jpg" alt="Bạn cần liên hệ hỗ trợ?" />
                  <div className="service-content">
                    <h3>Bạn cần liên hệ hỗ trợ?</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default News;
