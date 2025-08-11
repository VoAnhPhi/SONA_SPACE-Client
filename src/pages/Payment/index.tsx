import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadCartService, clearCartServiceid } from "../../services/cartService";
import { createOrderService } from "../../services/ordersService";
import BannerSlider from "../../components/BannerSlider";

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
  const [prevName, setPrevName] = useState("");
  const [prevEmail, setPrevEmail] = useState("");
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const selectedItems: number[] | undefined = location.state?.selectedItems;
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const validateForm = () => {
    const errors: any = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Họ và tên không được để trống.";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Số điện thoại không được để trống.";
    } else if (!/^(0|\+84)[0-9]{9}$/.test(formData.phone.trim())) {
      errors.phone = "Số điện thoại không hợp lệ.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email không được để trống.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Email không hợp lệ.";
    }

    if (!formData.address.trim()) {
      errors.address = "Địa chỉ không được để trống.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Họ và tên không được để trống.";
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "Số điện thoại không được để trống.";
        } else if (!/^(0|\+84)[0-9]{9}$/.test(value.trim())) {
          error = "Số điện thoại không hợp lệ.";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email không được để trống.";
        } else if (!/\S+@\S+\.\S+/.test(value.trim())) {
          error = "Email không hợp lệ.";
        }
        break;
      case "address":
        if (!value.trim()) {
          error = "Địa chỉ không được để trống.";
        }
        break;
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };


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
    validateField(name, value);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resultCode = params.get("resultCode");
    const orderId = params.get("orderId");

    if (resultCode === "0" && orderId) {
      const pending = localStorage.getItem("pending_order_data");
      if (!pending) {
        toast.error("Không tìm thấy đơn hàng chờ.");
        return;
      }

      const parsed = JSON.parse(pending);
      console.log("Đang xóa cart với ID:", parsed.selectedItemIds);
      const confirmOrder = async () => {
        try {
          const response = await createOrderService({
            ...parsed,
            order_status: "PAID",
            order_id: orderId,
          });

          await clearCartServiceid(parsed.selectedItemIds || []);
          localStorage.removeItem("pending_order_data");

          toast.success("🎉 Thanh toán thành công!");
          navigate(`/dat-hang-thanh-cong/${response.order_hash}`, { replace: true });
        } catch (error) {
          toast.error("Xác nhận đơn hàng thất bại.");
        }
      };

      confirmOrder();
    }

    if (resultCode && resultCode !== "0") {
      toast.error("Giao dịch thất bại hoặc bị huỷ!");
      navigate("/thanh-toan", { replace: true });
    }
  }, []);


  console.log("Selected Items in Payment:", selectedItems);



  useEffect(() => {
    if (user && isAuthenticated) {
      const defaultAddress = user.address || "";
      const defaultPhone = user.phone || "";
      const defaultName = user.full_name || "";
      const defaultEmail = user.email || "";

      setFormData((prev) => ({
        ...prev,
        fullName: defaultName,
        email: defaultEmail,
        phone: defaultPhone,
        address: defaultAddress,
      }));

      setPrevAddress(defaultAddress);
      setPrevPhone(defaultPhone);
      setPrevName(defaultName);
      setPrevEmail(defaultEmail);
    }
  }, [user, isAuthenticated]);


  useEffect(() => {
    const loadCartFromDatabase = async () => {
      try {
        const { success, wishlistItems } = await loadCartService();
        if (success && wishlistItems) {
          const formatted = wishlistItems.map((item: any, index: number) => ({
            id: item.wishlist_id,
            variant_id: item.variant_id,
            name: item.product_name,
            price: item.price,
            oldPrice: item.price_sale && item.price_sale > 0 ? item.price_sale : null,

            image: item.image?.split(",")[0] || "/images/default.jpg",
            color: item.color_hex || "#ccc",
            quantity: item.quantity,
            category: item.category || "Chưa phân loại",
          }));
          console.log(" Items để xóa:", cartItems.map(i => i.id));

          //  Chỉ giữ lại những item được chọn (nếu có selectedItems)
          const filteredItems = formatted.filter((item: any) => selectedItems?.includes(item.id));


          setCartItems(filteredItems);

          const subtotal = filteredItems.reduce(
            (total: number, item: CartItemProps) => {
              const unitPrice = item.oldPrice || item.price;
              return total + unitPrice * item.quantity;
            },
            0
          );


          const shipping = 30000;
          const stored = localStorage.getItem("applycode");
          let discount = 0;
          let code = "";

          if (stored) {
            const parsed = JSON.parse(stored);
            discount = parsed.discount || 0;
            code = parsed.code || "";
          }

          setPromoCodeInput(code);
          const total = subtotal + shipping - discount;
          setOrderSummary({ subtotal, shipping, discount, total });
        }
      } catch (error) {
        console.error("Lỗi khi load giỏ hàng:", error);
      }
    };

    loadCartFromDatabase();
  }, [selectedItems]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin giao hàng.", {
        position: "top-right",
        autoClose: 1000,
      })
        return;
    };

    if (cartItems.length === 0) {
      toast.error("Giỏ hàng đang trống. Không thể thanh toán.", {
        position: "top-right",
        autoClose: 1000,
      })
        return;
    };
    if (!agreeToTerms) {
      toast.error("Vui lòng đồng ý với điều khoản và điều kiện.", {
        position: "top-right",
        autoClose: 1000,
      })
        return;
    };

    setIsLoading(true);

    const orderId = "SN" + Math.floor(10000000 + Math.random() * 90000000);
    const method =
      paymentMethod === "card" ? "MOMO" :
        paymentMethod === "VNpay" ? "VNPAY" : "COD";
    const appliedCode = JSON.parse(localStorage.getItem("applycode") || "{}");
    try {
      const payload: any = {
        order_id: orderId,
        order_total: orderSummary.subtotal,
        order_total_final: orderSummary.total,
        order_status: "PENDING",
        method,
        couponcode_id: appliedCode?.couponcode_id || null,
        order_discount: orderSummary.discount || 0,
        shipping_fee: orderSummary.shipping || 0,
        amount: orderSummary.total,
        cart_items: cartItems.map(item => ({
          ...item,
          price: item.oldPrice || item.price
        })),

        fromRedirect: true
      };
      console.log("Payload gửi lên:", payload);

      console.log(" Coupon gửi đi:", appliedCode);

      if (formData.address.trim() !== prevAddress.trim()) {
        payload.order_address_new = formData.address.trim();
      }

      if (formData.phone.trim() !== prevPhone.trim()) {
        payload.order_number2 = formData.phone.trim();
      }

      if (formData.fullName.trim() !== prevName.trim()) {
        payload.order_name_new = formData.fullName.trim();
      }


      if (formData.email.trim() !== prevEmail.trim()) {
        payload.order_email_new = formData.email.trim();
      }




      const res = await createOrderService(payload);
      localStorage.removeItem("applycode");
      if (paymentMethod === "transfer" && !res?.order_id) {
        toast.error("Không thể tạo đơn hàng");
        return;
      }
      if (res?.payUrl) {
        localStorage.setItem("pending_order_data", JSON.stringify({
          ...payload,
          selectedItemIds: selectedItems && selectedItems.length > 0
            ? selectedItems
            : (await loadCartService()).wishlistItems.map((item: any) => item.wishlist_id),
        }));

        window.location.href = res.payUrl;
        return;
      }


      console.log("Response from createOrderService:", res);

      if (!res.payUrl) {
        await clearCartServiceid(selectedItems || []);

        toast.success("🎉 Đặt hàng thành công. Đang chuyển hướng...", { autoClose: 2000 });
        setTimeout(() => {
          navigate(`/dat-hang-thanh-cong/${res.order_hash}`);
        }, 2000);
      } else {
        window.location.href = res.payUrl;
      }
    } catch (error) {
      toast.error(" Có lỗi xảy ra khi xử lý đơn hàng.");
    } finally {
      setIsLoading(false);
    }
  };

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
                      onBlur={(e) => validateField("fullName", e.target.value)}
                      required />
                    {formErrors.fullName && <small className="text-error">{formErrors.fullName}  </small>}
                  </div>
                  <div className="form-info">
                    <label htmlFor="phone" >Số điện thoại</label><br />
                    <input type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={(e) => validateField("phone", e.target.value)}
                      required />
                    {formErrors.phone && <small className="text-error">{formErrors.phone}  </small>}
                  </div>
                  <div className="form-info">
                    <label htmlFor="email">Email</label><br />
                    <input type="email"
                      id="email"
                      name="email"
                      placeholder="Nhập email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={(e) => validateField("email", e.target.value)}
                      required />
                    {formErrors.email && <small className="text-error">{formErrors.email}  </small>}
                  </div>
                  <div className="form-info">
                    <label htmlFor="address">Địa chỉ</label><br />
                    <input type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      onBlur={(e) => validateField("adress", e.target.value)}
                      required placeholder="Nhập địa chỉ" />
                    {formErrors.address && <small className="text-error">{formErrors.address}  </small>}
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
                  {/* <div className={`payment-option ${paymentMethod === 'VNpay' ? 'active' : ''}`}>
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
                  </div> */}


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
                <div className="summary-row discount">
                  <span className="label">Giảm giá:</span>
                  <span className="value">-{formatPrice(orderSummary.discount)} đ</span>
                </div>
                <div className="summary-row promo-code">
                  <span className="label">Mã giảm giá:</span>
                  <div className="promo-input">
                    <input
                      type="text"
                      value={promoCodeInput}
                      readOnly
                      placeholder="Chưa áp dụng mã"
                    />
                    {/* <button className="apply-btn" >Áp dụng</button> */}
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
      {isLoading && (
        <div className="fullscreen-loading">
          <div className="spinner" />
        </div>
      )}

      <Footer />
      <ToastContainer position="top-right"
        autoClose={3000}
        style={{ marginTop: "100px" }} />
    </>
  );
};

export default Payment;
