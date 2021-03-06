import React, {Component} from 'react'
// import logo from './logo.svg'
import './App.css'
import SearchBar from './components/searchBar'
import CityListDropdown from './components/cityListDropdown'
import CityWeather from './components/cityWeather'

console.log('App this: ', this)
class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            citiesList: [],
            cityWeather: null,
            cityFound: null,
            cityListDisplay: null
        }

        console.log('constructor this: ', this)
        this.getCityList = this.getCityList.bind(this)
        this.getCityWeather = this.getCityWeather.bind(this)
        // this.toggleCityListDisplay = this.toggleCityListDisplay.bind(this)
        this.cityClickHandler = this.cityClickHandler.bind(this)
        this.searchEnterHandler = this.searchEnterHandler.bind(this)
        // this.apiCall = this.apiCall.bind(this);
        // this.getCityForecast = this.getCityForecast.bind(this)
    }

    // I only want to write this function once and call it inside of others but I'm having a scope issue...
    apiCall(api) {
        fetch(api)
            .then(res => res.json())
    }
    
    /*
    cityClickHandler() and searchEnterHandler() seems repetitive but, alas, I'm learning.
    Any suggestions are welcome here!
    */
   
   // EVERY TIME you click on a city in the list dropdown, state in App needs to change so you can tell cityListDropdown to hide
   cityClickHandler(city) {
    //    this.toggleCityListDisplay('hide')
       this.setState({
           cityListDisplay: 'hide',
           cityWeather: 'searching'
       })
       this.getCityWeather(city)
    }
    
    // EVERY TIME you press enter, state in App needs to change so you can tell cityListDropdown to show.
    // Also, in case the search result is bad, you need to toggle the current weather to null, so we don't show that div, until we have new search results.
    searchEnterHandler(city) {
        this.setState({cityWeather: null})
        this.getCityList(city)
    }
    
    /*
    Leave this here just for memory's sake or in case you need to return to using this helper function leveraged by other helper functions (the enter and click event handler helpers)

    toggleCityListDisplay(displayAction) {
        this.setState({
            cityListDisplay: displayAction
        })
    }
    */

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
                .then(response => response.json())

        parsedResponse()
            .then(response => {
                if (response.response.results) {
                    this.setState({
                        citiesList: response.response.results
                            .filter(city => city.country === 'US'),
                        cityFound: true,
                        cityListDisplay: 'show'
                    })
                } else if (response.response.error) {
                    console.log(`in else if`)
                    this.setState({
                        cityFound: response.response.error.description
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
                .then(response => response.json())

        parsedResponse()
            .then(response => {
                if (response.current_observation) {
                    this.setState({
                        cityWeather: response.current_observation,
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
                <SearchBar 
                    onCitySearch={this.searchEnterHandler}
                />
                <CityListDropdown 
                    citiesList={this.state.citiesList} 
                    cityFound={this.state.cityFound}
                    onCitySelect={this.cityClickHandler}
                    cityListDisplay={this.state.cityListDisplay}
                />
                <CityWeather 
                    cityWeather={this.state.cityWeather} 
                />
            </div>
        )
    }
}

export default App
