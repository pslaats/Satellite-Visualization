/**
 * Helper Functions to Convert TLE data into latitude and longitude.
 */

import { getLatLngObj, getGroundTracksSync } from "tle.js";

/**
 *
 * @param {Raw TLE Data} rawTleData
 * @returns Satellite Objects with Geo Infomation
 */
export const parseRawTleData = async (rawTleData) => {
  const lines = rawTleData
    .trimEnd()
    .split("\n")
    .map((e) => e.trimEnd());

  let uniqueSatelliteData = {};

  lines.map((line, i) => {
    // Every line divisable by 3 is the name of the Satellite
    if (i % 3 === 0) {
      uniqueSatelliteData[line] = {
        id: line,
        tle: `${line}
        ${lines[i + 1]}
        ${lines[i + 2]}`,
      };
    }
  });

  const satellites = Object.keys(uniqueSatelliteData)
    .map((key) => {
      const satData = uniqueSatelliteData[key];
      return satData;
    })
    .map((satData) => {
      return {
        id: satData.id,
        tle: satData.tle,
        currPos: getLatLongs(satData.tle),
      };
    });

  return satellites;
};

const getLatLongs = (tle) => {
  return getLatLngObj(tle);
};

export const getPath = (tle) => {
  const threeOrbitsArr = getGroundTracksSync({
    tle: tle,

    // Relative time to draw orbits from.  This will be used as the "middle"/current orbit.
    startTimeMS: Date.now(),

    // Resolution of plotted points.  Defaults to 1000 (plotting a point once for every second).
    stepMS: 1000,

    // Returns points in [lng, lat] order when true, and [lat, lng] order when false.
    isLngLatFormat: false,
  });

  return threeOrbitsArr.flat();
};
