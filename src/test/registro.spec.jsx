import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Registro from "../pages/Registro";
import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Registro - pruebas unitarias básicas", () => {
  beforeEach(() => {
    sessionStorage.clear();
    mockNavigate.mockClear();
  });

  test("guarda en sessionStorage y muestra mensaje de éxito al registrarse correctamente", async () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Nombre Completo"), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByLabelText("Correo Electrónico"), {
      target: { value: "juan@test.com" },
    });
    fireEvent.change(screen.getByLabelText("RUT"), {
      target: { value: "12345678-5" }, // ✅ válido
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "Password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar Contraseña"), {
      target: { value: "Password123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Registrarse" }));

    await waitFor(() => {
      expect(screen.getByText(/registro exitoso/i)).toBeInTheDocument();
    });

    expect(mockNavigate).toHaveBeenCalledWith("/inicio");
    expect(sessionStorage.getItem("usuario")).toContain("Juan Pérez");
  });
});




