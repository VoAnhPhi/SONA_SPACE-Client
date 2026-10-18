import React from "react";
import { Link } from "react-router-dom";
import { EmptyState, PageSectionSkeleton, RetryState } from "@/components/StateFeedback";
import { useAccountContext } from "../useAccountContext";

const PurchasesTab: React.FC = () => {
  const {
    activeOrderFilter,
    setActiveOrderFilter,
    isLoading,
    error,
    isCancelling,
    getProductDetails,
    getDisplayStatus,
    formatPrice,
    getFirstImageUrl,
    getStatusClass,
    getStatusDisplayName,
    getFilteredOrders,
    handleCancelOrderClick,
    retryFetchOrders,
  } = useAccountContext();

  return (
    <div className="content-section orders-management-section">
      <h2>Đơn hàng của bạn</h2>

      <div className="order-filter-tabs">
        <button
          className={activeOrderFilter === "all" ? "active" : ""}
          onClick={() => setActiveOrderFilter("all")}
        >
          Tất cả
        </button>
        <button
          className={
            activeOrderFilter === "pending" ? "active" : ""
          }
          onClick={() => setActiveOrderFilter("pending")}
        >
          Chờ xác nhận
        </button>
        <button
          className={
            activeOrderFilter === "shipping" ? "active" : ""
          }
          onClick={() => setActiveOrderFilter("shipping")}
        >
          Đang giao hàng
        </button>
        <button
          className={
            activeOrderFilter === "completed" ? "active" : ""
          }
          onClick={() => setActiveOrderFilter("completed")}
        >
          Hoàn thành
        </button>
        <button
          className={
            activeOrderFilter === "cancelled" ? "active" : ""
          }
          onClick={() => setActiveOrderFilter("cancelled")}
        >
          Đã hủy
        </button>
        <button
          className={
            activeOrderFilter === "returned" ? "active" : ""
          }
          onClick={() => setActiveOrderFilter("returned")}
        >
          Trả hàng/hoàn tiền
        </button>
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
      ) : getFilteredOrders().length > 0 ? (
        <div className="order-list-container">
          {getFilteredOrders().map((order, index) => (
            <div className="order-item" key={`order-detail-${index}`}>
              <div className="order-header">
                <div className="order-number">
                  <span>Đơn hàng: {order.order_hash}</span>
                  <span>Ngày đặt: {new Date(order.date).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="order-status">
                  <span className={`status ${getStatusClass(getDisplayStatus(order))}`}>
                    {getStatusDisplayName(getDisplayStatus(order))}
                  </span>
                </div>
              </div>

              {order.products && order.products.map((product, itemIndex) => {
                const productDetails = getProductDetails(order.id, product.id);

                let isCancelled = productDetails?.status === 'CANCELLED';

                // SUPER AGGRESSIVE FALLBACK: If order is CANCELLED, assume all products are cancelled
                if (!isCancelled && order.status === 'CANCELLED') {
                  isCancelled = true;
                }

                // Fallback: check if product has status field
                if (!isCancelled && product.status) {
                  isCancelled = product.status === 'CANCELLED';
                }

                // Another fallback: if price is "0" it might be cancelled
                if (!isCancelled && (product.price === "0" || parseFloat(product.price) === 0)) {
                  isCancelled = true;
                }

                // Additional fallback: check for can_cancel = false (might indicate already cancelled)
                if (!isCancelled && product.can_cancel === false && parseFloat(product.price) === 0) {
                  isCancelled = true;
                }

                return (
                  <div className="order-content" key={`item-${itemIndex}`}>
                    <div className="product-image">
                      <img
                        src={getFirstImageUrl(product.image)}
                        alt={product.name}
                        style={{
                          opacity: isCancelled ? 0.6 : 1,
                          filter: isCancelled ? 'grayscale(50%)' : 'none'
                        }}
                      />
                    </div>

                    <div className="product-details">
                      <h4 style={{
                        textDecoration: isCancelled ? 'line-through' : 'none',
                        color: isCancelled ? '#999' : 'inherit'
                      }}>
                        {product.name}
                        {isCancelled && <span style={{ color: '#ff4757', marginLeft: '10px', fontSize: '14px' }}>(Đã hủy)</span>}
                      </h4>
                      <p className="product-category">{product.category}</p>
                      <div className="product-price">
                        {isCancelled ? (
                          <span style={{ color: '#ff4757', fontWeight: 'bold' }}>
                            Đã hủy
                          </span>
                        ) : (
                          <span>
                            Thành tiền: {formatPrice(parseFloat(product.price) * product.quantity)}
                          </span>
                        )}
                      </div>
                      <div className="product-meta">
                        {product.color && (
                          <div className="meta-item">
                            <span>Màu: {product.color.name}</span>
                            <span
                              className="color-dot"
                              style={{ backgroundColor: product.color.hex }}
                            ></span>
                          </div>
                        )}
                        <div className="meta-item">
                          <span>Số lượng: {product.quantity}</span>
                        </div>
                      </div>
                      <div className="product-link">
                        <Link to={`/san-pham/${product.slug}`}>Xem sản phẩm</Link>
                      </div>
                    </div>

                    <div className="order-info">
                      <h4>Thông tin:</h4>
                      <div className="info-item">
                        <span className="value">
                          {order.recipientName}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="value">
                          {order.recipientPhone}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="value">
                          {order.address}
                        </span>
                      </div>

                      <div className="order-actions">
                        {order.status === "PENDING" && !isCancelled && (
                          <>
                            <button
                              className="btn-cancel-order"
                              onClick={() => handleCancelOrderClick(order.id, order.order_hash)}
                              disabled={isCancelling}
                            >
                              {isCancelling ? "Đang xử lý..." : "Hủy đơn hàng"}
                            </button>
                            <Link to={`/chi-tiet-don-hang/${order.order_hash}`} className="btn-view-details">
                              Xem chi tiết
                            </Link>
                          </>
                        )}

                        {order.status === "PENDING" && isCancelled && (
                          <>
                            <Link to={`/san-pham/${product.slug}`} className="btn-action-primary">
                              Mua lại
                            </Link>
                            <Link to={`/chi-tiet-don-hang/${order.order_hash}`} className="btn-view-details">
                              Xem chi tiết
                            </Link>
                          </>
                        )}

                        {order.status === "CONFIRMED" && (
                          <>
                            <Link to={`/chi-tiet-don-hang/${order.order_hash}`} className="btn-view-details">
                              Xem chi tiết
                            </Link>
                          </>
                        )}

                        {order.status === "SHIPPING" && (
                          <>
                            <Link to={`/chi-tiet-don-hang/${order.order_hash}`} className="btn-view-details">
                              Xem chi tiết
                            </Link>
                          </>
                        )}

                        {order.status === "SUCCESS" && (
                          <>
                            <Link to={`/san-pham/${product.slug}`} className="btn-action-primary">
                              Mua lại
                            </Link>
                            <Link to={`/chi-tiet-don-hang/${order.order_hash}`} className="btn-view-details">
                              Xem chi tiết
                            </Link>
                          </>
                        )}

                        {order.status === "CANCELLED" && (
                          <>
                            <Link to={`/san-pham/${product.slug}`} className="btn-action-primary">
                              Mua lại
                            </Link>
                            <Link to={`/chi-tiet-don-hang/${order.order_hash}`} className="btn-view-details">
                              Xem chi tiết
                            </Link>
                          </>
                        )}

                        {(order.status === "RETURNED" || order.status === "RETURN") && (
                          <>
                            <Link to={`/san-pham/${product.slug}`} className="btn-action-primary">
                              Mua lại
                            </Link>
                            <Link to={`/chi-tiet-don-hang/${order.order_hash}`} className="btn-view-details">
                              Xem chi tiết
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <EmptyState
            title="Không có đơn hàng nào trong trạng thái này"
            message="Hãy đổi bộ lọc hoặc tiếp tục mua sắm để tạo đơn hàng mới."
            actionLabel="Tiếp tục mua sắm"
            actionTo="/san-pham"
          />
        </div>
      )}
    </div>
  );
};

export default PurchasesTab;
