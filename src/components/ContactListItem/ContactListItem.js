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

        // Set initial state of this component to closed
        this.state = {
            componentIsOpen: false,
        };

        // Binding this to this, so our functions affect the correct objects
        this.handleContactItemClick = this.handleContactItemClick.bind(this);
    }

    handleContactItemClick = () => {
        // Set open state of this component
        this.setState({ componentIsOpen: !this.state.componentIsOpen });
    };

    render() {
        const contact = this.props.contact;

        return (
            <li
                key={contact.key}
                onClick={this.handleContactItemClick}
                className={`${styles.contact_list_item} ${
                    this.state.componentIsOpen ? `${styles.open}` : "closed"
                }`}
            >
                <section className={styles.contact_list_item__primary}>
                    <div className={styles.contact_list_item__image_container}>
                        <img
                            src={contact.picture.medium}
                            alt={`${contact.name.first} ${contact.name.last}`}
                        />
                    </div>
                    <div className={styles.contact_list_item__primary_details}>
                        <Link
                            to={{
                                pathname: "/call",
                                state: { contactData: contact },
                            }}
                            className={`${iconStyles.icon_container__phone} ${
                                iconStyles.icon_container__phone____call
                            } ${
                                this.state.componentIsOpen
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
                        this.state.componentIsOpen
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
