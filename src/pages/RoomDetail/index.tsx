import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  images: string[];
  colors: string[];
  category: string;
  material: string;
  slug: string;
  isNew?: boolean;
  isSale?: boolean;
}

interface RoomDetailProps {
  id: number;
  banner: string;
  name: string;
  image: string;
  slug: string;
}

interface FilterProps {
  material: string;
  color: string;
  price: string;
  sort: string;
}

const RoomDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [roomName, setRoomName] = useState<string>("");
  const [filters, setFilters] = useState<FilterProps>({
    material: "",
    color: "",
    price: "",
    sort: "newest"
  });
  const [products, setProducts] = useState<ProductProps[]>([]);

  // Mock room data mapping
  const roomMapping: { [key: string]: string } = {
    "phong-khach": "Phòng Khách",
    "phong-an": "Phòng Ăn",
    "phong-ngu": "Phòng Ngủ",
    "khong-gian-lam-viec": "Không gian làm việc",
    "small-space": "Small Space"
  };

  // Mock products data
  const mockProducts: ProductProps[] = [
    {
      id: 1,
      name: "Sofa Modena 2.5 seater",
      price: 15190000,
      oldPrice: 25000000,
      images: ["/images/products/sofa-beige-1.jpg"],
      colors: ["#D8C1A9", "#999999", "#8B7355"],
      category: "Sofa",
      material: "Vải",
      slug: "sofa-modena-2-5-seater-beige",
      isNew: true
    },
    {
      id: 2,
      name: "Sofa góc Modena",
      price: 25190000,
      oldPrice: 35000000,
      images: ["/images/products/sofa-gray-1.jpg"],
      colors: ["#999999", "#D8C1A9", "#8B7355"],
      category: "Sofa",
      material: "Vải",
      slug: "sofa-goc-modena-gray",
      isSale: true
    },
    {
      id: 3,
      name: "Bàn coffee Modena",
      price: 5190000,
      images: ["/images/products/coffee-table-1.jpg"],
      colors: ["#8B7355", "#D8C1A9"],
      category: "Bàn",
      material: "Gỗ",
      slug: "ban-coffee-modena"
    },
    {
      id: 4,
      name: "Kệ TV Modena",
      price: 8190000,
      images: ["/images/products/tv-stand-1.jpg"],
      colors: ["#8B7355"],
      category: "Kệ",
      material: "Gỗ",
      slug: "ke-tv-modena"
    },
    {
      id: 5,
      name: "Ghế bành Modena",
      price: 7190000,
      oldPrice: 9000000,
      images: ["/images/products/armchair-1.jpg"],
      colors: ["#D8C1A9", "#999999"],
      category: "Ghế",
      material: "Vải",
      slug: "ghe-banh-modena",
      isSale: true
    },
    {
      id: 6,
      name: "Đèn sàn Modena",
      price: 3190000,
      images: ["/images/products/floor-lamp-1.jpg"],
      colors: ["#999999", "#8B7355"],
      category: "Đèn",
      material: "Kim loại",
      slug: "den-san-modena",
      isNew: true
    },
    {
      id: 7,
      name: "Thảm phòng khách Modena",
      price: 4190000,
      images: ["/images/products/rug-1.jpg"],
      colors: ["#D8C1A9", "#999999"],
      category: "Thảm",
      material: "Vải",
      slug: "tham-phong-khach-modena"
    },
    {
      id: 8,
      name: "Gối trang trí Modena",
      price: 590000,
      images: ["/images/products/cushion-1.jpg"],
      colors: ["#D8C1A9", "#999999", "#8B7355"],
      category: "Gối",
      material: "Vải",
      slug: "goi-trang-tri-modena"
    }
  ];

  // Format price with commas
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Filter and sort products
  useEffect(() => {
    let filteredProducts = [...mockProducts];
    
    // Apply material filter
    if (filters.material) {
      filteredProducts = filteredProducts.filter(product => 
        product.material === filters.material
      );
    }
    
    // Apply color filter
    if (filters.color) {
      filteredProducts = filteredProducts.filter(product => 
        product.colors.includes(filters.color)
      );
    }
    
    // Apply price filter
    if (filters.price) {
      switch (filters.price) {
        case "under-5m":
          filteredProducts = filteredProducts.filter(product => product.price < 5000000);
          break;
        case "5m-10m":
          filteredProducts = filteredProducts.filter(product => 
            product.price >= 5000000 && product.price <= 10000000
          );
          break;
        case "10m-20m":
          filteredProducts = filteredProducts.filter(product => 
            product.price > 10000000 && product.price <= 20000000
          );
          break;
        case "above-20m":
          filteredProducts = filteredProducts.filter(product => product.price > 20000000);
          break;
      }
    }
    
    // Apply sorting
    switch (filters.sort) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // In a real app, you'd sort by date added
        // Here we're just keeping the original order
        break;
    }
    
    setProducts(filteredProducts);
  }, [filters]);

  // Set room name based on slug
  useEffect(() => {
    if (slug && roomMapping[slug]) {
      setRoomName(roomMapping[slug]);
    } else {
      setRoomName("Không gian");
    }
  }, [slug]);

  return (
    <>
      <Header />
      <div className="room-detail-page">
        {/* Banner Section */}
        <section className="room-banner">
          <div className="container-fluid">
            <div className="banner-image">
              <img src="/images/banners/room-detail-banner.jpg" alt={roomName} />
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <Link to="/khong-gian">Không gian</Link>
              <span>/</span>
              <span className="active">{roomName}</span>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <section className="filter-section">
          <div className="container">
            <div className="filter-row">
              <div className="filter-group">
                <div className="filter-icon">
                  <i className="icon-filter"></i>
                  <span>Lọc sản phẩm:</span>
                </div>
                
                <select 
                  name="material" 
                  className="filter-select" 
                  value={filters.material}
                  onChange={handleFilterChange}
                >
                  <option value="">Chất liệu</option>
                  <option value="Vải">Vải</option>
                  <option value="Gỗ">Gỗ</option>
                  <option value="Kim loại">Kim loại</option>
                  <option value="Da">Da</option>
                </select>
                
                <select 
                  name="color" 
                  className="filter-select" 
                  value={filters.color}
                  onChange={handleFilterChange}
                >
                  <option value="">Màu sắc</option>
                  <option value="#D8C1A9">Beige</option>
                  <option value="#999999">Gray</option>
                  <option value="#8B7355">Brown</option>
                </select>
                
                <select 
                  name="price" 
                  className="filter-select" 
                  value={filters.price}
                  onChange={handleFilterChange}
                >
                  <option value="">Giá</option>
                  <option value="under-5m">Dưới 5 triệu</option>
                  <option value="5m-10m">5 - 10 triệu</option>
                  <option value="10m-20m">10 - 20 triệu</option>
                  <option value="above-20m">Trên 20 triệu</option>
                </select>
              </div>
              
              <div className="sort-group">
                <select 
                  name="sort" 
                  className="sort-select" 
                  value={filters.sort}
                  onChange={handleFilterChange}
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="products-section">
          <div className="container">
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.images[0]} alt={product.name} />
                    {product.isNew && <span className="badge new">Mới</span>}
                    {product.isSale && <span className="badge sale">Sale</span>}
                    <div className="product-actions">
                      <button className="action-btn wishlist">
                        <i className="icon-heart"></i>
                      </button>
                      <Link to={`/san-pham/${product.slug}`} className="action-btn view">
                        <i className="icon-eye"></i>
                      </Link>
                      <button className="action-btn cart">
                        <i className="icon-cart"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-name">
                      <Link to={`/san-pham/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <div className="product-price">
                      <span className="current-price">{formatPrice(product.price)} đ</span>
                      {product.oldPrice && (
                        <span className="old-price">{formatPrice(product.oldPrice)} đ</span>
                      )}
                    </div>
                    <div className="product-colors">
                      {product.colors.map((color, index) => (
                        <span 
                          key={index}
                          className="color-dot"
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </div>
                    <Link to={`/san-pham/${product.slug}`} className="view-more">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inspiration Section */}
        <section className="inspiration-section">
          <div className="container">
            <div className="inspiration-content">
              <div className="inspiration-text">
                <h2>Thiết kế không gian sống theo phong cách của bạn</h2>
                <p>
                  SONA SPACE cung cấp dịch vụ thiết kế nội thất chuyên nghiệp, giúp bạn tạo ra không gian 
                  sống lý tưởng phù hợp với phong cách và nhu cầu cá nhân. Đội ngũ thiết kế của chúng tôi 
                  sẽ làm việc chặt chẽ với bạn để hiểu rõ mong muốn và đưa ra giải pháp tối ưu cho không gian của bạn.
                </p>
                <a href="/lien-he" className="discover-btn">Liên hệ ngay</a>
              </div>
              
              <div className="inspiration-image">
                <img src="/images/design/interior-design-1.jpg" alt="Thiết kế nội thất chuyên nghiệp" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="container">
            <h2 className="section-title">Khám phá các không gian khác</h2>
            
            <div className="categories-grid">
              <div className="category-item">
                <Link to="/khong-gian/phong-khach">
                  <div className="category-image">
                    <img src="/images/rooms/living-room.jpg" alt="Phòng Khách" />
                  </div>
                  <div className="category-name">Phòng Khách</div>
                </Link>
              </div>
              
              <div className="category-item">
                <Link to="/khong-gian/phong-an">
                  <div className="category-image">
                    <img src="/images/rooms/dining-room.jpg" alt="Phòng Ăn" />
                  </div>
                  <div className="category-name">Phòng Ăn</div>
                </Link>
              </div>
              
              <div className="category-item">
                <Link to="/khong-gian/phong-ngu">
                  <div className="category-image">
                    <img src="/images/rooms/bedroom.jpg" alt="Phòng Ngủ" />
                  </div>
                  <div className="category-name">Phòng Ngủ</div>
                </Link>
              </div>
              
              <div className="category-item">
                <Link to="/khong-gian/khong-gian-lam-viec">
                  <div className="category-image">
                    <img src="/images/rooms/workspace.jpg" alt="Không gian làm việc" />
                  </div>
                  <div className="category-name">Không gian làm việc</div>
                </Link>
              </div>
              
              <div className="category-item">
                <Link to="/khong-gian/small-space">
                  <div className="category-image">
                    <img src="/images/rooms/small-space.jpg" alt="Small Space" />
                  </div>
                  <div className="category-name">Small Space</div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Design Blog Section */}
        <section className="design-blog">
          <div className="container">
            <h2 className="section-title">Ý tưởng thiết kế</h2>
            <div className="blog-grid">
              <div className="blog-item">
                <img src="/images/blog/living-room-design-1.jpg" alt="Thiết kế phòng khách hiện đại" />
                <h3>Thiết kế phòng khách hiện đại</h3>
              </div>
              <div className="blog-item">
                <img src="/images/blog/bedroom-design-1.jpg" alt="Không gian phòng ngủ thư giãn" />
                <h3>Không gian phòng ngủ thư giãn</h3>
              </div>
              <div className="blog-item">
                <img src="/images/blog/workspace-design-1.jpg" alt="Góc làm việc tại nhà" />
                <h3>Góc làm việc tại nhà</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default RoomDetail;
