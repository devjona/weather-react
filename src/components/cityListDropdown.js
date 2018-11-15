import React, { Component } from 'react'
import CityResult from './CityResult'

class CityListDropdown extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
        this.getCityWeather = this.getCityWeather.bind(this)
    }

    clickHandler(event, props) {
        console.log('clickHandler() event:', event.type)
        console.log('clickHandler() props: ', props)
        this.getCityWeather(props)
    }

    // any methods you need
    getCityWeather(city) {
        console.log('getCityWeather args: ', city)
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

    render() {
        const citiesList = this.props.citiesList.filter(city => city.country === 'US')
            .map((city) => {
                return (
                    <CityResult
                        // you are passing these props to cityResult
                        key={city.zmw}
                        city={city.city}
                        state={city.state}
                        country={city.country_iso3166}
                        onCitySelect={event => this.clickHandler(event, city)}
                        // Add onClick event handler to hide or clear these results.
                    />
                )
            }
        );

        return (
            <div>
                <ul className="city-list-dropdown">
                    {citiesList}
                </ul>
            </div>
        )
    }
}

export default CityListDropdown;
