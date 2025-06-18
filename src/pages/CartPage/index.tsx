import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GetInTouch from "../../components/GetInTouch";
import PolicyProduct from "../../components/Policy";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  color: string;
  quantity: number;
  category: string;
}

const CartPage: React.FC = () => {
  // Mock cart items
  const [cartItems, setCartItems] = useState<CartItemProps[]>([
    {
      id: 1,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      // oldPrice: 25000000,
      image: "/images/hot-product-1.jpg",
      color: "#999999",
      quantity: 1,
      category: "Sofa",
    },
    {
      id: 2,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      oldPrice: 25000000,
      image: "/images/hot-product-2.jpg",
      color: "#D8C1A9",
      quantity: 1,
      category: "Sofa",
    },
    {
      id: 2,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      oldPrice: 25000000,
      image: "/images/hot-product-2.jpg",
      color: "#D8C1A9",
      quantity: 1,
      category: "Sofa",
    },
    {
      id: 2,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      oldPrice: 25000000,
      image: "/images/hot-product-2.jpg",
      color: "#D8C1A9",
      quantity: 1,
      category: "Sofa",
    },
    {
      id: 2,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      oldPrice: 25000000,
      image: "/images/hot-product-2.jpg",
      color: "#D8C1A9",
      quantity: 1,
      category: "Sofa",
    },
    {
      id: 2,
      name: "Sofa Modena 2.5 seater ofa odena sema seater",
      price: 15190000,
      oldPrice: 25000000,
      image: "/images/hot-product-2.jpg",
      color: "#D8C1A9",
      quantity: 1,
      category: "Sofa",
    },
  ]);

  // Cart summary state
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    shipping: 30000,
    discount: 0,
    discountPercent: 10,
    total: 0,
  });

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Update quantity of an item
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleDeleteAll = () => {
    setCartItems([]);
  };

  // Calculate cart summary
  useEffect(() => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const discount = subtotal * (cartSummary.discountPercent / 100);
    const total = subtotal + cartSummary.shipping - discount;

    setCartSummary({
      ...cartSummary,
      subtotal,
      discount,
      total,
    });
  }, [cartItems]);

  return (
    <>
      <Header />
      <div className="cart-page">
        {/* Banner Section */}
        <div className="cart-banner">
          <div className="container-fluid">
            <div className="banner-image">
              <img
                src="/images/cartpage/banner_cart.jpg"
                alt="Giỏ hàng - Mua sắm nội thất cao cấp"
              />
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <span className="active">Giỏ hàng</span>
            </div>
          </div>
        </div>

        {/* Cart Content */}
        <section className="cart-content">
          <div className="container">
            <div className="page-title">
              <h1>Giỏ hàng</h1>
              <p className="items-count">{cartItems.length} sản phẩm</p>
            </div>

            {cartItems.length > 0 ? (
              <div className="cart-grid">
                {/* Cart Items */}
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className="item-details">
                        <div className="item-info">
                          <h3 className="item-name">{item.name}</h3>
                          <div className="item-category">{item.category}</div>
                          <div className="item-color">
                            <span className="color-label">Màu:</span>
                            <span
                              className="color-dot"
                              style={{ backgroundColor: item.color }}
                            ></span>
                          </div>
                        </div>
                        <div className="item-price">
                          <div className="current-price">
                            {formatPrice(item.price)} đ
                          </div>
                          {item.oldPrice && (
                            <div className="old-price">
                              {formatPrice(item.oldPrice)} đ
                            </div>
                          )}
                        </div>
                        <div className="item-actions">
                          <div className="quantity-selector">
                            <button
                              className="quantity-btn decrease"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="quantity-input"
                            />
                            <button
                              className="quantity-btn increase"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="remove-btn"
                            onClick={() => removeItem(item.id)}
                            aria-label="Xóa sản phẩm khỏi giỏ hàng"
                          >
                            {/* <i className="icon-trash"></i> */}
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_2039_22395)">
                                <path
                                  d="M15.078 2.62793L14.46 14.7779C14.4215 15.5473 14.0885 16.2724 13.53 16.8029C12.9715 17.3335 12.2304 17.6289 11.46 17.6279H6.67202C5.90169 17.6289 5.16051 17.3335 4.60202 16.8029C4.04353 16.2724 3.71054 15.5473 3.67202 14.7779L3.07202 2.62793"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M6.76808 1.50027C6.84652 1.25968 6.99902 1.05005 7.20376 0.90134C7.40851 0.75263 7.65502 0.672452 7.90808 0.672266H10.2421C10.4944 0.672037 10.7404 0.751342 10.945 0.89891C11.1497 1.04648 11.3026 1.2548 11.3821 1.49427L11.6581 2.32227H6.49208L6.76808 1.50027ZM6.06608 2.92827H16.5721C16.6516 2.92827 16.7279 2.89666 16.7842 2.8404C16.8405 2.78414 16.8721 2.70783 16.8721 2.62827C16.8721 2.5487 16.8405 2.47239 16.7842 2.41613C16.7279 2.35987 16.6516 2.32827 16.5721 2.32827H12.2881L11.9461 1.30827C11.8277 0.949479 11.5994 0.637037 11.2936 0.415203C10.9878 0.193369 10.6199 0.0733908 10.2421 0.0722656H7.90208C7.52427 0.0733908 7.15639 0.193369 6.85056 0.415203C6.54473 0.637037 6.31646 0.949479 6.19808 1.30827L5.85608 2.32827H1.57808C1.49851 2.32827 1.4222 2.35987 1.36594 2.41613C1.30968 2.47239 1.27808 2.5487 1.27808 2.62827C1.27808 2.70783 1.30968 2.78414 1.36594 2.8404C1.4222 2.89666 1.49851 2.92827 1.57808 2.92827H6.06608Z"
                                  fill="currentColor"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_2039_22395">
                                  <rect width="18" height="18" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="delete-all" onClick={handleDeleteAll}>
                    Xóa toàn bộ
                  </p>
                </div>

                {/* Cart Summary */}
                <div className="cart-summary">
                  <div className="summary-title">Đơn hàng</div>
                  <div className="summary-row">
                    <span className="label">Tổng tiền:</span>
                    <span className="value">
                      {formatPrice(cartSummary.subtotal)} đ
                    </span>
                  </div>
                  <div className="summary-row">
                    <span className="label">Vận chuyển:</span>
                    <span className="value">
                      {formatPrice(cartSummary.shipping)} đ
                    </span>
                  </div>
                  <div className="summary-row discount">
                    <span className="label">Thành viên giảm giá:</span>
                    <span className="value">
                      -{cartSummary.discountPercent}%
                    </span>
                  </div>
                  <div className="summary-row promo-code">
                    <span className="label">Mã giảm giá:</span>
                    <div className="promo-input">
                      <input type="text" placeholder="Nhập mã giảm giá" />
                      <button className="apply-btn">Áp dụng</button>
                    </div>
                  </div>
                  <div className="summary-total">
                    <span className="label">Tổng cộng</span>
                    <span className="value">
                      {formatPrice(cartSummary.total)} đ
                    </span>
                  </div>
                  <Link to="/thanh-toan" className="checkout-btn">
                    Tiến hành thanh toán
                  </Link>
                </div>
              </div>
            ) : (
              <div className="empty-cart">
                <div className="empty-icon">
                  <i className="icon-cart-empty"></i>
                </div>
                <h2>Giỏ hàng của bạn đang trống</h2>
                <p>Hãy thêm sản phẩm vào giỏ hàng để tiến hành mua sắm.</p>
                <Link to="/san-pham" className="btn-shop-now">
                  Khám phá sản phẩm ngay
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Policy Product */}
        <PolicyProduct />

        {/* FAQ Section */}
        <GetInTouch />
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
