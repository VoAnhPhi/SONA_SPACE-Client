import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PopularCategory from "../../components/popular-category";
import InteriorDesign from "../../components/interiorDesign";
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
      image: "/images/rooms/image1.jpg",
      slug: "phong-khach"
    },
    {
      id: "dining-room",
      name: "Phòng Ăn",
      image: "/images/rooms/image2.jpg",
      slug: "phong-an"
    },
    {
      id: "bedroom",
      name: "Phòng Ngủ",
      image: "/images/rooms/image3.jpg",
      slug: "phong-ngu"
    },
    {
      id: "workspace",
      name: "Không gian làm việc",
      image: "/images/rooms/image4.jpg",
      slug: "khong-gian-lam-viec"
    },
    {
      id: "small-space",
      name: "Small Space",
      image: "/images/rooms/image5.jpg",
      slug: "small-space"
    },
    {
      id: "outdoor-space",
      name: "Không gian ngoài trời",
      image: "/images/rooms/image6.jpg",
      slug: "khong-gian-ngoai-troi"
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
        images: ["/images/rooms/imagep-1.jpg"],
        colors: ["#D8C1A9", "#999999", "#8B7355"],
        category: "Sofa",
        slug: "sofa-modena-2-5-seater-beige"
      },
      {
        id: 2,
        name: "Sofa Modena 2.5 seater ofa odena sema seater",
        price: 15190000,
        oldPrice: 25000000,
        images: ["/images/rooms/imagep-2.jpg"],
        colors: ["#999999", "#D8C1A9", "#8B7355"],
        category: "Sofa",
        slug: "sofa-modena-2-5-seater-gray"
      },
      {
        id: 3,
        name: "Sofa Modena 2.5 seater ofa odena sema seater",
        price: 15190000,
        oldPrice: 25000000,
        images: ["/images/rooms/imagep-3.jpg"],
        colors: ["#8B7355", "#D8C1A9", "#999999"],
        category: "Sofa",
        slug: "sofa-modena-2-5-seater-brown"
      },
      {
        id: 4,
        name: "Sofa Modena 2.5 seater ofa odena sema seater",
        price: 15190000,
        oldPrice: 25000000,
        images: ["/images/rooms/imagep-4.jpg"],
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
        images: ["/images/rooms/imagep-5.jpg"],
        colors: ["#D8C1A9", "#8B7355"],
        category: "Bàn ăn",
        slug: "ban-an-modena-6-cho"
      },
      {
        id: 6,
        name: "Ghế ăn Modena",
        price: 2190000,
        images: ["/images/rooms/imagep-6.jpg"],
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
        images: ["/images/rooms/imagep-7.jpg"],
        colors: ["#D8C1A9", "#8B7355"],
        category: "Giường ngủ",
        slug: "giuong-ngu-modena"
      },
      {
        id: 8,
        name: "Tủ đầu giường Modena",
        price: 3590000,
        images: ["/images/rooms/imagep-8.jpg"],
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
        images: ["/images/rooms/imagep-9.jpg"],
        colors: ["#D8C1A9", "#8B7355"],
        category: "Bàn làm việc",
        slug: "ban-lam-viec-modena"
      },
      {
        id: 10,
        name: "Ghế văn phòng Modena",
        price: 4590000,
        oldPrice: 6000000,
        images: ["/images/rooms/imagep-10.jpg"],
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
        images: ["/images/rooms/imagep-11.jpg"],
        colors: ["#D8C1A9", "#8B7355"],
        category: "Kệ sách",
        slug: "ke-sach-da-nang-modena"
      },
      {
        id: 12,
        name: "Bàn console Modena",
        price: 4590000,
        images: ["/images/rooms/imagep-12.jpg"],
        colors: ["#D8C1A9", "#999999"],
        category: "Bàn console",
        slug: "ban-console-modena"
      }
    ]
  };

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <Header />
      <div className="rooms-page">

        {/* Banner */}
        <section className="room-banner">
          <div className="container-fluid">
            <div className="banner-image">
              <img src="/images/rooms/banner_room.jpg" alt="Khám phá không gian sống" />
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
            <h1 className="section-title">Khám phá thêm các căn phòng</h1>
            <div className="categories-flex">
              {roomCategories.map((room) => (
                <div
                  key={room.id}
                  className={`category-item`}
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
              {roomProducts["living-room"]?.map((product) => (
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
              <Link to={`/khong-gian/phong-khach`} className="view-more-btn">
                Xem tất cả sản phẩm
              </Link>
            </div>
          </div>
        </section>

        {/* Interior Design */}
        <InteriorDesign />

        {/* Popular Category */}
        <PopularCategory />

      </div>
      <Footer />
    </>
  );
};

export default Rooms;
