import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Link } from "react-router";
import "./shopcart.css";

/* ════════════════════════════════
   PRODUCT SVGs
════════════════════════════════ */
const AirpodsMaxSVG = () => (
  <svg width="70" height="70" viewBox="0 0 90 90" fill="none">
    <circle cx="45" cy="45" r="42" fill="#fff0f5" opacity=".7" />
    <path d="M18 45 Q18 18 45 18 Q72 18 72 45" stroke="#d4778a" strokeWidth="6" fill="none" strokeLinecap="round" />
    <ellipse cx="15" cy="48" rx="12" ry="15" fill="#e8a0b0" />
    <ellipse cx="15" cy="48" rx="8" ry="10" fill="#d4778a" />
    <ellipse cx="15" cy="48" rx="4.5" ry="6" fill="#f2b8c6" />
    <ellipse cx="75" cy="48" rx="12" ry="15" fill="#e8a0b0" />
    <ellipse cx="75" cy="48" rx="8" ry="10" fill="#d4778a" />
    <ellipse cx="75" cy="48" rx="4.5" ry="6" fill="#f2b8c6" />
    <rect x="11" y="37" width="7" height="9" rx="3" fill="#c05070" />
    <rect x="72" y="37" width="7" height="9" rx="3" fill="#c05070" />
  </svg>
);

const SonySVG = () => (
  <svg width="70" height="70" viewBox="0 0 90 90" fill="none">
    <circle cx="45" cy="45" r="42" fill="#e8f0fe" opacity=".7" />
    <path d="M20 45 Q20 20 45 20 Q70 20 70 45" stroke="#1d4ed8" strokeWidth="6" fill="none" strokeLinecap="round" />
    <ellipse cx="17" cy="49" rx="11" ry="14" fill="#3b82f6" />
    <ellipse cx="17" cy="49" rx="7" ry="9" fill="#1d4ed8" />
    <ellipse cx="73" cy="49" rx="11" ry="14" fill="#3b82f6" />
    <ellipse cx="73" cy="49" rx="7" ry="9" fill="#1d4ed8" />
    <rect x="12" y="38" width="9" height="9" rx="3" fill="#1e3a8a" />
    <rect x="69" y="38" width="9" height="9" rx="3" fill="#1e3a8a" />
  </svg>
);

const BoseSVG = () => (
  <svg width="70" height="70" viewBox="0 0 90 90" fill="none">
    <circle cx="45" cy="45" r="42" fill="#fdf4e7" opacity=".7" />
    <path d="M19 45 Q19 19 45 19 Q71 19 71 45" stroke="#b45309" strokeWidth="6" fill="none" strokeLinecap="round" />
    <ellipse cx="16" cy="48" rx="11" ry="14" fill="#fbbf24" />
    <ellipse cx="16" cy="48" rx="7" ry="9" fill="#b45309" />
    <ellipse cx="74" cy="48" rx="11" ry="14" fill="#fbbf24" />
    <ellipse cx="74" cy="48" rx="7" ry="9" fill="#b45309" />
    <rect x="11" y="37" width="9" height="9" rx="3" fill="#92400e" />
    <rect x="70" y="37" width="9" height="9" rx="3" fill="#92400e" />
  </svg>
);

/* ════════════════════════════════
   INITIAL CART DATA
════════════════════════════════ */
const INITIAL_ITEMS = [
  {
    id: 1,
    name: "Airpods Max",
    category: "Headphones",
    color: "Pink",
    sku: "APM-PINK-001",
    price: 549.0,
    qty: 1,
    inStock: true,
    Svg: AirpodsMaxSVG,
    bg: "#fff0f5",
    border: "#fce7f3",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    category: "Headphones",
    color: "Black",
    sku: "SNY-XM5-BLK",
    price: 349.99,
    qty: 2,
    inStock: true,
    Svg: SonySVG,
    bg: "#eff6ff",
    border: "#dbeafe",
  },
  {
    id: 3,
    name: "Bose QuietComfort 45",
    category: "Headphones",
    color: "White",
    sku: "BSE-QC45-WHT",
    price: 279.0,
    qty: 1,
    inStock: false,
    Svg: BoseSVG,
    bg: "#fffbeb",
    border: "#fef3c7",
  },
];

