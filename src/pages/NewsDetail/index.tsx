"use client";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsCategories from "../../components/CategoryNews";
import RecentPosts from "../../components/RecentPosts";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  date?: string;
  author?: string;
  content: string;
  tags: string[];
  view?: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

// News articles data

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newsItems] = useState<NewsItem[]>([
    {
      id: "1",
      title: "Nội thất gỗ sồi - sự giao thoa giữa vẻ đẹp và chất lượng",
      image: "https://picsum.photos/800/600?seed=1",
      slug: "noi-that-go-soi",
      category: "Trang Trí Nhà Đẹp",
      date: "2023-10-01",
      content: "Nội thất gỗ sồi mang đến vẻ đẹp tự nhiên và độ bền cao.",
      tags: ["nội thất", "gỗ sồi", "thiết kế"],
      view: 1200,
    },
    {
      id: "2",
      title: "Tạo lập phòng ăn chất lượng với 5 cách đơn giản",
      image: "https://picsum.photos/800/600?seed=2",
      slug: "tao-lap-phong-an",
      category: "Tư Vấn Thiết Kế",
      date: "2023-10-02",
      content:
        "Phòng ăn là nơi quan trọng trong mỗi gia đình, hãy tạo nên không gian ấm cúng.",
      tags: ["phòng ăn", "thiết kế", "nội thất"],
      view: 800,
    },
    {
      id: "3",
      title: "Không gian tươi mới, đón tết đoàn viên",
      image: "https://picsum.photos/800/600?seed=3",
      slug: "khong-gian-tuoi-moi",
      category: "Mẹo & Bí Quyết",
      date: "2023-10-03",
      content:
        "Tết là dịp để gia đình sum họp, hãy làm mới không gian sống của bạn.",
      tags: ["tết", "không gian sống", "mẹo"],
      view: 950,
    },
    {
      id: "4",
      title: "Những ý tưởng trang trí phòng khách nổi bật",
      image: "https://picsum.photos/800/600?seed=4",
      slug: "y-tuong-trang-tri-phong-khach",
      category: "Xu Hướng Thiết Kế",
      date: "2023-10-04",
      content:
        "Phòng khách là bộ mặt của ngôi nhà, hãy làm cho nó trở nên ấn tượng.",
      tags: ["phòng khách", "trang trí", "xu hướng"],
      view: 1100,
    },
    {
      id: "5",
      title: "Mang tần giỏ Lagom đến không gian sống của bạn",
      image: "https://picsum.photos/800/600?seed=5",
      slug: "mang-tan-gio-lagom",
      category: "Tư Liệu Nội Thất",
      date: "2023-10-05",
      content:
        "Lagom là triết lý sống cân bằng, hãy áp dụng nó vào không gian sống của bạn.",
      tags: ["Lagom", "nội thất", "cân bằng"],
      view: 700,
    },
    {
      id: "6",
      title: "Có nên mua sofa da công nghiệp không?",
      image: "https://picsum.photos/800/600?seed=6",
      slug: "co-nen-mua-sofa-da-cong-nghiep",
      category: "Sản Phẩm Nội Thất",
      date: "2023-10-06",
      content:
        "Sofa da công nghiệp có nhiều ưu điểm, nhưng cũng cần cân nhắc kỹ trước khi mua.",
      tags: ["sofa", "da công nghiệp", "nội thất"],
    },
    {
      id: "7",
      title: "Những mẫu phòng khách nhà đẹp kiểu châu Âu đẹp hút hồn",
      image: "https://picsum.photos/800/600?seed=7",
      slug: "mau-phong-khach-chau-au",
      category: "Trang Trí Nhà Đẹp",
      content:
        "Phong cách châu Âu mang đến sự sang trọng và tinh tế cho phòng khách.",
      tags: ["phòng khách", "châu Âu", "trang trí"],
    },
    {
      id: "8",
      title: "Chọn màu bàn ghế nhà đẹp cho phòng khách",
      image: "https://picsum.photos/800/600?seed=8",
      slug: "chon-mau-ban-ghe-nha-dep",
      category: "Tư Vấn Thiết Kế",
      content:
        "Màu sắc của bàn ghế có thể ảnh hưởng lớn đến không gian phòng khách.",
      tags: ["bàn ghế", "màu sắc", "thiết kế"],
    },
    {
      id: "9",
      title: "Kinh nghiệm lựa chọn nội thất chung cư",
      image: "https://picsum.photos/800/600?seed=9",
      slug: "kinh-nghiem-lua-chon-noi-that",
      category: "Mẹo & Bí Quyết",
      content:
        "Chung cư có những đặc điểm riêng, hãy lựa chọn nội thất phù hợp để tối ưu không gian.",
      tags: ["chung cư", "nội thất", "lựa chọn"],
    },
    {
      id: "10",
      title: "Bảo quản đồ gỗ khi độ ẩm không khí cao",
      image: "https://picsum.photos/800/600?seed=10",
      slug: "bao-quan-do-go",
      category: "Tư Liệu Nội Thất",
      content:
        "Đồ gỗ cần được bảo quản đúng cách để tránh hư hỏng khi độ ẩm cao.",
      tags: ["đồ gỗ", "bảo quản", "độ ẩm"],
    },
    {
      id: "11",
      title: "Mẹo bảo quản & vệ sinh các đồ nội thất",
      image: "https://picsum.photos/800/600?seed=11",
      slug: "meo-bao-quan-ve-sinh",
      category: "Mẹo & Bí Quyết",
      content:
        "Vệ sinh và bảo quản đồ nội thất đúng cách giúp kéo dài tuổi thọ sản phẩm.",
      tags: ["bảo quản", "vệ sinh", "nội thất"],
    },
    {
      id: "12",
      title: "5 sai lầm cần tránh khi mua bàn ghế sofa",
      image: "https://picsum.photos/800/600?seed=12",
      slug: "sai-lam-khi-mua-sofa",
      category: "Tư Vấn Thiết Kế",
      content:
        "Mua sofa là một quyết định quan trọng, hãy tránh những sai lầm phổ biến để có lựa chọn tốt nhất.",
      tags: ["sofa", "mua sắm", "lựa chọn"],
    },
    {
      id: "13",
      title: "Xu hướng nội thất 2024 - Sự trở lại của gỗ tự nhiên",
      image: "https://picsum.photos/800/600?seed=13",
      slug: "xu-huong-noi-that-2024",
      category: "Xu Hướng Thiết Kế",
      content:
        "Gỗ tự nhiên đang trở lại mạnh mẽ trong thiết kế nội thất, mang đến vẻ đẹp ấm áp và gần gũi.",
      tags: ["nội thất", "gỗ tự nhiên", "xu hướng"],
    },
    {
      id: "14",
      title: "Cách chọn sofa phù hợp với không gian sống",
      image: "https://picsum.photos/800/600?seed=14",
      slug: "chon-sofa-phu-hop",
      category: "Sản Phẩm Nội Thất",
      content:
        "Chọn sofa phù hợp với không gian sống không chỉ giúp tăng tính thẩm mỹ mà còn mang lại sự thoải mái.",
      tags: ["sofa", "không gian sống", "lựa chọn"],
    },
    {
      id: "15",
      title: "Những mẫu bàn ăn đẹp cho gia đình hiện đại",
      image: "https://picsum.photos/800/600?seed=15",
      slug: "mau-ban-an-gia-dinh-hien-dai",
      category: "Trang Trí Nhà Đẹp",
      content:
        "Bàn ăn là nơi gia đình quây quần, hãy chọn những mẫu bàn ăn đẹp và hiện đại để tạo không gian ấm cúng.",
      tags: ["bàn ăn", "gia đình", "trang trí"],
    },
    {
      id: "16",
      title: "Cách bảo quản sofa da để bền đẹp",
      image: "https://picsum.photos/800/600?seed=16",
      slug: "bao-quan-sofa-da",
      category: "Sản Phẩm Nội Thất",
      content:
        "Sofa da cần được bảo quản đúng cách để giữ được vẻ đẹp và độ bền theo thời gian.",
      tags: ["sofa da", "bảo quản", "nội thất"],
    },
  ]);
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

  const getPostCountByCategory = (categoryName: string) => {
    return newsItems.filter((item) => item.category === categoryName).length;
  };

  useEffect(() => {
    setTimeout(() => {
      setNewsItem({
        id: "1",
        title: "Nội thất gỗ sồi - sự giao thoa của vẻ đẹp và chất lượng",
        slug: "noi-that-go-soi",
        image: "/images/news/news-detail.jpg",
        category: "Thiết kế nội thất",
        date: "15/06/2023",
        // author: "Admin",
        content: `
        <p>Ngày nay, sự hướng tìm về với vẻ đẹp đơn giản, tự nhiên và bền vững đang ngày càng được ưa chuộng trong thiết kế nội thất. Trong đó, nội thất gỗ trở thành lựa chọn hàng đầu của nhiều gia đình hiện đại, không chỉ bởi tính thẩm mỹ mà còn bởi giá trị bền vững mà nó mang lại theo thời gian.</p>
      
        <h2>1. Vẻ đẹp của tự nhiên</h2>
        <p>Nội thất gỗ mang vẻ đẹp của thời gian và thiên nhiên, tạo nên cảm giác ấm cúng, thân thiện trong không gian sống. Mỗi đường vân gỗ là một dấu ấn riêng biệt, thể hiện sự tinh tế và gần gũi mà không chất liệu nào có thể thay thế. Dù là phong cách cổ điển hay hiện đại, nội thất gỗ đều dễ dàng kết hợp để tạo nên tổng thể hài hòa, trang nhã.</p>
        <img src="https://picsum.photos/800/600?seed=14" alt="Không gian nội thất gỗ tự nhiên" />
      
        <h2>2. Bền bỉ theo thời gian</h2>
        <p>Chất liệu gỗ vốn được biết đến là biểu tượng của sự bền chắc và trường tồn. Với khả năng chống chịu tốt trước tác động của thời tiết và môi trường, nội thất gỗ có tuổi thọ cao, thậm chí càng sử dụng lâu càng trở nên đẹp hơn nhờ vào lớp patina tự nhiên. Điều này khiến cho các sản phẩm từ gỗ trở thành một khoản đầu tư dài hạn đáng giá cho ngôi nhà.</p>
      
        <h2>3. Thân thiện với môi trường</h2>
        <p>Nội thất gỗ sồi không chỉ là sự lựa chọn hoàn hảo về mặt thiết kế mà còn mang ý nghĩa tích cực đối với môi trường. Việc sử dụng gỗ từ nguồn khai thác bền vững góp phần giảm thiểu khí thải, đồng thời tạo nên không gian sống trong lành và tự nhiên. Các dòng sản phẩm từ gỗ cũng dễ tái chế và ít gây hại khi xử lý sau sử dụng.</p>
        <img src="https://picsum.photos/800/600?seed=18" alt="Không gian xanh cùng nội thất gỗ sồi" />
      
        <h2>4. Phù hợp nhiều phong cách</h2>
        <p>Từ phong cách Scandinavian tối giản đến phong cách Nhật Bản Zen hoặc rustic mộc mạc, nội thất gỗ dễ dàng thích nghi và nâng tầm vẻ đẹp của không gian. Tùy thuộc vào màu gỗ, kiểu dáng và cách xử lý bề mặt, bạn có thể tạo nên những thiết kế đa dạng, mang đậm dấu ấn cá nhân.</p>
      
        <h2>5. Cảm giác thư giãn & dễ chịu</h2>
        <p>Màu sắc ấm áp và mùi hương tự nhiên từ gỗ giúp con người cảm thấy thư giãn và cân bằng hơn sau những giờ làm việc căng thẳng. Không gian sống có sự hiện diện của nội thất gỗ thường mang lại cảm giác gần gũi, thân thuộc, đồng thời giúp giảm stress hiệu quả.</p>
      
        <p><strong>Tóm lại</strong>, xu hướng thiết kế nội thất năm 2023 - 2025 đang dần quay về với các giá trị tự nhiên và bền vững. Nội thất gỗ không chỉ đơn thuần là lựa chọn về mặt thẩm mỹ, mà còn thể hiện lối sống xanh, tinh tế và sâu sắc của người sử dụng. Hãy để ngôi nhà của bạn trở thành nơi chốn bình yên, mang hơi thở thiên nhiên thông qua những chi tiết gỗ mộc mạc, tinh tế.</p>
      `,
        tags: [
          "thiết kế nội thất",
          "xu hướng 2023",
          "nội thất hiện đại",
          "phong cách sống",
        ],
        view: 1500,
      });
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
            <div className="news-main-content">
              <h1 className="news-title">{newsItem.title}</h1>

              <div className="news-meta">
                <span className="date">{newsItem.date}</span>
                <span className="category">{newsItem.category}</span>
                {/* <span className="author">{newsItem.author}</span> */}
                <span className="views">
                  <img src="../images/news/eye.svg" alt="" />
                  {newsItem.view} lượt xem
                </span>
              </div>

              <div
                className="news-body"
                dangerouslySetInnerHTML={{ __html: newsItem.content }}
              />

              <div className="news-tags">
                <div className="tags-list">
                  {newsItem.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/tin-tuc/tag/${tag}`}
                      className="tag"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="news-sidebar">
              <NewsCategories
                categories={categories}
                getPostCountByCategory={getPostCountByCategory}
              />
              <RecentPosts newsItems={newsItems} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;
