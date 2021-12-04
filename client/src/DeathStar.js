import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

function DeathStar(props) {
  const { data, geography } = props;
  const globeRef = useRef();
  const componentRef = useRef();

  useEffect(() => {
    const globe = d3.select(globeRef.current);
    // const { width , height } = componentRef.current.getBoundingClientRect();
    const projection = d3.geoOrthographic();
    const pathGen = d3.geoPath().projection(projection);
    console.log(geography.features)
    globe
      .selectAll('.country')
      .data(geography.features)
      .join('path')
      .attr('class', 'country')
      .attr('d', country => pathGen(country));
  }, [geography]);

  return (
    <div ref={componentRef} style={{ width: '1000px', height: '1000px' }}>
      <svg ref={globeRef} style={{ width: '1000px', height: '1000px' }}>
      </svg>
    </div>
  );
}

export default DeathStar;
