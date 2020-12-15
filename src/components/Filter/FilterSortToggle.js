import React from "react";
import { ReactComponent as IconSort } from "icons/icon_sort.svg";
import styles from "components/Filter/Filter.module.scss";

class FilterSortToggle extends React.Component {
    render() {
        const { toggleSort, sortIsOpen } = this.props;

        return (
            <button
                onClick={toggleSort}
                className={`${styles.filter__button} ${
                    sortIsOpen ? styles.filter__button____open : null
                }`}
            >
                <IconSort />
            </button>
        );
    }
}

export default FilterSortToggle;
