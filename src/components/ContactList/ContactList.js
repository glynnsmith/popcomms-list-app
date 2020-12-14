import React from "react";
import Async from "react-async";

// Our data endpoint, limited to the data we need
const endPoint =
    "https://randomuser.me/api?results=100&inc=name,email,location,picture,phone,cell,location&noinfo";

class ContactList extends React.Component {
    constructor() {
        super();

        // Sets up the required state for this component, to be populated later
        this.state = {
            usersCached: [],
            usersServed: [],
            isLoading: false,
            error: null,
        };

        // Binding this to this, so our functions affect the correct objects
        this.storeUsers = this.storeUsers.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.sortUsersByFirstName = this.sortUsersByFirstName.bind(this);
        this.sortUsersByLastName = this.sortUsersByLastName.bind(this);
        this.sortUsersByCountry = this.sortUsersByCountry.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onItemClickHandler = this.onItemClickHandler.bind(this);
    }

    fetchUsers() {
        // Asynchronously attempts to fetch data from the json endpoint
        return (
            fetch(endPoint)
                // Checks the data can be fetched, and holds it as a promise. If fetch fails, is rejected and handled later with Async
                .then((response) =>
                    response.ok ? response : Promise.reject(response)
                )
                // Parses the promise into readable json
                .then((response) => response.json())
        );
    }

    storeUsers() {
        return (
            // Fetches user data from endpoint...
            this.fetchUsers()
                .then((data) => {
                    // ...then caches it to data storage state
                    this.setState({
                        usersCached: data.results,
                    });
                })
                // Sorts cached data by first name alphabetically, then puts new data into state for use
                .then(() => {
                    this.sortUsersByFirstName();
                })
        );
    }

    sortUsersByFirstName() {
        this.setState({
            // Sets served data with cached data, sorted by first name alphabetically
            usersServed: this.state.usersCached.sort((a, b) =>
                a.name.first.localeCompare(b.name.first)
            ),
        });
    }

    sortUsersByLastName() {
        this.setState({
            // Sets served data with cached data, sorted by last name alphabetically
            usersServed: this.state.usersCached.sort((a, b) =>
                a.name.last.localeCompare(b.name.last)
            ),
        });
    }

    sortUsersByCountry() {
        this.setState({
            // Sets served data with cached data, sorted by country alphabetically
            usersServed: this.state.usersCached.sort((a, b) =>
                a.location.country.localeCompare(b.location.country)
            ),
        });
    }

    handleChange(event) {
        // Variable to hold the original version of the list
        let currentUsers = this.state.usersServed;

        // Variable for swapping in/out of filtered results
        let filteredUsers = [];

        // Variable to hold the contents entered into our text input
        let inputValue = event.target.value;

        // If there's something entered into the text input...
        if (
            inputValue !== null ||
            inputValue !== "" ||
            inputValue !== undefined
        ) {
            // ...grab the original list of users...
            currentUsers = this.state.usersCached;

            // ...hydrate variable for holding filtered results, by...
            filteredUsers = currentUsers.filter((item) => {
                // ...converting current item/s and filtering term to lowercase...
                const nameFirst = item.name.first.toLowerCase();
                const nameLast = item.name.last.toLowerCase();
                const state = item.location.state.toLowerCase();
                const country = item.location.country.toLowerCase();
                const filterTerm = inputValue.toLowerCase();

                // ...and by returning the items that include the filter term
                return (
                    nameFirst.includes(filterTerm) ||
                    nameLast.includes(filterTerm) ||
                    state.includes(filterTerm) ||
                    country.includes(filterTerm)
                );
            });
        } else {
            // Otherwise, if text input is empty, return our original userlist
            filteredUsers = this.state.usersCached;
        }

        // Add filtered users to the actively displayed dataset
        this.setState({ usersServed: filteredUsers });
    }

    onItemClickHandler() {
        console.log(this);
    }

    render() {
        return (
            <div className="container">
                <button onClick={this.sortUsersByFirstName}>First Name</button>
                <button onClick={this.sortUsersByLastName}>Last Name</button>
                <button onClick={this.sortUsersByCountry}>Country Name</button>

                <input
                    type="text"
                    onChange={this.handleChange}
                    placeholder="Filter contacts..."
                />

                <span> - Showing: {this.state.usersServed.length}</span>

                <Async promiseFn={this.storeUsers}>
                    <Async.Loading>
                        <h1>Fetching user data...</h1>
                    </Async.Loading>
                    <Async.Fulfilled>
                        {() => {
                            return (
                                <ul>
                                    {this.state.usersServed.map((user) => (
                                        <li
                                            key={
                                                user.name.first + user.name.last
                                            }
                                            onClick={this.onItemClickHandler}
                                        >
                                            <div>
                                                <img
                                                    src={user.picture.thumbnail}
                                                    alt={`${user.name.first} ${user.name.last}`}
                                                />
                                                <span>
                                                    {` - ${user.name.first} ${user.name.last} - `}
                                                    <a href={user.email}>
                                                        {user.email}
                                                    </a>
                                                    {` - ${user.location.state}, ${user.location.country}`}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            );
                        }}
                    </Async.Fulfilled>
                    <Async.Rejected>
                        {(error) =>
                            `There was an error fetching the required user
                                data: ${error} - fetching data from this server can sometimes trigger a CORS error`
                        }
                    </Async.Rejected>
                </Async>
            </div>
        );
    }
}

export default ContactList;
