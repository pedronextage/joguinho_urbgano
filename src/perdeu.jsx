import "./perdeu.css";
import { useNavigate } from "react-router-dom";

import fundo from "./assets/perca.png";

function Perdeu() {
    const navigate = useNavigate();

    return (
        <div
            className="perdeu-container"
            style={{ backgroundImage: `url(${fundo})` }}
        >
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