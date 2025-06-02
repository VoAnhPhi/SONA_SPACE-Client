import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
}

interface RelatedNewsItem {
  id: string;
  title: string;
  slug: string;
  image: string;
  date: string;
}

interface SidebarNewsItem {
  id: string;
  title: string;
  slug: string;
  image: string;
  date: string;
}

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<RelatedNewsItem[]>([]);
  const [latestNews, setLatestNews] = useState<SidebarNewsItem[]>([]);
  const [popularNews, setPopularNews] = useState<SidebarNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch the news item from an API
    // For now, we'll use mock data
    setTimeout(() => {
      setNewsItem({
        id: "1",
        title: "Nội thất gỗ sồi - sự giao thoa của vẻ đẹp và chất lượng",
        slug: "noi-that-go-soi",
        image: "/images/news/news-detail.jpg",
        category: "Thiết kế nội thất",
        date: "15/06/2023",
        author: "Admin",
        content: `
          <p>Ngày nay, sự hướng tìm về với vẻ đẹp đơn giản, bền vững, gần gũi với thiên nhiên càng trở nên phổ biến. Đồ gỗ đã không đơn thuần chỉ là một chất liệu, mà nó đã trở thành biểu tượng hoàn hảo cho không gian sống đơn giản, mộc mạc kết hợp với nét đẹp hiện đại, sang trọng. Hãy cùng Sona Space phân phá những ưu điểm nổi bật của nội thất gỗ để có những ý tưởng hoàn hảo cho không gian bạn nhé.</p>
          
          <h2>1. Vẻ đẹp của tự nhiên</h2>
          <p>Nội thất gỗ mang vẻ đẹp của thời gian, từng vân gỗ, từng sự kết hợp với vật liệu thiên nhiên càng trở nên phổ biến. Đồ gỗ đã không đơn thuần chỉ là một chất liệu, mà nó đã trở thành biểu tượng hoàn hảo cho không gian sống đơn giản, mộc mạc kết hợp với nét đẹp hiện đại, sang trọng.</p>
          <img src="/images/news/interior-design-1.jpg" alt="Chất liệu gỗ vốn được biết đến" />
          
          <h2>2. Bền bỉ theo thời gian</h2>
          <p>Chất liệu gỗ vốn được biết đến là biểu tượng của sự bền vững và chắc chắn. Gỗ sồi có khả năng chịu nhiệt cao và thích nghi tốt với sự thay đổi nhanh của thời tiết, hạn chế sự cong, vênh và nứt trong quá trình sử dụng.</p>
          
          <h2>3. Thân thiện với môi trường</h2>
          <p>Nội thất gỗ sồi không chỉ là sự lựa chọn hoàn hảo về vẻ đẹp và phong cách, mà còn bởi tác động tích cực đến môi trường. Gỗ sồi là nguồn tài nguyên tái tạo được, có thể được trồng lại để cung cấp cho nhu cầu sử dụng.</p>
          <img src="/images/news/interior-design-2.jpg" alt="Nội thất gỗ sồi không" />
          
          <p>Tóm lại, xu hướng thiết kế nội thất năm 2023 đang hướng đến sự cân bằng giữa tính thẩm mỹ và công năng, giữa truyền thống và hiện đại, tạo ra những không gian sống không chỉ đẹp mắt mà còn phản ánh phong cách sống và giá trị của chủ nhân.</p>
        `,
        tags: ["thiết kế nội thất", "xu hướng 2023", "nội thất hiện đại", "phong cách sống"]
      });

      setRelatedNews([
        {
          id: "2",
          title: "5 Ý tưởng trang trí phòng khách nhỏ trở nên rộng rãi hơn",
          slug: "5-y-tuong-trang-tri-phong-khach-nho",
          image: "/images/news/related-1.jpg",
          date: "10/06/2023"
        },
        {
          id: "3",
          title: "Cách chọn nội thất phù hợp với phong cách Scandinavian",
          slug: "cach-chon-noi-that-phong-cach-scandinavian",
          image: "/images/news/related-2.jpg",
          date: "05/06/2023"
        },
        {
          id: "4",
          title: "Những mẫu phòng ngủ đẹp dành cho không gian nhỏ",
          slug: "nhung-mau-phong-ngu-dep-cho-khong-gian-nho",
          image: "/images/news/related-3.jpg",
          date: "01/06/2023"
        }
      ]);

      // Latest news items for sidebar
      setLatestNews([
        {
          id: "5",
          title: "Tạo lập phòng ăn chất lượng với 5 cách đơn giản",
          slug: "tao-lap-phong-an-chat-luong",
          image: "/images/news/latest-1.jpg",
          date: "2023-04-15 23:12:34"
        },
        {
          id: "6",
          title: "Không gian tươi mới, đón tết đoàn viên",
          slug: "khong-gian-tuoi-moi-don-tet",
          image: "/images/news/latest-2.jpg",
          date: "2023-04-15 23:12:34"
        },
        {
          id: "7",
          title: "Những ý tưởng trang trí phòng khách nổi bật",
          slug: "nhung-y-tuong-trang-tri-phong-khach",
          image: "/images/news/latest-3.jpg",
          date: "2023-04-15 23:12:34"
        },
        {
          id: "8",
          title: "Mang tần giỏ Lagom đến không gian sống của bạn",
          slug: "mang-tan-gio-lagom",
          image: "/images/news/latest-4.jpg",
          date: "2023-04-15 23:12:34"
        },
        {
          id: "9",
          title: "Có nên mua sofa da công nghiệp không?",
          slug: "co-nen-mua-sofa-da-cong-nghiep",
          image: "/images/news/latest-5.jpg",
          date: "2023-04-15 23:12:34"
        }
      ]);

      // Popular news items for sidebar
      setPopularNews([
        {
          id: "10",
          title: "Những mẫu phòng khách nhà đẹp kiểu châu Âu đẹp hút hồn",
          slug: "nhung-mau-phong-khach-nha-dep",
          image: "/images/news/popular-1.jpg",
          date: "2023-04-15 23:12:34"
        },
        {
          id: "11",
          title: "Chọn màu bàn ghế nhà đẹp cho phòng khách",
          slug: "chon-mau-ban-ghe-nha-dep",
          image: "/images/news/popular-2.jpg",
          date: "2023-04-15 23:12:34"
        },
        {
          id: "12",
          title: "Thiết kế trang nhã dành cho hộ gia đình",
          slug: "thiet-ke-trang-nha-danh-cho-ho-gia-dinh",
          image: "/images/news/popular-3.jpg",
          date: "2023-04-15 23:12:34"
        },
        {
          id: "13",
          title: "Nhà đẹp không thể thiếu những món decor này",
          slug: "nha-dep-khong-the-thieu",
          image: "/images/news/popular-4.jpg",
          date: "2023-04-15 23:12:34"
        }
      ]);

      setIsLoading(false);
    }, 800);
  }, [slug]);

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

  if (!newsItem) {
    return (
      <>
        <Header />
        <div className="news-detail-page">
          <div className="container">
            <div className="not-found">Không tìm thấy bài viết</div>
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
            {/* Main Content Column */}
            <div className="news-main-content">
              <h1 className="news-title">{newsItem.title}</h1>
              
              <div className="news-meta">
                <span className="date">{newsItem.date}</span> | 
                <span className="category">{newsItem.category}</span> | 
                <span className="author">{newsItem.author}</span> |
                <span className="views">898 lượt xem</span>
              </div>
              
              <div className="news-body" dangerouslySetInnerHTML={{ __html: newsItem.content }} />
              
              <div className="news-tags">
                <div className="tags-list">
                  {newsItem.tags.map((tag, index) => (
                    <Link key={index} to={`/tin-tuc/tag/${tag}`} className="tag">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="related-news">
                <h2 className="section-title">TIN LIÊN QUAN</h2>
                <div className="related-news-grid">
                  {relatedNews.map((item) => (
                    <div key={item.id} className="related-news-item">
                      <Link to={`/tin-tuc/${item.slug}`} className="news-image">
                        <img src={item.image} alt={item.title} />
                      </Link>
                      <div className="news-info">
                        <h3 className="title">
                          <Link to={`/tin-tuc/${item.slug}`}>{item.title}</Link>
                        </h3>
                        <span className="date">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar Column */}
            <div className="news-sidebar">
              {/* Latest News Section */}
              <div className="sidebar-section latest-news">
                <h2 className="sidebar-title">TIN MỚI NHẤT</h2>
                <div className="sidebar-news-list">
                  {latestNews.map((item) => (
                    <div key={item.id} className="sidebar-news-item">
                      <Link to={`/tin-tuc/${item.slug}`} className="news-image">
                        <img src={item.image} alt={item.title} />
                      </Link>
                      <div className="news-info">
                        <h3 className="title">
                          <Link to={`/tin-tuc/${item.slug}`}>{item.title}</Link>
                        </h3>
                        <span className="date">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Popular News Section */}
              <div className="sidebar-section popular-news">
                <h2 className="sidebar-title">TIN ĐỌC NHIỀU</h2>
                <div className="sidebar-news-list">
                  {popularNews.map((item) => (
                    <div key={item.id} className="sidebar-news-item">
                      <Link to={`/tin-tuc/${item.slug}`} className="news-image">
                        <img src={item.image} alt={item.title} />
                      </Link>
                      <div className="news-info">
                        <h3 className="title">
                          <Link to={`/tin-tuc/${item.slug}`}>{item.title}</Link>
                        </h3>
                        <span className="date">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail; 