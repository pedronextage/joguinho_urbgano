
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./inicio";
import EscolherPersonagem from "./escolher_personagem";
import Historia from "./historia";
import Jogo from "./jogo";
import Vitoria from "./vitoria";
import Briga from "./briga";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/briga" 
        element={<Briga />} />

        <Route
          path="/"
          element={<Inicio />}
        />

        <Route
          path="/escolher-personagem"
          element={<EscolherPersonagem />}
        />

        <Route
          path="/historia"
          element={<Historia />}
        />

        <Route
          path="/jogo"
          element={<Jogo />}
        />

        <Route path="/vitoria" 
        element={<Vitoria />} />
      </Routes>
    </BrowserRouter>

    
  );
}

export default App;

