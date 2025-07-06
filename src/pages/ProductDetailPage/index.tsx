"use client";
// Import necessary libraries
import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import type { MiniCartHandle } from "../../components/MiniCart";
// import components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MiniCart from "../../components/MiniCart";
import PolicyProduct from "../../components/Policy";

// import API
import { getProductBySlug } from "../../api/product";
import { formatProductForDisplay } from "../../services/productService";
import { fetchVariantBySlugAndColor } from "../../services/variantService";

// import types
import type { Product, Variant } from "../../types";
import Comment from "../../components/Comment";
import { getProductComments } from "../../api/comment";
import type { CommentResponse } from "../../types";
import { toast, ToastContainer } from "react-toastify";
import { saveToOrCart } from "../../services/cartService";
import ProductComponent from "../../components/Product";
const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const miniCartRef = useRef<MiniCartHandle>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [commentData, setCommentData] = useState<CommentResponse | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const handleColorSelect = async (colorHex: string, colorId: number) => {
    try {
      setSelectedColor(colorHex);
      setSearchParams((prev) => {
        prev.set("color", colorId.toString());
        return prev;
      });
      console.log("selectedVariant", selectedVariant);
      if (slug) {
        const variant = await fetchVariantBySlugAndColor(slug, colorId);

        if (variant) {
          setSelectedVariant({
            variant_id: variant.variant_id,
            variant_price: variant.price,
            variant_price_sale: variant.priceSale,
            listImage: variant.images.join(","),
            quantity: variant.quantity,
            color_hex: variant.color.hex,
            color_name: variant.color.name,
          });
        }
      }
    } catch (error) {
      console.error("Error selecting color:", error);
    }
  };
  const imageList = selectedVariant?.listImage
    ? selectedVariant.listImage.split(",")
    : product?.images || [];

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const res = await getProductBySlug(slug);

        // Format lại product
        const formattedProduct = formatProductForDisplay({
          ...res.product,
          price: parseFloat(res.product.defaultPrice),
          price_sale: parseFloat(res.product.defaultPriceSale),
          images: res.product.defaultImages,
          variant_id: res.product.variant_id || res.colors?.[0]?.variant_id || 0,
          variants: res.colors.map((c: any) => ({
            color_id: c.colorId,
            color_name: c.colorName,
            color_hex: c.colorHex,
            color_priority: c.colorPriority || 0,
            variant_id: c.variant_id,
          })),
          stock: res.product.defaultQuantity,
          sold: res.product.sold,
          view: res.product.view,
          description: res.product.description,
          material: res.product.materials,
          height: Number(res.product.height),
          width: Number(res.product.width),
          depth: Number(res.product.depth),
          seating_height: Number(res.product.seating_height),
          maxium_weight: Number(res.product.max_weight_load),
        });

        setProduct(formattedProduct);
        setRelatedProducts(res.related_products || []);

        const colorIdFromUrl = searchParams.get("color");
        const defaultColor = formattedProduct.variants?.[0];

        const selectedColorId = colorIdFromUrl
          ? parseInt(colorIdFromUrl)
          : defaultColor?.color_id;

        const selectedColorHex = formattedProduct.variants?.find(
          (v) => v.color_id === selectedColorId
        )?.color_hex;

        // Set mặc định selectedColor nếu chưa có
        if (!colorIdFromUrl && selectedColorId && selectedColorHex) {
          setSelectedColor(selectedColorHex);
          setSearchParams((prev) => {
            prev.set("color", selectedColorId.toString());
            return prev;
          });
        }

        if (selectedColorHex && selectedColorId) {
          await handleColorSelect(selectedColorHex, selectedColorId);
        }
      } catch (err) {
        console.error("Lỗi khi fetch product:", err);
      }
    })();
  }, [slug]);


  useEffect(() => {
    if (!product?.variants) return;

    const colorId = searchParams.get("color");
    if (colorId) {
      const variant = product.variants.find(
        (v) => v.color_id.toString() === colorId
      );
      if (variant) {
        handleColorSelect(variant.color_hex, variant.color_id);
      }
    }
  }, [product, searchParams]);
  useEffect(() => {
    if (!product?.id) return;

    const fetchComments = async () => {
      try {
        const data = await getProductComments(product.id);
        setCommentData(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [product?.id]);

  const formatPrice = (price?: number): string => {
    if (typeof price !== "number" || isNaN(price)) return "0";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) setQuantity(newQuantity);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<img key={i} src="/images/detail/star.svg" alt="" />);
      } else if (i - 0.5 === rating) {
        stars.push(
          <img key={i} src="/images/detail/star-half-filled.svg" alt="" />
        );
      } else {
        stars.push(<img key={i} src="/images/detail/star-filled.svg" alt="" />);
      }
    }
    return stars;
  };

  const addToCart = async () => {
    if (!product || !selectedVariant) return;

    const variant_id = selectedVariant?.variant_id;
    if (!variant_id || isNaN(variant_id)) {
      toast.error("Không tìm thấy biến thể sản phẩm");
      return;
    }

    const token = sessionStorage.getItem("authToken");
    if (!token) {
      toast.warning("Vui lòng đăng nhập để thêm vào giỏ hàng", {
        position: "top-right",
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/dang-nhap");
      }, 2000);

      return;
    }

    try {
      const response = await saveToOrCart({
        status: 0,
        cartItems: [
          {
            variant_id: Number(selectedVariant.variant_id),
            quantity: Number(quantity),
          },
        ],
      });
      if (miniCartRef.current) {
        miniCartRef.current.notifyCartChanged(); // Cập nhật cart
        miniCartRef.current?.toggleMiniCart();
      }
      if (response.success) {
        toast.success("Đã thêm vào giỏ hàng!", {
          position: "top-right",
          autoClose: 500,
        });
        // if (miniCartRef.current) {
        //   console.log("✅ Gọi notifyCartChanged");
        //   miniCartRef.current.notifyCartChanged();
        // }
      } else {
        toast.error("Lỗi khi thêm vào giỏ hàng: " + response.message);
      }

    } catch (error: any) {
      console.error("Add to cart error:", error);
      toast.error("Lỗi khi thêm vào giỏ hàng.");
    }
  };


  if (!product) return <p className="text-center">Đang tải sản phẩm...</p>;
  return (
    <>
      <Header />
      <div className="product-details">
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/san-pham">Sản phẩm</Link>
              <span>/</span>
              <span className="active">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="details-infomation">
          <div className="container">
            <div className="detail-products">
              <div className="detail-image">
                <div className="image-full">
                  <div className="image1">
                    <img
                      src={imageList[0]?.trim() || "/images/placeholder.jpg"}
                      alt=""
                    />
                  </div>
                  <div className="image2">
                    <div className="image2-1">
                      <img
                        src={imageList[1]?.trim() || "/images/placeholder.jpg"}
                        alt=""
                      />
                    </div>
                    <div className="image2-2">
                      <img
                        src={imageList[2]?.trim() || "/images/placeholder.jpg"}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="image3">
                    <div className="image3-1">
                      <img
                        src={imageList[3]?.trim() || "/images/placeholder.jpg"}
                        alt=""
                      />
                    </div>
                    <div className="image3-2">
                      <img
                        src={imageList[4]?.trim() || "/images/placeholder.jpg"}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="image4">
                    <img
                      src={imageList[5]?.trim() || "/images/placeholder.jpg"}
                      alt=""
                    />
                  </div>
                  <div className="image5">
                    <img
                      src={imageList[6]?.trim() || "/images/placeholder.jpg"}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="detail-content">
                <div className="content-name">
                  <h3>{product.name}</h3>
                </div>
                <div className="content-description">
                  <span>
                    {product.category?.name || "Danh mục không xác định"}
                  </span>
                </div>
                <div className="content-price">
                  {selectedVariant?.variant_price_sale > 0 || product.priceSale > 0 ? (
                    <>
                      <span className="price">
                        {formatPrice(
                          selectedVariant?.variant_price_sale || product.priceSale
                        )}{" "}
                        đ
                      </span>
                      <span className="price-old" style={{ textDecoration: "line-through" }}>
                        {formatPrice(selectedVariant?.variant_price || product.price)} đ
                      </span>
                    </>
                  ) : (
                    <span className="price">
                      {formatPrice(selectedVariant?.variant_price || product.price)} đ
                    </span>
                  )}
                </div>
                <div className="content-rating">
                  <div className="rating-icon">
                    <div className="icon-star">
                      {renderStars(
                        Number(commentData?.stats.average_rating || 0)
                      )}
                    </div>
                    <div className="icon-star-number">
                      <span>{commentData?.stats.average_rating || 0}</span>
                    </div>
                  </div>
                  <div className="rating-evaluate">
                    <span>
                      {commentData?.stats.total_ratings || 0} lượt đánh giá
                    </span>
                  </div>
                </div>
                <div className="content-quantity">
                  <span>
                    Số lượng trong kho:{" "}
                    {selectedVariant?.quantity || product.stock}
                  </span>
                </div>
                <div className="content-view">
                  <span>Lượt xem: {product.view}</span>
                  <span className="view1"> Sản phẩm đã bán: {product.sold}</span>
                </div>
                <div className="content-color">
                  <span>Chọn màu sắc</span>
                  <div className="color-options">
                    {product.variants?.map((v: any) => (
                      <div
                        key={v.color_id}
                        style={{ backgroundColor: v.color_hex }}
                        className={`color-option${selectedColor?.toLowerCase() === v.color_hex?.toLowerCase() ? " active" : ""}`}

                        onClick={() => {
                          setSelectedColor(v.color_hex); // Đảm bảo cập nhật selectedColor khi click
                          handleColorSelect(v.color_hex, v.color_id);
                        }}
                        title={v.color_name}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="content-input-quantity">
                  <span>Chọn số lượng</span>
                  <div className="input-options">
                    <button
                      className="quantity-input-"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      {" "}
                      <img src="/images/detail/tru.svg" alt="" />
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="quantity-inputt"
                    />
                    <button
                      className="quantity-btn increase"
                      onClick={() => handleQuantityChange(1)}
                    >
                      {" "}
                      <img src="/images/detail/cong.svg" alt="" />
                    </button>
                  </div>
                </div>
                <div className="content-button">
                  <button className="button-add-cart" onClick={addToCart}>Thêm vào giỏ</button>
                  <div className="button-icon-i">
                    {/* <div className="icon-img">
                    <img src="/images/detail/heart.svg" alt="" />
                  </div> */}
                    <div className="icon-img">
                      <img src="/images/detail/share.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-decriptionn">
          <div className="container">
            <div className="detail-decription-evaluate">
              <div className="description-avalute-title">
                <div className="tabs-header">
                  <button
                    className={`tab-btn ${activeTab === "description" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("description")}
                  >
                    Mô tả
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "review" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("review")}
                  >
                    Đánh giá
                  </button>
                </div>
              </div>
              {activeTab === "description" && (
                <div className="description-avalute-content">
                  <div className="description-avalute-content-text">
                    <p>{product.description || "Đang cập nhật..."}</p>
                  </div>
                  <div className="description-avalute-content-size">
                    <button className="color-info">
                      <span className="info-ww">Chất liệu </span>
                      <span>{product.material || "Đang cập nhật"}</span>
                    </button>
                    <button className="color-info">
                      <span className="info-ww">Chiều cao </span>
                      <span>{product.height ? `${product.height} cm` : "Đang cập nhật"}</span>
                    </button>
                    <button className="color-info">
                      <span className="info-ww">Chiều rộng </span>
                      <span>{product.width ? `${product.width} cm` : "Đang cập nhật"}</span>
                    </button>
                    <button className="color-info">
                      <span className="info-ww">Chiều sâu </span>
                      <span>{product.depth ? `${product.depth} cm` : "Đang cập nhật"}</span>
                    </button>
                    <button className="color-info">
                      <span className="info-ww">Chiều cao chỗ ngồi</span>
                      <span>{product.seating_height ? `${product.seating_height} cm` : "Đang cập nhật"}</span>
                    </button>
                    <button className="color-info">
                      <span className="info-ww">Tải trọng tối đa </span>
                      <span>{product.maxium_weight ? `${product.maxium_weight} kg` : "Đang cập nhật"}</span>
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "review" && <Comment commentData={commentData} />}
            </div>
          </div>
        </div>

        <div className="detail-banner-slider">
          <div className="container">
            <div className="detail-banner">
              <img
                src={imageList[6]?.trim() || "/images/placeholder.jpg"}
                alt=""
              />
            </div>
          </div>
        </div>

        <PolicyProduct />

        {/* boxsanpham */}
        <div className="boxProducts">
          <div className="container">
            <div className="section-box-products">
              <h5>Các sản phẩm tương tự</h5>
              {/* <div className="box-products-container">
                {relatedProducts.map((product) => (
                  <ListProduct
                    key={product.id}
                    product={product}
                    slug={product.slug}
                  />
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <ToastContainer position="top-right"
        autoClose={1000}
        style={{ marginTop: "100px" }} />
    </>
  );
};

export default ProductDetailPage;
