import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { returnOrder } from "../../services/ordersService";
import { cancelOrder } from "../../services/userServices";

interface OrderProduct {
  order_item_id: string;
  product_id: string;
  name: string;
  image: string;
  price: number;
  color: { name: string; hex: string };
  size: string;
  quantity: number;
  slug: string;
  has_comment?: boolean;
  commented?: boolean;
}

interface OrderDetails {
  id?: number;
  order_hash: string;
  date: string;
  status: string;
  statusStep: number;
  processType?: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  subtotal: number;
  shippingFee: number;
  couponValue: number;
  total: number;
  products: OrderProduct[];
}

const DetailOrder: React.FC = () => {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const { id } = useParams<{ id: string }>();
  const starFilledImg = "/images/404/star-filled.svg";
  const starOutlineImg = "/images/404/star-outline.svg";
  const ratingLabels = ["", "Rất tệ", "Tệ", "Trung bình", "Tốt", "Rất tốt"];
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentReviewProduct, setCurrentReviewProduct] =
    useState<OrderProduct | null>(null);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");
  const [allProductsReviewed, setAllProductsReviewed] = useState(false);
  const [isProcessingReturn, setIsProcessingReturn] = useState(false);
  const [isProcessingCancel, setIsProcessingCancel] = useState(false);

  const fetchOrder = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const res = await axios.get(
        `http://localhost:3501/api/orders/hash/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        const mappedProducts: OrderProduct[] = res.data.order.products.map(
          (p: any) => ({
            order_item_id: p.id,
            product_id: p.id,
            name: p.product_name,
            image: p.image || p.product_image || "/images/default.jpg",
            price: p.price_sale ?? p.price,
            quantity: p.quantity,
            slug: p.product_slug,
            color: {
              name: p.color_name,
              hex: p.color_hex,
            },
            has_comment: p.has_comment,
          })
        );
        
        // Map order data and ensure processType and statusStep are properly set
        const orderData = {
          ...res.data.order,
          products: mappedProducts,
          processType: res.data.order.processType || undefined,
          statusStep: res.data.order.statusStep || 1
        };
        
        setOrder(orderData);
        
        const allCommented = mappedProducts.every(
          (product) => product.has_comment
        );
        setAllProductsReviewed(allCommented);
        
        console.log("fetchOrder - Full API Response:", res.data);
        console.log("fetchOrder - Mapped Order Data:", orderData);
      }
    } catch (err) {
      console.error("Lỗi khi tải đơn hàng:", err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (order && order.products) {
      const allCommented = order.products.every(
        (product) => product.has_comment
      );
      setAllProductsReviewed(allCommented);
    }
  }, [order]);

  const formatDate = (dateString: string): string | undefined => {
    const date = new Date(dateString);
    const DD = ("0" + date.getDate()).slice(-2);
    const MM = ("0" + (date.getMonth() + 1)).slice(-2);
    const YYYY = date.getFullYear();
    const HH = ("0" + date.getHours()).slice(-2);
    const mm = ("0" + date.getMinutes()).slice(-2);
    const ss = ("0" + date.getSeconds()).slice(-2);
    return `${DD}/${MM}/${YYYY} ${HH}:${mm}:${ss}`;
  };

  const formatPrice = (price: number): string => {
    const rounded = Math.round(price);
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  const translateOrderStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Chờ xác nhận";
      case "CONFIRMED":
        return "Đã xác nhận";
      case "SHIPPING":
        return "Đang giao hàng";
      case "SUCCESS":
        return "Giao hàng thành công";
      case "FAILED":
        return "Thất bại";
      case "CANCELLED":
        return "Đã hủy";
      case "RETURN":
        return "Đã trả hàng";
      default:
        return "Không xác định";
    }
  };

  // Xác định loại quy trình dựa trên trạng thái đơn hàng
  const getProcessType = (status: string, processType?: string): 'normal' | 'cancellation' | 'failed' | 'return' => {
    // Nếu có processType từ backend, ưu tiên sử dụng
    if (processType) {
      if (processType.toLowerCase() === 'return') return 'return';
      if (processType.toLowerCase() === 'cancellation') return 'cancellation';
      if (processType.toLowerCase() === 'failed') return 'failed';
      if (processType.toLowerCase() === 'normal') return 'normal';
    }
    
    const statusUpper = status.toUpperCase();
    const statusLower = status.toLowerCase();
    
    // Kiểm tra các trạng thái return
    if (statusUpper === 'RETURN' || statusLower.includes('trả') || statusLower.includes('return')) {
      return 'return';
    }
    
    // Kiểm tra các trạng thái hủy
    if (statusUpper === 'CANCELLED' || statusLower.includes('hủy') || statusLower.includes('huy') || statusLower.includes('cancel')) {
      return 'cancellation';
    }
    
    // Kiểm tra trạng thái thất bại
    if (statusUpper === 'FAILED' || statusLower.includes('thất bại') || statusLower.includes('failed')) {
      return 'failed';
    }
    
    // Mặc định là quy trình bình thường
    return 'normal';
  };

  // Lấy các bước của quy trình dựa trên loại
  const getProcessSteps = (processType: 'normal' | 'cancellation' | 'failed' | 'return') => {
    switch (processType) {
      case 'normal':
        return [
          { label: "Chờ xác nhận", icon: "fas fa-hourglass-start" },
          { label: "Xác nhận đơn", icon: "fas fa-check" },
          { label: "Đang giao hàng", icon: "fas fa-truck" },
          { label: "Hoàn thành", icon: "fas fa-box" },
          { label: "Đánh giá", icon: "fas fa-star" }
        ];
      case 'cancellation':
        return [
          { label: "Yêu cầu hủy", icon: "fas fa-times-circle" },
          { label: "Chờ xử lý hủy", icon: "fas fa-hourglass-half" },
          { label: "Xác nhận hủy", icon: "fas fa-check-circle" },
          { label: "Đã hủy hoàn tất", icon: "fas fa-ban" }
        ];
      case 'return':
        return [
          { label: "Yêu cầu trả hàng", icon: "fas fa-undo" },
          { label: "Chờ xử lý trả hàng", icon: "fas fa-hourglass-half" },
          { label: "Xác nhận trả hàng", icon: "fas fa-check-circle" },
          { label: "Đã trả hàng hoàn tất", icon: "fas fa-box-open" }
        ];
      case 'failed':
        return [
          { label: "Đơn hàng thất bại", icon: "fas fa-exclamation-triangle" }
        ];
      default:
        return [];
    }
  };

  // Xác định bước hiện tại dựa trên trạng thái và loại quy trình
  const getCurrentStep = (status: string, processType: 'normal' | 'cancellation' | 'failed' | 'return', defaultStep: number): number => {
    const statusUpper = status.toUpperCase();
    const statusLower = status.toLowerCase();
    
    switch (processType) {
      case 'normal':
        switch (statusUpper) {
          case 'PENDING': return 1;
          case 'CONFIRMED':
          case 'APPROVED': return 2;
          case 'SHIPPING': return 3;
          case 'SUCCESS':
          case 'COMPLETED': return 4;
          default: 
            // Kiểm tra trạng thái tiếng Việt
            if (statusLower.includes('chờ')) return 1;
            if (statusLower.includes('xác nhận') || statusLower.includes('confirm')) return 2;
            if (statusLower.includes('giao') || statusLower.includes('ship')) return 3;
            if (statusLower.includes('hoàn thành') || statusLower.includes('thành công') || statusLower.includes('complete')) return 4;
            return defaultStep;
        }
      case 'cancellation':
        switch (statusUpper) {
          case 'CANCEL_REQUESTED': return 1;
          case 'CANCEL_PENDING': return 2;
          case 'CANCEL_CONFIRMED': return 3;
          case 'CANCELLED': return 4;
          default:
            // Kiểm tra các trạng thái có chứa từ khóa hủy
            if (statusLower.includes('yêu cầu hủy') || statusLower.includes('cancel_request')) return 1;
            if (statusLower.includes('chờ xử lý hủy') || statusLower.includes('cancel_pending')) return 2;
            if (statusLower.includes('xác nhận hủy') || statusLower.includes('cancel_confirm')) return 3;
            if (statusLower.includes('hủy hoàn tất') || statusLower.includes('đã hủy') || statusLower.includes('hủy') || statusLower.includes('huy') || statusLower.includes('cancel')) {
              return 4; // Đã hủy hoàn tất
            }
            return defaultStep;
        }
      case 'return':
        // Ưu tiên sử dụng statusStep từ API nếu có và hợp lệ
        if (defaultStep && defaultStep >= 1 && defaultStep <= 4) {
          return defaultStep;
        }
        
        // Backend sử dụng chung logic CANCEL cho trả hàng, fallback nếu không có statusStep
        switch (statusUpper) {
          case 'RETURN':
          case 'RETURN_REQUESTED':
          case 'CANCEL_REQUESTED': return 1; // Yêu cầu trả hàng
          case 'RETURN_PENDING':
          case 'CANCEL_PENDING': return 2;   // Chờ xử lý trả hàng
          case 'RETURN_CONFIRMED':
          case 'CANCEL_CONFIRMED': return 3; // Xác nhận trả hàng
          case 'RETURNED':
          case 'CANCELLED': return 4;        // Đã trả hàng hoàn tất
          default:
            // Kiểm tra các trạng thái có chứa từ khóa trả hàng
            if (statusLower.includes('yêu cầu trả') || statusLower.includes('return_request') || statusLower.includes('return')) return 1;
            if (statusLower.includes('chờ xử lý trả') || statusLower.includes('return_pending')) return 2;
            if (statusLower.includes('xác nhận trả') || statusLower.includes('return_confirm')) return 3;
            if (statusLower.includes('trả hoàn tất') || statusLower.includes('đã trả') || statusLower.includes('trả')) {
              return 4; // Đã trả hàng hoàn tất
            }
            return 1; // Default to step 1 for return process
        }
      case 'failed':
        return 1; // Chỉ có 1 bước cho failed
      default:
        return defaultStep;
    }
  };

  // Kiểm tra xem đơn hàng có thể hủy được không
  const canCancelOrder = (status: string, processType?: string): boolean => {
    const currentProcessType = getProcessType(status, processType);
    
    // Không thể hủy nếu đang trong quy trình hủy, trả hàng hoặc thất bại
    if (currentProcessType === 'cancellation' || currentProcessType === 'return' || currentProcessType === 'failed') {
      return false;
    }
    
    // Chỉ có thể hủy khi đơn hàng đang chờ xác nhận hoặc đã xác nhận (chưa vận chuyển)
    const cancellableStatuses = ['PENDING', 'CONFIRMED', 'APPROVED'];
    return cancellableStatuses.includes(status);
  };

  // Kiểm tra xem đơn hàng có thể trả hay không (đã hoàn thành và trong vòng 30 ngày)
  const canReturnOrder = (orderDate: string, status: string): { canReturn: boolean; daysLeft: number | null } => {
    // Chỉ cho phép trả hàng khi đơn hàng đã hoàn thành
    if (status !== "SUCCESS" && status !== "COMPLETED") {
      return { canReturn: false, daysLeft: null };
    }
    
    const orderDateTime = new Date(orderDate);
    const currentDateTime = new Date();
    
    // Tính số ngày giữa ngày đặt hàng và hiện tại
    const timeDiff = currentDateTime.getTime() - orderDateTime.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    // Kiểm tra xem có trong vòng 30 ngày không
    if (daysDiff <= 30) {
      return { canReturn: true, daysLeft: 30 - daysDiff };
    } else {
      return { canReturn: false, daysLeft: null };
    }
  };

  const openReviewForm = (product: OrderProduct) => {
    setCurrentReviewProduct(product);
    setShowReviewForm(true);
    setReviewTitle("");
    setReviewDescription("");
    setReviewRating(0);
    setReviewMessage("");
  };

  const closeReviewForm = useCallback(() => {
    setShowReviewForm(false);
    setCurrentReviewProduct(null);
    setReviewTitle("");
    setReviewDescription("");
    setReviewRating(0);
    setReviewMessage("");
  }, []);

  const handleRatingChange = (rating: number) => {
    setReviewRating(rating);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentReviewProduct || reviewRating === 0) {
      setReviewMessage("Vui lòng chọn số sao và nhập đủ thông tin.");
      return;
    }

    setIsSubmittingReview(true);
    setReviewMessage("");

    try {
      const token = sessionStorage.getItem("authToken");
      const payload = {
        order_item_id: currentReviewProduct.order_item_id,
        product_id: currentReviewProduct.product_id,
        comment_title: reviewTitle,
        comment_description: reviewDescription,
        comment_rating: reviewRating,
      };
      console.log("Sending payload:", payload);
      const res = await axios.post(
        "http://localhost:3501/api/comments",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setReviewMessage("Đánh giá của bạn đã được gửi thành công!");
        // Reload order data to reflect the new review status
        await fetchOrder(); // <--- Call fetchOrder here
        closeReviewForm();
        console.log(
          "Đánh giá thành công, đang chuẩn bị đóng form sau 2 giây..."
        );
        setTimeout(() => {
          closeReviewForm();
        }, 2000);
        console.log("Đã gọi closeReviewForm");
      } else {
        setReviewMessage(
          res.data.message || "Đã có lỗi xảy ra khi gửi đánh giá."
        );
      }
    } catch (error: any) {
      console.error("Lỗi khi gửi đánh giá:", error);
      if (error.response) {
        console.error("Dữ liệu phản hồi lỗi:", error.response.data);
        console.error("Mã trạng thái lỗi:", error.response.status);
        console.error("Headers lỗi:", error.response.headers);
        setReviewMessage(
          error.response.data.message || "Lỗi từ server: Không rõ nguyên nhân."
        );
      } else if (error.request) {
        console.error("Không nhận được phản hồi từ server:", error.request);
        setReviewMessage("Không nhận được phản hồi từ server.");
      } else {
        console.error("Lỗi thiết lập request:", error.message);
        setReviewMessage("Lỗi kết nối hoặc thiết lập request.");
      }
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Xử lý khi người dùng nhấn nút trả hàng
  const handleReturnOrder = async () => {
    if (!order || !order.order_hash) return;
    
    // Hỏi lý do trả hàng
    const reason = prompt("Vui lòng nhập lý do trả hàng:");
    if (!reason) return; // Người dùng đã hủy hoặc không nhập lý do
    
    try {
      setIsProcessingReturn(true);
      await returnOrder(order.order_hash, reason);
      alert("Yêu cầu trả hàng đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm.");
      
      // Tải lại thông tin đơn hàng để cập nhật statusStep và processType mới
      await fetchOrder();
      
      console.log("Đã reload thông tin đơn hàng sau khi gửi yêu cầu trả hàng");
    } catch (error: any) {
      console.error("Lỗi khi gửi yêu cầu trả hàng:", error);
      
      // Hiển thị thông báo lỗi cụ thể từ API nếu có
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Lỗi: ${error.response.data.message}`);
      } else {
        alert("Không thể gửi yêu cầu trả hàng. Vui lòng thử lại sau.");
      }
    } finally {
      setIsProcessingReturn(false);
    }
  };

  // Xử lý khi người dùng nhấn nút hủy đơn hàng
  const handleCancelOrder = async () => {
    if (!order) return;
    
    // Xác nhận hủy đơn hàng
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      return;
    }

    // Hỏi lý do hủy đơn hàng
    const reason = prompt("Vui lòng nhập lý do hủy đơn hàng (không bắt buộc):");

    try {
      setIsProcessingCancel(true);
      
      // Sử dụng order ID từ API response hoặc trích xuất từ order_hash
      let orderId: number;
      
      if (order.id) {
        orderId = order.id;
      } else {
        // Trích xuất số từ order_hash nếu không có ID trực tiếp
        const hashNumbers = order.order_hash.match(/\d+/g);
        if (hashNumbers && hashNumbers.length > 0) {
          orderId = parseInt(hashNumbers[hashNumbers.length - 1]);
        } else {
          throw new Error("Không thể xác định ID đơn hàng");
        }
      }
      
      await cancelOrder(orderId, reason || undefined);
      
      alert("Đơn hàng đã được hủy thành công!");
      
      // Tải lại thông tin đơn hàng để cập nhật trạng thái
      fetchOrder();
    } catch (error: any) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      
      // Hiển thị thông báo lỗi cụ thể từ API nếu có
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Lỗi: ${error.response.data.message}`);
      } else {
        alert("Không thể hủy đơn hàng. Vui lòng thử lại sau.");
      }
    } finally {
      setIsProcessingCancel(false);
    }
  };

const formatPrice1 = (value: number | string): string => {
  if (!value) return "0";

  const cleaned = String(value).replace(/[^\d]/g, "");

  const result = Math.floor(Number(cleaned) / 100);

  return result.toLocaleString("vi-VN");
};

  
  if (!order) return <p>Đang tải đơn hàng...</p>;

  return (
    <>
      <Header />

      <section className="detail-order-page">
        <div className="container">
          <div className="order-overview">
            <div className="order-header">
              <div className="order-id">
                <h2>Đơn hàng: #{order.order_hash}</h2>
                <p className="order-date">Ngày đặt: {formatDate(order.date)}</p>
              </div>
              <div className="order-actions">
                <div className="order-status">
                  <span className="status">
                    {translateOrderStatus(order.status)}
                  </span>
                </div>
              </div>
            </div>

            <div className="order-status-progress">
              <div className="status-timeline">
                {(() => {
                  // Xác định loại quy trình và các bước
                  const processType = getProcessType(order.status, order.processType);
                  const steps = getProcessSteps(processType);
                  const currentStep = getCurrentStep(order.status, processType, order.statusStep || 1);
                  
                  console.log("Debug Info:", {
                    status: order.status,
                    processType: order.processType,
                    statusStep: order.statusStep,
                    calculatedProcessType: processType,
                    steps: steps.map(s => s.label),
                    currentStep,
                    orderData: order
                  });
                  
                  return steps.map((step, index) => (
                    <React.Fragment key={index}>
                      <div
                        className={`status-step ${
                          currentStep >= index + 1 ||
                          (processType === 'normal' && step.label === "Đánh giá" && allProductsReviewed)
                            ? "active"
                            : ""
                        } ${processType}`}
                      >
                        <div className="status-icon">
                          <i className={step.icon}></i>
                        </div>
                        <div className="status-label">
                          <p>{step.label}</p>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`status-line ${
                            currentStep > index + 1 ||
                            (processType === 'normal' && step.label === "Hoàn thành" && allProductsReviewed)
                              ? "active"
                              : ""
                          }`}
                        ></div>
                      )}
                    </React.Fragment>
                  ));
                })()}
              </div>
            </div>
          </div>

          <div className="delivery-info">
            <h3>Địa chỉ nhận hàng</h3>
            <div className="recipient-info">
              <div className="payment-summary">
                {" "}
                <div className="summary-row">
                  <span className="row1">Họ và tên:</span>
                  <span className="row2">{order.recipientName}</span>
                </div>
                <div className="summary-row">
                  <span className="row1">Số điện thoại:</span>
                  <span className="row2">{order.recipientPhone}</span>
                </div>
                <div className="summary-row">
                  <span className="row1">Địa chỉ:</span>
                  <span className="row2">{order.address}</span>
                </div>
                <div className="summary-row">
                  <span className="row1">Thanh toán khi nhận hàng</span>
                </div>
              </div>
              <div className="payment-summary">
                <div className="summary-row">
                  <span className="row1">Tổng tiền hàng:</span>
                  <span className="row2">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span className="row1">Phí vận chuyển:</span>
                  <span className="row2">
                    {formatPrice(order.shippingFee)}
                  </span>{" "}
                </div>
                <div className="summary-row discount">
                  <span className="row1">Mã giảm giá:</span>
                  <span className="row2">
                    -{formatPrice(order.couponValue)}
                  </span>
                </div>
                <div className="summary-row total">
                  <span className="row1">Thành tiền:</span>
                  <span className="row2">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-summary">
            <div className="summary-header">
              <h3>Tổng sản phẩm</h3>
            </div>
            <div className="product-list">
              {order.products?.map((product: OrderProduct) => (
                <div className="product-item" key={product.order_item_id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-detailss">
                    <h4>{product.name}</h4>
                    <div className="product-meta">
                      {product.color && product.color.hex && (
                        <span
                          className="product-color"
                          style={{ backgroundColor: product.color.hex }}
                          title={`Màu: ${
                            product.color.name || product.color.hex
                          }`}
                        ></span>
                      )}
                      {product.size && <span>Size: {product.size}</span>}{" "}
                      <span>Số lượng: {product.quantity}</span>
                    </div>
                    <span>Giá: {formatPrice1(product.price)}đ</span>
                  </div>
                  <div className="product-price">
                    <p>
                      Thành tiền:{" "}
                      <span>
                        {formatPrice1(product.price * product.quantity)}đ
                      </span>
                    </p>
                  </div>
                  <div className="product-actions">
                    <Link to={`/san-pham/${product.slug}`}>
                      <button className="btn-product-action">
                        Xem chi tiết
                      </button>
                    </Link>
                    {order.status === "SUCCESS" && !product.has_comment ? (
                      <button
                        onClick={() => openReviewForm(product)}
                        className="btn-product-review"
                      >
                        Đánh giá
                      </button>
                    ) : order.status === "SUCCESS" && product.has_comment ? (
                      <button className="status-reviewed">Đã đánh giá</button>
                    ) : (
                      <button className="status-cantnot-review">
                        Chưa thể đánh giá
                      </button>
                    )}
                  </div>

                  {showReviewForm &&
                    currentReviewProduct?.order_item_id ===
                      product.order_item_id && (
                      <div className="review-form-section">
                        <h4>Đánh giá sản phẩm: {product.name}</h4>
                        <form onSubmit={handleSubmitReview}>
                          <div className="form-group">
                            <label className="form-label">
                              Chất lượng sản phẩm:
                            </label>
                            <div className="star-rating-container">
                              {Array.from({ length: 5 }, (_, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  className="star-button"
                                  onClick={() => handleRatingChange(index + 1)}
                                >
                                  <img
                                    src={
                                      reviewRating > index
                                        ? starFilledImg
                                        : starOutlineImg
                                    }
                                    alt={
                                      reviewRating > index
                                        ? "Sao đã chọn"
                                        : "Sao chưa chọn"
                                    }
                                    className="star-icon-img"
                                  />
                                </button>
                              ))}
                              <br />
                            </div>
                            <span className="rating-text">
                              {reviewRating > 0 ? (
                                <>
                                  <span className="form-label rating-description">
                                    {ratingLabels[reviewRating]}{" "}
                                    {`(${reviewRating}/5 sao)`}
                                  </span>
                                </>
                              ) : (
                                ratingLabels[0]
                              )}
                            </span>
                          </div>
                          <div className="form-group">
                            <label htmlFor="reviewTitle" className="form-label">
                              Tiêu đề:
                            </label>
                            <input
                              type="text"
                              id="reviewTitle"
                              className="form-input"
                              value={reviewTitle}
                              onChange={(e) => setReviewTitle(e.target.value)}
                              placeholder="Tiêu đề đánh giá (VD: Sản phẩm rất tốt!)"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="reviewDescription"
                              className="form-label"
                            >
                              Nội dung đánh giá:
                            </label>
                            <textarea
                              id="reviewDescription"
                              className="form-textarea"
                              rows={4}
                              value={reviewDescription}
                              onChange={(e) =>
                                setReviewDescription(e.target.value)
                              }
                              placeholder="Viết đánh giá của bạn về sản phẩm..."
                              required
                            ></textarea>
                          </div>
                          {reviewMessage && (
                            <p
                              className={`review-message ${
                                reviewMessage.includes("thành công")
                                  ? "success"
                                  : "error"
                              }`}
                            >
                              {reviewMessage}
                            </p>
                          )}
                          <div className="form-actions">
                            <button
                              type="submit"
                              className="submit-review-button"
                              disabled={isSubmittingReview}
                            >
                              {isSubmittingReview ? (
                                <>
                                  <span className="spinner"></span> Đang gửi...
                                </>
                              ) : (
                                <>Gửi đánh giá</>
                              )}
                            </button>
                            <button
                              type="button"
                              className="cancel-review-button"
                              onClick={closeReviewForm}
                              disabled={isSubmittingReview}
                            >
                              Hủy
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          <div className="order-actions-bottom">
            {canCancelOrder(order.status, order.processType) && (
              <button 
                className="btn-primary"
                onClick={handleCancelOrder}
                disabled={isProcessingCancel}
              >
                {isProcessingCancel ? (
                  <>
                    <span className="spinner"></span> Đang xử lý...
                  </>
                ) : (
                  "Hủy đơn hàng"
                )}
              </button>
            )}
            {(order.status === "SUCCESS" || order.status === "COMPLETED") && (
              <>
                {canReturnOrder(order.date, order.status).canReturn ? (
                  <button 
                    className="btn-primary btn-return"
                    onClick={handleReturnOrder}
                    disabled={isProcessingReturn}
                  >
                    {isProcessingReturn ? (
                      <>
                        <span className="spinner"></span> Đang xử lý...
                      </>
                    ) : (
                      <>Trả hàng (còn {canReturnOrder(order.date, order.status).daysLeft} ngày)</>
                    )}
                  </button>
                ) : (
                  <button className="btn-primary btn-return disabled" disabled title="Đã quá thời hạn trả hàng 30 ngày">
                    Quá hạn trả hàng
                  </button>
                )}
              </>
            )}
            <button className="btn-outline">Liên hệ với SONA</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DetailOrder;
