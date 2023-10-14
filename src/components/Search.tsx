import {useContext, useEffect, useState} from "react"
import {Button, Card, IconButton, Stack, TextField} from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import SearchIcon from "@mui/icons-material/Search"
import WeatherContext from "../WeatherContext"

export const Search: React.FC = () => {
  const {coords, setCoords, setCurrentWeatherData} = useContext(WeatherContext)
  const [searchValue, setSearchValue] = useState<string>("")
  const openWeatherKey = process.env.REACT_APP_WEATHER_API_KEY

  const getExistingArray = () => {
    return JSON.parse(localStorage.getItem("searchedCities") || "[]")
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    if (searchValue !== "") {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue},&limit=5&appid=${openWeatherKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 1) {
            setCoords({
              lat: data[0].lat,
              lon: data[0].lon,
              city: data[0].name,
              state: data[0].state
            })
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const fetchWeatherData = () => {
    const {lat, lon} = coords

    if (searchValue !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${openWeatherKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          const existingArray = getExistingArray()
          if (existingArray.includes(searchValue)) {
            const filteredArray = existingArray.filter(
              (value: any) => value !== searchValue
            )
            const updatedArray = [searchValue, ...filteredArray.slice(0, 9)]
            localStorage.setItem("searchedCities", JSON.stringify(updatedArray))
          } else if (searchValue !== "") {
            const updatedArray = [searchValue, ...existingArray.slice(0, 9)]
            localStorage.setItem("searchedCities", JSON.stringify(updatedArray))
          }
          setCurrentWeatherData(data)
        })
        .then(() => setSearchValue(""))
    }
  }

  const handleDeleteButtonClick = (city: string) => {
    const existingArray = getExistingArray()
    const filteredArray = existingArray.filter((value: any) => value !== city)
    localStorage.setItem("searchedCities", JSON.stringify(filteredArray))
    window.location.reload()
  }

  const handleCityButtonClick = (city: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=5&appid=${openWeatherKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCoords({
          lat: data[0].lat,
          lon: data[0].lon,
          city: data[0].name,
          state: data[0].state
        })
        if (data.length === 1) {
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${openWeatherKey}`
          )
            .then((response) => response.json())
            .then((data) => {
              const existingArray = getExistingArray()
              if (existingArray.includes(city)) {
                const filteredArray = existingArray.filter(
                  (value: any) => value !== city
                )
                const updatedArray = [city, ...filteredArray.slice(0, 9)]
                localStorage.setItem(
                  "searchedCities",
                  JSON.stringify(updatedArray)
                )
              } else if (city !== "") {
                const updatedArray = [city, ...existingArray.slice(0, 9)]
                localStorage.setItem(
                  "searchedCities",
                  JSON.stringify(updatedArray)
                )
              }
              setCurrentWeatherData(data)
            })
            .then(() => setSearchValue(""))
        }
      })
  }

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      fetchWeatherData()
    }
  }

  return (
    <Stack>
      <Card raised={true}>
        <Stack padding={1}>
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
              {getExistingArray().map((city: string, index: number) => (
                <Stack direction="row" key={index}>
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
        </Stack>
      </Card>
    </Stack>
  )
}
