import { useRef } from "react";

const BillGenerator = ({ order, sweets }) => {
  const billRef = useRef();

  const generatePDF = () => {
    const element = billRef.current;
    const opt = {
      margin: 10,
      filename: `bill-${order._id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    };

    const html2pdf = window.html2pdf || require("html2pdf.js");
    html2pdf().set(opt).from(element).save();
  };

  const printBill = () => {
    const element = billRef.current;
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(element.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  const getItemDetails = (itemId) => {
    return sweets.find((s) => s._id === itemId);
  };

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = order.discountAmount || 0;
  const total = subtotal - discount;

  return (
    <div>
      {/* BUTTONS */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <button
          onClick={printBill}
          style={{
            background: "linear-gradient(135deg, #C59B5F, #B88646)",
            border: "none",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(184,134,70,0.25)",
          }}
        >
          Print Bill
        </button>

        <button
          onClick={generatePDF}
          style={{
            background: "#3E2F1D",
            border: "none",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(62,47,29,0.25)",
          }}
        >
          Download PDF
        </button>
      </div>

      {/* BILL CONTENT */}
      <div
        ref={billRef}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          maxWidth: "600px",
          margin: "0 auto",
          fontFamily: "Poppins, sans-serif",
          fontSize: "14px",
          lineHeight: "1.6",
          color: "#3E2F1D",
          border: "1px solid #E8DCC5",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            borderBottom: "2px solid #C59B5F",
            paddingBottom: "20px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: "800",
              color: "#B88646",
            }}
          >
            ❁ The Mithai Box
          </h1>

          <p style={{ margin: "6px 0", color: "#7a6a55", fontSize: "12px" }}>
            Premium Traditional Indian Sweets
          </p>

          <p style={{ margin: "6px 0", color: "#7a6a55", fontSize: "12px" }}>
            support@themithaibox.com
          </p>
        </div>

        {/* DETAILS GRID */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              fontSize: "13px",
            }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: "700" }}>Bill Number</p>
              <p style={{ margin: 0 }}>{order._id.slice(-8).toUpperCase()}</p>
            </div>

            <div>
              <p style={{ margin: 0, fontWeight: "700" }}>Date</p>
              <p style={{ margin: 0 }}>
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p style={{ margin: 0, fontWeight: "700" }}>Customer Email</p>
              <p style={{ margin: 0 }}>{order.userId}</p>
            </div>

            <div>
              <p style={{ margin: 0, fontWeight: "700" }}>Status</p>
              <p
                style={{
                  margin: 0,
                  fontWeight: "700",
                  color: "#C59B5F",
                }}
              >
                {order.status.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <div
          style={{
            marginBottom: "20px",
            borderTop: "1px solid #E8DCC5",
            borderBottom: "1px solid #E8DCC5",
            padding: "15px 0",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              fontWeight: "700",
              fontSize: "12px",
              color: "#5A4733",
              marginBottom: "10px",
            }}
          >
            <div>Item</div>
            <div style={{ textAlign: "right" }}>Qty</div>
            <div style={{ textAlign: "right" }}>Price</div>
            <div style={{ textAlign: "right" }}>Total</div>
          </div>

          {/* ITEMS */}
          {order.items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                fontSize: "13px",
                paddingBottom: "8px",
                marginBottom: "8px",
                borderBottom: "1px solid #F3E8CF",
              }}
            >
              <div>{item.name}</div>
              <div style={{ textAlign: "right" }}>{item.quantity}</div>
              <div style={{ textAlign: "right" }}>₹{item.price.toFixed(2)}</div>
              <div style={{ textAlign: "right", fontWeight: "700" }}>
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* TOTALS */}
        <div style={{ marginBottom: "20px" }}>
          {/* Subtotal */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "6px",
            }}
          >
            <div
              style={{
                width: "200px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Subtotal:</span>
              <strong>₹{subtotal.toFixed(2)}</strong>
            </div>
          </div>

          {/* Discount */}
          {discount > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "6px",
                color: "#27AE60",
              }}
            >
              <div
                style={{
                  width: "200px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Discount:</span>
                <strong>-₹{discount.toFixed(2)}</strong>
              </div>
            </div>
          )}

          {/* TOTAL */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: "16px",
              fontWeight: "800",
              color: "#B88646",
              borderTop: "2px solid #C59B5F",
              paddingTop: "10px",
            }}
          >
            <div
              style={{
                width: "200px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Total Amount:</span>
              <strong>₹{total.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid #E8DCC5",
            textAlign: "center",
            fontSize: "12px",
            color: "#7a6a55",
          }}
        >
          <p style={{ margin: "0 0 6px 0" }}>
            Delivery Address: {order.deliveryAddress}
          </p>
          <p style={{ margin: "0 0 10px 0" }}>Thank you for your order!</p>
          <p style={{ margin: 0, fontSize: "11px" }}>
            This is a computer-generated invoice. No signature required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillGenerator;
