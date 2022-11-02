/* eslint-disable react/prop-types */

import React from "react";
import "./PokemonStats.scss";

function PokemonStats({ stats }) {
    return (
        <div className="poke_info_stats">
            <div className="poke_info_stats_pokemon">
                {stats.map((stat) => (
                    <div className="poke_info_stats_pokemon_1" key={stat.stat.name}>
                        <h4 className="poke_info_stats_pokemon_1_name">
                            {stat.stat.name.replaceAll("-", " ").toUpperCase()}
                        </h4>
                        <h4 className="poke_info_stats_pokemon_1_number">{stat.base_stat}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PokemonStats;
