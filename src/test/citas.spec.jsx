import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Citas from "../pages/Citas";
import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: "/citas",
    }),
  };
});

describe("Citas - pruebas unitarias básicas", () => {
  beforeEach(() => {
    sessionStorage.clear();

    sessionStorage.setItem("rut", "12345678-9");
    sessionStorage.setItem("nombre", "Marco");
    sessionStorage.setItem("apellido", "Perez");

    mockNavigate.mockClear();

    global.fetch = vi.fn((url) => {
      if (url.includes("/api/medicos")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                id: 1,
                nombre: "Juan",
                apellido: "Perez",
                especialidad: "Cardiología",
              },
            ]),
        });
      }

      if (url.includes("/api/salas")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                id: 1,
                nombre: "Sala 1",
                tipo: "Consulta",
              },
            ]),
        });
      }

      if (url.includes("/api/citas/usuario")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                id: 1,
                fechaHora: "2026-12-31T10:00:00",
                medicoNombre: "Juan Perez",
                especialidad: "Cardiología",
                salaNombre: "Sala 1",
                estado: "PROGRAMADA",
              },
            ]),
        });
      }

      return Promise.resolve({
        json: () => Promise.resolve([]),
      });
    });
  });

  it("renderiza el título Gestión de Citas", () => {
    render(
      <MemoryRouter>
        <Citas />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Gestión de Citas/i)
    ).toBeInTheDocument();
  });

  it("carga las citas del paciente", async () => {
    render(
      <MemoryRouter>
        <Citas />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("PROGRAMADA")
      ).toBeInTheDocument();
    });
  });

  it("muestra formulario para agendar cita", () => {
    render(
      <MemoryRouter>
        <Citas />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Fecha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hora/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Médico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sala/i)).toBeInTheDocument();
  });

  it("permite escribir el motivo de la cita", () => {
    render(
      <MemoryRouter>
        <Citas />
      </MemoryRouter>
    );

    const motivo = screen.getByLabelText(/Motivo de la cita/i);

    fireEvent.change(motivo, {
      target: {
        value: "Control médico",
      },
    });

    expect(motivo.value).toBe("Control médico");
  });

  it("navega a dashboard", () => {
    render(
      <MemoryRouter>
        <Citas />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Inicio/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("navega a historial", () => {
    render(
      <MemoryRouter>
        <Citas />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Historial/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/historial");
  });

  it("cierra sesión correctamente", () => {
    render(
      <MemoryRouter>
        <Citas />
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