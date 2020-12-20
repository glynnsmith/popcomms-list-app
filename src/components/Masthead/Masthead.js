import React from "react";
import { ReactComponent as Logo } from "icons/icon_logo.svg";
import FilterSearchToggle from "components/Filter/FilterSearchToggle";
import FilterSortToggle from "components/Filter/FilterSortToggle";
import FilterSearch from "components/Filter/FilterSearch";
import FilterSort from "components/Filter/FilterSort";
import styles from "components/Masthead/Masthead.module.scss";

class Masthead extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterIsOpen: false,
            sortIsOpen: false,
            headerHeight: null,
        };

        this.headerRef = React.createRef();
        this.toggleFilter = this.toggleFilter.bind(this);
        this.toggleSort = this.toggleSort.bind(this);
    }

    updateHeaderHeight = () => {
        this.setState({ headerHeight: this.headerRef.current.clientHeight });
    };

    toggleFilter = () => {
        this.setState({
            filterIsOpen: !this.state.filterIsOpen,
            headerHeight: this.headerRef.current.clientHeight,
        });

        if (this.state.sortIsOpen) {
            this.setState({ sortIsOpen: false });
        }
    };

    toggleSort = () => {
        this.setState({
            sortIsOpen: !this.state.sortIsOpen,
            headerHeight: this.headerRef.current.clientHeight,
        });

        if (this.state.filterIsOpen) {
            this.setState({ filterIsOpen: false });
        }
    };

    componentDidMount() {
        this.setState({ headerHeight: this.headerRef.current.clientHeight });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.headerHeight !== this.headerRef.current.clientHeight) {
            this.setState({
                headerHeight: this.headerRef.current.clientHeight,
            });
        }
    }

    render() {
        const {
            sortContactsByFirstName,
            sortContactsByLastName,
            sortContactsByCountry,
            handleFilterInputChange,
        } = this.props;

        const { filterIsOpen, sortIsOpen } = this.state;

        const headerSpacerStyle = {
            height: this.state.headerHeight,
        };

        return (
            <>
                <header
                    ref={this.headerRef}
                    className={`${styles.masthead} ${
                        filterIsOpen || sortIsOpen
                            ? styles.masthead____open
                            : null
                    }`}
                >
                    <nav className={styles.masthead__navigation}>
                        <div className={styles.masthead__primary}>
                            <FilterSearchToggle
                                filterIsOpen={filterIsOpen}
                                toggleFilter={this.toggleFilter}
                            />
                            <Logo />
                            <FilterSortToggle
                                sortIsOpen={sortIsOpen}
                                toggleSort={this.toggleSort}
                            />
                        </div>
                        <FilterSearch
                            filterIsOpen={filterIsOpen}
                            handleFilterInputChange={handleFilterInputChange}
                        />
                        <FilterSort
                            sortIsOpen={sortIsOpen}
                            sortContactsByFirstName={sortContactsByFirstName}
                            sortContactsByLastName={sortContactsByLastName}
                            sortContactsByCountry={sortContactsByCountry}
                        />
                    </nav>
                </header>
                <div className="header__spacer" style={headerSpacerStyle} />
            </>
        );
    }
}

export default Masthead;
