import React from 'react';
// This will display the forecast data, direct child of App.js
const CityWeather = ({cityWeather}) => {
    if (!cityWeather) {
        return <div>Waiting for your weather search...</div>
    }
    const temp = cityWeather.temperature_string;
    const cityFull = cityWeather.observation_location.full;

    console.log('cityWeather file');

    
    return (
        <ul>
            <p>Forecast</p>
            <p>Location: {cityFull}</p>
            <p>Temperature: {temp}</p>
        </ul>

    )
}

export default CityWeather;