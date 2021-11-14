import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DeathStar from "./DeathStar";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/sat-data")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
        <DeathStar data={data} />
      </header>
    </div>
  );
}

export default App;
