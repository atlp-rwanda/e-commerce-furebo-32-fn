import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { ResetPassword } from "../components/resetPassword";
import fetchMock from "jest-fetch-mock";
import { toast } from "react-toastify";

fetchMock.enableMocks();

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: jest.fn(),
}));

beforeEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
  Object.defineProperty(window, 'location', {
    value: { href: 'http://localhost/reset-password?token=fake-token' },
    writable: true,
  });
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("ResetPassword Component", () => {
  test("renders the component and checks initial state", () => {
    renderWithRouter(<ResetPassword />);
    expect(screen.getByLabelText("New Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password:")).toBeInTheDocument();
    expect(screen.getByText("Reset Password")).toBeInTheDocument();
  });

  test("shows error when form is submitted with empty fields", async () => {
    renderWithRouter(<ResetPassword />);
    fireEvent.click(screen.getByText("Reset Password"));
    await waitFor(() => {
      expect(screen.getByText("Please enter your new password")).toBeInTheDocument();
    });
  });

  test("shows error when passwords don't match", async () => {
    renderWithRouter(<ResetPassword />);
    fireEvent.change(screen.getByLabelText("New Password:"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password:"), {
      target: { value: "password456" },
    });
    fireEvent.click(screen.getByText("Reset Password"));
    await waitFor(() => {
      expect(screen.getByText("Password don't match")).toBeInTheDocument();
    });
  });

  test("successful password reset", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Password reset successful" }), {
      status: 200,
    });

    renderWithRouter(<ResetPassword />);
    fireEvent.change(screen.getByLabelText("New Password:"), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password:"), {
      target: { value: "newpassword123" },
    });
    fireEvent.click(screen.getByText("Reset Password"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "https://e-commerce-furebo-32-bn-1.onrender.com/api/users/resetpassword?token=fake-token",
        expect.any(Object)
      );
      expect(toast.success).toHaveBeenCalledWith("Password reset successful");
    });
  });

  test("unsuccessful password reset", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Invalid or expired token" }), {
      status: 400,
    });

    renderWithRouter(<ResetPassword />);
    fireEvent.change(screen.getByLabelText("New Password:"), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password:"), {
      target: { value: "newpassword123" },
    });
    fireEvent.click(screen.getByText("Reset Password"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "https://e-commerce-furebo-32-bn-1.onrender.com/api/users/resetpassword?token=fake-token",
        expect.any(Object)
      );
      expect(toast.error).toHaveBeenCalledWith("Invalid or expired token");
    });
  });
});