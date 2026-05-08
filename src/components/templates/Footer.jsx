export default function Footer() {
    const companyLinks  = ["About Us", "Careers", "Blog", "Press"];
    const supportLinks  = ["Help Center", "Returns", "Track Order", "Contact Us"];
    const legalLinks    = ["Privacy Policy", "Terms of Use", "Cookie Policy"];

    const paymentIcons = [
        { src: "https://img.icons8.com/color/48/visa.png",       alt: "Visa" },
        { src: "https://img.icons8.com/color/48/mastercard.png", alt: "Mastercard" },
        { src: "https://img.icons8.com/color/48/paypal.png",     alt: "PayPal" },
        { src: "https://img.icons8.com/color/48/amex.png",       alt: "Amex" },
    ];

    return (
        <footer>
            <div className="container-fluid px-3 px-md-4">
                <div className="row g-4">

                    {/* Brand & socials */}
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="footer-brand">
                            <div className="logo-icon"><i className="fa fa-shopping-bag"></i></div>
                            Shopcart
                        </div>
                        <p style={{ fontSize: ".82rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                            Your one-stop destination for premium audio gear. Quality sound, unbeatable prices.
                        </p>
                        <div className="social-icons">
                            <a href="#"><i className="fa fa-facebook"></i></a>
                            <a href="#"><i className="fa fa-twitter"></i></a>
                            <a href="#"><i className="fa fa-instagram"></i></a>
                            <a href="#"><i className="fa fa-youtube-play"></i></a>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="col-6 col-md-2">
                        <h6>Company</h6>
                        {companyLinks.map((l, i) => <a href="#" key={i}>{l}</a>)}
                    </div>

                    {/* Support */}
                    <div className="col-6 col-md-2">
                        <h6>Support</h6>
                        {supportLinks.map((l, i) => <a href="#" key={i}>{l}</a>)}
                    </div>

                    {/* Legal */}
                    <div className="col-6 col-md-2">
                        <h6>Legal</h6>
                        {legalLinks.map((l, i) => <a href="#" key={i}>{l}</a>)}
                    </div>

                    {/* Download App */}
                    <div className="col-6 col-md-3">
                        <h6>Download App</h6>
                        <a
                            href="#"
                            className="d-flex align-items-center gap-2 mb-2"
                            style={{ background: "rgba(255,255,255,.08)", borderRadius: 10, padding: ".6rem .8rem", color: "#fff" }}
                        >
                            <i className="fa fa-apple" style={{ fontSize: "1.3rem" }}></i>
                            <span>
                                <small style={{ opacity: .6, display: "block", fontSize: ".68rem" }}>Download on the</small>
                                App Store
                            </span>
                        </a>
                        <a
                            href="#"
                            className="d-flex align-items-center gap-2"
                            style={{ background: "rgba(255,255,255,.08)", borderRadius: 10, padding: ".6rem .8rem", color: "#fff" }}
                        >
                            <i className="fa fa-android" style={{ fontSize: "1.3rem" }}></i>
                            <span>
                                <small style={{ opacity: .6, display: "block", fontSize: ".68rem" }}>Get it on</small>
                                Google Play
                            </span>
                        </a>
                    </div>
                </div>

                <hr className="footer-divider" />

                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <p className="footer-copy mb-0">© 2025 Shopcart. All rights reserved.</p>
                    <div className="d-flex gap-2 flex-wrap">
                        {paymentIcons.map((icon, i) => (
                            <img
                                key={i}
                                src={icon.src}
                                height="22"
                                alt={icon.alt}
                                style={{ filter: "grayscale(.4)" }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
