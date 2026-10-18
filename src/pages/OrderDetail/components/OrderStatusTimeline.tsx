import React from "react";
import { useOrderDetailContext } from "../useOrderDetailContext";

const OrderStatusTimeline: React.FC = () => {
  const {
    order,
    allProductsReviewed,
    formatDate,
    translateOrderStatus,
    getProcessType,
    getProcessSteps,
    getCurrentStep,
  } = useOrderDetailContext();

  return (
    <div className="order-overview">
      <div className="order-header">
        <div className="order-id">
          <h2>Đơn hàng: {order.order_hash}</h2>
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
            const currentStep = getCurrentStep(order.status, processType, order.statusStep || 1, order);
            
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
  );
};

export default OrderStatusTimeline;
