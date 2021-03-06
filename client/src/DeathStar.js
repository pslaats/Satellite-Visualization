import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

// Rotation constants
const ROTATION_SENSITIVITY = 300;
const TIMER_SENSITIVITY = 1000;

function DeathStar(props) {
  const { data, geography } = props;
  const globeRef = useRef();
  const componentRef = useRef();

  useEffect(() => {
    const globe = d3.select(globeRef.current);
    const { width, height } = componentRef.current.getBoundingClientRect();
    const projection = d3.geoOrthographic();
    const path = d3.geoPath().projection(projection);

    // Set height and width of svg to parent div
    globe
      .style("width", width)
      .style("height", height);

    // Add country data
    globe
      .selectAll(".country")
      .data(geography.features)
      .join("path")
      .attr("class", "country")
      .attr("d", (country) => path(country));

    // Style the globe to look nicer
    globe
      .style("fill", "#777")
      .style("stroke", "#555");

    // Rotate function
    const rotateOnTimer = (elapsed) => {
      const currentRotation = projection.rotate();
      const k = ROTATION_SENSITIVITY / projection.scale();
      projection.rotate([currentRotation[0] + k, currentRotation[1]]);
      const pathRotate = d3.geoPath().projection(projection);
      globe.selectAll("path").attr("d", pathRotate);
    }

    // Rotate the globe
    const timer = d3.timer(rotateOnTimer, TIMER_SENSITIVITY);

    // Add mouse over and mouse out actions
    globe
      .on('mouseover', (d) => { console.log('mouseover'); timer.stop(); } )
      .on('mouseleave', (d) => { console.log('mouseout'); timer.restart(rotateOnTimer, TIMER_SENSITIVITY); } )

  }, [geography]);

  return (
    <div ref={componentRef} className="DeathStar">
      <svg ref={globeRef}></svg>
    </div>
  );
}

export default DeathStar;
