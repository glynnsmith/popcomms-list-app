import React from "react";
import { ReactComponent as IconPhone } from "icons/icon_phone.svg";
import { ReactComponent as IconChevron } from "icons/icon_chevron.svg";
import { ReactComponent as IconGhost } from "icons/icon_ghost.svg";
import { ReactComponent as IconBuilding } from "icons/icon_building.svg";
import { Link } from "react-router-dom";
import styles from "components/ContactListItem/ContactListItem.module.scss";
import iconStyles from "icons/icons.module.scss";

class ContactListItem extends React.Component {
    constructor(props) {
        super(props);

        // Binding this to this, so our functions affect the correct objects
        this.handleContactItemClick = this.handleContactItemClick.bind(this);
        this.stopPropagation = this.stopPropagation.bind(this);
    }

    handleContactItemClick = () => {
        const { contact, toggleOpen, checkIsOpen } = this.props;
        toggleOpen(contact);
        checkIsOpen();
    };

    // Stops the propogation for child elements of events to assigned to parents
    // E.G. Used in this component to ignore the toggling of the item when clicking the call link within.
    stopPropagation = (e) => {
        e.stopPropagation();
    };

    render() {
        const { contact } = this.props;

        return (
            <li
                onClick={this.handleContactItemClick}
                key={contact.key}
                className={`${styles.contact_list_item}
                ${contact.isOpen ? `${styles.open}` : "closed"}`}
            >
                <section className={styles.contact_list_item__primary}>
                    <div className={styles.contact_list_item__image_container}>
                        <img
                            src={contact.picture.large}
                            alt={`${contact.name.first} ${contact.name.last}`}
                        />
                        <div
                            className={styles.contact_list_item__image_overlay}
                        ></div>
                    </div>
                    <div className={styles.contact_list_item__primary_details}>
                        <Link
                            onClick={this.stopPropagation}
                            to={{
                                pathname: "/call",
                                state: { contactData: contact },
                            }}
                            className={`${iconStyles.icon_container__phone} ${
                                iconStyles.icon_container__phone____call
                            } ${
                                contact.isOpen
                                    ? `${iconStyles.icon_container__phone____open}`
                                    : "closed"
                            }`}
                        >
                            <IconPhone />
                        </Link>
                        <address>
                            <h2
                                className={
                                    styles.contact_list_item__primary_name
                                }
                            >{`${contact.name.first} ${contact.name.last}`}</h2>
                            <span
                                className={
                                    styles.contact_list_item__primary_location
                                }
                            >{`${contact.location.state}, ${contact.location.country}`}</span>
                        </address>
                    </div>
                </section>
                <section className={styles.contact_list_item__secondary}>
                    <address
                        className={styles.contact_list_item__secondary_details}
                    >
                        <div
                            className={
                                iconStyles.icon_container__list_decorator
                            }
                        >
                            <IconGhost />
                        </div>
                        <ul
                            className={
                                styles.contact_list_item__secondary_details_list
                            }
                        >
                            <li>{contact.email}</li>
                            <li>{contact.cell}</li>
                            <li>{contact.phone}</li>
                        </ul>
                    </address>
                    <address
                        className={styles.contact_list_item__secondary_details}
                    >
                        <div
                            className={
                                iconStyles.icon_container__list_decorator
                            }
                        >
                            <IconBuilding />
                        </div>
                        <ul
                            className={
                                styles.contact_list_item__secondary_details_list
                            }
                        >
                            <li>{`${contact.location.street.number} ${contact.location.street.name}`}</li>
                            <li>{contact.location.city}</li>
                            <li>{contact.location.state}</li>
                            <li>{contact.location.postcode}</li>
                            <li>{contact.location.country}</li>
                        </ul>
                    </address>
                </section>
                <span
                    className={`${iconStyles.icon_container__chevron} ${
                        contact.isOpen
                            ? `${iconStyles.icon_container__chevron____open}`
                            : "closed"
                    }`}
                >
                    <IconChevron />
                </span>
            </li>
        );
    }
}

export default ContactListItem;
