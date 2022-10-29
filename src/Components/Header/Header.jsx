import React from "react";
import Logo from "../../assets/Pokédex_logo.webp";

import "./Header.scss";

function Header() {
    return (
        <header>
            <img src={Logo} alt="" className="logo_header" />
        </header>
    );
}

export default Header;
