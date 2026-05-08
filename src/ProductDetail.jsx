import { useState } from "react";
import Header    from "./components/templates/Header";
import Footer    from "./components/templates/Footer";
import MobileNav from "./components/templates/MobileNav";
import ProductCard from "./components/templates/ProductCard";

/* ─── DATA ─── */
const THUMBNAILS = [
    "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80",
];

const COLORS = [
    { label: "Pink",       bg: "#f4a0a0" },
    { label: "Sky Blue",   bg: "#b0c0d8" },
    { label: "Silver",     bg: "#d4d0c8" },
    { label: "Space Gray", bg: "#3a3a3c" },
    { label: "Green",      bg: "#4a7c59" },
    { label: "Gold",       bg: "#c9a96e" },
];

const SPECS = [
    ["Brand",               "Apple"],
    ["Model",               "AirPods Max (2024)"],
    ["Chip",                "Apple H1 headphone chip"],
    ["Driver Type",         "Apple-designed 40mm dynamic driver"],
    ["Frequency Response",  "20Hz – 20,000Hz"],
    ["Noise Cancellation",  "Active Noise Cancellation + Transparency Mode"],
    ["Spatial Audio",       "Yes, with dynamic head tracking"],
    ["Connectivity",        "Bluetooth 5.0"],
    ["Battery Life",        "Up to 20 hours"],
    ["Charging",            "Lightning / USB-C (USB-C model)"],
    ["Weight",              "385 g"],
    ["Colors Available",    "Pink, Sky Blue, Silver, Space Gray, Green, Gold"],
    ["In the Box",          "AirPods Max, Smart Case, Lightning to USB-C cable"],
];

const REVIEWS = [
    { name: "Sarah M.",  date: "April 20, 2025",    stars: 5, text: "Absolutely stunning headphones. The sound quality is unmatched in this price range. Wearing them for 6+ hours daily and they feel incredibly comfortable. The ANC is the best I've ever experienced." },
    { name: "James K.",  date: "March 8, 2025",     stars: 4, text: "Great headphones, premium build quality and incredible audio. My only minor gripe is the price, but you truly get what you pay for. The pink color looks even better in person." },
    { name: "Aiko T.",   date: "February 14, 2025", stars: 4, halfStar: true, text: "Spatial audio is magical for movies. Pairs instantly with my iPhone and MacBook. Worth every penny for an Apple ecosystem user." },
];

const RATING_BARS = [
    { label: 5, pct: 72, color: "var(--green)", opacity: 1 },
    { label: 4, pct: 18, color: "var(--green)", opacity: .7 },
    { label: 3, pct: 6,  color: "#f5a623",      opacity: 1 },
    { label: 2, pct: 2,  color: "#e55",         opacity: 1 },
    { label: 1, pct: 2,  color: "#e55",         opacity: 1 },
];

const RELATED_PRODUCTS = [
    {
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
        title: "Sony WH-1000XM5", subtitle: "Industry ANC Leader",
        stars: 5, reviewCount: 94, price: "$349.99", oldPrice: "$399",
    },
    {
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=80",
        title: "Bose QC45", subtitle: "QuietComfort Series",
        stars: 4, halfStar: true, reviewCount: 61, price: "$279.00", oldPrice: "$329",
        bgColor: "#fff5ee",
    },
    {
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&auto=format&fit=crop&q=80",
        title: "Beats Studio Pro", subtitle: "Personalized Spatial Audio",
        stars: 4, emptyStars: 1, reviewCount: 48, price: "$299.99", oldPrice: "$350",
        bgColor: "#f0faff",
    },
    {
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&auto=format&fit=crop&q=80",
        title: "Sennheiser HD 450BT", subtitle: "Bluetooth 5.0 Wireless",
        stars: 4, halfStar: true, reviewCount: 38, price: "$149.99", oldPrice: "$200",
        bgColor: "#f5f0ff",
    },
    {
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&auto=format&fit=crop&q=80",
        title: "JBL TUNE 600BTNC", subtitle: "Wireless Noise Cancel",
        stars: 4, emptyStars: 1, reviewCount: 20, price: "$59.99", oldPrice: "$80",
        bgColor: "#f0fff5",
    },
    {
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&auto=format&fit=crop&q=80",
        title: "Anker Soundcore Q45", subtitle: "Adaptive ANC",
        stars: 4, emptyStars: 1, reviewCount: 33, price: "$79.99", oldPrice: "$99",
        bgColor: "#fffbf0",
    },
];

