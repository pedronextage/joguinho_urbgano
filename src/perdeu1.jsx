import "./perdeu.css";
import { useNavigate } from "react-router-dom";
import perca from "./assets/perca.png";

function Perca() {
    const navigate = useNavigate();

    return (
        <div
            className="perdeu-container"
            style={{ backgroundImage: `url(${perca})` }}
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

export default Perca;