import React from 'react'
// This will display the forecast data, direct child of App.js
const CityWeather = ({cityWeather}) => {
    if (!cityWeather) {
        return <div>Waiting for your weather search...</div>
    }
    if (cityWeather === 'searching') {
        return <div>Fetching your weather info...</div>
    }
    const cityName = cityWeather.location.name
    const temp = cityWeather.current.temp_c
    const humidity = cityWeather.current.humidity
    const windDir = cityWeather.current.wind_dir
    const feelsLike = cityWeather.current.feelslike_c
    
    return (
        <div className="current-weather-container">
            <div className="weather-data">Location:</div>
            <div className="weather-data">{cityName}</div>
            <div className="weather-data">Temperature:</div>
            <div className="weather-data">{temp}</div>
            <div className="weather-data">Humidity:</div>
            <div className="weather-data">{humidity}</div>
            <div className="weather-data">Feels Like:</div>
            <div className="weather-data">{feelsLike}</div>
            <div className="weather-data">Wind Direction:</div>
            <div className="weather-data">{windDir}</div>
        </div>
    )
}

export default CityWeather;