import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./shopcart.css";

/* ════════════════════════════════════════════
   DATA
════════════════════════════════════════════ */
const USER = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 234-7890",
  dob: "1994-08-15",
  gender: "Male",
  avatar: null,
  initials: "AJ",
  memberSince: "March 2021",
  tier: "Gold Member",
  points: 2_840,
  totalOrders: 24,
  totalSpent: 3_412.50,
  savedItems: 7,
};

const ORDERS = [
  { id: "#ORD-10482", date: "May 28, 2025", items: 3, total: 549.00, status: "Delivered",   statusColor: "#16a34a", statusBg: "#dcfce7" },
  { id: "#ORD-10391", date: "May 12, 2025", items: 1, total: 279.99, status: "In Transit",  statusColor: "#1d4ed8", statusBg: "#dbeafe" },
  { id: "#ORD-10244", date: "Apr 30, 2025", items: 2, total: 189.50, status: "Processing",  statusColor: "#b45309", statusBg: "#fef3c7" },
  { id: "#ORD-10103", date: "Apr 10, 2025", items: 4, total: 820.00, status: "Delivered",   statusColor: "#16a34a", statusBg: "#dcfce7" },
  { id: "#ORD-09878", date: "Mar 22, 2025", items: 1, total: 99.00,  status: "Cancelled",   statusColor: "#dc2626", statusBg: "#fee2e2" },
];

const ADDRESSES = [
  { id: 1, label: "Home",   default: true,  name: "Alex Johnson",  line1: "123 Maple Avenue",     city: "New York",     state: "NY", zip: "10001", country: "United States", phone: "+1 555-234-7890" },
  { id: 2, label: "Office", default: false, name: "Alex Johnson",  line1: "456 Business Blvd, Suite 9", city: "Brooklyn",     state: "NY", zip: "11201", country: "United States", phone: "+1 555-234-7890" },
];

const WISHLIST = [
  { id: 1, name: "Airpods Pro 2nd Gen",      price: 249.00, oldPrice: 299.00, icon: "fa-headphones",   iconBg: "#fff0f5", iconColor: "#c05070" },
  { id: 2, name: "iPad Air M2",              price: 599.00, oldPrice: null,   icon: "fa-tablet",       iconBg: "#eff6ff", iconColor: "#1d4ed8" },
  { id: 3, name: "MagSafe Charger",          price: 39.00,  oldPrice: 49.00,  icon: "fa-bolt",         iconBg: "#fdf4e7", iconColor: "#b45309" },
  { id: 4, name: "Apple Watch Series 9",     price: 399.00, oldPrice: null,   icon: "fa-clock-o",      iconBg: "#f0fdf4", iconColor: "#16a34a" },
  { id: 5, name: "Beats Studio Pro",         price: 349.99, oldPrice: 399.99, icon: "fa-music",        iconBg: "#fdf2f8", iconColor: "#9d174d" },
  { id: 6, name: "Anker USB-C Hub 7-in-1",  price: 49.99,  oldPrice: null,   icon: "fa-plug",         iconBg: "#ecfdf5", iconColor: "#047857" },
];

const TABS = [
  { id: "overview",  label: "Overview",       icon: "fa-th-large" },
  { id: "orders",    label: "My Orders",      icon: "fa-shopping-bag" },
  { id: "wishlist",  label: "Wishlist",       icon: "fa-heart-o" },
  { id: "addresses", label: "Addresses",      icon: "fa-map-marker" },
  { id: "settings",  label: "Account Settings", icon: "fa-cog" },
  { id: "security",  label: "Security",       icon: "fa-lock" },
];

