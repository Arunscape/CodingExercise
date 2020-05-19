import React, { useState } from "react";
import Chart from "../components/Chart";

export default (props) => {
  const [chartDelay, setChartDelay] = useState(500);

  return (
    <div className="h-full w-full">
      <div style={{ height: "20%" }}>
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
      </div>
      <div style={{ height: "80%" }}>
        <Chart
          className="w-full"
          data={props.data}
          duplicates={props.duplicates}
          chartDelay={chartDelay}
        />
      </div>
    </div>
  );
};
