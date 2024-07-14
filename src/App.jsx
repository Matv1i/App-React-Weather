import React, { useState, useEffect } from "react"
import "./App.css"
import { Now } from "./components/Now"
import { Forecast } from "./components/Forecast"
import { Detailed } from "./components/Detailed"
import { TodayForecast } from "./components/TodayForecast"

const App = () => {
  const [city, setCity] = useState("")
  const [searchCity, setSearchCity] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [forecast, setForecast] = useState(null)

  const fetchWeatherData = async (city) => {
    setLoading(true)
    setError(null)
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }&units=metric`
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok) {
        setWeatherData(data)
        return { lat: data.coord.lat, lon: data.coord.lon }
      } else {
        setError(data.message || "Failed to fetch weather data.")
      }
    } catch (error) {
      console.error("Error fetching weather data: ", error)
      setError("Error fetching weather data.")
    } finally {
      setLoading(false)
    }
  }

  const fetchForecast = async (city) => {
    setLoading(true)
    setError(null)
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }&units=metric`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        setForecast(data)
      } else {
        setError(data.message || "Failed to fetch forecast data.")
      }
    } catch (error) {
      console.error("Error fetching forecast data: ", error)
      setError("Error fetching forecast data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (searchCity) {
        await fetchWeatherData(searchCity)
        fetchForecast(searchCity)
      }
    }
    fetchData()
  }, [searchCity])

  const handleInputChange = (e) => {
    setCity(e.target.value)
  }

  const handleSearch = () => {
    if (city.trim() !== "") {
      setSearchCity(city)
      setCity("")
    }
  }

  return (
    <div className="container">
      <div className="navbar">
        <div className="divLogo">
          <img
            className="logo"
            src={"/src/assets/images/logo.png"}
            alt="Logo"
          />
        </div>
        <p className="cityRep">{searchCity}</p>
        <div className="input">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={handleInputChange}
          />
          <img
            className="search"
            src={"/src/assets/search-26242.png"}
            alt="Search"
            onClick={handleSearch}
          />
        </div>
      </div>
      <div className="columns">
        <div className="columnFirst">
          <Now
            weather={weatherData}
            loading={loading}
            error={error}
            city={searchCity}
          />
          <Forecast forecast={forecast} loading={loading} error={error} />
        </div>
        <div className="columnSecond">
          <Detailed weather={weatherData} loading={loading} error={error} />
          <TodayForecast forecast={forecast} loading={loading} error={error} />
        </div>
      </div>
    </div>
  )

  //
}

export default App
