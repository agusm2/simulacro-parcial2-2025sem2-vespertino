import { useContext } from "react"
import { PaisesVisitadosContext } from "../contexts/PaisesVisitadosContext"
import { useNavigate } from "react-router-dom";
import { DifficultyContext } from "../contexts/DifficultyContext";

export default function EndGame() {
    const navigate = useNavigate();

    const { visitados, resetVisitados } = useContext(PaisesVisitadosContext);
    const { setDifficulty } = useContext(DifficultyContext);

    function handleClick() {
        setDifficulty("");
        resetVisitados([]);
        navigate('/');
    }

    return (
        <div>
            <h2>Fin del juego</h2>
            <p>Usted visitó los siguientes países:</p>
            <div>
                {visitados.map((pais, index) => (
                    <button
                        key={pais?.cca3 ?? index}
                        style={{ width: 70, height: 60, marginBottom: 10, marginRight: 10 }}
                        title={pais?.cca3}
                    >
                        <img
                            src={new URL(pais.flag.svg, window.location)}
                            style={{ width: 50, height: 40, objectFit: "cover" }}
                        />
                    </button>

                ))}

            </div>
            <button onClick={() => handleClick()}>Continuar</button>
        </div>
    )
}