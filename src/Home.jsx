import { useState } from "react";
import { Link } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./shopcart.css";

/* ── DATA ── */
const CATEGORIES = [
	{ label: "Furniture", icon: "fa-couch", bg: "linear-gradient(135deg,#7c3aed,#4f46e5)" },
	{ label: "Hand Bag", icon: "fa-shopping-bag", bg: "linear-gradient(135deg,#f59e0b,#d97706)" },
	{ label: "Books", icon: "fa-book", bg: "linear-gradient(135deg,#b91c1c,#dc2626)" },
	{ label: "Tech", icon: "fa-microchip", bg: "linear-gradient(135deg,#059669,#10b981)" },
	{ label: "Sneakers", icon: "fa-child", bg: "linear-gradient(135deg,#db2777,#ec4899)" },
	{ label: "Travel", icon: "fa-plane", bg: "linear-gradient(135deg,#0891b2,#0ea5e9)" },
];

const PRODUCTS = [
	{
		id: 1, badge: "-30%", wishlist: true, category: "Electronics",
		name: "Wireless Pro Headphones", stars: [1, 1, 1, 1, .5], reviews: 128,
		price: "$69.99", oldPrice: "$99.99",
		iconBg: "linear-gradient(135deg,#dbeafe,#eff6ff)", icon: "fa-headphones", iconColor: "#1d4ed8",
	},
	{
		id: 2, badge: "New", wishlist: false, category: "Tech",
		name: "UltraPhone 14 Max", stars: [1, 1, 1, 1, 1], reviews: 256,
		price: "$899.00", oldPrice: null,
		iconBg: "linear-gradient(135deg,#d1fae5,#ecfdf5)", icon: "fa-mobile", iconColor: "var(--green-mid)",
	},
	{
		id: 3, badge: "-20%", wishlist: false, category: "Photography",
		name: "Mirrorless Camera X500", stars: [1, 1, 1, 1, 0], reviews: 74,
		price: "$479.00", oldPrice: "$599.00",
		iconBg: "linear-gradient(135deg,#fef9c3,#fefce8)", icon: "fa-camera", iconColor: "#ca8a04",
	},
	{
		id: 4, badge: null, wishlist: false, category: "Computers",
		name: "ProBook Laptop 15\"", stars: [1, 1, 1, 1, .5], reviews: 91,
		price: "$1,199.00", oldPrice: null,
		iconBg: "linear-gradient(135deg,#ffe4e6,#fff1f2)", icon: "fa-laptop", iconColor: "#be123c",
	},
	{
		id: 5, badge: "-15%", wishlist: false, category: "Wearables",
		name: "SmartWatch Series 9", stars: [1, 1, 1, 1, 1], reviews: 312,
		price: "$254.00", oldPrice: "$299.00",
		iconBg: "linear-gradient(135deg,#ede9fe,#f5f3ff)", icon: "fa-clock-o", iconColor: "#7c3aed",
	},
	{
		id: 6, badge: null, wishlist: false, category: "Gaming",
		name: "Pro Gaming Controller", stars: [1, 1, 1, 1, 0], reviews: 183,
		price: "$59.99", oldPrice: null,
		iconBg: "linear-gradient(135deg,#cffafe,#ecfeff)", icon: "fa-gamepad", iconColor: "#0e7490",
	},
	{
		id: 7, badge: "-40%", wishlist: false, category: "Fashion",
		name: "Classic Denim Jacket", stars: [1, 1, 1, 1, .5], reviews: 47,
		price: "$35.99", oldPrice: "$59.99",
		iconBg: "linear-gradient(135deg,#fce7f3,#fdf2f8)", icon: "fa-tag", iconColor: "#be185d",
	},
	{
		id: 8, badge: null, wishlist: false, category: "Home & Garden",
		name: "Indoor Plant Bundle", stars: [1, 1, 1, 1, 1], reviews: 220,
		price: "$44.00", oldPrice: null,
		iconBg: "linear-gradient(135deg,#dcfce7,#f0fdf4)", icon: "fa-leaf", iconColor: "#15803d",
	},
];

const TESTIMONIALS = [
	{
		avatar: "S", name: "Sarah M.", role: "Verified Buyer", stars: 5,
		text: "Absolutely love the shopping experience here! Fast delivery, quality products, and excellent customer service. Will definitely be coming back!",
	},
	{
		avatar: "J", name: "James T.", role: "Regular Customer", stars: 4.5,
		text: "The variety of products is amazing. I found everything I needed in one place and the prices are very competitive. Highly recommend Shopcart!",
	},
	{
		avatar: "A", name: "Anika R.", role: "Verified Buyer", stars: 5,
		text: "Returns were so easy and hassle-free. I ordered the wrong size and they sorted it out within 24 hours. Great platform with even greater support!",
	},
];

/* ── HELPERS ── */
function Stars({ stars }) {
	return (
		<>
			{[0, 1, 2, 3, 4].map((i) => {
				const val = stars[i] ?? 0;
				const cls = val === 1 ? "fa-star" : val === 0.5 ? "fa-star-half-o" : "fa-star-o";
				return <i key={i} className={`fa ${cls}`} style={{ color: "var(--yellow)", fontSize: ".78rem" }} />;
			})}
		</>
	);
}

