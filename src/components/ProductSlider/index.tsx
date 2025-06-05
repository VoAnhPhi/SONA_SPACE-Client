import { useState, useRef, useEffect } from "react";

export default function ProductSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  // Check scroll position on component mount and window resize
  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => {
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  // Update custom scrollbar
  useEffect(() => {
    const updateScrollbarPosition = () => {
      if (sliderRef.current && thumbRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

        // Tính toán tỷ lệ cuộn (scroll percentage)
        const scrollPercentage =
          scrollWidth <= clientWidth
            ? 0
            : scrollLeft / (scrollWidth - clientWidth);

        // Tính toán chiều rộng của thanh progress bar (thumb) dựa trên tổng chiều rộng của slider và các sản phẩm
        const totalWidth = sliderRef.current.scrollWidth; // Tổng chiều rộng của slider
        const thumbWidthPercentage = (clientWidth / totalWidth) * 100; // Tính tỷ lệ chiều rộng của thumb
        const thumbWidth = Math.max(thumbWidthPercentage, 10); // Đảm bảo chiều rộng thumb tối thiểu là 10%

        // Cập nhật chiều rộng của thanh thumb
        thumbRef.current.style.width = `${thumbWidth}%`;

        // Tính toán vị trí của thumb trong thanh track
        const maxScrollPosition = 100 - thumbWidth;
        const thumbPosition = scrollPercentage * maxScrollPosition;

        // Cập nhật vị trí của thumb
        thumbRef.current.style.transform = `translateX(${thumbPosition}%)`;
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", updateScrollbarPosition);
      updateScrollbarPosition(); // Khởi tạo vị trí ban đầu
    }

    return () => {
      if (slider) {
        slider.removeEventListener("scroll", updateScrollbarPosition);
      }
    };
  }, []);

  // Handle scrollbar thumb dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current || !thumbRef.current) return;

      e.preventDefault();

      const trackWidth = thumbRef.current.parentElement?.clientWidth || 0;
      const deltaX = e.clientX - startX;
      const deltaPercentage = deltaX / trackWidth;

      const { scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const newScrollLeft = startScrollLeft + deltaPercentage * maxScroll;

      sliderRef.current.scrollLeft = Math.max(
        0,
        Math.min(maxScroll, newScrollLeft)
      );
      setStartX(e.clientX);
      setStartScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = "";
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none"; // Prevent text selection while dragging
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, startScrollLeft]);

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;

    setIsDragging(true);
    setStartX(e.clientX);
    setStartScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!sliderRef.current || !thumbRef.current) return;

    const track = e.currentTarget;
    const trackRect = track.getBoundingClientRect();
    const clickPosition = (e.clientX - trackRect.left) / trackRect.width;

    const { scrollWidth, clientWidth } = sliderRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const newScrollLeft = clickPosition * maxScroll;

    sliderRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  const handleScrollLeft = () => {
    if (sliderRef.current) {
      const scrollAmount = Math.max(sliderRef.current.clientWidth * 0.8, 800);
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current) {
      const scrollAmount = Math.max(sliderRef.current.clientWidth * 0.8, 800);
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="product-slider-container">
      {showLeftArrow && (
        <button
          className="slider-arrow slider-arrow-left"
          onClick={handleScrollLeft}
        >
          <img src="/images/icons/arrow-left.svg" alt="Previous" />
        </button>
      )}

      <div
        className="products-slider"
        ref={sliderRef}
        onScroll={checkScrollPosition}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <div key={item} className="product-item">
            <div className="product-image">
              <img
                src={`/images/product-${item > 8 ? item - 8 : item}.jpg`}
                alt={`Product ${item}`}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">
                Ghế Wooden 2.0 nordic với nhiên liệu tương tự
              </h3>
              <div className="product-category">Sofa</div>
              <div className="product-colors">
                <span>Màu</span>
                <span className="color-option brown"></span>
                <span className="color-option beige"></span>
                <span className="color-option gray"></span>
              </div>
              <span className="line-custome"></span>
              <div className="product-price">
                <div className="price-product">
                  <span className="price-sale">25.000.000 ₫</span>
                  <span className="price">15.190.000 ₫</span>
                </div>
                <div className="btn-buy">
                  <a className="price-tag">Mua ngay</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom scrollbar */}
      <div className="scrollbar-track" onClick={handleTrackClick}>
        <div
          className="scrollbar-thumb"
          ref={thumbRef}
          onMouseDown={handleThumbMouseDown}
        ></div>
      </div>

      {showRightArrow && (
        <button
          className="slider-arrow slider-arrow-right"
          onClick={handleScrollRight}
        >
          <img src="/images/icons/arrow-right.svg" alt="Next" />
        </button>
      )}
    </div>
  );
}
