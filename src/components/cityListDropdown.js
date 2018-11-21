import React from 'react';
import CityResult from './cityResult'

const CityListDropdown = (props) => {

    const cityFound = props.cityFound
    const citiesList = props.citiesList
        .map((city) => {
            return (
                <CityResult 
                    // you are passing these props to cityResult
                    key={city.zmw}
                    city={city}
                    onCitySelect={props.onCitySelect}
                />
            )
        }
    );

    const cityListDropdownClasses = `city-list-dropdown ${props.cityListDisplay}`

    if (cityFound === true) {
        return (
            <div className={cityListDropdownClasses}>
                <ul>
                    {citiesList}
                </ul>
            </div>
        )
    } else {
        return (
            <div>{cityFound}</div>
        )
    }
};

export default CityListDropdown;
