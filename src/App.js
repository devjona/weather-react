import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchBar';
import CityListDropdown from './components/cityListDropdown';
import CityWeather from './components/cityWeather';

console.log('App this: ', this);
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // city: '', not used currently
            citiesList: [],
            cityWeather: null,
            // cityForeast: null also not used at the moment
        };

        console.log('constructor this: ', this);
        this.getCityList = this.getCityList.bind(this);
        this.getCityWeather = this.getCityWeather.bind(this);
        // this.getCityForecast = this.getCityForecast.bind(this);
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
            this.setState({citiesList});
        }
        weather.send();
        // console.log('cL2: ', citiesList);
        console.log('this gCL: ', this);
    }
    
    
    // from list of cities, user should pick which 'Austin', e.g., Austin, TX, so we make another request with a slightly different URL that includes state and city
    // you'll need another one to take the click the user selects:
    // grab the city and state of that and do another HTML request:
    getCityWeather(city) {
        // console.log('state: ', this.state.forecastLocation);
        // let location = this.state.forecastLocation;
        console.log('city: ', city);
        
        let parsedResponse;
        
        //http://api.wunderground.com/api/e65ca2760713be4f/conditions/q/CA/San_Francisco.json
        let weather = new XMLHttpRequest();
        weather.open('GET',
        `http://api.wunderground.com/api/e65ca2760713be4f/conditions/q/${city.state}/${city.city}.json`,
            true
        );

        weather.onload = () => {
            parsedResponse = JSON.parse(weather.response);
            // parsedResponse = weather.response;
            console.log('parsedResponse City Weather: ', parsedResponse);
            this.setState({cityWeather: parsedResponse.current_observation});
        }
        weather.send();
    }

    // // once a city is selected, we can also send a request to the api for a forecast; this is a different component
    // getCityForecast(location) {
    //     let weather = new XMLHttpRequest();
    //     weather.open('GET', `http://api.wunderground.com/api/e65ca2760713be4f/forecast/q/${state}/${city}.json`);
    //     weather.send(null);
    
    //     let response = JSON.parse(weather.current_observation) // not sure if I need to change the weather observation to somethiong else
    // }
        
    render() {
        return (
            <div className="App">
                <SearchBar onCitySearch={this.getCityList} />
                <CityListDropdown 
                    citiesList={this.state.citiesList} 
                    // you need to make the API call for city Weather when you click a city...Figure that out!
                    onCitySelect={this.getCityWeather}
                />
                <CityWeather 
                    cityWeather={this.state.cityWeather} 
                />
            </div>
        );
    }
}

export default App;
