// this isn't a class component
// import React, { Component } from 'react';
import React from 'react';
import CityResult from './cityResult'

const CityListDropdown = (props) => {
    console.log('PROPS cL: ', props);

    const citiesList = props.citiesList.map((city) => {
        return (
            <CityResult 
                // you are passing these props to cityResult
                key={city.zmw}
                city={city}
                onCitySelect={props.onCitySelect}
                // Add onClick event handler to hide or clear these results.
            />
        )
    });

    return (
        <div>
            <ul className="city-list-dropdown">
                {citiesList}
            </ul>
        </div>
    )
};

export default CityListDropdown;
