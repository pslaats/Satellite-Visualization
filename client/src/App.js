import React, { useState, useEffect } from "react";
import satellitesTLERaw from "./data/satellites.txt";
import { parseRawTleData } from "./utils/satelliteHelpers";

import NavBar from "./components/NavigationBar";

import RightSidePanel from "./components/RightSidePanel";
import GlobeContainer from "./components/GlobeContainer";
import { createTheme, ThemeProvider } from "@mui/material";

import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const [satelliteData, setSatelliteData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(satellitesTLERaw);
      const rawData = await res.text();
      const parsedData = await parseRawTleData(rawData);
      console.log(parsedData);

      setSatelliteData([...parsedData]);
    };
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <NavBar />
        <div className="main-container">
          {satelliteData ? (
            <GlobeContainer satelliteData={satelliteData} />
          ) : null}
          <RightSidePanel satelliteData={satelliteData} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
