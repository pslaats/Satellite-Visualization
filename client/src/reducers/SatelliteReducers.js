/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "set_satellite_data":
      return { ...state, satData: action.payload };
    case "set_selected_satellite":
      return {
        ...state,
        selectedSatellite: action.payload.satId,
        selectedSatellitePath: [...action.payload.selectedSatellitePath],
      };
    case "clear_selected_satellite":
      return {
        ...state,
        selectedSatellite: null,
        selectedSatellitePath: null,
      };
    default:
      return {};
  }
};

export const initialState = {
  selectedSatellite: null,
  selectedSatellitePath: [],
  satData: null,
};
