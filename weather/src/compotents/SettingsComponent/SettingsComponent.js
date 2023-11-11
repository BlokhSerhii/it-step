import React, { useState } from 'react';
import '../main.css';

const SettingsComponent = ({ textColor, backgroundColor, onTextColorChange, onBackgroundColorChange }) => {

  const [changeSettings, setChangeSettings] = useState(false);

  const handleSaveSettings = () => {

    setChangeSettings(!changeSettings);

    if(changeSettings) {
      localStorage.setItem('textColor', textColor);
      localStorage.setItem('backgroundColor', backgroundColor);
    }
  };

return (
  <div>
    <p><span>Налаштування</span></p>
    {changeSettings && 
    (<div className='row'>
      <div className='col'>
        <label>Текст:</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => onTextColorChange(e.target.value)}
        />
      </div>
      <div className='col'>
        <label>Фон:</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => onBackgroundColorChange(e.target.value)}
        />
      </div>
    </div>)}
    <div className='searchCity'>
      <button onClick={handleSaveSettings}>{changeSettings ? 'Saved' : 'Change'}</button>
    </div>
  </div>
);
};

export default SettingsComponent;