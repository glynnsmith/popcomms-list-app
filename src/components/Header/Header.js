import React from "react";
import { ReactComponent as Logo } from "icons/icon_logo.svg";
import FilterSearch from "components/FilterSearch/FilterSearch";
import FilterSort from "components/FilterSort/FilterSort";

class Header extends React.Component {
    render() {
        return (
            <>
                <FilterSearch />
                <Logo />
                <FilterSort />
            </>
        );
    }
}

export default Header;
