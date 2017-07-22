import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './searchBar';
// import weatherJS from 'weather-js';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: '',
            forecast: []
        };
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Bienvenue to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit
                    <code>src/App.js</code>
                    and save to reload. You did it!
                </p>
                {/* <SearchBar /> */}
                <SearchBar onCitySearch={this.getCityList} />
            </div>
        );
    }

    // gets user input into the search bar, send that city to the api
    // api will return an array of possible cities
    getCityList(city) {
        let weather = new XMLHttpRequest();
        weather.open('GET',
            `http://api.wunderground.com/api/e65ca2760713be4f/conditions/q/${city}.json`,
            true
        );

        console.log('weather 1: ', weather);

        weather.onload = function(e) {
            if (weather.readyState === 4) {
                if (weather.status === 200) {
                    console.log('weather 2: ', weather);
                    // typeof weather is object. typeof weather.response is string; parse it!
                    let responseParsed = JSON.parse(weather.response);
                    console.log('responseParsed.res: ', responseParsed.response.results);
                }
            }

        };
        weather.send(null);
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

    // once a city is selected, we can also send a request to the api for a forecast; this is a different component
    getCityForecast(state, city) {
        let weather = new XMLHttpRequest();
        weather.open('GET', `http://api.wunderground.com/api/e65ca2760713be4f/forecast/q/${state}/${city}.json`);
        weather.send(null);

        let response = JSON.parse(weather.current_observation) // not sure if I need to change the weather observation to somethiong else
    }

}

export default App;
