import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelecaoForm } from "./SelecaoForm";
import { describe, expect, it, vi } from "vitest";

describe("SelecaoForm Component", () => {
  it("should render all form fields", () => {
    render(<SelecaoForm onSubmit={() => {}} />);

    expect(screen.getByLabelText("Seleção")).toBeInTheDocument();
    expect(screen.getByLabelText("Grupo")).toBeInTheDocument();
    expect(screen.getByLabelText("Titulos")).toBeInTheDocument();
  });

  it("should allow user to fill the form fields", async () => {
    render(<SelecaoForm onSubmit={() => {}} />);

    const selecaoInput = screen.getByLabelText("Seleção");
    const grupoInput = screen.getByLabelText("Grupo");
    const titulosInput = screen.getByLabelText("Titulos");

    await userEvent.type(selecaoInput, "Brasil");
    await userEvent.type(grupoInput, "G");
    await userEvent.type(titulosInput, "5");

    expect(selecaoInput).toHaveValue("Brasil");
    expect(grupoInput).toHaveValue("G");
    expect(titulosInput).toHaveValue("5");
  });

  it("should call onSubmit with correct data when form is submitted", async () => {
    const mockOnSubmit = vi.fn();
    render(<SelecaoForm onSubmit={mockOnSubmit} />);

    const selecaoInput = screen.getByLabelText("Seleção");
    const grupoInput = screen.getByLabelText("Grupo");
    const titulosInput = screen.getByLabelText("Titulos");
    const submitButton = screen.getByRole("button", { name: /adicionar/i });

    await userEvent.type(selecaoInput, "Argentina");
    await userEvent.type(grupoInput, "C");
    await userEvent.type(titulosInput, "3");
    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      nome: "Argentina",
      grupo: "C",
      titulos: 3,
    });
  });

  it("should reset form fields after submission", async () => {
    const mockOnSubmit = vi.fn();
    render(<SelecaoForm onSubmit={mockOnSubmit} />);

    const selecaoInput = screen.getByLabelText("Seleção");
    const grupoInput = screen.getByLabelText("Grupo");
    const titulosInput = screen.getByLabelText("Titulos");
    const submitButton = screen.getByRole("button", { name: /adicionar/i });

    await userEvent.type(selecaoInput, "Alemanha");
    await userEvent.type(grupoInput, "E");
    await userEvent.type(titulosInput, "4");
    await userEvent.click(submitButton);

    expect(selecaoInput).toHaveValue("");
    expect(grupoInput).toHaveValue("");
    expect(titulosInput).toHaveValue("0");
  });

  it("should not call onSubmit when form is submitted with empty fields", async () => {
    const mockOnSubmit = vi.fn();
    render(<SelecaoForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole("button", { name: /adicionar/i });
    await userEvent.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
