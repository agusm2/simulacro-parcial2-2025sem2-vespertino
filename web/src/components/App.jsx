import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DifficultyProvider } from '../contexts/DifficultyContext';
import { CantErroresProvider } from '../contexts/CantErroresContext';
import { PaisesVisitadosProvider } from '../contexts/PaisesVisitadosContext';

import Home from './Home';
import Trivia from './Trivia';
import EndGame from './EndGame';

export default function App() {
  return (
    <DifficultyProvider>
      <CantErroresProvider>
        <PaisesVisitadosProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/:cca3' element={<Trivia />} />
              <Route path='/end' element={<EndGame />} />
            </Routes>
          </BrowserRouter>
        </PaisesVisitadosProvider>
      </CantErroresProvider>
    </DifficultyProvider>
  );
}
