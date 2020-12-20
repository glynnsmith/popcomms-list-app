import React from "react";
import Masthead from "components/Masthead/Masthead";
import ContactList from "components/ContactList/ContactList";

class ListPage extends React.Component {
    render() {
        const {
            contactsServed,
            sortContactsByFirstName,
            sortContactsByLastName,
            sortContactsByCountry,
            handleFilterInputChange,
            checkIsOpen,
            toggleOpen,
        } = this.props;

        return (
            <>
                <Masthead
                    sortContactsByFirstName={sortContactsByFirstName}
                    sortContactsByLastName={sortContactsByLastName}
                    sortContactsByCountry={sortContactsByCountry}
                    handleFilterInputChange={handleFilterInputChange}
                />
                <ContactList
                    contactsServed={contactsServed}
                    checkIsOpen={checkIsOpen}
                    toggleOpen={toggleOpen}
                />
            </>
        );
    }
}

export default ListPage;
