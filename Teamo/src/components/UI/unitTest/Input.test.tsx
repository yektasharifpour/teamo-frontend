import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import Input from "./Input";

describe("Input Component", () => {
  it("shows password validation error", async () => {
    render(<Input label="Password" passwordValidation />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "abc");

    expect(
      screen.getByText("رمز عبور باید حداقل ۸ کاراکتر باشد"),
    ).toBeInTheDocument();
  });
});
