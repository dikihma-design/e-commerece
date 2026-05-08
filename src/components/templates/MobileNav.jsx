import { useState } from "react";

export default function MobileNav({ defaultActive = "home", cartCount = 3 }) {
    const [active, setActive] = useState(defaultActive);

    const navItems = [
        { key: "home",       icon: "fa-home",        label: "Home" },
        { key: "categories", icon: "fa-th-large",    label: "Categories" },
        { key: "search",     icon: "fa-search",      label: "Search" },
        { key: "cart",       icon: "fa-shopping-cart", label: "Cart", badge: cartCount },
        { key: "account",    icon: "fa-user-o",      label: "Account" },
    ];

    return (
        <div className="mobile-nav">
            {navItems.map((item) => (
                <a
                    key={item.key}
                    href="#"
                    className={active === item.key ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); setActive(item.key); }}
                    style={{ position: "relative" }}
                >
                    <i className={`fa ${item.icon}`}></i>
                    {item.badge > 0 && (
                        <span style={{
                            position: "absolute", top: 4, right: "20%",
                            background: "var(--green)", color: "#fff",
                            fontSize: 9, fontWeight: 700, borderRadius: "50%",
                            width: 14, height: 14,
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            {item.badge}
                        </span>
                    )}
                    {item.label}
                </a>
            ))}
        </div>
    );
}
