import React, { useState, useEffect } from "react";

export const SatelliteDataGrid = (props) => {
  console.log(props.data);
  return (
    <>
      <h1>Temp</h1>
      <table>
        {props?.data?.map((satellite) => {
          return <tr>{satellite.id}</tr>;
        })}
      </table>
    </>
  );
};
