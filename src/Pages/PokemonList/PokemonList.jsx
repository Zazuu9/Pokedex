import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../Components/Header/Header";
import PokemonCard from "../../Components/PokemonCard/PokemonCard";
import PokemonService from "../../Services/PokemonService";

import "./PokemonList.scss";

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const pokemon = await PokemonService.getPokemons(0, 1);
            setPokemons(pokemon.results);
            setIsLoading(false);
        })();
    }, []);

    const extractPokemonId = ({ url }) => {
        return url.split("/")[6];
    };

    return (
        <div className="every_all_card">
            <Helmet>
                <title>Pokedex App</title>
            </Helmet>
            <Header />
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="all_card">
                    {pokemons.map((pokemon) => {
                        // console.log("pokemon :" + pokemon);
                        return <PokemonCard key={pokemon.name} id={extractPokemonId(pokemon)} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default PokemonList;
