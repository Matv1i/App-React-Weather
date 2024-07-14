import "./TodayForecast.css"

export function TodayForecast({ forecast, loading, error }) {
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!forecast) return

  function extractTimeWithoutSeconds(dt_txt) {
    const timeWithSeconds = dt_txt.split(" ")[1]
    const timeWithoutSeconds = timeWithSeconds.split(":").slice(0, 2).join(":")
    return timeWithoutSeconds
  }

  return (
    <div className="mainToday">
      <p className="titleToday">Today At</p>
      <div className="containersHour">
        {forecast.list.slice(0, 9).map((item, index) => (
          <div key={index} className="oneHour">
            <p>{extractTimeWithoutSeconds(item.dt_txt)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <p>{Math.floor(item.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  )
}
