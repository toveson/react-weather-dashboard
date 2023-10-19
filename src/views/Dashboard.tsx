import {Stack} from "@mui/system"
import {
  CurrentWeather,
  ForecastWeather,
  // MinuteWeather,
  Search
} from "../components"
import {useContext} from "react"
import WeatherContext from "../WeatherContext"

export const Dashboard: React.FC = (props) => {
  const {currentWeatherData} = useContext(WeatherContext)
  return (
    <Stack
      padding={2}
      style={{
        justifyContent: "center",
        backgroundColor: "#69DC9E",
        height: "100%"
      }}
    >
      <Stack spacing={2} direction="row">
        <Stack width={"25%"}>
          <Search />
        </Stack>
        {currentWeatherData !== undefined && (
          <Stack spacing={2}>
            <CurrentWeather />
            <ForecastWeather />
            {/* <MinuteWeather /> */}
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}
