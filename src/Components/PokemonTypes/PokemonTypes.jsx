/* eslint-disable react/prop-types */

import React from "react";
import colours from "../../styles/Colors/Colors";
import "./PokemonTypes.scss";

function PokemonTypes({ types }) {
    const extractColorTypeByName = (typeName) => {
        return colours.get(typeName);
    };
    return (
        <div className="card_type">
            {types.map(({ type }) => (
                <h4 key={type.name} className="type" style={{ backgroundColor: extractColorTypeByName(type.name) }}>
                    {type.name}
                </h4>
            ))}
        </div>
    );
}

export default PokemonTypes;
