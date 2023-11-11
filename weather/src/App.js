import React, { useState } from 'react';
import './App.css';
import LocationWeatherComponent from './compotents/LocationWeatherComponent/LocationWeatherComponent';
import SearchComponent from './compotents/SearchComponent/SearchComponent'
import SettingsComponent from './compotents/SettingsComponent/SettingsComponent';

function App() {

  const [textColor, setTextColor] = useState(localStorage.getItem('textColor') || '');
  const [backgroundColor, setBackgroundColor] = useState(localStorage.getItem('backgroundColor') || '');

  const handleTextColorChange = (newTextColor) => {
    setTextColor(newTextColor);
  };

  const handleBackgroundColorChange = (newBackgroundColor) => {
    setBackgroundColor(newBackgroundColor);
  }; 

  return (
      <div className="App">
        <div className='row'>
          <div className='col location'>
            <SettingsComponent
              textColor={textColor}
              backgroundColor={backgroundColor}
              onTextColorChange={handleTextColorChange}
              onBackgroundColorChange={handleBackgroundColorChange}
            />  
            <LocationWeatherComponent 
              textColor={textColor}
              backgroundColor={backgroundColor}
            />
            <SearchComponent 
              textColor={textColor}
              backgroundColor={backgroundColor}
            />
          </div>
        </div>
      </div>
  );
}

export default App;
