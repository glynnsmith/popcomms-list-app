import React from "react";
import ContactListItem from "components/ContactListItem/ContactListItem";
import styles from "components/ContactList/ContactList.module.scss";

class ContactList extends React.Component {
    render() {
        const { contactsServed } = this.props;

        return (
            <ul className={styles.contact_list}>
                {contactsServed.map((contact) => (
                    <ContactListItem
                        contact={contact}
                        key={
                            contact.name.first +
                            contact.name.last +
                            contact.index
                        }
                    />
                ))}
            </ul>
        );
    }
}

export default ContactList;
