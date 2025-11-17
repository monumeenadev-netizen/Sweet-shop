import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { orderAPI } from "../utils/api";
import { Trash2, Plus, Minus, ShoppingBag, Tag, MapPin, FileText } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart, getCartTotal, clearCart } = useCart();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const total = getCartTotal();
  const finalTotal = total - discount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    try {
      const { data } = await orderAPI.validateDiscount(couponCode, total);
      setDiscount(data.discountAmount);
      setSuccess(`🎉 Coupon applied! You saved ₹${data.discountAmount.toFixed(2)}`);
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid coupon code");
      setDiscount(0);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleCheckout = async () => {
    if (!deliveryAddress.trim()) {
      setError("Please enter delivery address");
      return;
    }

    setLoading(true);
    try {
      await orderAPI.createOrder(deliveryAddress, notes, couponCode || undefined);
      setSuccess("Order placed successfully! 🎉");
      await clearCart();
      setTimeout(() => navigate("/orders"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFF8F3 0%, #FFF0F5 50%, #F5F0FF 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}>
        <div style={{
          textAlign: "center",
          background: "white",
          padding: "4rem 3rem",
          borderRadius: "24px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px"
        }}>
          <div style={{ fontSize: "80px", marginBottom: "1.5rem" }}>🛒</div>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "800",
            color: "#2D1B4E",
            marginBottom: "1rem"
          }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: "#666", marginBottom: "2rem", fontSize: "16px" }}>
            Looks like you haven't added any sweets yet. Start shopping to fill your cart!
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              background: "linear-gradient(135deg, #FF6B9D, #FFB347)",
              border: "none",
              padding: "1rem 3rem",
              borderRadius: "16px",
              color: "white",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(255, 107, 157, 0.3)",
              transition: "transform 0.3s"
            }}
            onMouseEnter={e => e.target.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FFF8F3 0%, #FFF0F5 50%, #F5F0FF 100%)",
      paddingTop: "2rem",
      paddingBottom: "4rem"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{
            fontSize: "42px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #2D1B4E, #FF6B9D)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem"
          }}>
            Shopping Cart
          </h1>
          <p style={{ color: "#666", fontSize: "16px" }}>
            {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div style={{
            background: "linear-gradient(135deg, #FFE5E5, #FFD0D0)",
            padding: "1rem 1.5rem",
            borderRadius: "16px",
            color: "#C62828",
            marginBottom: "1.5rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}>
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div style={{
            background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)",
            padding: "1rem 1.5rem",
            borderRadius: "16px",
            color: "#2E7D32",
            marginBottom: "1.5rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}>
            ✅ {success}
          </div>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 400px",
          gap: "2rem"
        }}>
          {/* Cart Items */}
          <div>
            <div style={{
              background: "white",
              borderRadius: "20px",
              padding: "1.5rem",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)"
            }}>
              {cart.items.map((item, index) => (
                <div
                  key={item.sweetId._id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr auto",
                    gap: "1.5rem",
                    paddingBottom: "1.5rem",
                    marginBottom: "1.5rem",
                    borderBottom: index !== cart.items.length - 1 ? "1px solid #f0f0f0" : "none"
                  }}
                >
                  {/* Image */}
                  <div
                    onClick={() => navigate(`/product/${item.sweetId._id}`)}
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <img
                      src={item.sweetId.image || "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&q=80"}
                      alt={item.sweetId.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <h3
                      onClick={() => navigate(`/product/${item.sweetId._id}`)}
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#2D1B4E",
                        marginBottom: "0.5rem",
                        cursor: "pointer"
                      }}
                    >
                      {item.sweetId.name}
                    </h3>
                    <p style={{ color: "#999", fontSize: "14px", marginBottom: "1rem" }}>
                      {item.sweetId.category}
                    </p>

                    {/* Quantity Controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        background: "#f5f5f5",
                        padding: "0.5rem",
                        borderRadius: "12px"
                      }}>
                        <button
                          onClick={() => updateCartItem(item.sweetId._id, Math.max(1, item.quantity - 1))}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            border: "none",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
                          }}
                        >
                          <Minus size={16} color="#666" />
                        </button>

                        <span style={{ fontWeight: "700", fontSize: "16px", minWidth: "30px", textAlign: "center" }}>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateCartItem(item.sweetId._id, item.quantity + 1)}
                          disabled={item.quantity >= item.sweetId.quantity}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            border: "none",
                            background: item.quantity >= item.sweetId.quantity ? "#f0f0f0" : "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: item.quantity >= item.sweetId.quantity ? "not-allowed" : "pointer",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
                          }}
                        >
                          <Plus size={16} color={item.quantity >= item.sweetId.quantity ? "#999" : "#666"} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.sweetId._id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#E57373",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          fontWeight: "600",
                          fontSize: "14px",
                          transition: "background 0.3s"
                        }}
                        onMouseEnter={e => e.target.style.background = "#FFE5E5"}
                        onMouseLeave={e => e.target.style.background = "transparent"}
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: "right" }}>
                    <div style={{
                      fontSize: "24px",
                      fontWeight: "800",
                      background: "linear-gradient(135deg, #FF6B9D, #FFB347)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: "0.5rem"
                    }}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div style={{ fontSize: "13px", color: "#999" }}>
                      ₹{item.price} × {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{
              background: "white",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
              position: "sticky",
              top: "100px"
            }}>
              <h2 style={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#2D1B4E",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <ShoppingBag size={24} />
                Order Summary
              </h2>

              {/* Coupon */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#666",
                  fontSize: "14px"
                }}>
                  <Tag size={16} />
                  Apply Coupon
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="SAVE20"
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      border: "2px solid #f0f0f0",
                      borderRadius: "12px",
                      fontSize: "15px",
                      fontWeight: "600",
                      outline: "none"
                    }}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    style={{
                      background: "linear-gradient(135deg, #B19CD9, #8B7FB5)",
                      border: "none",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "12px",
                      color: "white",
                      fontWeight: "700",
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div style={{
                padding: "1.5rem 0",
                borderTop: "1px solid #f0f0f0",
                borderBottom: "1px solid #f0f0f0",
                marginBottom: "1.5rem"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ color: "#666" }}>Subtotal</span>
                  <span style={{ fontWeight: "600" }}>₹{total.toFixed(2)}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ color: "#666" }}>Delivery</span>
                  <span style={{ fontWeight: "600", color: "#4ADE80" }}>Free</span>
                </div>

                {discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <span style={{ color: "#4ADE80" }}>Discount</span>
                    <span style={{ fontWeight: "600", color: "#4ADE80" }}>-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #f0f0f0"
                }}>
                  <span style={{ fontSize: "18px", fontWeight: "700" }}>Total</span>
                  <span style={{
                    fontSize: "28px",
                    fontWeight: "800",
                    background: "linear-gradient(135deg, #FF6B9D, #FFB347)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                    ₹{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Delivery Address */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#666",
                  fontSize: "14px"
                }}>
                  <MapPin size={16} />
                  Delivery Address *
                </label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  rows="3"
                  placeholder="Enter your complete delivery address"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #f0f0f0",
                    borderRadius: "12px",
                    fontSize: "15px",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              {/* Special Notes */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#666",
                  fontSize: "14px"
                }}>
                  <FileText size={16} />
                  Special Instructions
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="2"
                  placeholder="Any special requests?"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #f0f0f0",
                    borderRadius: "12px",
                    fontSize: "15px",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={loading || cart.items.length === 0 || !deliveryAddress.trim()}
                style={{
                  width: "100%",
                  background: loading || !deliveryAddress.trim()
                    ? "#ccc"
                    : "linear-gradient(135deg, #FF6B9D, #FFB347)",
                  border: "none",
                  padding: "1.25rem",
                  borderRadius: "16px",
                  color: "white",
                  fontWeight: "800",
                  fontSize: "16px",
                  cursor: loading || !deliveryAddress.trim() ? "not-allowed" : "pointer",
                  boxShadow: loading || !deliveryAddress.trim()
                    ? "none"
                    : "0 8px 24px rgba(255, 107, 157, 0.3)",
                  transition: "all 0.3s"
                }}
                onMouseEnter={e => {
                  if (!loading && deliveryAddress.trim()) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 12px 32px rgba(255, 107, 157, 0.4)";
                  }
                }}
                onMouseLeave={e => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = loading || !deliveryAddress.trim()
                    ? "none"
                    : "0 8px 24px rgba(255, 107, 157, 0.3)";
                }}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>

              <p style={{
                marginTop: "1rem",
                textAlign: "center",
                fontSize: "12px",
                color: "#999"
              }}>
                🔒 Secure checkout • Free delivery on all orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;