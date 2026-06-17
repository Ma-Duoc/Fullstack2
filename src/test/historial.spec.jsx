import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Historial from "../pages/Historial";
import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: "/historial",
    }),
  };
});

describe("Historial - pruebas unitarias básicas", () => {

  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem("rut", "12345678-9");

    mockNavigate.mockClear();

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              examen: "Hemograma",
              fechaCreacion: "2026-06-15T10:00:00",
            },
          ]),
      })
    );
  });

  it("renderiza el título Exámenes", async () => {
    render(
      <MemoryRouter>
        <Historial />
      </MemoryRouter>
    );

    expect(screen.getByText(/Exámenes/i)).toBeInTheDocument();
  });

  it("carga exámenes desde la API", async () => {
    render(
      <MemoryRouter>
        <Historial />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Hemograma")).toBeInTheDocument();
    });
  });

  it("muestra el filtro de estado", () => {
    render(
      <MemoryRouter>
        <Historial />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("combobox")
    ).toBeInTheDocument();
  });

  it("permite seleccionar un filtro", () => {
    render(
      <MemoryRouter>
        <Historial />
      </MemoryRouter>
    );

    const filtro = screen.getByRole("combobox");

    fireEvent.change(filtro, {
      target: { value: "disponible" },
    });

    expect(filtro.value).toBe("disponible");
  });

  it("navega a dashboard", () => {
    render(
      <MemoryRouter>
        <Historial />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Inicio/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("navega a citas", () => {
    render(
      <MemoryRouter>
        <Historial />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Citas/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/citas");
  });

  it("cierra sesión y vuelve a inicio", () => {
    render(
      <MemoryRouter>
        <Historial />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Cerrar Sesión/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/inicio");
  });
});