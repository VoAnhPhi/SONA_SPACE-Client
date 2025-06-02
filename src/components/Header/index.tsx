const Header = () => {
  return (
    <>
      {/* Header/Navigation */}
      <header className="header">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo">
              <a href="/">
                <img src="/images/logo.png" alt="SONA Space" />
              </a>
            </div>
            <nav className="main-nav">
              <ul>
                <li>
                  <a href="/" className="active">
                    Trang Chủ
                  </a>
                </li>
                <li>
                  <a href="/san-pham">Sản Phẩm</a>
                </li>
                <li>
                  <a href="/khong-gian">Không Gian</a>
                </li>
                <li>
                  <a href="/dich-vu-thiet-ke">Thiết Kế Nội Thất</a>
                </li>
                <li>
                  <a href="/ho-so-kien-truc">Hồ Sơ Kiến Trúc</a>
                </li>
                <li>
                  <a href="/tin-tuc">Tin Tức</a>
                </li>
                <li>
                  <a href="/ve-chung-toi">Về Chúng Tôi</a>
                </li>
                <li>
                  <a href="/lien-he">Liên Hệ</a>
                </li>
              </ul>
            </nav>
            <div className="header-actions">
              <div className="header-actions-icons">
                <button className="btn-icon search-btn">
                  <i className="icon-search">
                    <img src="/images/icons/magnifier.svg" alt="search" />
                  </i>
                </button>
                <button className="btn-icon cart-btn">
                  <img src="/images/icons/cart.svg" alt="cart" />
                </button>
                <button className="btn-icon wishlist-btn">
                  <img src="/images/icons/wishlist.svg" alt="wishlist" />
                </button>
              </div>
              <span>|</span>
              <div className="header-actions-buttons">
                <a href="/dang-nhap" className="btn btn-outline">
                  Đăng Nhập
                </a>
                <a href="/dang-ky" className="btn btn-primary">
                  Đăng Ký
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
