import React, { useState, useEffect } from "react";
import satellitesTLERaw from "./data/satellites.txt";
import { parseRawTleData } from "./utils/satelliteHelpers";

import NavBar from "./components/NavigationBar";

import RightSidePanel from "./components/RightSidePanel";
import GlobeContainer from "./components/GlobeContainer";

import "./App.css";
import { SatelliteContext } from "./contexts/SatelliteProvider";

const App = () => {
  const [state, dispatch] = React.useContext(SatelliteContext);
  const [satelliteData, setSatelliteData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(satellitesTLERaw);
      const rawData = await res.text();
      const parsedData = await parseRawTleData(rawData);
      console.log(parsedData);

      dispatch({ type: "set_satellite_data", payload: parsedData });

      setSatelliteData([...parsedData]);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div className="main-container">
        {satelliteData ? (
          <GlobeContainer satelliteData={satelliteData} />
        ) : null}
        <RightSidePanel satelliteData={satelliteData} />
      </div>
    </div>
  );
};

export default App;
