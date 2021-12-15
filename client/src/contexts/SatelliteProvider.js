import React from "react";
import { initialState, reducer } from "../reducers/SatelliteReducers";

export const SatelliteContext = React.createContext({
  state: initialState,
  dispatch: () => null,
});

export const SatelliteProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <SatelliteContext.Provider value={[state, dispatch]}>
      {children}
    </SatelliteContext.Provider>
  );
};
