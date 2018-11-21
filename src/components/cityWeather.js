import React from 'react'
// This will display the forecast data, direct child of App.js
const CityWeather = ({cityWeather}) => {
    if (!cityWeather) {
        return <div>Waiting for your weather search...</div>
    }
    if (cityWeather === 'searching') {
        return <div>Fetching your weather info...</div>
    }
    const temp = cityWeather.temperature_string
    const cityFull = cityWeather.observation_location.full
    const humidity = cityWeather.relative_humidity
    const windDir = cityWeather.wind_dir
    const feelsLike = cityWeather.feelslike_string
    
    return (
        <ul className="current-weather">
            <li>Forecast</li>
            <li>Location: {cityFull}</li>
            <li>Temperature: {temp}</li>
            <li>Humidity: {humidity}</li>
            <li>Feels Like: {feelsLike}</li>
            <li>Wind Direction: {windDir}</li>
        </ul>
    )
}

export default CityWeather;