import {useContext, useEffect, useState} from "react"
import WeatherContext from "../WeatherContext"
import {Stack, Typography} from "@mui/material"

interface CurrentData {
  temp: number
  humidity: number
  wind_speed: number
  uvi: number
}

export const CurrentWeather: React.FC = () => {
  const {currentWeatherData} = useContext(WeatherContext)
  const [currentData, setCurrentData] = useState<CurrentData>()

  useEffect(() => {
    if (currentWeatherData !== undefined) {
      setCurrentData(currentWeatherData?.current as CurrentData)
    }
  }, [currentWeatherData])

  console.log(currentData)
  return (
    <Stack>
      <Typography>temperature: {currentData?.temp}</Typography>
      <Typography>Humidity: {currentData?.humidity}</Typography>
      <Typography>Wind Speed: {currentData?.wind_speed}</Typography>
      <Typography>UV Index: {currentData?.uvi}</Typography>
    </Stack>
  )
}
