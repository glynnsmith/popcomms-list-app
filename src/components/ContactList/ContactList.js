import React from "react";
import ContactListItem from "components/ContactListItem/ContactListItem";
import styles from "components/ContactList/ContactList.module.scss";

class ContactList extends React.Component {
    render() {
        const { contactsServed, checkIsOpen, toggleOpen } = this.props;

        return (
            <ul className={styles.contact_list}>
                {contactsServed.map((contact, index) => (
                    <ContactListItem
                        contact={contact}
                        key={index}
                        checkIsOpen={checkIsOpen}
                        toggleOpen={toggleOpen}
                    />
                ))}
            </ul>
        );
    }
}

export default ContactList;
