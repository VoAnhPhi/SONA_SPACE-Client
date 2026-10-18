import React from "react";
import { Link } from "react-router-dom";
import { useOrderDetailContext } from "../useOrderDetailContext";

const OrderActions: React.FC = () => {
  const {
    order,
    isProcessingReturn,
    isProcessingCancel,
    areAllProductsCancelled,
    canCancelOrder,
    canReturnOrder,
    handleReturnOrder,
    handleCancelOrder,
  } = useOrderDetailContext();

  return (
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
      {/* Show "Mua lại" button if all products are cancelled */}
      {areAllProductsCancelled(order.products || [], order.order_hash) && (
        <div className="order-actions">
          <Link to="/san-pham">
            <button className="btn-primary btn-buy-again-all">
              Mua lại tất cả
            </button>
          </Link>
        </div>
      )}
      <button className="btn-outline">Liên hệ với SONA</button>
    </div>
  );
};

export default OrderActions;
