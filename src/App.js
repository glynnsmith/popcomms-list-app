import React from "react";
import Async from "react-async";
import ListPage from "pages/ListPage";
import CallPage from "pages/CallPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResponseLoading from "components/Response/ResponseLoading";
import ResponseRejected from "components/Response/ResponseRejected";

// Our data endpoint, limited to the data we need
const endPoint =
    "https://randomuser.me/api?results=100&inc=name,email,location,picture,phone,cell,location&noinfo";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            aContactIsOpen: false,
            contactsCached: [],
            contactsServed: [],
            error: null,
            isLoading: false,
            contactsSortedBy: null,
        };

        // Binding this to this, so our functions affect the correct objects
        this.refreshPage = this.refreshPage.bind(this);
        this.fetchContacts = this.fetchContacts.bind(this);
        this.storeContacts = this.storeContacts.bind(this);
        this.sortContactsByFirstName = this.sortContactsByFirstName.bind(this);
        this.sortContactsByLastName = this.sortContactsByLastName.bind(this);
        this.sortContactsByCountry = this.sortContactsByCountry.bind(this);
        this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
        this.addNeededPropertiesToContactsCached = this.addNeededPropertiesToContactsCached.bind(
            this
        );
        this.checkIsOpen = this.checkIsOpen.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
    }

    addNeededPropertiesToContactsCached = () => {
        // Grabs contacts list from cache
        const oldContacts = this.state.contactsCached;
        // Creates a collection array
        let newContacts = [];

        // For every item in the cached contacts list...
        for (let i = 0; i < oldContacts.length; i++) {
            // ...adds both an isOpen and id key/value to all items...
            // ...and puts them into the collection array
            newContacts = [
                (oldContacts[i].isOpen = false),
                (oldContacts[i].id = i),
            ];
        }

        return newContacts;
    };

    checkIsOpen = () => {
        // Grabs contacts from served list
        const contacts = this.state.contactsServed;
        // Creates a collection array
        let openContacts = [];

        // For each item in our served contacts list...
        contacts.forEach((contact) => {
            // ...checks to see if it's toggled open...
            if (contact.isOpen) {
                /// ...and puts them into the collection array
                openContacts.push(contact);
            }
        });

        // If there are any open contacts collected...
        if (openContacts.length > 0) {
            // ...update state value respectively
            return this.setState({ aContactIsOpen: true });
        } else {
            return this.setState({ aContactIsOpen: false });
        }
    };

    toggleOpen = (contact) => {
        // Grabs contacts from served list
        let oldContacts = this.state.contactsServed;

        // For every item in the cached contacts list...
        for (let i = 0; i < oldContacts.length; i++) {
            // ...if we find the contact list item clicked matches one in our served list...
            if (oldContacts[i].id === contact.id) {
                // ...and if we find that item is open/expanded...
                if (oldContacts[i].isOpen) {
                    // ...toggle the element closed...
                    const isOpen = (oldContacts[i].isOpen = false);
                    this.setState({ isOpen });
                } else {
                    // ...if we find it's not open, toggle it to open
                    const isOpen = (oldContacts[i].isOpen = true);
                    this.setState({ isOpen });
                }
            }
        }
    };

    refreshPage = () => {
        window.location.reload();
    };

    fetchContacts = () => {
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
    };

    storeContacts = () => {
        return (
            // Fetches contact list data from endpoint...
            this.fetchContacts()
                .then((data) => {
                    // ...then caches it to data storage state
                    this.setState({
                        contactsCached: data.results,
                    });
                })
                .then(() => {
                    this.addNeededPropertiesToContactsCached();
                })
                // Sorts cached data by first name alphabetically, then puts new data into state for use
                .then(() => {
                    this.sortContactsByFirstName();
                })
        );
    };

    sortContactsByFirstName = () => {
        this.setState({
            // Sets served data with cached data, sorted by first name alphabetically
            contactsServed: this.state.contactsCached.sort((a, b) =>
                a.name.first.localeCompare(b.name.first)
            ),
            contactsSortedBy: "name",
        });
    };

    sortContactsByLastName = () => {
        this.setState({
            // Sets served data with cached data, sorted by last name alphabetically
            contactsServed: this.state.contactsCached.sort((a, b) =>
                a.name.last.localeCompare(b.name.last)
            ),
            contactsSortedBy: "surname",
        });
    };

    sortContactsByCountry = () => {
        this.setState({
            // Sets served data with cached data, sorted by country alphabetically
            contactsServed: this.state.contactsCached.sort((a, b) =>
                a.location.country.localeCompare(b.location.country)
            ),
            contactsSortedBy: "country",
        });
    };

    handleFilterInputChange = (event) => {
        // Variable to hold the original version of the contact list
        let currentContacts = this.state.contactsServed;

        // Variable for swapping in/out of filtered results
        let filteredContacts = [];

        // Variable to hold the contents entered into our filter text input
        let filterInputValue = event.target.value;

        // If there's something entered into the text input...
        if (
            filterInputValue !== null ||
            filterInputValue !== "" ||
            filterInputValue !== undefined
        ) {
            // ...grab the original list of contacts...
            currentContacts = this.state.contactsCached;

            // ...hydrate variable for holding filtered results, by...
            filteredContacts = currentContacts.filter((item) => {
                // ...converting current item/s and filtering term to lowercase...
                const nameFirst = item.name.first.toLowerCase();
                const nameLast = item.name.last.toLowerCase();
                const state = item.location.state.toLowerCase();
                const country = item.location.country.toLowerCase();
                const filterTerm = filterInputValue.toLowerCase();

                // ...and by returning the items that include the filter term
                return (
                    nameFirst.includes(filterTerm) ||
                    nameLast.includes(filterTerm) ||
                    state.includes(filterTerm) ||
                    country.includes(filterTerm)
                );
            });
        } else {
            // Otherwise, if text input is empty, return our original contact list
            filteredContacts = this.state.contactsCached;
        }

        // Add filtered contacts list to the actively displayed dataset
        this.setState({ contactsServed: filteredContacts });
    };

    render() {
        return (
            <main
                className={`container ${
                    this.state.aContactIsOpen ? "container____open" : ""
                }`}
            >
                {/* Asynchronously load a function */}
                <Async promiseFn={this.storeContacts}>
                    {/* Whilst asynchronous function is loading: */}
                    <Async.Loading>
                        <ResponseLoading />
                    </Async.Loading>

                    {/* If asynchronous function is successful: */}
                    <Async.Fulfilled>
                        {() => {
                            return (
                                <Router>
                                    <Switch>
                                        <Route path="/call">
                                            <CallPage />
                                        </Route>
                                        <Route path="">
                                            <ListPage
                                                contactsServed={
                                                    this.state.contactsServed
                                                }
                                                contactsSortedBy={
                                                    this.state.contactsSortedBy
                                                }
                                                getActiveContactData={
                                                    this.getActiveContactData
                                                }
                                                sortContactsByFirstName={
                                                    this.sortContactsByFirstName
                                                }
                                                sortContactsByLastName={
                                                    this.sortContactsByLastName
                                                }
                                                sortContactsByCountry={
                                                    this.sortContactsByCountry
                                                }
                                                handleFilterInputChange={
                                                    this.handleFilterInputChange
                                                }
                                                checkIsOpen={this.checkIsOpen}
                                                toggleOpen={this.toggleOpen}
                                            />
                                        </Route>
                                    </Switch>
                                </Router>
                            );
                        }}
                    </Async.Fulfilled>

                    {/* If asyncronous function fails: */}
                    <Async.Rejected>
                        {(error) => (
                            <ResponseRejected
                                refresh={this.refreshPage}
                                error={error.message}
                            />
                        )}
                    </Async.Rejected>
                </Async>
            </main>
        );
    }
}

export default App;
