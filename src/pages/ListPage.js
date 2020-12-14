import React from "react";
import Header from "components/Header/Header";
import ContactList from "components/ContactList/ContactList";

class ListPage extends React.Component {
    render() {
        return (
            <>
                <Header />
                <ContactList />
            </>
        );
    }
}

export default ListPage;
