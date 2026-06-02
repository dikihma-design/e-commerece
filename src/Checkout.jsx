import { useState } from "react";

/* ── Inline styles / CSS (injected once) ── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

  :root {
    --green:        #2e7d32;
    --green-accent: #43a047;
    --green-light:  #e8f5e9;
    --dark:         #1a1a1a;
    --mid:          #666;
    --muted:        #999;
    --border:       #e8e8e8;
    --bg:           #f5f6fa;
    --white:        #ffffff;
    --radius:       12px;
    --shadow:       0 2px 16px rgba(0,0,0,.07);
    --shadow-hover: 0 6px 28px rgba(0,0,0,.12);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root {
    font-family: 'Nunito', sans-serif;
    background: var(--bg);
    color: var(--dark);
    font-size: 14px;
    line-height: 1.6;
  }

  /* ── TOPBAR ── */
  .topbar {
    background: var(--dark);
    color: rgba(255,255,255,.75);
    font-size: .78rem;
    padding: 7px 0;
  }
  .topbar a { color: var(--green-accent); text-decoration: none; font-weight: 700; }
  .topbar a:hover { text-decoration: underline; }

  /* ── NAVBAR ── */
  .main-nav {
    background: #fff;
    padding: 10px 0;
    box-shadow: 0 2px 12px rgba(0,0,0,.06);
    position: sticky; top: 0; z-index: 100;
  }
  .brand-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
  .logo-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, var(--green-accent), var(--green));
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 16px;
  }
  .brand-name { font-size: 1.25rem; font-weight: 800; color: var(--dark); }
  .search-bar {
    display: flex; align-items: center;
    background: var(--bg); border: 1.5px solid var(--border);
    border-radius: 10px; overflow: hidden; max-width: 480px; flex: 1;
  }
  .search-bar input {
    border: none; background: transparent; padding: 8px 14px;
    flex: 1; font-family: inherit; font-size: .88rem; outline: none; color: var(--dark);
  }
  .search-bar button {
    border: none; background: var(--green); color: #fff;
    padding: 8px 16px; cursor: pointer; font-size: .9rem;
    transition: background .2s;
  }
  .search-bar button:hover { background: var(--green-accent); }
  .nav-actions a {
    display: flex; align-items: center; gap: 5px;
    text-decoration: none; color: var(--dark); font-weight: 600;
    font-size: .85rem; padding: 6px 10px; border-radius: 8px;
    transition: background .18s;
  }
  .nav-actions a:hover { background: var(--bg); }
  .cart-badge {
    background: var(--green); color: #fff; border-radius: 50%;
    width: 18px; height: 18px; font-size: .65rem; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
  }
  .nav-links { list-style: none; display: flex; gap: 2px; }
  .nav-links .nav-link {
    padding: 6px 12px; border-radius: 8px; color: var(--dark); font-weight: 600;
    font-size: .88rem; text-decoration: none; transition: background .18s, color .18s;
  }
  .nav-links .nav-link:hover { background: var(--green-light); color: var(--green); }

  /* ── BREADCRUMB ── */
  .breadcrumb {
    display: flex; align-items: center; gap: 6px;
    list-style: none; padding: 14px 0; font-size: .82rem; color: var(--muted);
  }
  .breadcrumb-item a { color: var(--green); text-decoration: none; font-weight: 600; }
  .breadcrumb-item a:hover { text-decoration: underline; }
  .breadcrumb-item + .breadcrumb-item::before { content: "/"; color: var(--border); margin-right: 6px; }
  .breadcrumb-item.active { color: var(--dark); font-weight: 700; }

  /* ── PAGE GRID ── */
  .checkout-grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 24px;
    align-items: start;
    padding-bottom: 60px;
  }
  @media (max-width: 900px) {
    .checkout-grid { grid-template-columns: 1fr; }
  }

  /* ── CARD ── */
  .card {
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    border: 1.5px solid var(--border);
    padding: 24px;
    margin-bottom: 20px;
  }
  .card-title {
    font-size: 1.05rem; font-weight: 800; color: var(--dark);
    margin-bottom: 18px; padding-bottom: 14px;
    border-bottom: 1.5px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-title .save-btn {
    font-size: .75rem; font-weight: 700; color: var(--green);
    background: var(--green-light); border: none; border-radius: 7px;
    padding: 4px 12px; cursor: pointer; transition: background .18s;
  }
  .card-title .save-btn:hover { background: #c8e6c9; }

  /* ── ORDER ITEM ── */
  .order-item {
    display: flex; align-items: center; gap: 16px;
    padding: 14px 0; border-bottom: 1px solid var(--border);
  }
  .order-item:last-child { border-bottom: none; }
  .order-item-img {
    width: 78px; height: 78px; border-radius: 10px;
    background: #f0f4f8; display: flex; align-items: center; justify-content: center;
    overflow: hidden; flex-shrink: 0;
  }
  .order-item-img img { width: 100%; height: 100%; object-fit: cover; }
  .order-item-name { font-weight: 800; font-size: .95rem; color: var(--dark); }
  .order-item-sub { font-size: .78rem; color: var(--muted); margin-top: 2px; }
  .order-item-price { font-weight: 800; font-size: 1rem; color: var(--dark); }
  .order-item-qty { font-size: .78rem; color: var(--muted); }

  /* ── RETURNING CUSTOMER ── */
  .returning-cb {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px; background: var(--bg); border-radius: 9px;
    cursor: pointer; margin-bottom: 4px;
  }
  .returning-cb input[type="checkbox"] { accent-color: var(--green); width: 16px; height: 16px; cursor: pointer; }
  .returning-cb label { font-weight: 600; font-size: .88rem; cursor: pointer; }

  /* ── FORM ELEMENTS ── */
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .form-row.single { grid-template-columns: 1fr; }
  @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }

  .form-group { display: flex; flex-direction: column; gap: 5px; }
  .form-label {
    font-size: .78rem; font-weight: 700; color: var(--mid);
    text-transform: uppercase; letter-spacing: .04em;
  }
  .form-label span { color: #e55; margin-left: 2px; }
  .form-input {
    border: 1.5px solid var(--border); border-radius: 9px;
    padding: 9px 13px; font-family: inherit; font-size: .9rem;
    color: var(--dark); background: #fff; outline: none;
    transition: border .2s, box-shadow .2s;
  }
  .form-input::placeholder { color: #bbb; }
  .form-input:focus { border-color: var(--green-accent); box-shadow: 0 0 0 3px rgba(67,160,71,.1); }
  .form-input.with-icon { padding-left: 38px; }

  .input-wrap { position: relative; }
  .input-icon {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    color: var(--muted); font-size: .9rem; pointer-events: none;
  }

  /* ── COUPON ── */
  .coupon-row {
    display: flex; gap: 10px; margin-bottom: 0;
  }
  .coupon-row .form-input { flex: 1; }
  .btn-coupon {
    background: var(--green); color: #fff; border: none; border-radius: 9px;
    padding: 9px 20px; font-family: inherit; font-weight: 700; font-size: .88rem;
    cursor: pointer; transition: background .2s, transform .15s; white-space: nowrap;
  }
  .btn-coupon:hover { background: var(--green-accent); transform: translateY(-1px); }

  /* ── PAYMENT ── */
  .payment-options { display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; }
  .payment-option {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; border: 1.5px solid var(--border); border-radius: 10px;
    cursor: pointer; transition: border .2s, background .2s;
  }
  .payment-option.selected { border-color: var(--green-accent); background: var(--green-light); }
  .payment-option input[type="radio"] { accent-color: var(--green); width: 16px; height: 16px; flex-shrink: 0; }
  .payment-option label { font-weight: 700; font-size: .9rem; cursor: pointer; flex: 1; }
  .payment-logos { display: flex; align-items: center; gap: 8px; }
  .payment-logos img { height: 22px; }
  .payment-logos .card-logo {
    height: 22px; border-radius: 4px; display: flex; align-items: center;
    justify-content: center; font-size: 1.3rem;
  }

  /* ── CARD FIELDS ── */
  .card-fields { margin-top: 14px; }
  .expiry-cvc { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  /* ── ORDER SUMMARY ── */
  .summary-line {
    display: flex; justify-content: space-between; align-items: center;
    padding: 8px 0; font-size: .88rem; color: var(--mid);
    border-bottom: 1px dashed var(--border);
  }
  .summary-line:last-of-type { border-bottom: none; }
  .summary-line .label { font-weight: 600; }
  .summary-line .value { font-weight: 700; color: var(--dark); }
  .summary-line .value.green { color: var(--green); }
  .summary-total {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 0 0; font-size: 1.1rem; font-weight: 800; color: var(--dark);
    border-top: 2px solid var(--border); margin-top: 4px;
  }

  /* ── PLACE ORDER BUTTON ── */
  .btn-order {
    width: 100%; padding: 13px; background: linear-gradient(135deg, var(--green-accent), var(--green));
    color: #fff; border: none; border-radius: 11px;
    font-family: inherit; font-size: 1rem; font-weight: 800;
    cursor: pointer; margin-top: 18px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: box-shadow .2s, transform .15s;
    box-shadow: 0 4px 16px rgba(46,125,50,.25);
  }
  .btn-order:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(46,125,50,.35); }
  .btn-order:active { transform: translateY(0); }

  .secure-note {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    font-size: .75rem; color: var(--muted); margin-top: 10px;
  }

  /* ── NEWSLETTER / FOOTER ── */
  .newsletter-section {
    background: linear-gradient(135deg, var(--green), #1b5e20);
    border-radius: 18px; padding: 36px 28px; text-align: center; color: #fff;
  }
  .newsletter-section h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; }
  .newsletter-section p { color: rgba(255,255,255,.8); margin-bottom: 20px; }
  .newsletter-form { display: flex; gap: 10px; max-width: 460px; margin: 0 auto; }
  .newsletter-form input {
    flex: 1; padding: 11px 16px; border-radius: 10px; border: none;
    font-family: inherit; font-size: .9rem; outline: none;
  }
  .newsletter-form button {
    background: #fff; color: var(--green); border: none; border-radius: 10px;
    padding: 11px 22px; font-family: inherit; font-weight: 800; font-size: .9rem;
    cursor: pointer; white-space: nowrap; transition: background .2s;
  }
  .newsletter-form button:hover { background: var(--green-light); }

  footer {
    background: #1a1a2e; color: rgba(255,255,255,.65);
    padding: 52px 0 0; margin-top: 0; font-size: .85rem;
  }
  footer h6 { color: #fff; font-weight: 800; margin-bottom: 14px; font-size: .9rem; }
  footer a {
    display: block; color: rgba(255,255,255,.55); text-decoration: none;
    margin-bottom: 8px; transition: color .18s;
  }
  footer a:hover { color: var(--green-accent); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,.08);
    padding: 16px 0; margin-top: 44px;
    font-size: .78rem; color: rgba(255,255,255,.4);
  }
  .social-icons { display: flex; gap: 10px; }
  .social-icons a {
    width: 34px; height: 34px; border-radius: 8px;
    background: rgba(255,255,255,.08); display: flex; align-items: center;
    justify-content: center; color: rgba(255,255,255,.6); margin: 0;
    transition: background .18s, color .18s;
  }
  .social-icons a:hover { background: var(--green-accent); color: #fff; }
  .payment-icons { display: flex; gap: 8px; font-size: 1.4rem; color: rgba(255,255,255,.5); }
  .brand-logo.footer-brand { display: flex; align-items: center; gap: 8px; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp .45s ease both; }
  .fade-up-d1 { animation-delay: .05s; }
  .fade-up-d2 { animation-delay: .12s; }
  .fade-up-d3 { animation-delay: .20s; }

  /* ── UTILITIES ── */
  .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
  .row { display: flex; flex-wrap: wrap; margin: 0 -8px; }
  .col-lg-3 { flex: 0 0 25%; max-width: 25%; padding: 0 8px; }
  .col-lg-2 { flex: 0 0 16.66%; max-width: 16.66%; padding: 0 8px; }
  .col-6 { flex: 0 0 50%; max-width: 50%; padding: 0 8px; }
  .g-5 > * { margin-bottom: 32px; }
  @media (max-width: 768px) {
    .col-lg-3, .col-lg-2 { flex: 0 0 50%; max-width: 50%; }
  }
  @media (max-width: 480px) {
    .col-lg-3, .col-lg-2, .col-6 { flex: 0 0 100%; max-width: 100%; }
  }
`;

/* ── Data ── */
const CART_ITEMS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=200&auto=format&fit=crop&q=80",
    name: "Airpods Max",
    color: "Pink",
    price: 549.00,
    qty: 1,
  },
];

/* ── Sub-components ── */
function Header() {
  const [cartCount] = useState(3);
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <div className="topbar">
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div><i className="fa fa-phone" />&nbsp;<a href="#">+001 2345 678</a></div>
          <div style={{ textAlign: "center" }}>
            🎉 Get <strong style={{ color: "#fff" }}>50% Off</strong> on Selected Items &nbsp;|&nbsp;
            <a href="#">Shop Now</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="#" style={{ color: "rgba(255,255,255,.65)", textDecoration: "none", fontSize: ".78rem" }}>
              <i className="fa fa-globe" /> Eng <i className="fa fa-caret-down" />
            </a>
            <a href="#" style={{ color: "rgba(255,255,255,.65)", textDecoration: "none", fontSize: ".78rem" }}>
              <i className="fa fa-map-marker" /> Location <i className="fa fa-caret-down" />
            </a>
          </div>
        </div>
      </div>
      <nav className="main-nav">
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <a href="#" className="brand-logo" style={{ marginRight: 12 }}>
            <div className="logo-icon"><i className="fa fa-shopping-cart" /></div>
            <span className="brand-name">Shopcart</span>
          </a>
          <ul className="nav-links" style={{ marginRight: 8 }}>
            {["Categories ▾", "Deals", "What's New", "Delivery"].map(l => (
              <li key={l}><a className="nav-link" href="#">{l}</a></li>
            ))}
          </ul>
          <div className="search-bar">
            <input
              type="text" placeholder="Search Product…"
              value={searchValue} onChange={e => setSearchValue(e.target.value)}
            />
            <button><i className="fa fa-search" /></button>
          </div>
          <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8 }}>
            <a href="#"><i className="fa fa-user-o" /> Account</a>
            <a href="#" style={{ position: "relative" }}>
              <i className="fa fa-shopping-cart" />
              <span className="cart-badge" style={{ position: "absolute", top: -6, right: -6 }}>{cartCount}</span>
              Cart
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  return (
    <>
      <section style={{ padding: "40px 0" }}>
        <div className="container">
          <div className="newsletter-section">
            <i className="fa fa-envelope-o" style={{ fontSize: "2.2rem", marginBottom: 10, display: "block" }} />
            <h3>Stay in the Loop</h3>
            <p>Subscribe to get exclusive deals, new arrivals, and insider savings sent straight to your inbox.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address…" value={email} onChange={e => setEmail(e.target.value)} />
              <button onClick={() => { if (email) { alert(`Subscribed with ${email}!`); setEmail(""); } }}>
                Subscribe <i className="fa fa-paper-plane" style={{ marginLeft: 6 }} />
              </button>
            </div>
            <p style={{ fontSize: ".73rem", color: "rgba(255,255,255,.6)", marginTop: 12 }}>
              <i className="fa fa-lock" style={{ marginRight: 5 }} />No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-3">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div className="logo-icon"><i className="fa fa-shopping-cart" /></div>
                <span className="brand-name" style={{ color: "#fff" }}>Shopcart</span>
              </div>
              <p>Your one-stop shopping destination. Quality products, unbeatable prices, and exceptional service.</p>
              <div className="social-icons" style={{ marginTop: 16 }}>
                {["facebook", "twitter", "instagram", "youtube-play", "pinterest"].map(s => (
                  <a key={s} href="#"><i className={`fa fa-${s}`} /></a>
                ))}
              </div>
            </div>
            {[
              { title: "Shop",       links: ["New Arrivals", "Best Sellers", "Today's Deals", "Flash Sales", "Gift Cards"] },
              { title: "Categories", links: ["Electronics", "Fashion", "Home & Garden", "Sports", "Books"] },
              { title: "Support",    links: ["Help Center", "Track My Order", "Returns & Refunds", "Shipping Info", "Contact Us"] },
            ].map(col => (
              <div key={col.title} className="col-6 col-lg-2">
                <h6>{col.title}</h6>
                {col.links.map(l => <a key={l} href="#">{l}</a>)}
              </div>
            ))}
            <div className="col-6 col-lg-3">
              <h6>Contact</h6>
              {[
                { icon: "map-marker", text: "123 Market St, NY 10001" },
                { icon: "phone",      text: "+001 2345 678" },
                { icon: "envelope",   text: "hello@shopcart.com" },
                { icon: "clock-o",    text: "Mon–Sat: 9am–9pm" },
              ].map(c => (
                <a key={c.icon} href="#">
                  <i className={`fa fa-${c.icon}`} style={{ marginRight: 8 }} />{c.text}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span>© 2025 Shopcart. All rights reserved.</span>
            <div style={{ display: "flex", gap: 16 }}>
              {["Privacy Policy", "Terms of Service"].map(l => (
                <a key={l} href="#" style={{ color: "rgba(255,255,255,.45)", fontSize: ".76rem", textDecoration: "none" }}>{l}</a>
              ))}
            </div>
            <div className="payment-icons">
              {["cc-visa", "cc-mastercard", "cc-paypal", "cc-amex", "cc-stripe"].map(i => (
                <i key={i} className={`fa fa-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ── MAIN CHECKOUT PAGE ── */
export default function Checkout() {
  const [returningCustomer, setReturningCustomer] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", address: "", city: "", zip: "",
    mobile: "", email: "", cardEmail: "", cardName: "", cardNumber: "", expiry: "", cvc: "",
  });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const subtotal = CART_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = 12.00;
  const total    = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    if (coupon.trim()) setCouponApplied(true);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  return (
    <>
      <style>{CSS}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

      <Header />

      <div className="container">
        {/* Breadcrumb */}
        <ol className="breadcrumb fade-up">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item active">Checkout</li>
        </ol>

        {orderPlaced ? (
          <div style={{
            textAlign: "center", padding: "80px 20px",
            background: "#fff", borderRadius: 18, boxShadow: "var(--shadow)",
            border: "1.5px solid var(--border)", marginBottom: 40,
          }} className="fade-up">
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "var(--green-light)", display: "flex", alignItems: "center",
              justifyContent: "center", margin: "0 auto 20px",
            }}>
              <i className="fa fa-check" style={{ fontSize: 36, color: "var(--green)" }} />
            </div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 10 }}>Order Placed Successfully!</h2>
            <p style={{ color: "var(--muted)", marginBottom: 28 }}>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
            <a href="#" style={{
              background: "var(--green)", color: "#fff", padding: "12px 32px",
              borderRadius: 11, textDecoration: "none", fontWeight: 800, fontSize: ".95rem",
            }}>Continue Shopping</a>
          </div>
        ) : (
          <div className="checkout-grid fade-up fade-up-d1">

            {/* ── LEFT COLUMN ── */}
            <div>

              {/* Review Items */}
              <div className="card">
                <div className="card-title">Review Item And Shipping</div>
                {CART_ITEMS.map(item => (
                  <div className="order-item" key={item.id}>
                    <div className="order-item-img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="order-item-name">{item.name}</div>
                      <div className="order-item-sub">Color: {item.color}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="order-item-price">${item.price.toFixed(2)}</div>
                      <div className="order-item-qty">Quantity: {String(item.qty).padStart(2, "0")}</div>
                    </div>
                  </div>
                ))}

                {/* Returning customer checkbox */}
                <div style={{ marginTop: 14 }}>
                  <div
                    className="returning-cb"
                    onClick={() => setReturningCustomer(!returningCustomer)}
                  >
                    <input
                      type="checkbox" checked={returningCustomer}
                      onChange={() => {}} id="returning"
                    />
                    <label htmlFor="returning">Returning Customer?</label>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="card fade-up fade-up-d2">
                <div className="card-title">
                  Delivery Information
                  <button className="save-btn">Save Information</button>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name <span>*</span></label>
                    <input className="form-input" name="firstName" value={form.firstName}
                      onChange={handleChange} placeholder="Type here..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name <span>*</span></label>
                    <input className="form-input" name="lastName" value={form.lastName}
                      onChange={handleChange} placeholder="Type here..." />
                  </div>
                </div>

                <div className="form-row single">
                  <div className="form-group">
                    <label className="form-label">Address <span>*</span></label>
                    <input className="form-input" name="address" value={form.address}
                      onChange={handleChange} placeholder="Type here..." />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City / Town <span>*</span></label>
                    <input className="form-input" name="city" value={form.city}
                      onChange={handleChange} placeholder="Type here..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Zip Code <span>*</span></label>
                    <input className="form-input" name="zip" value={form.zip}
                      onChange={handleChange} placeholder="Type here..." />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Mobile <span>*</span></label>
                    <input className="form-input" name="mobile" value={form.mobile}
                      onChange={handleChange} placeholder="Type here..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email <span>*</span></label>
                    <input className="form-input" name="email" value={form.email}
                      onChange={handleChange} placeholder="Type here..." />
                  </div>
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN ── */}
            <div>

              {/* Order Summary */}
              <div className="card fade-up fade-up-d2">
                <div className="card-title">Order Summary</div>

                {/* Coupon */}
                <div className="coupon-row" style={{ marginBottom: 18 }}>
                  <input
                    className="form-input" placeholder="Enter Coupon Code"
                    value={coupon} onChange={e => setCoupon(e.target.value)}
                    style={{ borderColor: couponApplied ? "var(--green-accent)" : undefined }}
                  />
                  <button
                    className="btn-coupon"
                    onClick={handleApplyCoupon}
                    style={{ background: couponApplied ? "var(--green)" : undefined }}
                  >
                    {couponApplied ? "✓ Applied" : "Apply Coupon"}
                  </button>
                </div>

                {/* Payment method */}
                <div style={{ fontWeight: 700, fontSize: ".88rem", marginBottom: 12, color: "var(--dark)" }}>
                  Payment Details
                </div>
                <div className="payment-options">
                  {[
                    { id: "cod",     label: "Cash on Delivery" },
                    { id: "shopcart",label: "Shopcart Card" },
                    { id: "paypal",  label: "Paypal" },
                    { id: "card",    label: "Credit or Debit card" },
                  ].map(opt => (
                    <div
                      key={opt.id}
                      className={`payment-option${paymentMethod === opt.id ? " selected" : ""}`}
                      onClick={() => setPaymentMethod(opt.id)}
                    >
                      <input type="radio" name="payment" value={opt.id}
                        checked={paymentMethod === opt.id} onChange={() => setPaymentMethod(opt.id)} />
                      <label>{opt.label}</label>
                      {opt.id === "card" && (
                        <div className="payment-logos">
                          <i className="fa fa-amazon" style={{ fontSize: "1.1rem", color: "#f90" }} />
                          <i className="fa fa-cc-mastercard" style={{ fontSize: "1.4rem", color: "#eb001b" }} />
                          <i className="fa fa-cc-visa" style={{ fontSize: "1.4rem", color: "#1a1f71" }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Card fields (shown when card is selected) */}
                {paymentMethod === "card" && (
                  <div className="card-fields">
                    <div className="form-group" style={{ marginBottom: 12 }}>
                      <label className="form-label">Email <span>*</span></label>
                      <input className="form-input" name="cardEmail" value={form.cardEmail}
                        onChange={handleChange} placeholder="Type here..." />
                    </div>
                    <div className="form-group" style={{ marginBottom: 12 }}>
                      <label className="form-label">Card Holder Name <span>*</span></label>
                      <input className="form-input" name="cardName" value={form.cardName}
                        onChange={handleChange} placeholder="Type here..." />
                    </div>
                    <div className="form-group" style={{ marginBottom: 12 }}>
                      <label className="form-label">Card Number <span>*</span></label>
                      <div className="input-wrap">
                        <i className="fa fa-credit-card input-icon" />
                        <input
                          className="form-input with-icon" name="cardNumber" value={form.cardNumber}
                          onChange={handleChange} placeholder="0000 **** **** 1245"
                          maxLength={19}
                        />
                      </div>
                    </div>
                    <div className="expiry-cvc">
                      <div className="form-group">
                        <label className="form-label">Expiry</label>
                        <input className="form-input" name="expiry" value={form.expiry}
                          onChange={handleChange} placeholder="MM / YY" maxLength={7} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVC</label>
                        <input className="form-input" name="cvc" value={form.cvc}
                          onChange={handleChange} placeholder="•••" maxLength={4} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Price breakdown */}
                <div style={{ marginTop: 20 }}>
                  <div className="summary-line">
                    <span className="label">Subtotal</span>
                    <span className="value">${subtotal.toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="summary-line">
                      <span className="label">Discount (10%)</span>
                      <span className="value green">−${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="summary-line">
                    <span className="label">Shipping</span>
                    <span className="value">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="summary-total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="btn-order" onClick={handlePlaceOrder}>
                  <i className="fa fa-lock" /> Place Order
                </button>

                <div className="secure-note">
                  <i className="fa fa-shield" /> 256-bit SSL encryption · Secure checkout
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
