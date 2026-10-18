import React from "react";
import { Link } from "react-router-dom";
import type { OrderProduct } from "../orderDetail.types";
import { firstImageUrl } from "../orderDetail.helpers";
import { useOrderDetailContext } from "../useOrderDetailContext";

const OrderItems: React.FC = () => {
  const {
    order,
    starFilledImg,
    starOutlineImg,
    ratingLabels,
    showReviewForm,
    currentReviewProduct,
    reviewTitle,
    setReviewTitle,
    reviewDescription,
    setReviewDescription,
    reviewRating,
    isSubmittingReview,
    reviewMessage,
    cancellingProductId,
    getDisplayStatus,
    isProductCancelled,
    canCancelProduct,
    getCannotCancelReason,
    openReviewForm,
    closeReviewForm,
    handleRatingChange,
    handleSubmitReview,
    handleCancelProduct,
    formatPrice1,
  } = useOrderDetailContext();

  return (
    <div className="order-summary">
      <div className="summary-header">
        <h3>Tổng sản phẩm</h3>
      </div>
      <div className="product-list">
        {order.products?.map((product: OrderProduct) => {
          const orderHash = order.order_hash;
          const isCancelled = isProductCancelled(product, orderHash);
          const displayStatus = getDisplayStatus(product, orderHash);
          
          return (
            <div className="product-item" key={product.order_item_id}>
              <div className="product-image">
                <img
                  src={firstImageUrl(product.image)}
                  alt={product.name}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/images/default.jpg";
                  }}
                />
              </div>
              <div className="product-detailss">
                <h4>{product.name}</h4>
                <div className="product-meta">
                  {product.color && product.color.hex && (
                    <span
                      className="product-color"
                      style={{ backgroundColor: product.color.hex }}
                      title={`Màu: ${
                        product.color.name || product.color.hex
                      }`}
                    ></span>
                  )}
                  {product.size && <span>Size: {product.size}</span>}{" "}
                  <span>Số lượng: {product.quantity}</span>
                </div>
                <span>Giá: {formatPrice1(product.price)}đ</span>
                {displayStatus && (
                  <div className="product-status cancelled">
                    <span>{displayStatus}</span>
                  </div>
                )}
              </div>
              <div className="product-price">
                <p>
                  Thành tiền:{" "}
                  <span>
                    {formatPrice1(product.price * product.quantity)}đ
                  </span>
                </p>
              </div>
              <div className="product-actions">
                <Link to={`/san-pham/${product.slug}`}>
                  <button className="btn-product-action">
                    Xem chi tiết
                  </button>
                </Link>
                {isCancelled ? (
                  <Link to={`/san-pham/${product.slug}`}>
                    <button className="btn-buy-again">Mua lại</button>
                  </Link>
                ) : canCancelProduct(product) ? (
                  <button
                    onClick={() => handleCancelProduct(product)}
                    className="btn-cancel-product"
                    disabled={cancellingProductId === product.order_item_id}
                  >
                    {cancellingProductId === product.order_item_id ? (
                      <>
                        <span className="spinner"></span> Đang hủy...
                      </>
                    ) : (
                      "Hủy sản phẩm"
                    )}
                  </button>
                ) : displayStatus.includes('trả hàng') ? (
                  <button 
                    className="status-return-process" 
                    disabled 
                    title={getCannotCancelReason(product)}
                  >
                    Đang trả hàng
                  </button>
                ) : order.status === "SUCCESS" && !product.has_comment ? (
                  <button
                    onClick={() => openReviewForm(product)}
                    className="btn-product-review"
                  >
                    Đánh giá
                  </button>
                ) : order.status === "SUCCESS" && product.has_comment ? (
                  <button className="status-reviewed">Đã đánh giá</button>
                ) : (
                  <button 
                    className="status-cantnot-review"
                    title={getCannotCancelReason(product)}
                  >
                    Chưa thể đánh giá
                  </button>
                )}
              </div>

              {showReviewForm &&
                currentReviewProduct?.order_item_id ===
                  product.order_item_id && (
                  <div className="review-form-section">
                    <h4>Đánh giá sản phẩm: {product.name}</h4>
                    <form onSubmit={handleSubmitReview}>
                      <div className="form-group">
                        <label className="form-label">
                          Chất lượng sản phẩm:
                        </label>
                        <div className="star-rating-container">
                          {Array.from({ length: 5 }, (_, index) => (
                            <button
                              key={index}
                              type="button"
                              className="star-button"
                              onClick={() => handleRatingChange(index + 1)}
                            >
                              <img
                                src={
                                  reviewRating > index
                                    ? starFilledImg
                                    : starOutlineImg
                                }
                                alt={
                                  reviewRating > index
                                    ? "Sao đã chọn"
                                    : "Sao chưa chọn"
                                }
                                className="star-icon-img"
                              />
                            </button>
                          ))}
                          <br />
                        </div>
                        <span className="rating-text">
                          {reviewRating > 0 ? (
                            <>
                              <span className="form-label rating-description">
                                {ratingLabels[reviewRating]}{" "}
                                {`(${reviewRating}/5 sao)`}
                              </span>
                            </>
                          ) : (
                            ratingLabels[0]
                          )}
                        </span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="reviewTitle" className="form-label">
                          Tiêu đề:
                        </label>
                        <input
                          type="text"
                          id="reviewTitle"
                          className="form-input"
                          value={reviewTitle}
                          onChange={(e) => setReviewTitle(e.target.value)}
                          placeholder="Tiêu đề đánh giá (VD: Sản phẩm rất tốt!)"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="reviewDescription"
                          className="form-label"
                        >
                          Nội dung đánh giá:
                        </label>
                        <textarea
                          id="reviewDescription"
                          className="form-textarea"
                          rows={4}
                          value={reviewDescription}
                          onChange={(e) =>
                            setReviewDescription(e.target.value)
                          }
                          placeholder="Viết đánh giá của bạn về sản phẩm..."
                          required
                        ></textarea>
                      </div>
                      {reviewMessage && (
                        <p
                          className={`review-message ${
                            reviewMessage.includes("thành công")
                              ? "success"
                              : "error"
                          }`}
                        >
                          {reviewMessage}
                        </p>
                      )}
                      <div className="form-actions">
                        <button
                          type="submit"
                          className="submit-review-button"
                          disabled={isSubmittingReview}
                        >
                          {isSubmittingReview ? (
                            <>
                              <span className="spinner"></span> Đang gửi...
                            </>
                          ) : (
                            <>Gửi đánh giá</>
                          )}
                        </button>
                        <button
                          type="button"
                          className="cancel-review-button"
                          onClick={closeReviewForm}
                          disabled={isSubmittingReview}
                        >
                          Hủy
                        </button>
                      </div>
                    </form>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderItems;
