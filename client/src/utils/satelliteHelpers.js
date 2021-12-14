/**
 * Helper Functions to Convert TLE data into latitude and longitude.
 */
import { eciToGeodetic, gstime, propagate, twoline2satrec } from "satellite.js";

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

  const satellites = lines
    .map((line, i) => {
      // Every line divisable by 3 is the name of the Satellite
      if (i % 3 === 0) {
        // return {
        //   id: line,
        //   tle: [lines[i + 1], lines[i + 2]],
        // };

        return {
          id: line,
          tle: `${line}
        ${lines[i + 1]}
        ${lines[i + 2]}`,
        };
      }
    })
    .filter((e) => e)
    .map((satData) => {
      return {
        id: satData.id,
        tle: satData.tle,
        currPos: getLatLongs(satData.tle),
      };
    });

  return satellites;
};

/**
 *
 * @param {Satellite Object with TLE array} satData
 * @returns Satellite Object with Latitude, Longitude, and Height
 */
const calculateLatLongHeight = (satData) => {
  try {
    const [tleLine1, tleLine2] = [...satData.tle];

    const satrec = twoline2satrec(tleLine1, tleLine2);
    const positionAndVelocity = propagate(satrec, new Date());

    // The position_velocity result is a key-value pair of ECI coordinates.
    // These are the base results from which all other coordinates are derived.
    const positionEci = positionAndVelocity.position;
    const velocityEci = positionAndVelocity.velocity;

    // You will need GMST for some of the coordinate transforms.
    // http://en.wikipedia.org/wiki/Sidereal_time#Definition
    const gmst = gstime(new Date());

    const positionGd = eciToGeodetic(positionEci, gmst);
    // Geodetic coords are accessed via `longitude`, `latitude`, `height`

    const longitude = positionGd.longitude;
    const latitude = positionGd.latitude;
    const height = positionGd.height;

    satData.longitude = longitude;
    satData.latitude = latitude;
    satData.height = height;
  } catch (e) {
    console.error(e);
    console.log(satData);
    return;
  }

  return satData;
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
