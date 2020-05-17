import React, { useState, useEffect } from "react";
import Chart from "./Chart";
const App = () => {
  const [data, setData] = useState([[]]);

  const [chartDelay, setChartDelay] = useState(500);

  const handleFile = (file) => {
    const fr = new FileReader();
    fr.onloadend = () =>
      fetch("/turtle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: fr.result.trim(),
      })
        .then((res) => res.json())
        .then((e) => {
          // console.log(e)
          setData([...data, ...e.path]);
          console.log("setting data");
          // console.log(data)
        });
    fr.readAsText(file);
  };

  useEffect(() => {
    console.log("data changed", data);
  }, [data]);

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ height: "5%", display: "inline-block" }}>
        <input
          type="file"
          accept=".txt"
          onChange={(e) => {
            handleFile(e.target.files[0]);
          }}
        />

        <input
          type="range"
          min="5"
          max="5000"
          onChange={(e) => {
            setChartDelay(e.target.value);
          }}
        />
        {chartDelay}
      </div>
      <div style={{ height: "95%" }}>
        <Chart data={data} chartDelay={chartDelay} />
      </div>
    </div>
  );
};

export default App;
