import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  images: string[];
  colors: {
    code: string;
    name: string;
  }[];
  rating: number;
  reviewCount: number;
  stock: number;
  category: string;
  description: string;
  features: {
    title: string;
    value: string;
  }[];
}

interface RelatedProductProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  colors: string[];
  category: string;
}

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedColor, setSelectedColor] = useState<string>("#D8C1A9");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Mock product data
  const product: ProductProps = {
    id: 1,
    name: "Sofa Modena 2.5 seater ofa odena sema seater",
    price: 15190000,
    oldPrice: 18950000,
    images: [
      "/images/products/sofa-beige-main.jpg",
      "/images/products/sofa-beige-angle.jpg",
      "/images/products/sofa-beige-front.jpg",
      "/images/products/sofa-beige-detail.jpg",
    ],
    colors: [
      { code: "#D8C1A9", name: "Beige" },
      { code: "#333333", name: "Black" },
      { code: "#777777", name: "Gray" },
    ],
    rating: 4.7,
    reviewCount: 1481,
    stock: 300,
    category: "Sofas",
    description: "Lorem ipsum dolor sit amet consectetur. Non imperdiet quisque quam sed semper nec semper. Ipsum mattis odio accumsan molestie dictum et urna.",
    features: [
      { title: "Màu sắc", value: "Đa dạng" },
      { title: "Chất liệu", value: "Cao cấp" },
      { title: "Kích thước", value: "Phù hợp" },
      { title: "Màu sắc", value: "Đa dạng" },
      { title: "Chất liệu", value: "Cao cấp" },
      { title: "Kích thước", value: "Phù hợp" },
    ],
  };

  // Mock related products
  const relatedProducts: RelatedProductProps[] = [
    {
      id: 2,
      name: "Sofa Modena 2.5 seater với nhiều varian option",
      price: 15190000,
      image: "/images/products/chair-wooden-1.jpg",
      colors: ["#D8C1A9", "#333333", "#777777"],
      category: "Sofas"
    },
    {
      id: 3,
      name: "Sofa Modena 2.5 seater với nhiều varian option",
      price: 15190000,
      image: "/images/products/chair-burgundy-1.jpg",
      colors: ["#4A2932", "#E5E5E5", "#555555"],
      category: "Sofas"
    },
    {
      id: 4,
      name: "Sofa Modena 2.5 seater với nhiều varian option",
      price: 15190000,
      image: "/images/products/table-round-black-1.jpg",
      colors: ["#333333", "#555555", "#777777"],
      category: "Sofas"
    },
    {
      id: 5,
      name: "Sofa Modena 2.5 seater với nhiều varian option",
      price: 15190000,
      image: "/images/products/tiles-beige-1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      category: "Sofas"
    }
  ];

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Handle quantity change
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  // Generate star rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i - 0.5 <= rating) {
        stars.push(<span key={i} className="star half-filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">★</span>);
      }
    }
    return stars;
  };

  return (
    <>
      <Header />
      <div className="product-detail-page">
        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Trang chủ</a>
              <span>/</span>
              <a href="/san-pham">Sản phẩm</a>
              <span>/</span>
              <span className="active">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail Section */}
        <section className="product-detail">
          <div className="container">
            <div className="product-detail-grid">
              {/* Product Images */}
              <div className="product-images">
                <div className="main-image">
                  <img 
                    src={product.images[activeImageIndex]} 
                    alt={`${product.name} - ${product.colors.find(c => c.code === selectedColor)?.name || 'Main'} View`} 
                  />
                </div>
                <div className="thumbnail-images">
                  {product.images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img src={image} alt={`${product.name} - Thumbnail ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="product-info">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-category">{product.category}</div>
                
                <div className="product-price">
                  <div className="current-price">{formatPrice(product.price)} đ</div>
                  {product.oldPrice && (
                    <div className="old-price">{formatPrice(product.oldPrice)} đ</div>
                  )}
                </div>

                <div className="product-rating">
                  <div className="stars">{renderStars(product.rating)}</div>
                  <div className="rating-value">{product.rating}</div>
                  <div className="review-count">{product.reviewCount} Lượt đánh giá</div>
                </div>

                <div className="product-stock">
                  <span className="label">Số lượng trong kho:</span>
                  <span className="value">{product.stock}</span>
                  <span className="status">(Còn hàng)</span>
                </div>

                <div className="product-colors-section">
                  <div className="label">Chọn màu sắc:</div>
                  <div className="color-options">
                    {product.colors.map((color) => (
                      <div 
                        key={color.code} 
                        className={`color-option ${selectedColor === color.code ? 'active' : ''}`}
                        style={{ backgroundColor: color.code }}
                        onClick={() => setSelectedColor(color.code)}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="product-quantity">
                  <div className="label">Chọn số lượng</div>
                  <div className="quantity-selector">
                    <button 
                      className="quantity-btn decrease" 
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input 
                      type="text" 
                      value={quantity} 
                      readOnly 
                      className="quantity-input" 
                    />
                    <button 
                      className="quantity-btn increase" 
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="product-actions">
                  <button className="btn-add-to-cart">Thêm vào giỏ</button>
                  <button className="btn-wishlist">
                    <i className="icon-heart"></i>
                  </button>
                  <button className="btn-share">
                    <i className="icon-share"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="product-tabs">
          <div className="container">
            <div className="tabs-header">
              <button 
                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Mô tả
              </button>
              <button 
                className={`tab-btn ${activeTab === 'review' ? 'active' : ''}`}
                onClick={() => setActiveTab('review')}
              >
                Đánh giá
              </button>
            </div>

            <div className="tabs-content">
              {activeTab === 'description' && (
                <div className="tab-pane description">
                  <div className="description-content">
                    <p>{product.description}</p>
                    <p>Et sollicitudin gravida bibendum tellus pulvinar elementum quisque eu arcu. Aliquod sed vulputate sed cursus quam ut. Id eget turpis id sit etiam urna purus ipsum commodo sit.</p>
                  </div>
                  
                  <div className="features-table">
                    <h3>Đánh giá</h3>
                    <div className="features-grid">
                      {product.features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          <div className="feature-title">{feature.title}</div>
                          <div className="feature-value">{feature.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'review' && (
                <div className="tab-pane reviews">
                  <div className="review-summary">
                    <div className="rating-large">
                      <div className="rating-value">{product.rating}</div>
                      <div className="stars-large">{renderStars(product.rating)}</div>
                      <div className="review-count">{product.reviewCount} Đánh giá</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Product Image Gallery */}
        <section className="product-gallery">
          <div className="container">
            <div className="gallery-image">
              <img 
                src="/images/products/sofa-lifestyle-1.jpg" 
                alt="Sofa in modern living room setting" 
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <img src="/images/icons/policy-icon.svg" alt="Chính sách & hỗ trợ" />
                </div>
                <h3>Chính sách & hỗ trợ</h3>
                <p>
                  Chúng tôi cung cấp các chính sách hỗ trợ và đổi trả linh hoạt
                  giúp bạn mua sắm an tâm.
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <img src="/images/icons/shipping-icon.svg" alt="Vận chuyển" />
                </div>
                <h3>Vận chuyển</h3>
                <p>
                  Giao hàng nhanh chóng, đúng hẹn với đội ngũ vận chuyển chuyên
                  nghiệp, nhiệt tình.
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <img src="/images/icons/support-icon.svg" alt="Hỗ trợ 24/7" />
                </div>
                <h3>Hỗ trợ 24/7</h3>
                <p>
                  Đội ngũ tư vấn viên luôn sẵn sàng giúp đỡ bạn với mọi thắc mắc
                  và yêu cầu.
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <img src="/images/icons/warranty-icon.svg" alt="Hoàn tiền & Bảo hành" />
                </div>
                <h3>Hoàn tiền & Bảo hành</h3>
                <p>
                  Chúng tôi cam kết chất lượng sản phẩm với chính sách bảo hành
                  dài hạn và uy tín.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="related-products">
          <div className="container">
            <h2 className="section-title">Các sản phẩm tương tự</h2>
            
            <div className="products-grid">
              {relatedProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-image">
                    <img src={product.image} alt={`${product.name} - ${product.category}`} />
                    <div className="product-actions">
                      <button className="wishlist-btn">
                        <i className="icon-heart"></i>
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="product-category">{product.category}</div>
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
                      <div className="price-current">
                        <span className="price">{formatPrice(product.price)} ₫</span>
                        {product.oldPrice && (
                          <span className="old-price">{formatPrice(product.oldPrice)} ₫</span>
                        )}
                      </div>
                      <span className="price-label">Giá bán</span>
                    </div>
                    <div className="product-action">
                      <a href={`/san-pham/${product.id}`} className="view-product">Xem ngay</a>
                    </div>
                  </div>
                </div>
              ))}
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
                <h3>Liên hệ ngay để tư vấn</h3>
              </div>
              <div className="blog-item">
                <img src="/images/blog/material-samples-1.jpg" alt="Tìm hiểu thêm về vật liệu nội thất" />
                <h3>Tìm hiểu thêm về vật liệu nội thất</h3>
              </div>
              <div className="blog-item">
                <img src="/images/blog/customer-service-1.jpg" alt="Bạn cần tư vấn gì?" />
                <h3>Bạn cần tư vấn gì?</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
