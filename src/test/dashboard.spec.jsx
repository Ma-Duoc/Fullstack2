import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: "/dashboard",
    }),
  };
});

describe("Dashboard - pruebas unitarias básicas", () => {

  beforeEach(() => {
    sessionStorage.clear();

    sessionStorage.setItem("nombre", "Marco");
    sessionStorage.setItem("apellido", "Perez");
    sessionStorage.setItem("email", "marco@test.com");
    sessionStorage.setItem("telefono", "987654321");
    sessionStorage.setItem("rut", "12345678-9");

    mockNavigate.mockClear();
  });

  it("muestra información del perfil cargada desde sessionStorage", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Marco Perez/i)).toBeInTheDocument();
    expect(screen.getByText(/12345678-9/i)).toBeInTheDocument();
    expect(screen.getByText(/marco@test.com/i)).toBeInTheDocument();
  });

  it("permite entrar en modo edición", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Editar/i }));

    expect(screen.getByRole("button", { name: /Guardar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancelar/i })).toBeInTheDocument();
  });

  it("permite cancelar la edición", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Editar/i }));
    fireEvent.click(screen.getByRole("button", { name: /Cancelar/i }));

    expect(screen.getByRole("button", { name: /Editar/i })).toBeInTheDocument();
  });

  it("guarda cambios en sessionStorage", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Editar/i }));

    const emailInput = screen.getByDisplayValue("marco@test.com");

    fireEvent.change(emailInput, {
      target: { value: "nuevo@test.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Guardar/i }));

    expect(sessionStorage.getItem("email")).toBe("nuevo@test.com");
  });

  it("cierra sesión y navega a inicio", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Cerrar Sesión/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/inicio");
  });

  it("navega a la página de citas", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Citas/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/citas");
  });

  it("navega a la página de historial", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Historial/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/historial");
  });
});