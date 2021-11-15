import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";

function DeathStar(props) {
  const { data } = props;
  const [geographies, setGeographies] = useState([]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    d3.json("https://unpkg.com/world-atlas@2.0.2/countries-50m.json").then(
      (response) => {
        setGeographies(feature(response, response.objects.countries).features);
      }
    );
  }, []);

  const projection = d3
    .geoOrthographic()
    .scale(250)
    .clipAngle(90)
    .rotate(rotation);

  return (
    <svg width={1000} height={1000}>
      <g className="countries">
        {geographies.map((d, i) => (
          <path
            key={`country-${i}`}
            d={d3.geoPath().projection(projection)(d)}
            className="country"
            stroke="#FFFFFF"
            strokeWidth={1}
          />
        ))}
      </g>
    </svg>
  );
}

export default DeathStar;
