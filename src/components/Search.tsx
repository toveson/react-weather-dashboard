import {Button, Stack, TextField} from "@mui/material"
import {useEffect, useState} from "react"
import SearchIcon from "@mui/icons-material/Search"

export const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [lat, setLat] = useState<number>(0)
  const [lon, setLon] = useState<number>(0)
  const openWeatherKey = process.env.REACT_APP_WEATHER_API_KEY
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue},&limit=5&appid=${openWeatherKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 1) {
          setLat(data[0].lat)
          setLon(data[0].lon)
        }
      })
  }, [searchValue, openWeatherKey])

  const fetchWeatherData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${openWeatherKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  }

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        label="City, St"
        variant="outlined"
        value={searchValue}
        onChange={handleChange}
      />
      <Button variant="outlined" onClick={fetchWeatherData}>
        <SearchIcon />
      </Button>
    </Stack>
  )
}
