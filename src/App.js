import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchBar';
import CityListDropdown from './components/cityListDropdown';
// import weatherJS from 'weather-js';
console.log('App this: ', this);
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: '',
            citiesList: [],
            forecast: []
        };

        console.log('constructor this: ', this);
        this.getCityList = this.getCityList.bind(this);
    }

    render() {
        return (
            <div className="App">
                {/* <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Bienvenue to Weather-React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit
                    <code> src/App.js </code>
                    and save to reload. You did it!
                </p> */}
                {/* <SearchBar /> */}
                <SearchBar onCitySearch={this.getCityList} />
                <CityListDropdown />
            </div>
        );
    }

    // gets user input into the search bar, send that city to the api
    // api will return an array of possible cities
    getCityList(city) {
        let weather = new XMLHttpRequest();
        // debugger;
        let parsedResponse;
        let citiesList;
        weather.open('GET',
            `http://api.wunderground.com/api/e65ca2760713be4f/conditions/q/${city}.json`,
            true
        );
        // Because it's async, weather.onload() doesn't fire until weather.send() completes.
        // onload = what you want to do with the request once you receive a response
        weather.onload = () => {
            console.log('weather onload!');
            parsedResponse = JSON.parse(weather.response);
            citiesList = parsedResponse.response.results;
            console.log('cl1: ', citiesList);
        }
        weather.send();
        console.log('cL2: ', citiesList);
        console.log('this gCL: ', this);
        this.setState({citiesList});
    }


    // from list of cities, user should pick which 'Austin', e.g., Austin, TX, so we make another request with a slightly different URL that includes state and city
    // you'll need another one to take the click the user selects:
    // grab the city and state of that and do another HTML request:
    getCityWeather(state, city) {
        let weather = new XMLHttpRequest();
        weather.open('GET', `http://api.wunderground.com/api/e65ca2760713be4f/conditions/q/${state}/${city}.json`);
        weather.send(null);

        let response = JSON.parse(weather.current_observation) // bunch of weather data for the present
    }

    // // once a city is selected, we can also send a request to the api for a forecast; this is a different component
    getCityForecast(state, city) {
        let weather = new XMLHttpRequest();
        weather.open('GET', `http://api.wunderground.com/api/e65ca2760713be4f/forecast/q/${state}/${city}.json`);
        weather.send(null);

        let response = JSON.parse(weather.current_observation) // not sure if I need to change the weather observation to somethiong else
    }

}

export default App;