function ProductCard({ product }) {
	const [wished, setWished] = useState(product.wishlist);
	const [added, setAdded] = useState(false);

	const handleAddToCart = () => {
		setAdded(true);
		setTimeout(() => setAdded(false), 1500);
	};

	return (
		<div className="product-card h-100">
			<div className="img-wrap">
				{product.badge && <span className="badge-tag">{product.badge}</span>}
				<button className="wishlist" onClick={() => setWished(!wished)}>
					<i className={`fa ${wished ? "fa-heart" : "fa-heart-o"}`} />
				</button>
				<div style={{
					width: "160px", height: "160px",
					background: product.iconBg,
					borderRadius: "50%",
					display: "flex", alignItems: "center", justifyContent: "center",
				}}>
					<i className={`fa ${product.icon}`} style={{ fontSize: "4rem", color: product.iconColor }} />
				</div>
			</div>
			<div className="body">
				<div className="cat-tag">{product.category}</div>
				<div className="prod-name">
                    <Link to={'/products/1'}>
                        {product.name}
                    </Link>
                </div>
				<div>
					<Stars stars={product.stars} />
					<span className="review-count">({product.reviews})</span>
				</div>
				<div className="price-row">
					<span className="price">{product.price}</span>
					{product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
				</div>
				<button
					className={`btn-add-cart${added ? " added" : ""}`}
					onClick={handleAddToCart}
				>
					<i className={`fa ${added ? "fa-check" : "fa-shopping-cart"} me-2`} />
					{added ? "Added!" : "Add to Cart"}
				</button>
			</div>
		</div>
	);
}

/* ── MAIN APP ── */
export default function Home() {
	const [activeFilter, setActiveFilter] = useState("All");
	const filters = ["All", "Tech", "Fashion", "Home"];

	return (
		<>
			{/* External CDN links must be in index.html */}
			<Header />

			{/* ── HERO ── */}
			<section className="hero-section">
				<div className="blob blob-1" />
				<div className="blob blob-2" />
				<div className="container h-100">
					<div className="row align-items-center">
						<div className="col-lg-6 hero-text">
							<span className="tag-pill bg-warning text-dark mb-3">New Season Arrivals</span>
							<h1>Shopping And<br />Department Store.</h1>
							<p>Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</p>
							<a href="#" className="btn-hero"><i className="fa fa-arrow-right me-2" />Learn More</a>
						</div>
						<div className="col-lg-6 hero-image-wrap pt-4">
							<div style={{ position: "relative", width: "100%", maxWidth: "480px", margin: "auto", height: "320px" }}>
								{/* Podium steps */}
								<div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "420px" }}>
									<div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "8px" }}>
										{[
											{ h: "80px", icon: "fa-couch", label: "Furniture" },
											{ h: "130px", icon: "fa-laptop", label: "Electronics" },
											{ h: "100px", icon: "fa-suitcase", label: "Travel" },
										].map(({ h, icon, label }) => (
											<div key={label} style={{
												background: "var(--yellow)", width: "130px", height: h,
												borderRadius: "10px 10px 0 0",
												display: "flex", alignItems: "center", justifyContent: "center",
												flexDirection: "column", gap: "6px",
											}}>
												<i className={`fa ${icon}`} style={{ fontSize: "28px", color: "var(--green-dark)" }} />
												<span style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--green-dark)" }}>{label}</span>
											</div>
										))}
									</div>
									<div style={{ height: "8px", background: "rgba(0,0,0,.08)", borderRadius: "50%", margin: "0 20px" }} />
								</div>
								{/* Floating icons */}
								{[
									{ icon: "fa-headphones", color: "var(--green-mid)", size: 22, style: { top: "20px", left: "10%", animation: "float 5s ease-in-out infinite" }, wrap: 54 },
									{ icon: "fa-gamepad", color: "var(--red)", size: 18, style: { top: "10px", right: "5%", animation: "float 6s ease-in-out infinite 1s" }, wrap: 46 },
									{ icon: "fa-camera", color: "var(--yellow)", size: 20, style: { top: "45%", right: "8%", animation: "float 4s ease-in-out infinite .5s" }, wrap: 50 },
								].map(({ icon, color, size, style, wrap }) => (
									<div key={icon} style={{ position: "absolute", ...style }}>
										<div style={{
											background: "#fff", borderRadius: "50%",
											width: `${wrap}px`, height: `${wrap}px`,
											display: "flex", alignItems: "center", justifyContent: "center",
											boxShadow: "0 4px 16px rgba(0,0,0,.12)",
										}}>
											<i className={`fa ${icon}`} style={{ fontSize: `${size}px`, color }} />
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── PROMO BAR ── */}
			<div className="promo-bar">
				<div className="container">
					<div className="row g-3 justify-content-around">
						{[
							{ icon: "fa-truck", text: "Free Shipping over $50" },
							{ icon: "fa-undo", text: "Easy 30-Day Returns" },
							{ icon: "fa-lock", text: "Secure Payment" },
							{ icon: "fa-headphones", text: "24/7 Support" },
						].map(({ icon, text }) => (
							<div key={text} className="col-auto">
								<div className="promo-item">
									<i className={`fa ${icon}`} /> {text}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* ── CATEGORIES ── */}
			<section className="py-5">
				<div className="container">
					<div className="d-flex align-items-end justify-content-between mb-4">
						<div>
							<p className="sec-sub mb-1">Browse by</p>
							<h2 className="sec-title">Shop Our Top Categories</h2>
						</div>
						<a href="#" className="view-all-btn">View All</a>
					</div>
					<div className="row g-3">
						{CATEGORIES.map(({ label, icon, bg }) => (
							<div key={label} className="col-4 col-md-2">
								<div className="cat-card" style={{ background: bg }}>
									<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
										<i className={`fa ${icon}`} style={{ fontSize: "3rem", color: "rgba(255,255,255,.5)" }} />
									</div>
									<div className="cat-label">{label}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── FEATURED PRODUCTS ── */}
			<section className="py-4 pb-5" style={{ background: "#f9fafb" }}>
				<div className="container">
					<div className="d-flex align-items-end justify-content-between mb-4">
						<div>
							<p className="sec-sub mb-1">Hand-picked</p>
							<h2 className="sec-title">Featured Products</h2>
						</div>
						<div className="d-flex gap-2">
							{filters.map((f) => (
								<button
									key={f}
									className={`btn btn-sm px-3 py-1 fw-semibold${f === "Home" ? " d-none d-md-inline-block" : ""}`}
									style={{
										borderRadius: "50px",
										background: activeFilter === f ? "var(--green-dark)" : "",
										color: activeFilter === f ? "#fff" : "",
										border: activeFilter === f ? "none" : "1px solid #6c757d",
									}}
									onClick={() => setActiveFilter(f)}
								>
									{f}
								</button>
							))}
						</div>
					</div>
					<div className="row g-4">
						{PRODUCTS.map((p) => (
							<div key={p.id} className="col-6 col-md-4 col-lg-3">
								<ProductCard product={p} />
							</div>
						))}
					</div>
					<div className="text-center mt-5">
						<a href="#" className="view-all-btn">
							<i className="fa fa-th-large me-2" />View All Products
						</a>
					</div>
				</div>
			</section>

			{/* ── MID BANNER ── */}
			<section className="py-5">
				<div className="container">
					<div className="row g-4">
						<div className="col-lg-7">
							<div className="mid-banner">
								<div className="discount-badge">50%<span>OFF</span></div>
								<h2>Summer Sale<br />is Live Now! 🔥</h2>
								<p>Limited time deals on thousands of items. Don't miss out on the biggest sale of the year.</p>
								<a href="#" className="btn-white">Shop the Sale</a>
							</div>
						</div>
						<div className="col-lg-5">
							<div className="row g-4 h-100">
								<div className="col-12">
									<div className="mid-banner py-4 px-4" style={{ background: "linear-gradient(120deg,#b45309,#d97706)" }}>
										<h2 style={{ fontSize: "1.35rem" }}>New Tech Arrivals <i className="fa fa-microchip ms-2" /></h2>
										<p style={{ fontSize: ".82rem" }}>Explore the latest gadgets and devices just dropped.</p>
										<a href="#" className="btn-white" style={{ padding: "8px 20px", fontSize: ".82rem", marginTop: "14px" }}>Explore Now</a>
									</div>
								</div>
								<div className="col-12">
									<div className="mid-banner py-4 px-4" style={{ background: "linear-gradient(120deg,#0e7490,#0891b2)" }}>
										<h2 style={{ fontSize: "1.35rem" }}>Free Shipping Today <i className="fa fa-truck ms-2" /></h2>
										<p style={{ fontSize: ".82rem" }}>Orders over $50 ship free. Use code <strong>SHIP50</strong>.</p>
										<a href="#" className="btn-white" style={{ padding: "8px 20px", fontSize: ".82rem", marginTop: "14px" }}>Order Now</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── TESTIMONIALS ── */}
			<section className="py-5" style={{ background: "#f9fafb" }}>
				<div className="container">
					<div className="text-center mb-5">
						<p className="sec-sub">What customers say</p>
						<h2 className="sec-title">Trusted by Thousands</h2>
					</div>
					<div className="row g-4">
						{TESTIMONIALS.map(({ avatar, name, role, stars, text }) => (
							<div key={name} className="col-md-4">
								<div className="testimonial-card h-100">
									<div className="quote-icon"><i className="fa fa-quote-left" /></div>
									<p>{text}</p>
									<div className="reviewer">
										<div className="avatar">{avatar}</div>
										<div>
											<div className="name">{name}</div>
											<div className="role">{role}</div>
										</div>
										<div className="ms-auto">
											<Stars stars={[1, 1, 1, 1, stars === 5 ? 1 : 0.5]} />
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
}
