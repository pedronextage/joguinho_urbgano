import "./vitoria2.css";

import FundoVitoria from "./assets/fundoVitoria.png";
import AgathaVitoria from "./assets/agathaVitoria.png";
import Policiais from "./assets/policiaisVitoria.png";

export default function Vitoria2() {
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


        <img
          src={AgathaVitoria}
          alt="Agatha comemorando a vitória"
          className="agatha-vitoria"
          draggable={false}
        />

        <img
          src={Policiais}
          alt="Policiais comemorando"
          className="policiais-vitoria"
          draggable={false}
        />
      </div>
    </main>
  );
}