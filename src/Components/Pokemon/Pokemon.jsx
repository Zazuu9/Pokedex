import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import colours from "../../styles/Colors/Colors";

import "./Pokemon.scss";

const Pokemon = () => {
    const url = new URL(window.location);
    const params1 = new URLSearchParams(url.search);
    const idPokemon = params1.get("id");

    const [sprites, setSprites] = useState("");
    const [pokemonInfo, setPokemonInfo] = useState({
        id: "",
        name: "",
        height: "",
        weight: "",
        hp: "",
        attack: "",
        defense: "",
        sp_attack: "",
        sp_defense: "",
        speed: "",
    });
    const [pokemonInfoSpecies, setPokemonInfoSpecies] = useState({
        capture: "",
        habitat: "N/A",
    });
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [pokemonAbilities, setPokemonAbilities] = useState([]);
    const [evolutionChains, setEvolutionChains] = useState([]);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`).then((res) => {
            // console.log(res);
            setSprites(res.data.sprites.other.home.front_default);
            setPokemonInfo({
                id: res.data.id,
                name: res.data.name,
                height: res.data.height,
                weight: res.data.weight,
                hp: res.data.stats[0].base_stat,
                attack: res.data.stats[1].base_stat,
                defense: res.data.stats[2].base_stat,
                sp_attack: res.data.stats[3].base_stat,
                sp_defense: res.data.stats[4].base_stat,
                speed: res.data.stats[5].base_stat,
            });
            setPokemonTypes(res.data.types);
            setPokemonAbilities(res.data.abilities);
        });
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`).then((res) => {
            console.log(res);
            setPokemonInfoSpecies({
                capture: res.data.capture_rate,
                habitat: res.data.habitat.name,
            });
            const urlChain = res.data.evolution_chain.url;
            axios.get(`${urlChain}`).then((res) => {
                console.log(res);
                setEvolutionChains(res.data.chain);
            });
        });
    }, []);

    const pokemonNameMa = pokemonInfo.name;
    const pokemonNameMaj = pokemonNameMa.charAt(0).toUpperCase() + pokemonNameMa.slice(1);

    const pokemonType = pokemonTypes.map((type) => type.type.name);
    const pokemonAbilitie = pokemonAbilities.map((ability) => ability.ability.name);

    console.log(evolutionChains);

    const colorType1 = colours.get(pokemonType[0]);
    const colorType2 = colours.get(pokemonType[1]);

    return (
        <div className="main">
            <Helmet>
                <title>{pokemonNameMaj} | Pokedex App</title>
            </Helmet>
            <div className="bg"></div>
            <div className="poke_info">
                <Link to={"/"} className="poke_info_back">
                    <div>
                        <FontAwesomeIcon icon={faArrowLeft} className="back_arrow" />
                    </div>
                </Link>
                <div className="poke_info_header">
                    <h1 className="poke_info_name">{pokemonInfo.name}</h1>
                    <h2 className="poke_info_id">#{pokemonInfo.id.toString().padStart(3, "0")}</h2>
                </div>
                <img src={sprites} alt="" className="poke_info_sprite" />
                <div className="poke_info_body_type">
                    <h2 className="type" style={{ backgroundColor: colorType1 }}>
                        {pokemonType[0]}
                    </h2>
                    {pokemonType[1] !== undefined ? (
                        <h2 className="type" style={{ backgroundColor: colorType2 }}>
                            {pokemonType[1]}
                        </h2>
                    ) : (
                        ""
                    )}
                </div>
                <div className="poke_info_body">
                    <div className="ability">
                        <h5>Abilities :</h5>
                        <span className="_ability">
                            <p>{pokemonAbilitie[0]}</p>
                            <p>{pokemonAbilitie[1]}</p>
                        </span>
                    </div>
                    <div className="capture_rate">
                        <h5>Capture rate :</h5>
                        {pokemonInfoSpecies.capture ? <p>{pokemonInfoSpecies.capture}%</p> : <p>N/A</p>}
                    </div>
                    <div className="habitat">
                        <h5>Habitat :</h5>
                        <p>{pokemonInfoSpecies.habitat}</p>
                    </div>
                </div>
                <div className="poke_info_stats">
                    <div className="poke_info_stats_name">
                        <p>Hp: </p>
                        <p>Attack: </p>
                        <p>Defense: </p>
                        <p>Sp.Attack: </p>
                        <p>Sp.Denfese: </p>
                        <p>Speed: </p>
                    </div>
                    <div className="poke_info_stats_progressbar">
                        <p>
                            <span className="">{pokemonInfo.hp}</span>
                            <progress value={pokemonInfo.hp} max="255" className="progressbar"></progress>
                        </p>
                        <p>
                            <span>{pokemonInfo.attack}</span>
                            <progress value={pokemonInfo.attack} max="165" className="progressbar"></progress>
                        </p>
                        <p>
                            <span>{pokemonInfo.defense}</span>
                            <progress value={pokemonInfo.defense} max="230" className="progressbar"></progress>
                        </p>
                        <p>
                            <span>{pokemonInfo.sp_attack}</span>
                            <progress value={pokemonInfo.sp_attack} max="173" className="progressbar"></progress>
                        </p>
                        <p>
                            <span>{pokemonInfo.sp_defense}</span>
                            <progress value={pokemonInfo.sp_defense} max="230" className="progressbar"></progress>
                        </p>
                        <p>
                            <span>{pokemonInfo.speed}</span>
                            <progress value={pokemonInfo.speed} max="200" className="progressbar"></progress>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pokemon;
