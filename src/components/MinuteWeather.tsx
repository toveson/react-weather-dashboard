import {useContext, useEffect, useState} from "react"
import WeatherContext from "../WeatherContext"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import {Line} from "react-chartjs-2"
import {Stack} from "@mui/system"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const
    },
    title: {
      display: false,
      text: ""
    }
  }
}

interface MinuteData {
  dt: number
  precipitation: number
}

export const MinuteWeather: React.FC = () => {
  const {currentWeatherData} = useContext(WeatherContext)
  const [minuteData, setMinuteData] = useState<MinuteData[]>([])

  useEffect(() => {
    if (currentWeatherData !== undefined) {
      setMinuteData(currentWeatherData?.minutely as MinuteData[])
    }
  }, [currentWeatherData])

  console.log(minuteData)

  const labels = minuteData.map((data) => {
    const dt = new Date(data.dt * 1000)
    return dt.toLocaleTimeString() // Customize the label format as needed
  })

  const data = minuteData.map((data) => data.precipitation)

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Precipitation",
        data: data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
      }
    ]
  }

  return (
    <Stack>
      <Line options={options} data={chartData} />
    </Stack>
  )
}
