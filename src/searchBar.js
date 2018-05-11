import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            city: '',
            cityEntered: ''
        };
    }

    render() {
        return (
            <div className="searchBar">
                <input
                    placeholder="Enter a city to get the weather forecast!"
                    onChange={event => this.onInputChange(event.target.value)}
                    value={this.state.city}
                    // event handler for when 'enter' is pressed
                    onKeyDown = {event => this.onEnterKey(event, event.target.value)}
                />
            </div>
        );
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
            console.log('event: ', event);
            console.log('city: ', city);
            this.setState({cityEntered: city});
            this.props.onCitySearch(city);
        }
    }
}

export default SearchBar;
