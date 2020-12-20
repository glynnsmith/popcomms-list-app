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
            contactsSortedBy,
        } = this.props;

        return (
            <>
                <Masthead
                    contactsSortedBy={contactsSortedBy}
                    handleFilterInputChange={handleFilterInputChange}
                    sortContactsByFirstName={sortContactsByFirstName}
                    sortContactsByLastName={sortContactsByLastName}
                    sortContactsByCountry={sortContactsByCountry}
                />
                <ContactList
                    checkIsOpen={checkIsOpen}
                    contactsServed={contactsServed}
                    toggleOpen={toggleOpen}
                />
            </>
        );
    }
}

export default ListPage;
