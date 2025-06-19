"use client";
// Import necessary libraries
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

// import components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [searchParams, setSearchParams] = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [commentData, setCommentData] = useState<CommentResponse | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const handleColorSelect = async (colorHex: string, colorId: number) => {
    try {
      setSelectedColor(colorHex);
      setSearchParams((prev) => {
        prev.set("color", colorId.toString());
        return prev;
      });

      if (slug) {
        const variant = await fetchVariantBySlugAndColor(slug, colorId);
        if (variant) {
          setSelectedVariant({
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
        const formattedProduct = formatProductForDisplay({
          ...res.product,
          price: parseFloat(res.product.defaultPrice),
          price_sale: parseFloat(res.product.defaultPriceSale),
          images: res.product.defaultImages,

          variants: res.colors.map((c: any) => ({
            color_id: c.colorId,
            color_name: c.colorName,
            color_hex: c.colorHex,
            slug: c.slug,
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
        console.log("Formatted Product:", formattedProduct); // Thêm dòng này
        setRelatedProducts(res.related_products || []);

        // Hiển thị mặc định thông tin sản phẩm trước khi chọn màu
        setSelectedColor(res.product.defaultColorHex);

        setSelectedVariant({
          variant_price: parseFloat(res.product.defaultPrice),
          variant_price_sale: parseFloat(res.product.defaultPriceSale),
          listImage: res.product.defaultImages.join(","),
          quantity: res.product.defaultQuantity,
          color_hex: res.product.defaultColorHex,
          color_name: res.product.defaultColorName,
        });
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

const addToCart = () => {
  const image = selectedVariant?.listImage?.split(",")[0] || product?.images?.[0] || "";

  const productToAdd = {
    id: product?.id || 0,
    name: product?.name || "",
    price: selectedVariant?.variant_price || product?.price || 0,
    oldPrice: product?.price_sale,
    image: image ,
    color: selectedVariant?.color_hex || "",
    category: product?.category?.name || "",
    quantity: quantity,
  };

  const storedCart = localStorage.getItem("cart");
  let cart = storedCart ? JSON.parse(storedCart) : [];

  const existingIndexSameId = cart.findIndex(
    (item: any) => item.id === productToAdd.id
  );

  if (existingIndexSameId >= 0) {
    const existingItem = cart[existingIndexSameId];
    if (existingItem.color === productToAdd.color) {
      cart[existingIndexSameId].quantity += productToAdd.quantity;
    } else {
      cart.push(productToAdd);
    }
  } else {
    cart.push(productToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Đã thêm vào giỏ hàng");
};

  if (!product) return <p className="text-center">Đang tải sản phẩm...</p>;
  return (
    <>
      <Header />
      <div className="product-details">
        <div className="detail-page-link">
          <div className="container">
            <div className="detail-link">
              <span className="link1">Sản phẩm | </span>
              <span className="link2">{product.name}</span>
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
                  <span className="price">
                    {formatPrice(selectedVariant?.variant_price || product.price)}{" "}
                    đ
                  </span>
                  {(selectedVariant?.variant_price_sale || product.priceSale) && (
                    <span className="price-old">
                      {formatPrice(
                        selectedVariant?.variant_price_sale || product.priceSale
                      )}{" "}
                      đ
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
                        className={`color-option ${selectedColor === v.color_hex ? "active" : ""
                          }`}
                        onClick={() => handleColorSelect(v.color_hex, v.color_id)}
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
                    <p>{product.description}</p>
                  </div>
                  <div className="description-avalute-content-size">
                    <button className="color-info">
                      <span className="info-ww">Chất liệu </span>
                      <span>{product.material} </span>
                    </button>
                    <button className="color-info">
                      <span className="info-ww">Chiều cao </span>
                      <span>{product.height} cm</span>
                    </button>
                    <button className="color-info">
                      <span className="info-ww">Chiều rộng </span>
                      <span>{product.width} cm</span>
                    </button>
                    <button className="color-info">
                      <span className="info-ww">Chiều sâu </span>
                      <span>{product.depth} cm</span>
                    </button>
                    <button className="color-info">
                      <span className="info-ww">Chiều cao chỗ ngồi</span>
                      <span>{product.seating_height} cm</span>
                    </button>
                    <button className="color-info">
                      <span className="info-ww">Tải trọng tối đa </span>
                      <span>{product.maxium_weight} kg</span>
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
    </>
  );
};

export default ProductDetailPage;
