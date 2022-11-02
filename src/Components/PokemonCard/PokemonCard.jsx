/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import colours from "../../styles/Colors/Colors";
import PokemonService from "../../Services/PokemonService";
import PokemonTypes from "../PokemonTypes/PokemonTypes";
import "./PokemonCard.scss";

const PokemonCard = ({ id }) => {
    const [pokemon, setPokemon] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        PokemonService.getPokemonById(id).then((pokemon) => {
            setPokemon(pokemon);
            setIsLoading(false);
        });
    }, []);

    const extractColorTypeByName = (typeName) => {
        return colours.get(typeName);
    };

    return (
        <Link to={`pokemon/${id}`}>
            {!isLoading ? (
                <article
                    id="card"
                    style={{ border: `solid 2px ${extractColorTypeByName(pokemon.types[0].type.name)}` }}
                >
                    <div className="card_header">
                        <h3 style={{ backgroundColor: extractColorTypeByName(pokemon.types[0].type.name) }}>
                            {`#${id.toString().padStart(3, "0")}`}
                        </h3>
                    </div>
                    <div className="card_body">
                        <img src={pokemon.sprites.other.home.front_default} alt="" className="card_sprites" />
                    </div>
                    <div className="card_title">
                        <h2>{pokemon.name.replaceAll("-", " ")}</h2>
                    </div>
                    <PokemonTypes types={pokemon.types} />
                </article>
            ) : (
                ""
            )}
        </Link>
    );
};

export default PokemonCard;
