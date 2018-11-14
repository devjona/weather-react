// this isn't a class component
// import React, { Component } from 'react';
import React from 'react';
import CityResult from './cityResult'

const CityListDropdown = (props) => {

    const cityNotFound = props.cityNotFound
    const citiesList = props.citiesList.filter(city => city.country === 'US')
        .map((city) => {
            return (
                <CityResult 
                    // you are passing these props to cityResult
                    key={city.zmw}
                    city={city}
                    onCitySelect={props.onCitySelect}
                    // Add onClick event handler to hide or clear these results.
                />
            )
        }
    );

    if (!cityNotFound) {
        return (
            <div>
                <ul className="city-list-dropdown">
                    {citiesList}
                </ul>
            </div>
        )
    } else {
        return (
            <div>{cityNotFound}</div>
        )
    }
};

export default CityListDropdown;
