import { createContext, useState } from "react";

export const PaisesVisitadosContext = createContext();

export const PaisesVisitadosProvider = ({ children }) => {
    const [visitados, setVisitados] = useState([]);

    const agregarVisitado = (country) => {
        setVisitados(prev => [...prev, country]);
    };

    const resetVisitados = () => setVisitados([]);

    return (
        <PaisesVisitadosContext.Provider value={{ visitados, agregarVisitado, resetVisitados }}>
            {children}
        </PaisesVisitadosContext.Provider>

    );
};