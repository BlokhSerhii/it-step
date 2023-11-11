import React, { useState, useEffect } from 'react';
import WeatherComponent from '../WeatherComponent/WeatherComponent';
import '../main.css';

const SearchComponent = ({ textColor, backgroundColor }) => {

  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [submitCity, setSubmitCity] = useState('');
  const [recentCities, setRecentCities] = useState([]);
  const [favoriteCity, setFavoriteCity] = useState(localStorage.getItem('favoriteCity') || '');

  const citiesLimit = 3;

  useEffect(() => {
    
    const storedCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    setRecentCities(storedCities.slice(0, citiesLimit));
  }, []);

  const handleSubmit = (e) => {
    
    e.preventDefault();

    setSubmitCity(cityName);
    setCountryName(countryName);
  };

  const addToRecentCities = (city, country) => {

    const cityWithCountry = `${city}, ${country}`;

    if (!recentCities.includes(cityWithCountry)) {
      const updatedRecentCities = [cityWithCountry, ...recentCities].slice(0, citiesLimit);
      setRecentCities(updatedRecentCities);
      localStorage.setItem('recentCities', JSON.stringify(updatedRecentCities));
    }
  };

  const handleAddToFavorites = () => {
    
    if (cityName && countryName) {

      const favoriteCity = `${cityName}, ${countryName}`;

      setFavoriteCity(favoriteCity);
      localStorage.setItem('favoriteCity', favoriteCity);
    }
  };

  return (
    <div>
      <div className='col'>
        <form onSubmit={handleSubmit} className='searchCity'>
          <label htmlFor='city-name'><span>Місто:</span></label>  
          <input
            id='city-name'
            type="text"
            placeholder="Назва міста"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <input
            id='country-name'
            type="text"
            placeholder="Код країни"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
          <button onClick={handleAddToFavorites}>Add to favorite</button>
          <button type="submit">Search weather</button>
          {favoriteCity && <p><span onClick={() => {
                const cityParts = favoriteCity.split(', ');
                if (cityParts.length === 2) {
                  setSubmitCity(cityParts[0]);
                  setCountryName(cityParts[1]);
                }
              }}>{favoriteCity}</span></p>}
          <ul>
            {recentCities.map(city => (
              <li key={city} onClick={() => {
                const cityParts = city.split(', ');
                if (cityParts.length === 2) {
                  setSubmitCity(cityParts[0]);
                  setCountryName(cityParts[1]);
                }
              }}>
                <span>{city}</span>
              </li>
            ))}
          </ul>
        </form>
      </div>
      {submitCity && countryName && (
        <WeatherComponent 
        city={submitCity} 
        country={countryName} 
        textColor={textColor}
        backgroundColor={backgroundColor}
        addToRecentCities={addToRecentCities}
        />)}
    </div>
  );
};

export default SearchComponent;