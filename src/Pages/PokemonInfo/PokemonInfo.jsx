import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import PokemonStats from "../../Components/PokemonStats/PokemonStats";
import PokemonTypes from "../../Components/PokemonTypes/PokemonTypes";
import PokemonService from "../../Services/PokemonService";

import "./PokemonInfo.scss";

const Pokemon = () => {
    const url = window.location;
    const UrlId = url.pathname.split("/")[2];

    const [pokemonInfo, setPokemonInfo] = useState();
    const [pokemonInfoSpecies, setPokemonInfoSpecies] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [chainEvolutions, setChainEvolutions] = useState([]);

    const [isShiny, setIsShiny] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        PokemonService.getPokemonById(UrlId).then((pokemon) => {
            setPokemonInfo(pokemon);
            setIsLoading(false);
        });
    }, [UrlId]);

    useEffect(() => {
        if (isLoading) return;

        (async () => {
            // Get pokemon species
            const pokemonSpecies = await PokemonService.getPokemonSpeciesByPokemonName(pokemonInfo.name);
            console.log(pokemonSpecies);
            setPokemonInfoSpecies({
                legendary: pokemonSpecies.is_legendary,
                mythical: pokemonSpecies.is_mythical,
            });
            const evolutionChain = pokemonSpecies.evolution_chain.url;
            const evolutionChainId = evolutionChain.split("/")[6];

            // console.log(evolutionChainId);
            // Get pokemon evolution chain
            const pokemonEvolutionChain = await PokemonService.getPokemonEvolutionChainById(evolutionChainId);
            // console.log(pokemonEvolutionChain);

            const evolutionList = await Promise.all(
                extractChildPokemon(pokemonEvolutionChain.chain).map(async (e) => {
                    const pokemon = await PokemonService.getPokemonById(e.name);
                    return {
                        name: e.name,
                        id: pokemon.id,
                        url: e.url,
                        imageSrc: pokemon.sprites.other.home.front_default,
                    };
                })
            );
            // console.log(evolutionList);
            setChainEvolutions(evolutionList);
        })();
    }, [pokemonInfo]);
    // console.log(pokemonInfoSpecies);
    // console.log(chainEvolutions);

    function scrollToTopSmooth() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function navigateToPokemon(id) {
        scrollToTopSmooth();
        navigate(`/pokemon/${id}`);
    }

    function extractChildPokemon(pokemonEvolutionChain) {
        if (pokemonEvolutionChain.evolves_to.length === 0) return [pokemonEvolutionChain.species];

        let evolveList = [pokemonEvolutionChain.species];
        pokemonEvolutionChain.evolves_to.forEach((e) => {
            evolveList = [...evolveList, ...extractChildPokemon(e)];
        });
        return evolveList;
    }

    return (
        <div>
            {!isLoading ? (
                <div className="main">
                    <Helmet>
                        <title>{pokemonInfo.name} | Pokedex App</title>
                    </Helmet>
                    <div className="poke_info">
                        <div className="poke_info_header">
                            <h1 className="poke_info_header_name">{pokemonInfo.name}</h1>
                            <h2 className="poke_info_header_id">{`#${pokemonInfo.id.toString().padStart(3, "0")}`}</h2>
                            <img
                                src={
                                    isShiny
                                        ? pokemonInfo.sprites.other.home.front_shiny
                                        : pokemonInfo.sprites.other.home.front_default
                                }
                                className="poke_info_header_sprite"
                            />
                            {isShiny ? (
                                <button className="normal_btn btn" onClick={() => setIsShiny(false)}>
                                    View Normal
                                </button>
                            ) : (
                                <button className="shiny_btn btn" onClick={() => setIsShiny(true)}>
                                    View Shiny
                                </button>
                            )}
                            <PokemonTypes types={pokemonInfo.types} />
                            <div className="poke_info_header_lengendary_mythical">
                                {pokemonInfoSpecies === undefined ? (
                                    ""
                                ) : pokemonInfoSpecies.legendary === true ? (
                                    <h4 className="poke_info_header_lengendary_mythical_">
                                        Legendary:{" "}
                                        <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            className="poke_info_header_lengendary_mythical_true"
                                        />
                                    </h4>
                                ) : (
                                    <h4 className="poke_info_header_lengendary_mythical_">
                                        Legendary:{" "}
                                        <FontAwesomeIcon
                                            icon={faCircleXmark}
                                            className="poke_info_header_lengendary_mythical_false"
                                        />
                                    </h4>
                                )}
                                {pokemonInfoSpecies === undefined ? (
                                    ""
                                ) : pokemonInfoSpecies.mythical === true ? (
                                    <h4 className="poke_info_header_lengendary_mythical_">
                                        Mythical:{" "}
                                        <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            className="poke_info_header_lengendary_mythical_true"
                                        />
                                    </h4>
                                ) : (
                                    <h4 className="poke_info_header_lengendary_mythical_">
                                        Mythical:{" "}
                                        <FontAwesomeIcon
                                            icon={faCircleXmark}
                                            className="poke_info_header_lengendary_mythical_false"
                                        />
                                    </h4>
                                )}
                            </div>
                        </div>
                        <PokemonStats stats={pokemonInfo.stats} abilities={pokemonInfo.abilities} />
                        <h2 className="poke_info_evolution_title">Evolutions :</h2>
                        <div className="poke_info_evolution">
                            {chainEvolutions === undefined
                                ? ""
                                : chainEvolutions.map(({ name, imageSrc, id }) => (
                                      <div key={name} className="evolution" onClick={() => navigateToPokemon(id)}>
                                          <img src={imageSrc} alt="" className="sprite_evolution" />
                                          <h4 className="name_evolution">{name}</h4>
                                      </div>
                                  ))}
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Pokemon;
