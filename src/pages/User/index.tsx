import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Define interfaces for our data types
interface OrderItem {
  id: string;
  name: string;
  image: string;
  date: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  status: string;
}

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  addresses: string[];
}

interface PromoCode {
  code: string;
  discount: string;
  description: string;
  validUntil: string;
  minOrder: string;
  used: boolean;
}

const User: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<string>("orders");

  // Mock data for orders
  const [orders] = useState<OrderItem[]>([
    {
      id: "123456",
      name: "Sofa Băng",
      image: "/images/products/product(8).png",
      date: "25/10/2023",
      price: 21000000,
      quantity: 1,
      color: "Xám",
      size: "3 chỗ ngồi",
      status: "Đang giao hàng",
    },
  ]);

  // Mock data for user information
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Nguyễn Văn A",
    email: "example@gmail.com",
    phone: "0987654321",
    addresses: ["123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"],
  });

  // Mock data for promo codes
  const [promoCodes] = useState<PromoCode[]>([
    {
      code: "SUMMER10",
      discount: "10% OFF",
      description: "Giảm 10% cho đơn hàng từ 2 triệu",
      validUntil: "30/09/2023",
      minOrder: "2.000.000đ",
      used: false,
    },
    {
      code: "NEWUSER15",
      discount: "15% OFF",
      description: "Giảm 15% cho đơn hàng đầu tiên",
      validUntil: "31/12/2023",
      minOrder: "1.000.000đ",
      used: false,
    },
    {
      code: "FALL5",
      discount: "5% OFF",
      description: "Giảm 5% không giới hạn giá trị đơn hàng",
      validUntil: "15/11/2023",
      minOrder: "0đ",
      used: true,
    },
  ]);

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  // Handle user info form submission
  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thông tin cá nhân đã được cập nhật!");
  };

  // Handle adding new address
  const handleAddAddress = () => {
    const newAddress = prompt("Nhập địa chỉ mới:");
    if (newAddress && newAddress.trim() !== "") {
      setUserInfo({
        ...userInfo,
        addresses: [...userInfo.addresses, newAddress],
      });
    }
  };

  return (
    <>
      <Header />
      <div className="user-account-page">
        <div className="container">
          <div className="account-wrapper">
            {/* Sidebar Navigation */}
            <div className="account-sidebar">
              <div className="sidebar-header">
                <h3>Trang người dùng</h3>
              </div>
              <ul className="sidebar-menu">
                <li className={activeTab === "orders" ? "active" : ""}>
                  <button onClick={() => setActiveTab("orders")}>
                    <i className="icon-box">
                      <img src="/images/icons/Puzzle.svg" alt="icon-box" />
                    </i>
                    <span>Tổng quan</span>
                  </button>
                </li>
                <li className={activeTab === "info" ? "active" : ""}>
                  <button onClick={() => setActiveTab("info")}>
                    <i className="icon-user">
                      <img src="/images/icons/User_02.svg" alt="icon-box" />
                    </i>
                    <span>Thông tin cá nhân</span>
                  </button>
                </li>
                <li className={activeTab === "promo" ? "active" : ""}>
                  <button onClick={() => setActiveTab("promo")}>
                    <i className="icon-gift">
                      <img
                        src="/images/icons/Ticket_Voucher.svg"
                        alt="icon-box"
                      />
                    </i>
                    <span>Mã giảm giá</span>
                  </button>
                </li>
                <li className={activeTab === "wishlist" ? "active" : ""}>
                  <button onClick={() => setActiveTab("wishlist")}>
                    <i className="icon-heart">
                      <img
                        src="/images/icons/Shopping_Cart_02.svg"
                        alt="icon-box"
                      />
                    </i>
                    <span>Đơn hàng</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Đã đăng xuất!")}>
                    <i className="icon-logout">
                      <img src="/images/icons/Log_Out.svg" alt="icon-box" />
                    </i>
                    <span>Đăng xuất</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Main Content Area */}
            <div className="account-content">
              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="content-section orders-section">
                  <h2>Đơn hàng của tôi</h2>

                  {orders.length > 0 ? (
                    <div className="order-list">
                      {orders.map((order) => (
                        <div className="order-item" key={order.id}>
                          <div className="order-header">
                            <div className="order-info">
                              <span className="label">Mã đơn hàng:</span>
                              <span className="value">{order.id}</span>
                            </div>
                            <div className="order-info">
                              <span className="label">Ngày đặt:</span>
                              <span className="value">{order.date}</span>
                            </div>
                            <div className="order-status">
                              <span
                                className={`status ${order.status
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>

                          <div className="order-content">
                            <div className="product-image">
                              <img src={order.image} alt={order.name} />
                            </div>

                            <div className="product-details">
                              <h4>{order.name}</h4>
                              <div className="product-meta">
                                <div className="meta-item">
                                  <span className="label">Màu sắc:</span>
                                  <span className="value">{order.color}</span>
                                </div>
                                <div className="meta-item">
                                  <span className="label">Kích thước:</span>
                                  <span className="value">{order.size}</span>
                                </div>
                              </div>
                              <div className="product-quantity">
                                <span className="label">Số lượng:</span>
                                <span className="value">{order.quantity}</span>
                              </div>
                            </div>

                            <div className="order-pricing">
                              <div className="price-info">
                                <span className="label">Tổng tiền:</span>
                                <span className="value">
                                  {formatPrice(order.price)}
                                </span>
                              </div>
                              <div className="delivery-info">
                                <span className="label">Phí vận chuyển:</span>
                                <span className="value">Miễn phí</span>
                              </div>
                              <div className="total-info">
                                <span className="label">Thành tiền:</span>
                                <span className="value">
                                  {formatPrice(order.price)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="order-actions">
                            <Link
                              to={`/chi-tiet-don-hang/${order.id}`}
                              className="btn-primary"
                            >
                              Xem chi tiết
                            </Link>
                            <button className="btn-outline">Mua lại</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>Bạn chưa có đơn hàng nào</p>
                    </div>
                  )}
                </div>
              )}

              {/* Personal Information Tab */}
              {activeTab === "info" && (
                <div className="content-section info-section">
                  <h2>Thông tin cá nhân</h2>

                  <form className="info-form" onSubmit={handleUserInfoSubmit}>
                    <div className="form-group">
                      <label htmlFor="fullName">Họ và tên</label>
                      <input
                        type="text"
                        id="fullName"
                        value={userInfo.name}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={userInfo.email}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Số điện thoại</label>
                      <input
                        type="tel"
                        id="phone"
                        value={userInfo.phone}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, phone: e.target.value })
                        }
                        required
                      />
                    </div>

                    <button type="submit" className="btn-primary">
                      Lưu thay đổi
                    </button>
                  </form>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="content-section addresses-section">
                  <h2>Sổ địa chỉ</h2>

                  <div className="addresses-list">
                    {userInfo.addresses.map((address, index) => (
                      <div className="address-item" key={index}>
                        <div className="address-content">
                          <h4>
                            {index === 0
                              ? "Địa chỉ mặc định"
                              : `Địa chỉ ${index + 1}`}
                          </h4>
                          <p>{address}</p>
                        </div>
                        <div className="address-actions">
                          <button className="btn-link">Sửa</button>
                          {index !== 0 && (
                            <button
                              className="btn-link delete"
                              onClick={() => {
                                const newAddresses = [...userInfo.addresses];
                                newAddresses.splice(index, 1);
                                setUserInfo({
                                  ...userInfo,
                                  addresses: newAddresses,
                                });
                              }}
                            >
                              Xóa
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    <button
                      className="btn-add-address"
                      onClick={handleAddAddress}
                    >
                      <i className="icon-plus"></i>
                      <span>Thêm địa chỉ mới</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Promo Codes Tab */}
              {activeTab === "promo" && (
                <div className="content-section promo-section">
                  <h2>Mã giảm giá</h2>

                  <div className="promo-codes-grid">
                    {promoCodes.map((promo, index) => (
                      <div
                        className={`promo-code-card ${
                          promo.used ? "used" : ""
                        }`}
                        key={index}
                      >
                        <div className="discount-badge">
                          <span>{promo.discount}</span>
                        </div>
                        <div className="promo-content">
                          <div className="promo-header">
                            <h4>{promo.code}</h4>
                            {promo.used && (
                              <span className="used-badge">Đã sử dụng</span>
                            )}
                          </div>
                          <p className="promo-description">
                            {promo.description}
                          </p>
                          <div className="promo-meta">
                            <div className="meta-item">
                              <span className="label">Đơn tối thiểu:</span>
                              <span className="value">{promo.minOrder}</span>
                            </div>
                            <div className="meta-item">
                              <span className="label">Có hiệu lực đến:</span>
                              <span className="value">{promo.validUntil}</span>
                            </div>
                          </div>
                        </div>
                        <button className="btn-copy" disabled={promo.used}>
                          <span>Sao chép</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="content-section wishlist-section">
                  <h2>Sản phẩm yêu thích</h2>

                  <div className="empty-state">
                    <p>Bạn chưa có sản phẩm yêu thích nào</p>
                    <Link to="/san-pham" className="btn-primary">
                      Tiếp tục mua sắm
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Design Services Showcase */}
        <div className="design-services">
          <div className="container">
            <div className="services-grid">
              <div className="service-item">
                <img
                  src="/images/design/personalized-design.jpg"
                  alt="Thiết kế cá nhân hóa"
                />
                <h3>Thiết kế cá nhân hóa</h3>
                <p>Liên hệ ngay để được tư vấn</p>
              </div>

              <div className="service-item">
                <img
                  src="/images/design/material-samples.jpg"
                  alt="Tìm hiểu về các mẫu vật liệu"
                />
                <h3>Tìm hiểu thêm về các mẫu vật liệu</h3>
              </div>

              <div className="service-item">
                <img
                  src="/images/design/design-consultation.jpg"
                  alt="Bạn cần liên hệ hỗ trợ?"
                />
                <h3>Bạn cần liên hệ hỗ trợ?</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
