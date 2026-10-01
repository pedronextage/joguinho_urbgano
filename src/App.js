
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Briga from "./briga";
import Inicio from "./inicio";
import EscolherPersonagem from "./escolher_personagem";
import Historia from "./historia";
import Jogo from "./jogo";
import Vitoria from "./vitoria";
import Vitoria2 from "./vitoria2";

import Historia2 from "./historia2";
import Perdeu from "./perdeu";

function App() {
  return (
    <BrowserRouter>
      <Routes>

       

        <Route
          path="/"
          element={<Inicio />}
        />

<Route 
path="/briga" 
element={<Briga />} />

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
          element={<Vitoria />}
        />

        <Route path="/vitoria2"
          element={<Vitoria2 />}
        />

        <Route
          path="/historia2"
          element={<Historia2 />}
        />

        <Route
          path="/perdeu"
          element={<Perdeu />}
        />

      </Routes>
    </BrowserRouter>


  );
}

export default App;

