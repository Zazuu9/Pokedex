import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/";

async function getPokemons(offset = 0, size = 898) {
    return (await axios.get(`${baseUrl}pokemon?limit=${size}&offset=${offset}`)).data;
}

async function getPokemonById(id) {
    return (await axios.get(`${baseUrl}pokemon/${id}`)).data;
}

async function getPokemonEvolutionChainById(id) {
    return (await axios.get(`${baseUrl}evolution-chain/${id}`)).data;
}

async function getPokemonSpeciesByPokemonName(pokemonName) {
    return (await axios.get(`${baseUrl}pokemon-species/${pokemonName}`)).data;
}

export default {
    getPokemons,
    getPokemonById,
    getPokemonEvolutionChainById,
    getPokemonSpeciesByPokemonName,
};
