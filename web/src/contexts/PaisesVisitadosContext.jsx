import { createContext, useState } from "react";

export const PaisesVisitadosContext = createContext();

export const PaisesVisitadosProvider = ({ children }) => {
    const [visitados, setVisitados] = useState([]);


    //Tomo el arreglo de paises visitados y le sumo country (el que quiero agregar)
    //crea un nuevo array con todos los países visitados hasta el momento más el que
    //le paso como parámetro
    const agregarVisitado = (country) => {
        setVisitados(prev => [...prev, country]);
    };

    //Utilizo esta función para cuando se requiere iniciar una nueva partida
    const resetVisitados = () => setVisitados([]);

    return (
        <PaisesVisitadosContext.Provider value={{ visitados, agregarVisitado, resetVisitados }}>
            {children}
        </PaisesVisitadosContext.Provider>
    );
};