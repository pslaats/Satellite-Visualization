import React, { useState, useEffect } from "react";
import DeathStar from "./DeathStar";
import satellitesTLERaw from "./data/satellites.txt";
import geographyData from "./data/countries_geo_json";
import { parseRawTleData } from "./utils/satelliteHelpers";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(satellitesTLERaw);
      const rawData = await res.text();
      const parsedData = parseRawTleData(rawData);

      if (parsedData.length) {
        setData(parsedData[0].id);
        setSatelliteData(parseRawTleData(rawData));
      }
    };
    fetchData();
  }, [data]);

  return (
    <div className="App">
      <header className="App-header">
        {geographyData ? (
          <DeathStar data={data} geography={geographyData} />
        ) : null}
      </header>
    </div>
  );
}

export default App;
