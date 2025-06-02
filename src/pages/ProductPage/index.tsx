import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
}

const ProductPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Chọn danh mục");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("Chọn danh mục");
  const [selectedSpace, setSelectedSpace] = useState<string>("Chọn danh mục");

  // Sample product data
  const products: ProductProps[] = [
    {
      id: 1,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/sofa-1.png",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
    },
    {
      id: 2,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/sofa-2.png",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
    },
    {
      id: 3,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/sofa-3.png",
      colors: ["#D8C1A9", "#555555", "#333333"],
      isNew: true,
    },
    {
      id: 4,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/sofa-4.png",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      isSale: true,
    },
    {
      id: 5,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/chair-1.png",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
    },
    {
      id: 6,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/chair-2.png",
      colors: ["#4A2932", "#E5E5E5", "#555555"],
    },
    {
      id: 7,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/table-1.png",
      colors: ["#333333", "#555555", "#777777"],
      isNew: true,
    },
    {
      id: 8,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/tile-1.png",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
    },
    {
      id: 9,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/lamp-1.png",
      colors: ["#333333", "#555555", "#777777"],
    },
    {
      id: 10,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/chair-3.png",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
    },
    {
      id: 11,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/carpet-1.png",
      colors: ["#333333", "#555555", "#777777"],
      isNew: true,
    },
    {
      id: 12,
      name: "Sofa Modular 2.5 seater với nhièu varian option",
      price: 22150000,
      image: "/images/products/art-1.png",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      isSale: true,
    },
  ];

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <Header />
      <div className="productpage">
        {/* Banner Section */}
        <section className="product-banner">
          <div className="container">
            <div className="banner-content">
              <h1>Sản phẩm</h1>
              <p>Trang chủ / Sản phẩm</p>
            </div>
          </div>
        </section>

        {/* Category Recommendations */}
        <section className="category-recommendations">
          <div className="container">
            <div className="recommendation-title">
              <h2>Các danh mục sản phẩm phổ biến nhất</h2>
              <p>
                Khám phá những danh mục sản phẩm nổi bật của chúng tôi, được
                thiết kế để nâng tầm không gian sống của bạn
              </p>
            </div>

            <div className="recommendation-grid">
              <div className="grid-item">
                <div className="category-card">
                  <img src="/images/categories/living-room.jpg" alt="Phòng khách" />
                  <div className="card-overlay">
                    <button className="btn btn-outline">View all products</button>
                  </div>
                </div>
              </div>
              <div className="grid-item">
                <div className="category-card">
                  <img src="/images/categories/bedroom.jpg" alt="Phòng ngủ" />
                  <div className="card-overlay">
                    <button className="btn btn-outline">View all products</button>
                  </div>
                </div>
              </div>
              <div className="grid-item">
                <div className="category-card">
                  <img src="/images/categories/dining.jpg" alt="Phòng ăn" />
                  <div className="card-overlay">
                    <button className="btn btn-outline">View all products</button>
                  </div>
                </div>
              </div>
              <div className="grid-item">
                <div className="category-card">
                  <img src="/images/categories/bathroom.jpg" alt="Phòng tắm" />
                  <div className="card-overlay">
                    <button className="btn btn-outline">View all products</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Filter and List */}
        <section className="product-listing">
          <div className="container">
            {/* Filter Row */}
            <div className="filter-row">
              <div className="filter-dropdowns">
                <div className="filter-dropdown">
                  <button className="dropdown-toggle">
                    <span>{selectedCategory}</span>
                    <i className="dropdown-icon"></i>
                  </button>
                </div>
                <div className="filter-dropdown">
                  <button className="dropdown-toggle">
                    <span>{selectedSubCategory}</span>
                    <i className="dropdown-icon"></i>
                  </button>
                </div>
                <div className="filter-dropdown">
                  <button className="dropdown-toggle">
                    <span>{selectedSpace}</span>
                    <i className="dropdown-icon"></i>
                  </button>
                </div>
              </div>
              <div className="filter-view">
                <button className="view-option active">
                  <i className="icon-grid"></i>
                </button>
                <button className="view-option">
                  <i className="icon-list"></i>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-image">
                    {product.isNew && <span className="badge new">NEW</span>}
                    {product.isSale && <span className="badge sale">SALE</span>}
                    <img src={product.image} alt={product.name} />
                    <div className="product-actions">
                      <button className="action-btn">
                        <i className="icon-heart"></i>
                      </button>
                      <button className="action-btn">
                        <i className="icon-cart"></i>
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-colors">
                      {product.colors.map((color, index) => (
                        <span
                          key={index}
                          className="color-option"
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </div>
                    <div className="product-price">
                      <span className="price">{formatPrice(product.price)} ₫</span>
                      <span className="price-label">Giá bán</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <span className="pagination-text">Xem thêm sản phẩm</span>
              <div className="pagination-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <img src="/images/icons/quality.svg" alt="Chính sách & hỗ trợ" />
                </div>
                <h3>Chính sách & hỗ trợ</h3>
                <p>
                  Chúng tôi cung cấp các chính sách hỗ trợ và đổi trả linh hoạt
                  giúp bạn mua sắm an tâm.
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <img src="/images/icons/shipping.svg" alt="Vận chuyển" />
                </div>
                <h3>Vận chuyển</h3>
                <p>
                  Giao hàng nhanh chóng, đúng hẹn với đội ngũ vận chuyển chuyên
                  nghiệp, nhiệt tình.
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <img src="/images/icons/support.svg" alt="Hỗ trợ 24/7" />
                </div>
                <h3>Hỗ trợ 24/7</h3>
                <p>
                  Đội ngũ tư vấn viên luôn sẵn sàng giúp đỡ bạn với mọi thắc mắc
                  và yêu cầu.
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <img src="/images/icons/warranty.svg" alt="Bảo hành & Bảo hiểm" />
                </div>
                <h3>Bảo hành & Bảo hiểm</h3>
                <p>
                  Chúng tôi cam kết chất lượng sản phẩm với chính sách bảo hành
                  dài hạn và uy tín.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info">
                <h2>Get in touch</h2>
                <p>
                  Looking for personalized design solutions? Our dedicated experts
                  are ready to help you create the perfect space. Contact us to
                  discuss your interior design vision.
                </p>
                <p>
                  We provide full-service residential, commercial, and interior
                  design. Let's create to impress.
                </p>
              </div>
              <div className="contact-options">
                <div className="contact-option">
                  <h3>Chat with our Interior Designers</h3>
                </div>
                <div className="contact-option">
                  <h3>Discover our space with immersive furniture design</h3>
                </div>
                <div className="contact-option">
                  <h3>A designer furniture store like no other</h3>
                </div>
                <div className="contact-option">
                  <h3>Create your signature style with customization options</h3>
                </div>
                <div className="contact-option">
                  <h3>Convenient online shopping experience</h3>
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
                <img src="/images/blog/blog-1.jpg" alt="Cách để chọn đồ nội thất phù hợp" />
                <h3>Cách để chọn đồ nội thất phù hợp</h3>
              </div>
              <div className="blog-item">
                <img src="/images/blog/blog-2.jpg" alt="Tìm hiểu thêm về vật liệu nội thất" />
                <h3>Tìm hiểu thêm về vật liệu nội thất</h3>
              </div>
              <div className="blog-item">
                <img src="/images/blog/blog-3.jpg" alt="Bạn nên chọn gì khi mua sofa?" />
                <h3>Bạn nên chọn gì khi mua sofa?</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
