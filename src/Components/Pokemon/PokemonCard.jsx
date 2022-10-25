import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import colours from "../../styles/Colors/Colors";
import "./PokemonCard.scss";

const PokemonCard = (pokemon) => {
    const pokemonUrl = pokemon.pokemon.url;
    const [pokemonId, setPokemonId] = useState("");
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [sprites, setSprites] = useState("");

    useEffect(() => {
        const loadIdPokemon = async () => {
            await axios.get(pokemonUrl).then((res) => {
                setPokemonId(res.data.id);
                setPokemonTypes(res.data.types);
                setSprites(res.data.sprites.other.home.front_default);
            });
        };
        loadIdPokemon();
    }, [pokemonUrl, pokemonId]);

    const pokemonType = pokemonTypes.map((type) => type.type.name);
    // console.log(pokemonType);

    const colorType1 = colours.get(pokemonType[0]);
    const colorType2 = colours.get(pokemonType[1]);

    return (
        <Link to={`pokemon?id=${pokemonId}`} key={pokemon.id} pokemon={pokemonId}>
            <article id="card" style={{ border: `solid 2px ${colorType1}` }}>
                <div className="card_header">
                    <h3 style={{ border: `solid 2px ${colorType1}`, backgroundColor: colorType1 }}>
                        #{pokemonId.toString().padStart(3, "0")}
                    </h3>
                </div>
                <div className="card_body">
                    <img src={sprites} alt="" className="card_sprites" />
                </div>
                <div className="card_title">
                    <h2>{pokemon.pokemon.name}</h2>
                </div>
                <div className="card_type">
                    <h4 className="type" style={{ backgroundColor: colorType1 }}>
                        {pokemonType[0]}
                    </h4>
                    {pokemonType[1] !== undefined ? (
                        <h4 className="type" style={{ backgroundColor: colorType2 }}>
                            {pokemonType[1]}
                        </h4>
                    ) : (
                        ""
                    )}
                </div>
            </article>
        </Link>
    );
};

export default PokemonCard;
