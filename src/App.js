import React from "react";
import { Route, Routes } from "react-router-dom";
import PokemonList from "./Components/Pokemon/PokemonList";
import Pokemon from "./Components/Pokemon/Pokemon";
import Error404 from "./Pages/Error404/Error404";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<PokemonList />} />
            <Route exact path="/pokemon" element={<Pokemon />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default App;
