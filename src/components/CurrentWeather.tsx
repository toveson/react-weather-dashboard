import ConstructionIcon from "@mui/icons-material/Construction"

export const CurrentWeather: React.FC = (props) => {
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
