import {createContext, ReactNode, useState} from "react"

interface WeatherContextType {
  currentWeatherData: undefined
  setCurrentWeatherData: React.Dispatch<React.SetStateAction<undefined>>
}

const WeatherContext = createContext<WeatherContextType>({
  currentWeatherData: undefined,
  setCurrentWeatherData: () => {}
})

export const WeatherInfoProvider = ({children}: {children: ReactNode}) => {
  const [currentWeatherData, setCurrentWeatherData] = useState<undefined>()

  return (
    <WeatherContext.Provider
      value={{currentWeatherData, setCurrentWeatherData}}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherContext
