import React from "react";
import { useOrderDetailContext } from "../useOrderDetailContext";

const OrderSummary: React.FC = () => {
  const {
    order,
    formatPrice,
  } = useOrderDetailContext();

  return (
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
              -{formatPrice(order.discount)}
            </span>
          </div>
          <div className="summary-row total">
            <span className="row1">Thành tiền:</span>
            <span className="row2">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
