import {useContext, useEffect, useState} from "react"
import WeatherContext from "../WeatherContext"
import {Card, Stack, Typography} from "@mui/material"

interface CurrentData {
  temp: number
  humidity: number
  wind_speed: number
  uvi: number
}

export const CurrentWeather: React.FC = () => {
  const {coords, currentWeatherData} = useContext(WeatherContext)
  const [currentData, setCurrentData] = useState<CurrentData>()

  useEffect(() => {
    if (currentWeatherData !== undefined) {
      setCurrentData(currentWeatherData?.current as CurrentData)
    }
  }, [currentWeatherData])

  return (
    <Stack>
      <Card raised={true}>
        <Stack padding={1}>
          <Typography variant="h5">
            {coords.city}, {coords.state}
          </Typography>
          <Typography>
            temperature: {Math.round(currentData?.temp ?? 0)}
            {"\xB0"}
          </Typography>
          <Typography>Humidity: {currentData?.humidity}</Typography>
          <Typography>
            Wind Speed: {Math.round(currentData?.wind_speed ?? 0)}
          </Typography>
          <Typography>UV Index: {Math.round(currentData?.uvi ?? 0)}</Typography>
        </Stack>
      </Card>
    </Stack>
  )
}
