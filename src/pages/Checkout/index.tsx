import { Link } from "react-router-dom";
import { getAuthToken } from "@/shared/auth/token-storage";
import { ToastContainer } from "react-toastify";
import { EmptyState, PageSectionSkeleton, RetryState } from "@/components/StateFeedback";
import { useCheckout } from "./useCheckout";
import { CheckoutCtx } from "./useCheckoutContext";
import ShippingAddressForm from "./components/ShippingAddressForm";
import PaymentMethodPicker from "./components/PaymentMethodPicker";
import CheckoutSummary from "./components/CheckoutSummary";
import AddressEditModal from "./components/AddressEditModal";



const Checkout: React.FC = () => {
  const page = useCheckout();
  const {
    agreeToTerms,
    setAgreeToTerms,
    cartItems,
    isLoading,
    isCartLoading,
    cartLoadError,
    setPaymentReloadToken,
    handleSubmit,
    showAddressModal,
  } = page;


  return (
    <CheckoutCtx.Provider value={page}>
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
            {/* A guest is known at render time: no skeleton flash before the sign-in prompt */}
            {!getAuthToken() ? (
              <EmptyState
                title="Đăng nhập để thanh toán"
                message="Vui lòng đăng nhập để xem giỏ hàng và hoàn tất đơn hàng của bạn."
                actionLabel="Đăng nhập"
                actionTo="/dang-nhap"
                secondaryActionLabel="Quay lại giỏ hàng"
                secondaryActionTo="/gio-hang"
              />
            ) : isCartLoading ? (
              <PageSectionSkeleton variant="cart-list" count={3} />
            ) : cartLoadError ? (
              <RetryState
                message={cartLoadError}
                onRetry={() => setPaymentReloadToken((current) => current + 1)}
                secondaryActionLabel="Quay lại giỏ hàng"
                secondaryActionTo="/gio-hang"
              />
            ) : cartItems.length === 0 ? (
              <EmptyState
                title="Chưa có sản phẩm để thanh toán"
                message="Hãy chọn sản phẩm trong giỏ hàng trước khi tiếp tục thanh toán."
                actionLabel="Quay lại giỏ hàng"
                actionTo="/gio-hang"
                secondaryActionLabel="Khám phá sản phẩm"
                secondaryActionTo="/san-pham"
              />
            ) : (
            <div className="pay-info">
              <form onSubmit={handleSubmit} className="pay-info-left">
                <ShippingAddressForm />


                <PaymentMethodPicker />
                <div className="info-left-clause">
                  <input type="checkbox" id="clause" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} required />
                  <span>Tôi đồng ý với <Link to={`/dieu-khoan-su-dung`}>điều khoản và điều kiện</Link> của SONA SPACE</span>
                </div>

              </form>
              <CheckoutSummary />


            </div>
            )}

          </div>
        </div>
      </div>
      {isLoading && (
        <div className="fullscreen-loading">
          <div className="spinner" />
        </div>
      )}

      {showAddressModal && (
        <AddressEditModal />
      )}
      <ToastContainer position="top-right"
        autoClose={3000}
        style={{ marginTop: "100px" }} />
    </CheckoutCtx.Provider>
  );
};

export default Checkout;