/* ════════════════════════════════
   RECOMMENDED
════════════════════════════════ */
const RECOMMENDED = [
  { id: 10, name: "Jabra Evolve2 85",      price: "$319.00", oldPrice: "$399.00", badge: "-20%", icon: "fa-volume-up",  iconBg: "linear-gradient(135deg,#fef9c3,#fefce8)", iconColor: "#ca8a04" },
  { id: 11, name: "Sennheiser Momentum 4", price: "$349.95", oldPrice: null,       badge: null,   icon: "fa-podcast",    iconBg: "linear-gradient(135deg,#ede9fe,#f5f3ff)", iconColor: "#7c3aed" },
  { id: 12, name: "JBL Tour One M2",       price: "$199.95", oldPrice: "$249.99",  badge: "New",  icon: "fa-music",      iconBg: "linear-gradient(135deg,#d1fae5,#ecfdf5)", iconColor: "var(--green-mid)" },
  { id: 13, name: "Anker Soundcore Q45",   price: "$79.99",  oldPrice: null,       badge: null,   icon: "fa-headphones", iconBg: "linear-gradient(135deg,#dbeafe,#eff6ff)", iconColor: "#1d4ed8" },
];

/* ════════════════════════════════
   CART PAGE
════════════════════════════════ */
export default function Cart() {
  const [items, setItems]           = useState(INITIAL_ITEMS);
  const [coupon, setCoupon]         = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError]   = useState(false);
  const [removedId, setRemovedId]   = useState(null);
  const [wishlist, setWishlist]     = useState({});
  const [addedRec, setAddedRec]     = useState({});

  /* ── helpers ── */
  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id) => {
    setRemovedId(id);
    setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== id));
      setRemovedId(null);
    }, 320);
  };

  const toggleWishlist = (id) =>
    setWishlist((p) => ({ ...p, [id]: !p[id] }));

  const handleCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
  };

  const addRecommended = (id) => {
    setAddedRec((p) => ({ ...p, [id]: true }));
    setTimeout(() => setAddedRec((p) => ({ ...p, [id]: false })), 1500);
  };

  /* ── totals ── */
  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount  = couponApplied ? subtotal * 0.1 : 0;
  const shipping  = subtotal > 500 ? 0 : 9.99;
  const tax       = (subtotal - discount) * 0.08;
  const total     = subtotal - discount + shipping + tax;
  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  const isEmpty = items.length === 0;

  return (
    <>
      <Header />

      {/* ── BREADCRUMB ── */}
      <div className="container" style={{ padding: "14px 12px 0", fontSize: ".82rem", color: "var(--muted)" }}>
        <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</a>
        <span style={{ margin: "0 6px" }}>/</span>
        <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>Shop</a>
        <span style={{ margin: "0 6px" }}>/</span>
        <span style={{ color: "#111", fontWeight: 600 }}>Shopping Cart</span>
      </div>

      <div className="container" style={{ padding: "20px 12px 60px" }}>

        {/* ── PAGE HEADING ── */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
          <h4 style={{ fontWeight: 800, fontSize: "1.35rem", margin: 0, color: "#111" }}>
            Shopping Cart
          </h4>
          {!isEmpty && (
            <span style={{ background: "var(--green-dark)", color: "#fff", borderRadius: 20, padding: "2px 11px", fontSize: ".75rem", fontWeight: 700 }}>
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {isEmpty ? (
          /* ── EMPTY STATE ── */
          <div style={{ textAlign: "center", padding: "70px 20px" }}>
            <div style={{ fontSize: "4rem", marginBottom: 16, opacity: .3 }}>
              <i className="fa fa-shopping-cart" />
            </div>
            <h5 style={{ fontWeight: 700, color: "#111", marginBottom: 8 }}>Your cart is empty</h5>
            <p style={{ color: "var(--muted)", fontSize: ".88rem", marginBottom: 24 }}>
              Looks like you haven't added anything yet.
            </p>
            <a
              href="#"
              style={{ background: "var(--green-dark)", color: "#fff", padding: "11px 28px", borderRadius: 50, fontWeight: 700, fontSize: ".88rem", textDecoration: "none" }}
            >
              <i className="fa fa-arrow-left me-2" />Continue Shopping
            </a>
          </div>
        ) : (
          <div className="row g-4 align-items-start">

            {/* ════════ LEFT ════════ */}
            <div className="col-lg-8">

              {/* ── TABLE HEADER (desktop) ── */}
              <div style={{ ...card, padding: "0" }}>
                {/* header row */}
                <div style={tableHead} className="d-none d-md-grid">
                  <span style={{ gridColumn: "1 / 3" }}>Product</span>
                  <span style={{ textAlign: "center" }}>Price</span>
                  <span style={{ textAlign: "center" }}>Quantity</span>
                  <span style={{ textAlign: "center" }}>Subtotal</span>
                  <span />
                </div>

                {/* ── CART ROWS ── */}
                {items.map((item, idx) => {
                  const isRemoving = removedId === item.id;
                  return (
                    <div
                      key={item.id}
                      style={{
                        ...cartRow,
                        borderBottom: idx < items.length - 1 ? "1px solid #f3f4f6" : "none",
                        opacity: isRemoving ? 0 : 1,
                        transform: isRemoving ? "translateX(30px)" : "none",
                        transition: "opacity .3s ease, transform .3s ease",
                      }}
                    >
                      {/* Image + info */}
                      <div style={productThumb}>
                        <div style={{ width: 78, height: 78, background: item.bg, borderRadius: 10, border: `1px solid ${item.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <item.Svg />
                        </div>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: ".92rem", color: "#111", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: ".76rem", color: "var(--muted)", marginBottom: 2 }}>
                          <i className="fa fa-tag me-1" />{item.category}
                        </div>
                        <div style={{ fontSize: ".76rem", color: "var(--muted)", marginBottom: 4 }}>
                          Color: <span style={{ fontWeight: 600, color: "#374151" }}>{item.color}</span>
                          &nbsp;·&nbsp;SKU: {item.sku}
                        </div>
                        {!item.inStock && (
                          <span style={outOfStockBadge}>
                            <i className="fa fa-exclamation-circle me-1" />Out of Stock
                          </span>
                        )}
                        {item.inStock && (
                          <span style={inStockBadge}>
                            <i className="fa fa-check-circle me-1" />In Stock
                          </span>
                        )}
                        {/* Mobile price */}
                        <div className="d-md-none" style={{ fontWeight: 700, color: "var(--green-dark)", marginTop: 6, fontSize: ".9rem" }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </div>
                      </div>

                      {/* Price (desktop) */}
                      <div className="d-none d-md-flex" style={{ alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontWeight: 600, fontSize: ".9rem", color: "#374151" }}>${item.price.toFixed(2)}</span>
                      </div>

                      {/* Quantity stepper */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={qtyStepper}>
                          <button style={qtyBtn} onClick={() => updateQty(item.id, -1)}>
                            <i className="fa fa-minus" style={{ fontSize: ".65rem" }} />
                          </button>
                          <span style={{ width: 32, textAlign: "center", fontWeight: 700, fontSize: ".88rem" }}>
                            {item.qty}
                          </span>
                          <button style={qtyBtn} onClick={() => updateQty(item.id, 1)}>
                            <i className="fa fa-plus" style={{ fontSize: ".65rem" }} />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal (desktop) */}
                      <div className="d-none d-md-flex" style={{ alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontWeight: 700, fontSize: ".9rem", color: "var(--green-dark)" }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <button
                          style={iconBtn}
                          title="Remove"
                          onClick={() => removeItem(item.id)}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#dc2626"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "#f3f4f6"; e.currentTarget.style.color = "#6b7280"; }}
                        >
                          <i className="fa fa-trash-o" />
                        </button>
                        <button
                          style={{ ...iconBtn, color: wishlist[item.id] ? "#ef4444" : "#6b7280", background: wishlist[item.id] ? "#fee2e2" : "#f3f4f6" }}
                          title="Save for later"
                          onClick={() => toggleWishlist(item.id)}
                        >
                          <i className={`fa ${wishlist[item.id] ? "fa-heart" : "fa-heart-o"}`} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* ── CART ACTIONS ── */}
                <div style={{ padding: "14px 20px", borderTop: "1px solid #f3f4f6", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                  <a href="#" style={continueShopping}>
                    <i className="fa fa-arrow-left me-2" />Continue Shopping
                  </a>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      style={clearCartBtn}
                      onClick={() => setItems([])}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.borderColor = "#fca5a5"; e.currentTarget.style.color = "#dc2626"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#6b7280"; }}
                    >
                      <i className="fa fa-trash me-2" />Clear Cart
                    </button>
                    <button
                      style={updateCartBtn}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#f3f4f6"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
                    >
                      <i className="fa fa-refresh me-2" />Update Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* ── COUPON ── */}
              <div style={{ ...card, marginTop: 14 }}>
                <div style={{ fontWeight: 700, fontSize: ".93rem", marginBottom: 12, color: "#111" }}>
                  <i className="fa fa-ticket me-2" style={{ color: "var(--green-dark)" }} />Apply Coupon Code
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    style={{ ...formInput, flex: 1 }}
                    placeholder='Try "SAVE10" for 10% off'
                    value={coupon}
                    onChange={(e) => { setCoupon(e.target.value); setCouponError(false); }}
                    onKeyDown={(e) => e.key === "Enter" && handleCoupon()}
                  />
                  <button
                    style={applyBtn}
                    onClick={handleCoupon}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-mid)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green-dark)")}
                  >
                    Apply Coupon
                  </button>
                </div>
                {couponApplied && (
                  <div style={{ marginTop: 8, fontSize: ".8rem", color: "#16a34a", fontWeight: 600 }}>
                    <i className="fa fa-check-circle me-1" />Coupon applied! 10% discount added.
                  </div>
                )}
                {couponError && (
                  <div style={{ marginTop: 8, fontSize: ".8rem", color: "#dc2626", fontWeight: 600 }}>
                    <i className="fa fa-times-circle me-1" />Invalid coupon code. Please try again.
                  </div>
                )}
              </div>

              {/* ── FREE SHIPPING PROGRESS ── */}
              <div style={{ ...card, marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: ".88rem", color: "#111" }}>
                    <i className="fa fa-truck me-2" style={{ color: "var(--green-dark)" }} />
                    {subtotal >= 500 ? "🎉 You've unlocked free shipping!" : "Free shipping on orders over $500"}
                  </span>
                  <span style={{ fontSize: ".8rem", fontWeight: 700, color: subtotal >= 500 ? "#16a34a" : "var(--muted)" }}>
                    ${Math.max(0, 500 - subtotal).toFixed(2)} away
                  </span>
                </div>
                <div style={{ background: "#e5e7eb", borderRadius: 99, height: 8, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${Math.min(100, (subtotal / 500) * 100).toFixed(1)}%`,
                    background: "var(--green-dark)",
                    borderRadius: 99,
                    transition: "width .4s ease",
                  }} />
                </div>
              </div>
            </div>

            {/* ════════ RIGHT ════════ */}
            <div className="col-lg-4">
              <div style={{ ...card, position: "sticky", top: 90 }}>
                <h5 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 18, color: "#111" }}>Order Summary</h5>

                {/* Item breakdown */}
                <div style={{ marginBottom: 16 }}>
                  {items.map((item) => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                        <span style={{ background: "var(--green-dark)", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: ".65rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {item.qty}
                        </span>
                        <span style={{ fontSize: ".82rem", color: "#374151", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.name}
                        </span>
                      </div>
                      <span style={{ fontSize: ".82rem", fontWeight: 600, color: "#111", flexShrink: 0, marginLeft: 8 }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 14 }}>
                  <div style={summaryRow}>
                    <span style={{ color: "var(--muted)", fontSize: ".86rem" }}>Subtotal ({totalItems} items)</span>
                    <span style={{ fontWeight: 600, fontSize: ".86rem" }}>${subtotal.toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div style={summaryRow}>
                      <span style={{ fontSize: ".86rem", color: "#16a34a" }}>
                        <i className="fa fa-tag me-1" />Discount (10%)
                      </span>
                      <span style={{ fontWeight: 600, fontSize: ".86rem", color: "#16a34a" }}>
                        –${discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div style={summaryRow}>
                    <span style={{ color: "var(--muted)", fontSize: ".86rem" }}>Shipping</span>
                    <span style={{ fontWeight: 600, fontSize: ".86rem", color: shipping === 0 ? "#16a34a" : "#111" }}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div style={summaryRow}>
                    <span style={{ color: "var(--muted)", fontSize: ".86rem" }}>
                      Estimated Tax (8%)
                    </span>
                    <span style={{ fontWeight: 600, fontSize: ".86rem" }}>${tax.toFixed(2)}</span>
                  </div>
                  <div style={{ ...summaryRow, borderTop: "1px solid #e5e7eb", paddingTop: 12, marginTop: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: ".97rem" }}>Order Total</span>
                    <span style={{ fontWeight: 800, fontSize: "1.15rem", color: "var(--green-dark)" }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout button */}
                <Link
                  to={`/checkout`}
                  style={checkoutBtn}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-mid)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green-dark)")}
                >
                  <i className="fa fa-lock me-2" />Proceed to Checkout
                </Link>

                {/* PayPal alternative */}
                <button style={paypalBtn}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f0c040")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#ffc439")}
                >
                  <i className="fa fa-paypal me-2" />Pay with PayPal
                </button>

                {/* Trust badges */}
                <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16, paddingTop: 14, borderTop: "1px solid #f3f4f6" }}>
                  {[
                    { icon: "fa-lock",    label: "Secure" },
                    { icon: "fa-shield",  label: "Protected" },
                    { icon: "fa-undo",    label: "Easy Returns" },
                  ].map(({ icon, label }) => (
                    <div key={label} style={{ textAlign: "center" }}>
                      <i className={`fa ${icon}`} style={{ fontSize: "1rem", color: "var(--green-dark)", display: "block", marginBottom: 3 }} />
                      <span style={{ fontSize: ".68rem", color: "var(--muted)" }}>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Payment icons */}
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 14 }}>
                  {["fa-cc-visa", "fa-cc-mastercard", "fa-cc-paypal", "fa-cc-amex", "fa-cc-stripe"].map((ic) => (
                    <i key={ic} className={`fa ${ic}`} style={{ fontSize: "1.45rem", color: "#9ca3af" }} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ── YOU MAY ALSO LIKE ── */}
        <div style={{ marginTop: 48 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              <p style={{ fontSize: ".8rem", color: "var(--muted)", marginBottom: 2 }}>Based on your cart</p>
              <h5 style={{ fontWeight: 800, fontSize: "1.1rem", margin: 0, color: "#111" }}>You May Also Like</h5>
            </div>
            <a href="#" style={{ border: "2px solid var(--green-dark)", color: "var(--green-dark)", padding: "7px 18px", borderRadius: 50, fontWeight: 600, fontSize: ".82rem", textDecoration: "none" }}>
              View All
            </a>
          </div>

          <div className="row g-3">
            {RECOMMENDED.map((p) => (
              <div key={p.id} className="col-6 col-md-3">
                <div style={recCard}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,.09)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.06)")}
                >
                  {p.badge && (
                    <span style={{ position: "absolute", top: 10, left: 10, background: p.badge.startsWith("-") ? "#ef4444" : "var(--green-dark)", color: "#fff", borderRadius: 4, fontSize: ".68rem", fontWeight: 700, padding: "2px 7px" }}>
                      {p.badge}
                    </span>
                  )}
                  <div style={{ width: 80, height: 80, background: p.iconBg, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <i className={`fa ${p.icon}`} style={{ fontSize: "2rem", color: p.iconColor }} />
                  </div>
                  <div style={{ fontSize: ".82rem", fontWeight: 700, color: "#111", marginBottom: 4, textAlign: "center" }}>{p.name}</div>
                  <div style={{ textAlign: "center", marginBottom: 12 }}>
                    <span style={{ fontWeight: 800, color: "var(--green-dark)", fontSize: ".9rem" }}>{p.price}</span>
                    {p.oldPrice && <span style={{ fontSize: ".75rem", color: "var(--muted)", textDecoration: "line-through", marginLeft: 6 }}>{p.oldPrice}</span>}
                  </div>
                  <button
                    style={addToCartBtn}
                    onClick={() => addRecommended(p.id)}
                    onMouseEnter={(e) => !addedRec[p.id] && (e.currentTarget.style.background = "#f0fdf4")}
                    onMouseLeave={(e) => !addedRec[p.id] && (e.currentTarget.style.background = "#fff")}
                  >
                    {addedRec[p.id] ? (
                      <><i className="fa fa-check me-1" style={{ color: "var(--green-dark)" }} />Added!</>
                    ) : (
                      <><i className="fa fa-plus me-1" />Add to Cart</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

/* ════════════════════════════════
   STYLES
════════════════════════════════ */
const card = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: "18px 20px",
};

const tableHead = {
  display: "grid",
  gridTemplateColumns: "78px 1fr 90px 120px 90px 56px",
  gap: 8,
  padding: "12px 20px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: ".78rem",
  fontWeight: 700,
  color: "var(--muted)",
  textTransform: "uppercase",
  letterSpacing: ".5px",
  background: "#fafafa",
  borderRadius: "12px 12px 0 0",
};

const cartRow = {
  display: "grid",
  gridTemplateColumns: "78px 1fr auto auto auto auto",
  gap: 12,
  alignItems: "center",
  padding: "16px 20px",
};

const productThumb = {
  display: "flex",
  alignItems: "center",
};

const qtyStepper = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  overflow: "hidden",
  background: "#fff",
};

const qtyBtn = {
  width: 30,
  height: 32,
  border: "none",
  background: "#f9fafb",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#374151",
  transition: "background .15s",
};

const iconBtn = {
  width: 32,
  height: 32,
  border: "none",
  background: "#f3f4f6",
  borderRadius: 8,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#6b7280",
  fontSize: ".85rem",
  transition: "all .15s",
};

const inStockBadge = {
  display: "inline-flex",
  alignItems: "center",
  fontSize: ".7rem",
  color: "#16a34a",
  fontWeight: 600,
};

const outOfStockBadge = {
  display: "inline-flex",
  alignItems: "center",
  fontSize: ".7rem",
  color: "#dc2626",
  fontWeight: 600,
};

const continueShopping = {
  display: "inline-flex",
  alignItems: "center",
  color: "var(--green-dark)",
  fontWeight: 600,
  fontSize: ".83rem",
  textDecoration: "none",
  border: "2px solid var(--green-dark)",
  padding: "7px 16px",
  borderRadius: 8,
};

const clearCartBtn = {
  padding: "7px 14px",
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  fontSize: ".8rem",
  fontWeight: 600,
  cursor: "pointer",
  color: "#6b7280",
  display: "flex",
  alignItems: "center",
  transition: "all .15s",
};

const updateCartBtn = {
  padding: "7px 14px",
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  fontSize: ".8rem",
  fontWeight: 600,
  cursor: "pointer",
  color: "#374151",
  display: "flex",
  alignItems: "center",
  transition: "background .15s",
};

const formInput = {
  padding: "9px 12px",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  fontSize: ".85rem",
  outline: "none",
  boxSizing: "border-box",
};

const applyBtn = {
  padding: "9px 16px",
  background: "var(--green-dark)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: ".83rem",
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: "background .15s",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
};

const checkoutBtn = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "13px",
  background: "var(--green-dark)",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: ".92rem",
  cursor: "pointer",
  transition: "background .15s",
  textDecoration: "none",
  marginTop: 16,
  letterSpacing: ".3px",
  boxSizing: "border-box",
};

const paypalBtn = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "11px",
  background: "#ffc439",
  color: "#111",
  border: "none",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: ".88rem",
  cursor: "pointer",
  transition: "background .15s",
  marginTop: 10,
  boxSizing: "border-box",
};

const recCard = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: "16px 14px",
  position: "relative",
  transition: "box-shadow .2s ease",
  boxShadow: "0 1px 4px rgba(0,0,0,.06)",
};

const addToCartBtn = {
  width: "100%",
  padding: "8px",
  background: "#fff",
  border: "1.5px solid var(--green-dark)",
  borderRadius: 8,
  color: "var(--green-dark)",
  fontWeight: 700,
  fontSize: ".78rem",
  cursor: "pointer",
  transition: "background .15s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
};
