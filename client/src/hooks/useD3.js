import React from "react";
import * as d3 from "d3";

export const useD3 = (renderSatelliteFn, dependencies) => {
  const ref = React.useRef();
  React.useEffect(() => {
    renderSatelliteFn(d3.select(ref.current));
    return () => {};
  }, dependencies);
  return ref;
};
