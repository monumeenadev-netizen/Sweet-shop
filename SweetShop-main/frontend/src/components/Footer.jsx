const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #FFF4E6, #FFE8CC)",
        padding: "50px 0 30px",
        borderTop: "2px solid #E8DCC5",
        marginTop: "80px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
            marginBottom: "40px",
          }}
        >
          {/* BRAND */}
          <div>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: "800",
                color: "#B88646",
                marginBottom: "12px",
              }}
            >
              ❁ The Mithai Box
            </h2>
            <p style={{ color: "#6A5433", fontWeight: "500", lineHeight: "1.6" }}>
              Finest handcrafted sweets, prepared fresh using traditional recipes
              and premium ingredients.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#8A6A3F",
                marginBottom: "12px",
              }}
            >
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
              <li>
                <a href="/" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/dashboard" className="footer-link">
                  Sweets Collection
                </a>
              </li>
              <li>
                <a href="/cart" className="footer-link">
                  Cart
                </a>
              </li>
              <li>
                <a href="/orders" className="footer-link">
                  Orders
                </a>
              </li>
            </ul>
          </div>

          {/* CUSTOMER SUPPORT */}
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#8A6A3F",
                marginBottom: "12px",
              }}
            >
              Support
            </h3>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
              <li>
                <a href="/contact" className="footer-link">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="footer-link">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/terms" className="footer-link">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="footer-link">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL + CONTACT */}
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#8A6A3F",
                marginBottom: "12px",
              }}
            >
              Connect with Us
            </h3>

            <div
              style={{
                display: "flex",
                gap: "14px",
                marginBottom: "14px",
              }}
            >
              <a href="#" className="footer-social">
                🌐
              </a>
              <a href="#" className="footer-social">
                📸
              </a>
              <a href="#" className="footer-social">
                🐦
              </a>
              <a href="#" className="footer-social">
                📘
              </a>
            </div>

            <p style={{ color: "#6A5433", fontWeight: "500" }}>
              📞 +91 98765 43210
            </p>
            <p style={{ color: "#6A5433", fontWeight: "500" }}>
              ✉ support@themithaibox.com
            </p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <hr style={{ border: "none", borderTop: "1px solid #EAD8BF", margin: "20px 0" }} />

        <p
          style={{
            textAlign: "center",
            color: "#6A5433",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          © {new Date().getFullYear()} The Mithai Box — All Rights Reserved 🍬
        </p>
      </div>

      {/* Footer Styles */}
      <style>
        {`
          .footer-link {
            color: #6A5433;
            text-decoration: none;
            font-weight: 600;
            transition: 0.25s;
            position: relative;
          }

          .footer-link:hover {
            color: #B88646;
          }

          /* Golden underline on hover */
          .footer-link::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 0%;
            height: 2px;
            background: #B88646;
            transition: width 0.3s ease-in-out;
          }

          .footer-link:hover::after {
            width: 100%;
          }

          .footer-social {
            font-size: 20px;
            text-decoration: none;
            color: #6A5433;
            background: #FFF4E6;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justifyContent: center;
            border: 1px solid #E8DCC5;
            transition: 0.25s;
          }

          .footer-social:hover {
            background: linear-gradient(135deg, #C59B5F, #B88646);
            color: white;
            border-color: transparent;
            box-shadow: 0 4px 12px rgba(184,134,70,0.3);
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
