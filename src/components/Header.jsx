import { useState } from "react";

export default function Header() {
  const [cartCount] = useState(3);
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      {/* ── TOP BAR ── */}
      <div className="topbar">
        <div className="container d-flex align-items-center justify-content-between">
          <div>
            <i className="fa fa-phone" />&nbsp;
            <a href="tel:+0012345678">+001 2345 678</a>
          </div>
          <div className="text-center">
            🎉 Get <strong>50% Off</strong> on Selected Items &nbsp;|&nbsp;
            <a href="#">Shop Now</a>
          </div>
          <div className="d-flex align-items-center gap-3">
            <a href="#">
              <i className="fa fa-globe" /> Eng <i className="fa fa-caret-down" />
            </a>
            <a href="#">
              <i className="fa fa-map-marker" /> Location <i className="fa fa-caret-down" />
            </a>
          </div>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="main-nav">
        <div className="container d-flex align-items-center gap-3 flex-wrap">
          {/* Brand */}
          <a href="#" className="brand-logo me-3">
            <div className="logo-icon">
              <i className="fa fa-shopping-cart" />
            </div>
            <span className="brand-name">Shopcart</span>
          </a>

          {/* Nav links */}
          <ul className="nav nav-links flex-row flex-nowrap me-2">
            <li className="nav-item dropdown">
              <a className="nav-link" href="#">
                Categories <i className="fa fa-angle-down" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Deals</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">What's New</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Delivery</a>
            </li>
          </ul>

          {/* Search */}
          <div className="search-bar flex-grow-1">
            <input
              type="text"
              placeholder="Search Product…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="button">
              <i className="fa fa-search" />
            </button>
          </div>

          {/* Actions */}
          <div className="nav-actions d-flex align-items-center gap-1 ms-2">
            <a href="#">
              <i className="fa fa-user-o fa-lg" /> Account
            </a>
            <a href="#" className="position-relative">
              <i className="fa fa-shopping-cart fa-lg" />
              <span className="cart-badge">{cartCount}</span>
              Cart
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
