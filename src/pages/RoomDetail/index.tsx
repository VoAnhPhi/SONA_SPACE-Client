import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CategorySlider from "../../components/CategorySlider";
import Filter from "../../components/Filter";
import ListProduct from "../../components/Product";

const RoomDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [roomName, setRoomName] = useState<string>("");
  const [bannerUrl, setBannerUrl] = useState<string>(
    "/images/banners/default-room.jpg"
  );

  interface ProductProps {
    id: number;
    name: string;
    price: number;
    image: string;
    colors: string[];
    isNew?: boolean;
    isSale?: boolean;
    createdAt?: string;
    priceSale?: number;
    slug: string;
  }
  // Sample product data
  const products: ProductProps[] = [
    {
      id: 1,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#7d5a50", "#a3a380", "#757575"],
      createdAt: "2025-06-02",
      priceSale: 20000000,
      slug: "sofa-modular-2.5-seater-voi-nhieu-varian-option",
    },
    {
      id: 2,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#7d5a50", "#a3a380", "#757575"],
      createdAt: "2025-05-01",
      priceSale: 20000000,
      slug: "sofa-modular-2.5-seater-voi-nhieu-varian-option",
    },
    {
      id: 3,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#555555", "#333333"],
      isNew: true,
      createdAt: "2025-02-01",
      priceSale: 22000000,
      slug: "sofa-modular-2.5-seater-voi-nhieu-varian-option",
    },
    {
      id: 4,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      isSale: true,
      createdAt: "2025-06-04",
      priceSale: 21000000,
      slug: "sofa-modular-2.5-seater-voi-nhieu-varian-option",
    },
    {
      id: 5,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      createdAt: "2025-01-01",
      priceSale: 19000000,
      slug: "sofa-modular-2.5-seater-voi-nhieu-varian-option",
    },
    {
      id: 6,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#4A2932", "#E5E5E5", "#555555"],
      createdAt: "2025-03-01",
      priceSale: 18000000,
      slug: "sofa-modular-2.5-seater-voi-nhieu-varian-option",
    },
    {
      id: 7,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#333333", "#555555", "#777777"],
      isNew: true,
      createdAt: "2025-01-01",
      priceSale: 10000000,
      slug: "sofa-modular-2.5-seater-voi-nhieu-varian-option",
    },
    {
      id: 8,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      createdAt: "2025-06-01",
      priceSale: 16000000,
      slug: "sofa-modular-2.5-seater-voi-nhieu-varian-option",
    },
    {
      id: 9,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#333333", "#555555", "#777777"],
      createdAt: "2025-06-01",
      priceSale: 18900000,
      slug: "sofa-modular-2.5-seater-voi-nhieu-varian-option",
    },
    {
      id: 10,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      createdAt: "2025-06-01",
      priceSale: 13400000,
      slug: "sofa-modular-2.5-seater-voi-nhieu-varian-option",
    },
    {
      id: 11,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#333333", "#555555", "#777777"],
      isNew: true,
      createdAt: "2025-06-01",
      priceSale: 20000000,
      slug: "sofa-modular-2.5-seater-voi-nhieu-varian-option",
    },
    {
      id: 12,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/product1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      isSale: true,
      createdAt: "2025-06-01",
      priceSale: 20000000,
      slug: "sofa-modular-2.5-seater-voi-nhieu-varian-option",
    },
  ];
  // Mock room data mapping
  const roomMapping: { [key: string]: string } = {
    "phong-khach": "Phòng Khách",
    "phong-an": "Phòng Ăn",
    "phong-ngu": "Phòng Ngủ",
    "khong-gian-lam-viec": "Không gian làm việc",
    "small-space": "Small Space",
    "khong-gian-ngoai-troi": "Không gian ngoài trời",
  };

  const bannerMapping: { [key: string]: string } = {
    "phong-khach": "/images/rooms/living-room.jpg",
    "phong-an": "/images/rooms/dining-room.jpg",
    "phong-ngu": "/images/rooms/bedroom.jpg",
    "khong-gian-lam-viec": "/images/rooms/workspace.jpg",
    "small-space": "/images/rooms/small-space.jpg",
    "khong-gian-ngoai-troi": "/images/rooms/outdoor-space.jpg",
  };

  // Set room name based on slug
  useEffect(() => {
    if (slug && roomMapping[slug]) {
      setRoomName(roomMapping[slug]);
      setBannerUrl(bannerMapping[slug]);
    } else {
      setRoomName("Không gian");
      setBannerUrl("/images/banners/default-room.jpg");
    }
  }, [slug]);

  return (
    <>
      <Header />
      <div className="room-detail-page">
        {/* Banner Section */}
        <section className="room-banner">
          <div className="container-fluid">
            <div className="banner-image">
              <img src={bannerUrl} alt={roomName} />
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <Link to="/khong-gian">Không gian</Link>
              <span>/</span>
              <span className="active">{roomName}</span>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <section className="filter-section">
          <Filter />
        </section>

        {/* Product Section */}
        <div className="boxProducts">
          <div className="container">
            <div className="section-box-products">
              <div className="box-products-container">
                {products.map((product) => (
                  <ListProduct
                    key={product.id}
                    product={product}
                    slug={product.slug}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inspiration Section */}
        <section className="inspiration-section">
          <div className="container">
            <div className="inspiration-content">
              <div className="inspiration-text">
                <h2>Thiết kế không gian sống theo phong cách của bạn</h2>
                <p>
                  SONA SPACE cung cấp dịch vụ thiết kế nội thất chuyên nghiệp,
                  giúp bạn tạo ra không gian sống lý tưởng phù hợp với phong
                  cách và nhu cầu cá nhân. Đội ngũ thiết kế của chúng tôi sẽ làm
                  việc chặt chẽ với bạn để hiểu rõ mong muốn và đưa ra giải pháp
                  tối ưu cho không gian của bạn.
                </p>
                <a href="/lien-he" className="discover-btn">
                  Liên hệ ngay
                  <i className="icon">
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.9128 4L9.8048 1M13.9128 4L9.8048 7M13.9128 4H1.12402"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </i>
                </a>
              </div>

              <div className="inspiration-image">
                <img
                  src="/images/rooms/room-detail/image-banner.jpg"
                  alt="Thiết kế nội thất chuyên nghiệp"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="container">
            <h2 className="section-title">Khám phá thêm các căn phòng</h2>
            <CategorySlider />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default RoomDetail;
