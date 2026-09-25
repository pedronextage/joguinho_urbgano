import "./historia.css";
import { useNavigate } from "react-router-dom";

import fundo from "./assets/historia.png";

function Historia() {

  const navigate = useNavigate();

  return (
    <div
      className="historia"
      style={{ backgroundImage: `url(${fundo})` }}
    >

      <div className="balao-fala">
        Finalmente a aula acabou e posso ir para casa!
      </div>

      <button
        className="botao-historia"
        onClick={() => navigate("/historia2")}
      >
        ▶ CONTINUAR
      </button>

    </div>
  );
}

export default Historia;