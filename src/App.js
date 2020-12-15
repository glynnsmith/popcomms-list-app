import React from "react";
import Async from "react-async";
import ListPage from "pages/ListPage";
import CallPage from "pages/CallPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Our data endpoint, limited to the data we need
const endPoint =
    "https://randomuser.me/api?results=100&inc=name,email,location,picture,phone,cell,location&noinfo";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            contactsCached: [],
            contactsServed: [],
            isLoading: false,
            error: null,
        };

        // Binding this to this, so our functions affect the correct objects
        this.storeContacts = this.storeContacts.bind(this);
        this.fetchContacts = this.fetchContacts.bind(this);
        this.sortContactsByFirstName = this.sortContactsByFirstName.bind(this);
        this.sortContactsByLastName = this.sortContactsByLastName.bind(this);
        this.sortContactsByCountry = this.sortContactsByCountry.bind(this);
        this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
    }

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
        });
    };

    sortContactsByLastName = () => {
        this.setState({
            // Sets served data with cached data, sorted by last name alphabetically
            contactsServed: this.state.contactsCached.sort((a, b) =>
                a.name.last.localeCompare(b.name.last)
            ),
        });
    };

    sortContactsByCountry = () => {
        this.setState({
            // Sets served data with cached data, sorted by country alphabetically
            contactsServed: this.state.contactsCached.sort((a, b) =>
                a.location.country.localeCompare(b.location.country)
            ),
        });
    };

    handleFilterInputChange = (event) => {
        console.log("Hi");
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
            <main className="container">
                {/* Asynchronously load a function */}
                <Async promiseFn={this.storeContacts}>
                    {/* Whilst asynchronous function is loading: */}
                    <Async.Loading>
                        <h1>Fetching contact data...</h1>
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
                                            />
                                        </Route>
                                    </Switch>
                                </Router>
                            );
                        }}
                    </Async.Fulfilled>

                    {/* If asyncronous function fails: */}
                    <Async.Rejected>
                        {(error) =>
                            `There was an error fetching the required contact list data: ${error} - fetching data from this server can sometimes trigger a CORS error`
                        }
                    </Async.Rejected>
                </Async>
            </main>
        );
    }
}

export default App;
