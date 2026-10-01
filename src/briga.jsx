import React from "react";
import { useNavigate } from "react-router-dom";
import "./briga.css";

export default function Briga() {
  const navigate = useNavigate();

  function comecarNovamente() {
    navigate("/jogo");
  }

  return (
    <div className="briga-container">
      <button
        className="briga-botao"
        onClick={comecarNovamente}
      >
        COMEÇAR NOVAMENTE
      </button>
    </div>
  );
}