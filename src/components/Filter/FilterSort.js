import React from "react";
import styles from "components/Filter/Filter.module.scss";

class FilterSort extends React.Component {
    render() {
        const {
            sortContactsByFirstName,
            sortContactsByLastName,
            sortContactsByCountry,
            sortIsOpen,
        } = this.props;

        return (
            <div
                className={`${styles.filter} ${styles.filter__sort} ${
                    sortIsOpen
                        ? styles.filter__sort____open
                        : styles.filter__sort____closed
                }`}
            >
                <button
                    className={`${styles.filter__sort_button}`}
                    onClick={sortContactsByFirstName}
                >
                    Name
                </button>
                <button
                    className={`${styles.filter__sort_button}`}
                    onClick={sortContactsByLastName}
                >
                    Surname
                </button>
                <button
                    className={`${styles.filter__sort_button}`}
                    onClick={sortContactsByCountry}
                >
                    Country
                </button>
            </div>
        );
    }
}

export default FilterSort;
