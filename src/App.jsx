import './App.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(undefined);

  let checkWeather = (e) => {
    e.preventDefault();

    fetch(`http://api.weatherapi.com/v1/current.json?key=1da33a8c94004a8c96970835250302&q=${city}&aqi=no`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data.error) {
          toast.error('City Not Found', {
            autoClose: 2000
          });
          setWeatherData(undefined);
        } else {
          setWeatherData(data);
          toast.success('Data Fetched Successfully', {
            autoClose: 2000
          });
        }
      })

    setCity('');
  };

  return (
    <div>
      <div className="container">
        <h1>Weather App</h1>
        <div className="search-box">
          <form action="" onSubmit={checkWeather}>
            <input type="text" className="search" placeholder="Search Location..." value={city} onChange={(e) => setCity(e.target.value)} />
            <button className="search-button">Search</button>
          </form>
        </div>

        {weatherData !== undefined ? (
          <div className="app-body">
            <h2>{weatherData.location.name}</h2>
            <img src={weatherData.current.condition.icon} alt="icon" />
            <h3>{weatherData.current.temp_c}°C</h3>
            <h4>{weatherData.current.condition.text}</h4>
            <h4>Last Updated On - {weatherData.current.last_updated}</h4>
          </div>
        ) : (
          <div className='no-data'>
            <p>No Data Found</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;