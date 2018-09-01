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
        // this.getCityForecast = this.getCityForecast.bind(this);
    }

    
    // gets user input into the search bar, send that city to the api
    // api will return an array of possible cities
    getCityList(city) {
        // debugger;
        let parsedRequest;
        let citiesList;
        // const api = `http://api.wunderground.com/api/e65ca2760713be4f/conditions/q/${city}.json`;

        // We are going to replace this call with fetch()
        /* 
        1 Call the weather API
        2 Parse the response
        3 Check the response to see if you're getting a list of cities (results) or an error
        4 Based upon that, you can setState with either the results or the error message
        */

        // fetch(api)
        //     .then(response => response.json())
        //     .then(parsedResponse => {
        //         console.log(`res: ${parsedResponse.response}`);
        //         console.log(`this: ${this}`);
                
                
        //         if (parsedResponse.results) {
        //                 citiesList = parsedRequest.response.results;
        //                 this.setState({citiesList})
        //         } else if (parsedResponse.response.error) {
        //             console.log(`in else if`);
                    
        //             return parsedResponse.response.error.description
        //         }
        //     })

        // I need to handle the response. Should I have a helper function I pass to a .then()?

        // Forget almost everything below this line except for when you are setting state

        let request = new XMLHttpRequest();
        request.open('GET',
        `http://api.wunderground.com/api/e65ca2760713be4f/conditions/q/${city}.json`,
        true
        );
        // Because it's async, request.onload() doesn't fire until request.send() completes.
        // onload = what you want to do with the request once you receive a response
        request.onload = () => {
            console.log('request onload!');
            console.log(`request!: ${request}`);
            
            if (request.response) {

                parsedRequest = JSON.parse(request.response);
                console.log(`parsedRequest: ${parsedRequest}`);
                
            }
            // this is really ugly error handling but this is what comes before using promises and fetch...
            if (parsedRequest.response.results) {

                citiesList = parsedRequest.response.results;
                console.log('cl1: ', citiesList);
                this.setState({citiesList});
            } else {
                console.log(`no results, only errors. State doesn't change. Page doesn't refresh.`);
                this.setState({
                    cityNotFound: parsedRequest.response.error.description
                })
                
            
            }
        }
        
        request.send();
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
        
        let parsedRequest;
        
        //http://api.wunderground.com/api/e65ca2760713be4f/conditions/q/CA/San_Francisco.json
        let request = new XMLHttpRequest();
        request.open('GET',
        `http://api.wunderground.com/api/e65ca2760713be4f/conditions/q/${city.state}/${city.city}.json`,
            true
        );

        request.onload = () => {
            parsedRequest = JSON.parse(request.response);
            // parsedRequest = request.response;
            console.log('parsedRequest City Weather: ', parsedRequest);
            this.setState({cityWeather: parsedRequest.current_observation});
        }
        request.send();
    }

    // // once a city is selected, we can also send a request to the api for a forecast; this is a different component
    // getCityForecast(location) {
    //     let request = new XMLHttpRequest();
    //     request.open('GET', `http://api.wunderground.com/api/e65ca2760713be4f/forecast/q/${state}/${city}.json`);
    //     request.send(null);
    
    //     let response = JSON.parse(request.current_observation) // not sure if I need to change the weather observation to somethiong else
    // }
        
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
