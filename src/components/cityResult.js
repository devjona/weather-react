import React from 'react';

// When you click on a city in the results, you need to grab the city and state and pass it to App.js so it can render the forecast component.
const CityResult = (props) => {

    return (
        <li onClick={event => props.onCitySelect(event, props)}>
            {props.city}, {props.state}, {props.country}
        </li>
    )
};

export default CityResult;
