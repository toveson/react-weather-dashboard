import ConstructionIcon from "@mui/icons-material/Construction"
import {useContext, useEffect, useState} from "react"
import WeatherContext from "../WeatherContext"

export const CurrentWeather: React.FC = () => {
  const {currentWeatherData} = useContext(WeatherContext)
  const [currentData, setCurrentData] = useState({})

  useEffect(() => {
    if (currentWeatherData !== undefined) {
      setCurrentData(currentWeatherData?.current)
    }
  }, [currentWeatherData])

  console.log(currentData)
  return (
    <>
      <div style={{display: "flex", justifyContent: "center"}}>
        <ConstructionIcon
          style={{
            fontSize: 400
          }}
        />
      </div>
      <h1> CurrentWeather are currently under construction</h1>
    </>
  )
}
