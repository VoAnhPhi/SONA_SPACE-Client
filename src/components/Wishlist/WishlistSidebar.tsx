import React, { useEffect } from 'react';
// Loại bỏ import CSS, sử dụng SCSS chung của dự án
// Các styles sẽ được lấy từ file public/scss/imports/components/_wishListSideBar.scss

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistSidebar: React.FC<WishlistSidebarProps> = ({ isOpen, onClose }) => {
  // Ngăn chặn scroll khi sidebar hiển thị
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup khi component unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`wishlist-sidebar-container ${isOpen ? 'open' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="wishlist-sidebar">
        <div className="wishlist-sidebar-header">
          <h2>Danh sách yêu thích</h2>
          <button className="close-button" onClick={onClose}>
            <img src="/images/icons/close.svg" alt="Đóng" />
          </button>
        </div>
        <div className="wishlist-sidebar-content">
          {/* Nội dung danh sách yêu thích sẽ được thêm vào đây */}
          <div className="empty-wishlist">
            <div className="empty-wishlist-icon">
              <img src="/images/icons/wishlist-empty.svg" alt="Danh sách trống" />
            </div>
            <p>Danh sách yêu thích của bạn đang trống</p>
            <a href="/san-pham" className="btn-browse">Khám phá sản phẩm</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistSidebar; 