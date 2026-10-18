import { Suspense, lazy } from "react";
import { PageSectionSkeleton, RetryState } from "@/components/StateFeedback";
import { useOrderDetail } from "./useOrderDetail";
import { OrderDetailCtx } from "./useOrderDetailContext";
import OrderStatusTimeline from "./components/OrderStatusTimeline";
import OrderSummary from "./components/OrderSummary";
import OrderItems from "./components/OrderItems";
import OrderActions from "./components/OrderActions";

const ReturnOrderModal = lazy(() => import("./components/ReturnOrderModal"));
const CancelOrderModal = lazy(() => import("@/components/CancelOrderModal"));

const OrderDetail: React.FC = () => {
  const page = useOrderDetail();
  const {
    order,
    isOrderLoading,
    orderLoadError,
    isProcessingReturn,
    isProcessingCancel,
    showReturnModal,
    showCancelModal,
    fetchOrder,
    handleReturnOrderSubmit,
    handleReturnModalCancel,
    handleCancelOrderSubmit,
    handleCancelModalClose,
  } = page;

  if (isOrderLoading) {
    return (
      <>
        <div className="detail-order-page">
          <div className="container">
            <PageSectionSkeleton variant="cart-list" count={2} />
          </div>
        </div>
      </>
    );
  }

  if (!order || orderLoadError) {
    return (
      <>
        <div className="detail-order-page">
          <div className="container">
            <RetryState
              message={orderLoadError || "Không tìm thấy thông tin đơn hàng."}
              onRetry={fetchOrder}
              secondaryActionLabel="Quay lại tài khoản"
              secondaryActionTo="/tai-khoan/don-hang"
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <OrderDetailCtx.Provider value={{ ...page, order }}>

      <section className="detail-order-page">
        <div className="container">
          <OrderStatusTimeline />

          <OrderSummary />

          <OrderItems />

          <OrderActions />
        </div>
      </section>


      {/* Modal trả hàng */}
      {showReturnModal && (
        <Suspense fallback={null}>
          <ReturnOrderModal
            visible={showReturnModal}
            onCancel={handleReturnModalCancel}
            onSubmit={handleReturnOrderSubmit}
            loading={isProcessingReturn}
          />
        </Suspense>
      )}

      {/* Modal hủy đơn hàng */}
      {showCancelModal && (
        <Suspense fallback={null}>
          <CancelOrderModal
            visible={showCancelModal}
            onCancel={handleCancelModalClose}
            onSubmit={handleCancelOrderSubmit}
            loading={isProcessingCancel}
            orderHash={order?.order_hash || ''}
          />
        </Suspense>
      )}
    </OrderDetailCtx.Provider>
  );
};

export default OrderDetail;
