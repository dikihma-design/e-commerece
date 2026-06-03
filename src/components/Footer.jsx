import { useState } from "react";
import { Link } from "react-router";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}!`);
      setEmail("");
    }
  };

  return (
    <>
      {/* ── NEWSLETTER ── */}
      <section className="py-5">
        <div className="container">
          <div className="newsletter-section">
            <i className="fa fa-envelope-o" style={{ fontSize: "2.4rem", color: "var(--green-accent)", marginBottom: "12px", display: "block" }} />
            <h3>Stay in the Loop</h3>
            <p>Subscribe to get exclusive deals, new arrivals, and insider savings sent straight to your inbox.</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address…"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSubscribe}>
                Subscribe <i className="fa fa-paper-plane ms-2" />
              </button>
            </div>
            <p style={{ fontSize: ".75rem", color: "var(--muted)", marginTop: "12px" }}>
              <i className="fa fa-lock me-1" />No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container">
          <div className="row g-5">
            {/* Brand */}
            <div className="col-lg-3 footer-brand">
              <div className="brand-logo mb-3">
                <div className="logo-icon">
                  <i className="fa fa-shopping-cart" />
                </div>
                <span className="brand-name" style={{ color: "#fff" }}>Shopcart</span>
              </div>
              <p>Your one-stop shopping destination. Quality products, unbeatable prices, and exceptional service.</p>
              <div className="social-icons mt-4">
                <a href="#"><i className="fa fa-facebook" /></a>
                <a href="#"><i className="fa fa-twitter" /></a>
                <a href="#"><i className="fa fa-instagram" /></a>
                <a href="#"><i className="fa fa-youtube-play" /></a>
                <a href="#"><i className="fa fa-pinterest" /></a>
              </div>
            </div>

            {/* Shop links */}
            <div className="col-6 col-lg-2">
              <h6>Shop</h6>
              <a href="#">New Arrivals</a>
              <a href="#">Best Sellers</a>
              <a href="#">Today's Deals</a>
              <a href="#">Flash Sales</a>
              <a href="#">Gift Cards</a>
            </div>

            {/* Categories links */}
            <div className="col-6 col-lg-2">
              <h6>Categories</h6>
              <a href="#">Electronics</a>
              <a href="#">Fashion</a>
              <a href="#">Home & Garden</a>
              <a href="#">Sports</a>
              <a href="#">Books</a>
            </div>

            {/* Support links */}
            <div className="col-6 col-lg-2">
              <h6>Support</h6>
              <a href="#">Help Center</a>
              <a href="#">Track My Order</a>
              <a href="#">Returns & Refunds</a>
              <a href="#">Shipping Info</a>
              <a href="#">Contact Us</a>
            </div>

            {/* Contact */}
            <div className="col-6 col-lg-3">
              <h6>Contact</h6>
              <a href="#"><i className="fa fa-map-marker me-2" />123 Market St, NY 10001</a>
              <a href="tel:+0012345678"><i className="fa fa-phone me-2" />+001 2345 678</a>
              <a href="mailto:hello@shopcart.com"><i className="fa fa-envelope me-2" />hello@shopcart.com</a>
              <a href="#"><i className="fa fa-clock-o me-2" />Mon–Sat: 9am–9pm</a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div className="container d-flex align-items-center justify-content-between flex-wrap gap-2">
            <span>© 2025 Shopcart. All rights reserved.</span>
            <div className="d-flex align-items-center gap-3">
              <a href="#" style={{ color: "rgba(255,255,255,.5)", fontSize: ".78rem", textDecoration: "none" }}>Privacy Policy</a>
              <a href="#" style={{ color: "rgba(255,255,255,.5)", fontSize: ".78rem", textDecoration: "none" }}>Terms of Service</a>
            </div>
            <div className="payment-icons">
              <i className="fa fa-cc-visa" />
              <i className="fa fa-cc-mastercard" />
              <i className="fa fa-cc-paypal" />
              <i className="fa fa-cc-amex" />
              <i className="fa fa-cc-stripe" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
