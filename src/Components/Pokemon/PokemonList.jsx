import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../Header/Header";
import PokemonCard from "./PokemonCard";

import "./PokemonList.scss";

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            await axios.get("https://pokeapi.co/api/v2/pokemon?limit=898&offest=0").then((res) => {
                setPokemons(res.data.results);
            });
            setIsLoading(false);
        };
        fetchPokemon();
    }, []);

    const renderPokemonsList = () => {
        const pokemonsList = [];
        pokemons.forEach((pokemon) => {
            pokemonsList.push(<PokemonCard key={pokemon.name} pokemon={pokemon} />);
        });
        return pokemonsList;
    };

    return (
        <div className="every_all_card">
            <Helmet>
                <title>Pokedex App</title>
            </Helmet>
            <Header />
            {isLoading ? <h1>Loading</h1> : <div className="all_card">{renderPokemonsList()} </div>}
        </div>
    );
};

export default PokemonList;
