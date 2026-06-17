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

describe("Registro - pruebas unitarias", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve("Registro exitoso"),
      })
    );
  });

  it("renderiza el formulario de registro", () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: /Registrarse/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/Registro/i)).toBeInTheDocument();
  });

  it("muestra error cuando el RUT es inválido", () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    const textInputs = screen.getAllByRole("textbox");

    fireEvent.change(textInputs[0], {
      target: { value: "Marco" },
    });

    fireEvent.change(textInputs[1], {
      target: { value: "Perez" },
    });

    fireEvent.change(textInputs[2], {
      target: { value: "marco@test.com" },
    });

    fireEvent.change(
      screen.getByPlaceholderText(/12345678-9/i),
      {
        target: { value: "123" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Registrarse/i,
      })
    );

    expect(
      screen.getByText(/Ingrese un RUT válido/i)
    ).toBeInTheDocument();
  });

  it("muestra error cuando las contraseñas no coinciden", () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    const passwords = document.querySelectorAll(
      'input[type="password"]'
    );

    fireEvent.change(passwords[0], {
      target: { value: "Password123" },
    });

    fireEvent.change(passwords[1], {
      target: { value: "Password456" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /Registrarse/i,
      })
    );

    expect(
      screen.getByText(/Las contraseñas no coinciden/i)
    ).toBeInTheDocument();
  });

  it("muestra mensaje de éxito cuando el registro es correcto", async () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    const textInputs = screen.getAllByRole("textbox");

    fireEvent.change(textInputs[0], {
      target: { value: "Marco" },
    });

    fireEvent.change(textInputs[1], {
      target: { value: "Perez" },
    });

    fireEvent.change(textInputs[2], {
      target: { value: "marco@test.com" },
    });

    fireEvent.change(
      document.querySelector('input[type="date"]'),
      {
        target: { value: "1990-01-01" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/12345678-9/i),
      {
        target: { value: "12345678-5" },
      }
    );

    const passwords = document.querySelectorAll(
      'input[type="password"]'
    );

    fireEvent.change(passwords[0], {
      target: { value: "Password123" },
    });

    fireEvent.change(passwords[1], {
      target: { value: "Password123" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /Registrarse/i,
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Registro exitoso/i)
      ).toBeInTheDocument();
    });
  });
});