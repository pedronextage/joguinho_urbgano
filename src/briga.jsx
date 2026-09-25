import React from "react";
import { useNavigate } from "react-router-dom";
import "./briga.css";
import briga from "./assets/briga.png";

function Briga() {
  const navigate = useNavigate();

  const continuar = () => {

    navigate("/jogo");
  };

  return (
    <div className="briga">

      <img
        src="/briga.png"
        alt="Trânsito seguro"
        className="briga-imagem"
      />

      <button
        className="briga-botao"
        onClick={continuar}
      >
        CONTINUAR
      </button>

    </div>
  );
}

export default Briga;