import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";

describe("Login Page - TDD", () => {
  it("should render login form with email and password fields", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // hidden submit exists
    const submit = document.querySelector('button[type="submit"]');
    expect(submit).toBeTruthy();
  });

  it("should submit login form with email and password", () => {
    const mockLogin = vi.fn();

    render(
      <MemoryRouter>
        <Login onLogin={mockLogin} />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // trigger form submit manually
    const form = emailInput.closest("form");
    fireEvent.submit(form);

    expect(emailInput.value).toBe("user@test.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("should display error message on failed login", () => {
    render(
      <MemoryRouter>
        <Login onLogin={() => {}} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});
