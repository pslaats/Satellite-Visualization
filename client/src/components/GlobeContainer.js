import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { getPath } from "../utils/satelliteHelpers";

const GlobeContainer = (props) => {
  const displayPath = false;

  const [satPosData, setSatPosData] = useState(null);

  useEffect(() => {
    const tle = props.satelliteData[0].tle;

    setSatPosData([getPath(tle)]);
  }, [props.satelliteData[0].id]);

  const currPosData = props.satelliteData.map((e) => ({
    id: e.id,
    lat: e.currPos.lat,
    lng: e.currPos.lng,
    size: 10,
    color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
  }));

  return (
    <div className="globe-container">
      {displayPath ? (
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pathsData={satPosData}
          pathColor={() => ["rgba(0,0,255,0.6)", "rgba(255,0,0,0.6)"]}
          pathDashLength={0.001}
          pathDashGap={0.004}
          pathDashAnimateTime={100000}
          pathStroke={5}
          pathPointAlt={0.5}
          pathTransitionDuration={0}
        />
      ) : (
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={currPosData}
          pointLabel={(d) => d.id}
          pointColor="color"
        />
      )}
    </div>
  );
};

export default GlobeContainer;
