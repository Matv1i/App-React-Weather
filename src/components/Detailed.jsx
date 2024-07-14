import { useState, useEffect } from "react"
import "./Detailed.css"

export function Detailed({ weather, loading, error }) {
  const [sunrise, setSunrise] = useState("")
  const [sunset, setSunset] = useState("")
  const [air, setAir] = useState(null)
  const [airLoading, setAirLoading] = useState(false)
  const [airError, setAirError] = useState(null)

  useEffect(() => {
    if (weather) {
      const sunriseDate = new Date(weather.sys.sunrise * 1000)
      const sunsetDate = new Date(weather.sys.sunset * 1000)
      const options = { hour: "2-digit", minute: "2-digit" }
      setSunrise(sunriseDate.toLocaleTimeString([], options))
      setSunset(sunsetDate.toLocaleTimeString([], options))
      fetchWeatherDataAir(weather.coord.lon, weather.coord.lat)
    }
  }, [weather])

  const fetchWeatherDataAir = async (lon, lat) => {
    setAirLoading(true)
    setAirError(null)
    try {
      const url = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_APP_ID
      }`
      const responseAir = await fetch(url)
      const dataAir = await responseAir.json()

      if (responseAir.ok) {
        setAir(dataAir)
      } else {
        setAirError(dataAir.message || "Failed to fetch air quality data.")
      }
    } catch (error) {
      console.error("Error fetching air quality data: ", error)
      setAirError("Error fetching air quality data.")
    } finally {
      setAirLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!weather) return <div></div>

  return (
    <div>
      <p className="titleHl">Today Highlights</p>
      <div className="mainContainer">
        <div className="airContainer">
          <p>Air Quality Index</p>
          {airLoading && <div>Loading air quality data...</div>}
          {airError && <div>Error: {airError}</div>}
          {air && (
            <div className="columnsDet">
              <img src={"src/assets/316296_wind_icon.png"} alt="Wind icon" />
              <div className="airDescr">
                <p className="firstText">PM2.5</p>
                <p className="numb">{air.list[0].components.pm2_5}</p>
              </div>
              <div className="airDescr">
                <p className="firstText">NO2</p>
                <p className="numb">{air.list[0].components.no2}</p>
              </div>
              <div className="airDescr">
                <p className="firstText">SO2</p>
                <p className="numb">{air.list[0].components.so2}</p>
              </div>
              <div className="airDescr">
                <p className="firstText">NH3</p>
                <p className="numb">{air.list[0].components.nh3}</p>
              </div>
            </div>
          )}
        </div>

        <div className="halfContainer">
          <div className="sunAndMoon">
            <img src={"src/assets/sun-512.png"} alt="Sun Icon" />
            <div className="infos">
              <p className="sunrise">Sunrise</p>
              <p className="sunriseTime">{sunrise}</p>
            </div>
          </div>
          <div className="sunAndMoon">
            <img src={"src/assets/moon-2-512.png"} alt="Moon Icon" />
            <div className="infos">
              <p className="sunrise">Sunset</p>
              <p className="sunriseTime">{sunset}</p>
            </div>
          </div>
        </div>

        <div className="miniContainer">
          <p>Feels Like</p>
          <div className="insideMini">
            <img
              src={"src/assets/temperature-2-512.png"}
              alt="Temperature icon"
            />
            <p>{weather.main.feels_like}°C </p>
          </div>
        </div>
        <div className="miniContainer">
          <p>Visibility</p>
          <div className="insideMini">
            <img
              src={"src/assets/icons8-visible-96.png"}
              alt="Temperature icon"
            />
            <p>{weather.visibility / 100} %</p>
          </div>
        </div>
        <div className="miniContainer">
          <p>Pressure</p>
          <div className="insideMini">
            <img src={"src/assets/barometer.png"} alt="Temperature icon" />
            <p>{weather.main.pressure}Mb </p>
          </div>
        </div>
        <div className="miniContainer">
          <p>Humidity</p>
          <div className="insideMini">
            <img
              src={"src/assets/icons8-humidity-90.png"}
              alt="Temperature icon"
            />
            <p>{weather.main.humidity}% </p>
          </div>
        </div>
      </div>
    </div>
  )
}
