import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import colours from "../../styles/Colors/Colors";

import "./Pokemon.scss";
const Pokemon = () => {
    const url = new URL(window.location);
    const params1 = new URLSearchParams(url.search);
    const idPokemon = params1.get("id");
    const navigate = useNavigate();

    const [sprites, setSprites] = useState("");
    const [spritesShiny, setSpritesShiny] = useState("");
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
    const [evolutionName1, setEvolutionName1] = useState({
        name: "",
        sprite: "",
        id: "",
    });
    const [evolutionName2, setEvolutionName2] = useState({
        name: "",
        sprite: "",
        id: "",
    });
    const [evolutionName3, setEvolutionName3] = useState({
        name: "",
        sprite: "",
        id: "",
    });
    const [evolutionName4, setEvolutionName4] = useState({
        name: "",
        sprite: "",
        id: "",
    });
    const [evolutionName5, setEvolutionName5] = useState({
        name: "",
        sprite: "",
        id: "",
    });
    const [evolutionName6, setEvolutionName6] = useState({
        name: "",
        sprite: "",
        id: "",
    });
    const [evolutionName7, setEvolutionName7] = useState({
        name: "",
        sprite: "",
        id: "",
    });
    const [evolutionName8, setEvolutionName8] = useState({
        name: "",
        sprite: "",
        id: "",
    });
    const [evolutionName9, setEvolutionName9] = useState({
        name: "",
        sprite: "",
        id: "",
    });
    const [evolutionName10, setEvolutionName10] = useState({
        name: "",
        sprite: "",
        id: "",
    });
    function scrollToTopSmooth() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    function NavigateEvoltuion1() {
        navigate(`/pokemon?id=${evolutionName1.id}`);
        scrollToTopSmooth();
    }
    function NavigateEvoltuion2() {
        navigate(`/pokemon?id=${evolutionName2.id}`);
        scrollToTopSmooth();
    }
    function NavigateEvoltuion3() {
        navigate(`/pokemon?id=${evolutionName3.id}`);
        scrollToTopSmooth();
    }
    function NavigateEvoltuion4() {
        navigate(`/pokemon?id=${evolutionName4.id}`);
        scrollToTopSmooth();
    }
    function NavigateEvoltuion5() {
        navigate(`/pokemon?id=${evolutionName5.id}`);
        scrollToTopSmooth();
    }

    function NavigateEvoltuion6() {
        navigate(`/pokemon?id=${evolutionName6.id}`);
        scrollToTopSmooth();
    }

    function NavigateEvoltuion7() {
        navigate(`/pokemon?id=${evolutionName7.id}`);
        scrollToTopSmooth();
    }

    function NavigateEvoltuion8() {
        navigate(`/pokemon?id=${evolutionName8.id}`);
        scrollToTopSmooth();
    }

    function NavigateEvoltuion9() {
        navigate(`/pokemon?id=${evolutionName9.id}`);
        scrollToTopSmooth();
    }

    function NavigateEvoltuion10() {
        navigate(`/pokemon?id=${evolutionName10.id}`);
        scrollToTopSmooth();
    }

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`).then((res) => {
            setSprites(res.data.sprites.other.home.front_default);
            setSpritesShiny(res.data.sprites.other.home.front_shiny);
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
            const urlChain = res.data.evolution_chain.url;
            axios.get(`${urlChain}`).then((res) => {
                console.log(res);
                const evolution = res.data.chain.species.name;
                axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution}`).then((res) => {
                    setEvolutionName1({
                        name: res.data.name,
                        sprite: res.data.sprites.other.home.front_default,
                        id: res.data.id,
                    });
                });
                if (res.data.chain.evolves_to[0]) {
                    const evolution = res.data.chain.evolves_to[0].species.name;
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution}`).then((res) => {
                        setEvolutionName2({
                            name: res.data.name,
                            sprite: res.data.sprites.other.home.front_default,
                            id: res.data.id,
                        });
                    });
                }
                if (res.data.chain.evolves_to[0].evolves_to[0]) {
                    const evolution = res.data.chain.evolves_to[0].evolves_to[0].species.name;
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution}`).then((res) => {
                        setEvolutionName3({
                            name: res.data.name,
                            sprite: res.data.sprites.other.home.front_default,
                            id: res.data.id,
                        });
                    });
                }
                if (res.data.chain.evolves_to[1]) {
                    const evolution = res.data.chain.evolves_to[1].species.name;
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution}`).then((res) => {
                        setEvolutionName4({
                            name: res.data.name,
                            sprite: res.data.sprites.other.home.front_default,
                            id: res.data.id,
                        });
                    });
                }
                if (res.data.chain.evolves_to[2]) {
                    const evolution = res.data.chain.evolves_to[2].species.name;
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution}`).then((res) => {
                        setEvolutionName5({
                            name: res.data.name,
                            sprite: res.data.sprites.other.home.front_default,
                            id: res.data.id,
                        });
                    });
                }
                if (res.data.chain.evolves_to[3]) {
                    const evolution = res.data.chain.evolves_to[3].species.name;
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution}`).then((res) => {
                        setEvolutionName6({
                            name: res.data.name,
                            sprite: res.data.sprites.other.home.front_default,
                            id: res.data.id,
                        });
                    });
                }
                if (res.data.chain.evolves_to[4]) {
                    const evolution = res.data.chain.evolves_to[4].species.name;
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution}`).then((res) => {
                        setEvolutionName7({
                            name: res.data.name,
                            sprite: res.data.sprites.other.home.front_default,
                            id: res.data.id,
                        });
                    });
                }
                if (res.data.chain.evolves_to[5]) {
                    const evolution = res.data.chain.evolves_to[5].species.name;
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution}`).then((res) => {
                        setEvolutionName8({
                            name: res.data.name,
                            sprite: res.data.sprites.other.home.front_default,
                            id: res.data.id,
                        });
                    });
                }
                if (res.data.chain.evolves_to[6]) {
                    const evolution = res.data.chain.evolves_to[6].species.name;
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution}`).then((res) => {
                        setEvolutionName9({
                            name: res.data.name,
                            sprite: res.data.sprites.other.home.front_default,
                            id: res.data.id,
                        });
                    });
                }
                if (res.data.chain.evolves_to[7]) {
                    const evolution = res.data.chain.evolves_to[7].species.name;
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution}`).then((res) => {
                        setEvolutionName10({
                            name: res.data.name,
                            sprite: res.data.sprites.other.home.front_default,
                            id: res.data.id,
                        });
                    });
                }
            });
            setPokemonInfoSpecies({
                capture: res.data.capture_rate,
                habitat: res.data.habitat.name,
            });
        });
    }, [idPokemon]);

    const pokemonNameMa = pokemonInfo.name;
    const pokemonNameMaj = pokemonNameMa.charAt(0).toUpperCase() + pokemonNameMa.slice(1);

    const pokemonType = pokemonTypes.map((type) => type.type.name);
    const pokemonAbilitie = pokemonAbilities.map((ability) => ability.ability.name);

    const colorType1 = colours.get(pokemonType[0]);
    const colorType2 = colours.get(pokemonType[1]);

    const [getSprite, setGetSprites] = useState("View Shiny");
    function normalSprite() {
        let IMG = document.getElementById("images").getAttribute("src");
        if (IMG === spritesShiny) {
            document.getElementById("images").src = `${sprites}`;
            setGetSprites("View Shiny");
        } else {
            document.getElementById("images").src = `${spritesShiny}`;
            setGetSprites("View Normal");
        }
    }

    return (
        <div className="main">
            <Helmet>
                <title>{pokemonNameMaj} | Pokedex App</title>
            </Helmet>
            <div className="bg"></div>
            <div className="poke_info">
                <Header />
                <Link to={"/"} className="poke_info_back">
                    <div>
                        <FontAwesomeIcon icon={faArrowLeft} className="back_arrow" />
                    </div>
                </Link>
                <div className="poke_info_header">
                    <h1 className="poke_info_name">{pokemonInfo.name}</h1>
                    <h2 className="poke_info_id">#{pokemonInfo.id.toString().padStart(3, "0")}</h2>
                </div>
                <img id="images" src={sprites} alt="" className="poke_info_sprite" />
                {getSprite === "View Normal" ? (
                    <button onClick={normalSprite} className="normal_btn normal_shiny_btn">
                        View Normal
                    </button>
                ) : (
                    <button onClick={normalSprite} className="shiny_btn normal_shiny_btn">
                        View Shiny
                    </button>
                )}
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
                        {pokemonInfoSpecies.habitat ? <p>{pokemonInfoSpecies.habitat}</p> : <p>N/A</p>}
                    </div>
                </div>
                <div className="poke_info_stats">
                    <div className="poke_info_stats_name">
                        <p>Hp: </p>
                        <p>Attack: </p>
                        <p>Defense: </p>
                        <p>Sp.Atk: </p>
                        <p>Sp.Def: </p>
                        <p>Speed: </p>
                    </div>
                    <div className="poke_info_stats_progressbar">
                        <p>
                            <span className="stat">{pokemonInfo.hp}</span>
                            <progress value={pokemonInfo.hp} max="255" className="progressbar"></progress>
                        </p>
                        <p>
                            <span className="stat">{pokemonInfo.attack}</span>
                            <progress value={pokemonInfo.attack} max="165" className="progressbar"></progress>
                        </p>
                        <p>
                            <span className="stat">{pokemonInfo.defense}</span>
                            <progress value={pokemonInfo.defense} max="230" className="progressbar"></progress>
                        </p>
                        <p>
                            <span className="stat">{pokemonInfo.sp_attack}</span>
                            <progress value={pokemonInfo.sp_attack} max="173" className="progressbar"></progress>
                        </p>
                        <p>
                            <span className="stat">{pokemonInfo.sp_defense}</span>
                            <progress value={pokemonInfo.sp_defense} max="230" className="progressbar"></progress>
                        </p>
                        <p>
                            <span className="stat">{pokemonInfo.speed}</span>
                            <progress value={pokemonInfo.speed} max="200" className="progressbar"></progress>
                        </p>
                    </div>
                </div>
                <div className="poke_info_evolution">
                    {evolutionName1.name !== "" ? (
                        <div className="poke_info_evolution_evo" onClick={NavigateEvoltuion1}>
                            <img src={evolutionName1.sprite} alt="" className="poke_info_evolution_evo_sprite" />
                            <p className="poke_info_evolution_evo_name">{evolutionName1.name}</p>
                        </div>
                    ) : (
                        ""
                    )}
                    {evolutionName2.name !== "" ? (
                        <div className="poke_info_evolution_evo" onClick={NavigateEvoltuion2}>
                            <img src={evolutionName2.sprite} alt="" className="poke_info_evolution_evo_sprite" />
                            <p className="poke_info_evolution_evo_name">{evolutionName2.name}</p>
                        </div>
                    ) : (
                        ""
                    )}
                    {evolutionName3.name !== "" ? (
                        <div className="poke_info_evolution_evo" onClick={NavigateEvoltuion3}>
                            <img src={evolutionName3.sprite} alt="" className="poke_info_evolution_evo_sprite" />
                            <p className="poke_info_evolution_evo_name">{evolutionName3.name}</p>
                        </div>
                    ) : (
                        ""
                    )}
                    {evolutionName4.name !== "" ? (
                        <div className="poke_info_evolution_evo" onClick={NavigateEvoltuion4}>
                            <img src={evolutionName4.sprite} alt="" className="poke_info_evolution_evo_sprite" />
                            <p className="poke_info_evolution_evo_name">{evolutionName4.name}</p>
                        </div>
                    ) : (
                        ""
                    )}
                    {evolutionName5.name !== "" ? (
                        <div className="poke_info_evolution_evo" onClick={NavigateEvoltuion5}>
                            <img src={evolutionName5.sprite} alt="" className="poke_info_evolution_evo_sprite" />
                            <p className="poke_info_evolution_evo_name">{evolutionName5.name}</p>
                        </div>
                    ) : (
                        ""
                    )}
                    {evolutionName6.name !== "" ? (
                        <div className="poke_info_evolution_evo" onClick={NavigateEvoltuion6}>
                            <img src={evolutionName6.sprite} alt="" className="poke_info_evolution_evo_sprite" />
                            <p className="poke_info_evolution_evo_name">{evolutionName6.name}</p>
                        </div>
                    ) : (
                        ""
                    )}
                    {evolutionName7.name !== "" ? (
                        <div className="poke_info_evolution_evo" onClick={NavigateEvoltuion7}>
                            <img src={evolutionName7.sprite} alt="" className="poke_info_evolution_evo_sprite" />
                            <p className="poke_info_evolution_evo_name">{evolutionName7.name}</p>
                        </div>
                    ) : (
                        ""
                    )}
                    {evolutionName8.name !== "" ? (
                        <div className="poke_info_evolution_evo" onClick={NavigateEvoltuion8}>
                            <img src={evolutionName8.sprite} alt="" className="poke_info_evolution_evo_sprite" />
                            <p className="poke_info_evolution_evo_name">{evolutionName8.name}</p>
                        </div>
                    ) : (
                        ""
                    )}
                    {evolutionName9.name !== "" ? (
                        <div className="poke_info_evolution_evo" onClick={NavigateEvoltuion9}>
                            <img src={evolutionName9.sprite} alt="" className="poke_info_evolution_evo_sprite" />
                            <p className="poke_info_evolution_evo_name">{evolutionName9.name}</p>
                        </div>
                    ) : (
                        ""
                    )}
                    {evolutionName10.name !== "" ? (
                        <div className="poke_info_evolution_evo" onClick={NavigateEvoltuion10}>
                            <img src={evolutionName10.sprite} alt="" className="poke_info_evolution_evo_sprite" />
                            <p className="poke_info_evolution_evo_name">{evolutionName10.name}</p>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pokemon;
