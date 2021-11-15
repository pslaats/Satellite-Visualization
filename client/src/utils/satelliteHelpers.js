/**
 * Helper Functions to Convert TLE data into latitude and longitude.
 */
import { eciToGeodetic, gstime, propagate, twoline2satrec } from "satellite.js";

/**
 *
 * @param {Raw TLE Data} rawTleData
 * @returns Satellite Objects with Geo Infomation
 */
export const parseRawTleData = (rawTleData) => {
  const lines = rawTleData
    .trimEnd()
    .split("\r\n")
    .map((e) => e.trimEnd());

  const satellites = lines
    .map((line, i) => {
      // Every line divisable by 3 is the name of the Satellite
      if (i % 3 === 0) {
        return {
          id: line,
          tle: [lines[i + 1], lines[i + 2]],
        };
      }
    })
    .filter((e) => e)
    .map((satData) => calculateLatLongHeight(satData))
    .filter((e) => e);

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
