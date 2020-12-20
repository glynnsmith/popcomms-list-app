import React from "react";
import ContactListItem from "components/ContactListItem/ContactListItem";
import styles from "components/ContactList/ContactList.module.scss";

class ContactList extends React.Component {
    render() {
        const { checkIsOpen, contactsServed, toggleOpen } = this.props;

        return (
            <ul className={styles.contact_list}>
                {contactsServed.map((contact, index) => (
                    <ContactListItem
                        checkIsOpen={checkIsOpen}
                        contact={contact}
                        key={index}
                        toggleOpen={toggleOpen}
                    />
                ))}
            </ul>
        );
    }
}

export default ContactList;
