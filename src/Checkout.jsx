import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./shopcart.css";

/* ════════════════════════════════
   AIRPODS SVG (Pink)
════════════════════════════════ */
const AirpodsMaxSVG = () => (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <circle cx="45" cy="45" r="4" fill="#fff" opacity=".3" />
  </svg>
);

/* ════════════════════════════════
   CHECKOUT PAGE
════════════════════════════════ */
export default function Checkout() {
  /* ── delivery form state ── */
  const [form, setForm] = useState({
    firstName: "", lastName: "", address: "",
    city: "", zip: "", mobile: "", email: "",
  });
  const [saveInfo, setSaveInfo] = useState(false);
  const [returning, setReturning] = useState(false);

  /* ── payment state ── */
  const [payMethod, setPayMethod] = useState("card"); // cod | shopcart | paypal | card
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [cardEmail, setCardEmail] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleApplyCoupon = () => {
    if (coupon.trim()) setCouponApplied(true);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  /* product data */
  const product = { name: "Airpods- Max", color: "Pink", price: 549.0, qty: 1 };
  const subtotal = product.price * product.qty;
  const discount = couponApplied ? 49.0 : 0;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  return (
    <>
      <Header />

      {/* ── BREADCRUMB ── */}
      <div className="container" style={{ padding: "14px 12px", fontSize: ".82rem", color: "var(--muted)" }}>
        <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</a>
        <span style={{ margin: "0 6px" }}>/</span>
        <span style={{ color: "#111", fontWeight: 600 }}>Checkout</span>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="container" style={{ paddingBottom: "60px" }}>
        <div className="row g-4 align-items-start">

          {/* ════════ LEFT COLUMN ════════ */}
          <div className="col-lg-7">

            {/* ── REVIEW ITEM ── */}
            <div style={card}>
              <h5 style={sectionTitle}>Review Item And Shipping</h5>
              <div style={itemRow}>
                <div style={imgBox}>
                  <AirpodsMaxSVG />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 4 }}>{product.name}</div>
                  <div style={{ fontSize: ".83rem", color: "var(--muted)" }}>Color: {product.color}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>${product.price.toFixed(2)}</div>
                  <div style={{ fontSize: ".83rem", color: "var(--muted)", marginTop: 4 }}>Quantity: {String(product.qty).padStart(2, "0")}</div>
                </div>
              </div>
            </div>

            {/* ── RETURNING CUSTOMER ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "14px 0 6px", fontSize: ".85rem" }}>
              <input
                type="checkbox"
                id="returning"
                checked={returning}
                onChange={(e) => setReturning(e.target.checked)}
                style={{ width: 15, height: 15, accentColor: "var(--green-dark)", cursor: "pointer" }}
              />
              <label htmlFor="returning" style={{ cursor: "pointer", color: "#374151" }}>Returning Customer?</label>
            </div>

            {/* ── DELIVERY INFORMATION ── */}
            <div style={card}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <h5 style={{ ...sectionTitle, marginBottom: 0 }}>Delivery Information</h5>
                <button
                  onClick={() => setSaveInfo(true)}
                  style={saveBtn}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                >
                  {saveInfo ? <><i className="fa fa-check me-1" style={{ color: "var(--green-dark)" }} />Saved</> : "Save Information"}
                </button>
              </div>

              <div className="row g-3">
                <div className="col-6">
                  <label style={label}>First Name*</label>
                  <input style={input} placeholder="Type here..." value={form.firstName} onChange={set("firstName")} />
                </div>
                <div className="col-6">
                  <label style={label}>Last Name*</label>
                  <input style={input} placeholder="Type here..." value={form.lastName} onChange={set("lastName")} />
                </div>
                <div className="col-12">
                  <label style={label}>Address*</label>
                  <input style={input} placeholder="Type here..." value={form.address} onChange={set("address")} />
                </div>
                <div className="col-6">
                  <label style={label}>City / Town*</label>
                  <input style={input} placeholder="Type here..." value={form.city} onChange={set("city")} />
                </div>
                <div className="col-6">
                  <label style={label}>Zip Code*</label>
                  <input style={input} placeholder="Type here..." value={form.zip} onChange={set("zip")} />
                </div>
                <div className="col-6">
                  <label style={label}>Mobile*</label>
                  <input style={input} placeholder="Type here..." value={form.mobile} onChange={set("mobile")} />
                </div>
                <div className="col-6">
                  <label style={label}>Email*</label>
                  <input style={input} placeholder="Type here..." value={form.email} onChange={set("email")} type="email" />
                </div>
              </div>
            </div>

          </div>

          {/* ════════ RIGHT COLUMN ════════ */}
          <div className="col-lg-5">
            <div style={{ ...card, position: "sticky", top: 90 }}>
              <h5 style={sectionTitle}>Order Summery</h5>

              {/* Coupon */}
              <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
                <input
                  style={{ ...input, flex: 1, marginBottom: 0, background: couponApplied ? "#f0fdf4" : "#fff" }}
                  placeholder="Enter Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                  onClick={handleApplyCoupon}
                  style={applyBtn}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-mid)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green-dark)")}
                >
                  {couponApplied ? "Applied ✓" : "Apply coupon"}
                </button>
              </div>

              {/* Payment Details */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 700, fontSize: ".93rem", marginBottom: 12, color: "#111" }}>Payment Details</div>

                {[
                  { id: "cod",      label: "Cash on Delivery" },
                  { id: "shopcart", label: "Shopcart Card" },
                  { id: "paypal",   label: "Paypal" },
                  { id: "card",     label: "Credit or Debit card" },
                ].map(({ id, label }) => (
                  <label key={id} style={radioRow}>
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{
                        ...radioCircle,
                        borderColor: payMethod === id ? "var(--green-dark)" : "#d1d5db",
                        background: payMethod === id ? "var(--green-dark)" : "#fff",
                      }}>
                        {payMethod === id && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", display: "block" }} />}
                      </span>
                      {label}
                    </span>
                    <input type="radio" name="pay" value={id} checked={payMethod === id} onChange={() => setPayMethod(id)} style={{ display: "none" }} />
                  </label>
                ))}
              </div>

              {/* Card brand logos */}
              {payMethod === "card" && (
                <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
                  {/* Amazon Pay */}
                  <span style={brandBadge}>
                    <span style={{ fontWeight: 800, fontSize: ".72rem", color: "#FF9900", letterSpacing: "-0.5px" }}>amazon</span>
                  </span>
                  {/* Mastercard */}
                  <span style={brandBadge}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#EB001B", display: "inline-block", marginRight: -8 }} />
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#F79E1B", display: "inline-block", opacity: 0.9 }} />
                    </span>
                  </span>
                  {/* Visa */}
                  <span style={brandBadge}>
                    <span style={{ fontWeight: 800, fontSize: ".78rem", color: "#1A1F71", letterSpacing: "1px", fontStyle: "italic" }}>VISA</span>
                  </span>
                </div>
              )}

              {/* Card fields */}
              {payMethod === "card" && (
                <div style={{ marginBottom: 18 }}>
                  <label style={label}>Email*</label>
                  <input style={{ ...input, marginBottom: 10 }} placeholder="Type here..." value={cardEmail} onChange={(e) => setCardEmail(e.target.value)} type="email" />

                  <label style={label}>Card Holder Name*</label>
                  <input style={{ ...input, marginBottom: 10 }} placeholder="Type here..." value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} />

                  <label style={label}>Card Number*</label>
                  <div style={{ position: "relative", marginBottom: 10 }}>
                    <i className="fa fa-credit-card" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: ".9rem" }} />
                    <input
                      style={{ ...input, paddingLeft: 36, marginBottom: 0, letterSpacing: 2 }}
                      placeholder="0000 •••• •••• 1245"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-6">
                      <label style={label}>Expiry</label>
                      <input style={input} placeholder="MM / YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} maxLength={7} />
                    </div>
                    <div className="col-6">
                      <label style={label}>CVC</label>
                      <input style={input} placeholder="•••" value={cvc} onChange={(e) => setCvc(e.target.value)} maxLength={4} type="password" />
                    </div>
                  </div>
                </div>
              )}

              {/* Paypal note */}
              {payMethod === "paypal" && (
                <div style={{ background: "#fef9ec", border: "1px solid #fde68a", borderRadius: 8, padding: "12px 14px", fontSize: ".83rem", color: "#92400e", marginBottom: 16 }}>
                  <i className="fa fa-paypal me-2" />
                  You will be redirected to PayPal to complete your payment securely.
                </div>
              )}

              {/* COD note */}
              {payMethod === "cod" && (
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "12px 14px", fontSize: ".83rem", color: "#166534", marginBottom: 16 }}>
                  <i className="fa fa-money me-2" />
                  Pay with cash when your order is delivered.
                </div>
              )}

              {/* Shopcart Card note */}
              {payMethod === "shopcart" && (
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "12px 14px", fontSize: ".83rem", color: "#166534", marginBottom: 16 }}>
                  <i className="fa fa-shopping-cart me-2" />
                  Pay using your Shopcart Card balance.
                </div>
              )}

              {/* Order summary totals */}
              <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 16, marginBottom: 18 }}>
                <div style={summaryRow}>
                  <span style={{ color: "var(--muted)", fontSize: ".88rem" }}>Subtotal</span>
                  <span style={{ fontWeight: 600, fontSize: ".88rem" }}>${subtotal.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div style={summaryRow}>
                    <span style={{ color: "#16a34a", fontSize: ".88rem" }}>Discount (coupon)</span>
                    <span style={{ fontWeight: 600, fontSize: ".88rem", color: "#16a34a" }}>–${discount.toFixed(2)}</span>
                  </div>
                )}
                <div style={summaryRow}>
                  <span style={{ color: "var(--muted)", fontSize: ".88rem" }}>Shipping</span>
                  <span style={{ fontWeight: 600, fontSize: ".88rem", color: "#16a34a" }}>Free</span>
                </div>
                <div style={{ ...summaryRow, borderTop: "1px solid #e5e7eb", paddingTop: 12, marginTop: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: ".95rem" }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--green-dark)" }}>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place order button */}
              <button
                onClick={handlePlaceOrder}
                style={placeOrderBtn}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-mid)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green-dark)")}
              >
                {orderPlaced
                  ? <><i className="fa fa-check me-2" />Order Placed!</>
                  : <><i className="fa fa-lock me-2" />Place Order</>}
              </button>

              <p style={{ fontSize: ".73rem", color: "var(--muted)", textAlign: "center", marginTop: 10 }}>
                <i className="fa fa-shield me-1" />Your information is encrypted and secure.
              </p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

