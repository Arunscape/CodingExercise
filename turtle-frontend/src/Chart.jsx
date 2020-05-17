import React, { useRef, useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";

export default (props) => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [index, setIndex] = useState(0);
  const [chartDelay, setChartDelay] = useState(props.chartDelay);

  const d = {
    labels: [],
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        // pointRadius: 2,
        pointHitRadius: 10,
        data: chartData,
        showLine: true,
        borderWidth: 5,
        lineTension: 0,
        pointRadius: chartData.length
          ? [...Array(chartData.length - 1).fill(2), 8]
          : undefined,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            stepSize: 1,
          },
          // position: 'center'
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 1,
          },
          // position: 'center'
        },
      ],
    },
    animation: {
      easing: "linear",
    },
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    if (data !== props.data) {
      setData(props.data);
      setChartData([]);
      setIndex(0);
    }
    const id = setTimeout(() => {
      if (props.data[index] && index < props.data.length) {
        if (index > 1) {
          setChartData([...chartData, props.data[index]]);
        } else {
          setChartData([["x", "y"], props.data[index]]);
        }
        setIndex(index + 1);
        // console.log([...chartData, props.data[index]]);
      }
    }, chartDelay);

    return () => {
      clearTimeout(id);
    };
  }, [props.data, chartData, index]);

  useEffect(() => {
    setChartDelay(props.chartDelay);
  }, [props.chartDelay]);

  return (
    <>
      {/* {JSON.stringify(chartData)} */}
      <Scatter data={d} options={options} />
    </>
  );
};
