import "./App.css";
import Activities from "./components/Activities";

function App() {
  return (
    <>
      <h1>Strava Activities</h1>
      <div className="card">
        <Activities />
      </div>
    </>
  );
}

export default App;
