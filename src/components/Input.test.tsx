import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import { describe, expect, it, vi } from "vitest";

describe("Input Component", () => {
  it("should render with value", () => {
    render(<Input value="Test Value" onChange={() => {}}></Input>);

    expect(screen.getByDisplayValue("Test Value")).toBeInTheDocument();
  });

  it("should render label when provided", () => {
    render(<Input value="" label="Test Label" onChange={() => {}}></Input>);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("should not render label when not provided", () => {
    render(<Input value="" onChange={() => {}}></Input>);

    expect(screen.queryByText("Test Label")).not.toBeInTheDocument();
  });

  it("should call onChange when user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input value="" onChange={handleChange}></Input>);

    const input = screen.getByRole("textbox");
    await user.type(input, "Brasil");

    expect(handleChange).toHaveBeenCalled();
  });

  it("should apply correct type attribute", () => {
    render(<Input value="" type="text" onChange={() => {}}></Input>);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Input value="" disabled onChange={() => {}}></Input>);

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });
});
