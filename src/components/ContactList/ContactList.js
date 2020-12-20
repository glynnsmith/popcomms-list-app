import React from "react";
import ContactListItem from "components/ContactListItem/ContactListItem";
import styles from "components/ContactList/ContactList.module.scss";

class ContactList extends React.Component {
    render() {
        const { checkIsOpen, contactsServed, toggleOpen } = this.props;

        const ContactListChecker = () => {
            if (contactsServed.length > 0) {
                return contactsServed.map((contact, index) => (
                    <ContactListItem
                        checkIsOpen={checkIsOpen}
                        contact={contact}
                        key={index}
                        toggleOpen={toggleOpen}
                    />
                ));
            } else {
                return (
                    <li className={styles.contact_list__no_item}>
                        No search results found. Please try revising your
                        search.
                    </li>
                );
            }
        };
        return (
            <ul className={styles.contact_list}>
                <ContactListChecker />
            </ul>
        );
    }
}

export default ContactList;