/* ════════════════════════════════
   STYLES (inline, matching shopcart.css conventions)
════════════════════════════════ */
const card = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: "22px 20px",
  marginBottom: 16,
};

const sectionTitle = {
  fontWeight: 700,
  fontSize: "1.05rem",
  marginBottom: 18,
  color: "#111",
};

const itemRow = {
  display: "flex",
  alignItems: "center",
  gap: 14,
};

const imgBox = {
  width: 90,
  height: 90,
  background: "#fff0f5",
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  border: "1px solid #fce7f3",
};

const label = {
  display: "block",
  fontSize: ".8rem",
  fontWeight: 600,
  color: "#374151",
  marginBottom: 5,
};

const input = {
  width: "100%",
  padding: "9px 12px",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  fontSize: ".85rem",
  color: "#111",
  outline: "none",
  background: "#fff",
  marginBottom: 12,
  transition: "border-color .15s",
  boxSizing: "border-box",
};

const saveBtn = {
  padding: "7px 14px",
  background: "#f3f4f6",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  fontSize: ".8rem",
  fontWeight: 600,
  cursor: "pointer",
  color: "#374151",
  transition: "background .15s",
  whiteSpace: "nowrap",
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

const radioRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "9px 0",
  fontSize: ".87rem",
  color: "#374151",
  cursor: "pointer",
  borderBottom: "1px solid #f3f4f6",
};

const radioCircle = {
  width: 18,
  height: 18,
  borderRadius: "50%",
  border: "2px solid #d1d5db",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all .15s",
  flexShrink: 0,
};

const brandBadge = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px 10px",
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  background: "#fff",
  height: 32,
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
};

const placeOrderBtn = {
  width: "100%",
  padding: "13px",
  background: "var(--green-dark)",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: ".93rem",
  cursor: "pointer",
  transition: "background .15s",
  letterSpacing: ".3px",
};
