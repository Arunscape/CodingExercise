import React, { useState } from "react";
import Chart from "../components/Chart";
import ReactJson from "react-json-view";

export default (props) => {
  const [chartDelay, setChartDelay] = useState(100);
  const [raw, setRaw] = useState(false);

  return (
    <div className=" flex flex-col h-full w-full text-left">
      {raw ? (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end w-full"
            onClick={() => setRaw(false)}
          >
            I want the pretty chart!
          </button>
          <ReactJson src={props.data} />
        </>
      ) : (
        <>
          <div className="flex flex-row justify-around items-center w-full p-2">
            <input
              type="range"
              className="px-3"
              min="0"
              max="995"
              onChange={(e) => {
                setChartDelay(1000 - e.target.value);
              }}
              value={1000 - chartDelay}
              style={{ width: "40%" }}
            />
            <span>{"Speed. Slide right to go faster, Left to go slower"}</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end"
              onClick={() => setRaw(true)}
            >
              Give me the raw data!
            </button>
          </div>
          <div className="w-full flex-grow p-2">
            <Chart data={props.data} chartDelay={chartDelay} />
          </div>
        </>
      )}
    </div>
  );
};
