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
        this.cityClickHandler = this.cityClickHandler.bind(this)
        this.searchEnterHandler = this.searchEnterHandler.bind(this)
    }

    /*
    cityClickHandler() and searchEnterHandler() seems repetitive but, alas, I'm learning.
    Any suggestions are welcome here!
    */
   
   // EVERY TIME you click on a city in the list dropdown, state in App needs to change so you can tell cityListDropdown to hide
   cityClickHandler(city) {
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
    

    getCityList(city) {
        /* 
        1 Call the weather API
        2 Parse the response
        3 Check the response to see if you're getting a list of cities (results) or an error
        4 Based upon that, you can setState with either the results or the error message
        */
        
        const api = `http://api.apixu.com/v1/search.json?key=416ca72bdb9f4e95a2c153646190909&q=${city}`;

        const parsedResponse = () => 
            fetch(api)
                .then(response => response.json())
        console.info(parsedResponse)

        parsedResponse()
            .then(response => {
                if (response.length > 0) {
                    this.setState({
                        citiesList: response,
                        cityFound: true,
                        cityListDisplay: 'show'
                    })
                } else if (response.length == 0) {
                    console.log(`in else if`)
                    this.setState({
                        cityFound: `No results were found for ${city}`
                    })
                }
            })
    }

    // from list of cities, user should pick which 'Austin', e.g., Austin, TX, so we make another request with a slightly different URL that includes state and city
    // you'll need another one to take the click the user selects:
    // grab the city and state of that and do another HTML request:
    getCityWeather(city) {
        const api = `http://api.apixu.com/v1/current.json?key=416ca72bdb9f4e95a2c153646190909&q=${city}`

        const parsedResponse = () =>
            fetch(api)
                .then(response => response.json())

        parsedResponse()
            .then(response => {
                if (response.current) {
                    this.setState({
                        cityWeather: response
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
                <div className="search-container">
                    <SearchBar 
                        onCitySearch={this.searchEnterHandler}
                    />
                    <CityListDropdown 
                        citiesList={this.state.citiesList} 
                        cityFound={this.state.cityFound}
                        onCitySelect={this.cityClickHandler}
                        cityListDisplay={this.state.cityListDisplay}
                    />
                </div>
                <div className="weather-container">
                    <CityWeather 
                        cityWeather={this.state.cityWeather} 
                    />
                </div>
            </div>
        )
    }
}

export default App
