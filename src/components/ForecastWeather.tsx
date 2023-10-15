import ConstructionIcon from "@mui/icons-material/Construction"
import {useContext, useEffect, useState} from "react"
import {Card, Stack, Typography} from "@mui/material"
import WeatherContext from "../WeatherContext"

interface forecastData {
  dt: number
  sunrise: number
  sunset: number
  // temp: number
  humidity: number
  weather: object
}

export const ForecastWeather: React.FC = (props) => {
  const {currentWeatherData} = useContext(WeatherContext)
  const [forecastData, setForecastData] = useState<forecastData[]>()

  useEffect(() => {
    if (currentWeatherData !== undefined) {
      setForecastData(currentWeatherData?.daily as forecastData[])
    }
  }, [currentWeatherData])

  return (
    <Stack>
      <Card raised={true}>
        <Stack padding={1}>
          <Stack direction="row" spacing={1}>
            {forecastData?.map((x, key) => (
              <Stack key={key}>
                <Card raised={true}>
                  <Typography>
                    {new Date(x.dt * 1000).toLocaleDateString("en", {
                      weekday: "short",
                      day: "numeric"
                    })}
                  </Typography>
                  <Typography>{x.humidity}</Typography>
                </Card>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}