/* ─── HELPERS ─── */
function StarRow({ count = 5, halfStar = false, size = ".85rem" }) {
    const full  = halfStar ? count - 1 : count;
    return (
        <div className="stars" style={{ fontSize: size }}>
            {Array.from({ length: full }).map((_, i)  => <i key={`f${i}`} className="fa fa-star"></i>)}
            {halfStar                                 && <i key="h"        className="fa fa-star-half-o"></i>}
        </div>
    );
}

/* ─── COMPONENT ─── */
export default function ProductDetail() {
    const [activeThumb,  setActiveThumb]  = useState(0);
    const [activeColor,  setActiveColor]  = useState(0);
    const [qty,          setQty]          = useState(1);
    const [wishlisted,   setWishlisted]   = useState(false);
    const [cartAdded,    setCartAdded]    = useState(false);
    const [activeTab,    setActiveTab]    = useState("desc");

    const handleAddCart = () => {
        if (cartAdded) return;
        setCartAdded(true);
        setTimeout(() => setCartAdded(false), 1800);
    };

    return (
        <>
            <Header activePage="detail" cartCount={3} />

            <div className="container-fluid px-3 px-md-4">

                {/* ─── BREADCRUMB ─── */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Headphones</a></li>
                        <li className="breadcrumb-item active">AirPods Max</li>
                    </ol>
                </nav>

                {/* ─── PRODUCT ROW ─── */}
                <div className="row fade-up">

                    {/* LEFT – Gallery */}
                    <div className="col-md-5">
                        <div className="gallery-main">
                            <span className="gallery-badge">-25%</span>
                            <button
                                className={`gallery-wishlist${wishlisted ? " active" : ""}`}
                                onClick={() => setWishlisted(!wishlisted)}
                            >
                                <i className={`fa ${wishlisted ? "fa-heart" : "fa-heart-o"}`}></i>
                            </button>
                            <img
                                src={THUMBNAILS[activeThumb]}
                                alt="AirPods Max"
                                id="mainImg"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="thumb-row">
                            {THUMBNAILS.map((src, i) => (
                                <div
                                    key={i}
                                    className={`thumb${activeThumb === i ? " active" : ""}`}
                                    onClick={() => setActiveThumb(i)}
                                >
                                    <img
                                        src={src.replace("w=400", "w=100")}
                                        alt={`thumb-${i}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT – Info */}
                    <div className="col-md-7 product-info mt-4 mt-md-0 fade-up fade-up-d1">

                        <span className="product-tag">
                            <i className="fa fa-apple"></i> Apple
                        </span>
                        <h1 className="product-title">AirPods Max</h1>
                        <p className="product-subtitle">
                            High-fidelity audio with Adaptive EQ, Active Noise Cancellation, and Spatial Audio
                        </p>

                        {/* Rating */}
                        <div className="rating-row">
                            <StarRow count={4} halfStar />
                            <span className="rating-count">4.5 (2,847 reviews)</span>
                            <span className="rating-divider">|</span>
                            <span className="in-stock"><i className="fa fa-check-circle"></i> In Stock</span>
                        </div>

                        {/* Price */}
                        <div className="price-block">
                            <div className="price-main"><sup>$</sup>549<span style={{ fontSize: "1.1rem" }}>.00</span></div>
                            <div className="price-emi">or <span>$99.08/month</span> for 6 months · No interest</div>
                            <div className="price-old-row">
                                <span className="price-old">$729.00</span>
                                <span className="price-save">Save $180</span>
                            </div>
                        </div>

                        {/* Color Picker */}
                        <div className="mb-1 option-label">
                            Choose a Color: <span style={{ color: "var(--green)" }}>{COLORS[activeColor].label}</span>
                        </div>
                        <div className="color-grid">
                            {COLORS.map((color, i) => (
                                <button
                                    key={i}
                                    className={`color-btn${activeColor === i ? " active" : ""}`}
                                    style={{ background: color.bg }}
                                    title={color.label}
                                    onClick={() => setActiveColor(i)}
                                />
                            ))}
                        </div>

                        {/* Quantity */}
                        <div className="option-label">Quantity</div>
                        <div className="qty-wrap mb-3">
                            <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>
                                <i className="fa fa-minus"></i>
                            </button>
                            <input className="qty-input" type="text" value={qty} readOnly />
                            <button className="qty-btn" onClick={() => setQty(q => Math.min(8, q + 1))}>
                                <i className="fa fa-plus"></i>
                            </button>
                            <span style={{ fontSize: ".8rem", color: "var(--mid)", marginLeft: ".3rem" }}>
                                Only 8 left
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex btn-action-row" style={{ gap: ".75rem", marginBottom: "1.3rem" }}>
                            <button className="btn-buy"><i className="fa fa-bolt"></i> Buy Now</button>
                            <button
                                className="btn-cart"
                                onClick={handleAddCart}
                                style={cartAdded ? { background: "var(--green)", color: "#fff" } : {}}
                            >
                                {cartAdded
                                    ? <><i className="fa fa-check me-1"></i> Added!</>
                                    : <><i className="fa fa-shopping-cart"></i> Add to Cart</>
                                }
                            </button>
                        </div>

                        {/* Perks */}
                        <div className="perks">
                            {[
                                { icon: "fa-truck",   title: "Free Delivery",    sub: "Enter your postal code for delivery availability" },
                                { icon: "fa-refresh", title: "Return Delivery",  sub: "Free 30-day returns. Details apply." },
                                { icon: "fa-shield",  title: "2-Year Warranty",  sub: "AppleCare+ available for extended coverage" },
                            ].map((perk, i) => (
                                <div className="perk-item" key={i}>
                                    <div className="perk-icon"><i className={`fa ${perk.icon}`}></i></div>
                                    <div className="perk-text">
                                        <strong>{perk.title}</strong>
                                        <span>{perk.sub}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* ─── TABS ─── */}
                <ul className="nav detail-tabs fade-up fade-up-d2">
                    {[
                        { key: "desc",    label: "Description" },
                        { key: "specs",   label: "Specifications" },
                        { key: "reviews", label: "Reviews (2,847)" },
                    ].map((tab) => (
                        <li className="nav-item" key={tab.key}>
                            <a
                                className={`nav-link${activeTab === tab.key ? " active" : ""}`}
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveTab(tab.key); }}
                            >
                                {tab.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="tab-content-area fade-up fade-up-d3">

                    {/* Description */}
                    {activeTab === "desc" && (
                        <div className="row">
                            <div className="col-md-8">
                                <p className="desc-text">
                                    AirPods Max reimagine over-ear headphones. An Apple-designed dynamic driver provides rich, deep bass,
                                    accurate mid-ranges, and clean, extended highs. Computational audio uses the Apple H1 chip to power
                                    Adaptive EQ, Active Noise Cancellation, Transparency mode, and spatial audio.
                                </p>
                                <p className="desc-text">
                                    The ear cushions and headband are designed for all-day comfort. The telescoping arms allow for custom fit,
                                    and the ear cups rotate for easy storage. AirPods Max pair automatically with your Apple devices and
                                    switch between them seamlessly.
                                </p>
                                <div className="row mt-3">
                                    {[
                                        { icon: "fa-music",      title: "Hi-Fi Audio",              sub: "Adaptive EQ for rich sound" },
                                        { icon: "fa-volume-off", title: "Active Noise Cancellation", sub: "Block out the world" },
                                        { icon: "fa-clock-o",   title: "20-Hr Battery",             sub: "All-day listening" },
                                        { icon: "fa-bluetooth", title: "Bluetooth 5.0",             sub: "Seamless connectivity" },
                                    ].map((feat, i) => (
                                        <div className="col-6" key={i}>
                                            <div className="perk-item">
                                                <div className="perk-icon"><i className={`fa ${feat.icon}`}></i></div>
                                                <div className="perk-text">
                                                    <strong>{feat.title}</strong>
                                                    <span>{feat.sub}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-4 d-none d-md-flex align-items-start justify-content-center">
                                <img
                                    src="https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=300&auto=format&fit=crop&q=80"
                                    style={{ maxWidth: "100%", borderRadius: 16, opacity: .85 }}
                                    alt="Product"
                                />
                            </div>
                        </div>
                    )}

                    {/* Specifications */}
                    {activeTab === "specs" && (
                        <div className="row">
                            <div className="col-md-8">
                                <table className="spec-table">
                                    <tbody>
                                        {SPECS.map(([key, val], i) => (
                                            <tr key={i}>
                                                <td>{key}</td>
                                                <td>{val}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Reviews */}
                    {activeTab === "reviews" && (
                        <>
                            {/* Summary */}
                            <div className="row align-items-center mb-4">
                                <div
                                    className="col-auto text-center"
                                    style={{ paddingRight: "1.5rem", borderRight: "1.5px solid var(--border)" }}
                                >
                                    <div style={{ fontSize: "3.2rem", fontWeight: 800, lineHeight: 1 }}>4.5</div>
                                    <StarRow count={4} halfStar size=".85rem" />
                                    <div style={{ fontSize: ".78rem", color: "var(--mid)" }}>2,847 reviews</div>
                                </div>
                                <div className="col">
                                    {RATING_BARS.map((bar, i) => (
                                        <div key={i} className="d-flex align-items-center mb-1" style={{ gap: ".6rem" }}>
                                            <span style={{ fontSize: ".78rem", width: 12 }}>{bar.label}</span>
                                            <div className="flex-grow-1 bg-light rounded" style={{ height: 7, overflow: "hidden" }}>
                                                <div style={{ width: `${bar.pct}%`, height: "100%", background: bar.color, borderRadius: 4, opacity: bar.opacity }}></div>
                                            </div>
                                            <span style={{ fontSize: ".75rem", color: "var(--mid)" }}>{bar.pct}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Review cards */}
                            {REVIEWS.map((rev, i) => (
                                <div className="review-card" key={i}>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <div className="reviewer-name">{rev.name}</div>
                                            <div className="review-stars">
                                                {Array.from({ length: rev.halfStar ? rev.stars - 1 : rev.stars }).map((_, j) => (
                                                    <i key={j} className="fa fa-star"></i>
                                                ))}
                                                {rev.halfStar && <i className="fa fa-star-half-o"></i>}
                                            </div>
                                        </div>
                                        <div className="review-date">{rev.date}</div>
                                    </div>
                                    <p className="review-text">{rev.text}</p>
                                </div>
                            ))}

                            <button
                                className="btn"
                                style={{ border: "1.5px solid var(--border)", borderRadius: 10, fontSize: ".85rem", fontWeight: 600, padding: ".55rem 1.4rem", color: "var(--mid)" }}
                            >
                                <i className="fa fa-chevron-down me-1"></i> Load More Reviews
                            </button>
                        </>
                    )}
                </div>

                {/* ─── RELATED PRODUCTS ─── */}
                <div className="mt-4 fade-up">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="section-title mb-0">Related Products</h2>
                        <a href="#" style={{ fontSize: ".85rem", fontWeight: 700, color: "var(--green)", textDecoration: "none" }}>
                            View All <i className="fa fa-arrow-right ms-1"></i>
                        </a>
                    </div>
                    <div className="row mt-3 g-3">
                        {RELATED_PRODUCTS.map((product, i) => (
                            <div key={i} className={`col-6 col-sm-4 col-md-3 col-lg-2 ${i >= 4 ? "d-none d-lg-block" : ""}`}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <Footer />
            <MobileNav defaultActive="cart" cartCount={3} />
        </>
    );
}
