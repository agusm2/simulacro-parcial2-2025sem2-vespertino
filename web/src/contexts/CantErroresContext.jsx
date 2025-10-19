import { createContext, useContext, useEffect, useState } from "react";
import { DifficultyContext } from "./DifficultyContext";

export const CantErroresContext = createContext();

export const CantErroresProvider = ({ children }) => {
    const { difficulty } = useContext(DifficultyContext);
    const [errores, setErrores] = useState(0);

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