import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // Only this import is necessary
import { BrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Login Component", () => {
  test("renders the component and checks initial state", () => {
    renderWithRouter(<Login />);
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("shows error when form is submitted with empty fields", async () => {
    renderWithRouter(<Login />);
    fireEvent.click(screen.getByText("Login"));
    await waitFor(() => {
      expect(
        screen.getByText("Please fill in both fields.")
      ).toBeInTheDocument();
    });
  });

  test("shows error when form is submitted with invalid email", async () => {
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("Login"));
    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address.")
      ).toBeInTheDocument();
    });
  });

  test("successful login", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ token: "fake-token" }), {
      status: 200,
    });

    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("fake-token");
      expect(
        screen.queryByText("Please fill in both fields.")
      ).not.toBeInTheDocument();
    });
  });

  test("unsuccessful login", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Invalid email or password" }),
      { status: 401 }
    );

    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
  });
});
