import {Button, IconButton, Stack, TextField} from "@mui/material"
import {useEffect, useState} from "react"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import SearchIcon from "@mui/icons-material/Search"

export const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [lat, setLat] = useState<number>(0)
  const [lon, setLon] = useState<number>(0)
  const openWeatherKey = process.env.REACT_APP_WEATHER_API_KEY
  const existingArray = JSON.parse(
    localStorage.getItem("searchedCities") || "[]"
  )
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
        if (existingArray.includes(searchValue)) {
          const filteredArray = existingArray.filter(
            (value: any) => value !== searchValue
          )
          const updatedArray = [searchValue, ...filteredArray]
          localStorage.setItem("searchedCities", JSON.stringify(updatedArray))
        } else if (searchValue !== "") {
          const updatedArray = [searchValue, ...existingArray]

          localStorage.setItem("searchedCities", JSON.stringify(updatedArray))
        }
        console.log(data)
      })
      .then(() => setSearchValue(""))
  }

  const handleDeleteButtonClick = (city: string) => {
    const filteredArray = existingArray.filter((value: any) => value !== city)
    localStorage.setItem("searchedCities", JSON.stringify(filteredArray))
    window.location.reload() // Refresh the component to reflect the changes
  }

  const handleCityButtonClick = (city: string) => {
    setSearchValue(city)
    fetchWeatherData()
  }

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      fetchWeatherData()
    }
  }

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <TextField
          label="City, St"
          variant="outlined"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <Button variant="outlined" onClick={fetchWeatherData}>
          <SearchIcon />
        </Button>
      </Stack>
      <Stack spacing={1}>
        {existingArray.map((city: string, index: number) => (
          <Stack direction="row">
            <Button
              fullWidth
              key={index}
              variant="outlined"
              onClick={() => handleCityButtonClick(city)}
            >
              {city}
            </Button>
            <IconButton
              edge="end"
              style={{color: "red"}}
              onClick={() => handleDeleteButtonClick(city)}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
