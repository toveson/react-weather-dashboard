import {
  // CurrentWeather,
  // ForecastWeather,
  MinuteWeather,
  Search
} from "../components"

export const Dashboard: React.FC = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
        // backgroundColor: "#69DC9E",
        overflow: "auto",
        padding: "0",
        flexWrap: "wrap"
      }}
    >
      <Search />
      {/* <CurrentWeather /> */}
      {/* <ForecastWeather /> */}
      <MinuteWeather />
    </div>
  )
}
