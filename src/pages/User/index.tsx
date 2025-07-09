import React, { useState, useEffect } from "react";
import { Link, Links, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BannerSection } from "../../components/BannerSection";
import axios from "axios";

import type {
  OrderItemAPI,
  OrderAPI,
  OrdersResponse,
  OrderItem,
  UserInfo, CouponCode,
  PromoCodeWithTimer as PromoCode
} from "../../types";
// Thay thế toast bằng alert hoặc console.log
// import { toast } from "react-hot-toast";
// Define interfaces for our data types

// CountdownTimer component
const CountdownTimer: React.FC<{
  hours: number;
  minutes: number;
  seconds: number;
  onComplete?: () => void;
}> = ({
  hours: initialHours,
  minutes: initialMinutes,
  seconds: initialSeconds,
  onComplete,
}) => {
    const [hours, setHours] = useState<number>(initialHours);
    const [minutes, setMinutes] = useState<number>(initialMinutes);
    const [seconds, setSeconds] = useState<number>(initialSeconds);
    const [isLowTime, setIsLowTime] = useState<boolean>(false);

    useEffect(() => {
      // Check if time is running low (less than 10 minutes)
      if (hours === 0 && minutes < 10) {
        setIsLowTime(true);
      } else {
        setIsLowTime(false);
      }

      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          clearInterval(interval);
          if (onComplete) {
            onComplete();
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [hours, minutes, seconds, onComplete]);

    // Format numbers to always have 2 digits
    const formatNumber = (num: number): string => {
      return num < 10 ? `0${num}` : `${num}`;
    };

    return (
      <div className={`flash-time ${isLowTime ? "low-time" : ""}`}>
        <span className="time-value">{formatNumber(hours)}</span> h{" "}
        <span className="time-value">{formatNumber(minutes)}</span> m{" "}
        <span className="time-value">{formatNumber(seconds)}</span> s
      </div>
    );
  };

const User: React.FC = () => {
  // Use location to get current path
  const location = useLocation();
  const navigate = useNavigate();

  // State for active tab
  const [activeTab, setActiveTab] = useState<string>("orders");
  // State for active order filter
  const [activeOrderFilter, setActiveOrderFilter] = useState<string>("all");
  const [activePromoFilter, setActivePromoFilter] = useState<string>("all");

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

  // State để theo dõi khi nào cần tải lại dữ liệu người dùng
  const [refreshUserData, setRefreshUserData] = useState<boolean>(false);

  // State cho dữ liệu đơn hàng từ API
  const [apiOrders, setApiOrders] = useState<OrderAPI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
          id: userData.id,
        });
        console.log("Đã tải thông tin người dùng từ sessionStorage:", userData);

        // Gọi API để lấy dữ liệu đơn hàng
        fetchOrders(userData.id);
      } catch (error) {
        console.error(
          "Lỗi khi parse dữ liệu người dùng từ sessionStorage:",
          error
        );
      }
    } else {
      console.log("Không tìm thấy thông tin người dùng trong sessionStorage");
    }
  }, [refreshUserData]);

  // Hàm lấy dữ liệu đơn hàng từ API
  const fetchOrders = async (userId: number) => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn");
        setIsLoading(false);
        return;
      }

      const response = await axios.get<OrdersResponse>(
        `http://localhost:3501/api/orders-id/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setApiOrders(response.data.orders);
      console.log("Dữ liệu đơn hàng:", response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
      setError("Không thể lấy dữ liệu đơn hàng. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };


  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);

  useEffect(() => {
    fetchPromoCodes();
  }, []);

const fetchPromoCodes = async () => {
  try {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      console.error("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn");
      return;
    }

    const res = await axios.get("http://localhost:3501/api/couponcodes/codes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const codes = res.data;
    const now = new Date();

    const updated = codes
      .filter((promo: any) => promo.status !== 0)
      .map((promo: any) => {
        const isFlashSale = Number(promo.isFlashSale) === 1;

        const userCoupon = userUsedCoupons.find((c) => c.code === promo.code);
        const status = userCoupon ? userCoupon.status : promo.status; 

        const commonFields = {
          ...promo,
          status,
          isFlashSale,
          timeRemaining: null,
        };

        if (isFlashSale) {
          const end = new Date(promo.validUntil);
          const diff = Math.max(0, end.getTime() - now.getTime());

          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          return {
            ...commonFields,
            timeRemaining: { hours, minutes, seconds },
          };
        }

        return commonFields;
      });

    setPromoCodes(updated);
  } catch (error) {
    console.error("Error fetching promo codes:", error);
  }
};


  const [userUsedCoupons, setUserUsedCoupons] = useState<{ code: string; status: number }[]>([]);

  const fetchUserVoucherStatuses = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) return;

      const res = await axios.get("http://localhost:3501/api/couponcodes/user-has-coupon", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User used coupons:", res.data);
      setUserUsedCoupons(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy user_has_coupon:", error);
    }
  };

  useEffect(() => {
    fetchPromoCodes();
    fetchUserVoucherStatuses();
  }, []);

  const formatDateTime = (dateStr: string | Date) => {
    const date = new Date(dateStr);

    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour12: false,
    });
  };
  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  // Hàm lấy URL hình ảnh đầu tiên từ chuỗi URL
  const getFirstImageUrl = (imageUrls: string): string => {
    if (!imageUrls) return "";

    // Nếu chuỗi chứa dấu phẩy, lấy URL đầu tiên
    if (imageUrls.includes(',')) {
      return imageUrls.split(',')[0];
    }

    return imageUrls;
  };

  // Hàm tính tổng giá trị đơn hàng
  const calculateOrderTotal = (order: OrderAPI): number => {
    return order.items.reduce((total, item) => {
      return total + (parseFloat(item.product_price) * item.quantity);
    }, 0);
  };

  // Hàm tính tổng số lượng sản phẩm trong đơn hàng
  const calculateTotalQuantity = (order: OrderAPI): number => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Hàm chuyển đổi trạng thái đơn hàng thành class CSS
  const getStatusClass = (status: string): string => {
    switch (status) {
      case "Chờ xác nhận":
        return "pending";
      case "Đã xác nhận":
        return "confirmed";
      case "Đang giao hàng":
        return "shipping";
      case "Hoàn thành":
        return "completed";
      case "Đã hủy":
        return "cancelled";
      case "Trả hàng":
        return "returned";
      default:
        return "";
    }
  };

  // Handle user info form submission
  const handleUserInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Lấy token từ sessionStorage
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        alert("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn");
        return;
      }

      // Lấy thông tin người dùng từ sessionStorage để lấy ID
      const userDataStr = sessionStorage.getItem("user");
      if (!userDataStr) {
        alert("Không tìm thấy thông tin người dùng");
        return;
      }

      const userData = JSON.parse(userDataStr);
      const userId = userData.id;

      // Chuẩn bị dữ liệu để cập nhật
      const updatedUserInfo = {
        full_name: userInfo.name,
        phone: userInfo.phone,
        address:
          typeof userInfo.address === "string"
            ? userInfo.address
            : userInfo.address[0],
        // Giữ nguyên mật khẩu và role
        password: userData.password || "123123123", // Giá trị mặc định nếu không có
        role: userData.role || "user",
      };

      // Gọi API cập nhật thông tin người dùng
      const response = await axios.put(
        `http://localhost:3501/api/users/${userId}`,
        updatedUserInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Cập nhật thông tin người dùng trong sessionStorage
      const updatedUser = {
        ...userData,
        full_name: userInfo.name,
        phone: userInfo.phone,
        address:
          typeof userInfo.address === "string"
            ? userInfo.address
            : userInfo.address[0],
      };
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      // Cập nhật state để tải lại thông tin người dùng
      setRefreshUserData((prev) => !prev);

      alert("Thông tin cá nhân đã được cập nhật!");
      setShowEditModal(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      alert("Cập nhật thông tin thất bại. Vui lòng thử lại sau.");
    }
  };

  // Handle adding new address
  const handleAddAddress = () => {
    const newAddress = prompt("Nhập địa chỉ mới:");
    if (newAddress && newAddress.trim() !== "") {
      setUserInfo({
        ...userInfo,
        address: Array.isArray(userInfo.address)
          ? [...userInfo.address, newAddress]
          : [userInfo.address, newAddress],
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
      // Lấy token từ sessionStorage
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        alert("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn");
        return;
      }

      // Lấy thông tin người dùng từ sessionStorage
      const userDataStr = sessionStorage.getItem("user");
      if (!userDataStr) {
        alert("Không tìm thấy thông tin người dùng");
        return;
      }

      const userData = JSON.parse(userDataStr);
      const userId = userData.id;

      // Gọi API đổi mật khẩu
      const response = await axios.put(
        `http://localhost:3501/api/users/${userId}`,
        {
          password: passwordData.newPassword,
          // Giữ nguyên các thông tin khác
          full_name: userData.full_name || userData.name,
          phone: userData.phone,
          address: userData.address,
          role: userData.role || "user",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Cập nhật thông tin người dùng trong sessionStorage
      const updatedUser = {
        ...userData,
        password: passwordData.newPassword,
      };
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      // Thông báo thành công
      alert("Đổi mật khẩu thành công");

      // Cập nhật state để tải lại thông tin người dùng
      setRefreshUserData((prev) => !prev);

      // Đóng form
      setShowPasswordForm(false);

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error);
      alert("Đổi mật khẩu thất bại. Vui lòng thử lại sau.");
    }
  };

  // Get filtered orders based on active filter
  const getFilteredOrders = () => {
    if (apiOrders.length === 0) {
      return [];
    }

    if (activeOrderFilter === "all") {
      return apiOrders;
    }

    const statusMap: Record<string, string> = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      shipping: "Đang giao hàng",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
      returned: "Trả hàng",
    };

    return apiOrders.filter(
      (order) => order.order_status_name === statusMap[activeOrderFilter]
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
        return "status pending";
      case "confirmed":
        return "status confirmed";
      case "shipping":
        return "status shipping";
      case "completed":
        return "status completed";
      case "cancelled":
        return "status cancelled";
      case "returned":
        return "status returned";
      default:
        return "status";
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

  // Handle when a flash sale countdown completes
  const handleCountdownComplete = (index: number) => {
    setPromoCodes((prevCodes) => {
      const updatedCodes = [...prevCodes];
      updatedCodes[index] = {
        ...updatedCodes[index],
        isFlashSale: false, // End the flash sale when countdown completes
      };
      return updatedCodes;
    });
  };

  // Copy promo code to clipboard
  const copyToClipboard = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("Mã giảm giá đã được sao chép!");
      })
      .catch((err) => {
        console.error("Không thể sao chép: ", err);
        alert("Không thể sao chép mã giảm giá. Vui lòng thử lại.");
      });
  };

  // Apply promo code
  const applyPromoCode = (code: string) => {
    alert(`Mã giảm giá ${code} đã được áp dụng!`);
    // Implement actual promo code application logic here
  };

  // Filter promo codes based on active filter
  const getFilteredPromoCodes = () => {
    if (activePromoFilter === "all") {
      return promoCodes;
    } else if (activePromoFilter === "flash") {
      return promoCodes.filter((promo) => promo.isFlashSale);
    } else if (activePromoFilter === "regular") {
      return promoCodes.filter((promo) => !promo.isFlashSale);
    }
    return promoCodes;
  };

  // Handle user logout
  const handleLogout = () => {
    try {
      // Xóa token và thông tin người dùng khỏi sessionStorage
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("user");

      // Thông báo đăng xuất thành công
      alert("Đăng xuất thành công!");

      // Chuyển hướng đến trang đăng nhập
      window.location.href = "/dang-nhap";
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      alert("Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại.");
    }
  };

  // Update activeTab based on URL path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/tai-khoan" || path === "/tai-khoan/") {
      setActiveTab("orders");
    } else if (path === "/tai-khoan/thong-tin") {
      setActiveTab("info");
    } else if (path === "/tai-khoan/ma-giam-gia") {
      setActiveTab("promo");
    } else if (path === "/tai-khoan/don-hang") {
      setActiveTab("wishlist");
    }
  }, [location.pathname]);

  // Handle tab navigation
  const handleTabNavigation = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case "orders":
        navigate("/tai-khoan");
        break;
      case "info":
        navigate("/tai-khoan/thong-tin");
        break;
      case "promo":
        navigate("/tai-khoan/ma-giam-gia");
        break;
      case "wishlist":
        navigate("/tai-khoan/don-hang");
        break;
      default:
        navigate("/tai-khoan");
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
                  <button onClick={() => handleTabNavigation("orders")}>
                    <i className="icon-box">
                      <img src="/images/icons/Puzzle.svg" alt="icon-box" />
                    </i>
                    <span>Tổng quan</span>
                  </button>
                </li>
                <li className={activeTab === "info" ? "active" : ""}>
                  <button onClick={() => handleTabNavigation("info")}>
                    <i className="icon-user">
                      <img src="/images/icons/User_02.svg" alt="icon-box" />
                    </i>
                    <span>Thông tin cá nhân</span>
                  </button>
                </li>
                <li className={activeTab === "promo" ? "active" : ""}>
                  <button onClick={() => handleTabNavigation("promo")}>
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
                  <button onClick={() => handleTabNavigation("wishlist")}>
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
                  <button onClick={handleLogout}>
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

                  {isLoading ? (
                    <div className="loading-state">
                      <p>Đang tải dữ liệu đơn hàng...</p>
                    </div>
                  ) : error ? (
                    <div className="error-state">
                      <p>{error}</p>
                    </div>
                  ) : apiOrders.length > 0 ? (
                    <div className="order-list-container">
                      {getFilteredOrders().flatMap((order, orderIndex) =>
                        order.items.map((item, itemIndex) => (
                          <div className="order-item" key={`${orderIndex}-${itemIndex}`}>
                            <div className="order-header">
                              <div className="order-number">
                                <span>Đơn hàng: {order.order_id}</span>
                                <span>Ngày đặt: {new Date(order.created_at).toLocaleDateString('vi-VN')}</span>
                              </div>
                              <div className="order-status">
                                <span className={`status ${getStatusClass(order.order_status_name)}`}>
                                  {order.order_status_name}
                                </span>
                              </div>
                            </div>

                            <div className="order-content">
                              <div className="product-image">
                                <img
                                  src={getFirstImageUrl(item.product_image)}
                                  alt={item.product_name}
                                />
                              </div>

                              <div className="product-details">
                                <h4>{item.product_name}</h4>
                                <div className="product-price">
                                  <span>
                                    Thành tiền: {formatPrice(parseFloat(item.product_price) * item.quantity)}
                                  </span>
                                </div>
                                <div className="product-meta">
                                  <div className="meta-item">
                                    <span>Số lượng: {item.quantity}</span>
                                  </div>
                                </div>
                                <div className="product-link">
                                  <Link to={`/san-pham/${item.product_id}`}>
                                    Xem chi tiết
                                  </Link>
                                </div>
                              </div>

                              <div className="order-info">
                                <h4>Thông tin:</h4>
                                <div className="info-item">
                                  <span className="label">Mã đơn hàng:</span>
                                  <span className="value">
                                    #{order.order_id}
                                  </span>
                                </div>
                                <div className="info-item">
                                  <span className="label">Ngày đặt:</span>
                                  <span className="value">
                                    {new Date(order.created_at).toLocaleDateString('vi-VN')}
                                  </span>
                                </div>
                                <div className="info-item">
                                  <span className="label">Trạng thái:</span>
                                  <span className="value">
                                    {order.order_status_name}
                                  </span>
                                </div>

                                <div className="order-actions">
                                  {order.order_status_name === "Chờ xác nhận" && (
                                    <>
                                      <button className="btn-cancel-order">
                                        Hủy đơn hàng
                                      </button>
                                      <button className="btn-view-details">
                                        Xem chi tiết
                                      </button>
                                    </>
                                  )}

                                  {order.order_status_name === "Đã xác nhận" && (
                                    <>
                                      <button className="btn-view-details">
                                        Xem chi tiết
                                      </button>
                                    </>
                                  )}

                                  {order.order_status_name === "Đang giao hàng" && (
                                    <>
                                      <button className="btn-view-details">
                                        Xem chi tiết
                                      </button>
                                    </>
                                  )}

                                  {order.order_status_name === "Hoàn thành" && (
                                    <>
                                      <button className="btn-action-primary">
                                        Mua lại
                                      </button>
                                      <button className="btn-view-details">
                                        Xem chi tiết
                                      </button>
                                    </>
                                  )}

                                  {order.order_status_name === "Đã hủy" && (
                                    <>
                                      <button className="btn-action-primary">
                                        Mua lại
                                      </button>
                                      <button className="btn-view-details">
                                        Xem chi tiết
                                      </button>
                                    </>
                                  )}

                                  {order.order_status_name === "Trả hàng" && (
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
                        ))
                      )}
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
                            {typeof userInfo.address === "string"
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
                              placeholder="Mật khẩu cũ"
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
                              placeholder="Mật khẩu mới"
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
                              placeholder="Nhập lại mật khẩu mới"
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
                              value={
                                typeof userInfo.address === "string"
                                  ? userInfo.address
                                  : userInfo.address &&
                                    userInfo.address.length > 0
                                    ? userInfo.address[0]
                                    : ""
                              }
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
                                  const newAddresses = [
                                    ...(userInfo.address as string[]),
                                  ];
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

                  {/* Add tab filter for promo codes */}
                  <div className="order-filter-tabs">
                    <button
                      className={activePromoFilter === "all" ? "active" : ""}
                      onClick={() => setActivePromoFilter("all")}
                    >
                      Tất cả
                    </button>
                    <button
                      className={activePromoFilter === "flash" ? "active" : ""}
                      onClick={() => setActivePromoFilter("flash")}
                    >
                      Flash Sale
                    </button>
                    <button
                      className={
                        activePromoFilter === "regular" ? "active" : ""
                      }
                      onClick={() => setActivePromoFilter("regular")}
                    >
                      Thường xuyên
                    </button>
                  </div>

                  <div className="voucher-grid">
                    {getFilteredPromoCodes()
                      .filter((promo) => promo)
                      .map((promo, index) => (
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

                          {promo.isFlashSale && promo.timeRemaining && (
                            <div className="flash-sale-banner">
                              <div className="flash-icon">⚡</div>
                              <div className="flash-text">Flash sale</div>
                              <CountdownTimer
                                hours={promo.timeRemaining.hours}
                                minutes={promo.timeRemaining.minutes}
                                seconds={promo.timeRemaining.seconds}
                                onComplete={() => handleCountdownComplete(index)}
                              />
                            </div>
                          )}


                          <div className="voucher-details">
                            <ul className="voucher-info-list">
                              <li>
                                <span>
                                  {formatDateTime(promo.validFrom)} - {formatDateTime(promo.validUntil)}
                                </span>
                              </li>
                              <li>
                                <span>{promo.description}</span>
                              </li>
                              <li>
                                <span>Ưu đãi: Cho tất cả khách hàng </span>
                              </li>
                            </ul>
                          </div>

                          <div className="voucher-actions">
                            <button
                              className="btn-copy"
                              onClick={() => copyToClipboard(promo.code)}
                            >
                              <img src="/images/icons/content_copy.svg" alt="" />
                              <span>Copy</span>
                            </button>
                            <button className="btn-apply">
                              {Number(promo.userUsedStatus) === 0 ? (
                                <span className="voucher-status not-used">Chưa sử dụng</span>
                              ) : (
                                <span className="voucher-status used">Đã sử dụng</span>
                              )}
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
                  <h2>Đơn hàng của bạn</h2>

                  <div className="order-filter-tabs">
                    <button
                      className={activeOrderFilter === "all" ? "active" : ""}
                      onClick={() => setActiveOrderFilter("all")}
                    >
                      Tất cả
                    </button>
                    <button
                      className={activeOrderFilter === "confirmed" ? "active" : ""}
                      onClick={() => setActiveOrderFilter("confirmed")}
                    >
                      Đã xác nhận
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

                  {isLoading ? (
                    <div className="loading-state">
                      <p>Đang tải dữ liệu đơn hàng...</p>
                    </div>
                  ) : error ? (
                    <div className="error-state">
                      <p>{error}</p>
                    </div>
                  ) : getFilteredOrders().length > 0 ? (
                    <div className="order-list-container">
                      {getFilteredOrders().flatMap((order, orderIndex) =>
                        order.items.map((item, itemIndex) => (
                          <div className="order-item" key={`${orderIndex}-${itemIndex}`}>
                            <div className="order-header">
                              <div className="order-number">
                                <span>Đơn hàng: {order.order_id}</span>
                                <span>Ngày đặt: {new Date(order.created_at).toLocaleDateString('vi-VN')}</span>
                              </div>
                              <div className="order-status">
                                <span className={`status ${getStatusClass(order.order_status_name)}`}>
                                  {order.order_status_name}
                                </span>
                              </div>
                            </div>

                            <div className="order-content">
                              <div className="product-image">
                                <img
                                  src={getFirstImageUrl(item.product_image)}
                                  alt={item.product_name}
                                />
                              </div>

                              <div className="product-details">
                                <h4>{item.product_name}</h4>
                                <div className="product-price">
                                  <span>
                                    Thành tiền: {formatPrice(parseFloat(item.product_price) * item.quantity)}
                                  </span>
                                </div>
                                <div className="product-meta">
                                  <div className="meta-item">
                                    <span>Số lượng: {item.quantity}</span>
                                  </div>
                                </div>
                                <div className="product-link">
                                  <Link to={`/san-pham/${item.product_id}`}>
                                    Xem chi tiết
                                  </Link>
                                </div>
                              </div>

                              <div className="order-info">
                                <h4>Thông tin:</h4>
                                <div className="info-item">
                                  <span className="label">Mã đơn hàng:</span>
                                  <span className="value">
                                    #{order.order_id}
                                  </span>
                                </div>
                                <div className="info-item">
                                  <span className="label">Ngày đặt:</span>
                                  <span className="value">
                                    {new Date(order.created_at).toLocaleDateString('vi-VN')}
                                  </span>
                                </div>
                                <div className="info-item">
                                  <span className="label">Trạng thái:</span>
                                  <span className="value">
                                    {order.order_status_name}
                                  </span>
                                </div>

                                <div className="order-actions">
                                  {order.order_status_name === "Chờ xác nhận" && (
                                    <>
                                      <button className="btn-cancel-order">
                                        Hủy đơn hàng
                                      </button>
                                      <button className="btn-view-details">
                                        Xem chi tiết
                                      </button>
                                    </>
                                  )}

                                  {order.order_status_name === "Đã xác nhận" && (
                                    <>
                                      <button className="btn-view-details">
                                        Xem chi tiết
                                      </button>
                                    </>
                                  )}

                                  {order.order_status_name === "Đang giao hàng" && (
                                    <>
                                      <button className="btn-view-details">
                                        Xem chi tiết
                                      </button>
                                    </>
                                  )}

                                  {order.order_status_name === "Hoàn thành" && (
                                    <>
                                      <button className="btn-action-primary">
                                        Mua lại
                                      </button>
                                      <button className="btn-view-details">
                                        Xem chi tiết
                                      </button>
                                    </>
                                  )}

                                  {order.order_status_name === "Đã hủy" && (
                                    <>
                                      <button className="btn-action-primary">
                                        Mua lại
                                      </button>
                                      <button className="btn-view-details">
                                        Xem chi tiết
                                      </button>
                                    </>
                                  )}

                                  {order.order_status_name === "Trả hàng" && (
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
                        ))
                      )}
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
