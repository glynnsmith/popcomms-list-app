import React from "react";
import styles from "components/Filter/Filter.module.scss";

class FilterSearch extends React.Component {
    render() {
        const { handleFilterInputChange, filterIsOpen } = this.props;

        return (
            <>
                <input
                    type="text"
                    onChange={handleFilterInputChange}
                    placeholder="Filter contacts..."
                    className={`${styles.filter} ${styles.filter__input} ${
                        filterIsOpen
                            ? styles.filter__input____open
                            : styles.filter__input____closed
                    }`}
                />
            </>
        );
    }
}

export default FilterSearch;
