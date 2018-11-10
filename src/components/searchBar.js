import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            city: '' // do I need to set this state?
        };
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
            // this.setState({cityEntered: city});
            // when you pass paramter to the property, that parameter is passed to the function which is the value of that property:
            // console.log looks like this: onCitySearch: function getCityList()
            this.props.onCitySearch(city);
        }
    }

    render() {
        return (
            <div className="searchBar">
                <input
                    className="search-input"
                    type="text"
                    placeholder='Type a US city and press "Enter"'
                    // onChange calls onInputChange which sets the state
                    onChange={event => this.onInputChange(event.target.value)}
                    // the value of the field is whatever the state is
                    value={this.state.city}
                    // event handler for when 'enter' is pressed
                    // onKeyDown = {event => this.onEnterKey(event, event.target.value)} // do I need to grab this from event or can I grab from state?
                    onKeyDown = {event => this.onEnterKey(event, this.state.city)}
                />
            </div>
        );
    }
}

export default SearchBar;