/* ════════════════════════════════════════════
   PROFILE PAGE
════════════════════════════════════════════ */
export default function Profile() {
  const [activeTab, setActiveTab]   = useState("overview");
  const [editMode, setEditMode]     = useState(false);
  const [profileForm, setProfileForm] = useState({
    name:   USER.name,
    email:  USER.email,
    phone:  USER.phone,
    dob:    USER.dob,
    gender: USER.gender,
  });
  const [savedMsg, setSavedMsg]     = useState(false);
  const [wishlist, setWishlist]     = useState(WISHLIST.map((i) => i.id));
  const [addresses, setAddresses]   = useState(ADDRESSES);
  const [pwForm, setPwForm]         = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg]           = useState(null);
  const [orderFilter, setOrderFilter] = useState("All");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const setField = (k) => (e) => setProfileForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSaveProfile = () => {
    setSavedMsg(true);
    setEditMode(false);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const toggleWishlist = (id) =>
    setWishlist((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const setDefaultAddress = (id) =>
    setAddresses((p) => p.map((a) => ({ ...a, default: a.id === id })));

  const removeAddress = (id) =>
    setAddresses((p) => p.filter((a) => a.id !== id));

  const handleChangePw = () => {
    if (!pwForm.current) { setPwMsg({ type: "error", text: "Enter your current password." }); return; }
    if (pwForm.next.length < 8) { setPwMsg({ type: "error", text: "New password must be at least 8 characters." }); return; }
    if (pwForm.next !== pwForm.confirm) { setPwMsg({ type: "error", text: "Passwords do not match." }); return; }
    setPwMsg({ type: "success", text: "Password updated successfully!" });
    setPwForm({ current: "", next: "", confirm: "" });
    setTimeout(() => setPwMsg(null), 3500);
  };

  const filteredOrders = orderFilter === "All"
    ? ORDERS
    : ORDERS.filter((o) => o.status === orderFilter);

  return (
    <>
      <Header />

      {/* ── BREADCRUMB ── */}
      <div className="container" style={{ padding: "14px 12px 0", fontSize: ".82rem", color: "var(--muted)" }}>
        <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</a>
        <span style={{ margin: "0 6px" }}>/</span>
        <span style={{ color: "#111", fontWeight: 600 }}>My Account</span>
      </div>

      <div className="container" style={{ padding: "20px 12px 64px" }}>
        <div className="row g-4 align-items-start">

          {/* ════════ SIDEBAR ════════ */}
          <div className="col-lg-3">

            {/* ── Mobile nav toggle ── */}
            <button
              className="d-lg-none"
              style={mobileToggle}
              onClick={() => setMobileNavOpen((p) => !p)}
            >
              <i className={`fa ${mobileNavOpen ? "fa-times" : "fa-bars"} me-2`} />
              {TABS.find((t) => t.id === activeTab)?.label}
              <i className="fa fa-angle-down ms-auto" style={{ transform: mobileNavOpen ? "rotate(180deg)" : "none", transition: ".2s" }} />
            </button>

            {/* ── Profile card ── */}
            <div style={{ ...card, textAlign: "center", marginBottom: 12, display: mobileNavOpen || true ? "block" : "none" }} className="d-none d-lg-block">
              {/* Avatar */}
              <div style={{ position: "relative", display: "inline-block", marginBottom: 14 }}>
                <div style={avatar}>
                  {USER.avatar
                    ? <img src={USER.avatar} alt="avatar" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                    : <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff" }}>{USER.initials}</span>
                  }
                </div>
                <button style={avatarEditBtn} title="Change photo">
                  <i className="fa fa-camera" style={{ fontSize: ".65rem" }} />
                </button>
              </div>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: "#111", marginBottom: 3 }}>{USER.name}</div>
              <div style={{ fontSize: ".78rem", color: "var(--muted)", marginBottom: 10 }}>{USER.email}</div>
              <div style={tierBadge}>
                <i className="fa fa-star me-1" style={{ fontSize: ".7rem" }} />{USER.tier}
              </div>
              <div style={{ fontSize: ".78rem", color: "var(--muted)", marginTop: 8 }}>
                Member since {USER.memberSince}
              </div>
            </div>

            {/* ── Nav ── */}
            <nav style={{ ...card, padding: "8px 0", display: mobileNavOpen || window.innerWidth >= 992 ? "block" : "none" }} className={`${mobileNavOpen ? "d-block" : "d-none"} d-lg-block`}>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  style={{
                    ...navItem,
                    background: activeTab === tab.id ? "#f0fdf4" : "transparent",
                    color: activeTab === tab.id ? "var(--green-dark)" : "#374151",
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    borderLeft: activeTab === tab.id ? "3px solid var(--green-dark)" : "3px solid transparent",
                  }}
                  onClick={() => { setActiveTab(tab.id); setMobileNavOpen(false); }}
                  onMouseEnter={(e) => { if (activeTab !== tab.id) e.currentTarget.style.background = "#f9fafb"; }}
                  onMouseLeave={(e) => { if (activeTab !== tab.id) e.currentTarget.style.background = "transparent"; }}
                >
                  <i className={`fa ${tab.icon}`} style={{ width: 18, textAlign: "center", marginRight: 10, fontSize: ".9rem" }} />
                  {tab.label}
                </button>
              ))}
              <div style={{ borderTop: "1px solid #f3f4f6", margin: "8px 0" }} />
              <button
                style={{ ...navItem, color: "#dc2626" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fff5f5")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <i className="fa fa-sign-out" style={{ width: 18, textAlign: "center", marginRight: 10, fontSize: ".9rem" }} />
                Sign Out
              </button>
            </nav>
          </div>

          {/* ════════ CONTENT ════════ */}
          <div className="col-lg-9">

            {/* ──────── OVERVIEW ──────── */}
            {activeTab === "overview" && (
              <div>
                {/* Stats row */}
                <div className="row g-3 mb-4">
                  {[
                    { label: "Total Orders",  value: USER.totalOrders,            icon: "fa-shopping-bag", color: "var(--green-dark)", bg: "#f0fdf4" },
                    { label: "Total Spent",   value: `$${USER.totalSpent.toLocaleString()}`, icon: "fa-dollar",      color: "#1d4ed8",         bg: "#eff6ff" },
                    { label: "Reward Points", value: USER.points.toLocaleString(), icon: "fa-star",         color: "#b45309",         bg: "#fef3c7" },
                    { label: "Saved Items",   value: USER.savedItems,             icon: "fa-heart",        color: "#dc2626",         bg: "#fee2e2" },
                  ].map(({ label, value, icon, color, bg }) => (
                    <div key={label} className="col-6 col-md-3">
                      <div style={{ ...card, textAlign: "center", padding: "18px 12px" }}>
                        <div style={{ width: 44, height: 44, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                          <i className={`fa ${icon}`} style={{ fontSize: "1.1rem", color }} />
                        </div>
                        <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#111", marginBottom: 3 }}>{value}</div>
                        <div style={{ fontSize: ".75rem", color: "var(--muted)" }}>{label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                <div style={card}>
                  <div style={sectionHeader}>
                    <span style={sectionTitle}>Recent Orders</span>
                    <button style={linkBtn} onClick={() => setActiveTab("orders")}>View All <i className="fa fa-arrow-right ms-1" /></button>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={table}>
                      <thead>
                        <tr style={tableHeadRow}>
                          <th style={th}>Order ID</th>
                          <th style={th}>Date</th>
                          <th style={th}>Items</th>
                          <th style={th}>Total</th>
                          <th style={th}>Status</th>
                          <th style={th}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {ORDERS.slice(0, 3).map((o) => (
                          <tr key={o.id} style={tableRow}>
                            <td style={td}><span style={{ fontWeight: 700, color: "var(--green-dark)" }}>{o.id}</span></td>
                            <td style={td}>{o.date}</td>
                            <td style={td}>{o.items} item{o.items > 1 ? "s" : ""}</td>
                            <td style={td}><span style={{ fontWeight: 700 }}>${o.total.toFixed(2)}</span></td>
                            <td style={td}>
                              <span style={{ ...statusBadge, color: o.statusColor, background: o.statusBg }}>
                                {o.status}
                              </span>
                            </td>
                            <td style={td}>
                              <button style={viewBtn}>View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Reward points banner */}
                <div style={{ ...card, marginTop: 14, background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)", border: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ color: "rgba(255,255,255,.75)", fontSize: ".78rem", marginBottom: 4 }}>
                        <i className="fa fa-star me-1" />{USER.tier}
                      </div>
                      <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.25rem", marginBottom: 2 }}>
                        {USER.points.toLocaleString()} Points
                      </div>
                      <div style={{ color: "rgba(255,255,255,.8)", fontSize: ".8rem" }}>
                        Earn 1 point for every $1 spent. Redeem 100 pts = $1 off.
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "rgba(255,255,255,.75)", fontSize: ".75rem", marginBottom: 6 }}>
                        Next tier at 5,000 pts
                      </div>
                      <div style={{ background: "rgba(255,255,255,.25)", borderRadius: 99, height: 8, width: 160, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(USER.points / 5000) * 100}%`, background: "#fff", borderRadius: 99 }} />
                      </div>
                      <div style={{ color: "rgba(255,255,255,.7)", fontSize: ".7rem", marginTop: 4 }}>
                        {(5000 - USER.points).toLocaleString()} pts to Platinum
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ──────── ORDERS ──────── */}
            {activeTab === "orders" && (
              <div style={card}>
                <div style={sectionHeader}>
                  <span style={sectionTitle}>My Orders</span>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {["All", "Delivered", "In Transit", "Processing", "Cancelled"].map((f) => (
                      <button
                        key={f}
                        style={{
                          ...filterChip,
                          background: orderFilter === f ? "var(--green-dark)" : "#f3f4f6",
                          color: orderFilter === f ? "#fff" : "#374151",
                          borderColor: orderFilter === f ? "var(--green-dark)" : "#e5e7eb",
                        }}
                        onClick={() => setOrderFilter(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={table}>
                    <thead>
                      <tr style={tableHeadRow}>
                        <th style={th}>Order ID</th>
                        <th style={th}>Date</th>
                        <th style={th}>Items</th>
                        <th style={th}>Total</th>
                        <th style={th}>Status</th>
                        <th style={th}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "var(--muted)", fontSize: ".85rem" }}>
                            No orders found.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((o) => (
                          <tr key={o.id} style={tableRow}>
                            <td style={td}><span style={{ fontWeight: 700, color: "var(--green-dark)" }}>{o.id}</span></td>
                            <td style={td}>{o.date}</td>
                            <td style={td}>{o.items} item{o.items > 1 ? "s" : ""}</td>
                            <td style={td}><span style={{ fontWeight: 700 }}>${o.total.toFixed(2)}</span></td>
                            <td style={td}>
                              <span style={{ ...statusBadge, color: o.statusColor, background: o.statusBg }}>
                                {o.status}
                              </span>
                            </td>
                            <td style={td}>
                              <div style={{ display: "flex", gap: 6 }}>
                                <button style={viewBtn}>View</button>
                                {o.status === "Delivered" && (
                                  <button style={reviewBtn}>Review</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ──────── WISHLIST ──────── */}
            {activeTab === "wishlist" && (
              <div style={card}>
                <div style={{ ...sectionHeader, marginBottom: 18 }}>
                  <span style={sectionTitle}>My Wishlist <span style={{ fontSize: ".8rem", color: "var(--muted)", fontWeight: 500 }}>({wishlist.length} items)</span></span>
                </div>
                {wishlist.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--muted)" }}>
                    <i className="fa fa-heart-o" style={{ fontSize: "2.5rem", display: "block", marginBottom: 12, opacity: .4 }} />
                    <div style={{ fontWeight: 600, marginBottom: 6 }}>Your wishlist is empty</div>
                    <div style={{ fontSize: ".83rem" }}>Save items you love to buy them later.</div>
                  </div>
                ) : (
                  <div className="row g-3">
                    {WISHLIST.map((item) => {
                      const saved = wishlist.includes(item.id);
                      return (
                        <div key={item.id} className="col-12 col-sm-6 col-md-4">
                          <div style={wishCard}>
                            {/* Heart btn */}
                            <button
                              style={{ ...wishHeart, color: saved ? "#ef4444" : "#d1d5db" }}
                              onClick={() => toggleWishlist(item.id)}
                              title={saved ? "Remove from wishlist" : "Add back"}
                            >
                              <i className={`fa ${saved ? "fa-heart" : "fa-heart-o"}`} />
                            </button>
                            {/* Icon */}
                            <div style={{ width: 64, height: 64, borderRadius: "50%", background: item.iconBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                              <i className={`fa ${item.icon}`} style={{ fontSize: "1.4rem", color: item.iconColor }} />
                            </div>
                            <div style={{ fontWeight: 700, fontSize: ".85rem", color: "#111", textAlign: "center", marginBottom: 4 }}>{item.name}</div>
                            <div style={{ textAlign: "center", marginBottom: 12 }}>
                              <span style={{ fontWeight: 800, color: "var(--green-dark)", fontSize: ".9rem" }}>${item.price.toFixed(2)}</span>
                              {item.oldPrice && <span style={{ fontSize: ".75rem", color: "var(--muted)", textDecoration: "line-through", marginLeft: 6 }}>${item.oldPrice.toFixed(2)}</span>}
                            </div>
                            <button style={addToCartSmall}>
                              <i className="fa fa-shopping-cart me-1" />Add to Cart
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ──────── ADDRESSES ──────── */}
            {activeTab === "addresses" && (
              <div>
                <div style={{ ...sectionHeader, marginBottom: 16 }}>
                  <span style={sectionTitle}>Saved Addresses</span>
                  <button style={addAddressBtn}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-mid)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green-dark)")}
                  >
                    <i className="fa fa-plus me-1" />Add New Address
                  </button>
                </div>
                <div className="row g-3">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="col-12 col-md-6">
                      <div style={{ ...card, position: "relative", border: addr.default ? "2px solid var(--green-dark)" : "1px solid #e5e7eb" }}>
                        {addr.default && (
                          <span style={defaultBadge}>
                            <i className="fa fa-check me-1" style={{ fontSize: ".65rem" }} />Default
                          </span>
                        )}
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: "50%", background: addr.default ? "#f0fdf4" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <i className="fa fa-map-marker" style={{ color: addr.default ? "var(--green-dark)" : "#9ca3af", fontSize: "1rem" }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                              <span style={{ fontWeight: 700, fontSize: ".88rem", color: "#111" }}>{addr.label}</span>
                            </div>
                            <div style={{ fontSize: ".82rem", color: "#374151", lineHeight: 1.6 }}>
                              {addr.name}<br />
                              {addr.line1}<br />
                              {addr.city}, {addr.state} {addr.zip}<br />
                              {addr.country}<br />
                              <span style={{ color: "var(--muted)" }}>{addr.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 14, paddingTop: 12, borderTop: "1px solid #f3f4f6" }}>
                          <button style={addrBtn}>
                            <i className="fa fa-pencil me-1" />Edit
                          </button>
                          {!addr.default && (
                            <button style={addrBtn} onClick={() => setDefaultAddress(addr.id)}>
                              <i className="fa fa-check me-1" />Set Default
                            </button>
                          )}
                          {!addr.default && (
                            <button
                              style={{ ...addrBtn, color: "#dc2626", borderColor: "#fca5a5" }}
                              onClick={() => removeAddress(addr.id)}
                            >
                              <i className="fa fa-trash-o me-1" />Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ──────── SETTINGS ──────── */}
            {activeTab === "settings" && (
              <div style={card}>
                <div style={{ ...sectionHeader, marginBottom: 20 }}>
                  <span style={sectionTitle}>Account Settings</span>
                  {!editMode ? (
                    <button style={editBtn} onClick={() => setEditMode(true)}>
                      <i className="fa fa-pencil me-1" />Edit Profile
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={cancelBtn} onClick={() => setEditMode(false)}>Cancel</button>
                      <button style={saveBtn} onClick={handleSaveProfile}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-mid)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green-dark)")}
                      >
                        <i className="fa fa-check me-1" />Save Changes
                      </button>
                    </div>
                  )}
                </div>

                {savedMsg && (
                  <div style={successAlert}>
                    <i className="fa fa-check-circle me-2" />Profile updated successfully!
                  </div>
                )}

                {/* Avatar row */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid #f3f4f6" }}>
                  <div style={avatarLg}>
                    <span style={{ fontSize: "2rem", fontWeight: 800, color: "#fff" }}>{USER.initials}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: ".9rem", color: "#111", marginBottom: 4 }}>Profile Photo</div>
                    <div style={{ fontSize: ".78rem", color: "var(--muted)", marginBottom: 8 }}>JPG, PNG or GIF. Max size 2MB.</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={uploadBtn}><i className="fa fa-upload me-1" />Upload Photo</button>
                      <button style={removePhotoBtn}><i className="fa fa-trash-o me-1" />Remove</button>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="row g-3">
                  {[
                    { key: "name",   label: "Full Name",     type: "text",  col: 6 },
                    { key: "email",  label: "Email Address", type: "email", col: 6 },
                    { key: "phone",  label: "Phone Number",  type: "tel",   col: 6 },
                    { key: "dob",    label: "Date of Birth", type: "date",  col: 6 },
                  ].map(({ key, label, type, col }) => (
                    <div key={key} className={`col-12 col-md-${col}`}>
                      <label style={formLabel}>{label}</label>
                      <input
                        type={type}
                        style={{ ...formInput, background: editMode ? "#fff" : "#f9fafb", cursor: editMode ? "text" : "default" }}
                        value={profileForm[key]}
                        onChange={setField(key)}
                        readOnly={!editMode}
                      />
                    </div>
                  ))}
                  <div className="col-12 col-md-6">
                    <label style={formLabel}>Gender</label>
                    <select
                      style={{ ...formInput, background: editMode ? "#fff" : "#f9fafb", cursor: editMode ? "pointer" : "default" }}
                      value={profileForm.gender}
                      onChange={setField("gender")}
                      disabled={!editMode}
                    >
                      {["Male", "Female", "Non-binary", "Prefer not to say"].map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Notification prefs */}
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #f3f4f6" }}>
                  <div style={{ fontWeight: 700, fontSize: ".9rem", color: "#111", marginBottom: 14 }}>Notification Preferences</div>
                  <div className="row g-2">
                    {[
                      { label: "Order updates via Email",   defaultOn: true  },
                      { label: "Promotions & deals",        defaultOn: true  },
                      { label: "SMS notifications",         defaultOn: false },
                      { label: "Newsletter",                defaultOn: true  },
                    ].map(({ label, defaultOn }) => (
                      <div key={label} className="col-12 col-md-6">
                        <NotifToggle label={label} defaultOn={defaultOn} disabled={!editMode} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ──────── SECURITY ──────── */}
            {activeTab === "security" && (
              <div>
                <div style={card}>
                  <div style={{ ...sectionHeader, marginBottom: 20 }}>
                    <span style={sectionTitle}>Change Password</span>
                  </div>

                  {pwMsg && (
                    <div style={pwMsg.type === "success" ? successAlert : errorAlert}>
                      <i className={`fa ${pwMsg.type === "success" ? "fa-check-circle" : "fa-times-circle"} me-2`} />
                      {pwMsg.text}
                    </div>
                  )}

                  <div className="row g-3" style={{ maxWidth: 480 }}>
                    {[
                      { key: "current", label: "Current Password",   placeholder: "Enter current password" },
                      { key: "next",    label: "New Password",        placeholder: "At least 8 characters" },
                      { key: "confirm", label: "Confirm New Password", placeholder: "Repeat new password" },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key} className="col-12">
                        <label style={formLabel}>{label}</label>
                        <input
                          type="password"
                          style={formInput}
                          placeholder={placeholder}
                          value={pwForm[key]}
                          onChange={(e) => setPwForm((p) => ({ ...p, [key]: e.target.value }))}
                        />
                      </div>
                    ))}
                    <div className="col-12">
                      <button style={saveBtn} onClick={handleChangePw}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-mid)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green-dark)")}
                      >
                        <i className="fa fa-lock me-2" />Update Password
                      </button>
                    </div>
                  </div>
                </div>

                {/* Two-factor */}
                <div style={{ ...card, marginTop: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: ".92rem", color: "#111", marginBottom: 3 }}>
                        <i className="fa fa-shield me-2" style={{ color: "var(--green-dark)" }} />Two-Factor Authentication
                      </div>
                      <div style={{ fontSize: ".8rem", color: "var(--muted)" }}>Add an extra layer of security to your account.</div>
                    </div>
                    <button style={enable2faBtn}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdf4")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>

                {/* Active sessions */}
                <div style={{ ...card, marginTop: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: ".92rem", color: "#111", marginBottom: 14 }}>
                    <i className="fa fa-desktop me-2" style={{ color: "var(--green-dark)" }} />Active Sessions
                  </div>
                  {[
                    { device: "Chrome on Windows 11",  location: "New York, US",  time: "Now",         current: true  },
                    { device: "Safari on iPhone 15",   location: "New York, US",  time: "2 hours ago", current: false },
                    { device: "Firefox on MacBook Pro",location: "Brooklyn, US",  time: "Yesterday",   current: false },
                  ].map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 2 ? "1px solid #f3f4f6" : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 8, background: s.current ? "#f0fdf4" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <i className={`fa ${s.device.includes("iPhone") ? "fa-mobile" : "fa-desktop"}`} style={{ color: s.current ? "var(--green-dark)" : "#9ca3af", fontSize: ".95rem" }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: ".85rem", color: "#111" }}>
                            {s.device}
                            {s.current && <span style={{ marginLeft: 8, fontSize: ".68rem", background: "#dcfce7", color: "#16a34a", fontWeight: 700, padding: "1px 7px", borderRadius: 99 }}>Current</span>}
                          </div>
                          <div style={{ fontSize: ".75rem", color: "var(--muted)" }}>{s.location} · {s.time}</div>
                        </div>
                      </div>
                      {!s.current && (
                        <button style={{ ...addrBtn, fontSize: ".75rem", color: "#dc2626", borderColor: "#fca5a5" }}>
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Danger zone */}
                <div style={{ ...card, marginTop: 14, border: "1px solid #fca5a5" }}>
                  <div style={{ fontWeight: 700, fontSize: ".92rem", color: "#dc2626", marginBottom: 8 }}>
                    <i className="fa fa-exclamation-triangle me-2" />Danger Zone
                  </div>
                  <div style={{ fontSize: ".82rem", color: "var(--muted)", marginBottom: 14 }}>
                    Once you delete your account, all your data will be permanently removed. This action cannot be undone.
                  </div>
                  <button style={deleteAccBtn}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
                  >
                    <i className="fa fa-trash me-2" />Delete My Account
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ════════════════════════════════════════════
   NOTIFICATION TOGGLE (mini component)
════════════════════════════════════════════ */
function NotifToggle({ label, defaultOn, disabled }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", background: "#f9fafb", borderRadius: 8, border: "1px solid #e5e7eb" }}>
      <span style={{ fontSize: ".82rem", color: "#374151" }}>{label}</span>
      <button
        style={{
          width: 40, height: 22, borderRadius: 99, border: "none", cursor: disabled ? "default" : "pointer",
          background: on ? "var(--green-dark)" : "#d1d5db",
          position: "relative", transition: "background .2s", flexShrink: 0,
        }}
        onClick={() => !disabled && setOn((p) => !p)}
      >
        <span style={{
          position: "absolute", top: 3, left: on ? 20 : 3,
          width: 16, height: 16, borderRadius: "50%", background: "#fff",
          transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.15)",
        }} />
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════
   STYLES
════════════════════════════════════════════ */
const card = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: "20px",
};

const sectionHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 10,
  marginBottom: 14,
};

const sectionTitle = {
  fontWeight: 800,
  fontSize: "1rem",
  color: "#111",
};

const navItem = {
  width: "100%",
  padding: "11px 18px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  textAlign: "left",
  fontSize: ".87rem",
  display: "flex",
  alignItems: "center",
  transition: "all .15s",
  borderLeft: "3px solid transparent",
};

const avatar = {
  width: 72, height: 72, borderRadius: "50%",
  background: "linear-gradient(135deg, var(--green-dark), var(--green-mid))",
  display: "flex", alignItems: "center", justifyContent: "center",
};

const avatarLg = {
  width: 80, height: 80, borderRadius: "50%",
  background: "linear-gradient(135deg, var(--green-dark), var(--green-mid))",
  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
};

const avatarEditBtn = {
  position: "absolute", bottom: 2, right: 2,
  width: 24, height: 24, borderRadius: "50%",
  background: "var(--green-dark)", color: "#fff",
  border: "2px solid #fff", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};

const tierBadge = {
  display: "inline-flex", alignItems: "center",
  background: "linear-gradient(135deg,#fef3c7,#fde68a)",
  color: "#92400e", borderRadius: 99, padding: "4px 12px",
  fontSize: ".72rem", fontWeight: 700,
};

const table = { width: "100%", borderCollapse: "collapse", fontSize: ".84rem" };

const tableHeadRow = {
  background: "#fafafa", borderBottom: "1px solid #e5e7eb",
};

const th = {
  padding: "10px 12px", textAlign: "left",
  fontWeight: 700, fontSize: ".75rem",
  color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".5px",
};

const tableRow = {
  borderBottom: "1px solid #f3f4f6",
  transition: "background .12s",
};

const td = { padding: "12px 12px", verticalAlign: "middle" };

const statusBadge = {
  display: "inline-block", padding: "3px 10px",
  borderRadius: 99, fontSize: ".73rem", fontWeight: 700,
};

const viewBtn = {
  padding: "5px 12px", background: "#f3f4f6",
  border: "1px solid #e5e7eb", borderRadius: 6,
  fontSize: ".75rem", fontWeight: 600, cursor: "pointer", color: "#374151",
};

const reviewBtn = {
  padding: "5px 12px", background: "#f0fdf4",
  border: "1px solid #bbf7d0", borderRadius: 6,
  fontSize: ".75rem", fontWeight: 600, cursor: "pointer", color: "var(--green-dark)",
};

const linkBtn = {
  background: "none", border: "none", color: "var(--green-dark)",
  fontWeight: 700, fontSize: ".82rem", cursor: "pointer",
};

const filterChip = {
  padding: "5px 12px", border: "1px solid #e5e7eb",
  borderRadius: 99, fontSize: ".77rem", fontWeight: 600,
  cursor: "pointer", transition: "all .15s",
};

const wishCard = {
  background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12,
  padding: "16px 12px", position: "relative",
};

const wishHeart = {
  position: "absolute", top: 10, right: 10,
  background: "none", border: "none", cursor: "pointer",
  fontSize: "1rem", padding: 4,
};

const addToCartSmall = {
  width: "100%", padding: "8px",
  background: "#fff", border: "1.5px solid var(--green-dark)",
  borderRadius: 8, color: "var(--green-dark)",
  fontWeight: 700, fontSize: ".78rem", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  boxSizing: "border-box",
};

const addAddressBtn = {
  padding: "8px 16px", background: "var(--green-dark)",
  color: "#fff", border: "none", borderRadius: 8,
  fontSize: ".82rem", fontWeight: 700, cursor: "pointer",
  transition: "background .15s",
};

const defaultBadge = {
  position: "absolute", top: 12, right: 12,
  background: "var(--green-dark)", color: "#fff",
  fontSize: ".68rem", fontWeight: 700, padding: "2px 9px", borderRadius: 99,
  display: "flex", alignItems: "center",
};

const addrBtn = {
  padding: "6px 12px", background: "#fff",
  border: "1px solid #e5e7eb", borderRadius: 6,
  fontSize: ".78rem", fontWeight: 600, cursor: "pointer", color: "#374151",
};

const formLabel = {
  display: "block", fontSize: ".8rem",
  fontWeight: 700, color: "#374151", marginBottom: 5,
};

const formInput = {
  width: "100%", padding: "9px 12px",
  border: "1px solid #d1d5db", borderRadius: 8,
  fontSize: ".86rem", color: "#111", outline: "none",
  boxSizing: "border-box", transition: "border-color .15s",
};

const editBtn = {
  padding: "8px 16px", background: "#fff",
  border: "1.5px solid var(--green-dark)", color: "var(--green-dark)",
  borderRadius: 8, fontSize: ".82rem", fontWeight: 700, cursor: "pointer",
};

const saveBtn = {
  padding: "8px 18px", background: "var(--green-dark)",
  color: "#fff", border: "none", borderRadius: 8,
  fontSize: ".82rem", fontWeight: 700, cursor: "pointer",
  transition: "background .15s", display: "inline-flex", alignItems: "center",
};

const cancelBtn = {
  padding: "8px 14px", background: "#fff",
  border: "1px solid #e5e7eb", borderRadius: 8,
  fontSize: ".82rem", fontWeight: 600, cursor: "pointer", color: "#6b7280",
};

const successAlert = {
  background: "#f0fdf4", border: "1px solid #bbf7d0",
  borderRadius: 8, padding: "10px 14px",
  fontSize: ".83rem", color: "#16a34a", fontWeight: 600,
  marginBottom: 16, display: "flex", alignItems: "center",
};

const errorAlert = {
  background: "#fff5f5", border: "1px solid #fca5a5",
  borderRadius: 8, padding: "10px 14px",
  fontSize: ".83rem", color: "#dc2626", fontWeight: 600,
  marginBottom: 16, display: "flex", alignItems: "center",
};

const uploadBtn = {
  padding: "6px 14px", background: "#f3f4f6",
  border: "1px solid #e5e7eb", borderRadius: 7,
  fontSize: ".78rem", fontWeight: 600, cursor: "pointer", color: "#374151",
};

const removePhotoBtn = {
  padding: "6px 12px", background: "#fff",
  border: "1px solid #fca5a5", borderRadius: 7,
  fontSize: ".78rem", fontWeight: 600, cursor: "pointer", color: "#dc2626",
};

const enable2faBtn = {
  padding: "8px 16px", background: "#fff",
  border: "1.5px solid var(--green-dark)", color: "var(--green-dark)",
  borderRadius: 8, fontSize: ".82rem", fontWeight: 700, cursor: "pointer",
  transition: "background .15s",
};

const deleteAccBtn = {
  padding: "9px 20px", background: "#dc2626",
  color: "#fff", border: "none", borderRadius: 8,
  fontSize: ".84rem", fontWeight: 700, cursor: "pointer",
  transition: "background .15s", display: "inline-flex", alignItems: "center",
};

const mobileToggle = {
  width: "100%", padding: "11px 16px",
  background: "#fff", border: "1px solid #e5e7eb",
  borderRadius: 10, fontSize: ".87rem", fontWeight: 600,
  cursor: "pointer", display: "flex", alignItems: "center",
  gap: 8, color: "#374151", marginBottom: 10,
};
