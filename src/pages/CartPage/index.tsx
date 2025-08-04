import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GetInTouch from "../../components/GetInTouch";
import PolicyProduct from "../../components/Policy";
import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { loadCartService, updateCartQuantityService, removeFromCartService, clearCartService } from "../../services/cartService";
import { validateCouponService } from "../../services/conpcodeService";
interface CartItemProps {
  id: number;
  variant_id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  color: string;
  quantity: number;
  category_name: string;
  availableStock: number;
}


const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    shipping: 30000,
    discount: 0,
    total: 0,
  });

  const recalculateSummary = (items: CartItemProps[], appliedDiscountAmount = 0) => {
    const filteredItems = items.filter((item) => selectedItems.includes(item.id));

    const subtotal = filteredItems.reduce((total, item) => {
      const effectivePrice = item.oldPrice && item.oldPrice > 0 ? item.oldPrice : item.price;
      return total + effectivePrice * item.quantity;
    }, 0);

    const shipping = filteredItems.length > 0 ? 30000 : 0;
    const discount = appliedDiscountAmount;
    const total = subtotal + shipping - discount;

    setCartSummary({ subtotal, shipping, discount, total });
  };


  useEffect(() => {
    recalculateSummary(cartItems, appliedDiscount);
  }, [selectedItems, cartItems]);


  const loadWishlist = async () => {
    const { success, wishlistItems, message } = await loadCartService();
    if (success && wishlistItems) {
      console.log("Danh sách sản phẩm trong cart:", wishlistItems);

      const formattedItems = wishlistItems.map((item: any, index: number) => ({
        id: item.wishlist_id,
        variant_id: item.variant_id,
        name: item.product_name,
        price: item.price,
        oldPrice: item.price_sale || "",
        image: item.image?.split(",")[0] || "/images/default.jpg",
        color: item.color_hex || "#ccc",
        quantity: item.quantity,
        category_name: item.category_name || "Chưa phân loại",
        availableStock: item.variant_product_quantity || 0,
      }));

      setCartItems(formattedItems);


      const subtotal = formattedItems.reduce(
        (total: number, item: any) => total + item.price * item.quantity,
        0
      );

      recalculateSummary(formattedItems, appliedDiscount);


    } else {
      console.error("Lỗi khi load wishlist:", message);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);


  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const updateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await updateCartQuantityService(id, newQuantity);
      setCartItems((prev) => {
        const updatedItems = prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
        recalculateSummary(updatedItems, appliedDiscount);
        return updatedItems;
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };


  const removeItem = async (id: number) => {
    try {
      await removeFromCartService(id);
      const updatedItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedItems);
      recalculateSummary(updatedItems, appliedDiscount);

      toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?");
    if (!confirmDelete) return;

    try {
      const result = await clearCartService();
      if (result.success !== false) {
        await loadWishlist();
        toast.success("Đã xóa toàn bộ giỏ hàng!");
      } else {
        console.log(result.message);
        toast.error(result.message || "Không thể xóa giỏ hàng.");
      }
    } catch (error) {
      alert("Lỗi khi xóa giỏ hàng.");
    }
  };

  const handleApplyPromoCode = async () => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      toast.error("Vui lòng đăng nhập để sử dụng mã giảm giá.");
      return;
    }


    if (!promoCodeInput.trim()) {
      toast.error("Vui lòng nhập mã giảm giá.");
      return;
    }

    try {
      const result = await validateCouponService(promoCodeInput, cartSummary.subtotal, token);

      if (result.success) {
        const { discount_type, value_price } = result.data.coupon;

        let discount_amount = 0;
        if (discount_type === 'percentage') {
          discount_amount = Math.round((cartSummary.subtotal * value_price) / 100);
        } else if (discount_type === 'fixed') {
          discount_amount = Math.min(value_price, cartSummary.subtotal);
        }

        localStorage.setItem("applycode", JSON.stringify({
          couponcode_id: result.data.coupon.couponcode_id,
          code: promoCodeInput,
          discount: discount_amount
        }));

        console.log("Kết quả mã giảm giá:", result.data.coupon);
        setAppliedDiscount(discount_amount);
        setCartSummary((prev) => ({
          ...prev,
          discount: discount_amount,
          total: prev.subtotal + prev.shipping - discount_amount,
        }));
        recalculateSummary(cartItems, discount_amount);
        toast.success("Mã giảm giá đã được áp dụng!");
      } else {
        toast.error(result.error || "Mã giảm giá không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra mã giảm giá:", error);
      toast.error("Đã xảy ra lỗi khi áp dụng mã giảm giá.");
    }
  };


  const handleSelectItem = (id: number, checked: boolean) => {
    setSelectedItems((prevSelected) => {
      if (checked) {
        return [...prevSelected, id];
      } else {
        return prevSelected.filter((itemId) => itemId !== id);
      }
    });
  };

  useEffect(() => {
    localStorage.removeItem("applycode");
    setAppliedDiscount(0);
    setPromoCodeInput("");
  }, []);
  const formatPrice1 = (value: number | string): string => {
    if (!value) return "0";

    const cleaned = String(value).replace(/[^\d]/g, "");

    const result = Math.floor(Number(cleaned) / 100);

    return result.toLocaleString("vi-VN");
  };
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
        <section className="cart-content mt-94">
          <div className="container">
            <div className="page-title">
              <h1>Giỏ hàng</h1>
              <p className="items-count">{cartItems.length} sản phẩm</p>
            </div>
            {cartItems.length > 0 ? (<div className="page-select">
              <a className="selectt-1" onClick={() => setSelectedItems(cartItems.map(item => item.id))}>Chọn tất cả</a>
              <a className="selectt-2" onClick={() => setSelectedItems([])}>Bỏ chọn</a>
            </div>) : (
              <div className="page-select" style={{ display: 'none' }}>
                <a className="selectt-1 disabled">Chọn tất cả</a>
                <a className="selectt-2 disabled">Bỏ chọn</a>
              </div>
            )}
            {cartItems.length > 0 ? (
              <div className="cart-grid">
                {/* Cart Items */}
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-select">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                        />
                      </div>

                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className="item-details">
                        <div className="item-info">
                          <h3 className="item-name">{item.name}</h3>
                          <div className="item-category">Phân loại: {item.category_name}</div>
                          <div className="item-color">
                            <span className="color-label">Màu:</span>
                            <span
                              className="color-dot"
                              style={{ backgroundColor: item.color }}
                            ></span>
                          </div>
                        </div>
                        <div className="item-price">
                          {item.oldPrice && item.oldPrice < item.price && item.oldPrice > 0 ? (
                            <>
                              <div className="current-price">
                                {formatPrice1(item.oldPrice)} đ
                              </div>
                              <div className="old-price">
                                {formatPrice1(item.price)} đ
                              </div>
                            </>
                          ) : (
                            <div className="current-price">
                              {formatPrice1(item.price)} đ
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
                          <button className="remove-btn" onClick={() => removeItem(item.id)} aria-label="Xóa sản phẩm khỏi giỏ hàng">
                            {/* <i className="icon-trash"></i> */}
                            <img src="/images/icons/trash.png" alt="" />
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
                    <span className="label">Giảm giá:</span>
                    <span className="value">-{formatPrice(cartSummary.discount)} đ</span>
                  </div>

                  <div className="summary-row promo-code">
                    <span className="label">Mã giảm giá:</span>
                    <div className="promo-input">
                      <input
                        type="text"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value)}
                        placeholder="Nhập mã giảm giá"
                      />
                      <button className="apply-btn" onClick={handleApplyPromoCode}>Áp dụng</button>
                    </div>
                  </div>
                  <div className="summary-total">
                    <span className="label">Tổng cộng</span>
                    <span className="value">
                      {formatPrice(cartSummary.total)} đ
                    </span>
                  </div>
                  <a
                    className="checkout-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isCheckingOut) return;

                      if (selectedItems.length === 0) {
                        toast.error("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
                        return;
                      }

                      const outOfStock = cartItems.filter(
                        (item) =>
                          selectedItems.includes(item.id) && item.quantity > item.availableStock
                      );

                      if (outOfStock.length > 0) {
                        toast.error(`Sản phẩm đã hết hàng trong kho.`);
                        return;
                      }
                      navigate("/thanh-toan", { state: { selectedItems } });
                    }}
                  >
                    Tiến hành thanh toán
                  </a>



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
        <section className="policy-product mt-94">
          <PolicyProduct />
        </section>

        {/* FAQ Section */}
        <section className="get-in-touch mt-94">
          <GetInTouch />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
