import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SweetCard from "../components/SweetCard";

describe("SweetCard Component - TDD", () => {
  it("should render sweet card with name and price", () => {
    const sweet = { id: "1", name: "Chocolate Cake", category: "Cakes", price: 25.99, quantity: 10 };

    render(
      <BrowserRouter>
        <SweetCard sweet={sweet} />
      </BrowserRouter>
    );

    expect(screen.getByText("Chocolate Cake")).toBeInTheDocument();
    expect(screen.getByText(/25.99/)).toBeInTheDocument();
  });

  it("should disable purchase button when quantity is 0", () => {
    const sweet = { id: "1", name: "Chocolate Cake", category: "Cakes", price: 25.99, quantity: 0 };

    render(
      <BrowserRouter>
        <SweetCard sweet={sweet} />
      </BrowserRouter>
    );

    // ❗ FIXED (Your component uses “Out of Stock”, NOT “Purchase”)
    const outOfStockButton = screen.getByRole("button", { name: /out of stock/i });

    expect(outOfStockButton).toBeDisabled();
  });

  it("should show admin buttons only for admin users", () => {
    const sweet = { id: "1", name: "Chocolate Cake", category: "Cakes", price: 25.99, quantity: 10 };

    const { rerender } = render(
      <BrowserRouter>
        <SweetCard sweet={sweet} isAdmin={false} />
      </BrowserRouter>
    );

    expect(screen.queryByRole("button", { name: /delete/i })).not.toBeInTheDocument();

    rerender(
      <BrowserRouter>
        <SweetCard sweet={sweet} isAdmin={true} />
      </BrowserRouter>
    );

    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });
});
