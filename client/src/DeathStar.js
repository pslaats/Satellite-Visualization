import React from "react";
import * as d3 from "d3";
import { useD3 } from "./hooks/useD3";

function DeathStar({ data }) {
  const ref = useD3((svg) => {
    const height = 1000;
    const width = 1000;
    const margin = { top: 10, right: 20, bottom: 10, left: 20 };
  });
  return (
    <svg
      ref={ref}
      style={{
        height: 1000,
        style: "100%",
        merginRight: "0px",
        merginLeft: "0px",
      }}
    >
      <g className="satellite-area" />
    </svg>
  );
}

export default DeathStar;
