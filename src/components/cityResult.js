import React from 'react';

const CityResult = ({city}) => {
    console.log('city: ', city);
    return <li>{city.name}, {city.state}, {city.country_iso3166}</li>
};

export default CityResult;
