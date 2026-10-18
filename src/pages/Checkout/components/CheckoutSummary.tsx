import React from "react";
import { InlineErrorState } from "@/components/StateFeedback";
import { useCheckoutContext } from "../useCheckoutContext";

const CheckoutSummary: React.FC = () => {
  const {
    cartItems,
    promoCodeInput,
    isLoading,
    checkoutInlineError,
    orderSummary,
    formatPrice,
    handleSubmit,
  } = useCheckoutContext();

  return (
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
      {checkoutInlineError && (
        <InlineErrorState message={checkoutInlineError} />
      )}
      <button
        type="button"
        className={`checkout-btn ${isLoading ? "loading" : ""}`}
        onClick={handleSubmit}
        disabled={isLoading || cartItems.length === 0}
        aria-busy={isLoading}
      >
        {isLoading ? "Đang xử lý..." : "Tiến hành thanh toán"}
      </button>
    </div>
  );
};

export default CheckoutSummary;
