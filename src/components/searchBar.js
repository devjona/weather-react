import React, { Component } from 'react'
import CityListDropdown from './CityListDropdown'

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            city: '', // do I need to set this state?
            citiesList: []
            // cityNotFound: null
        };

        this.getCityList = this.getCityList.bind(this);
    }

    // this is only letting user input change state to change the value of the input
    onInputChange(city) {
        console.log('city: ', city);
        this.setState({city});
    }

    // I'm only calling the weather API on enter key at the moment to not exceed the limit of calls per day
    // Or also # of calls per minute; limit is 10/min.
    // I can implement lodash later
    onEnterKey(event, city) {
        if (event.keyCode === 13) {
            this.getCityList(city);
        }
    }

    getCityList(city) {
        const api = `http://api.wunderground.com/api/e65ca2760713be4f/conditions/q/${city}.json`;

        // This is working :)
        const parsedResponse = () =>
            fetch(api)
            .then(response => response.json());

        parsedResponse()
            .then(response => {
                if (response.response.results) {
                    this.setState({
                        citiesList: response.response.results
                    })
                } else if (response.response.error) {
                    console.log(`in else if`);
                    this.setState({
                        cityNotFound: response.response.error.description
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <div className="searchBar">
                    <input
                        className="search-input"
                        type="text"
                        placeholder='Type a US city and press "Enter"'
                        onChange={event => this.onInputChange(event.target.value)}
                        value={this.state.city}
                        onKeyDown = {event => this.onEnterKey(event, this.state.city)}
                    />
                </div>
                <CityListDropdown
                    citiesList={this.state.citiesList}
                    // cityNotFound={this.state.cityFound}
                />
            </div>
        );
    }
}

export default SearchBar;
