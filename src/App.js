import React, { useState } from 'react';
import './App.css'
// import axios from 'axios';

const api = {
  key: 'c01ebaa4518f345e482f9d98a3fc6c2e',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

const [query, setQuery] = useState('');
const [weather, setWeather] = useState({});

const search = (event) => {
  if (event.key === "Enter") {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result); 
      setQuery(''); 
      console.log(result)
    })
  }
}

const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurdays", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date =  d.getDate();
  let month = months[d.getMonth()]
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}  
  return (
    <div className={(typeof weather.main != "undefined") ?((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type='text' 
            className="search-bar" 
            placeholder="search for any city..."
            onChange={event => setQuery(event.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div> 
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
