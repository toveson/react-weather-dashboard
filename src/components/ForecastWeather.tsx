import {useContext, useEffect, useState} from "react"
import {Card, Stack, Typography} from "@mui/material"
import WeatherContext from "../WeatherContext"

interface forecastData {
  dt: number
  sunrise: number
  sunset: number
  humidity: number
  temp: {
    min: number
    max: number
  }
  weather: {
    description: string
  }
}

export const ForecastWeather: React.FC = (props) => {
  const {currentWeatherData} = useContext(WeatherContext)
  const [forecastData, setForecastData] = useState<forecastData[]>()

  useEffect(() => {
    if (currentWeatherData !== undefined) {
      setForecastData(currentWeatherData?.daily as forecastData[])
    }
  }, [currentWeatherData])

  console.log(forecastData)

  return (
    <Stack justifyContent="space-between" alignItems="center">
      <Card raised={true}>
        <Stack padding={1} direction="row" spacing={1} sx={{flexWrap: "wrap"}}>
          {forecastData?.map((x, key) => (
            <Stack key={key} padding={1} spacing={1}>
              <Card raised={true}>
                <Typography>
                  {new Date(x.dt * 1000).toLocaleDateString("en", {
                    weekday: "short",
                    day: "numeric"
                  })}
                </Typography>
                <Typography>
                  temp: {x.temp.min} - {x.temp.max}
                </Typography>
                <Typography>humidity: {x.humidity}</Typography>
                <Typography>
                  sunrise: {new Date(x.sunrise * 1000).toLocaleTimeString()}
                </Typography>
                <Typography>
                  sunset: {new Date(x.sunset * 1000).toLocaleTimeString()}
                </Typography>
              </Card>
            </Stack>
          ))}
        </Stack>
      </Card>
    </Stack>
  )
}
