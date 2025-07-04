import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getAllCategories } from "../../api/category";
import { getAllRooms } from "../../api/room";
import type { Category, Room } from "../../types";
import { Link } from "react-router-dom";
import WishlistSidebar from "../Wishlist/WishlistSidebar";
import MiniCart from "../../components/MiniCart";
export interface MiniCartHandle {
  toggleMiniCart: () => void;
  closeMiniCart: () => void;
  isVisible: boolean;
  refreshCart: () => void;
  notifyCartChanged: () => void;
  getCartCount: () => number;
}

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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const [latestProducts, setLatestProducts] = useState<any[]>([]);

  // Ref cho mini cart component để truy cập hàm toggleMiniCart
  const [cartCount, setCartCount] = useState<number>(0);
  const miniCartRef = useRef<MiniCartHandle>(null);

const loadCartCountFromDB = async () => {
  if (miniCartRef.current) {
    const count = miniCartRef.current.getCartCount();
    setCartCount(count);
  } else {
    console.warn("miniCartRef chưa sẵn sàng để gọi getCartCount()");
  }
};


useEffect(() => {
  loadCartCountFromDB();
}, []);


const handleCartChanged = async () => {
  if (miniCartRef.current) {
    await miniCartRef.current.refreshCart(); 
    const count = miniCartRef.current.getCartCount(); 
    setCartCount(count);
  }
};


