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
        <Stack padding={1}>
          <Typography variant="h4">8 Day forecast</Typography>
        </Stack>
        <Stack padding={1} direction="row" spacing={1} sx={{flexWrap: "wrap"}}>
          {forecastData?.map((x, key) => (
            <Stack key={key} padding={1} spacing={1}>
              <Card raised={true} style={{padding: "5px"}}>
                <Typography>
                  {new Date(x.dt * 1000).toLocaleDateString("en", {
                    weekday: "short"
                  })}{" "}
                  {new Date(x.dt * 1000).toLocaleDateString("en", {
                    day: "numeric"
                  })}
                </Typography>
                <Typography>
                  temp: {Math.round(x.temp.min)}
                  {"\xB0"} - {Math.round(x.temp.max)}
                  {"\xB0"}
                </Typography>
                <Typography>humidity: {x.humidity}</Typography>
                <Typography>
                  sunrise:{" "}
                  {new Date(x.sunset * 1000).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "numeric"
                  })}
                </Typography>
                <Typography>
                  sunset:{" "}
                  {new Date(x.sunset * 1000).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "numeric"
                  })}
                </Typography>
              </Card>
            </Stack>
          ))}
        </Stack>
      </Card>
    </Stack>
  )
}
