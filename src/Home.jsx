import { useState } from "react";
import { Link } from "react-router";
import Header    from "./components/templates/Header";
import Footer    from "./components/templates/Footer";
import MobileNav from "./components/templates/MobileNav";
import ProductCard from "./components/templates/ProductCard";

/* ─── DATA ─── */
const CATEGORIES = [
    { icon: "fa-headphones", label: "Over-ear" },
    { icon: "fa-music",      label: "In-ear" },
    { icon: "fa-bluetooth",  label: "Wireless" },
    { icon: "fa-microphone", label: "Gaming" },
    { icon: "fa-volume-up",  label: "Sports" },
    { icon: "fa-star",       label: "Best Pick" },
];

const FILTER_PILLS = [
    "Headphone Type", "Price", "Review", "Color", "Material", "Offer",
];

const PRODUCTS = [
    {
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=80",
        title: "Wireless Earbuds, IPX8",
        subtitle: "Organic Cotton, fast-fade certified",
        stars: 4, halfStar: true, reviewCount: 29,
        price: "$89.99", oldPrice: "$120",
    },
    {
        image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=300&auto=format&fit=crop&q=80",
        title: "AirPods Max",
        subtitle: "A perfect balance of high-fidelity audio",
        stars: 5, reviewCount: 53,
        price: "$559.00",
    },
    {
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&auto=format&fit=crop&q=80",
        title: "Bose BT Earphones",
        subtitle: "Slate with air purifier, stained veneer/black",
        stars: 4, emptyStars: 1, reviewCount: 107,
        price: "$159.00", oldPrice: "$200",
    },
    {
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&auto=format&fit=crop&q=80",
        title: "VIVEFOX Headphones",
        subtitle: "Wired Stereo Headphones With Mic",
        stars: 3, halfStar: true, emptyStars: 1, reviewCount: 22,
        price: "$39.99", oldPrice: "$60",
        bgColor: "#fff5f5",
    },
    {
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&auto=format&fit=crop&q=80",
        title: "JBL TUNE 600BTNC",
        subtitle: "Premium Band Conduction Open Ear Bluetooth",
        stars: 4, emptyStars: 1, reviewCount: 20,
        price: "$59.99", oldPrice: "$80",
    },
    {
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&auto=format&fit=crop&q=80",
        title: "TAGRY Bluetooth",
        subtitle: "I30, 8 Link-Ultra, IP X8",
        stars: 4, halfStar: true, reviewCount: 71,
        price: "$109.00", oldPrice: "$140",
        bgColor: "#fffbf0", wished: true,
    },
    {
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&auto=format&fit=crop&q=80",
        title: "Monster MNFLEX",
        subtitle: "Free Active Noise Cancelling, Bluetooth",
        stars: 4, emptyStars: 1, reviewCount: 52,
        price: "$89.99",
        bgColor: "#f0f4ff",
    },
    {
        image: "https://images.unsplash.com/photo-1491927570842-0261e477d937?w=300&auto=format&fit=crop&q=80",
        title: "Mpow CH6",
        subtitle: "Kids Headphones",
        stars: 5, reviewCount: 70,
        price: "$589.00", oldPrice: "$700",
        bgColor: "#f0faff",
    },
    {
        image: "https://images.unsplash.com/photo-1505740106531-4243f3831c78?w=300&auto=format&fit=crop&q=80",
        title: "Sony WH-1000XM5",
        subtitle: "Industry-leading noise cancellation",
        stars: 5, reviewCount: 94,
        price: "$349.99", oldPrice: "$399",
    },
    {
        image: "https://images.unsplash.com/photo-1648371516573-0b52e08b1d90?w=300&auto=format&fit=crop&q=80",
        title: "Beats Studio Pro",
        subtitle: "Personalized Spatial Audio, ANC",
        stars: 4, halfStar: true, reviewCount: 48,
        price: "$299.99", oldPrice: "$350",
        bgColor: "#fff5ee",
    },
    {
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=300&auto=format&fit=crop&q=80",
        title: "Anker Soundcore Q45",
        subtitle: "Adaptive Active Noise Cancelling",
        stars: 4, emptyStars: 1, reviewCount: 38,
        price: "$79.99", oldPrice: "$99",
        bgColor: "#f5f0ff",
    },
    {
        image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=300&auto=format&fit=crop&q=80",
        title: "Sennheiser HD 450BT",
        subtitle: "Bluetooth 5.0 Wireless Headphones",
        stars: 4, halfStar: true, reviewCount: 61,
        price: "$149.99", oldPrice: "$200",
        bgColor: "#f0fff5",
    },
];

