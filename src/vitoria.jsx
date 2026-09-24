import "./vitoria.css";

import FundoVitoria from "./assets/fundoVitoria.png";
import JonasVitoria from "./assets/jonasVitoria.png";
import Policiais from "./assets/policiaisVitoria.png";

export default function Vitoria() {
  return (
    <main className="tela-vitoria">
      <div className="palco">
        {/* Fundo */}
        <img
          src={FundoVitoria}
          alt=""
          className="fundo-vitoria"
          draggable={false}
        />

        {/* Jonas no centro, em cima do pódio */}
        <img
          src={JonasVitoria}
          alt="Jonas comemorando a vitória"
          className="jonas-vitoria"
          draggable={false}
        />
      </div>
    </main>
  );
}