import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { describe, expect, it } from "vitest";

describe("Card Component", () => {
  it("should render children content", () => {
    render(
      <Card>
        <p>Card Content</p>
      </Card>
    );

    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("should render title when provided", () => {
    render(
      <Card title="Card Title">
        <p>Card Content</p>
      </Card>
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
  });

  it("should not render title when not provided", () => {
    render(
      <Card>
        <p>Card Content</p>
      </Card>
    );

    expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
  });

  it("should render footer when provided", () => {
    render(
      <Card footer="Card Footer">
        <p>Card Content</p>
      </Card>
    );

    expect(screen.getByText("Card Footer")).toBeInTheDocument();
  });

  it("should not render footer when not provided", () => {
    render(
      <Card>
        <p>Card Content</p>
      </Card>
    );

    expect(screen.queryByText("Card Footer")).not.toBeInTheDocument();
  });
});
