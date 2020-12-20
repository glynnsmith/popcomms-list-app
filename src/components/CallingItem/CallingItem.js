import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as IconPhone } from "icons/icon_phone.svg";
import styles from "components/CallingItem/CallingItem.module.scss";
import iconStyles from "icons/icons.module.scss";

function CallingItem() {
    const contact = useLocation().state.contactData;

    return (
        <div className={styles.calling_item}>
            <img
                className={styles.calling_item__image}
                src={contact.picture.large}
                alt={`${contact.name.first} ${contact.name.last}`}
            />
            <div className={styles.calling_item__image_overlay}></div>

            <div className={styles.calling_item__secondary}>
                <Link
                    to="/"
                    className={`${iconStyles.icon_container__phone} ${iconStyles.icon_container__phone____hangup}`}
                >
                    <IconPhone />
                </Link>
                <div className={styles.calling_item__details}>
                    <p
                        className={styles.calling_item__details_name}
                    >{`${contact.name.first} ${contact.name.last}`}</p>
                    <p className={styles.calling_item__details_status}>
                        Calling...
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CallingItem;
