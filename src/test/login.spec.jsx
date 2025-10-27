import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/login";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login - pruebas unitarias básicas", () => {
  it("renderiza los campos principales", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Rut/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  it("valida que el botón Ingresar esté en el documento", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: /Ingresar/i })).toBeInTheDocument();
  });

  it("muestra error si RUT inválido y se envía formulario", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Rut/i), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: "Aa123456" } });
    fireEvent.click(screen.getByRole("button", { name: /Ingresar/i }));
    expect(screen.getByText(/Ingrese un RUT válido/i)).toBeInTheDocument();
  });

  it("muestra error si contraseña débil", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Rut/i), { target: { value: "12345678-9" } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: /Ingresar/i }));
    expect(screen.getByText(/Contraseña inválida/i)).toBeInTheDocument();
  });
});

