import React from "react";
import styles from "components/Filter/Filter.module.scss";

class FilterSort extends React.Component {
    render() {
        const {
            sortContactsByFirstName,
            sortContactsByLastName,
            sortContactsByCountry,
            sortIsOpen,
            contactsSortedBy,
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
                    className={`${styles.filter__sort_button}
                    ${
                        contactsSortedBy === "name"
                            ? styles.filter__sort_button____active
                            : ""
                    }`}
                    onClick={sortContactsByFirstName}
                >
                    Name
                </button>
                <button
                    className={`${styles.filter__sort_button}
                    ${
                        contactsSortedBy === "surname"
                            ? styles.filter__sort_button____active
                            : ""
                    }`}
                    onClick={sortContactsByLastName}
                >
                    Surname
                </button>
                <button
                    className={`${styles.filter__sort_button}
                    ${
                        contactsSortedBy === "country"
                            ? styles.filter__sort_button____active
                            : ""
                    }`}
                    onClick={sortContactsByCountry}
                >
                    Country
                </button>
            </div>
        );
    }
}

export default FilterSort;
