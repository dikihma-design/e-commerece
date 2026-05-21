import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./shopcart.css";

/* ════════════════════════════════
   DATA
════════════════════════════════ */
const COLORS = [
  { name: "Red",    hex: "#c0392b" },
  { name: "Black",  hex: "#212121" },
  { name: "Green",  hex: "#2d6a4f" },
  { name: "Silver", hex: "#bdbdbd" },
  { name: "Navy",   hex: "#1a237e" },
];

/* Inline SVG headphone illustrations keyed by color */
const HeadphoneSVG = ({ color }) => {
  const themes = {
    Red:    { bg: "#fff0f0", band: "#c0392b", outerCup: "#e57373", innerCup: "#c0392b", highlight: "#ef9a9a", stem: "#b71c1c" },
    Black:  { bg: "#f0f0f0", band: "#212121", outerCup: "#424242", innerCup: "#212121", highlight: "#616161", stem: "#1a1a1a" },
    Green:  { bg: "#f0fff4", band: "#2d6a4f", outerCup: "#52b788", innerCup: "#2d6a4f", highlight: "#74c69d", stem: "#1b4332" },
    Silver: { bg: "#f8f8f8", band: "#9e9e9e", outerCup: "#e0e0e0", innerCup: "#bdbdbd", highlight: "#f5f5f5", stem: "#9e9e9e" },
    Navy:   { bg: "#e8eaf6", band: "#1a237e", outerCup: "#3949ab", innerCup: "#1a237e", highlight: "#5c6bc0", stem: "#0d1361" },
  };
  const t = themes[color] || themes.Red;
  return (
    <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="140" cy="140" r="130" fill={t.bg} opacity=".5"/>
      <path d="M60 140 Q60 60 140 60 Q220 60 220 140" stroke={t.band} strokeWidth="14" fill="none" strokeLinecap="round"/>
      <ellipse cx="55" cy="148" rx="32" ry="38" fill={t.outerCup}/>
      <ellipse cx="55" cy="148" rx="22" ry="28" fill={t.innerCup}/>
      <ellipse cx="55" cy="148" rx="14" ry="18" fill={t.highlight}/>
      <ellipse cx="225" cy="148" rx="32" ry="38" fill={t.outerCup}/>
      <ellipse cx="225" cy="148" rx="22" ry="28" fill={t.innerCup}/>
      <ellipse cx="225" cy="148" rx="14" ry="18" fill={t.highlight}/>
      <rect x="46" y="118" width="18" height="24" rx="6" fill={t.stem}/>
      <rect x="216" y="118" width="18" height="24" rx="6" fill={t.stem}/>
      <circle cx="140" cy="140" r="10" fill="#fff" opacity=".3"/>
    </svg>
  );
};

const ThumbSVG = ({ color }) => {
  const themes = {
    Red:    { bg: "#fff0f0", band: "#c0392b", cup: "#c0392b" },
    Black:  { bg: "#f0f0f0", band: "#212121", cup: "#212121" },
    Green:  { bg: "#f0fff4", band: "#2d6a4f", cup: "#2d6a4f" },
    Silver: { bg: "#f8f8f8", band: "#9e9e9e", cup: "#bdbdbd" },
    Navy:   { bg: "#e8eaf6", band: "#1a237e", cup: "#1a237e" },
  };
  const t = themes[color] || themes.Red;
  return (
    <svg width="60" height="60" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="28" fill={t.bg}/>
      <path d="M14 30 Q14 12 30 12 Q46 12 46 30" stroke={t.band} strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="12" cy="32" rx="7" ry="9" fill={t.cup}/>
      <ellipse cx="48" cy="32" rx="7" ry="9" fill={t.cup}/>
    </svg>
  );
};

