import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

import { AuthProvider } from "../../context/AuthContext";

import RegisterPage from "../RegisterPage";
import * as authService from "../../../../services/authService";

import { vi } from "vitest";

vi.spyOn(authService, "register").mockResolvedValue({
  success: false,

  message: "Phone number already exists",
});
describe("Register Page", () => {
  it("shows password mismatch error", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthProvider>,
    );

    const passwordInputs = screen.getAllByPlaceholderText("••••••••");

    const passwordInput = passwordInputs[0];

    const confirmPasswordInput = passwordInputs[1];

    await userEvent.type(passwordInput, "Test@123");

    await userEvent.type(confirmPasswordInput, "Wrong@123");

    const registerButton = screen.getByRole("button", {
      name: "ثبت نام",
    });

    await userEvent.click(registerButton);

    const error = await screen.findByText("رمزهای عبور یکسان نیستند");

    expect(error).toBeInTheDocument();
  });
  it("shows duplicate phone error", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthProvider>,
    );

    const phoneInput = screen.getByPlaceholderText("09123456789");

    const passwordInputs = screen.getAllByPlaceholderText("••••••••");

    const passwordInput = passwordInputs[0];

    const confirmPasswordInput = passwordInputs[1];

    await userEvent.type(phoneInput, "09120000000");

    await userEvent.type(passwordInput, "Test@123");

    await userEvent.type(confirmPasswordInput, "Test@123");

    const registerButton = screen.getByRole("button", {
      name: "ثبت نام",
    });

    await userEvent.click(registerButton);

    expect(authService.register).toHaveBeenCalled();

    const error = await screen.findByText("این شماره قبلاً ثبت شده است");

    expect(error).toBeInTheDocument();
  });
});
