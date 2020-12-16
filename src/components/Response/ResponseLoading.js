import React from "react";
import styles from "components/Response/Response.module.scss";
import iconStyles from "icons/icons.module.scss";
import { ReactComponent as IconLoading } from "icons/icon_loading.svg";

function ResponseLoading() {
    return (
        <div className={styles.response_container}>
            <div className={iconStyles.icon_container__loading}>
                <IconLoading />
            </div>
            <p>Fetching contact data...</p>
        </div>
    );
}

export default ResponseLoading;