const RELATED = [
  { id: 1, badge: null,   category: "Audio", name: "Sony WH-1000XM5",       stars: [1,1,1,1,.5], reviews: 340, price: "$349.99", oldPrice: "$399.99", icon: "fa-headphones", iconBg: "linear-gradient(135deg,#dbeafe,#eff6ff)", iconColor: "#1d4ed8" },
  { id: 2, badge: "New",  category: "Audio", name: "Bose QuietComfort 45",   stars: [1,1,1,1,0],  reviews: 187, price: "$279.00", oldPrice: null,       icon: "fa-music",      iconBg: "linear-gradient(135deg,#d1fae5,#ecfdf5)", iconColor: "var(--green-mid)" },
  { id: 3, badge: "-20%", category: "Audio", name: "Jabra Evolve2 85",       stars: [1,1,1,1,.5], reviews: 92,  price: "$319.00", oldPrice: "$399.00",  icon: "fa-volume-up",  iconBg: "linear-gradient(135deg,#fef9c3,#fefce8)", iconColor: "#ca8a04" },
  { id: 4, badge: null,   category: "Audio", name: "Sennheiser Momentum 4",  stars: [1,1,1,1,1],  reviews: 204, price: "$349.95", oldPrice: null,       icon: "fa-podcast",    iconBg: "linear-gradient(135deg,#ede9fe,#f5f3ff)", iconColor: "#7c3aed" },
];

const SPECS = {
  Audio: [
    ["Driver Type", "Custom 40mm dynamic driver"],
    ["Frequency Response", "20Hz – 20,000Hz"],
    ["Impedance", "32Ω"],
    ["Sound Pressure Level", "Up to 96dB SPL"],
    ["Noise Cancellation", "Active Noise Cancellation (ANC)"],
    ["Transparency Mode", "Yes"],
    ["Spatial Audio", "Yes, with dynamic head tracking"],
  ],
  Connectivity: [
    ["Wireless Protocol", "Bluetooth 5.0"],
    ["Range", "Up to 10 meters"],
    ["Chip", "Apple H1 (dual)"],
    ["Compatibility", "iOS 14+, iPadOS 14+, macOS 11+"],
    ["Auto Switch", "Automatic device switching"],
    ["Multi-device", "Up to 2 devices simultaneously"],
  ],
  "Battery & Charging": [
    ["Battery Life", "Up to 20 hours"],
    ["ANC Battery Life", "Up to 20 hours with ANC on"],
    ["Charging Time", "~2 hours (full charge)"],
    ["Quick Charge", "5 min = 1.5 hrs playback"],
    ["Charging Port", "Lightning (included)"],
  ],
  "Design & Physical": [
    ["Weight", "384.8 g"],
    ["Headband Material", "Stainless steel with telescoping arms"],
    ["Ear Cushions", "Memory foam, magnetic attachment"],
    ["Controls", "Digital Crown + Noise Control button"],
    ["Microphones", "9 microphones (3 ANC, 3 call, 3 transparency)"],
    ["Colors Available", "Red, Black, Green, Silver, Navy"],
  ],
};

const REVIEWS = [
  { initial: "S", color: "#c0392b", name: "Sarah Mitchell", date: "March 12, 2025", stars: 5,   verified: true, yes: 24, no: 2,  body: "Absolutely incredible sound quality. The ANC is the best I've ever experienced — completely blocks out my open-plan office. The build quality feels premium and the mesh headband is surprisingly comfortable for long sessions. Totally worth the price." },
  { initial: "J", color: "#1a237e", name: "James T.",        date: "February 5, 2025", stars: 4, verified: true, yes: 18, no: 1,  body: "The spatial audio feature is genuinely mind-blowing when watching movies on iPad. Auto-switching between my iPhone and Mac is seamless. Docking one star because the carry case is underwhelming for the price, but the headphones themselves are exceptional." },
  { initial: "A", color: "#2d6a4f", name: "Anika R.",        date: "January 18, 2025", stars: 4.5, verified: true, yes: 11, no: 0, body: "Coming from Sony WH-1000XM5, the AirPods Max integrate so much better with my Apple ecosystem. The sound signature is more neutral and accurate. They're heavy but I forget about it after 10 minutes. Delivery was fast and packaging was beautiful." },
];

