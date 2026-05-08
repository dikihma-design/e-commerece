import { useState } from "react";

export default function ProductCard({ product }) {
    const { image, alt, title, subtitle, stars, halfStar, emptyStars = 0, reviewCount, price, oldPrice, bgColor, wished = false } = product;

    const [wishlisted, setWishlisted]   = useState(wished);
    const [cartAdded, setCartAdded]     = useState(false);

    const handleAddToCart = () => {
        if (cartAdded) return;
        setCartAdded(true);
        setTimeout(() => setCartAdded(false), 1800);
    };

    const renderStars = () => {
        const full  = stars ?? 4;
        const half  = halfStar ? 1 : 0;
        const empty = emptyStars;
        return (
            <>
                {Array.from({ length: full }).map((_, i)  => <i key={`f${i}`}  className="fa fa-star"></i>)}
                {half === 1                               && <i key="h"          className="fa fa-star-half-o"></i>}
                {Array.from({ length: empty }).map((_, i) => <i key={`e${i}`}  className="fa fa-star-o"></i>)}
            </>
        );
    };

    return (
        <div className="product-card">
            <div className="card-img-wrap" style={bgColor ? { background: bgColor } : {}}>
                <img src={image} alt={alt || title} />
                <button
                    className={`wishlist-btn${wishlisted ? " active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
                >
                    <i className={`fa ${wishlisted ? "fa-heart" : "fa-heart-o"}`}></i>
                </button>
            </div>
            <div className="card-body-custom">
                <div className="card-title-text">{title}</div>
                <div className="card-subtitle-text">{subtitle}</div>
                <div className="stars">
                    {renderStars()}
                    {reviewCount && <span>({reviewCount})</span>}
                </div>
                <div className="price-row">
                    <span className="price-current">{price}</span>
                    {oldPrice && <span className="price-old">{oldPrice}</span>}
                </div>
                <button
                    className={`btn-add-cart${cartAdded ? " filled" : ""}`}
                    onClick={handleAddToCart}
                >
                    {cartAdded
                        ? <><i className="fa fa-check me-1"></i>Added!</>
                        : "Add to Cart"
                    }
                </button>
            </div>
        </div>
    );
}
