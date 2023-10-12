import {useContext, useEffect, useState} from "react"
import WeatherContext from "../WeatherContext"

export const MinuteWeather: React.FC = () => {
  const {currentWeatherData} = useContext(WeatherContext)
  const [minuteData, setMinuteData] = useState<object[]>([])

  useEffect(() => {
    if (currentWeatherData !== undefined) {
      setMinuteData(currentWeatherData?.minutely)
    }
  }, [currentWeatherData])

  console.log(minuteData)
  return <>{JSON.stringify(minuteData)}</>
}
