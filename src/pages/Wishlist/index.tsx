import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface WishlistProductProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  colors: string[];
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

const Wishlist: React.FC = () => {
  // Mock wishlist products data
  const [wishlistProducts, setWishlistProducts] = useState<WishlistProductProps[]>([
    {
      id: 1,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      oldPrice: 25000000,
      image: "/images/products/sofa-beige-1.jpg",
      colors: ["#D8C1A9", "#333333", "#777777"],
      category: "Sofa",
    },
    {
      id: 2,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      oldPrice: 25000000,
      image: "/images/products/sofa-gray-1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      category: "Sofa",
      isSale: true,
    },
    {
      id: 3,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      image: "/images/products/sofa-black-1.jpg",
      colors: ["#D8C1A9", "#333333", "#555555"],
      category: "Sofa",
      isNew: true,
    },
    {
      id: 4,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      oldPrice: 25000000,
      image: "/images/products/chair-wooden-1.jpg",
      colors: ["#D8C1A9", "#333333", "#777777"],
      category: "Ghế",
      isSale: true,
    },
    {
      id: 5,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      image: "/images/products/chair-burgundy-1.jpg",
      colors: ["#4A2932", "#E5E5E5", "#555555"],
      category: "Ghế",
    },
    {
      id: 6,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      image: "/images/products/table-round-black-1.jpg",
      colors: ["#333333", "#555555", "#777777"],
      category: "Bàn",
    },
    {
      id: 7,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      oldPrice: 25000000,
      image: "/images/products/tiles-beige-1.jpg",
      colors: ["#D8C1A9", "#E5E5E5", "#555555"],
      category: "Gạch",
    },
    {
      id: 8,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      image: "/images/products/carpet-pattern-1.jpg",
      colors: ["#D8C1A9", "#333333", "#777777"],
      category: "Thảm",
      isNew: true,
    }
  ]);

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId: number) => {
    setWishlistProducts(wishlistProducts.filter(product => product.id !== productId));
  };

  return (
    <>
      <Header />
      <div className="wishlist-page">
        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <span className="active">Sản phẩm yêu thích</span>
            </div>
          </div>
        </div>

        {/* Wishlist Content */}
        <section className="wishlist-content">
          <div className="container">
            <div className="page-title">
              <h1>Sản Phẩm Yêu Thích - Lưu giữ những món đồ bạn ấn tượng</h1>
              <p className="subtitle">
                Lưu lại những sản phẩm bạn yêu thích để dễ dàng tìm lại và mua sắm khi bạn sẵn sàng, 
                giúp việc mua sắm trở nên tiện lợi và nhanh chóng hơn bao giờ hết.
              </p>
            </div>

            {wishlistProducts.length > 0 ? (
              <div className="products-grid">
                {wishlistProducts.map((product) => (
                  <div key={product.id} className="product-item">
                    <div className="product-image">
                      {product.isNew && <span className="badge new">NEW</span>}
                      {product.isSale && <span className="badge sale">SALE</span>}
                      <img src={product.image} alt={`${product.name} - ${product.category}`} />
                      <div className="product-actions">
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromWishlist(product.id)}
                          aria-label="Xóa sản phẩm khỏi danh sách yêu thích"
                        >
                          <i className="icon-trash"></i>
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
                        <div className="price-info">
                          <span className="price">{formatPrice(product.price)} ₫</span>
                          {product.oldPrice && (
                            <span className="old-price">{formatPrice(product.oldPrice)} ₫</span>
                          )}
                        </div>
                        <span className="price-label">Giá bán</span>
                      </div>
                      <div className="product-action">
                        <Link to={`/san-pham/${product.id}`} className="view-product">Xem ngay</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-wishlist">
                <div className="empty-icon">
                  <i className="icon-heart-empty"></i>
                </div>
                <h2>Danh sách yêu thích của bạn đang trống</h2>
                <p>Hãy thêm sản phẩm vào danh sách yêu thích để dễ dàng theo dõi và mua sắm sau này.</p>
                <Link to="/san-pham" className="btn-shop-now">Khám phá sản phẩm ngay</Link>
              </div>
            )}
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

export default Wishlist;
