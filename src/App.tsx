import {Dashboard} from "./views"

function App() {
  return (
    <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
      <div style={{flex: 1, overflow: "auto"}}>
        <Dashboard />
      </div>
    </div>
  )
}

export default App
