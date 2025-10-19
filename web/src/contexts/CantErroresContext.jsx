import { createContext, useContext, useEffect, useState } from "react";
import { DifficultyContext } from "./DifficultyContext";

export const CantErroresContext = createContext();

export const CantErroresProvider = ({ children }) => {

    //Leo la dificultad actual
    const { difficulty } = useContext(DifficultyContext);
    const [errores, setErrores] = useState(0);

    //En base a la dificultad, seteo la cantidad de errores
    //utilizo useEffect() para modificar la cantidad de errores
    //siempre que se modifique la dificultad
    useEffect(() => {
        if(difficulty === "facil") {
            setErrores(8);
        }else if (difficulty === "medio") {
            setErrores(5);
        }else {
            setErrores(3);
        }
    }, [difficulty]);

    return (
        <CantErroresContext.Provider value={{ errores, setErrores }}>
            {children}
        </CantErroresContext.Provider>
    );
};