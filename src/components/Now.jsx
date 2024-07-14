import React, { useEffect, useState } from "react"
import "./Now.css"

export function Now({ weather, loading, error, city }) {
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!weather) return

  const getFormattedDate = () => {
    const date = new Date()

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]

    const weekday = weekdays[date.getDay()]

    const day = date.getDate()

    const month = months[date.getMonth()]

    return `${weekday} ${day}, ${month}`
  }

  const description = weather.weather[0].description

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className="weather-container">
      <div className="first">
        <p className="now">Now</p>
        <div className="temp">
          <p>{Math.floor(weather.main.temp)}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
        </div>
        <p className="curWet">{capitalizeFirstLetter(description)}</p>
      </div>
      <div className="second">
        <div className="date">
          <img src={"src/assets/icons8-calendar-24.png"} />
          <p>{getFormattedDate()}</p>
        </div>
        <div className="map">
          <img src={"src/assets/map-marker-2-24.png"} />
          <p>
            {city}, {weather.sys.country}
          </p>
        </div>
      </div>
    </div>
  )
}
