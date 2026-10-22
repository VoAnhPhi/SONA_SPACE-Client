import React, { useState, useEffect } from "react";
import { cancelOrder } from "@/domains/account/user.service";
import { getOrderItems } from "@/domains/orders/orders.api";
import type { UserInfo } from "@/domains/account/types";
import type { PromoCodeWithTimer as PromoCode } from "@/domains/cart/types";
import { toast } from "react-toastify";
import { getAuthToken, getAuthUser, updateAuthUser } from "@/shared/auth/token-storage";
import { http } from "@/shared/api/http";
import type { Coupon, OrderData, OrdersAPIResponse } from "./account.types";

export function useAccountPage() {

  // State for active order filter
  const [activeOrderFilter, setActiveOrderFilter] = useState<string>("all");
  const [activePromoFilter, setActivePromoFilter] = useState<string>("all");

  // State cho dữ liệu đơn hàng từ API
  const [apiOrders, setApiOrders] = useState<OrderData[]>([]);
  const [ordersResponse, setOrdersResponse] = useState<OrdersAPIResponse | null>(null);
  const [detailedOrderItems, setDetailedOrderItems] = useState<Map<number, any[]>>(new Map()); // Map of orderId -> detailed items
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filled from the API; starts empty so no placeholder identity is ever shown or saved
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    phone: "",
    address: [],
  });

  // State để theo dõi khi nào cần tải lại dữ liệu người dùng
  const [refreshUserData, setRefreshUserData] = useState<boolean>(false);

  // State cho modal hủy đơn hàng
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [selectedOrderHash, setSelectedOrderHash] = useState<string>('');
  const [isCancelling, setIsCancelling] = useState(false);

  // Lấy thông tin người dùng từ sessionStorage khi component mount
  useEffect(() => {
    try {
      const userData = getAuthUser();
      if (userData) {
        // Cập nhật thông tin người dùng từ sessionStorage
        setUserInfo({
          name: userData.name || userData.full_name || "Chưa cập nhật",
          email: userData.email || "Chưa cập nhật",
          phone: userData.phone || "Chưa cập nhật",
          address: userData.address || "Chưa cập nhật địa chỉ",
          full_name: userData.full_name,
          id: userData.id,
        });

        // Gọi API để lấy dữ liệu đơn hàng
        fetchOrders(userData.id);
      } else {
        // No persisted auth user is available.
        setError("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn");
        setIsLoading(false);
      }
    } catch (error) {
        console.error(
          "Lỗi khi parse dữ liệu người dùng từ sessionStorage:",
          error
        );
      }
      // console.log("Không tìm thấy thông tin người dùng trong sessionStorage");
  }, [refreshUserData]);

  // Hàm lấy dữ liệu đơn hàng từ API
  // Fetch detailed order items to get individual product status
  const fetchDetailedOrderItems = async (orderId: number) => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await getOrderItems(orderId);

      if (response.success && response.data.items) {
        setDetailedOrderItems(prev => {
          const newMap = new Map(prev.set(orderId, response.data.items));
          return newMap;
        });
      }
    } catch (error) {
      console.error(`Error fetching detailed items for order ${orderId}:`, error);
    }
  };

  // Force refresh specific order data (useful when products are cancelled)
  const refreshOrderData = async (orderId: number) => {
    console.log(`[DEBUG] Force refreshing order data for ${orderId}`);
    await fetchDetailedOrderItems(orderId);

    // Also refresh main orders data
    const userData = getAuthUser();
    if (userData?.id) {
      await fetchOrders(userData.id);
    }
  };

  const fetchOrders = async (userId: number) => {
    if (!userId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Lấy token từ sessionStorage
      const token = getAuthToken();
      if (!token) {
        setError("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn");
        setIsLoading(false);
        return;
      }

      // Gọi API thực tế với cache busting
      const cacheBuster = new Date().getTime();
      const response = await http.get<OrdersAPIResponse>(
        `/orders-id/${userId}?_t=${cacheBuster}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
        }
      );

      // Kiểm tra và cập nhật dữ liệu
      if (response.data && response.data.orders) {
        setOrdersResponse(response.data);
        setApiOrders(response.data.orders);

        // Fetch detailed items for each order to get individual product status
        response.data.orders.forEach(order => {
          fetchDetailedOrderItems(order.id);
        });
      } else {
        setError("Dữ liệu đơn hàng không đúng định dạng");
      }
    } catch (error) {
      setError("Không thể tải dữ liệu đơn hàng. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);


  const fetchPromoCodes = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const res = await http.get("/couponcodes/user-has-coupon");
      // console.log("fetchPromoCodes: Dữ liệu mã giảm giá từ API:", res.data);
      const now = new Date();

      const updated = res.data
        .filter((coupon: Coupon) => coupon.couponStatus !== 0) // Chỉ lấy coupon hợp lệ
        .map((promo: any) => {
          const isFlashSale = Number(promo.isFlashSale) === 1;
          const commonFields = {
            ...promo,
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

      // ✅ Gọi 1 lần duy nhất
      setPromoCodes(updated);

    } catch (error) {
      console.error("Lỗi khi lấy mã giảm giá:", error);
    }
  };

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const [userUsedCoupons, setUserUsedCoupons] = useState<{ code: string; status: number }[]>([]);
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
  // Get detailed product info including status
  const getProductDetails = (orderId: number, productId: number) => {
    const orderItems = detailedOrderItems.get(orderId);

    if (!orderItems) {
      return null;
    }

    // Try exact product ID match first
    let foundItem = orderItems.find(item => item.product && item.product.id === productId);

    // Try string comparison
    if (!foundItem) {
      foundItem = orderItems.find(item => item.product && String(item.product.id) === String(productId));
    }

    // Try item_id match  
    if (!foundItem) {
      foundItem = orderItems.find(item => item.item_id === productId);
    }

    return foundItem;
  };

  // Check if a product is cancelled
  const isProductCancelled = (orderId: number, productId: number) => {
    const productDetails = getProductDetails(orderId, productId);
    return productDetails?.status === 'CANCELLED';
  };

  // Check if order has mixed product statuses (some cancelled, some active)
  const hasPartiallyProcessedOrder = (order: OrderData) => {
    if (!order.products || order.products.length <= 1) return false;

    const productStatuses = order.products.map(product => {
      const productDetails = getProductDetails(order.id, product.id);
      let isCancelled = productDetails?.status === 'CANCELLED';

      // Fallback checks
      if (!isCancelled && product.status) {
        isCancelled = product.status === 'CANCELLED';
      }
      if (!isCancelled && (product.price === "0" || parseFloat(product.price) === 0)) {
        isCancelled = true;
      }

      return isCancelled;
    });

    // Check if we have both cancelled and non-cancelled products
    const hasCancelled = productStatuses.some(status => status === true);
    const hasActive = productStatuses.some(status => status === false);

    return hasCancelled && hasActive;
  };

  // Get display status - prioritize server status, then check local product status
  const getDisplayStatus = (order: OrderData) => {
    // If server already says CANCELLED, trust that
    if (order.status === "CANCELLED") {
      return "CANCELLED";
    }

    // If server says RETURNED, trust that  
    if (order.status === "RETURNED" || order.status === "RETURN") {
      return order.status;
    }

    // For other statuses, check if we have mixed products
    if (hasPartiallyProcessedOrder(order)) {
      return "PROCESSING"; // Mixed status -> show as processing
    }

    // Check if all products are cancelled locally (fallback)
    if (areAllProductsCancelled(order)) {
      return "CANCELLED";
    }

    return order.status;
  };

  // Check if all products in order are cancelled
  const areAllProductsCancelled = (order: OrderData) => {
    if (!order.products || order.products.length === 0) return false;

    return order.products.every(product => {
      const productDetails = getProductDetails(order.id, product.id);
      let isCancelled = productDetails?.status === 'CANCELLED';

      // Super aggressive fallback: if order is CANCELLED, assume all products are cancelled
      if (!isCancelled && order.status === 'CANCELLED') {
        isCancelled = true;
      }

      // Apply same fallback logic as in UI
      if (!isCancelled && product.status) {
        isCancelled = product.status === 'CANCELLED';
      }
      if (!isCancelled && (product.price === "0" || parseFloat(product.price) === 0)) {
        isCancelled = true;
      }
      if (!isCancelled && product.can_cancel === false && parseFloat(product.price) === 0) {
        isCancelled = true;
      }

      return isCancelled;
    });
  };

  // Get refund amount for cancelled product
  const getRefundAmount = (orderId: number, productId: number) => {
    const productDetails = getProductDetails(orderId, productId);
    if (productDetails?.status === 'CANCELLED') {
      return 0; // Cancelled products show 0 price
    }
    return null;
  };

  const formatPrice = (price: number | string | null | undefined): string => {
    if (price === undefined || price === null) {
      return "0đ";
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  // Hàm lấy URL hình ảnh đầu tiên từ chuỗi URL
  const getFirstImageUrl = (imageUrls: string): string => {
    if (!imageUrls) return "/images/products/default.png";

    // Nếu chuỗi chứa dấu phẩy, lấy URL đầu tiên
    if (imageUrls.includes(',')) {
      return imageUrls.split(',')[0].trim();
    }

    return imageUrls;
  };

  // Hàm tính tổng giá trị đơn hàng
  const calculateOrderTotal = (order: OrderData): number => {
    return parseFloat(order.total);
  };

  // Hàm tính tổng số lượng sản phẩm trong đơn hàng
  const calculateTotalQuantity = (order: OrderData): number => {
    return order.products.reduce((total, product) => total + product.quantity, 0);
  };

  // Hàm chuyển đổi trạng thái đơn hàng thành class CSS
  const getStatusClass = (status: string): string => {
    const statusLower = status.toLowerCase();
    // console.log(`getStatusClass - original: "${status}", lowercase: "${statusLower}"`);

    let result = "";
    switch (statusLower) {
      case "pending":
        result = "pending";
        break;
      case "confirmed":
      case "processing":
        result = "confirmed";
        break;
      case "shipping":
      case "shipped":
        result = "shipping";
        break;
      case "completed":
      case "delivered":
      case "success":
        result = "completed";
        break;
      case "failed":
        result = "failed";
        break;

      case "cancelled":
        result = "cancelled";
        break;
      case "return":
      case "returned":
        result = "returned";
        break;
      default:
        result = "";
        break;
    }

    // console.log(`getStatusClass result: "${result}" for status: "${status}"`);
    return result;
  };

  // Hàm chuyển đổi trạng thái từ API sang tên hiển thị
  const getStatusDisplayName = (status: string): string => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "pending":
        return "Chờ xác nhận";
      case "processing":
      case "confirmed":
        return "Đang xử lý";
      case "shipping":
      case "shipped":
        return "Đang giao hàng";
      case "completed":
      case "delivered":
      case "success":  // Thêm trạng thái SUCCESS
        return "Hoàn thành";
      case "failed":
        return "Thất bại";
      case "cancelled":
        return "Đã hủy";
      case "return":
      case "returned":
        return "Trả hàng";
      default:
        return status;
    }
  };

  // Handle user info form submission
  const handleUserInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Lấy token từ sessionStorage
      const token = getAuthToken();
      if (!token) {
        toast.success("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn");
        return;
      }

      // Lấy thông tin người dùng từ sessionStorage để lấy ID
      const userData = getAuthUser();
      if (!userData) {
        toast.warn("Không tìm thấy thông tin người dùng");
        return;
      }

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
        password: userData.password || "Thành phố Hồ Chí Minh",
        role: userData.role || "user",
      };

      // Gọi API cập nhật thông tin người dùng
      await http.put(
        `/users/${userId}`,
        updatedUserInfo,
        {
          headers: { "Content-Type": "application/json" },
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
      updateAuthUser(updatedUser);

      // Cập nhật state để tải lại thông tin người dùng
      setRefreshUserData((prev) => !prev);

      toast.success("Thông tin cá nhân đã được cập nhật!");
      setShowEditModal(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      toast.error("Cập nhật thông tin thất bại. Vui lòng thử lại sau.");
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

  // Open API v2
  const OPEN_API = "https://provinces.open-api.vn/api/v2/";

  type Province = { code: number; name: string };
  type Ward = { code: number; name: string; division_type?: string; codename?: string; province_code?: number };

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  // value của <select> dùng string cho chắc
  const [provinceCode, setProvinceCode] = useState<string>('');
  const [wardCode, setWardCode] = useState<string>('');

  // ô số nhà, tên đường (chúng ta sẽ ghép với ward + province)
  const [street, setStreet] = useState<string>('');
  const [pendingWardName, setPendingWardName] = useState<string>("");
  const vnNormalize = (s?: string) =>
    (s || "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "D")
      .toLowerCase().trim();

  useEffect(() => {
    if (!showEditModal) return;

    let abort = false;
    (async () => {
      try {
        const r = await fetch(`${OPEN_API}p`);
        const arr = await r.json();
        if (abort) return;

        const list: Province[] = Array.isArray(arr)
          ? arr.map((p: any) => ({ code: p.code, name: p.name }))
          : [];
        setProvinces(list);

        const addrStr = typeof userInfo.address === "string"
          ? userInfo.address
          : (Array.isArray(userInfo.address) && userInfo.address[0]) ? userInfo.address[0] : "";

        if (addrStr) {
          const parts = addrStr.split(",").map(s => s.trim());
          const pNameGuess = parts[parts.length - 1] || "";
          const wNameGuess = parts.length >= 2 ? parts[parts.length - 2] : "";
          const streetGuess = parts.slice(0, -2).join(", ");

          const pFound = list.find(p => vnNormalize(p.name) === vnNormalize(pNameGuess));
          setStreet(streetGuess);

          if (pFound) {
            setProvinceCode(String(pFound.code));   // sẽ kích hoạt useEffect #2
            setPendingWardName(wNameGuess);         // để lát nữa map vào wards
          } else {
            setProvinceCode("");
            setWardCode("");
            setWards([]);
          }
        } else {
          setStreet("");
          setProvinceCode("");
          setWardCode("");
          setWards([]);
        }
      } catch {
        setProvinces([]);
      }
    })();

    return () => { abort = true; };
  }, [showEditModal]);


  useEffect(() => {
    if (!provinceCode) { setWards([]); setWardCode(''); return; }

    const ac = new AbortController();
    (async () => {
      try {
        const r = await fetch(`${OPEN_API}p/${provinceCode}?depth=2`, { signal: ac.signal });
        const data = await r.json();

        let list: Ward[] = Array.isArray(data?.wards) ? data.wards : [];
        if ((!list || list.length === 0) && Array.isArray(data?.districts)) {
          const wardBatches = await Promise.all(
            data.districts.map((d: any) =>
              fetch(`${OPEN_API}d/${d.code}`, { signal: ac.signal })
                .then(x => x.json())
                .catch(() => null)
            )
          );
          list = wardBatches.flatMap((d: any) =>
            Array.isArray(d?.wards) ? d.wards : []
          );
        }

        list = list.filter(w => {
          const t = (w.division_type || '').toLowerCase();
          return t === 'phường' || t === 'xã' || t === 'thị trấn';
        });

        setWards(list);
        // nếu user tự đổi tỉnh bằng tay, hãy xóa phường cũ:
        setWardCode(prev => pendingWardName ? prev : '');
      } catch {
        setWards([]); setWardCode('');
      }
    })();

    return () => ac.abort();
  }, [provinceCode]);

  useEffect(() => {
    if (!pendingWardName || wards.length === 0) return;
    const wFound = wards.find(w => vnNormalize(w.name) === vnNormalize(pendingWardName));
    if (wFound) setWardCode(String(wFound.code));
    setPendingWardName(""); // chỉ prefill 1 lần
  }, [wards, pendingWardName]);

  useEffect(() => {
    const pName = provinces.find(p => String(p.code) === provinceCode)?.name;
    const wName = wards.find(w => String(w.code) === wardCode)?.name;
    const combined = [street, wName, pName].filter(Boolean).join(', ');
    setUserInfo(prev => ({ ...prev, address: combined || prev.address }));
  }, [street, provinceCode, wardCode, provinces, wards]);

  // Hàm xử lý đổi mật khẩu
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.warn("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      // Lấy token từ sessionStorage
      const token = getAuthToken();
      if (!token) {
        toast.error("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn");
        return;
      }

      // Lấy thông tin người dùng từ sessionStorage
      const userData = getAuthUser();
      if (!userData) {
        toast.error("Không tìm thấy thông tin người dùng");
        return;
      }

      const userId = userData.id;

      // Gọi API đổi mật khẩu
      await http.put(
        `/users/${userId}`,
        {
          password: passwordData.newPassword,
          // Giữ nguyên các thông tin khác
          full_name: userData.full_name || userData.name,
          phone: userData.phone,
          address: userData.address,
          role: userData.role || "user",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Cập nhật thông tin người dùng trong sessionStorage
      const updatedUser = {
        ...userData,
        password: passwordData.newPassword,
      };
      updateAuthUser(updatedUser);

      // Thông báo thành công
      toast.success("Đổi mật khẩu thành công");

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
      toast.error("Đổi mật khẩu thất bại. Vui lòng thử lại sau.");
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
      pending: "PENDING",
      confirmed: "CONFIRMED",
      shipping: "SHIPPING",
      completed: "SUCCESS",
      cancelled: "CANCELLED",
      returned: "RETURNED",
    };

    return apiOrders.filter(
      (order) => {
        const orderStatus = order.status.toUpperCase();
        const targetStatus = statusMap[activeOrderFilter];

        // Đặc biệt xử lý cho returned - bao gồm cả RETURN và RETURNED
        if (activeOrderFilter === "returned") {
          return orderStatus === "RETURNED" || orderStatus === "RETURN";
        }

        return orderStatus === targetStatus;
      }
    );
  };

  // Xử lý hủy đơn hàng - mở modal
  const handleCancelOrderClick = (orderId: number, orderHash: string) => {
    setSelectedOrderId(orderId);
    setSelectedOrderHash(orderHash);
    setShowCancelModal(true);
  };

  // Xử lý submit form hủy đơn hàng từ modal
  const handleCancelOrderSubmit = async (reason: string) => {
    if (!selectedOrderId) return;

    try {
      setIsCancelling(true);
      await cancelOrder(selectedOrderId, reason);
      // console.log("Hủy đơn hàng thành công:", result);

      // Cập nhật lại danh sách đơn hàng
      const userData = getAuthUser();
      if (userData?.id) {
        await fetchOrders(userData.id);
      }

      toast.success("Đơn hàng đã được hủy thành công!");

      // Đóng modal và reset state
      setShowCancelModal(false);
      setSelectedOrderId(null);
      setSelectedOrderHash('');
    } catch (error: any) {
      console.error("Lỗi khi hủy đơn hàng:", error);

      // Hiển thị thông báo lỗi cụ thể từ API nếu có
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Lỗi: ${error.response.data.message}`);
      } else {
        toast.error("Không thể hủy đơn hàng. Vui lòng thử lại sau.");
      }
    } finally {
      setIsCancelling(false);
    }
  };

  // Xử lý đóng modal hủy đơn hàng
  const handleCancelModalClose = () => {
    setShowCancelModal(false);
    setSelectedOrderId(null);
    setSelectedOrderHash('');
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
        toast.success("Mã giảm giá đã được sao chép!");
      })
      .catch((err) => {
        console.error("Không thể sao chép: ", err);
        toast.error("Không thể sao chép mã giảm giá. Vui lòng thử lại.");
      });
  };

  // Apply promo code
  const applyPromoCode = (code: string) => {
    toast.success(`Mã giảm giá ${code} đã được áp dụng!`);
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
      toast.success("Đăng xuất thành công!");

      // Chuyển hướng đến trang đăng nhập
      window.location.href = "/dang-nhap";
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      toast.error("Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại.");
    }
  };

  const retryFetchOrders = () => {
    const userData = getAuthUser();
    if (userData?.id) {
      fetchOrders(userData.id);
    }
  };

  return {
    activeOrderFilter,
    setActiveOrderFilter,
    activePromoFilter,
    setActivePromoFilter,
    apiOrders,
    setApiOrders,
    ordersResponse,
    setOrdersResponse,
    detailedOrderItems,
    setDetailedOrderItems,
    isLoading,
    setIsLoading,
    error,
    setError,
    userInfo,
    setUserInfo,
    refreshUserData,
    setRefreshUserData,
    showCancelModal,
    setShowCancelModal,
    selectedOrderId,
    setSelectedOrderId,
    selectedOrderHash,
    setSelectedOrderHash,
    isCancelling,
    setIsCancelling,
    fetchDetailedOrderItems,
    refreshOrderData,
    fetchOrders,
    promoCodes,
    setPromoCodes,
    fetchPromoCodes,
    userUsedCoupons,
    setUserUsedCoupons,
    formatDateTime,
    getProductDetails,
    isProductCancelled,
    hasPartiallyProcessedOrder,
    getDisplayStatus,
    areAllProductsCancelled,
    getRefundAmount,
    formatPrice,
    getFirstImageUrl,
    calculateOrderTotal,
    calculateTotalQuantity,
    getStatusClass,
    getStatusDisplayName,
    handleUserInfoSubmit,
    handleAddAddress,
    showPasswordModal,
    setShowPasswordModal,
    showEditModal,
    setShowEditModal,
    showPasswordForm,
    setShowPasswordForm,
    passwordData,
    setPasswordData,
    OPEN_API,
    provinces,
    setProvinces,
    wards,
    setWards,
    provinceCode,
    setProvinceCode,
    wardCode,
    setWardCode,
    street,
    setStreet,
    pendingWardName,
    setPendingWardName,
    vnNormalize,
    handlePasswordChange,
    getFilteredOrders,
    handleCancelOrderClick,
    handleCancelOrderSubmit,
    handleCancelModalClose,
    handleCountdownComplete,
    copyToClipboard,
    applyPromoCode,
    getFilteredPromoCodes,
    handleLogout,
    retryFetchOrders,
  };
}

export type AccountContext = ReturnType<typeof useAccountPage>;
