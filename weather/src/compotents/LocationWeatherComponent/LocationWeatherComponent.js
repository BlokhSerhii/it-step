import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FaTint, FaSun, FaCloud, FaCloudSun, FaCloudShowersHeavy, FaBolt, FaSnowflake, FaWind } from 'react-icons/fa';
import { TiWeatherSnow, TiWeatherShower, TiWeatherStormy, TiWeatherPartlySunny } from 'react-icons/ti';
import '../main.css';

import axios from 'axios';

const API_KEY = '67194cf5672b88e2ac0fb7c869cffc04';

const LocationWeatherComponent = ({ textColor, backgroundColor }) => {

  const [weatherData, setWeatherData] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('metric');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchWeatherByCoordinates = async (latitude, longitude) => {

      setWeatherData(null);
      setError(null);
      setLoading(true);

      try {

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=ua&appid=${API_KEY}&units=${temperatureUnit}`
        );

        setWeatherData(response.data);
        setLoading(false);
      } 
      catch (error) {

        console.log('Помилка надсилання запиту:', error);
        setError('Помилка при отриманні погоди. Спробуйте ще раз.');
        setLoading(false); 
      }
    };

    const getLocationAndWeather = () => {

      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
          },
          
          (error) => {
            console.log('Помилка отримання місцезнаходження:', error);
          }
        );
      } 
        else {
          console.log('Геолокація не підтримується в вашому браузері');
          setError('Геолокація не підтримується в вашому браузері');
        }
    };

    getLocationAndWeather();
  }, [temperatureUnit]);

  const handleUnitChange = (newUnit) => {
    
    setTemperatureUnit(newUnit);
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
      {weatherData && (
        <div className="weather-day" style={{ color: textColor, backgroundColor: backgroundColor }}>
          <p><span>Місцева погода:</span></p>
          {loading && <p>Завантаження...</p>}
          {error && <p>{error}</p>}
          <p><span>{new Date(weatherData.dt * 1000).toLocaleDateString()}</span></p>
          {/* <p><span><FaSun /></span>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p> */}
          <p>
            {new Date(weatherData.dt).getTime() >= new Date(weatherData.sys.sunrise).getTime() && 
              new Date(weatherData.dt).getTime() <= new Date(weatherData.sys.sunset).getTime() ? 
                ( <span><FaSun /></span> ) : ( <span><TiWeatherPartlySunny /></span> )
            }
            
            {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
            {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <div className="weather-items">
            <div className="weather-item">
            <p>{weatherData.name}, {weatherData.sys.country}</p>
              <p>{Math.round(weatherData.main.temp)}°{temperatureUnit === 'metric' ? 'C' : 'F'}</p> 
                <div>
                    <IconContext.Provider value={{ size: '2em' }}>
                        {getWeatherIcon(weatherData.weather[0].icon)}
                    </IconContext.Provider>
                    <p>{weatherData.weather[0].description}</p>
              </div>
              <p><FaTint /> {weatherData.main.humidity}%</p>
            </div>
          </div>
        </div>
      )}
      <div className='row'>
        <button type='button' onClick={() => handleUnitChange('metric')}>°C</button>
        <button type='button' onClick={() => handleUnitChange('imperial')}>°F</button>
      </div>
    </div>
  );
};

export default LocationWeatherComponent;