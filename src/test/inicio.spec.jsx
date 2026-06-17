import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Inicio from "../pages/Inicio";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Inicio", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renderiza el título principal", () => {
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    expect(screen.getByText(/BIENVENIDO/i)).toBeInTheDocument();
  });

  it("renderiza noticias de la clínica", () => {
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Nueva Unidad de Urgencias/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Campaña de vacunación/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Nuevo equipo médico/i)
    ).toBeInTheDocument();
  });

  it("navega a login al presionar Ingresar con Clave Única", () => {
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Ingresar con Clave Única/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("navega a registro al presionar Registrarse", () => {
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Registrarse/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/registro");
  });

  it("navega a preguntas frecuentes", () => {
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Preguntas Frecuentes/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/preguntas");
  });

  it("renderiza los servicios principales", () => {
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    expect(screen.getByText("EXÁMENES")).toBeInTheDocument();
    expect(screen.getByText("CIRUGÍAS")).toBeInTheDocument();
    expect(screen.getByText("CONVENIOS")).toBeInTheDocument();
    expect(screen.getByText("HORARIOS")).toBeInTheDocument();
  });
});