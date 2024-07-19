import React from "react";
import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { RequestResetPassword } from "../components/RequestResetPassword";
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
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("RequestResetPassword Component", () => {
  test("renders the component and checks initial state", () => {
    renderWithRouter(<RequestResetPassword />);
    expect(screen.getByLabelText("Enter your email to reset password:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("user@example.com")).toBeInTheDocument();
    expect(screen.getByText("Reset Password")).toBeInTheDocument();
  });

  test("shows error when form is submitted with empty email", async () => {
    renderWithRouter(<RequestResetPassword />);
    fireEvent.click(screen.getByText("Reset Password"));
    await waitFor(() => {
      expect(screen.getByText("Email is Required")).toBeInTheDocument();
    });
  });

  test("shows error when form is submitted with invalid email", async () => {
    renderWithRouter(<RequestResetPassword />);
    fireEvent.change(screen.getByPlaceholderText("user@example.com"), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByText("Reset Password"));
    await waitFor(() => {
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });
  });

  test("successful password reset request", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Password reset email sent" }), {
      status: 200,
    });

    renderWithRouter(<RequestResetPassword />);
    fireEvent.change(screen.getByPlaceholderText("user@example.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText("Reset Password"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "https://e-commerce-furebo-32-bn-1.onrender.com/api/users/requestpasswordreset",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ email: "test@example.com" }),
        })
      );
      expect(toast.success).toHaveBeenCalledWith("Password reset email sent");
    });
  });

  test("unsuccessful password reset request", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });

    renderWithRouter(<RequestResetPassword />);
    fireEvent.change(screen.getByPlaceholderText("user@example.com"), {
      target: { value: "nonexistent@example.com" },
    });
    fireEvent.click(screen.getByText("Reset Password"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "https://e-commerce-furebo-32-bn-1.onrender.com/api/users/requestpasswordreset",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ email: "nonexistent@example.com" }),
        })
      );
      expect(toast.error).toHaveBeenCalledWith("User not found");
    });
  });
});