import { useNavigate } from "react-router-dom";
import fundo from "./assets/fundo.png";
import logo from "./assets/logo.png";
import "./inicio.css";

function Inicio() {
  const navigate = useNavigate();

  return (
    <div
      className="inicio"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <img src={logo} alt="Logo do jogo" className="logo" />

      <button
        className="botao-iniciar"
        onClick={() => navigate("/escolher-personagem")}
      >
        INICIAR
      </button>
    </div>
  );
}

export default Inicio;