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

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(satellitesTLERaw);
      const rawData = await res.text();
      const parsedData = await parseRawTleData(rawData);

      dispatch({ type: "set_satellite_data", payload: parsedData });
    };
    fetchData();
    // setInterval(fetchData(), 1000);
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div className="main-container">
        {state.satData ? <GlobeContainer /> : null}
        <RightSidePanel />
      </div>
    </div>
  );
};

export default App;
