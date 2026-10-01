import "./perdeu.css";
import { useNavigate } from "react-router-dom";
import fundo from "./assets/perca.png";

function Perdeu() {
    const navigate = useNavigate();

    const personagem = localStorage.getItem("personagem");

    return (
        <div
            className="perdeu-container"
            style={{ backgroundImage: `url(${fundo})` }}
        >

            {/* PERSONAGEM ESCOLHIDO */}
            <div className="personagem-perdeu">
                {personagem === "Jonas" && (
                    <img
                        src="/src/assets/Jonas2.png"
                        alt="Jonas"
                    />
                )}

                {personagem === "Agatha" && (
                    <img
                        src="/src/assets/Agatha2.png"
                        alt="Agatha"
                    />
                )}
            </div>

            <button
                className="botao-aula"
                onClick={() => navigate("/briga")}
            >
                ▶ AULA
            </button>

        </div>
    );
}

export default Perdeu;