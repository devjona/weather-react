import React from 'react';
// This will display the forecast data, direct child of App.js
const CityWeather = ({cityWeather}) => {
    if (!cityWeather) {
        return <div>Waiting for your weather search...</div>
    }
    const temp = cityWeather.temperature_string;
    const cityFull = cityWeather.observation_location.full;
    const humidity = cityWeather.relative_humidity;
    const windDir = cityWeather.wind_dir;
    const feelsLike = cityWeather.feelslike_string;
    
    return (
        <ul>
            <p>Forecast</p>
            <p>Location: {cityFull}</p>
            <p>Temperature: {temp}</p>
            <p>Humidity: {humidity}</p>
            <p>Feels Like: {feelsLike}</p>
            <p>Wind Direction: {windDir}</p>
        </ul>
    )
}

export default CityWeather;