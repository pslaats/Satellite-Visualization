import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SatelliteContext } from "../contexts/SatelliteProvider";
import { getPath } from "../utils/satelliteHelpers";

const columns = [{ field: "id", headerName: "Name", width: 200 }];

const SatelliteDataGrid = (props) => {
  const [state, dispatch] = React.useContext(SatelliteContext);

  const clickCallback = (params, event, details) => {
    console.log({ params, event, details });

    const satId = params.id;
    const selectedSatellitePath = [getPath(params.row.tle)];

    console.log(selectedSatellitePath);

    dispatch({
      type: "set_selected_satellite",
      payload: { satId, selectedSatellitePath },
    });
  };

  return (
    <DataGrid
      columns={columns}
      rows={state.satData}
      onCellClick={clickCallback}
    />
  );
};

export default SatelliteDataGrid;
