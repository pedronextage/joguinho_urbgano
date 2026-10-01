import React from "react";
import { useNavigate } from "react-router-dom";
import "./briga.css";

import BrigaImagem from "./assets/briga.png";

export default function Briga() {
  const navigate = useNavigate();

  function comecarNovamente() {
    navigate("/jogo");
  }

  return (
    <div className="briga-container">
      <img
        src={BrigaImagem}
        alt="Tela de briga"
        className="briga-imagem"
      />

      <button
        className="briga-botao"
        onClick={comecarNovamente}
      >
        COMEÇAR NOVAMENTE
      </button>
    </div>
  );
}