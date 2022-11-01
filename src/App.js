import React from "react";
import { Route, Routes } from "react-router-dom";
import PokemonList from "./Pages/PokemonList/PokemonList";
import PokemonInfo from "./Pages/PokemonInfo/PokemonInfo";
import Error404 from "./Pages/Error404/Error404";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<PokemonList />} />
            <Route exact path="/pokemon/:pokemon" element={<PokemonInfo />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default App;
