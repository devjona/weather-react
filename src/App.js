import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import CityWeather from './components/CityWeather';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // how will I pass city city weather to city weather component?
            cityWeather: null
        };
    }

    /*
    // THIS IS FOR GETTING A MULTI-DAY FORECAST. Once a city is selected, we can also send a request to the api for a forecast; this is a different component

    getCityForecast(location) {
        const api = `http://api.wunderground.com/api/e65ca2760713be4f/forecast/q/${state}/${city}.json`);
    }
    */

    // Can SearchBar pass some data to sibling? to CityWeather?
    render() {
        return (
            <div className="App">
                <SearchBar />
                <CityWeather
                    cityWeather={this.state.cityWeather}
                />
            </div>
        );
    }
}

export default App;
