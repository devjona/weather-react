import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            city: ''
        };
    }

    onInputChange(city) {
        console.log('city: ', city);
        this.setState({city});
    }
    
    // I'm only calling the weather API on enter key at the moment to not exceed the limit of calls per day
    // Or also # of calls per minute; limit is 10/min.
    // I can implement lodash later
    onEnterKey(event, city) {
        if (event.keyCode === 13) {
            // when you pass parameter to the property, that parameter is passed to the function which is the value of that property:
            this.props.onCitySearch(city)
        }
    }

    render() {
        return (
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
        )
    }
}

export default SearchBar;
