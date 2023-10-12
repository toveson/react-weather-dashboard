import {useContext} from "react"
import WeatherContext from "../WeatherContext"

export const MinuteWeather: React.FC = (props) => {
  const {currentWeatherData} = useContext(WeatherContext)

  console.log(currentWeatherData)
  return <>{JSON.stringify(currentWeatherData)}</>
}
