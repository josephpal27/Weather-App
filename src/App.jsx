import { useState } from 'react'
import './App.css'

function App() {

  let [city, setCity] = useState('')
  let [weatherData, setWeatherData] = useState();

  let checkWeather = (e) => {
    e.preventDefault()

    fetch(`http://api.weatherapi.com/v1/current.json?key=1da33a8c94004a8c96970835250302&q=${city}&aqi=no`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.error.code == 1006) {
          alert('City not found')
        } else {
          setWeatherData(data)
        }
      })

    setCity('');
  }




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

        {weatherData != undefined

          ?

          <div className="app-body">
            <h2>Kolkata</h2>
            <img src="//cdn.weatherapi.com/weather/64x64/day/122.png" alt="icon" />
            <h3>25°C</h3>
            <h4>Last Updated On - 2025-02-03 12:30</h4>
          </div>

          :
          
          <div className='no-data'>
            <p>No Data Found</p>
          </div>
        }

        <div className="loader">
          <img src="https://media.tenor.com/khzZ7-YSJW4AAAAM/cargando.gif" alt="loader" />
        </div>
      </div>
    </div>
  )
}

export default App
