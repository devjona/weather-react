import React from 'react';

// When you click on a city in the results, you need to grab the city and state and pass it to App.js so it can render the forecast component.
// This doesn't need to be its own component. It's just JSX. Put it back into cityListDropdown
const CityResult = ({name, lat, lon, onCitySelect}) => {
    return (
        <li onClick={() => onCitySelect(name)}>
            {name}, {lat}, {lon}
        </li>
    )
};

export default CityResult;
