import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import LoginPage from "../LoginPage";

import * as authService from "../../../../services/authService";

import { vi } from "vitest";

import { MemoryRouter } from "react-router-dom";

import { AuthProvider } from "../../context/AuthContext";

vi.spyOn(authService, "login").mockResolvedValue({
  success: false,
  message: "Invalid phone or password",
});

describe("Login Page", () => {
  it("shows password validation error", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>,
    );

    const passwordInput = screen.getByPlaceholderText("••••••••");

    await userEvent.type(passwordInput, "abc");

    expect(
      screen.getByText("رمز عبور باید حداقل ۸ کاراکتر باشد"),
    ).toBeInTheDocument();
  });

  it("shows invalid credentials error", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>,
    );

    const phoneInput = screen.getByPlaceholderText("09123456789");

    const passwordInput = screen.getByPlaceholderText("••••••••");

    await userEvent.type(phoneInput, "09120000000");

    await userEvent.type(passwordInput, "Test@123");

    const loginButton = screen.getByRole("button", {
      name: "ورود",
    });

    await userEvent.click(loginButton);

    expect(authService.login).toHaveBeenCalled();

    const error = await screen.findByText("نام کاربری یا رمز عبور نادرست است");

    expect(error).toBeInTheDocument();
  });

  it("logs in successfully", async () => {
    vi.spyOn(authService, "login").mockResolvedValue({
      token: "fake-jwt-token",

      user: {
        id: 1,

        phoneNumber: "09120000000",
      },
    });

    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>,
    );

    const phoneInput = screen.getByPlaceholderText("09123456789");

    const passwordInput = screen.getByPlaceholderText("••••••••");

    await userEvent.type(phoneInput, "09120000000");

    await userEvent.type(passwordInput, "Test@123");

    const loginButton = screen.getByRole("button", {
      name: "ورود",
    });

    await userEvent.click(loginButton);

    expect(authService.login).toHaveBeenCalled();
  });
});
