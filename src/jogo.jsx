import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./jogo.css";

// ==========================================
// PERSONAGENS
// ==========================================

import Jonas from "./assets/Jonas2.png";
import Agatha from "./assets/Agatha2.png";

// ==========================================
// FUNDOS
// ==========================================

import Fundo1 from "./assets/fundo6.png";
import Fundo2 from "./assets/fundo2.png";
import Fundo3 from "./assets/fundo3.png";
import Fundo4 from "./assets/fundo4.png";
import Fundo5 from "./assets/fundo5.png";

// ==========================================
// OBSTÁCULOS
// ==========================================

import Obstaculo1 from "./assets/obstaculo1.png";
import Obstaculo2 from "./assets/obstaculo2.png";

// ==========================================
// SEMÁFORO
// ==========================================

import Semaforo from "./assets/semaforo.png";


// ======================================================
// CADA FUNDO APARECE DUAS VEZES
// ======================================================

const fundos = [
  Fundo1,
  Fundo1,

  Fundo2,
  Fundo2,

  Fundo3,
  Fundo3,

  Fundo4,
  Fundo4,

  Fundo5,
  Fundo5,
];


// ======================================================
// DUPLICAMOS A SEQUÊNCIA
//
// Isso é o que permite o fundo andar infinitamente
// sem aparecer aquele "pulo" quando chega ao final.
//
// 1 1 2 2 3 3 4 4 5 5
// 1 1 2 2 3 3 4 4 5 5
// ======================================================

const fundosVisuais = [
  ...fundos,
  ...fundos,
];


