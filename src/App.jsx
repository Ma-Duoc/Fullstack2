// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./inicio";
import OtraPagina from "./preguntas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/otra" element={<OtraPagina />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
