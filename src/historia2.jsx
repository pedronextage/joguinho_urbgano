import "./historia2.css";
import { useNavigate } from "react-router-dom";

import fundo from "./assets/historia2.png";

function Historia2() {

  const navigate = useNavigate();

  return (
    <div
      className="historia2"
      style={{ backgroundImage: `url(${fundo})` }}
    >

      <div className="balao-fala">
        Mas ei rapaizinho, não esqueça de respeitar as regras do trânsito hein!
      </div>

      <button
        className="botao-historia"
        onClick={() => navigate("/jogo")}
      >
        ▶ SEGUIR JOGO
      </button>

    </div>
  );
}

export default Historia2;