useEffect(() => {
   loadCartCountFromDB();
  // if (miniCartRef.current) {
  //   miniCartRef.current.notifyCartChanged = handleCartChanged;
  // }
}, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      // Lấy gợi ý từ tên sản phẩm (tối đa 5)
      fetch(`http://localhost:3501/api/products/search?q=${encodeURIComponent(searchTerm)}`)
        .then(res => res.json())
        .then(data => {
          const keywords = (data.results || []).map((item: any) => item.name).slice(0, 5);
          if (keywords.length > 0) {
            setSuggestedKeywords(keywords);
          } else {
            // Nếu không có kết quả, lấy sản phẩm mới nhất
            fetch('http://localhost:3501/api/products/newest?limit=5')
              .then(res => res.json())
              .then(newest => {
                const newNames = (Array.isArray(newest) ? newest : []).map((item: any) => item.name).slice(0, 5);
                setSuggestedKeywords(newNames);
              });
          }
        });
    } else {
      setSuggestedKeywords([]);
    }
  }, [searchTerm]);

  // Lấy sản phẩm mới nhất khi searchTerm rỗng
  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetch("http://localhost:3501/api/products/newest?limit=6")
        .then(res => res.json())
        .then(data => {
          setLatestProducts(Array.isArray(data) ? data : []);
        });
    }
  }, [searchTerm]);

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

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length === 0) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    setSearchLoading(true);
    setShowSuggestions(true);
    try {
      const res = await fetch(`http://localhost:3501/api/products/search?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      setSearchResults([]);
    }
    setSearchLoading(false);
  };

  const categoryRows = getCategoryRows();
  const roomRows = getRoomRows();

  const renderKeywords = () => {
    if (searchTerm.trim() === "") {
      return (
        <>
          {latestProducts.map((item, idx) => (
            <div className="search-link-item" key={item.id || idx}>
              <a href={`/search?q=${encodeURIComponent(item.name)}`}>
                <img src="../public/images/icons/magnifier-gray.svg" alt="search" />
                <span>{item.name}</span>
              </a>
            </div>
          ))}
        </>
      );
    }
    return suggestedKeywords.map((kw, idx) => (
      <div className="search-link-item" key={idx}>
        <a
          href={`/search?q=${encodeURIComponent(kw)}`}
          onClick={e => {
            e.preventDefault();
            setSearchTerm(kw);
          }}
        >
          <img src="../public/images/icons/magnifier-gray.svg" alt="search" />
          <span>{kw}</span>
        </a>
      </div>
    ));
  };

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
                        <input
                          type="text"
                          placeholder="Tìm kiếm sản phẩm"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          onFocus={() => searchTerm && setShowSuggestions(true)}
                          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        />
                        <button type="submit">
                          <img
                            src="../public/images/icons/magnifier-gray.svg"
                            alt="search"
                          />
                        </button>
                      </div>
                      <div className="search-content d-flex">
                        {searchTerm.trim() !== "" ? (
                          <>
                            <div className="search-content-aside col-md-3">
                              <h3>Tìm kiếm nhiều</h3>
                              <div className="search-links">
                                {renderKeywords()}
                              </div>
                            </div>
                            <div className="popular-products col-md-9">
                              <h3>Kết quả tìm kiếm</h3>
                              {searchLoading ? (
                                <div className="loading-categories">Đang tìm kiếm...</div>
                              ) : searchResults.length > 0 ? (
                                searchResults.reduce((rows: any[][], item, idx) => {
                                  if (idx % 5 === 0) rows.push([]);
                                  rows[rows.length - 1].push(item);
                                  return rows;
                                }, []).map((row, rowIndex) => (
                                  <div className="product-row" key={`search-result-row-${rowIndex}`}> 
                                    {row.map((item) => (
                                      <div className="product-item" key={item.id}>
                                        <a href={`/san-pham/${item.slug}`} className="product-link">
                                          <div
                                            className="product-image"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                          ></div>
                                          <div className="product-title">{item.name}</div>
                                          <div className="product-price">
                                            {item.price ? Number(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''}
                                          </div>
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                ))
                              ) : (
                                <div className="loading-categories">Không tìm thấy sản phẩm phù hợp.</div>
                              )}
                            </div>
                          </>
                        ) : (
                          // Nếu không tìm kiếm, hiển thị lại box danh mục và không gian như cũ
                          <>
                            <div className="search-content-aside col-md-3">
                              <h3>Tìm kiếm nhiều</h3>
                              <div className="search-links">
                                {renderKeywords()}
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
                                  <div className="product-row" key={`search-cat-row-${rowIndex}`}>
                                    {row.map((category) => (
                                      <div className="product-item" key={`search-cat-${category.category_id}`}>
                                        <a
                                          href={`/san-pham/${category.slug}`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleNavClick(`/san-pham/${category.slug}`);
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
                                          <div className="product-title">{category.category_name}</div>
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                ))
                              )}
                              {/* Hàng thứ hai hiển thị rooms */}
                              <h3 className="mt-4">Không gian</h3>
                              {loadingRooms ? (
                                <div className="loading-categories">Đang tải không gian...</div>
                              ) : (
                                roomRows.slice(0, 1).map((row, rowIndex) => (
                                  <div className="product-row" key={`search-room-row-${rowIndex}`}>
                                    {row.map((room) => (
                                      <div className="product-item" key={`search-room-${room.room_id}`}>
                                        <a
                                          href={`/khong-gian/${room.slug}`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleNavClick(`/khong-gian/${room.slug}`);
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
                                          <div className="product-title">{room.room_name}</div>
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                ))
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
                <div
                  className="cart-container"
                  onMouseEnter={() => {
                    if (window.innerWidth >= 768 && miniCartRef.current) {
                      // miniCartRef.current.refreshCart();
                      miniCartRef.current.toggleMiniCart(); // mở
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth >= 768 && miniCartRef.current) {
                      miniCartRef.current.closeMiniCart(); // đóng
                    }
                  }}
                >

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
                      <span
                        className="cart-badge"
                        style={{
                          position: 'absolute',
                          top: '20px',
                          right: '-2px',
                          backgroundColor: '#F0A00A',
                          color: 'white',
                          fontFamily: 'Be-R',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          padding: '2px 2px',
                          borderRadius: '50%',
                          minWidth: '18px',
                          textAlign: 'center',
                          // lineHeight: '1.2',
                          zIndex: 10,
                          boxShadow: '0 0 0 2px white',
                        }}
                      >
                         {cartCount}
                      </span>

                    </Link>
                  </button>
                  <MiniCart ref={miniCartRef} onCartUpdated={(count) => setCartCount(count)} />

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
      </header >

      {/* Wishlist Sidebar */}
      < WishlistSidebar
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </>
  );
};

export default Header;
