import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./jogo.css";
import Jonas from "./assets/Jonas2.png";
import Agatha from "./assets/Agatha2.png";
import Fundo1 from "./assets/fundo6.png";
import Fundo2 from "./assets/fundo2.png";
import Fundo3 from "./assets/fundo3.png";
import Fundo4 from "./assets/fundo4.png";
import Fundo5 from "./assets/fundo5.png";
import Obstaculo1 from "./assets/obstaculo1.png";
import Obstaculo2 from "./assets/obstaculo2.png";
import Obstaculo3 from "./assets/obstaculo3.png";
import Obstaculo4 from "./assets/obstaculo4.png";
import Semaforo from "./assets/semaforo.png";
import musica1 from "./assets/musica1.mp3";
import musica2 from "./assets/musica2.mp3";
import musica3 from "./assets/musica3.mp3";
import useMusicaFundoPlaylist from "./useMusicaFundoPlaylist";


const musicas = [
  musica1,
  musica2,
  musica3
];
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
  Fundo5
];
const fundosVisuais = [
  ...fundos,
  ...fundos
];
const imagensObstaculos = [
  Obstaculo1,
  Obstaculo2,
  Obstaculo3,
  Obstaculo4
];
function Jogo() {
  const navigate = useNavigate();
  useMusicaFundoPlaylist(musicas, {
    volume: 0.4,
    pausaEntreFaixas: 3000
  });
  const [personagem, setPersonagem] =
    useState(Jonas);
  const [pulando, setPulando] =
    useState(false);
  const [pontos, setPontos] =
    useState(0);
  const [vidas, setVidas] =
    useState(3);
  const [nivel, setNivel] =
    useState(1);
  const [jogoAtivo, setJogoAtivo] =
    useState(true);
  const [mostrarNivel, setMostrarNivel] =
    useState(true);
  const [mundoParado, setMundoParado] =
    useState(false);
  const [obstaculo, setObstaculo] =
    useState(null);
  const [semaforo, setSemaforo] =
    useState(false);
  const [semaforoX, setSemaforoX] =
    useState(
      window.innerWidth + 300
    );
  const [mostrarAviso, setMostrarAviso] =
    useState(false);
  const jogoAtivoRef =
    useRef(true);
  const mundoParadoRef =
    useRef(false);
  const pulandoRef =
    useRef(false);
  const invulneravelRef =
    useRef(false);
  const personagemRef =
    useRef(null);
  const obstaculoRef =
    useRef(null);
  const fundoXRef =
    useRef(0);
  const distanciaTotalRef =
    useRef(0);
  const nivelRef =
    useRef(1);
  const obstaculoAtivoRef =
    useRef(false);
  const obstaculoColidiuRef =
    useRef(false);
  const obstaculoPontuadoRef =
    useRef(false);
  const proximoObstaculoRef =
    useRef(0);
  const semaforoAtivoRef =
    useRef(false);
  const semaforoResolvidoRef =
    useRef(false);
  const semaforoParouRef =
    useRef(false);
  useEffect(() => {
    const personagemSalvo =
      localStorage.getItem(
        "personagem"
      );
    if (
      personagemSalvo === "agatha"
    ) {
      setPersonagem(Agatha);
    }
    if (
      personagemSalvo === "jonas"
    ) {
      setPersonagem(Jonas);
    }
  }, []);

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setMostrarNivel(false);
      }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const calcularVelocidade = () => {
    const velocidadeInicial = 3;
    const aceleracao = 0.0006;
    const velocidade =
      velocidadeInicial +
      distanciaTotalRef.current *
      aceleracao;
    return Math.min(
      velocidade,
      7
    );
  };


  const perderVida = () => {
    if (
      !jogoAtivoRef.current
    ) {
      return;
    }

    if (
      invulneravelRef.current
    ) {
      return;
    }
    invulneravelRef.current =
      true;
    setVidas((vidaAtual) => {
      const novaVida =
        vidaAtual - 1;
      if (
        novaVida <= 0
      ) {

        jogoAtivoRef.current =
          false;

        setJogoAtivo(false);
        setTimeout(() => {
          navigate("/perdeu");
        }, 300);
        return 0;
      }
      return novaVida;
    });
    setTimeout(() => {
      invulneravelRef.current =
        false;
    }, 800);
  };
  useEffect(() => {
    if (
      pontos >= 300 &&
      jogoAtivoRef.current
    ) {
      jogoAtivoRef.current =
        false;
      setJogoAtivo(false);
      navigate("/vitoria");
    }
  }, [
    pontos,
    navigate
  ]);
  const pular = () => {
    if (
      !jogoAtivoRef.current
    ) {
      return;
    }
    if (
      mundoParadoRef.current
    ) {
      return;
    }
    if (
      pulandoRef.current
    ) {
      return;

    }
    pulandoRef.current =
      true;
    setPulando(true);
    setTimeout(() => {
      pulandoRef.current =
        false;
      setPulando(false);
    }, 650);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        !jogoAtivoRef.current
      ) {
        return;
      }
      if (
        event.code === "Space"
      ) {
        event.preventDefault();
        pular();
      }
      if (
        event.code === "Enter"
      ) {
        event.preventDefault();
        if (
          semaforoAtivoRef.current &&
          mundoParadoRef.current &&
          !semaforoResolvidoRef.current
        ) {
          semaforoResolvidoRef.current =
            true;
          semaforoParouRef.current =
            false;
          mundoParadoRef.current =
            false;
          setMundoParado(false);
          setMostrarAviso(false);
          setPontos(
            valor => valor + 10
          );
        }
      }
    };
    window.addEventListener(
      "keydown",
      handleKeyDown
    );
    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);
  useEffect(() => {
    if (!jogoAtivo) {
      return;
    }
    let frame;
    const atualizarJogo = () => {
      if (
        !jogoAtivoRef.current
      ) {
        return;

      }
      if (
        !mundoParadoRef.current
      ) {
        const largura =
          window.innerWidth;
        const velocidade =
          calcularVelocidade();
        distanciaTotalRef.current +=
          velocidade;
        fundoXRef.current -=
          velocidade;
        const larguraTotal =
          fundos.length *
          largura;
        if (
          Math.abs(
            fundoXRef.current
          ) >= larguraTotal
        ) {

          fundoXRef.current +=
            larguraTotal;

        }


        const cenarios =
          document.querySelector(
            ".cenarios"
          );


        if (cenarios) {

          cenarios.style.transform =
            `translate3d(${fundoXRef.current}px, 0, 0)`;

        }




        const novoNivel =
          Math.floor(
            distanciaTotalRef.current /
            (largura * 2)
          ) + 1;


        if (
          novoNivel >
          nivelRef.current
        ) {

          nivelRef.current =
            novoNivel;


          setNivel(
            novoNivel
          );


          setMostrarNivel(
            true
          );


          setTimeout(() => {

            setMostrarNivel(
              false
            );

          }, 1800);

        }




        if (
          obstaculoAtivoRef.current
        ) {

          setObstaculo(
            atual => {

              if (!atual) {

                return atual;

              }


              return {

                ...atual,

                x:
                  atual.x -
                  velocidade

              };

            }
          );

        }




        if (
          semaforoAtivoRef.current
        ) {

          setSemaforoX(
            x =>
              x - velocidade
          );

        }

      }


      frame =
        requestAnimationFrame(
          atualizarJogo
        );

    };


    frame =
      requestAnimationFrame(
        atualizarJogo
      );


    return () => {

      cancelAnimationFrame(
        frame
      );

    };

  }, [jogoAtivo]);




  useEffect(() => {

    if (!jogoAtivo) {

      return;

    }


    let timeout;


    const criarObstaculo =
      () => {

        if (
          !jogoAtivoRef.current
        ) {

          return;

        }


        if (
          mundoParadoRef.current
        ) {

          timeout =
            setTimeout(
              criarObstaculo,
              400
            );

          return;

        }




        if (
          obstaculoAtivoRef.current
        ) {

          timeout =
            setTimeout(
              criarObstaculo,
              300
            );

          return;

        }




        const indice =
          proximoObstaculoRef.current;


        const imagem =
          imagensObstaculos[
          indice
          ];




        proximoObstaculoRef.current =
          (
            indice + 1
          ) %
          imagensObstaculos.length;



        obstaculoAtivoRef.current =
          true;

        obstaculoColidiuRef.current =
          false;

        obstaculoPontuadoRef.current =
          false;




        setObstaculo({

          imagem: imagem,

          x:
            window.innerWidth + 180

        });




        const dificuldade =
          Math.min(
            distanciaTotalRef.current /
            12000,
            1
          );


        const intervalo =
          1800 -
          (
            1800 -
            850
          ) *
          dificuldade;


        timeout =
          setTimeout(
            criarObstaculo,
            intervalo
          );

      };


    timeout =
      setTimeout(
        criarObstaculo,
        1200
      );


    return () => {

      clearTimeout(
        timeout
      );

    };

  }, [jogoAtivo, obstaculo]);



  useEffect(() => {

    if (!jogoAtivo) {

      return;

    }


    let frame;


    const verificarColisao =
      () => {

        if (
          !jogoAtivoRef.current
        ) {

          return;

        }


        if (
          mundoParadoRef.current
        ) {

          frame =
            requestAnimationFrame(
              verificarColisao
            );

          return;

        }


        if (
          !obstaculoAtivoRef.current
        ) {

          frame =
            requestAnimationFrame(
              verificarColisao
            );

          return;

        }


        const personagemElemento =
          personagemRef.current;

        const obstaculoElemento =
          obstaculoRef.current;


        if (
          !personagemElemento ||
          !obstaculoElemento
        ) {

          frame =
            requestAnimationFrame(
              verificarColisao
            );

          return;

        }



        if (
          pulandoRef.current
        ) {

          frame =
            requestAnimationFrame(
              verificarColisao
            );

          return;

        }


        const personagemRect =
          personagemElemento
            .getBoundingClientRect();


        const obstaculoRect =
          obstaculoElemento
            .getBoundingClientRect();




        const margemPersonagem =
          10;

        const margemObstaculo =
          5;


        const personagemLeft =
          personagemRect.left +
          margemPersonagem;

        const personagemRight =
          personagemRect.right -
          margemPersonagem;

        const personagemTop =
          personagemRect.top +
          margemPersonagem;

        const personagemBottom =
          personagemRect.bottom -
          margemPersonagem;


        const obstaculoLeft =
          obstaculoRect.left +
          margemObstaculo;

        const obstaculoRight =
          obstaculoRect.right -
          margemObstaculo;

        const obstaculoTop =
          obstaculoRect.top +
          margemObstaculo;

        const obstaculoBottom =
          obstaculoRect.bottom -
          margemObstaculo;



        const bateu =
          personagemLeft <
          obstaculoRight &&
          personagemRight >
          obstaculoLeft &&
          personagemTop <
          obstaculoBottom &&
          personagemBottom >
          obstaculoTop;


        if (
          bateu &&
          !obstaculoColidiuRef.current
        ) {

          obstaculoColidiuRef.current =
            true;

          obstaculoAtivoRef.current =
            false;


          setObstaculo(
            null
          );


          perderVida();

        }



        if (
          obstaculoRect.right <
          personagemRect.left &&
          !obstaculoPontuadoRef.current
        ) {

          obstaculoPontuadoRef.current =
            true;


          setPontos(
            valor =>
              valor + 10
          );

        }




        if (
          obstaculoRect.right <
          -100
        ) {

          obstaculoAtivoRef.current =
            false;

          obstaculoColidiuRef.current =
            false;

          obstaculoPontuadoRef.current =
            false;


          setObstaculo(
            null
          );

        }


        frame =
          requestAnimationFrame(
            verificarColisao
          );

      };


    frame =
      requestAnimationFrame(
        verificarColisao
      );


    return () => {

      cancelAnimationFrame(
        frame
      );

    };

  }, [
    jogoAtivo,
    obstaculo
  ]);


  useEffect(() => {

    if (!jogoAtivo) {

      return;

    }


    const intervalo =
      setInterval(() => {

        if (
          !jogoAtivoRef.current
        ) {

          return;

        }


        if (
          semaforoAtivoRef.current
        ) {

          return;

        }



        if (
          Math.random() >
          0.30
        ) {

          return;

        }


        semaforoAtivoRef.current =
          true;

        semaforoResolvidoRef.current =
          false;

        semaforoParouRef.current =
          false;


        setSemaforo(
          true
        );


        setSemaforoX(
          window.innerWidth + 300
        );

      }, 4500);


    return () => {

      clearInterval(
        intervalo
      );

    };

  }, [jogoAtivo]);




  useEffect(() => {

    if (!jogoAtivo) {

      return;

    }


    const verificar =
      setInterval(() => {

        if (
          !semaforoAtivoRef.current
        ) {

          return;

        }


        if (
          semaforoResolvidoRef.current
        ) {

          return;

        }


        if (
          semaforoParouRef.current
        ) {

          return;

        }


        const largura =
          window.innerWidth;


        const personagemX =
          largura * 0.21;


        const distancia =
          Math.abs(
            semaforoX -
            personagemX
          );



        if (
          distancia < 90
        ) {

          semaforoParouRef.current =
            true;


          mundoParadoRef.current =
            true;


          setMundoParado(
            true
          );


          setMostrarAviso(
            true
          );

        }




        if (
          semaforoX < -180
        ) {

          semaforoAtivoRef.current =
            false;

          semaforoResolvidoRef.current =
            false;

          semaforoParouRef.current =
            false;


          setSemaforo(
            false
          );


          setMostrarAviso(
            false
          );


          perderVida();

        }

      }, 16);


    return () => {

      clearInterval(
        verificar
      );

    };

  }, [
    jogoAtivo,
    semaforoX
  ]);




  useEffect(() => {

    if (
      semaforo &&
      semaforoResolvidoRef.current &&
      semaforoX < -180
    ) {

      semaforoAtivoRef.current =
        false;

      semaforoResolvidoRef.current =
        false;

      semaforoParouRef.current =
        false;


      setSemaforo(
        false
      );

    }

  }, [
    semaforo,
    semaforoX
  ]);




  return (

    <div
      className={
        mundoParado
          ? "jogo mundo-parado"
          : "jogo"
      }
    >



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




      <div className="hud">

        <div className="pontuacao">

          ⭐ {pontos}

        </div>


        <div className="vidas">

          ❤️ {vidas}

        </div>

      </div>


      <img
        ref={personagemRef}
        src={personagem}
        alt="Personagem"
        className={
          pulando
            ? "personagem-jogo personagem-pulando"
            : "personagem-jogo"
        }
        draggable="false"
      />



      {obstaculo && (

        <img
          ref={obstaculoRef}
          src={obstaculo.imagem}
          alt="Obstáculo"
          className="obstaculo-jogo"
          style={{
            left:
              `${obstaculo.x}px`
          }}
          draggable="false"
        />

      )}

      {semaforo && (

        <img
          src={Semaforo}
          alt="Semáforo"
          className="semaforo-jogo"
          style={{
            left:
              `${semaforoX}px`
          }}
          draggable="false"
        />

      )}

      {mostrarAviso && (

        <div className="aviso-semaforo">

          🚦

          <br />

          PRESSIONE ENTER

          <br />

          PARA CONTINUAR

        </div>

      )}

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