function Jogo() {

  const navigate = useNavigate();


  // ======================================================
  // ESTADOS
  // ======================================================

  const [personagem, setPersonagem] = useState(Jonas);

  const [pulando, setPulando] = useState(false);

  const [pontos, setPontos] = useState(0);

  const [vidas, setVidas] = useState(3);

  const [nivel, setNivel] = useState(1);

  const [jogoAtivo, setJogoAtivo] = useState(true);

  const [mostrarNivel, setMostrarNivel] = useState(true);

  // Obstáculo
  const [obstaculo, setObstaculo] = useState(null);
  const [obstaculoX, setObstaculoX] = useState(110);

  // Semáforo
  const [semaforo, setSemaforo] = useState(null);
  const [semaforoX, setSemaforoX] = useState(110);
  const [mostrarAviso, setMostrarAviso] = useState(false);


  // ======================================================
  // REFS
  // ======================================================

  const jogoAtivoRef = useRef(true);

  const pulandoRef = useRef(false);

  // ------------------------------------------
  // FUNDO
  // ------------------------------------------

  const fundoXRef = useRef(0);

  // Distância total percorrida.
  // Nunca volta para zero.
  const distanciaTotalRef = useRef(0);

  // Guarda qual par já foi completado.
  const parAtualRef = useRef(0);

  // ------------------------------------------
  // NÍVEL
  // ------------------------------------------

  const nivelRef = useRef(1);

  // ------------------------------------------
  // OBSTÁCULO
  // ------------------------------------------

  const obstaculoAtivoRef = useRef(false);

  const obstaculoColidiuRef = useRef(false);

  // ------------------------------------------
  // SEMÁFORO
  // ------------------------------------------

  const semaforoAtivoRef = useRef(false);

  const semaforoResolvidoRef = useRef(false);

  // ------------------------------------------
  // VIDA
  // ------------------------------------------

  const invulneravelRef = useRef(false);


  // ======================================================
  // PERSONAGEM
  // ======================================================

  useEffect(() => {

    const salvo = localStorage.getItem("personagem");

    if (salvo === "agatha") {
      setPersonagem(Agatha);
    }

    if (salvo === "jonas") {
      setPersonagem(Jonas);
    }

  }, []);


  // ======================================================
  // AVISO INICIAL
  // ======================================================

  useEffect(() => {

    const timer = setTimeout(() => {

      setMostrarNivel(false);

    }, 2000);

    return () => clearTimeout(timer);

  }, []);


  // ======================================================
  // PERDER VIDA
  // ======================================================

  const perderVida = () => {

    if (!jogoAtivoRef.current) {
      return;
    }

    if (invulneravelRef.current) {
      return;
    }

    invulneravelRef.current = true;


    setVidas((vidaAtual) => {

      const novaVida = vidaAtual - 1;


      // ==============================================
      // ACABARAM AS VIDAS
      // ==============================================

      if (novaVida <= 0) {

        jogoAtivoRef.current = false;

        setJogoAtivo(false);


        setTimeout(() => {

          navigate("/briga");

        }, 300);


        return 0;
      }


      return novaVida;

    });


    // Pequeno período de proteção
    setTimeout(() => {

      invulneravelRef.current = false;

    }, 700);

  };


  // ======================================================
  // VITÓRIA
  // ======================================================

  useEffect(() => {

    if (
      pontos >= 300 &&
      jogoAtivoRef.current
    ) {

      jogoAtivoRef.current = false;

      setJogoAtivo(false);

      navigate("/vitoria");

    }

  }, [pontos, navigate]);


  // ======================================================
  // PULO
  // ======================================================

  const pular = () => {

    if (!jogoAtivoRef.current) {
      return;
    }

    if (pulandoRef.current) {
      return;
    }

    pulandoRef.current = true;

    setPulando(true);


    setTimeout(() => {

      pulandoRef.current = false;

      setPulando(false);

    }, 700);

  };


  // ======================================================
  // TECLADO
  // ======================================================

  useEffect(() => {

    const tecla = (event) => {

      if (!jogoAtivoRef.current) {
        return;
      }


      // ------------------------------------------
      // ESPAÇO = PULAR
      // ------------------------------------------

      if (event.code === "Space") {

        event.preventDefault();

        pular();

      }


      // ------------------------------------------
      // ENTER = SEMÁFORO
      // ------------------------------------------

      if (event.code === "Enter") {

        event.preventDefault();


        if (
          semaforoAtivoRef.current &&
          !semaforoResolvidoRef.current
        ) {

          const x = semaforoX;


          // Zona correta
          if (
            x >= 15 &&
            x <= 30
          ) {

            semaforoResolvidoRef.current = true;

            setPontos(
              (valor) => valor + 10
            );

            setMostrarAviso(false);


            setTimeout(() => {

              semaforoAtivoRef.current = false;

              semaforoResolvidoRef.current = false;

              setSemaforo(null);

              setSemaforoX(110);

            }, 700);

          }

        }

      }

    };


    window.addEventListener(
      "keydown",
      tecla
    );


    return () => {

      window.removeEventListener(
        "keydown",
        tecla
      );

    };

  }, [semaforoX]);


  // ======================================================
  // MOVIMENTO DO FUNDO
  // ======================================================

  useEffect(() => {

    if (!jogoAtivo) {
      return;
    }


    let animationFrame;


    const moverCenario = () => {

      if (!jogoAtivoRef.current) {
        return;
      }


      const largura =
        window.innerWidth;


      // ==================================================
      // VELOCIDADE
      //
      // Conforme o nível aumenta,
      // o cenário fica um pouco mais rápido.
      // ==================================================

      const velocidadeBase = 3;

      const velocidadeExtra =
        (nivelRef.current - 1) * 0.35;

      const velocidade =
        velocidadeBase + velocidadeExtra;


      // ==================================================
      // MOVIMENTO
      // ==================================================

      const novaPosicao =
        fundoXRef.current - velocidade;


      fundoXRef.current =
        novaPosicao;


      distanciaTotalRef.current +=
        velocidade;


      // ==================================================
      // QUANDO TERMINA UM PAR
      //
      // Cada fundo ocupa uma tela.
      //
      // Dois fundos = 2 × largura da tela.
      //
      // Portanto:
      //
      // 0 → 2 telas = nível 2
      // 2 → 4 telas = nível 3
      // 4 → 6 telas = nível 4
      // ==================================================

      const distanciaPorPar =
        largura * 2;


      const parAtual =
        Math.floor(
          distanciaTotalRef.current /
          distanciaPorPar
        );


      if (
        parAtual > parAtualRef.current
      ) {

        parAtualRef.current =
          parAtual;


        const novoNivel =
          parAtual + 1;


        nivelRef.current =
          novoNivel;


        setTimeout(() => {

          if (!jogoAtivoRef.current) {
            return;
          }

          setNivel(novoNivel);

          setMostrarNivel(true);


          setTimeout(() => {

            setMostrarNivel(false);

          }, 1800);

        }, 1000);

      }


      // ==================================================
      // LOOP INFINITO
      //
      // Temos duas sequências iguais:
      //
      // [A B C] [A B C]
      //
      // Quando a primeira termina,
      // retiramos exatamente o tamanho dela.
      //
      // Visualmente o jogador não percebe.
      // ==================================================

      const larguraSequencia =
        fundos.length * largura;


      if (
        Math.abs(novaPosicao) >=
        larguraSequencia
      ) {

        fundoXRef.current =
          novaPosicao +
          larguraSequencia;

      }


      // ==================================================
      // APLICA O MOVIMENTO
      // ==================================================

      const cenarios =
        document.querySelector(
          ".cenarios"
        );


      if (cenarios) {

        cenarios.style.transform =
          `translate3d(${fundoXRef.current}px, 0, 0)`;

      }


      animationFrame =
        requestAnimationFrame(
          moverCenario
        );

    };


    animationFrame =
      requestAnimationFrame(
        moverCenario
      );


    return () => {

      cancelAnimationFrame(
        animationFrame
      );

    };

  }, [jogoAtivo]);


  // ======================================================
  // CRIAR OBSTÁCULO
  // ======================================================

  useEffect(() => {

    if (!jogoAtivo) {
      return;
    }


    const intervalo =
      setInterval(() => {

        if (!jogoAtivoRef.current) {
          return;
        }

        if (obstaculoAtivoRef.current) {
          return;
        }


        // Não deixa obstáculos aparecerem
        // em sequência o tempo todo.

        if (
          Math.random() > 0.55
        ) {
          return;
        }


        const imagem =
          Math.random() < 0.5
            ? Obstaculo1
            : Obstaculo2;


        obstaculoAtivoRef.current =
          true;

        obstaculoColidiuRef.current =
          false;


        setObstaculo(imagem);

        setObstaculoX(110);

      }, 1700);


    return () => {

      clearInterval(intervalo);

    };

  }, [jogoAtivo]);


  // ======================================================
  // MOVIMENTO DO OBSTÁCULO
  // ======================================================

  useEffect(() => {

    if (!jogoAtivo) {
      return;
    }


    let animationFrame;


    const moverObstaculo = () => {

      if (!jogoAtivoRef.current) {
        return;
      }


      if (
        obstaculoAtivoRef.current
      ) {

        setObstaculoX((xAtual) => {


          // ==============================================
          // OBSTÁCULO FICA MAIS RÁPIDO COM O NÍVEL
          // ==============================================

          const velocidade =
            0.75 +
            (nivelRef.current - 1) * 0.08;


          const novoX =
            xAtual - velocidade;


          // ==============================================
          // SAIU DA TELA
          // ==============================================

          if (novoX < -15) {


            if (
              !obstaculoColidiuRef.current
            ) {

              setPontos(
                (valor) => valor + 10
              );

            }


            obstaculoAtivoRef.current =
              false;

            obstaculoColidiuRef.current =
              false;

            setObstaculo(null);

            return 110;

          }


          // ==============================================
          // COLISÃO
          //
          // Usamos uma área menor,
          // evitando a parte transparente da PNG.
          // ==============================================

          if (
            !pulandoRef.current &&
            !obstaculoColidiuRef.current
          ) {

            // Personagem
            const personagemLeft =
              18.8;

            const personagemRight =
              23.5;


            // Obstáculo
            const obstaculoLeft =
              novoX + 2;

            const obstaculoRight =
              novoX + 6;


            const bateu =
              personagemLeft <
                obstaculoRight &&
              personagemRight >
                obstaculoLeft;


            if (bateu) {

              obstaculoColidiuRef.current =
                true;


              obstaculoAtivoRef.current =
                false;


              setObstaculo(null);


              perderVida();


              return 110;

            }

          }


          return novoX;

        });

      }


      animationFrame =
        requestAnimationFrame(
          moverObstaculo
        );

    };


    animationFrame =
      requestAnimationFrame(
        moverObstaculo
      );


    return () => {

      cancelAnimationFrame(
        animationFrame
      );

    };

  }, [jogoAtivo]);


  // ======================================================
  // CRIAR SEMÁFORO
  // ======================================================

  useEffect(() => {

    if (!jogoAtivo) {
      return;
    }


    const intervalo =
      setInterval(() => {

        if (!jogoAtivoRef.current) {
          return;
        }

        if (semaforoAtivoRef.current) {
          return;
        }


        // Chance de aparecer
        if (
          Math.random() > 0.30
        ) {
          return;
        }


        semaforoAtivoRef.current =
          true;

        semaforoResolvidoRef.current =
          false;


        setSemaforo(Semaforo);

        setSemaforoX(110);

        setMostrarAviso(true);

      }, 4200);


    return () => {

      clearInterval(intervalo);

    };

  }, [jogoAtivo]);


  // ======================================================
  // MOVIMENTO DO SEMÁFORO
  // ======================================================

  useEffect(() => {

    if (!jogoAtivo) {
      return;
    }


    let animationFrame;


    const moverSemaforo = () => {

      if (!jogoAtivoRef.current) {
        return;
      }


      if (
        semaforoAtivoRef.current &&
        !semaforoResolvidoRef.current
      ) {

        setSemaforoX((xAtual) => {


          const velocidade =
            0.62 +
            (nivelRef.current - 1) * 0.05;


          const novoX =
            xAtual - velocidade;


          // ==============================================
          // PASSOU SEM APERTAR ENTER
          // ==============================================

          if (novoX < -15) {

            semaforoAtivoRef.current =
              false;

            semaforoResolvidoRef.current =
              false;


            setSemaforo(null);

            setMostrarAviso(false);


            perderVida();


            return 110;

          }


          return novoX;

        });

      }


      animationFrame =
        requestAnimationFrame(
          moverSemaforo
        );

    };


    animationFrame =
      requestAnimationFrame(
        moverSemaforo
      );


    return () => {

      cancelAnimationFrame(
        animationFrame
      );

    };

  }, [jogoAtivo]);


  // ======================================================
  // RENDER
  // ======================================================

  return (

    <div className="jogo">


      {/* ================================================
          CENÁRIO
      ================================================= */}

      <div className="cenarios">

        {fundosVisuais.map(
          (fundo, index) => (

            <div
              className="cenario"
              key={index}
            >

              <img
                src={fundo}
                alt=""
                className="fundo-jogo"
                draggable="false"
              />

            </div>

          )
        )}

      </div>


      {/* ================================================
          HUD
      ================================================= */}

      <div className="hud">

        <div className="pontuacao">
          ⭐ {pontos}
        </div>

        <div className="vidas">
          ❤️ {vidas}
        </div>

      </div>


      {/* ================================================
          PERSONAGEM
      ================================================= */}

      <img
        src={personagem}
        alt="Personagem"
        draggable="false"
        className={
          pulando
            ? "personagem-jogo personagem-pulando"
            : "personagem-jogo"
        }
      />


      {/* ================================================
          OBSTÁCULO
      ================================================= */}

      {obstaculo && (

        <img
          src={obstaculo}
          alt="Obstáculo"
          draggable="false"
          className="obstaculo-jogo"
          style={{
            left: `${obstaculoX}%`,
          }}
        />

      )}


      {/* ================================================
          SEMÁFORO
      ================================================= */}

      {semaforo && (

        <img
          src={semaforo}
          alt="Semáforo"
          draggable="false"
          className="semaforo-jogo"
          style={{
            left: `${semaforoX}%`,
          }}
        />

      )}


      {/* ================================================
          AVISO DO SEMÁFORO
      ================================================= */}

      {mostrarAviso && semaforo && (

        <div className="aviso-semaforo">
          PRESSIONE ENTER!
        </div>

      )}


      {/* ================================================
          NÍVEL
      ================================================= */}

      {mostrarNivel && (

        <div className="legenda-nivel">

          <div className="texto-nivel">

            NÍVEL {nivel}

          </div>

        </div>

      )}

    </div>

  );

}

export default Jogo;