const FAQS = [
  { q: "Does AirPods Max work with Android?",  a: "AirPods Max can connect to Android devices via Bluetooth, but many Apple-specific features like Spatial Audio, seamless switching, Hey Siri, and battery status are unavailable." },
  { q: "Can I use a wired connection?",         a: "Yes. Apple sells a Lightning to 3.5mm Audio Cable separately. When connected via the cable, audio passes through the H1 chip and ANC remains active." },
  { q: "Are the ear cushions replaceable?",     a: "Yes! The ear cushions attach magnetically and can be swapped out easily. Apple sells replacement cushions in all original colors for $69 a pair." },
  { q: "What's in the box?",                    a: "In the box: AirPods Max, Smart Case, Lightning to USB-C Cable, and documentation. A power adapter is not included." },
];

/* ════════════════════════════════
   HELPERS
════════════════════════════════ */
function StarRow({ stars, size = ".9rem" }) {
  return (
    <>
      {[0,1,2,3,4].map((i) => {
        const v = typeof stars === "number" ? (i < Math.floor(stars) ? 1 : (stars % 1 >= 0.5 && i === Math.floor(stars) ? 0.5 : 0)) : (stars[i] ?? 0);
        const cls = v === 1 ? "fa-star" : v === 0.5 ? "fa-star-half-o" : "fa-star-o";
        return <i key={i} className={`fa ${cls}`} style={{ color: "var(--yellow)", fontSize: size }} />;
      })}
    </>
  );
}

