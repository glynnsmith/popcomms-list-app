import React from "react";
import { ReactComponent as IconSearch } from "icons/icon_search.svg";
import styles from "components/Filter/Filter.module.scss";

class FilterSearchToggle extends React.Component {
    render() {
        const { toggleFilter, filterIsOpen } = this.props;
        return (
            <button
                onClick={toggleFilter}
                className={`${styles.filter__button} ${
                    filterIsOpen ? styles.filter__button____open : null
                }`}
            >
                <IconSearch />
            </button>
        );
    }
}

export default FilterSearchToggle;
