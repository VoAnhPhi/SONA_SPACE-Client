import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadCartService } from "../../services/cartService";
import { createOrderService } from "../../services/ordersService";
import axios from "axios";
interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

interface CartItemProps {
  id: number;
  variant_id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  color: string;
  quantity: number;
  category: string;
}

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [prevAddress, setPrevAddress] = useState("");
  const [prevPhone, setPrevPhone] = useState("");

  const [orderSummary, setOrderSummary] = useState<OrderSummaryProps>({
    subtotal: 0,
    shipping: 30000,
    discount: 0,
    total: 30000,
  });

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    cardName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    promoCode: "",
  });

  const formatPrice = (price: number): string =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!agreeToTerms) {
    alert("Vui lòng đồng ý với điều khoản và điều kiện trước khi thanh toán.");
    return;
  }

  const orderId = "SN" + Math.floor(10000000 + Math.random() * 90000000);

  const method =
    paymentMethod === "card"
      ? "MOMO"
      : paymentMethod === "VNpay"
        ? "VNPAY"
        : "COD";

  try {
    const payload: any = {
      order_id: orderId,
      user_id: user?.id,
      recipient_name: formData.fullName,
      order_total: orderSummary.total,
      order_status: "Đang xử lý",
      method,
      amount: orderSummary.total,

      // luôn gửi địa chỉ cũ và số cũ
      order_address_old: prevAddress,
      order_number1: prevPhone,
    };

    // chỉ gửi địa chỉ mới nếu người dùng sửa
    if (formData.address.trim() !== prevAddress.trim()) {
      payload.order_address_new = formData.address.trim();
    }

    // chỉ cập nhật số mới nếu khác số cũ
    if (formData.phone.trim() !== prevPhone.trim()) {
      payload.order_number2 = formData.phone.trim(); // override số cũ
    }

    const res = await createOrderService(payload);

    if (!res?.order_id) {
      toast.error("Không thể tạo đơn hàng");
      return;
    }

    if (res.payUrl) {
      window.location.href = res.payUrl;
    } else {
      toast.success("🎉 Đặt hàng thành công. Đang chuyển hướng...", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate(`/dat-hang-thanh-cong/${res.order_id}`);
      }, 2000);
    }
  } catch (error) {
    toast.error("❌ Có lỗi xảy ra khi xử lý đơn hàng.");
  }
};

  useEffect(() => {
    if (user && isAuthenticated) {
      const defaultAddress = user.address || "";
      const defaultPhone = user.phone || "";

      setFormData((prev) => ({
        ...prev,
        fullName: user.full_name || "",
        email: user.email || "",
        phone: defaultPhone,
        address: defaultAddress,
      }));

      setPrevAddress(defaultAddress);
      setPrevPhone(defaultPhone);
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    const loadCartFromDatabase = async () => {
      try {
        const { success, wishlistItems } = await loadCartService();
        if (success && wishlistItems) {
          const formatted = wishlistItems.map((item: any, index: number) => ({
            id: item.wishlist_id || index,
            variant_id: item.variant_id,
            name: item.product_name,
            price: item.price,
            oldPrice: item.price_sale || "",
            image: item.image?.split(",")[0] || "/images/default.jpg",
            color: item.color_hex || "#ccc",
            quantity: item.quantity,
            category: item.category || "Chưa phân loại",
          }));

          setCartItems(formatted);

          const subtotal = formatted.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );

          const shipping = 30000;
          const discount = 0;
          const total = subtotal + shipping - discount;

          setOrderSummary({ subtotal, shipping, discount, total });
        }
      } catch (error) {
        console.error("Lỗi khi load giỏ hàng:", error);
      }
    };

    loadCartFromDatabase();
  }, []);


  return (
    <>
      <Header />
      <div className="bill-payment">

        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <span className="active">Thanh toán</span>
            </div>
          </div>
        </div>

        <div className="pay-cart">
          <div className="container">
            <h3>Thanh toán</h3>
          </div>
        </div>

        <div className="Pay-billment">
          <div className="container">
            <div className="pay-info">
              <form onSubmit={handleSubmit} className="pay-info-left">
                <div className="info-left-title">
                  <h5>THÔNG TIN GIAO HÀNG</h5>
                </div>
                <div className="info-left-form">
                  <div className="form-info">
                    <label htmlFor="fullName" >Họ và tên</label><br />
                    <input type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Nhập họ và tên"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required />
                  </div>
                  <div className="form-info">
                    <label htmlFor="phone" >Số điện thoại</label><br />
                    <input type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required />
                  </div>
                  <div className="form-info">
                    <label htmlFor="email">Email</label><br />
                    <input type="email"
                      id="email"
                      name="email"
                      placeholder="Nhập email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required />
                  </div>
                  <div className="form-info">
                    <label htmlFor="address">Địa chỉ</label><br />
                    <input type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required placeholder="Nhập địa chỉ" />
                  </div>
                </div>

                <div className="info-left-title-2">
                  <h5>PHƯƠNG THỨC THANH TOÁN</h5>
                  <div className={`payment-option ${paymentMethod === 'transfer' ? 'active' : ''}`}>
                    <div className="method-option">
                      <input
                        className="input-radio"
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'transfer'}
                        onChange={() => handlePaymentMethodChange('transfer')}
                      />
                      <img src="/images/icons/cod.svg" alt="" width={30} height={30} />
                      <span className="radio-label">Thanh toán khi nhận hàng</span>
                    </div>
                  </div>
                  <div className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                    <div className="method-option">
                      <input
                        className="input-radio"
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => handlePaymentMethodChange('card')}
                      />
                      <img src="/images/icons/momo.svg" alt="" width={30} height={30} />
                      <span className="radio-label">Thanh toán qua ví momo</span>
                    </div>
                  </div>
                  <div className={`payment-option ${paymentMethod === 'VNpay' ? 'active' : ''}`}>
                    <div className="method-option">
                      <input
                        className="input-radio"
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'VNpay'}
                        onChange={() => handlePaymentMethodChange('VNpay')}
                      />
                      <img src="/images/icons/vnpay.svg" alt="" width={30} height={30} />
                      <span className="radio-label">Thanh toán qua cổng VNPay</span>
                    </div>
                  </div>


                </div>
                <div className="info-left-clause">
                  <input type="checkbox" id="clause" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} required />
                  <span>Tôi đồng ý với <Link to={`/dieu-khoan-su-dung`}>điều khoản và điều kiện</Link> của SONA SPACE</span>
                </div>



              </form>
              <div className="cart-summary">
                <div className="summary-title">Đơn hàng</div>
                <div className="summary-row">
                  <span className="label">Tổng tiền:</span>
                  <span className="value">
                    {formatPrice(orderSummary.subtotal)} đ
                  </span>
                </div>
                <div className="summary-row">
                  <span className="label">Vận chuyển:</span>
                  <span className="value">
                    {formatPrice(orderSummary.shipping)} đ
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
                    {formatPrice(orderSummary.total)} đ
                  </span>
                </div>
                <div className="checkout-btn" onClick={handleSubmit}>
                  Tiến hành thanh toán
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-right"
        autoClose={3000}
        style={{ marginTop: "100px" }} />
    </>
  );
};

export default Payment;
