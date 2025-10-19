import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DifficultyContext } from '../contexts/DifficultyContext';
import { PaisesVisitadosContext } from '../contexts/PaisesVisitadosContext';

export default function Home() {
  const [initialCountry, setInitialCountry] = useState(null);

  //Permite navegar entre rutas sin la necesidad de Link
  //<Link>: cuando el usuario debe hacer clic en algo visible
  //useNavigate: cuando yo tengo que decidir por lógica cuando navegar
  const navigate = useNavigate();

  const { setDifficulty } = useContext(DifficultyContext);
  const { agregarVisitado } = useContext(PaisesVisitadosContext)

  async function obtenerPaisAleatorio() {
    try {
      //new URL(...) crea una URL a partir de una cadena
      const response = await fetch(new URL("/api/countries", window.location));
      if (!response.ok) {
        throw new Error("No se pudo obtener los países");
      }
      const codigos = await response.json();
      const indice = Math.floor(Math.random() * codigos.length);
      const codigoInicial = codigos[indice];

      const data = await fetch(new URL(`/api/countries/${codigoInicial}`, window.location));
      const paisInicial = await data.json();
      agregarVisitado(paisInicial);
      setInitialCountry(paisInicial);
    } catch (e) {
      console.error("Error: ", e.message);
    }
  }

  //Ejecuta la función cuando el componente se monta en el DOM y cada vez que cambian las dependencias []
  useEffect(() => {
    obtenerPaisAleatorio();
  }, []);

  function handleClick(difficulty) {
    setDifficulty(difficulty);
    navigate(`/${initialCountry.cca3}`);
  }

  return (
    <div>
      <h2>Flag Trivia</h2>
      <p style={{ marginTop: 20 }}>Elija la dificultad del juego</p>
      <div className='div-btns'>
        <button onClick={() => handleClick("facil")}>Fácil</button>
        <button onClick={() => handleClick("medio")}>Medio</button>
        <button onClick={() => handleClick("dificil")}>Difícil</button>
      </div>
    </div>
  );
}