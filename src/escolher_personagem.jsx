
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import fundo from "./assets/fundo.png";
import Jonas from "./assets/Jonas.png";
import Agatha from "./assets/agatha.png";

import "./escolher_personagem.css";

const PERSONAGENS = [
  {
    id: "jonas",
    nome: "Jonas",
    imagem: Jonas,
    frase: "Sempre pronto pra próxima aula.",
  },
  {
    id: "agatha",
    nome: "Agatha",
    imagem: Agatha,
    frase: "Curiosa, rápida e cheia de energia.",
  },
];

function EscolherPersonagem() {
  const navigate = useNavigate();

  const [selecionadoId, setSelecionadoId] = useState("jonas");

  // Troca o personagem usando as setas
  const mudarSelecao = useCallback((direcao) => {
    setSelecionadoId((atual) => {
      const indiceAtual = PERSONAGENS.findIndex(
        (personagem) => personagem.id === atual
      );

      const novoIndice =
        (indiceAtual + direcao + PERSONAGENS.length) %
        PERSONAGENS.length;

      return PERSONAGENS[novoIndice].id;
    });
  }, []);

  // Confirma o personagem escolhido
  const confirmar = useCallback(() => {
    const personagemEscolhido = PERSONAGENS.find(
      (personagem) => personagem.id === selecionadoId
    );

    if (!personagemEscolhido) {
      return;
    }

    // IMPORTANTE:
    // Salva "jonas" ou "agatha", exatamente como o jogo espera.
    localStorage.setItem(
      "personagem",
      personagemEscolhido.id
    );

    navigate("/historia");
  }, [selecionadoId, navigate]);

  // Teclado
  useEffect(() => {
    const aoApertarTecla = (event) => {
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        event.preventDefault();
        mudarSelecao(1);
      }

      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        event.preventDefault();
        mudarSelecao(-1);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        confirmar();
      }
    };

    window.addEventListener("keydown", aoApertarTecla);

    return () => {
      window.removeEventListener("keydown", aoApertarTecla);
    };
  }, [mudarSelecao, confirmar]);

  return (
    <div
      className="cs-root"
      style={{
        backgroundImage: `url(${fundo})`,
      }}
    >
      <h1 className="cs-title">
        Escolha seu personagem
      </h1>

      <div className="cs-stage">

        {/* PERSONAGEM ANTERIOR */}
        <button
          className="cs-arrow"
          aria-label="Personagem anterior"
          onClick={() => mudarSelecao(-1)}
        >
          ‹
        </button>

        {/* PERSONAGENS */}
        {PERSONAGENS.map((personagem) => {
          const selecionado =
            personagem.id === selecionadoId;

          return (
            <div
              key={personagem.id}
              className={
                selecionado
                  ? "cs-card selected"
                  : "cs-card"
              }
              onClick={() =>
                setSelecionadoId(personagem.id)
              }
            >
              <div className="cs-portrait-frame">
                <img
                  className="cs-portrait"
                  src={personagem.imagem}
                  alt={personagem.nome}
                  draggable="false"
                />
              </div>

              <div className="cs-name">
                {personagem.nome}
              </div>

              <div className="cs-tagline">
                {personagem.frase}
              </div>

              {selecionado && (
                <div className="cs-selected">
                  SELECIONADO
                </div>
              )}
            </div>
          );
        })}

        {/* PRÓXIMO PERSONAGEM */}
        <button
          className="cs-arrow"
          aria-label="Próximo personagem"
          onClick={() => mudarSelecao(1)}
        >
          ›
        </button>
      </div>

      {/* CONFIRMAR */}
      <button
        className="cs-confirm"
        onClick={confirmar}
      >
        CONFIRMAR
      </button>

      <div className="cs-hint">
        ← → para escolher · Enter para confirmar
      </div>
    </div>
  );
}

export default EscolherPersonagem;



