import React, { useRef } from "react";
import { fetchHeroes } from "../../utils/utils";
import "./SerachBar.scss";

export default function SearchBar() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((response) => response.json())
        .then(function (allpokemon) {
            allpokemon.results.forEach(function (pokemon) {
                fetchPokemonData(pokemon);
            });
        });

    return (
        <div>
            <form>
                <button>Search</button>
            </form>

            <section id="poke-container"></section>
            <section>s</section>
        </div>
    );
}
