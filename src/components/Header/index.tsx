import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getAllCategories } from "../../api/category";
import { getAllRooms } from "../../api/room";
import type { Category, Room } from "../../types";
import { Link } from "react-router-dom";
import WishlistSidebar from "../Wishlist/WishlistSidebar";
import MiniCart from "../../components/MiniCart";

const Header = () => {
  // State để lưu trạng thái active của nav item
  const [activeNavItem, setActiveNavItem] = useState<string>("/");
  const { isAuthenticated, user, logout } = useAuth();
  // State để lưu danh mục sản phẩm từ API
  const [categories, setCategories] = useState<Category[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [loadingRooms, setLoadingRooms] = useState<boolean>(true);
  // State để quản lý hiển thị sidebar wishlist
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  // State để quản lý hiển thị mini cart trên mobile
  const [isMiniCartOpen, setIsMiniCartOpen] = useState<boolean>(false);

  // Ref cho mini cart component để truy cập hàm toggleMiniCart
  const miniCartRef = useRef<any>(null);
  const openMiniCart = () => {
    miniCartRef.current?.toggleMiniCart(); // Phải gọi hàm này để show & load
  };
  // Lấy tên cuối của người dùng
  const getLastName = (fullName: string | undefined) => {
    if (!fullName) return "";
    const nameParts = fullName.split(" ");
    return nameParts[nameParts.length - 1];
  };

  // Khi component mount, kiểm tra localStorage và pathname hiện tại để set active
  useEffect(() => {
    // Lấy active path từ localStorage nếu có
    const savedActivePath = localStorage.getItem("activeNavPath");

    // Lấy pathname hiện tại từ URL
    const currentPath = window.location.pathname;

    // Nếu có savedActivePath và người dùng không đang ở một trang khác, sử dụng savedActivePath
    // Ngược lại, sử dụng currentPath
    if (savedActivePath && currentPath === "/") {
      setActiveNavItem(savedActivePath);
    } else {
      setActiveNavItem(currentPath);
    }
  }, []);

  // Fetch danh mục sản phẩm khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await getAllCategories();
        console.log("Fetched categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    const fetchRooms = async () => {
      try {
        setLoadingRooms(true);
        const data = await getAllRooms();
        console.log("Fetched rooms:", data);
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoadingRooms(false);
      }
    };

    fetchCategories();
    fetchRooms();
  }, []);

  // Hàm xử lý khi click vào nav item
  const handleNavClick = (path: string): void => {
    setActiveNavItem(path);
    localStorage.setItem("activeNavPath", path);
  };

  // Kiểm tra xem một path có active không
  const isActive = (path: string): boolean => {
    return activeNavItem === path;
  };

  // Tạo nhóm danh mục theo hàng (5 danh mục mỗi hàng)
  const getCategoryRows = () => {
    if (!categories.length) return [];

    // Sắp xếp danh mục theo priority (ưu tiên)
    const sortedCategories = [...categories].sort(
      (a, b) => (a.category_priority || 999) - (b.category_priority || 999)
    );

    // Chia thành các hàng, mỗi hàng tối đa 5 danh mục
    const rows = [];
    for (let i = 0; i < sortedCategories.length; i += 5) {
      rows.push(sortedCategories.slice(i, i + 5));
    }

    return rows;
  };

  // Tạo nhóm phòng theo hàng (5 phòng mỗi hàng)
  const getRoomRows = () => {
    if (!rooms.length) return [];

    // Chia thành các hàng, mỗi hàng tối đa 5 phòng
    const rows = [];
    for (let i = 0; i < rooms.length; i += 5) {
      rows.push(rooms.slice(i, i + 5));
    }

    return rows;
  };

  // Toggle wishlist sidebar
  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
  };

  // Toggle mini cart khi click trên mobile
  const handleMiniCartClick = (e: React.MouseEvent) => {
    // Ngăn chặn chuyển hướng khi nhấp vào button
    e.preventDefault();

    // Kiểm tra xem có phải là mobile không (dựa theo kích thước màn hình)
    if (window.innerWidth < 768) {
      // Ngăn chặn sự kiện lan truyền để không mở link khi click vào button
      e.stopPropagation();

      // Toggle mini cart
      setIsMiniCartOpen(!isMiniCartOpen);

      // Nếu có ref đến component MiniCart
      if (
        miniCartRef.current &&
        typeof miniCartRef.current.toggleMiniCart === "function"
      ) {
        miniCartRef.current.toggleMiniCart();
      }
    }
  };

  const categoryRows = getCategoryRows();
  const roomRows = getRoomRows();

  return (
    <>
      {/* Header/Navigation */}
      <header className="header">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo">
              <a href="/" onClick={() => handleNavClick("/")}>
                <img src="/images/logo.png" alt="SONA Space" />
              </a>
            </div>
            <nav className="main-nav">
              <ul>
                <li>
                  <a
                    href="/"
                    className={isActive("/") ? "active" : ""}
                    onClick={() => handleNavClick("/")}
                  >
                    Trang Chủ
                  </a>
                </li>
                <li>
                  <a
                    href="/san-pham"
                    className={isActive("/san-pham") ? "active" : ""}
                    onClick={() => handleNavClick("/san-pham")}
                  >
                    {" "}
                    Sản Phẩm
                    <img className="arrow-icon" alt="arrow" />
                    <div className="sub-menu">
                      <div className="container">
                        <div className="sub-menu-wrapper">
                          <div className="sub-menu-column">
                            <ul>
                              {loadingCategories ? (
                                <li>
                                  <span>Đang tải danh mục...</span>
                                </li>
                              ) : (
                                categories
                                  .sort(
                                    (a, b) =>
                                      (a.category_priority || 999) -
                                      (b.category_priority || 999)
                                  )
                                  .slice(0, 10)
                                  .map((category) => (
                                    <li
                                      key={`product-sidebar-${category.category_id}`}
                                    >
                                      <a
                                        href={`/san-pham/${category.slug}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleNavClick(
                                            `/san-pham/${category.slug}`
                                          );
                                        }}
                                      >
                                        {category.category_name}
                                      </a>
                                    </li>
                                  ))
                              )}
                            </ul>
                          </div>
                          <div className="sub-menu-products">
                            <h4 className="title">Sản phẩm nội thất HOT</h4>
                            {loadingCategories ? (
                              <div className="loading-categories">
                                Đang tải danh mục...
                              </div>
                            ) : (
                              categoryRows.map((row, rowIndex) => (
                                <div
                                  className="product-row"
                                  key={`row-${rowIndex}`}
                                >
                                  {row.map((category) => (
                                    <div
                                      className="product-item"
                                      key={`cat-${category.category_id}`}
                                    >
                                      <a
                                        href={`/san-pham/${category.slug}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleNavClick(
                                            `/san-pham/${category.slug}`
                                          );
                                        }}
                                      >
                                        <div
                                          className="product-image"
                                          style={{
                                            backgroundImage: `url(${category.category_image})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                          }}
                                        ></div>
                                        <div className="product-title">
                                          {category.category_name}
                                        </div>
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="/khong-gian"
                    className={isActive("/khong-gian") ? "active" : ""}
                    onClick={() => handleNavClick("/khong-gian")}
                  >
                    Không Gian
                    <img className="arrow-icon" alt="arrow" />
                    <div className="sub-menu">
                      <div className="container">
                        <div className="sub-menu-wrapper">
                          <div className="sub-menu-column">
                            <ul>
                              {loadingRooms ? (
                                <li>
                                  <span>Đang tải không gian...</span>
                                </li>
                              ) : (
                                rooms.slice(0, 10).map((room) => (
                                  <li key={`space-sidebar-${room.room_id}`}>
                                    <a
                                      href={`/khong-gian/${room.slug}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleNavClick(
                                          `/khong-gian/${room.slug}`
                                        );
                                      }}
                                    >
                                      {room.room_name}
                                    </a>
                                  </li>
                                ))
                              )}
                            </ul>
                          </div>
                          <div className="sub-menu-products">
                            <h4 className="title">Không gian nội thất</h4>
                            {loadingRooms ? (
                              <div className="loading-categories">
                                Đang tải không gian...
                              </div>
                            ) : (
                              roomRows.map((row, rowIndex) => (
                                <div
                                  className="product-row"
                                  key={`space-row-${rowIndex}`}
                                >
                                  {row.map((room) => (
                                    <div
                                      className="product-item"
                                      key={`space-room-${room.room_id}`}
                                    >
                                      <a
                                        href={`/khong-gian/${room.slug}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleNavClick(
                                            `/khong-gian/${room.slug}`
                                          );
                                        }}
                                      >
                                        <div
                                          className="product-image"
                                          style={{
                                            backgroundImage: `url(${room.room_image})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                          }}
                                        ></div>
                                        <div className="product-title">
                                          {room.room_name}
                                        </div>
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                {/* <li>
                  <a href="/dich-vu-thiet-ke" className={isActive("/dich-vu-thiet-ke") ? "active" : ""} onClick={() => handleNavClick("/dich-vu-thiet-ke")}>Thiết Kế Nội Thất</a>
                </li>
                <li>
                  <a href="/ho-so-kien-truc" className={isActive("/ho-so-kien-truc") ? "active" : ""} onClick={() => handleNavClick("/ho-so-kien-truc")}>Hồ Sơ Kiến Trúc</a>
                </li> */}
                <li>
                  <a
                    href="/tin-tuc"
                    className={isActive("/tin-tuc") ? "active" : ""}
                    onClick={() => handleNavClick("/tin-tuc")}
                  >
                    Tin Tức
                  </a>
                </li>
                <li>
                  <a
                    href="/ve-chung-toi"
                    className={isActive("/ve-chung-toi") ? "active" : ""}
                    onClick={() => handleNavClick("/ve-chung-toi")}
                  >
                    Về Chúng Tôi
                  </a>
                </li>
                {/* <li>
                  <a href="/lien-he" className={isActive("/lien-he") ? "active" : ""} onClick={() => handleNavClick("/lien-he")}>Liên Hệ</a>
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
                          {/* Hàng đầu tiên hiển thị categories */}
                          <h3>Danh mục sản phẩm</h3>
                          {loadingCategories ? (
                            <div className="loading-categories">
                              Đang tải danh mục...
                            </div>
                          ) : (
                            categoryRows.slice(0, 1).map((row, rowIndex) => (
                              <div
                                className="product-row"
                                key={`search-cat-row-${rowIndex}`}
                              >
                                {row.map((category) => (
                                  <div
                                    className="product-item"
                                    key={`search-cat-${category.category_id}`}
                                  >
                                    <a
                                      href={`/san-pham/${category.slug}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleNavClick(
                                          `/san-pham/${category.slug}`
                                        );
                                      }}
                                    >
                                      <div
                                        className="product-image"
                                        style={{
                                          backgroundImage: `url(${category.category_image})`,
                                          backgroundSize: "cover",
                                          backgroundPosition: "center",
                                        }}
                                      ></div>
                                      <div className="product-title">
                                        {category.category_name}
                                      </div>
                                    </a>
                                  </div>
                                ))}
                              </div>
                            ))
                          )}

                          {/* Hàng thứ hai hiển thị rooms */}
                          <h3 className="mt-4">Không gian</h3>
                          {loadingRooms ? (
                            <div className="loading-categories">
                              Đang tải không gian...
                            </div>
                          ) : (
                            roomRows.slice(0, 1).map((row, rowIndex) => (
                              <div
                                className="product-row"
                                key={`search-room-row-${rowIndex}`}
                              >
                                {row.map((room) => (
                                  <div
                                    className="product-item"
                                    key={`search-room-${room.room_id}`}
                                  >
                                    <a
                                      href={`/khong-gian/${room.slug}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleNavClick(
                                          `/khong-gian/${room.slug}`
                                        );
                                      }}
                                    >
                                      <div
                                        className="product-image"
                                        style={{
                                          backgroundImage: `url(${room.room_image})`,
                                          backgroundSize: "cover",
                                          backgroundPosition: "center",
                                        }}
                                      ></div>
                                      <div className="product-title">
                                        {room.room_name}
                                      </div>
                                    </a>
                                  </div>
                                ))}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                <div className="cart-container">
                  <button
                    className="btn-icon cart-btn"
                    onClick={handleMiniCartClick}
                  >
                    <Link
                      to="/gio-hang"
                      onClick={(e) =>
                        window.innerWidth < 768 && e.preventDefault()
                      }
                    >
                      <img src="/images/icons/cart.svg" alt="cart" />
                    </Link>
                  </button>
                  <MiniCart ref={miniCartRef} />
                </div>
                <button
                  className="btn-icon wishlist-btn"
                  onClick={toggleWishlist}
                >
                  <img src="/images/icons/wishlist.svg" alt="wishlist" />
                </button>
              </div>
              <span className="header-actions-separator"></span>
              <div className="header-actions-buttons">
                {isAuthenticated && user ? (
                  <div className="user-greeting">
                    <div className="user-greeting-text">
                      <span>Chào, {getLastName(user.full_name)}</span>
                      <img src="/images/icons/arrow-down.svg" alt="" />
                    </div>
                    <div className="user-dropdown">
                      <ul>
                        <li>
                          <a href="/tai-khoan">Tài khoản</a>
                        </li>
                        <li>
                          <a href="/tai-khoan/thong-tin">Thông tin cá nhân</a>
                        </li>
                        <li>
                          <a href="/tai-khoan/ma-giam-gia">
                            Quản lý mã giảm giá
                          </a>
                        </li>
                        <li>
                          <a href="/tai-khoan/don-hang">Quản lý đơn hàng</a>
                        </li>
                        <li>
                          <a href="/san-pham-yeu-thich">Danh sách yêu thích</a>
                        </li>
                        <li>
                          <a href="/gio-hang">Giỏ hàng</a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              logout();
                            }}
                          >
                            Đăng xuất
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <>
                    <a href="/dang-ky" className="btn sign-up">
                      Đăng Ký
                    </a>
                    <a href="/dang-nhap" className="btn sign-in">
                      Đăng Nhập
                    </a>
                  </>
                )}
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

      {/* Wishlist Sidebar */}
      <WishlistSidebar
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </>
  );
};

export default Header;
