import React from "react";
import { Link } from "react-router-dom";
import { EmptyState, PageSectionSkeleton, RetryState } from "@/components/StateFeedback";
import { useAccountContext } from "../useAccountContext";

const OrdersTab: React.FC = () => {
  const {
    apiOrders,
    isLoading,
    error,
    userInfo,
    getDisplayStatus,
    formatPrice,
    getFirstImageUrl,
    calculateTotalQuantity,
    getStatusClass,
    getStatusDisplayName,
    retryFetchOrders,
  } = useAccountContext();

  return (
    <div className="content-section orders-section">
      <div className="content-section orders-header">
        <h2 className="orders-header__name">
          Xin chào, {userInfo.name}
        </h2>
        <div className="orders-header__email">
          Email: {userInfo.email}
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <PageSectionSkeleton variant="account-list" count={3} />
        </div>
      ) : error ? (
        <div className="error-state">
          <RetryState
            message={error}
            onRetry={retryFetchOrders}
            secondaryActionLabel="Khám phá sản phẩm"
            secondaryActionTo="/san-pham"
          />
        </div>
      ) : apiOrders.length > 0 ? (
        <div className="order-list">
          {apiOrders.map((order) => (
            <div className="order-item" key={order.id}>
              <div className="order-header">
                <div className="aside">
                  <div className="order-info">
                    <span className="label">Đơn hàng: </span>
                    <span className="value">{order.order_hash}</span>
                  </div>
                  <div className="order-info">
                    <span className="label">Ngày đặt: </span>
                    <span className="value">
                      {new Date(order.date).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
                <div className="order-status">
                  <span
                    className={`status ${getStatusClass(getDisplayStatus(order))}`}
                  >
                    {getStatusDisplayName(getDisplayStatus(order))}
                  </span>
                </div>
              </div>

              <div className="order-content">
                {order.products && order.products.length > 0 && (
                  <>
                    <div className="product-image">
                      <img
                        src={getFirstImageUrl(order.products[0].image)}
                        alt={order.products[0].name}
                      />
                    </div>

                    <div className="product-details">
                      <h4>{order.products[0].name}</h4>
                      <span className="product-price">
                        <span className="label">Thành tiền: </span>
                        {formatPrice(parseFloat(order.total))}
                      </span>
                      <div className="product-meta">
                        <div className="meta-item">
                          <span className="label">Số lượng sản phẩm:</span>
                          <span className="value">
                            {calculateTotalQuantity(order)}
                          </span>
                        </div>
                      </div>
                      <div className="product-link">
                        <Link to={`/san-pham/${order.products[0].slug}`}>
                          Xem sản phẩm
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                <div className="order-pricing">
                  <h4>Thông tin</h4>
                  <div className="price-info">
                    <span className="label">Tên người nhận: </span>
                    <span className="value">{order.recipientName}</span>
                  </div>
                  <div className="delivery-info">
                    <span className="label">Số điện thoại: </span>
                    <span className="value">{order.recipientPhone}</span>
                  </div>
                  <div className="total-info">
                    <span className="label">Địa chỉ: </span>
                    <span className="value">
                      {order.address}
                    </span>
                  </div>
                  <div className="order-actions">
                    {/* <button className="btn-outline">
                      {order.status === "PENDING" ? "Chờ" : "Xem"}
                    </button> */}
                    <Link
                      to={`/chi-tiet-don-hang/${order.order_hash}`}
                      className="btn-primary"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <EmptyState
            title="Bạn chưa có đơn hàng nào"
            message="Các đơn hàng mới sẽ xuất hiện tại đây sau khi bạn hoàn tất thanh toán."
            actionLabel="Khám phá sản phẩm"
            actionTo="/san-pham"
          />
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
