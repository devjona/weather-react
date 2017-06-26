import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = { city: ''};
    }

    render() {
        return (
            <div className="searchBar">
                <input
                    placeholder="Enter a city to get the weather forecast!"
                    value={this.state.city}
                    onChange={event => this.onInputChange(event.target.value)}
                />
            </div>
        )
    }

    onInputChange(city) {
        this.setState({city});
        this.props.onCitySearch(city);
    }
}

export default SearchBar;
