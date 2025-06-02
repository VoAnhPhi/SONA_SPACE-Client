import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface RoomCategoryProps {
  id: string;
  name: string;
  image: string;
  slug: string;
}

interface ProductProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  images: string[];
  colors: string[];
  category: string;
  slug: string;
}

const Rooms: React.FC = () => {
  // Room categories
  const roomCategories: RoomCategoryProps[] = [
    {
      id: "living-room",
      name: "Phòng Khách",
      image: "/images/rooms/living-room.jpg",
      slug: "phong-khach"
    },
    {
      id: "dining-room",
      name: "Phòng Ăn",
      image: "/images/rooms/dining-room.jpg",
      slug: "phong-an"
    },
    {
      id: "bedroom",
      name: "Phòng Ngủ",
      image: "/images/rooms/bedroom.jpg",
      slug: "phong-ngu"
    },
    {
      id: "workspace",
      name: "Không gian làm việc",
      image: "/images/rooms/workspace.jpg",
      slug: "khong-gian-lam-viec"
    },
    {
      id: "small-space",
      name: "Small Space",
      image: "/images/rooms/small-space.jpg",
      slug: "small-space"
    }
  ];

  // Sample products for each room type
  const roomProducts: { [key: string]: ProductProps[] } = {
    "living-room": [
      {
        id: 1,
        name: "Sofa Modena 2.5 seater ofa odena sema seater",
        price: 15190000,
        oldPrice: 25000000,
        images: ["/images/products/sofa-beige-1.jpg"],
        colors: ["#D8C1A9", "#999999", "#8B7355"],
        category: "Sofa",
        slug: "sofa-modena-2-5-seater-beige"
      },
      {
        id: 2,
        name: "Sofa Modena 2.5 seater ofa odena sema seater",
        price: 15190000,
        oldPrice: 25000000,
        images: ["/images/products/sofa-gray-1.jpg"],
        colors: ["#999999", "#D8C1A9", "#8B7355"],
        category: "Sofa",
        slug: "sofa-modena-2-5-seater-gray"
      },
      {
        id: 3,
        name: "Sofa Modena 2.5 seater ofa odena sema seater",
        price: 15190000,
        oldPrice: 25000000,
        images: ["/images/products/sofa-brown-1.jpg"],
        colors: ["#8B7355", "#D8C1A9", "#999999"],
        category: "Sofa",
        slug: "sofa-modena-2-5-seater-brown"
      },
      {
        id: 4,
        name: "Sofa Modena 2.5 seater ofa odena sema seater",
        price: 15190000,
        oldPrice: 25000000,
        images: ["/images/products/sofa-beige-1.jpg"],
        colors: ["#D8C1A9", "#999999", "#8B7355"],
        category: "Sofa",
        slug: "sofa-modena-2-5-seater-beige-2"
      }
    ],
    "dining-room": [
      {
        id: 5,
        name: "Bàn ăn Modena 6 chỗ",
        price: 12190000,
        oldPrice: 18000000,
        images: ["/images/products/dining-table-1.jpg"],
        colors: ["#D8C1A9", "#8B7355"],
        category: "Bàn ăn",
        slug: "ban-an-modena-6-cho"
      },
      {
        id: 6,
        name: "Ghế ăn Modena",
        price: 2190000,
        images: ["/images/products/dining-chair-1.jpg"],
        colors: ["#D8C1A9", "#999999", "#8B7355"],
        category: "Ghế ăn",
        slug: "ghe-an-modena"
      }
    ],
    "bedroom": [
      {
        id: 7,
        name: "Giường ngủ Modena",
        price: 18990000,
        oldPrice: 25000000,
        images: ["/images/products/bed-1.jpg"],
        colors: ["#D8C1A9", "#8B7355"],
        category: "Giường ngủ",
        slug: "giuong-ngu-modena"
      },
      {
        id: 8,
        name: "Tủ đầu giường Modena",
        price: 3590000,
        images: ["/images/products/nightstand-1.jpg"],
        colors: ["#D8C1A9", "#999999", "#8B7355"],
        category: "Tủ đầu giường",
        slug: "tu-dau-giuong-modena"
      }
    ],
    "workspace": [
      {
        id: 9,
        name: "Bàn làm việc Modena",
        price: 8990000,
        images: ["/images/products/desk-1.jpg"],
        colors: ["#D8C1A9", "#8B7355"],
        category: "Bàn làm việc",
        slug: "ban-lam-viec-modena"
      },
      {
        id: 10,
        name: "Ghế văn phòng Modena",
        price: 4590000,
        oldPrice: 6000000,
        images: ["/images/products/office-chair-1.jpg"],
        colors: ["#999999", "#D8C1A9", "#8B7355"],
        category: "Ghế văn phòng",
        slug: "ghe-van-phong-modena"
      }
    ],
    "small-space": [
      {
        id: 11,
        name: "Kệ sách đa năng Modena",
        price: 5990000,
        images: ["/images/products/bookshelf-1.jpg"],
        colors: ["#D8C1A9", "#8B7355"],
        category: "Kệ sách",
        slug: "ke-sach-da-nang-modena"
      },
      {
        id: 12,
        name: "Bàn console Modena",
        price: 4590000,
        images: ["/images/products/console-table-1.jpg"],
        colors: ["#D8C1A9", "#999999"],
        category: "Bàn console",
        slug: "ban-console-modena"
      }
    ]
  };

  // Active room category
  const [activeRoom, setActiveRoom] = useState<string>("living-room");

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <Header />
      <div className="rooms-page">
        {/* Banner Section */}
        <section className="room-banner">
          <div className="container-fluid">
            <div className="banner-image">
              <img src="/images/banners/rooms-banner.jpg" alt="Khám phá không gian sống" />
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <span className="active">Không gian</span>
            </div>
          </div>
        </div>

        {/* Room Categories */}
        <section className="room-categories">
          <div className="container">
            <h1 className="section-title">Khám phá từng căn phòng</h1>
            
            <div className="categories-grid">
              {roomCategories.map((room) => (
                <div 
                  key={room.id} 
                  className={`category-item ${activeRoom === room.id ? 'active' : ''}`}
                  onClick={() => setActiveRoom(room.id)}
                >
                  <Link to={`/khong-gian/${room.slug}`} className="category-link">
                    <div className="category-image">
                      <img src={room.image} alt={room.name} />
                    </div>
                    <h3 className="category-name">{room.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Room Products */}
        <section className="room-products">
          <div className="container">
            <h2 className="section-title">Sản Phẩm Mới</h2>
            
            <div className="products-grid">
              {roomProducts[activeRoom]?.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.images[0]} alt={product.name} />
                    <div className="product-actions">
                      <button className="action-btn wishlist">
                        <i className="icon-heart"></i>
                      </button>
                      <Link to={`/san-pham/${product.slug}`} className="action-btn view">
                        <i className="icon-eye"></i>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-name">
                      <Link to={`/san-pham/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <div className="product-price">
                      <span className="current-price">{formatPrice(product.price)} đ</span>
                      {product.oldPrice && (
                        <span className="old-price">{formatPrice(product.oldPrice)} đ</span>
                      )}
                    </div>
                    <div className="product-colors">
                      {product.colors.map((color, index) => (
                        <span 
                          key={index}
                          className="color-dot"
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="view-more-container">
              <Link to={`/khong-gian/${roomCategories.find(room => room.id === activeRoom)?.slug}`} className="view-more-btn">
                Xem tất cả sản phẩm
              </Link>
            </div>
          </div>
        </section>

        {/* Design Inspiration */}
        <section className="design-inspiration">
          <div className="container">
            <div className="inspiration-grid">
              <div className="inspiration-text">
                <h2 className="section-title">Nội Thất Theo Yêu Cầu</h2>
                <p className="description">
                  Khám phá dịch vụ thiết kế nội thất cao cấp của SONA SPACE. Với đội ngũ thiết kế chuyên nghiệp, 
                  chúng tôi sẽ biến không gian sống của bạn thành một tác phẩm nghệ thuật đầy tinh tế và phong cách.
                </p>
                <Link to="/dich-vu-thiet-ke" className="learn-more-btn">Tìm hiểu thêm</Link>
              </div>
              
              <div className="inspiration-image">
                <img src="/images/design/custom-design-1.jpg" alt="Thiết kế nội thất theo yêu cầu" />
              </div>
            </div>
          </div>
        </section>

        {/* Room Recommendations */}
        <section className="room-recommendations">
          <div className="container">
            <h2 className="section-title">Các danh mục được phổ biến nhất</h2>
            
            <div className="recommendations-grid">
              <div className="recommendation-item">
                <div className="recommendation-image">
                  <img src="/images/recommendations/living-room-1.jpg" alt="Phòng khách mực phẩm cho bạn" />
                </div>
                <div className="recommendation-content">
                  <h3>Các danh mục phẩm phổ biến nhất</h3>
                  <Link to="/khong-gian/phong-khach" className="view-all-btn">Xem tất cả sản phẩm</Link>
                </div>
              </div>
              
              <div className="recommendation-item">
                <div className="recommendation-image">
                  <img src="/images/recommendations/bedroom-1.jpg" alt="Phòng ngủ thoải mái cho bạn" />
                </div>
                <div className="recommendation-content">
                  <h3>Không gian nghỉ ngơi lý tưởng cho bạn</h3>
                  <Link to="/khong-gian/phong-ngu" className="view-all-btn">Xem tất cả sản phẩm</Link>
                </div>
              </div>
              
              <div className="recommendation-item">
                <div className="recommendation-image">
                  <img src="/images/recommendations/workspace-1.jpg" alt="Không gian làm việc hiệu quả" />
                </div>
                <div className="recommendation-content">
                  <h3>Không gian làm việc sáng tạo cho bạn</h3>
                  <Link to="/khong-gian/khong-gian-lam-viec" className="view-all-btn">Xem tất cả sản phẩm</Link>
                </div>
              </div>
              
              <div className="recommendation-item">
                <div className="recommendation-image">
                  <img src="/images/recommendations/dining-room-1.jpg" alt="Phòng ăn ấm cúng" />
                </div>
                <div className="recommendation-content">
                  <h3>Phòng ăn ấm cúng cho gia đình bạn</h3>
                  <Link to="/khong-gian/phong-an" className="view-all-btn">Xem tất cả sản phẩm</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Blog Section */}
        <section className="design-blog">
          <div className="container">
            <h2 className="section-title">Thiết kế có nhân hóa</h2>
            <div className="blog-grid">
              <div className="blog-item">
                <img src="/images/blog/interior-design-tips-1.jpg" alt="Liên hệ ngay để tư vấn" />
                <h3>Liên hệ ngay để được tư vấn</h3>
              </div>
              <div className="blog-item">
                <img src="/images/blog/material-samples-1.jpg" alt="Tìm hiểu thêm về các mẫu vật liệu" />
                <h3>Tìm hiểu thêm về các mẫu vật liệu</h3>
              </div>
              <div className="blog-item">
                <img src="/images/blog/customer-service-1.jpg" alt="Bạn cần liên hệ hỗ trợ?" />
                <h3>Bạn cần liên hệ hỗ trợ?</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Rooms;