/* ─── COMPONENT ─── */
export default function Home() {
    const [activeFilter, setActiveFilter] = useState("Headphone Type");
    const [email, setEmail] = useState("");

    return (
        <>
            <Header activePage="home" cartCount={3} />

            <div className="container-fluid px-3 px-md-4 mt-3">
                <div className="hero">
                    <div className="hero-content">
                        <span className="hero-badge"><i className="fa fa-bolt"></i> Limited Offer</span>
                        <h1>Grab Upto <span>50% Off</span> On Selected Headphone</h1>
                        <button className="btn-hero">
                            <i className="fa fa-shopping-bag"></i> Buy Now
                        </button>
                    </div>
                    <img
                        className="hero-img d-none d-sm-block"
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80"
                        alt="Headphone Model"
                    />
                </div>
            </div>

            <div className="container-fluid px-3 px-md-4 mt-4">
                <div className="row g-2">
                    {CATEGORIES.map((cat, i) => (
                        <div className="col-4 col-sm-2" key={i}>
                            <div className="cat-chip">
                                <i className={`fa ${cat.icon}`}></i>
                                {cat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container-fluid px-3 px-md-4">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 filter-bar">
                    <div className="d-flex gap-1 flex-nowrap">
                        {FILTER_PILLS.map((pill) => (
                            <div
                                key={pill}
                                className={`filter-pill${activeFilter === pill ? " active" : ""}`}
                                onClick={() => setActiveFilter(pill)}
                            >
                                {pill} <i className="fa fa-angle-down"></i>
                            </div>
                        ))}
                        <div
                            className="filter-pill"
                            onClick={() => setActiveFilter("All Filters")}
                        >
                            <i className="fa fa-sliders"></i> All Filters{" "}
                            <span className="badge bg-dark ms-1 rounded-pill" style={{ fontSize: ".65rem" }}>3</span>
                        </div>
                    </div>
                    <select className="sort-select">
                        <option>Sort by: Relevance</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Best Rated</option>
                        <option>Newest</option>
                    </select>
                </div>
            </div>

            <div className="container-fluid px-3 px-md-4">
                <h2 className="section-title">Headphones For You!</h2>
                <div className="row g-3" id="productGrid">
                    {PRODUCTS.map((product, i) => (
                        <div className="col-6 col-sm-4 col-md-3 col-xl-2" key={i}>
                            <Link to={`/products/1`}>
                                <ProductCard product={product} />
                            </Link>
                            
                        </div>
                    ))}
                </div>

                <div className="text-center mt-4 mb-2">
                    <button
                        className="btn btn-outline-secondary px-4"
                        style={{ borderRadius: 10, fontWeight: 600, fontSize: ".88rem" }}
                    >
                        <i className="fa fa-refresh me-2"></i>Load More Products
                    </button>
                </div>
            </div>

            {/* ─── PROMO BANNER ─── */}
            <div className="container-fluid px-3 px-md-4 mt-4">
                <div className="promo-banner">
                    <div className="decoration"></div>
                    <div className="decoration2"></div>
                    <div className="row align-items-center">
                        <div className="col-12 col-md-8">
                            <h3>New Arrivals Every Week 🎧</h3>
                            <p>
                                Subscribe to our newsletter and get exclusive early access deals, new product alerts,
                                and personalized recommendations.
                            </p>
                            <div className="d-flex gap-2 flex-wrap">
                                <input
                                    type="email"
                                    placeholder="Enter your email..."
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ maxWidth: 260, borderRadius: 10, border: "none", fontSize: ".875rem" }}
                                />
                                <button className="btn-hero">
                                    <i className="fa fa-envelope"></i> Subscribe
                                </button>
                            </div>
                        </div>
                        <div className="col-4 d-none d-md-flex justify-content-end">
                            <i className="fa fa-headphones" style={{ fontSize: "7rem", opacity: .12 }}></i>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <MobileNav defaultActive="home" cartCount={3} />
        </>
    );
}
