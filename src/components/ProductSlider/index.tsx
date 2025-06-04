import { useState, useRef } from 'react';

export default function ProductSlider() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -800, behavior: 'smooth' });
            setTimeout(checkScrollPosition, 300);
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 800, behavior: 'smooth' });
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
                <button className="slider-arrow slider-arrow-left" onClick={scrollLeft}>
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
                            <div className="product-colors">
                                <span className="color-option brown"></span>
                                <span className="color-option beige"></span>
                                <span className="color-option gray"></span>
                            </div>
                            <div className="product-price">
                                <span className="price">15.190.000 ₫</span>
                                <span className="price-tag">Giá bán</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {showRightArrow && (
                <button className="slider-arrow slider-arrow-right" onClick={scrollRight}>
                    <img src="/images/icons/arrow-right.svg" alt="Next" />
                </button>
            )}
        </div>
    );
}