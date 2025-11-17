import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout, cartCount = 0 }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <>
      {/* 🔥 GOLDEN BROWN UNDERLINE FIX FOR ALL STATES */}
      <style>
        {`
          .nav-link {
            position: relative;
            text-decoration: none !important;
            color: #3E2F1D !important;
            font-weight: 600;
          }

          /* Hover underline animation */
          .nav-link::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -4px;
            height: 2px;
            width: 0%;
            background: linear-gradient(90deg, #C59B5F, #B88646);
            transition: width 0.3s ease;
            border-radius: 10px;
          }

          .nav-link:hover::after {
            width: 100%;
          }

          .nav-link:hover {
            color: #B88646 !important;
          }

          /* 🔥 FIX: Remove pink underline from browser focus/visited/active */
          .nav-link:visited,
          .nav-link:active,
          .nav-link:focus,
          .nav-link:focus-visible {
            color: #B88646 !important;
            text-decoration: none !important;
            text-decoration-color: #B88646 !important;
            outline: none !important;
            border: none !important;
          }

          /* Keep golden underline even on click */
          .nav-link:focus::after,
          .nav-link:active::after,
          .nav-link:focus-visible::after {
            width: 100%;
            background: linear-gradient(90deg, #C59B5F, #B88646) !important;
          }
        `}
      </style>

      <nav
        style={{
          background: "linear-gradient(135deg, #FFF9F2, #FFF4E6)",
          padding: "14px 0",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          borderBottom: "1px solid #E8DCC5",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* LOGO */}
            <Link
              to="/"
              className="nav-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
              }}
            >
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: "800",
                  color: "#B88646",
                  margin: 0,
                  letterSpacing: "-1px",
                }}
              >
                ❁ The Mithai Box
              </h1>
            </Link>

            {/* RIGHT SIDE */}
            <div
              style={{
                display: "flex",
                gap: "22px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {user ? (
                <>
                  {/* USER EMAIL */}
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#5A4733",
                    }}
                  >
                    {user.email}
                  </span>

                  {/* NON-ADMIN LINKS */}
                  {user.role !== "admin" && (
                    <>
                      <Link to="/orders" className="nav-link">
                        Orders
                      </Link>

                      <Link to="/cart" className="nav-link" style={{ position: "relative" }}>
                        Cart
                        {cartCount > 0 && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-10px",
                              background: "linear-gradient(135deg, #C59B5F, #B88646)",
                              color: "white",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "11px",
                              fontWeight: "700",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            }}
                          >
                            {cartCount}
                          </span>
                        )}
                      </Link>
                    </>
                  )}

                  {/* ADMIN LINKS */}
                  {user.role === "admin" && (
                    <>
                      <Link to="/admin" className="nav-link">
                        Inventory
                      </Link>
                      <Link to="/super-admin" className="nav-link">
                        Operations
                      </Link>
                      <Link to="/orders" className="nav-link">
                        Orders
                      </Link>
                    </>
                  )}

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    style={{
                      background: "linear-gradient(135deg, #C59B5F, #B88646)",
                      border: "none",
                      color: "white",
                      padding: "8px 18px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontWeight: "600",
                      boxShadow: "0 4px 14px rgba(184,134,70,0.3)",
                      transition: "0.2s",
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* SIGN IN */}
                  <Link
                    to="/login"
                    className="nav-link"
                    style={{
                      background: "linear-gradient(135deg, #C59B5F, #B88646)",
                      color: "white !important",
                      padding: "8px 20px",
                      borderRadius: "50px",
                      textDecoration: "none",
                      fontWeight: "600",
                      boxShadow: "0 4px 14px rgba(184,134,70,0.3)",
                    }}
                  >
                    Sign In
                  </Link>

                  {/* SIGN UP */}
                  <Link
                    to="/register"
                    className="nav-link"
                    style={{
                      background: "linear-gradient(135deg, #C59B5F, #B88646)",
                      color: "white !important",
                      padding: "8px 20px",
                      borderRadius: "50px",
                      textDecoration: "none",
                      fontWeight: "600",
                      boxShadow: "0 4px 14px rgba(184,134,70,0.3)",
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
