import React, { useState } from "react";
import Chart from "../components/Chart";

export default (props) => {
  const [chartDelay, setChartDelay] = useState(500);

  return (
    <>
      {chartDelay}
      <input
        type="range"
        min="5"
        max="5000"
        onChange={(e) => {
          setChartDelay(e.target.value);
        }}
      />
      {"Speed (ms before drawing the next point, lower is faster)"}
      <Chart data={props.data} chartDelay={chartDelay} />
    </>
  );
};
