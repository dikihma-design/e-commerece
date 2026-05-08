import { useState } from "react";

export default function Header({ activePage = "home", cartCount = 3 }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: "Categories", href: "#", icon: "fa-angle-down", hasDropdown: true },
        { label: "Deals",      href: "#" },
        { label: "What's New", href: "#", active: activePage === "home" },
        { label: "Delivery",   href: "#" },
    ];

    return (
        <>
            {/* ─── NAVBAR ─── */}
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid px-3 px-md-4 gap-2 gap-md-3">

                    {/* Brand */}
                    <a className="navbar-brand me-0 me-lg-2" href="#">
                        <div className="logo-icon"><i className="fa fa-shopping-bag"></i></div>
                        Shopcart
                    </a>

                    {/* Desktop Nav Links */}
                    <ul className="navbar-nav d-none d-lg-flex flex-row gap-1 me-2">
                        {navLinks.map((link, i) => (
                            <li className="nav-item" key={i}>
                                <a className={`nav-link${link.active ? " active" : ""}`} href={link.href}>
                                    {link.label}
                                    {link.hasDropdown && <i className="fa fa-angle-down ms-1"></i>}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Search */}
                    <div className="search-bar d-none d-md-block mx-auto">
                        <input type="text" placeholder="Search Product" />
                        <i className="fa fa-search"></i>
                    </div>

                    {/* Icons – Desktop */}
                    <div className="d-flex align-items-center gap-1 ms-auto navbar-icons-desktop">
                        <button className="nav-icon-btn"><i className="fa fa-user-o"></i></button>
                        <button className="nav-icon-btn">
                            <i className="fa fa-shopping-cart"></i>
                            {cartCount > 0 && <span className="badge-dot">{cartCount}</span>}
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="nav-icon-btn d-lg-none ms-auto"
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <i className="fa fa-bars"></i>
                    </button>
                </div>
            </nav>

            {/* ─── MOBILE OFFCANVAS ─── */}
            {mobileMenuOpen && (
                <div
                    className="position-fixed top-0 start-0 h-100 bg-white shadow-lg"
                    style={{ width: 280, zIndex: 2000 }}
                >
                    <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                        <span className="navbar-brand mb-0">
                            <div className="logo-icon"><i className="fa fa-shopping-bag"></i></div>
                            Shopcart
                        </span>
                        <button
                            className="nav-icon-btn"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                    <div className="p-3">
                        <div className="search-bar mb-3" style={{ maxWidth: "100%" }}>
                            <input type="text" placeholder="Search Product" />
                            <i className="fa fa-search"></i>
                        </div>
                        <ul className="list-unstyled">
                            {["Categories", "Deals", "What's New", "Delivery", "My Account"].map((item, i) => (
                                <li key={i}>
                                    <a className="nav-link py-2 border-bottom d-block" href="#">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {mobileMenuOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100"
                    style={{ background: "rgba(0,0,0,.4)", zIndex: 1999 }}
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
