import React from "react";
import CountdownTimer from "../components/CountdownTimer";
import { useAccountContext } from "../useAccountContext";

const PromoTab: React.FC = () => {
  const {
    activePromoFilter,
    setActivePromoFilter,
    formatDateTime,
    handleCountdownComplete,
    copyToClipboard,
    getFilteredPromoCodes,
  } = useAccountContext();

  return (
    <div className="content-section promo-section">
      <h2>Mã giảm giá</h2>
      <p className="promo-description-text">
        Xem và quản lý các mã giảm giá hiện có của bạn. Bạn có thể
        kiểm tra thông tin chi tiết về từng mã, bao gồm giá trị ưu
        đãi, điều kiện áp dụng và ngày hết hạn.
      </p>

      <div className="promo-section-header">
        <h3>Mã giảm giá của bạn</h3>
      </div>

      {/* Add tab filter for promo codes */}
      <div className="order-filter-tabs">
        <button
          className={activePromoFilter === "all" ? "active" : ""}
          onClick={() => setActivePromoFilter("all")}
        >
          Tất cả
        </button>
        <button
          className={activePromoFilter === "flash" ? "active" : ""}
          onClick={() => setActivePromoFilter("flash")}
        >
          Flash Sale
        </button>
        <button
          className={
            activePromoFilter === "regular" ? "active" : ""
          }
          onClick={() => setActivePromoFilter("regular")}
        >
          Thường xuyên
        </button>
      </div>

      <div className="voucher-grid">
        {getFilteredPromoCodes().map((promo, index) => {
          const isUsedUp = Number(promo.used) === 0;

          return (
            <div
              className={`voucher-card ${isUsedUp ? "voucher-disabled" : ""}`}
              key={index}
            >
              <div className="voucher-header">
                <div className="voucher-discount">{promo.discount}</div>
                <div className="voucher-type">{promo.description}</div>
              </div>

              <div className="voucher-code">
                <span>Code: {promo.code}</span>
              </div>

              {promo.isFlashSale && promo.timeRemaining && (
                <div className="flash-sale-banner">
                  <div className="flash-icon">⚡</div>
                  <div className="flash-text">Flash sale</div>
                  <CountdownTimer
                    hours={promo.timeRemaining.hours}
                    minutes={promo.timeRemaining.minutes}
                    seconds={promo.timeRemaining.seconds}
                    onComplete={() => handleCountdownComplete(index)}
                  />
                </div>
              )}

              <div className="voucher-details">
                <ul className="voucher-info-list">
                  <li>
                    <span>
                      {formatDateTime(promo.validFrom)} - {formatDateTime(promo.validUntil)}
                    </span>
                  </li>
                  <li>
                    <span>{promo.description}</span>
                  </li>
                  <li>
                    <span>Ưu đãi: Cho khách hàng</span>
                  </li>
                </ul>
              </div>

              <div className="voucher-actions">
                <button
                  className="btn-copy"
                  onClick={() => {
                    if (!isUsedUp) copyToClipboard(promo.code);
                  }}
                  disabled={isUsedUp}
                >
                  <img src="/images/icons/content_copy.svg" alt="" />
                  <span>{isUsedUp ? "Hết lượt sử dụng" : "Copy"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default PromoTab;
