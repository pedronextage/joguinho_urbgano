import { useEffect, useRef } from "react";

function useMusicaFundoPlaylist(
  faixas,
  { volume = 0.5, pausaEntreFaixas = 3000 } = {}
) {
  const audioRef = useRef(null);
  const indiceRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    console.log("🎵 EFEITO MONTOU (isso deveria aparecer só 1 vez)");

    if (!faixas || faixas.length === 0) return;

    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    let cancelado = false;

    function tocarFaixaAtual() {
      if (cancelado) return;

      console.log(
        "▶️ tocando faixa",
        indiceRef.current,
        faixas[indiceRef.current]
      );

      audio.src = faixas[indiceRef.current];

      audio.play().catch((erro) => {
        console.log("⚠️ autoplay bloqueado:", erro.message);
      });
    }

    function aoTerminar() {
      console.log(
        "⏹️ faixa terminou naturalmente (evento 'ended' disparou)"
      );

      if (cancelado) return;

      timeoutRef.current = setTimeout(() => {
        if (cancelado) return;

        indiceRef.current = (indiceRef.current + 1) % faixas.length;

        tocarFaixaAtual();
      }, pausaEntreFaixas);
    }

    audio.addEventListener("ended", aoTerminar);

    tocarFaixaAtual();

    return () => {
      console.log("🧹 EFEITO DESMONTOU (limpeza / cleanup rodou)");

      cancelado = true;
      clearTimeout(timeoutRef.current);
      audio.removeEventListener("ended", aoTerminar);
      audio.pause();
      audio.currentTime = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faixas, volume, pausaEntreFaixas]);

  return audioRef;
}

export default useMusicaFundoPlaylist;