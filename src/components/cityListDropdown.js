// import React, { Component } from 'react';
import React from 'react';
import CityResult from './cityResult'

const CityListDropdown = (props) => {
    console.log('PROPS cL: ', props);

    const citiesList = props.citiesList.map((city) => {
        return <CityResult key={city.zmw} city={city} />
    });

    return (
        <ul className="city-list-dropdown">
            {citiesList}
        </ul>
    )

};

export default CityListDropdown;
