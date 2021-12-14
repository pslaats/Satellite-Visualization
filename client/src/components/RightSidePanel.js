import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [{ field: "id", headerName: "Name", width: 200 }];

const RightSidePanel = (props) => {
  const satelliteData = props?.satelliteData;

  return (
    <div className="right-side-panel-container">
      <DataGrid columns={columns} rows={satelliteData} />
    </div>
  );
};

export default RightSidePanel;
