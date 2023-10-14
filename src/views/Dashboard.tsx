import {Stack} from "@mui/system"
import {
  CurrentWeather,
  // CurrentWeather,
  // ForecastWeather,
  MinuteWeather,
  Search
} from "../components"
import {useContext} from "react"
import WeatherContext from "../WeatherContext"

export const Dashboard: React.FC = (props) => {
  const {currentWeatherData} = useContext(WeatherContext)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        alignItems: "center",
        // backgroundColor: "#69DC9E",
        overflow: "auto",
        padding: "0",
        flexWrap: "wrap"
      }}
    >
      <Stack>
        <Search />
        <CurrentWeather />
        {/* <ForecastWeather /> */}
        {currentWeatherData !== undefined && <MinuteWeather />}
      </Stack>
    </div>
  )
}
