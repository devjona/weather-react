import React from 'react';

// When you click on a city in the results, you need to grab the city and state and pass it to App.js so it can render the forecast component.
const CityResult = ({city, onCitySelect}) => {
    return (
        <li onClick={() => onCitySelect(city)}>
            {city.name}, {city.state}, {city.country_iso3166}
        </li>
    )
};

export default CityResult;
