import React, { useState, useEffect } from "react";

import DeathStar from "./DeathStar";

import satellitesTLERaw from "./data/satellites.txt"

import { parseRawTleData } from "./utils/satelliteHelpers";

import "./App.css";


function App() {
  const [data, setData] = useState(null);
  const [satelliteData, setSatelliteData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      const res = await fetch(satellitesTLERaw)
      const rawData = await res.text()
      const parsedData = parseRawTleData(rawData)

      setData(parsedData[0].id)
      setSatelliteData(parseRawTleData(rawData))

    }

    fetchData()
  }, [data]);

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
