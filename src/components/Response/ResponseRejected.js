import React from "react";
import styles from "components/Response/Response.module.scss";

class ResponseRejected extends React.Component {
    render() {
        const { error, refresh } = this.props;

        return (
            <div className={styles.response_container}>
                <p>
                    There was an error fetching the required contact list data.
                </p>
                <code>Error: {error}.</code>
                <p>
                    Fetching data from this server can sometimes trigger a
                    cross-origin resource sharing (CORS) error - more details
                    can be found{" "}
                    <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors">
                        here
                    </a>
                    .
                </p>

                <button className={styles.response__button} onClick={refresh}>
                    Retry
                </button>
            </div>
        );
    }
}

export default ResponseRejected;
