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
                  <a href="/san-pham">
                    {" "}
                    Sản Phẩm
                    <img src="../public/images/icons/arrow-down.svg" alt="" />
                    <div className="sub-menu">
                      <div className="container">
                        <div className="sub-menu-wrapper">
                          <div className="sub-menu-column">
                            <ul>
                              <li>
                                <a href="/san-pham/sofa">Sofa</a>
                              </li>
                              <li>
                                <a href="/san-pham/ban-lam-viec">
                                  Bàn làm việc
                                </a>
                              </li>
                              <li>
                                <a href="/san-pham/tab-dau-giuong">
                                  Tab đầu giường
                                </a>
                              </li>
                              <li>
                                <a href="/san-pham/tu-trang-tri">
                                  Tủ trang trí
                                </a>
                              </li>
                              <li>
                                <a href="/san-pham/tham">Thảm</a>
                              </li>
                              <li>
                                <a href="/san-pham/ghe-don">Ghế đơn</a>
                              </li>
                              <li>
                                <a href="/san-pham/den-ban-an">Đèn bàn ăn</a>
                              </li>
                              <li>
                                <a href="/san-pham/ghe-van-phong">
                                  Ghế văn phòng
                                </a>
                              </li>
                              <li>
                                <a href="/san-pham/den-trang-tri">
                                  Đèn trang trí
                                </a>
                              </li>
                              <li>
                                <a href="/san-pham/ke-sach">Kệ sách</a>
                              </li>
                            </ul>
                          </div>
                          <div className="sub-menu-products">
                            <div className="product-row">
                              <div className="product-item">
                                <a href="/san-pham/sofa">
                                  <div className="product-image"></div>
                                  <div className="product-title">Sofa</div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/ghe-don">
                                  <div className="product-image"></div>
                                  <div className="product-title">Ghế đơn</div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/ghe-banh">
                                  <div className="product-image"></div>
                                  <div className="product-title">Ghế bành</div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/ban-tra">
                                  <div className="product-image"></div>
                                  <div className="product-title">Bàn trà</div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/ke-tivi">
                                  <div className="product-image"></div>
                                  <div className="product-title">Kệ Tivi</div>
                                </a>
                              </div>
                            </div>
                            <div className="product-row">
                              <div className="product-item">
                                <a href="/san-pham/tu-trang-tri">
                                  <div className="product-image"></div>
                                  <div className="product-title">
                                    Tủ trang trí
                                  </div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/den-phong-khach">
                                  <div className="product-image"></div>
                                  <div className="product-title">
                                    Đèn phòng khách
                                  </div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/giuong-ngu">
                                  <div className="product-image"></div>
                                  <div className="product-title">
                                    Giường ngủ
                                  </div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/tu-quan-ao">
                                  <div className="product-image"></div>
                                  <div className="product-title">
                                    Tủ quần áo
                                  </div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/ban-trang-diem">
                                  <div className="product-image"></div>
                                  <div className="product-title">
                                    Bàn trang điểm
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/khong-gian">
                    Không Gian
                    <img src="../public/images/icons/arrow-down.svg" alt="" />
                    <div className="sub-menu">
                      <div className="container">
                        <div className="sub-menu-wrapper">
                          <div className="sub-menu-column">
                            <ul>
                              <li>
                                <a href="/san-pham/sofa">Sofa</a>
                              </li>
                              <li>
                                <a href="/san-pham/ban-lam-viec">
                                  Bàn làm việc
                                </a>
                              </li>
                              <li>
                                <a href="/san-pham/tab-dau-giuong">
                                  Tab đầu giường
                                </a>
                              </li>
                              <li>
                                <a href="/san-pham/tu-trang-tri">
                                  Tủ trang trí
                                </a>
                              </li>
                              <li>
                                <a href="/san-pham/tham">Thảm</a>
                              </li>
                              <li>
                                <a href="/san-pham/ghe-don">Ghế đơn</a>
                              </li>
                              <li>
                                <a href="/san-pham/den-ban-an">Đèn bàn ăn</a>
                              </li>
                              <li>
                                <a href="/san-pham/ghe-van-phong">
                                  Ghế văn phòng
                                </a>
                              </li>
                              <li>
                                <a href="/san-pham/den-trang-tri">
                                  Đèn trang trí
                                </a>
                              </li>
                              <li>
                                <a href="/san-pham/ke-sach">Kệ sách</a>
                              </li>
                            </ul>
                          </div>
                          <div className="sub-menu-products">
                            <div className="product-row">
                              <div className="product-item">
                                <a href="/san-pham/sofa">
                                  <div className="product-image"></div>
                                  <div className="product-title">Sofa</div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/ghe-don">
                                  <div className="product-image"></div>
                                  <div className="product-title">Ghế đơn</div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/ghe-banh">
                                  <div className="product-image"></div>
                                  <div className="product-title">Ghế bành</div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/ban-tra">
                                  <div className="product-image"></div>
                                  <div className="product-title">Bàn trà</div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/ke-tivi">
                                  <div className="product-image"></div>
                                  <div className="product-title">Kệ Tivi</div>
                                </a>
                              </div>
                            </div>
                            <div className="product-row">
                              <div className="product-item">
                                <a href="/san-pham/tu-trang-tri">
                                  <div className="product-image"></div>
                                  <div className="product-title">
                                    Tủ trang trí
                                  </div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/den-phong-khach">
                                  <div className="product-image"></div>
                                  <div className="product-title">
                                    Đèn phòng khách
                                  </div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/giuong-ngu">
                                  <div className="product-image"></div>
                                  <div className="product-title">
                                    Giường ngủ
                                  </div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/tu-quan-ao">
                                  <div className="product-image"></div>
                                  <div className="product-title">
                                    Tủ quần áo
                                  </div>
                                </a>
                              </div>
                              <div className="product-item">
                                <a href="/san-pham/ban-trang-diem">
                                  <div className="product-image"></div>
                                  <div className="product-title">
                                    Bàn trang điểm
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                {/* <li>
                  <a href="/dich-vu-thiet-ke">Thiết Kế Nội Thất</a>
                </li>
                <li>
                  <a href="/ho-so-kien-truc">Hồ Sơ Kiến Trúc</a>
                </li> */}
                <li>
                  <a href="/tin-tuc">Tin Tức</a>
                </li>
                <li>
                  <a href="/ve-chung-toi">Về Chúng Tôi</a>
                </li>
                {/* <li>
                  <a href="/lien-he">Liên Hệ</a>
                </li> */}
              </ul>
            </nav>
            <div className="header-actions">
              <div className="header-actions-icons">
                <button className="btn-icon search-btn">
                  <i className="icon-search">
                    <img src="/images/icons/magnifier.svg" alt="search" />
                  </i>
                  <div className="sub-search">
                    <div className="search-container container">
                      <div className="search-input-wrapper">
                        <input type="text" placeholder="Tìm kiếm sản phẩm" />
                        <button type="submit">
                          <img
                            src="../public/images/icons/magnifier-gray.svg"
                            alt="search"
                          />
                        </button>
                      </div>
                      <div className="search-content d-flex">
                        <div className="search-content-aside col-md-3">
                          <h3>Tìm kiếm nhiều</h3>
                          <div className="search-links">
                            <div className="search-link-item">
                              <a href="/search?q=sofa+phòng+khách">
                                <img
                                  src="../public/images/icons/magnifier-gray.svg"
                                  alt="search"
                                />
                                <span>sofa phòng khách</span>
                              </a>
                            </div>
                            <div className="search-link-item">
                              <a href="/search?q=giường+ngủ+gỗ+tự+nhiên">
                                <img
                                  src="../public/images/icons/magnifier-gray.svg"
                                  alt="search"
                                />
                                <span>giường ngủ gỗ tự nhiên</span>
                              </a>
                            </div>
                            <div className="search-link-item">
                              <a href="/search?q=bàn+ăn+4+ghế">
                                <img
                                  src="../public/images/icons/magnifier-gray.svg"
                                  alt="search"
                                />
                                <span>bàn ăn 4 ghế</span>
                              </a>
                            </div>
                            <div className="search-link-item">
                              <a href="/search?q=bàn+làm+việc+tại+nhà">
                                <img
                                  src="../public/images/icons/magnifier-gray.svg"
                                  alt="search"
                                />
                                <span>bàn làm việc tại nhà</span>
                              </a>
                            </div>
                            <div className="search-link-item">
                              <a href="/search?q=kệ+tivi+treo+tường">
                                <img
                                  src="../public/images/icons/magnifier-gray.svg"
                                  alt="search"
                                />
                                <span>kệ tivi treo tường</span>
                              </a>
                            </div>
                            <div className="search-link-item">
                              <a href="/search?q=thảm+trải+sàn+phòng+khách">
                                <img
                                  src="../public/images/icons/magnifier-gray.svg"
                                  alt="search"
                                />
                                <span>thảm trải sàn phòng khách</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="popular-products col-md-9">
                          <div className="product-row">
                            <div className="product-item">
                              <a href="/san-pham/sofa">
                                <div className="product-image"></div>
                                <div className="product-title">Sofa</div>
                              </a>
                            </div>
                            <div className="product-item">
                              <a href="/san-pham/ghe-don">
                                <div className="product-image"></div>
                                <div className="product-title">Ghế đơn</div>
                              </a>
                            </div>
                            <div className="product-item">
                              <a href="/san-pham/ghe-banh">
                                <div className="product-image"></div>
                                <div className="product-title">Ghế bành</div>
                              </a>
                            </div>
                            <div className="product-item">
                              <a href="/san-pham/ban-tra">
                                <div className="product-image"></div>
                                <div className="product-title">Bàn trà</div>
                              </a>
                            </div>
                            <div className="product-item">
                              <a href="/san-pham/ke-tivi">
                                <div className="product-image"></div>
                                <div className="product-title">Kệ Tivi</div>
                              </a>
                            </div>
                          </div>
                          <div className="product-row">
                            <div className="product-item">
                              <a href="/san-pham/tu-trang-tri">
                                <div className="product-image"></div>
                                <div className="product-title">
                                  Tủ trang trí
                                </div>
                              </a>
                            </div>
                            <div className="product-item">
                              <a href="/san-pham/den-phong-khach">
                                <div className="product-image"></div>
                                <div className="product-title">
                                  Đèn phòng khách
                                </div>
                              </a>
                            </div>
                            <div className="product-item">
                              <a href="/san-pham/giuong-ngu">
                                <div className="product-image"></div>
                                <div className="product-title">Giường ngủ</div>
                              </a>
                            </div>
                            <div className="product-item">
                              <a href="/san-pham/tu-quan-ao">
                                <div className="product-image"></div>
                                <div className="product-title">Tủ quần áo</div>
                              </a>
                            </div>
                            <div className="product-item">
                              <a href="/san-pham/ban-trang-diem">
                                <div className="product-image"></div>
                                <div className="product-title">
                                  Bàn trang điểm
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                <button className="btn-icon cart-btn">
                  <img src="/images/icons/cart.svg" alt="cart" />
                </button>
                <button className="btn-icon wishlist-btn">
                  <img src="/images/icons/wishlist.svg" alt="wishlist" />
                </button>
              </div>
              <span className="header-actions-separator"></span>
              <div className="header-actions-buttons">
                <a href="/dang-nhap" className="btn btn-outline">
                  Đăng Nhập
                </a>
                <a href="/dang-ky" className="btn btn-primary">
                  Đăng Ký
                </a>
              </div>
              <div className="header-hamburger">
                <button className="btn-icon hamburger-btn">
                  <img src="/images/icons/Hamburger_MD.svg" alt="hamburger" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
