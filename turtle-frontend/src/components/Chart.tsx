import React, { useRef, useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";

type Point = { x: number; y: number };

type Data = {
  path: Point[];
  duplicates: Point[];
};

interface Props {
  data: Data;
  chartDelay: number;
}

export default (props: Props) => {
  const [data, setData] = useState<Point[]>([]);
  const [chartData, setChartData] = useState<Point[]>([]);
  const [index, setIndex] = useState(0);
  const [chartDelay, setChartDelay] = useState(props.chartDelay);

  const d = {
    labels: [],
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        backgroundColor: "#e755ba",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: data.map((d: Point) => {
          if (
            props.data.duplicates.find((e: Point) => e.x === d.x && e.y === d.y)
          ) {
            return "red";
          } else {
            return "#fff";
          }
        }),
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        // pointRadius: 2,
        pointHitRadius: 10,
        data: chartData,
        showLine: true,
        borderWidth: 8,
        lineTension: 0,
        pointRadius: chartData.length
          ? [...Array(chartData.length - 1).fill(3), 8]
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
    hover: {
      animationDuration: 0,
    },
  };

  useEffect(() => {
    if (data !== props.data.path) {
      setData(props.data.path);
      setChartData([]);
      setIndex(0);
    }
    const id = setTimeout(() => {
      setChartData([...chartData, props.data.path[index]]);
      setIndex(index + 1);
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
