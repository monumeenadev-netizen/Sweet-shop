import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { orderAPI } from "../utils/api";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart, getCartTotal, clearCart } =
    useCart();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const total = getCartTotal();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    try {
      const { data } = await orderAPI.validateDiscount(couponCode, total);
      setDiscount(data.discountAmount);
      setSuccess(
        `🎉 Coupon applied! Discount: ₹${data.discountAmount.toFixed(2)}`
      );
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid coupon code");
      setDiscount(0);
    }
  };

  const handleCheckout = async () => {
    if (!deliveryAddress.trim()) {
      setError("Please enter delivery address");
      return;
    }

    setLoading(true);
    try {
      await orderAPI.createOrder(
        deliveryAddress,
        notes,
        couponCode || undefined
      );
      setSuccess("Order placed successfully!");
      await clearCart();
      setTimeout(() => navigate("/orders"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (!cart) return <div>Loading...</div>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFF9F2, #FFF4E6)",
        paddingTop: "80px",
        paddingBottom: "40px",
      }}
    >
      <div className="container">
        <h1
          style={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "800",
            color: "#3E2F1D",
            marginBottom: "30px",
            letterSpacing: "-1px",
          }}
        >
          ❁ Your Cart
        </h1>

        {/* ALERTS */}
        {error && (
          <div
            style={{
              background: "#ffdddd",
              padding: "12px",
              borderRadius: "10px",
              color: "#b13b3b",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              background: "#e7d7b8",
              padding: "12px",
              borderRadius: "10px",
              color: "#8A672D",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {success}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "30px",
          }}
        >
          {/* LEFT: Cart Items */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              border: "2px solid #E8DCC5",
            }}
          >
            {cart.items.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#5A4733",
                  padding: "40px",
                  fontWeight: "600",
                }}
              >
                Your cart is empty
              </p>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item.sweetId}
                  style={{
                    borderBottom: "1px solid #F3E8CF",
                    paddingBottom: "15px",
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        color: "#3E2F1D",
                        fontWeight: "700",
                      }}
                    >
                      {item.sweetId.name}
                    </h3>

                    <p
                      style={{
                        marginTop: "4px",
                        color: "#5A4733",
                        fontSize: "14px",
                      }}
                    >
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  {/* Qty Controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button
                      onClick={() =>
                        updateCartItem(item.sweetId._id, item.quantity - 1)
                      }
                      style={{
                        padding: "6px 10px",
                        background: "#D8CBB3",
                        color: "#3E2F1D",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>

                    <span
                      style={{
                        minWidth: 28,
                        textAlign: "center",
                        fontWeight: "700",
                      }}
                    >
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateCartItem(item.sweetId._id, item.quantity + 1)
                      }
                      style={{
                        padding: "6px 10px",
                        background:
                          "linear-gradient(135deg, #C59B5F, #B88646)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.sweetId._id)}
                      style={{
                        padding: "6px 10px",
                        background: "#B13B3B",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "700",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT: Order Summary */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "24px",
              height: "fit-content",
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              border: "2px solid #E8DCC5",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "16px",
                color: "#3E2F1D",
                fontWeight: "800",
              }}
            >
              ❁ Order Summary
            </h2>

            {/* PRICES */}
            <div
              style={{
                marginBottom: "20px",
                paddingBottom: "16px",
                borderBottom: "1px solid #F3E8CF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span>Delivery</span>
                <span>Free</span>
              </div>

              {discount > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    color: "#27AE60",
                    fontWeight: "700",
                  }}
                >
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "20px",
                  fontWeight: "800",
                  color: "#B88646",
                }}
              >
                <span>Total</span>
                <span>₹{(total - discount).toFixed(2)}</span>
              </div>
            </div>

            {/* COUPON */}
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label" style={{ fontWeight: "700" }}>
                Coupon Code
              </label>

              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  value={couponCode}
                  onChange={(e) =>
                    setCouponCode(e.target.value.toUpperCase())
                  }
                  placeholder="Enter coupon"
                  className="form-control"
                  style={{
                    flex: 1,
                    borderRadius: "10px",
                    border: "1px solid #D8CBB3",
                    padding: "10px",
                  }}
                />

                <button
                  onClick={handleApplyCoupon}
                  style={{
                    background:
                      "linear-gradient(135deg, #C59B5F, #B88646)",
                    border: "none",
                    color: "white",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: "700" }}>
                Delivery Address
              </label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                rows="3"
                placeholder="Enter your delivery address"
                className="form-control"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #D8CBB3",
                  padding: "10px",
                }}
              />
            </div>

            {/* NOTES */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: "700" }}>
                Special Instructions
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="2"
                placeholder="Any special requests?"
                className="form-control"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #D8CBB3",
                  padding: "10px",
                }}
              />
            </div>

            {/* Checkout */}
            <button
              onClick={handleCheckout}
              disabled={loading || cart.items.length === 0}
              style={{
                width: "100%",
                background:
                  "linear-gradient(135deg, #C59B5F, #B88646)",
                border: "none",
                color: "white",
                padding: "14px",
                borderRadius: "12px",
                fontWeight: "800",
                marginTop: "16px",
                cursor: "pointer",
                opacity:
                  loading || cart.items.length === 0 ? 0.7 : 1,
              }}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
