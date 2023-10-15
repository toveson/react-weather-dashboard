import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from "react"

interface currentWeatherDataType {
  current: object
  minutely: Array<object>
  daily: Array<object>
}

interface coordsType {
  lat: number
  lon: number
  city: string
  state: string
}

interface WeatherContextType {
  currentWeatherData: undefined | currentWeatherDataType
  setCurrentWeatherData: Dispatch<SetStateAction<undefined>>
  coords: coordsType
  setCoords: Dispatch<
    SetStateAction<{lat: number; lon: number; city: string; state: string}>
  >
}

const WeatherContext = createContext<WeatherContextType>({
  currentWeatherData: undefined,
  setCurrentWeatherData: () => {},
  coords: {
    lat: 0,
    lon: 0,
    city: "",
    state: ""
  },
  setCoords: () => {}
})

export const WeatherInfoProvider = ({children}: {children: ReactNode}) => {
  const [currentWeatherData, setCurrentWeatherData] = useState<undefined>()
  const [coords, setCoords] = useState<coordsType>({
    lat: 0,
    lon: 0,
    city: "",
    state: ""
  })

  return (
    <WeatherContext.Provider
      value={{coords, setCoords, currentWeatherData, setCurrentWeatherData}}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherContext
