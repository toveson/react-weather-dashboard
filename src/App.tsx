import {Dashboard} from "./views"
import {WeatherInfoProvider} from "./WeatherContext"

function App() {
  return (
    <WeatherInfoProvider>
      <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
        <Dashboard />
      </div>
    </WeatherInfoProvider>
  )
}

export default App
