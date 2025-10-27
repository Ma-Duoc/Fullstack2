import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/estilos.css";

export default function PreguntasFrecuentes() {
  const navigate = useNavigate();

  const faqs = [
    { id: 1, pregunta: "¿Cómo agendo una cita médica?", respuesta: "Solo debes ingresar con tu rut y contraseña, seleccionar citas, fecha, hora y especialidad." },
    { id: 2, pregunta: "¿Necesito estar registrado?", respuesta: "Sí, es necesario estar registrado en MEDICTIME." },
    { id: 3, pregunta: "¿Qué especialidades están disponibles?", respuesta: "Ofrecemos medicina general, pediatría, ginecología, cardiología, traumatología, entre otras." },
    { id: 4, pregunta: "¿Puedo cancelar o modificar una cita?", respuesta: "Sí, desde tu perfil puedes modificar o cancelar tu cita con al menos 24 horas de anticipación." },
    { id: 5, pregunta: "¿Cómo sé si mi cita quedó registrada?", respuesta: "Recibirás un correo de confirmación y aparecerá en tu panel de usuario." },
    { id: 6, pregunta: "¿Puedo usar MEDICTIME desde el celular?", respuesta: "Sí. Nuestra plataforma está optimizada para celulares, tablets y computadoras." },
    { id: 7, pregunta: "¿Qué pasa si llego tarde a mi cita?", respuesta: "Si llegas con más de 10 minutos de retraso, tu cita podría ser reprogramada por el centro médico." },
    { id: 8, pregunta: "¿Mis datos están seguros en la plataforma?", respuesta: "Sí. Utilizamos protocolos de seguridad avanzados y cifrado de datos." },
    { id: 9, pregunta: "¿Qué hago si olvidé mi contraseña?", respuesta: "Puedes hacer clic en '¿Olvidaste tu contraseña?' en la página de inicio de sesión y seguir los pasos." },
  ];

  return (
    <>
      <main style={{ minHeight: "100vh", paddingTop: "40px" }}>

        <div className="d-flex justify-content-center">
          <section className="text-center my-5" style={{ width: "90%", maxWidth: "900px" }} id="faq-section">
            <img src="https://i.imgur.com/100lvlZ.png" alt="Logo MEDICTIME" style={{ height: "60px" }} />
            <h2 className="mt-3 fw-bold">Preguntas Frecuentes</h2>
            <p className="text-muted col-md-8 mx-auto">
              Aquí respondemos las dudas más comunes sobre nuestro sistema de agendamiento médico en línea. ¡Agendar nunca fue tan fácil!
            </p>

            <h4 className="text-success mb-4">Sobre el agendamiento en línea</h4>

            <div className="accordion accordion-flush" id="faqAccordion">
              {faqs.map((faq) => (
                <div className="accordion-item" key={faq.id}>
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${faq.id}`}>
                      {faq.pregunta}
                    </button>
                  </h2>
                  <div id={`collapse${faq.id}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">{faq.respuesta}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-5">
              <button onClick={() => navigate("/inicio")} className="btn btn-outline-primary btn-lg px-4">
                Volver al Inicio
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-2">&copy; 2025 MEDICTIME | Mejorando la salud de Chile desde 1972</p>
        <small>📧 contacto@medictime.cl | ☎ +56 2 2345 6789</small>
      </footer>
    </>
  );
}


