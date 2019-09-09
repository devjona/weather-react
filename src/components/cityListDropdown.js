import React from 'react';
import CityResult from './cityResult'

const CityListDropdown = (props) => {

    const resultsForSearchTerm = props.resultsForSearchTerm
    const noResultsMsg = props.noResultsMsg
    const citiesList = props.citiesList
        .map((city) => {
            return (
                // Just return the JSX from cityResult in here; you don't need another component, do you?
                <CityResult 
                    // you are passing these props to cityResult
                    key={city.id}
                    name={city.name}
                    lat={city.lat}
                    lon={city.lon}
                    onCitySelect={props.onCitySelect}
                />
            )
        }
    );

    if (resultsForSearchTerm === true) {
        return (
            // <div className={cityListDropdownClasses}>
            <div className="city-list-dropdown">
                <ul className="city-list">
                    {citiesList}
                </ul>
            </div>
        )
    } else {
        // return null; I was doing this but I'd like to return an error message
        return (
            // You can also return a different kind of component that looks more like an error message box!
            <div className="city-list-dropdown">
                {noResultsMsg}
            </div>
        )
    }
};

export default CityListDropdown;
