import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { SatelliteContext } from "../contexts/SatelliteProvider";
import { getPath } from "../utils/satelliteHelpers";

const GlobeContainer = (props) => {
  const [state, dispatch] = React.useContext(SatelliteContext);

  const [satPosData, setSatPosData] = useState(null);

  useEffect(() => {
    const tle = state.satData[0].tle;

    setSatPosData([getPath(tle)]);
  }, [state.satData[0].id]);

  const currPosData = state.satData.map((e) => ({
    id: e.id,
    lat: e.currPos.lat,
    lng: e.currPos.lng,
    size: 10,
    color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
  }));

  const unselectSatellite = () => {
    dispatch({ type: "clear_selected_satellite" });
  };

  return (
    <div className="globe-container">
      {state.selectedSatellite ? (
        <Globe
          id="path-globe"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pathsData={state.selectedSatellitePath}
          pathColor={() => ["rgba(0,0,255,0.6)", "rgba(255,0,0,0.6)"]}
          pathDashLength={0.001}
          pathDashGap={0.004}
          pathDashAnimateTime={100000}
          pathStroke={5}
          pathPointAlt={0.5}
          pathTransitionDuration={0}
          pointsData={null}
          onGlobeClick={unselectSatellite}
        />
      ) : (
        <Globe
          id="point-globe"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={currPosData}
          pointLabel={(d) => d.id}
          pointColor="color"
          pathsData={null}
          onGlobeClick={unselectSatellite}
        />
      )}
    </div>
  );
};

export default GlobeContainer;
