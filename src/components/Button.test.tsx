import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { describe, expect, it, vi } from "vitest";

describe("Button Component", () => {
  it("should render button with text", () => {
    render(<Button onClick={() => {}}>Click me</Button>);

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should call onClick when button is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByText("Click me");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply primary variant classes", () => {
    render(
      <Button variant="primary" onClick={() => {}}>
        Click me
      </Button>
    );

    const button = screen.getByText("Click me");
    expect(button).toHaveClass("bg-blue-500");
  });

  it("should not call onClick when button is disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    );

    const button = screen.getByText("Click me");
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
