import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fundo from "./assets/fundo.png";
import Jonas from "./assets/Jonas.png";
import agatha from "./assets/agatha.png";
import "./escolher_personagem.css";

const PERSONAGENS = [
  {
    id: "jonas",
    nome: "Jonas",
    imagem: Jonas,
    frase: "Sempre pronto pra a próxima aula.",
  },
  {
    id: "agatha",
    nome: "Agatha",
    imagem: agatha,
    frase: "Curiosa, rápida e cheia de energia.",
  },
];

function EscolherPersonagem() {
  const [selecionadoId, setSelecionadoId] = useState(PERSONAGENS[0].id);
  const navigate = useNavigate();

  const mudarSelecao = useCallback((direcao) => {
    setSelecionadoId((atual) => {
      const idx = PERSONAGENS.findIndex((p) => p.id === atual);
      const proximo = (idx + direcao + PERSONAGENS.length) % PERSONAGENS.length;
      return PERSONAGENS[proximo].id;
    });
  }, []);

  const confirmar = useCallback(() => {
    const personagem = PERSONAGENS.find((p) => p.id === selecionadoId);
    localStorage.setItem("personagem", personagem.nome);
    navigate("/historia");
  }, [selecionadoId, navigate]);

  useEffect(() => {
    const aoApertarTecla = (e) => {
      if (e.key === "ArrowRight" || e.key === "d") mudarSelecao(1);
      if (e.key === "ArrowLeft" || e.key === "a") mudarSelecao(-1);
      if (e.key === "Enter") confirmar();
    };
    window.addEventListener("keydown", aoApertarTecla);
    return () => window.removeEventListener("keydown", aoApertarTecla);
  }, [mudarSelecao, confirmar]);

  return (
    <div className="cs-root" style={{ backgroundImage: `url(${fundo})` }}>
      <h1 className="cs-title">Escolha seu personagem</h1>

      <div className="cs-stage">
        <button
          className="cs-arrow"
          aria-label="Personagem anterior"
          onClick={() => mudarSelecao(-1)}
        >
          ‹
        </button>

        {PERSONAGENS.map((personagem) => (
          <div
            key={personagem.id}
            className={`cs-card ${personagem.id === selecionadoId ? "selected" : ""}`}
            onClick={() => setSelecionadoId(personagem.id)}
          >
            <div className="cs-portrait-frame">
              <img className="cs-portrait" src={personagem.imagem} alt={personagem.nome} />
            </div>
            <div className="cs-name">{personagem.nome}</div>
            <div className="cs-tagline">{personagem.frase}</div>
          </div>
        ))}

        <button
          className="cs-arrow"
          aria-label="Próximo personagem"
          onClick={() => mudarSelecao(1)}
        >
          ›
        </button>
      </div>

      <button className="cs-confirm" onClick={confirmar}>
        Confirmar
      </button>

      <div className="cs-hint">← → para escolher · Enter para confirmar</div>
    </div>
  );
}

export default EscolherPersonagem;