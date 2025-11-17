import { useState, useEffect } from "react";
import { orderAPI, sweetsAPI } from "../utils/api";
import BillGenerator from "../components/BillGenerator";

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedOrderForBill, setSelectedOrderForBill] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, sweetsRes] = await Promise.all([
        user?.role === "admin"
          ? orderAPI.getAllOrders()
          : orderAPI.getOrders(),
        sweetsAPI.getAllSweets(),
      ]);
      setOrders(ordersRes.data.orders);
      setSweets(sweetsRes.data.sweets);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus);
      setSuccess(
        `Status changed to: ${newStatus.toUpperCase()} successfully!`
      );
      await fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to update order status");
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await orderAPI.cancelOrder(orderId);
      setSuccess("Order cancelled successfully! Stock restored.");
      await fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to cancel order");
    }
  };

  const getStatusConfig = (status) => {
    const cfg = {
      pending: { color: "#C59B5F", icon: "⏳", label: "Pending" },
      confirmed: { color: "#A0773C", icon: "✔", label: "Confirmed" },
      preparing: { color: "#8F6B3A", icon: "👨🍳", label: "Preparing" },
      ready: { color: "#B88646", icon: "📦", label: "Ready" },
      delivered: { color: "#6B5C3B", icon: "🚚", label: "Delivered" },
      cancelled: { color: "#B13B3B", icon: "❌", label: "Cancelled" },
    };
    return cfg[status] || cfg.pending;
  };

  const canCancelOrder = (order) =>
    ["pending", "confirmed"].includes(order.status);

  /* BILL VIEW PAGE */
  if (selectedOrderForBill) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#FFF9F2,#FFF4E6)",
          paddingTop: "80px",
          paddingBottom: "40px",
        }}
      >
        <div className="container">
          <button
            onClick={() => setSelectedOrderForBill(null)}
            className="btn btn-secondary"
            style={{
              marginBottom: "20px",
              background: "#D8CBB3",
              color: "#3E2F1D",
              borderRadius: "12px",
              padding: "10px 18px",
              fontWeight: "700",
              border: "none",
            }}
          >
            ← Back to Orders
          </button>

          <BillGenerator order={selectedOrderForBill} sweets={sweets} />
        </div>
      </div>
    );
  }

  /* MAIN LIST PAGE */
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#FFF9F2,#FFF4E6)",
        paddingTop: "80px",
        paddingBottom: "40px",
      }}
    >
      <div className="container">
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "800",
              color: "#3E2F1D",
              letterSpacing: "-1px",
            }}
          >
            ❁{" "}
            {user?.role === "admin"
              ? "Order Management"
              : "Your Orders & Tracking"}
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#5A4733",
              fontWeight: "600",
              marginTop: "10px",
            }}
          >
            {user?.role === "admin"
              ? "Manage, track, and update all customer orders"
              : "View your order history and track status in real-time"}
          </p>
        </div>

        {/* ALERTS */}
        {error && (
          <div
            style={{
              background: "#ffdddd",
              padding: "12px",
              borderRadius: "10px",
              color: "#b13b3b",
              marginBottom: "20px",
              fontWeight: "700",
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
              fontWeight: "700",
            }}
          >
            {success}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div
            className="loading"
            style={{ textAlign: "center", padding: "50px" }}
          >
            <div className="spinner"></div>
            <p style={{ marginTop: "10px", color: "#5A4733", fontWeight: "600" }}>
              Loading order records…
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "80px 20px", color: "#5A4733" }}
          >
            <div style={{ fontSize: "60px" }}>📦</div>
            <h3
              style={{
                marginTop: "10px",
                fontSize: "22px",
                fontWeight: "800",
                color: "#3E2F1D",
              }}
            >
              No Orders Yet
            </h3>
            <p style={{ fontWeight: "600" }}>Your order history is empty</p>
          </div>
        ) : (
          <div className="grid-responsive">
            {orders.map((order) => {
              const statusCfg = getStatusConfig(order.status);

              return (
                <div
                  key={order._id}
                  style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: "18px",
                    border: `2px solid ${statusCfg.color}55`,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    transition: "0.3s",
                  }}
                >
                  {/* ORDER HEADER */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#5A4733",
                          margin: 0,
                        }}
                      >
                        Reference
                      </p>
                      <p
                        style={{
                          fontFamily: "monospace",
                          fontSize: "18px",
                          fontWeight: "800",
                          color: "#3E2F1D",
                        }}
                      >
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#5A4733",
                          margin: 0,
                        }}
                      >
                        Status
                      </p>

                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          background: statusCfg.color,
                          color: "white",
                          padding: "8px 14px",
                          borderRadius: "12px",
                          fontWeight: "700",
                          marginTop: "4px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          fontSize: "12px",
                        }}
                      >
                        {statusCfg.icon} {statusCfg.label}
                      </span>
                    </div>
                  </div>

                  {/* ORDER META */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
                      gap: "20px",
                      background: "#FAF3E5",
                      padding: "16px",
                      borderRadius: "14px",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#5A4733",
                        }}
                      >
                        Total
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "20px",
                          fontWeight: "800",
                          color: "#B88646",
                        }}
                      >
                        ₹{order.totalAmount.toFixed(2)}
                      </p>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#5A4733",
                        }}
                      >
                        Date
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "700",
                          color: "#3E2F1D",
                        }}
                      >
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div style={{ marginBottom: "16px" }}>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "800",
                        color: "#3E2F1D",
                        marginBottom: "10px",
                      }}
                    >
                      Items
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px 12px",
                            background: "#F8F4EC",
                            borderRadius: "10px",
                            fontWeight: "600",
                            color: "#5A4733",
                          }}
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span
                            style={{
                              fontWeight: "800",
                              color: "#B88646",
                            }}
                          >
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BILL BUTTON */}
                  <button
                    onClick={() => setSelectedOrderForBill(order)}
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg,#C59B5F,#B88646)",
                      color: "white",
                      border: "none",
                      padding: "12px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      marginBottom: "12px",
                      cursor: "pointer",
                    }}
                  >
                    View / Download Bill
                  </button>

                  {/* ADMIN BUTTONS */}
                  {user?.role === "admin" && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginBottom: "10px",
                      }}
                    >
                      {[
                        "pending",
                        "confirmed",
                        "preparing",
                        "ready",
                        "delivered",
                      ].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(order._id, status)}
                          disabled={order.status === status}
                          style={{
                            flex: 1,
                            minWidth: "90px",
                            padding: "10px",
                            background: "#D8CBB3",
                            color: "#3E2F1D",
                            border: "none",
                            borderRadius: "10px",
                            fontWeight: "700",
                            cursor: "pointer",
                            opacity: order.status === status ? 0.6 : 1,
                          }}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* CANCEL BUTTON */}
                  {canCancelOrder(order) && (
                    <button
                      onClick={() => cancelOrder(order._id)}
                      style={{
                        width: "100%",
                        background: "#B13B3B",
                        color: "white",
                        border: "none",
                        padding: "12px",
                        borderRadius: "12px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
