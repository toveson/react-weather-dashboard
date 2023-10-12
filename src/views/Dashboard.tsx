import {Search} from "../components"

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
        padding: "0"
      }}
    >
      <Search />
    </div>
  )
}
