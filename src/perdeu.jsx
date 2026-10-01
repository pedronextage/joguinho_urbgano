import "./perdeu.css";
import { useNavigate } from "react-router-dom";
import perca1 from "./assets/perca.png";

function Perca1() {
    const navigate = useNavigate();

    return (
        <div
            className="perdeu-container"
            style={{ backgroundImage: `url(${perca1})` }}
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

export default Perca1;