import React, { useState, useEffect } from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BannerSection } from "../../components/BannerSection";
// Thay thế toast bằng alert hoặc console.log
// import { toast } from "react-hot-toast";
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
  customerInfo?: {
    name: string;
    phone: string;
    address: string;
  };
  orderNumber?: string;
  refundDate?: string;
}

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  address: string | string[];
  full_name?: string;
}

interface PromoCode {
  code: string;
  discount: string;
  description: string;
  validUntil: string;
  validFrom: string;
  minOrder: string;
  used: boolean;
  isFlashSale: boolean;
  timeRemaining?: { hours: number; minutes: number; seconds: number };
  combinations: string;
}

const User: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<string>("orders");
  // State for active order filter
  const [activeOrderFilter, setActiveOrderFilter] = useState<string>("all");

  // Mock data for orders with different statuses
  const [orders] = useState<OrderItem[]>([
    {
      id: "sofa-modena-2-5-seater",
      orderNumber: "12123312",
      name: "Sofa Modena 2.5 seater",
      image: "/images/products/product(8).png",
      date: "22/5/2023",
      price: 15190000,
      quantity: 1,
      color: "#7D5A50",
      size: "1",
      status: "pending",
      customerInfo: {
        name: "Nguyễn Minh Duy",
        phone: "(+84) 866463002",
        address:
          "19/10, Lý Thường Kiệt ( địa chỉ cũ 373/1/142/10 phường 9, quận Tân Bình ), Phường 9, Quận Tân Bình, TP. Hồ Chí Minh",
      },
    },
    {
      id: "sofa-modena-2-5-seater-2",
      orderNumber: "12123312",
      name: "Sofa Modena 2.5 seater",
      image: "/images/products/product(8).png",
      date: "22/5/2023",
      price: 15190000,
      quantity: 1,
      color: "#7D5A50",
      size: "1",
      status: "confirmed",
      customerInfo: {
        name: "Nguyễn Minh Duy",
        phone: "(+84) 866463002",
        address:
          "19/10, Lý Thường Kiệt ( địa chỉ cũ 373/1/142/10 phường 9, quận Tân Bình ), Phường 9, Quận Tân Bình, TP. Hồ Chí Minh",
      },
    },
    {
      id: "sofa-modena-2-5-seater-3",
      orderNumber: "12123312",
      name: "Sofa Modena 2.5 seater",
      image: "/images/products/product(8).png",
      date: "22/5/2023",
      price: 15190000,
      quantity: 1,
      color: "#7D5A50",
      size: "1",
      status: "shipping",
      customerInfo: {
        name: "Nguyễn Minh Duy",
        phone: "(+84) 866463002",
        address:
          "19/10, Lý Thường Kiệt ( địa chỉ cũ 373/1/142/10 phường 9, quận Tân Bình ), Phường 9, Quận Tân Bình, TP. Hồ Chí Minh",
      },
    },
    {
      id: "sofa-modena-2-5-seater-4",
      orderNumber: "12123312",
      name: "Sofa Modena 2.5 seater",
      image: "/images/products/product(8).png",
      date: "22/5/2023",
      price: 15190000,
      quantity: 1,
      color: "#7D5A50",
      size: "1",
      status: "completed",
      customerInfo: {
        name: "Nguyễn Minh Duy",
        phone: "(+84) 866463002",
        address:
          "19/10, Lý Thường Kiệt ( địa chỉ cũ 373/1/142/10 phường 9, quận Tân Bình ), Phường 9, Quận Tân Bình, TP. Hồ Chí Minh",
      },
    },
    {
      id: "sofa-modena-2-5-seater-5",
      orderNumber: "12123312",
      name: "Sofa Modena 2.5 seater",
      image: "/images/products/product(8).png",
      date: "22/5/2023",
      price: 15190000,
      quantity: 1,
      color: "#7D5A50",
      size: "1",
      status: "cancelled",
      refundDate: "17:13 21-05-2025",
      customerInfo: {
        name: "Nguyễn Minh Duy",
        phone: "(+84) 866463002",
        address:
          "19/10, Lý Thường Kiệt ( địa chỉ cũ 373/1/142/10 phường 9, quận Tân Bình ), Phường 9, Quận Tân Bình, TP. Hồ Chí Minh",
      },
    },
    {
      id: "sofa-modena-2-5-seater-6",
      orderNumber: "12123312",
      name: "Sofa Modena 2.5 seater",
      image: "/images/products/product(8).png",
      date: "22/5/2023",
      price: 15190000,
      quantity: 1,
      color: "#7D5A50",
      size: "1",
      status: "returned",
      customerInfo: {
        name: "Nguyễn Minh Duy",
        phone: "(+84) 866463002",
        address:
          "19/10, Lý Thường Kiệt ( địa chỉ cũ 373/1/142/10 phường 9, quận Tân Bình ), Phường 9, Quận Tân Bình, TP. Hồ Chí Minh",
      },
    },
  ]);

  // Mock data for user information with default values
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Nguyễn Văn A",
    email: "example@gmail.com",
    phone: "0987654321",
    address: ["123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"],
  });

  // Lấy thông tin người dùng từ sessionStorage khi component mount
  useEffect(() => {
    const userDataStr = sessionStorage.getItem("user");
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        // Cập nhật thông tin người dùng từ sessionStorage
        setUserInfo({
          name: userData.name || userData.full_name || "Chưa cập nhật",
          email: userData.email || "Chưa cập nhật",
          phone: userData.phone || "Chưa cập nhật",
          address: userData.address || "Chưa cập nhật địa chỉ",
          full_name: userData.full_name,
        });
        console.log("Đã tải thông tin người dùng từ sessionStorage:", userData);
      } catch (error) {
        console.error(
          "Lỗi khi parse dữ liệu người dùng từ sessionStorage:",
          error
        );
      }
    } else {
      console.log("Không tìm thấy thông tin người dùng trong sessionStorage");
    }
  }, []);

  // Mock data for promo codes
  const [promoCodes] = useState<PromoCode[]>([
    {
      code: "NEWCUSTOMER_1234",
      discount: "5% OFF",
      description: "FOR WHOLE ORDER",
      validUntil: "09/08/2021 12:00",
      validFrom: "05/08/2021 04:00",
      minOrder: "169.00",
      used: false,
      isFlashSale: false,
      combinations:
        "Get 20% off when you spend over $169.00 or get 15% off when you spend.",
    },
    {
      code: "NEWCUSTOMER_1234",
      discount: "5% OFF",
      description: "FOR WHOLE ORDER",
      validUntil: "09/08/2021 12:00",
      validFrom: "05/08/2021 04:00",
      minOrder: "169.00",
      used: false,
      isFlashSale: true,
      timeRemaining: { hours: 1, minutes: 8, seconds: 59 },
      combinations:
        "Get 20% off when you spend over $169.00 or get 15% off when you spend.",
    },
    {
      code: "NEWCUSTOMER_1234",
      discount: "5% OFF",
      description: "FOR WHOLE ORDER",
      validUntil: "09/08/2021 12:00",
      validFrom: "05/08/2021 04:00",
      minOrder: "169.00",
      used: false,
      isFlashSale: false,
      combinations:
        "Get 20% off when you spend over $169.00 or get 15% off when you spend.",
    },
    {
      code: "NEWCUSTOMER_1234",
      discount: "5% OFF",
      description: "FOR WHOLE ORDER",
      validUntil: "09/08/2021 12:00",
      validFrom: "05/08/2021 04:00",
      minOrder: "169.00",
      used: false,
      isFlashSale: true,
      timeRemaining: { hours: 1, minutes: 8, seconds: 59 },
      combinations:
        "Get 20% off when you spend over $169.00 or get 15% off when you spend.",
    },
    {
      code: "NEWCUSTOMER_1234",
      discount: "5% OFF",
      description: "FOR WHOLE ORDER",
      validUntil: "09/08/2021 12:00",
      validFrom: "05/08/2021 04:00",
      minOrder: "169.00",
      used: false,
      isFlashSale: false,
      combinations:
        "Get 20% off when you spend over $169.00 or get 15% off when you spend.",
    },
    {
      code: "NEWCUSTOMER_1234",
      discount: "5% OFF",
      description: "FOR WHOLE ORDER",
      validUntil: "09/08/2021 12:00",
      validFrom: "05/08/2021 04:00",
      minOrder: "169.00",
      used: false,
      isFlashSale: false,
      combinations:
        "Get 20% off when you spend over $169.00 or get 15% off when you spend.",
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
        address: Array.isArray(userInfo.address) 
          ? [...userInfo.address, newAddress] 
          : [userInfo.address, newAddress]
      });
    }
  };

  // State for password modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Hàm xử lý đổi mật khẩu
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      // Gọi API đổi mật khẩu ở đây
      // const response = await changePassword(passwordData);

      // Thông báo thành công
      alert("Đổi mật khẩu thành công");

      // Đóng modal
      setShowPasswordModal(false);

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error);
      alert("Đổi mật khẩu thất bại");
    }
  };

  // Get filtered orders based on active filter
  const getFilteredOrders = () => {
    if (activeOrderFilter === "all") {
      return orders;
    }

    const statusMap: Record<string, string> = {
      pending: "pending",
      confirmed: "confirmed",
      shipping: "shipping",
      completed: "completed",
      cancelled: "cancelled",
      returned: "returned",
    };

    return orders.filter(
      (order) => order.status === statusMap[activeOrderFilter]
    );
  };

  // Function to get status button text
  const getStatusButtonText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "shipping":
        return "Đang giao";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      case "returned":
        return "Trả hàng";
      default:
        return status;
    }
  };

  // Function to get status button class
  const getStatusButtonClass = (status: string) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "confirmed":
        return "status-confirmed";
      case "shipping":
        return "status-shipping";
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      case "returned":
        return "status-returned";
      default:
        return "";
    }
  };

  // Function to get action buttons based on order status
  const getOrderActionButtons = (order: OrderItem) => {
    switch (order.status) {
      case "pending":
        return (
          <>
            <button className="btn-cancel-order">Hủy đơn hàng</button>
            <button className="btn-view-details">Xem chi tiết</button>
          </>
        );
      case "confirmed":
        return (
          <>
            <button className="btn-action-primary">Đã xác nhận</button>
            <button className="btn-view-details">Xem chi tiết</button>
          </>
        );
      case "shipping":
        return (
          <>
            <button className="btn-action-primary">Mua lại</button>
            <button className="btn-view-details">Xem chi tiết</button>
          </>
        );
      case "completed":
        return (
          <>
            <button className="btn-action-primary">Mua lại</button>
            <button className="btn-review">Trả hàng</button>
            <button className="btn-view-details">Xem chi tiết</button>
          </>
        );
      case "cancelled":
        return (
          <>
            <button className="btn-action-primary">Mua lại</button>
            <button className="btn-view-details">Xem chi tiết</button>
          </>
        );
      case "returned":
        return (
          <>
            <button className="btn-action-primary">Mua lại</button>
            <button className="btn-view-details">Xem chi tiết</button>
          </>
        );
      default:
        return <button className="btn-view-details">Xem chi tiết</button>;
    }
  };

  return (
    <>
      <Header />
      <BannerSection title={"Tài Khoản"} />
      <div className="user-account-page">
        <div className="container">
          <div className="account-wrapper">
            {/* Sidebar Navigation */}
            <div className="account-sidebar">
              <div className="sidebar-header">
                <h3>Quản lý tài khoản</h3>
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
                  <div className="content-section orders-header">
                    <h2 className="orders-header__name">
                      Xin chào, {userInfo.name}
                    </h2>
                    <div className="orders-header__email">
                      Email: {userInfo.email}
                    </div>
                  </div>

                  {orders.length > 0 ? (
                    <div className="order-list">
                      {orders.map((order) => (
                        <div className="order-item" key={order.id}>
                          <div className="order-header">
                            <div className="aside">
                              <div className="order-info">
                                <span className="label">Đơn hàng: </span>
                                <span className="value">{order.id}</span>
                              </div>
                              <div className="order-info">
                                <span className="label">Ngày đặt: </span>
                                <span className="value">{order.date}</span>
                              </div>
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
                              <span className="product-price">
                                <span className="label">Thành tiền: </span>
                                {formatPrice(order.price)}
                              </span>
                              <div className="product-meta">
                                <div className="meta-item">
                                  <span className="label">Màu:</span>
                                  <span className="value-color"></span>
                                </div>
                                <div className="meta-item">
                                  <span className="label">Số lượng:</span>
                                  <span className="value">
                                    {order.quantity}
                                  </span>
                                </div>
                              </div>
                              <div className="product-link">
                                <Link to={`/san-pham/${order.id}`}>
                                  Xem chi tiết
                                </Link>
                              </div>
                            </div>

                            <div className="order-pricing">
                              <h4>Thông tin</h4>
                              <div className="price-info">
                                <span className="label">Tên người nhận: </span>
                                <span className="value">{userInfo.name}</span>
                              </div>
                              <div className="delivery-info">
                                <span className="label">Số điện thoại: </span>
                                <span className="value">{userInfo.phone}</span>
                              </div>
                              <div className="total-info">
                                <span className="label">Địa chỉ: </span>
                                <span className="value">
                                  {typeof userInfo.address === 'string' 
                                    ? userInfo.address 
                                    : userInfo.address && userInfo.address.length > 0
                                      ? userInfo.address[0]
                                      : "Chưa cập nhật địa chỉ"}
                                </span>
                              </div>
                              <div className="order-actions">
                                <button className="btn-outline">Chờ</button>
                                <Link
                                  to={`/chi-tiet-don-hang/${order.id}`}
                                  className="btn-primary"
                                >
                                  Xem chi tiết
                                </Link>
                              </div>
                            </div>
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
                  {!showPasswordForm ? (
                    <div className="profile-info-container">
                      <div className="heading-content">
                        <h2>Hồ sơ cá nhân</h2>
                        <p>
                          Xem và cập nhật thông tin hồ sơ của bạn, bao gồm tên,
                          email và số điện thoại của bạn. Bạn cũng có thể cập
                          nhật địa chỉ thanh toán hoặc thay đổi mật khẩu của
                          mình.
                        </p>
                      </div>
                      <div className="profile-info-header">
                        <h3>Thông tin cá nhân</h3>
                      </div>

                      <div className="profile-info-grid">
                        <div className="profile-info-item">
                          <div className="info-label">Tên</div>
                          <div className="info-value">
                            {userInfo.full_name || userInfo.name}
                          </div>
                        </div>

                        <div className="profile-info-item">
                          <div className="info-label">Email</div>
                          <div className="info-value">{userInfo.email}</div>
                        </div>

                        <div className="profile-info-item">
                          <div className="info-label">Số điện thoại</div>
                          <div className="info-value">{userInfo.phone}</div>
                        </div>

                        <div className="profile-info-item">
                          <div className="info-label">Địa chỉ</div>
                          <div className="info-value">
                            {typeof userInfo.address === 'string' 
                              ? userInfo.address 
                              : userInfo.address && userInfo.address.length > 0
                                ? userInfo.address[0]
                                : "Chưa cập nhật địa chỉ"}
                          </div>
                        </div>
                      </div>

                      <div className="profile-actions">
                        <button
                          className="btn-secondary"
                          onClick={() => setShowPasswordForm(true)}
                        >
                          Đổi mật khẩu
                        </button>
                        <button
                          className="btn-primary"
                          onClick={() => setShowEditModal(true)}
                        >
                          Chỉnh sửa
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="profile-info-container">
                      <div className="profile-info-header">
                        <h3>Đổi mật khẩu</h3>
                      </div>

                      <div className="password-change-container">
                        <p className="password-instruction">
                          Bạn có thể thay đổi mật khẩu tài khoản của mình tại
                          đây. Vui lòng nhập mật khẩu hiện tại, sau đó nhập mật
                          khẩu mới và xác nhận lại để hoàn tất quá trình. Đảm
                          bảo mật khẩu mới có độ bảo mật cao để bảo vệ tài khoản
                          của bạn.
                        </p>

                        <form
                          className="password-form"
                          onSubmit={handlePasswordChange}
                        >
                          <div className="form-group">
                            <div className="info-label">Nhập mật khẩu cũ</div>
                            <input
                              type="password"
                              value={passwordData.currentPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  currentPassword: e.target.value,
                                })
                              }
                              className="password-input"
                              placeholder="121212121212121"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <div className="info-label">Nhập mật khẩu mới</div>
                            <input
                              type="password"
                              value={passwordData.newPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  newPassword: e.target.value,
                                })
                              }
                              className="password-input"
                              placeholder="121122112122112"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <div className="info-label">
                              Nhập lại mật khẩu mới
                            </div>
                            <input
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  confirmPassword: e.target.value,
                                })
                              }
                              className="password-input"
                              placeholder="121122112122112"
                              required
                            />
                          </div>

                          <div className="forgot-password">
                            <a href="#">Quên mật khẩu?</a>
                          </div>

                          <div className="password-actions">
                            <button
                              type="button"
                              className="btn-secondary"
                              onClick={() => {
                                setShowPasswordForm(false);
                                setPasswordData({
                                  currentPassword: "",
                                  newPassword: "",
                                  confirmPassword: "",
                                });
                              }}
                            >
                              Trở về
                            </button>
                            <button type="submit" className="btn-primary">
                              Xác nhận
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Modal chỉnh sửa thông tin */}
                  {showEditModal && (
                    <div className="modal-overlay">
                      <div className="modal-content">
                        <h3>Chỉnh sửa thông tin</h3>
                        <form
                          className="info-form"
                          onSubmit={handleUserInfoSubmit}
                        >
                          <div className="form-group">
                            <label htmlFor="fullName">Họ và tên</label>
                            <input
                              type="text"
                              id="fullName"
                              value={userInfo.name}
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  name: e.target.value,
                                })
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
                                setUserInfo({
                                  ...userInfo,
                                  email: e.target.value,
                                })
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
                                setUserInfo({
                                  ...userInfo,
                                  phone: e.target.value,
                                })
                              }
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="address">Địa chỉ</label>
                            <input
                              type="text"
                              id="address"
                              value={typeof userInfo.address === 'string' 
                                ? userInfo.address 
                                : userInfo.address && userInfo.address.length > 0
                                  ? userInfo.address[0]
                                  : ""}
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  address: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="modal-actions">
                            <button
                              type="button"
                              className="btn-secondary"
                              onClick={() => setShowEditModal(false)}
                            >
                              Hủy
                            </button>
                            <button type="submit" className="btn-primary">
                              Lưu thay đổi
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="content-section addresses-section">
                  <h2>Sổ địa chỉ</h2>

                  <div className="addresses-list">
                    {Array.isArray(userInfo.address) ? (
                      userInfo.address.map((address, index) => (
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
                                  const newAddresses = [...userInfo.address as string[]];
                                  newAddresses.splice(index, 1);
                                  setUserInfo({
                                    ...userInfo,
                                    address: newAddresses,
                                  });
                                }}
                              >
                                Xóa
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="address-item">
                        <div className="address-content">
                          <h4>Địa chỉ mặc định</h4>
                          <p>{userInfo.address}</p>
                        </div>
                        <div className="address-actions">
                          <button className="btn-link">Sửa</button>
                        </div>
                      </div>
                    )}

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
                  <p className="promo-description-text">
                    Xem và quản lý các mã giảm giá hiện có của bạn. Bạn có thể
                    kiểm tra thông tin chi tiết về từng mã, bao gồm giá trị ưu
                    đãi, điều kiện áp dụng và ngày hết hạn.
                  </p>

                  <div className="promo-section-header">
                    <h3>Mã giảm giá của bạn</h3>
                  </div>

                  <div className="voucher-grid">
                    {promoCodes.map((promo, index) => (
                      <div className="voucher-card" key={index}>
                        <div className="voucher-header">
                          <div className="voucher-discount">
                            {promo.discount}
                          </div>
                          <div className="voucher-type">
                            {promo.description}
                          </div>
                        </div>

                        <div className="voucher-code">
                          <span>Code: {promo.code}</span>
                        </div>

                        {promo.isFlashSale && (
                          <div className="flash-sale-banner">
                            <div className="flash-icon">⚡</div>
                            <div className="flash-text">Flash sale</div>
                            <div className="flash-time">
                              <span className="time-value">01</span> h{" "}
                              <span className="time-value">08</span> m{" "}
                              <span className="time-value">59</span> s
                            </div>
                          </div>
                        )}

                        <div className="voucher-details">
                          <ul className="voucher-info-list">
                            <li>
                              <span>
                                {promo.validFrom} - {promo.validUntil}
                              </span>
                            </li>
                            <li>
                              <span>For all products.</span>
                            </li>
                            <li>
                              <span>Combinations: {promo.combinations}</span>
                            </li>
                          </ul>
                        </div>

                        <div className="voucher-actions">
                          <button className="btn-copy">
                            <img src="/images/icons/content_copy.svg" alt="" />
                            <span>Copy</span>
                          </button>
                          <button className="btn-apply">
                            <span>Apply</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab (renamed to Order Management) */}
              {activeTab === "wishlist" && (
                <div className="content-section orders-management-section">
                  <h2>Đơn hàng của</h2>

                  <div className="order-filter-tabs">
                    <button
                      className={activeOrderFilter === "all" ? "active" : ""}
                      onClick={() => setActiveOrderFilter("all")}
                    >
                      Tất cả
                    </button>
                    <button
                      className={
                        activeOrderFilter === "pending" ? "active" : ""
                      }
                      onClick={() => setActiveOrderFilter("pending")}
                    >
                      Chờ xác nhận
                    </button>
                    <button
                      className={
                        activeOrderFilter === "shipping" ? "active" : ""
                      }
                      onClick={() => setActiveOrderFilter("shipping")}
                    >
                      Đang giao hàng
                    </button>
                    <button
                      className={
                        activeOrderFilter === "completed" ? "active" : ""
                      }
                      onClick={() => setActiveOrderFilter("completed")}
                    >
                      Hoàn thành
                    </button>
                    <button
                      className={
                        activeOrderFilter === "cancelled" ? "active" : ""
                      }
                      onClick={() => setActiveOrderFilter("cancelled")}
                    >
                      Đã hủy
                    </button>
                    <button
                      className={
                        activeOrderFilter === "returned" ? "active" : ""
                      }
                      onClick={() => setActiveOrderFilter("returned")}
                    >
                      Trả hàng/hoàn tiền
                    </button>
                  </div>

                  {getFilteredOrders().length > 0 ? (
                    <div className="order-list-container">
                      {getFilteredOrders().map((order, index) => (
                        <div className="order-item" key={index}>
                          <div className="order-header">
                            <div className="order-number">
                              <span>Đơn hàng: {order.orderNumber}</span>
                              <span>Ngày đặt: {order.date}</span>
                            </div>
                            <div className="order-status">
                              <span
                                className={getStatusButtonClass(order.status)}
                              >
                                {getStatusButtonText(order.status)}
                              </span>
                            </div>
                          </div>

                          <div className="order-content">
                            <div className="product-image">
                              <img src={order.image} alt={order.name} />
                            </div>

                            <div className="product-details">
                              <h4>{order.name}</h4>
                              <p className="product-category">Sofa</p>
                              <div className="product-price">
                                <span>
                                  Thành tiền: {formatPrice(order.price)}
                                </span>
                              </div>
                              <div className="product-meta">
                                <div className="meta-item">
                                  <span>Màu:</span>
                                  <span
                                    className="color-dot"
                                    style={{ backgroundColor: order.color }}
                                  ></span>
                                </div>
                                <div className="meta-item">
                                  <span>Số lượng: {order.quantity}</span>
                                </div>
                              </div>
                              <div className="product-link">
                                <a href="#">Xem chi tiết</a>
                              </div>
                            </div>

                            <div className="order-info">
                              <h4>Thông tin:</h4>
                              <div className="info-item">
                                <span className="label">Tên người nhận:</span>
                                <span className="value">
                                  {order.customerInfo?.name}
                                </span>
                              </div>
                              <div className="info-item">
                                <span className="label">Số điện thoại:</span>
                                <span className="value">
                                  {order.customerInfo?.phone}
                                </span>
                              </div>
                              <div className="info-item">
                                <span className="label">Địa chỉ:</span>
                                <span className="value">
                                  {order.customerInfo?.address}
                                </span>
                              </div>

                              {order.status === "cancelled" &&
                                order.refundDate && (
                                  <div className="info-item refund-info">
                                    <span className="label">
                                      Đơn hàng đã được hủy
                                    </span>
                                    <span className="value">
                                      Ngày cấp xác: {order.refundDate}
                                    </span>
                                  </div>
                                )}

                              <div className="order-actions">
                                {order.status === "pending" && (
                                  <>
                                    <button className="btn-cancel-order">
                                      Hủy đơn hàng
                                    </button>
                                    <button className="btn-view-details">
                                      Xem chi tiết
                                    </button>
                                  </>
                                )}

                                {order.status === "confirmed" && (
                                  <>
                                    <button className="btn-view-details">
                                      Xem chi tiết
                                    </button>
                                  </>
                                )}

                                {order.status === "shipping" && (
                                  <>
                                    <button className="btn-view-details">
                                      Xem chi tiết
                                    </button>
                                  </>
                                )}

                                {order.status === "completed" && (
                                  <>
                                    <button className="btn-action-primary">
                                      Mua lại
                                    </button>
                                    <button className="btn-view-details">
                                      Xem chi tiết
                                    </button>
                                  </>
                                )}

                                {order.status === "cancelled" && (
                                  <>
                                    <button className="btn-action-primary">
                                      Mua lại
                                    </button>
                                    <button className="btn-view-details">
                                      Xem chi tiết
                                    </button>
                                  </>
                                )}

                                {order.status === "returned" && (
                                  <>
                                    <button className="btn-action-primary">
                                      Mua lại
                                    </button>
                                    <button className="btn-view-details">
                                      Xem chi tiết
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>Không có đơn hàng nào trong trạng thái này</p>
                      <Link to="/san-pham" className="btn-primary">
                        Tiếp tục mua sắm
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Design Services Showcase */}
      </div>
      <Footer />
    </>
  );
};

export default User;