function RelatedCard({ p }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const handleAdd = () => { setAdded(true); setTimeout(() => setAdded(false), 1500); };
  return (
    <div className="product-card">
      <div className="img-wrap">
        {p.badge && <span className="badge-tag">{p.badge}</span>}
        <button className="wishlist" onClick={() => setWished(!wished)}>
          <i className={`fa ${wished ? "fa-heart" : "fa-heart-o"}`} />
        </button>
        <div style={{ width: 140, height: 140, background: p.iconBg, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <i className={`fa ${p.icon}`} style={{ fontSize: "3.5rem", color: p.iconColor }} />
        </div>
      </div>
      <div className="body">
        <div className="cat-tag">{p.category}</div>
        <div className="prod-name">{p.name}</div>
        <div><StarRow stars={p.stars} size=".75rem" /><span className="review-count ms-1">({p.reviews})</span></div>
        <div className="price-row">
          <span className="price">{p.price}</span>
          {p.oldPrice && <span className="old-price">{p.oldPrice}</span>}
        </div>
        <button className={`btn-add-cart${added ? " added" : ""}`} onClick={handleAdd}>
          <i className={`fa ${added ? "fa-check" : "fa-shopping-cart"} me-1`} />{added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════
   MAIN COMPONENT
════════════════════════════════ */
export default function ProductDetail() {
  const MAX_QTY = 12;
  const [color, setColor]       = useState("Red");
  const [qty, setQty]           = useState(1);
  const [wished, setWished]     = useState(false);
  const [activeTab, setTab]     = useState("spec");
  const [postal, setPostal]     = useState("");
  const [delivery, setDelivery] = useState(null);
  const [loadingDel, setLoadingDel] = useState(false);
  const [cartAdded, setCartAdded]   = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [stickyCartAdded, setStickyCartAdded] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [openFaq, setOpenFaq]   = useState(0);
  const colorIdx = COLORS.findIndex((c) => c.name === color);
  const sectionRef = useRef(null);

  /* Sticky bar on scroll */
  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeColor = (name) => setColor(name);
  const changeQty   = (d)    => setQty((v) => Math.max(1, Math.min(MAX_QTY, v + d)));

  const handleAddCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 1800);
  };
  const handleBuyNow = () => {
    setBuyLoading(true);
    setTimeout(() => setBuyLoading(false), 1800);
  };
  const handleStickyCart = () => {
    setStickyCartAdded(true);
    setTimeout(() => setStickyCartAdded(false), 1800);
  };
  const checkDelivery = () => {
    if (!postal.trim()) return;
    setDelivery(null);
    setLoadingDel(true);
    setTimeout(() => {
      setLoadingDel(false);
      setDelivery("free");
    }, 900);
  };

  const tabs = [
    { id: "spec",   label: "Full Specifications", icon: "fa-list-ul" },
    { id: "desc",   label: "Description",         icon: "fa-info-circle" },
    { id: "review", label: "Reviews (121)",        icon: "fa-comments" },
    { id: "faq",    label: "FAQ",                  icon: "fa-question-circle" },
  ];

  return (
    <>
      <Header />

      {/* ── BREADCRUMB ── */}
      <div className="breadcrumb-wrap" style={{ background: "#f9fafb", borderBottom: "1px solid #e9ecef" }}>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {["Home", "Electronics", "Audio", "Headphones", "Shop Headphones by type"].map((crumb) => (
                <li key={crumb} className="breadcrumb-item">
                  {crumb === "Home" ? <a href="#"><i className="fa fa-home me-1" />{crumb}</a> : <a href="#">{crumb}</a>}
                </li>
              ))}
              <li className="breadcrumb-item active">airpods-max</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ── PRODUCT DETAIL ── */}
      <section className="py-5" ref={sectionRef}>
        <div className="container">
          <div className="row g-5">

            {/* LEFT: Gallery */}
            <div className="col-lg-5">
              <div className="gallery-main">
                <button className="img-nav prev" onClick={() => changeColor(COLORS[(colorIdx - 1 + COLORS.length) % COLORS.length].name)}>
                  <i className="fa fa-angle-left" />
                </button>
                <div className="img-fade" key={color}>
                  <HeadphoneSVG color={color} />
                </div>
                <button className="zoom-btn" onClick={() => setZoomOpen(true)}>
                  <i className="fa fa-search-plus" style={{ color: "var(--muted)" }} />
                </button>
                <button className="img-nav next" onClick={() => changeColor(COLORS[(colorIdx + 1) % COLORS.length].name)}>
                  <i className="fa fa-angle-right" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="thumb-strip">
                {COLORS.map((c) => (
                  <div key={c.name} className={`thumb${color === c.name ? " active" : ""}`} onClick={() => changeColor(c.name)}>
                    <ThumbSVG color={c.name} />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Info */}
            <div className="col-lg-7">
              <div className="product-info">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="brand-tag">Apple</span>
                  <span style={{ color: "#e5e7eb" }}>|</span>
                  <span style={{ fontSize: ".75rem", color: "var(--muted)" }}>SKU: APL-APM-RED-001</span>
                </div>
                <h1>Airpods Max</h1>
                <p className="tagline">A perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.</p>

                {/* Rating */}
                <div className="rating-row">
                  <div className="stars"><StarRow stars={4.8} /></div>
                  <span className="rating-val">4.8</span>
                  <span className="review-link">121 Reviews</span>
                  <span className="in-stock"><i className="fa fa-check-circle" />In Stock</span>
                </div>

                {/* Price */}
                <div className="price-section">
                  <div className="d-flex align-items-baseline flex-wrap gap-1">
                    <span className="main-price">$549.00</span>
                    <span className="monthly">or $99.99/month</span>
                    <span className="old-price">$649.00</span>
                    <span className="savings-tag">Save $100</span>
                  </div>
                  <div className="financing"><i className="fa fa-info-circle me-1" />Suggested payments with 6 months special financing</div>
                </div>

                <hr style={{ borderColor: "#e9ecef", margin: "18px 0" }} />

                {/* Color Picker */}
                <div className="mb-4">
                  <div className="option-label">Choose a Color: <span>{color}</span></div>
                  <div className="color-picker">
                    {COLORS.map((c) => (
                      <div
                        key={c.name}
                        className={`color-swatch${color === c.name ? " active" : ""}`}
                        style={{ background: c.hex }}
                        onClick={() => changeColor(c.name)}
                      >
                        <span className="tooltip-name">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity + Stock */}
                <div className="qty-row">
                  <div>
                    <div className="option-label mb-2">Quantity</div>
                    <div className="qty-control">
                      <button onClick={() => changeQty(-1)}><i className="fa fa-minus" /></button>
                      <input type="number" value={qty} readOnly />
                      <button onClick={() => changeQty(1)}><i className="fa fa-plus" /></button>
                    </div>
                  </div>
                  <div className="stock-note">
                    Only <span style={{ color: "var(--red)", fontWeight: 700, display: "inline" }}>{MAX_QTY - qty + 1} Items</span> Left!
                    <span>Don't miss it</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="cta-row">
                  <button className="btn-buy" onClick={handleBuyNow}>
                    <i className={`fa ${buyLoading ? "fa-spinner fa-spin" : "fa-bolt"} me-2`} />
                    {buyLoading ? "Processing…" : "Buy Now"}
                  </button>
                  <button className={`btn-cart${cartAdded ? " added" : ""}`} onClick={handleAddCart}>
                    <i className={`fa ${cartAdded ? "fa-check" : "fa-shopping-cart"} me-2`} />
                    {cartAdded ? "Added to Cart!" : "Add to Cart"}
                  </button>
                  <button
                    className={`btn-wishlist${wished ? " active" : ""}`}
                    title="Add to Wishlist"
                    onClick={() => setWished(!wished)}
                  >
                    <i className={`fa ${wished ? "fa-heart" : "fa-heart-o"}`} />
                  </button>
                </div>

                {/* Trust badges */}
                <div className="trust-strip mb-3">
                  {[
                    { icon: "fa-shield",      label: "2 Year Warranty" },
                    { icon: "fa-undo",        label: "30-Day Returns" },
                    { icon: "fa-lock",        label: "Secure Checkout" },
                    { icon: "fa-certificate", label: "Genuine Product" },
                  ].map(({ icon, label }) => (
                    <span key={label} className="trust-badge ms-3">
                      <i className={`fa ${icon}`} /> {label}
                    </span>
                  ))}
                </div>

                {/* Delivery Box */}
                <div className="delivery-box">
                  <div className="delivery-row">
                    <div className="delivery-icon" style={{ background: "#dcfce7" }}>
                      <i className="fa fa-truck" style={{ color: "var(--green-mid)", fontSize: "1.1rem" }} />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-title">Free Delivery</div>
                      <div className="d-sub">Enter your Postal code for Delivery Availability</div>
                      <div className="postal-input">
                        <input
                          type="text"
                          placeholder="Enter postal code…"
                          value={postal}
                          onChange={(e) => setPostal(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && checkDelivery()}
                        />
                        <button onClick={checkDelivery}>Check</button>
                      </div>
                      {loadingDel && (
                        <div style={{ fontSize: ".78rem", marginTop: "6px" }}>
                          <i className="fa fa-spinner fa-spin me-1" />Checking…
                        </div>
                      )}
                      {delivery === "free" && (
                        <div style={{ fontSize: ".78rem", marginTop: "6px" }}>
                          <i className="fa fa-check-circle me-1" style={{ color: "#16a34a" }} />
                          <span style={{ color: "#16a34a", fontWeight: 600 }}>Free delivery available</span> – Estimated arrival: <strong>2-3 business days</strong>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="delivery-row">
                    <div className="delivery-icon" style={{ background: "#fef9c3" }}>
                      <i className="fa fa-refresh" style={{ color: "#ca8a04", fontSize: "1.1rem" }} />
                    </div>
                    <div>
                      <div className="d-title">Return Delivery</div>
                      <div className="d-sub">Free 30 days Delivery Returns. <a href="#">Details</a></div>
                    </div>
                  </div>
                  <div className="delivery-row">
                    <div className="delivery-icon" style={{ background: "#dbeafe" }}>
                      <i className="fa fa-credit-card" style={{ color: "#1d4ed8", fontSize: "1rem" }} />
                    </div>
                    <div>
                      <div className="d-title">Pay on Delivery</div>
                      <div className="d-sub">Available for select pin codes. <a href="#">Check eligibility</a></div>
                    </div>
                  </div>
                </div>

                {/* Share */}
                <div className="share-row">
                  <span>Share:</span>
                  {[
                    { icon: "fa-facebook",  color: "#1877f2" },
                    { icon: "fa-twitter",   color: "#1da1f2" },
                    { icon: "fa-whatsapp",  color: "#25d366" },
                    { icon: "fa-link",      color: "var(--muted)" },
                  ].map(({ icon, color: c }) => (
                    <button key={icon} className="share-btn">
                      <i className={`fa ${icon}`} style={{ color: c }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <section className="py-2 pb-5">
        <div className="container">
          <div className="product-tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`tab-btn${activeTab === t.id ? " active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                <i className={`fa ${t.icon} me-2`} />{t.label}
              </button>
            ))}
          </div>

          {/* SPECIFICATIONS */}
          {activeTab === "spec" && (
            <div className="tab-pane active">
              <h5 className="fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Apple AirPods Max Wireless Headphones Full Specifications
              </h5>
              <div className="row g-4">
                {Object.entries(SPECS).map(([group, rows]) => (
                  <div key={group} className="col-lg-6">
                    <h6 className="fw-bold mb-3" style={{ color: "var(--green-dark)", textTransform: "uppercase", fontSize: ".78rem", letterSpacing: ".06em" }}>{group}</h6>
                    <table className="specs-table">
                      <tbody>
                        {rows.map(([k, v]) => (
                          <tr key={k}><td>{k}</td><td>{v}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DESCRIPTION */}
          {activeTab === "desc" && (
            <div className="tab-pane active">
              <div className="row g-5 align-items-center">
                <div className="col-lg-7">
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, marginBottom: 16 }}>Designed for Sound. Engineered for Experience.</h4>
                  <p style={{ fontSize: ".92rem", lineHeight: 1.85, color: "#374151", marginBottom: 16 }}>
                    AirPods Max reimagine over-ear headphones. An Apple-designed dynamic driver provides high-fidelity audio and reproduces sound with ultra-low distortion across the audible range — from the deepest lows to the highest highs.
                  </p>
                  <p style={{ fontSize: ".92rem", lineHeight: 1.85, color: "#374151", marginBottom: 24 }}>
                    AirPods Max feature a custom-built driver that works in tandem with a unique dual neodymium ring magnet motor to control movement of the diaphragm with precision and consistency.
                  </p>
                  <div className="row g-3">
                    {[
                      { icon: "fa-volume-up",   title: "Adaptive EQ",        sub: "Tunes music in real time to your ear's shape" },
                      { icon: "fa-microphone",  title: "Transparency Mode",   sub: "Hear your environment while listening" },
                      { icon: "fa-battery-full",title: "20hr Battery",        sub: "ANC + Spatial Audio all day" },
                      { icon: "fa-magic",       title: "Spatial Audio",       sub: "Surround sound with head tracking" },
                    ].map(({ icon, title, sub }) => (
                      <div key={title} className="col-6">
                        <div style={{ background: "var(--card-bg)", borderRadius: 12, padding: 16, border: "1px solid #e9ecef" }}>
                          <i className={`fa ${icon}`} style={{ fontSize: "1.5rem", color: "var(--green-accent)", marginBottom: 8, display: "block" }} />
                          <div style={{ fontWeight: 700, fontSize: ".9rem", marginBottom: 4 }}>{title}</div>
                          <div style={{ fontSize: ".8rem", color: "var(--muted)" }}>{sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-lg-5 text-center">
                  <div style={{ background: "linear-gradient(135deg,#d4ecd4,#c8e8ec)", borderRadius: 20, padding: 40, display: "inline-block" }}>
                    <HeadphoneSVG color="Green" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REVIEWS */}
          {activeTab === "review" && (
            <div className="tab-pane active">
              <div className="review-summary">
                <div className="big-rating">
                  <div className="num">4.8</div>
                  <div className="stars-lg"><StarRow stars={4.8} size="1.1rem" /></div>
                  <div className="total">121 Reviews</div>
                </div>
                <div className="rating-bars flex-grow-1">
                  {[
                    { label: "5 ★", pct: "72%", color: "var(--yellow)", count: 87 },
                    { label: "4 ★", pct: "18%", color: "#f9c22e",       count: 22 },
                    { label: "3 ★", pct: "6%",  color: "#fbbf24",       count: 7  },
                    { label: "2 ★", pct: "3%",  color: "#f87171",       count: 3  },
                    { label: "1 ★", pct: "2%",  color: "#ef4444",       count: 2  },
                  ].map(({ label, pct, color: c, count }) => (
                    <div key={label} className="bar-row">
                      <span className="label">{label}</span>
                      <div className="bar-outer"><div className="bar-inner" style={{ width: pct, background: c }} /></div>
                      <span className="count">{count}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center d-none d-md-block">
                  <button style={{ background: "var(--green-dark)", color: "#fff", border: "none", borderRadius: 50, padding: "12px 24px", fontWeight: 700, fontSize: ".88rem", cursor: "pointer" }}>Write a Review</button>
                  <div style={{ fontSize: ".75rem", color: "var(--muted)", marginTop: 8 }}>Share your experience</div>
                </div>
              </div>

              {REVIEWS.map((r) => (
                <div key={r.name} className="review-card">
                  <div className="rev-header">
                    <div className="avatar" style={{ background: r.color }}>{r.initial}</div>
                    <div>
                      <div className="rev-name">{r.name}</div>
                      <div className="rev-date">{r.date}</div>
                    </div>
                    {r.verified && <span className="verified"><i className="fa fa-check-circle me-1" />Verified Purchase</span>}
                  </div>
                  <div className="stars mb-2"><StarRow stars={r.stars} /></div>
                  <div className="rev-body">{r.body}</div>
                  <div className="helpful">Was this helpful? <button>👍 Yes ({r.yes})</button><button>👎 No ({r.no})</button></div>
                </div>
              ))}
              <div className="text-center mt-4">
                <button style={{ border: "2px solid var(--green-dark)", color: "var(--green-dark)", background: "#fff", borderRadius: 50, padding: "10px 28px", fontWeight: 700, cursor: "pointer", fontSize: ".88rem" }}>Load More Reviews</button>
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeTab === "faq" && (
            <div className="tab-pane active">
              <div className="accordion">
                {FAQS.map((f, i) => (
                  <div key={i} className="accordion-item border rounded-3 mb-3" style={{ overflow: "hidden" }}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button fw-semibold${openFaq === i ? "" : " collapsed"}`}
                        style={{ fontSize: ".92rem" }}
                        onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      >
                        {f.q}
                      </button>
                    </h2>
                    {openFaq === i && (
                      <div className="accordion-body" style={{ fontSize: ".88rem", color: "#374151" }}>{f.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      <section className="py-5" style={{ background: "#f9fafb" }}>
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-4">
            <div>
              <p style={{ fontSize: ".82rem", color: "var(--muted)" }}>Customers also viewed</p>
              <h2 className="sec-title">Related Products</h2>
            </div>
            <a href="#" style={{ border: "2px solid var(--green-dark)", color: "var(--green-dark)", padding: "8px 20px", borderRadius: 50, fontWeight: 600, fontSize: ".85rem", textDecoration: "none" }}>View All</a>
          </div>
          <div className="row g-4">
            {RELATED.map((p) => (
              <div key={p.id} className="col-6 col-md-4 col-lg-3">
                <RelatedCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY BAR ── */}
      <div className={`sticky-bar${stickyVisible ? " visible" : ""}`}>
        <div className="container d-flex align-items-center gap-3">
          <div className="prod-thumb">
            <i className="fa fa-headphones" style={{ fontSize: "1.4rem", color: "var(--green-mid)" }} />
          </div>
          <div className="flex-grow-1">
            <div style={{ fontWeight: 700, fontSize: ".9rem" }}>Airpods Max</div>
            <div style={{ fontSize: ".8rem", color: "var(--muted)" }}>Color: {color}</div>
          </div>
          <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--green-dark)" }}>$549.00</div>
          <button className="btn-buy" style={{ flex: 0, padding: "10px 28px" }} onClick={handleStickyCart}>
            <i className={`fa ${stickyCartAdded ? "fa-check" : "fa-shopping-cart"} me-2`} />
            {stickyCartAdded ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* ── ZOOM MODAL ── */}
      {zoomOpen && (
        <div className="zoom-modal open" onClick={() => setZoomOpen(false)}>
          <button className="zoom-close" onClick={() => setZoomOpen(false)}>
            <i className="fa fa-times" />
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <HeadphoneSVG color={color} />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
