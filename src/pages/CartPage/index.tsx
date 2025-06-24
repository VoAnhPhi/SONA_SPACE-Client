import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GetInTouch from "../../components/GetInTouch";
import PolicyProduct from "../../components/Policy";
import { useAuth } from "../../contexts/AuthContext";
import { loadCartService, updateCartQuantityService, removeFromCartService, clearCartService } from "../../services/cartService";

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


const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    shipping: 30000,
    discount: 0,
    total: 0,
  });

const recalculateSummary = (items: CartItemProps[]) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 30000;
  const discount = 0;
  const total = subtotal + shipping - discount;
  setCartSummary({ subtotal, shipping, discount, total });
};

  const loadWishlist = async () => {
    const { success, wishlistItems, message } = await loadCartService();
    if (success && wishlistItems) {
      console.log("Danh sách sản phẩm trong wishlist:", wishlistItems);

      const formattedItems = wishlistItems.map((item: any, index: number) => ({
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

      setCartItems(formattedItems);

      const subtotal = formattedItems.reduce(
        (total: number, item: any) => total + item.price * item.quantity,
        0
      );

      recalculateSummary(formattedItems);

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
        recalculateSummary(updatedItems); // ← cập nhật lại tổng tiền
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
      recalculateSummary(updatedItems); // ← cập nhật lại tổng tiền
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
      } else {
        console.log(result.message);
      }
    } catch (error) {
      alert("Lỗi khi xóa giỏ hàng.");
    }
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
                  {/* <div className="summary-row discount">
                    <span className="label">Thành viên giảm giá:</span>
                    <span className="value">
                      -{cartSummary.discountPercent}%
                    </span>
                  </div> */}
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
                  <Link to="/thanh-toan" className="checkout-btn">Tiến hành thanh toán</Link>
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
