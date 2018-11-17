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
            citiesList: [],
            cityWeather: null,
            cityNotFound: null
            // city: '', not used currently
            // cityForeast: null also not used at the moment
        };

        console.log('constructor this: ', this);
        this.getCityList = this.getCityList.bind(this);
        this.getCityWeather = this.getCityWeather.bind(this);
        // this.apiCall = this.apiCall.bind(this);
        // this.getCityForecast = this.getCityForecast.bind(this);
    }

    // I only want to write this function once and call it inside of others but I'm having a scope issue...
    apiCall(api) {
        fetch(api)
            .then(res => res.json());
    }
    // gets user input into the search bar, send that city to the api
    // api will return an array of possible cities
    getCityList(city) {
        /* 
        1 Call the weather API
        2 Parse the response
        3 Check the response to see if you're getting a list of cities (results) or an error
        4 Based upon that, you can setState with either the results or the error message
        */
        
        const api = `http://api.wunderground.com/api/e65ca2760713be4f/conditions/q/${city}.json`;

        // This is working :)
        const parsedResponse = () => 
            fetch(api)
                .then(response => response.json());

        parsedResponse()
            .then(response => {
                if (response.response.results) {
                    this.setState({
                        citiesList: response.response.results.filter(city => city.country === 'US')
                    })
                } else if (response.response.error) {
                    console.log(`in else if`);
                    this.setState({
                        cityNotFound: response.response.error.description
                    })
                }
            })
    }

    // from list of cities, user should pick which 'Austin', e.g., Austin, TX, so we make another request with a slightly different URL that includes state and city
    // you'll need another one to take the click the user selects:
    // grab the city and state of that and do another HTML request:
    getCityWeather(city) {
        const api = `http://api.wunderground.com/api/e65ca2760713be4f/conditions/q/${city.state}/${city.city}.json`

        const parsedResponse = () =>
            fetch(api)
                .then(response => response.json());

        parsedResponse()
            .then(response => {
                if (response.current_observation) {
                    this.setState({
                        cityWeather: response.current_observation
                    })
                }
            })
    }
    
    /* 
    // THIS IS FOR GETTING A MULTI-DAY FORECAST. Once a city is selected, we can also send a request to the api for a forecast; this is a different component

    getCityForecast(location) {
        const api = `http://api.wunderground.com/api/e65ca2760713be4f/forecast/q/${state}/${city}.json`);
    } 
    */
        
    render() {
        return (
            <div className="App">
                <SearchBar onCitySearch={this.getCityList} />
                <CityListDropdown 
                    citiesList={this.state.citiesList} 
                    cityNotFound={this.state.cityNotFound}
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
