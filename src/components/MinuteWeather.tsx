import ConstructionIcon from "@mui/icons-material/Construction"

export const MinuteWeather: React.FC = (props) => {
  return (
    <>
      <div style={{display: "flex", justifyContent: "center"}}>
        <ConstructionIcon
          style={{
            fontSize: 400
          }}
        />
      </div>
      <h1> MinuteWeather are currently under construction</h1>
    </>
  )
}
