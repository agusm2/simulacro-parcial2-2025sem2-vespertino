import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { CantErroresContext } from "../contexts/CantErroresContext";
import { PaisesVisitadosContext } from "../contexts/PaisesVisitadosContext";

export default function Trivia() {
    const [paisesTotales, setTotales] = useState([]);
    const [paisesFronterizos, setFronterizos] = useState([]);
    const [paisActual, setPaisActual] = useState();

    const { cca3 } = useParams();
    const navigate = useNavigate();

    const { visitados, agregarVisitado } = useContext(PaisesVisitadosContext);
    const { errores, setErrores } = useContext(CantErroresContext);

    async function cargarPaises() {
        try {

            //Obtengo el país actual
            const response = await fetch(new URL(`/api/countries/${cca3}`, window.location));
            if (!response.ok) {
                throw new Error("No se pudo obtener el país actual");
            }
            const pais = await response.json();
            setPaisActual(pais);

            //Obtengo los códigos (cca3) de todos los países
            const res = await fetch(new URL("/api/countries", window.location));
            if (!res.ok) {
                throw new Error("No se pudo obtener los países");
            }
            const codigos = await res.json();

            //Copio los códigos fronterizos con pais.borders
            //[...pais.borders] copio los elementos de pais.borders en codesFronterizos
            //de esta manera creo una copia independiente de pais.borders
            const codesFronterizos = [...(pais.borders)];
            setFronterizos(codesFronterizos);

            //Creo otra copia para guardar todos los códigos que voy a mostrar
            const codesTotales = [...(codesFronterizos)];
            //Obtengo índices de manera random (y sin repetir) 
            //hasta tener 9 países para la trivia
            while (codesTotales.length < 9) {
                const indice = Math.floor(Math.random() * codigos.length);
                const codigoPais = codigos[indice];

                //Me aseguro de que no se repitan
                if (!codesTotales.includes(codigoPais)) {
                    codesTotales.push(codigoPais);
                }
            }

            //Obtengo un array con todos los detalles de todos los países
            //que voy a mostrar en la trivia
            const detalles = await Promise.all(
                codesTotales.map((codigo) =>
                    fetch(new URL(`/api/countries/${codigo}`, window.location)).then((res) => res.json())
                )
            );

            //De esta manera me aseguro que sean siempre 9
            //ya que hay países con más de 9 fronterizos (ej. Brasil)
            const detallesFinal = detalles.slice(0, 9);
            setTotales(detallesFinal)
        } catch (error) {
            console.error("Error: ", error.message);
        }
    };

    useEffect(() => {
        cargarPaises();
    }, [cca3])

    //Manejo de errores
    function opcion(pais) {
        if (!paisesFronterizos.includes(pais.cca3)) {
            setErrores(errores - 1);
        }
        agregarVisitado(pais)
        if (errores > 1) {
            navigate(`/${pais.cca3}`);
        } else {
            navigate('/end');
        }
    }

    //Si se presiona el botón de ninguno, obtengo un nuevo país aleatorio
    //que no haya sido visitado anteriormente
    function handleNone() {
        const indice = Math.floor(Math.random() * paisesTotales.length);
        const nuevoPais = paisesTotales[indice];
        if (visitados.includes(nuevoPais)) {
            agregarVisitado(nuevoPais)
            handleNone();
        } else {
            agregarVisitado(nuevoPais)
            navigate(`/${nuevoPais.cca3}`)
        }
    }

    return (
        <div>
            <h2>Flag Trivia</h2>
            <p>{paisActual?.name?.common}</p>
            <img
                src={new URL(paisActual?.flag?.svg, window.location)}
                alt={`Imagen de ${paisActual?.name?.common}`}
                style={{ width: 130, height: 80 }}
            ></img>
            <p>¿Cuál de los siguientes países es fronterizo?</p>
            <div>
                <div className="div-opciones">
                    {/* Mapeo de todos los países que voy a mostrar en la trivia */}
                    {paisesTotales.map((fronterizo, index) => (
                        <button
                            key={fronterizo?.cca3 ?? index}
                            style={{ width: 70, height: 60, marginBottom: 0 }}
                            onClick={() => opcion(fronterizo)}
                        >
                            <img
                                src={new URL(fronterizo.flag.svg, window.location)}
                                style={{ width: 50, height: 40, objectFit: "cover" }}
                            />
                        </button>
                    ))}
                </div>
                <div>
                    <button
                        style={{ marginBottom: 0, marginTop: 10 }}
                        onClick={() => handleNone()}
                    >Ninguno</button>
                </div>
            </div>
            <p>Usted puede errarle {errores} veces.</p>
        </div>
    );
}