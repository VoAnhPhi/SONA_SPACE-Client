import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

type ActionProps = {
  label?: string;
  to?: string;
  onClick?: () => void;
};

type SkeletonBlockProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  className = "",
  width,
  height,
}) => (
  <span
    className={`state-skeleton-block ${className}`.trim()}
    style={{ width, height }}
    aria-hidden="true"
  />
);

export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className = "" }) => (
  <div className={`state-skeleton-text ${className}`.trim()} aria-hidden="true">
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonBlock
        key={index}
        className="state-skeleton-text__line"
        width={index === lines - 1 ? "72%" : "100%"}
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div className={`state-skeleton-card ${className}`.trim()} aria-hidden="true">
    <SkeletonBlock className="state-skeleton-card__image" />
    <div className="state-skeleton-card__body">
      <SkeletonText lines={2} />
      <SkeletonBlock width="45%" height={18} />
    </div>
  </div>
);

export const PageSectionSkeleton: React.FC<{
  variant?: "product-grid" | "product-detail" | "cart-list" | "account-list";
  count?: number;
  className?: string;
}> = ({ variant = "product-grid", count = 4, className = "" }) => {
  if (variant === "product-detail") {
    return (
      <div
        className={`state-page-skeleton state-page-skeleton--detail ${className}`.trim()}
        aria-label="Đang tải nội dung"
      >
        <div className="container">
          <div className="state-detail-skeleton">
            <div className="state-detail-skeleton__gallery">
              <SkeletonBlock className="state-detail-skeleton__hero" />
              <div className="state-detail-skeleton__thumbs">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonBlock key={index} />
                ))}
              </div>
            </div>
            <div className="state-detail-skeleton__content">
              <SkeletonBlock width="70%" height={34} />
              <SkeletonBlock width="42%" height={18} />
              <SkeletonBlock width="34%" height={28} />
              <SkeletonText lines={4} />
              <div className="state-detail-skeleton__actions">
                <SkeletonBlock height={48} />
                <SkeletonBlock height={48} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "cart-list" || variant === "account-list") {
    return (
      <div
        className={`state-page-skeleton state-page-skeleton--list ${className}`.trim()}
        aria-label="Đang tải nội dung"
      >
        {Array.from({ length: count }).map((_, index) => (
          <div className="state-list-skeleton" key={index}>
            <SkeletonBlock className="state-list-skeleton__image" />
            <div className="state-list-skeleton__content">
              <SkeletonText lines={3} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`state-page-skeleton state-page-skeleton--grid ${className}`.trim()}
      aria-label="Đang tải nội dung"
    >
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

const ActionButton: React.FC<ActionProps & { className?: string }> = ({
  label,
  to,
  onClick,
  className = "",
}) => {
  if (!label) return null;

  if (to) {
    return (
      <Link className={className} to={to}>
        {label}
      </Link>
    );
  }

  return (
    <button className={className} type="button" onClick={onClick}>
      {label}
    </button>
  );
};

export const EmptyState: React.FC<{
  title: string;
  message?: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  secondaryActionTo?: string;
}> = ({
  title,
  message,
  actionLabel,
  actionTo,
  onAction,
  secondaryActionLabel,
  secondaryActionTo,
}) => (
  <div className="state-feedback state-feedback--empty">
    <div className="state-feedback__icon" aria-hidden="true">
      <span />
    </div>
    <h3>{title}</h3>
    {message && <p>{message}</p>}
    <div className="state-feedback__actions">
      <ActionButton
        className="state-feedback__button state-feedback__button--primary"
        label={actionLabel}
        to={actionTo}
        onClick={onAction}
      />
      <ActionButton
        className="state-feedback__button state-feedback__button--secondary"
        label={secondaryActionLabel}
        to={secondaryActionTo}
      />
    </div>
  </div>
);

export const InlineErrorState: React.FC<{
  message: string;
  onRetry?: () => void;
}> = ({ message, onRetry }) => (
  <div className="state-inline-error" role="status">
    <span>{message}</span>
    {onRetry && (
      <button type="button" onClick={onRetry}>
        Thử lại
      </button>
    )}
  </div>
);

export const RetryState: React.FC<{
  title?: string;
  message: string;
  actionLabel?: string;
  onRetry: () => void;
  secondaryActionLabel?: string;
  secondaryActionTo?: string;
}> = ({
  title = "Không thể tải dữ liệu",
  message,
  actionLabel = "Thử lại",
  onRetry,
  secondaryActionLabel,
  secondaryActionTo,
}) => (
  <div className="state-feedback state-feedback--error" role="alert">
    <div className="state-feedback__icon" aria-hidden="true">
      <span />
    </div>
    <h3>{title}</h3>
    <p>{message}</p>
    <div className="state-feedback__actions">
      <ActionButton
        className="state-feedback__button state-feedback__button--primary"
        label={actionLabel}
        onClick={onRetry}
      />
      <ActionButton
        className="state-feedback__button state-feedback__button--secondary"
        label={secondaryActionLabel}
        to={secondaryActionTo}
      />
    </div>
  </div>
);
