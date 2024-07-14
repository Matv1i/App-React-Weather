import React from "react"
import "./Forecast.css"

export function Forecast({ forecast, loading, error }) {
  const getFormattedDay = (timestamp) => {
    const date = new Date(timestamp * 1000)
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    return weekdays[date.getDay()]
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!forecast) return <div></div>

  return (
    <>
      <p className="fiveDays">Next 5 days</p>
      <div className="forecast-container">
        <div className="forecastOneDay">
          <div className="tempAndIcon">
            <img
              src={`https://openweathermap.org/img/wn/${forecast.list[4].weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <p className="tempDay">
              {Math.floor(forecast.list[4].main.temp)}°C
            </p>
          </div>
          <p className="dayDate">
            {getFormattedDay(forecast.list[4].dt)}
            <br />
            Feels Like {Math.floor(forecast.list[4].main.feels_like)}°C
          </p>
        </div>
        <div className="forecastOneDay">
          <div className="tempAndIcon">
            <img
              src={`https://openweathermap.org/img/wn/${forecast.list[12].weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <p className="tempDay">
              {Math.floor(forecast.list[12].main.temp)}°C
            </p>
          </div>
          <p className="dayDate">
            {getFormattedDay(forecast.list[12].dt)}
            <br />
            Feels Like {Math.floor(forecast.list[12].main.feels_like)}°C
          </p>
        </div>
        <div className="forecastOneDay">
          <div className="tempAndIcon">
            <img
              src={`https://openweathermap.org/img/wn/${forecast.list[20].weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <p className="tempDay">
              {Math.floor(forecast.list[20].main.temp)}°C
            </p>
          </div>
          <p className="dayDate">
            {getFormattedDay(forecast.list[20].dt)}
            <br />
            Feels Like {Math.floor(forecast.list[20].main.feels_like)}°C
          </p>
        </div>
        <div className="forecastOneDay">
          <div className="tempAndIcon">
            <img
              src={`https://openweathermap.org/img/wn/${forecast.list[28].weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <p className="tempDay">
              {Math.floor(forecast.list[28].main.temp)}°C
            </p>
          </div>
          <p className="dayDate">
            {getFormattedDay(forecast.list[28].dt)}
            <br />
            Feels Like {Math.floor(forecast.list[28].main.feels_like)}°C
          </p>
        </div>
        <div className="forecastOneDay">
          <div className="tempAndIcon">
            <img
              src={`https://openweathermap.org/img/wn/${forecast.list[36].weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <p className="tempDay">
              {Math.floor(forecast.list[36].main.temp)}°C
            </p>
          </div>
          <p className="dayDate">
            {getFormattedDay(forecast.list[36].dt)}
            <br />
            Feels Like {Math.floor(forecast.list[36].main.feels_like)}°C
          </p>
        </div>
      </div>
    </>
  )
}
