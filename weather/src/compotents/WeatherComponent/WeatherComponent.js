import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FaTint, FaSun, FaCloud, FaCloudSun, FaCloudShowersHeavy, FaBolt, FaSnowflake, FaWind } from 'react-icons/fa';
import { TiWeatherSnow, TiWeatherShower, TiWeatherStormy, TiWeatherPartlySunny } from 'react-icons/ti';
import '../main.css';

import axios from 'axios';

const API_KEY = '67194cf5672b88e2ac0fb7c869cffc04';

const WeatherComponent = ({ city, country, textColor, backgroundColor, addToRecentCities, addToFavorites }) => {

  const [weatherData, setWeatherData] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('metric');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchWeather = async () => {
        
      if (!city || !country || country.length !== 2) {
        return;
      } 

      if (country.length > 2) {
        setWeatherData(null);
        return;
      } 
       
      setWeatherData(null);
      setError(null);
      setLoading(true);

      try {

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&lang=ua&appid=${API_KEY}&units=${temperatureUnit}`)

        setWeatherData(response.data);
        setLoading(false);
        addToRecentCities(city, country);
      } 
      catch (error) {

        console.log('Помилка надсилання запиту:', error);
        setError('Помилка при отриманні погоди. Спробуйте ще раз або перевірте правильність назви міста та коду країни.');
        setLoading(false);
      }
    };

  useEffect(() => {

    if (city && country) {
      fetchWeather();
    }
  }, [city, country, temperatureUnit]);

  const handleUnitChange = (newUnit) => {
    setTemperatureUnit(newUnit);
  };

  const groupWeatherByDate = () => {
    if (!weatherData) {
      return {};
    }

    const groupedWeather = {};

    weatherData.list.forEach((item) => {

      const date = new Date(item.dt * 1000).toLocaleDateString();

      if (!groupedWeather[date]) groupedWeather[date] = [];
      groupedWeather[date].push(item);
    });

    return groupedWeather;
  };

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d':
        return <FaSun />;
      case '02d':
        return <FaCloudSun />;
      case '03d':
        return <FaCloud />;
      case '04d':
        return <FaCloud />;
      case '09d':
        return <FaCloudShowersHeavy />;
      case '10d':
        return <TiWeatherShower />;
      case '11d':
        return <FaBolt />;
      case '13d':
        return <FaSnowflake />;
      case '50d':
        return <FaWind />;
      case '01n':
        return <TiWeatherPartlySunny />;
      case '02n':
      case '03n':
        return <FaCloud />;
      case '04n':
        return <FaCloud />;
      case '09n':
        return <FaCloudShowersHeavy />;
      case '10n':
        return <TiWeatherShower />;
      case '11n':
        return <FaBolt />;
      case '13n':
        return <FaSnowflake />;
      case '50n':
        return <FaWind />;
      default:
        return null;
    }
  };

  return (
    <div>
      {loading && <p>Завантаження...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <p><span>Погода в {weatherData.city.name}, {weatherData.city.country}</span></p>
          <div className='row'>
            <button type='button' onClick={() => handleUnitChange('metric')}>°C</button>
            <button type='button' onClick={() => handleUnitChange('imperial')}>°F</button>
          </div>
          <div className="weather-list">
              {Object.entries(groupWeatherByDate()).map(([date, weatherItems]) => (
                <div className="weather-day" key={date} style={{ color: textColor, backgroundColor: backgroundColor }}>
                    <p><span>{date}</span></p>
                    {/* <p><span><FaSun /><TiWeatherPartlySunny /></span>{new Date(weatherData.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(weatherData.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p> */}
                    <p>
                      {new Date(weatherData.dt).getTime() >= new Date(weatherData.city.sunrise).getTime() && 
                        new Date(weatherData.dt).getTime() <= new Date(weatherData.city.sunset).getTime() ? 
                          ( <span><FaSun /></span> ) : ( <span><TiWeatherPartlySunny /></span> )
                      }
                      
                      {new Date(weatherData.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                      {new Date(weatherData.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <div className="weather-items">
                    {weatherItems.map((item) => (
                        <div className="weather-item" key={item.dt}>
                            <p>{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p>{Math.round(item.main.temp)}°{temperatureUnit === 'metric' ? 'C' : 'F'}</p>
                            <IconContext.Provider value={{ size: '2em' }}>
                                {getWeatherIcon(item.weather[0].icon)}
                            </IconContext.Provider>
                            <p>{item.weather[0].description}</p>
                            <p><FaTint /> {item.main.humidity}%</p>
                        </div>
                    ))}
                    </div>
                </div>
              ))}
          </div> 
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;