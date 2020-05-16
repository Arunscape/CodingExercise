import React, { useRef, useEffect, useState } from 'react';
import {Scatter} from 'react-chartjs-2';


export default (props) => {
    const [data, setData] = useState(props.data)

    const  [chartData, setChartData] = useState([])
    const [index, setIndex] = useState(1)

    const d = {
      labels: [],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          // pointRadius: 2,
          pointHitRadius: 10,
          data: chartData,
          showLine: true,
          borderWidth: 5,
          lineTension: 0.2,
          pointRadius: chartData.length ? [...Array(chartData.length-1).fill(2), 8]: undefined 
        }
      ],
    
    };
    
    const options = {
      options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'center'
            }],
            yAxes: [{
              type: 'linear',
              position: 'center'
          }]
        },
        animation: {
          easing: 'linear'
        }
    }
    }

    useEffect(() => {

      const id = setTimeout(()=> {
        if (data[index] && index < data.length){
          console.log("HEY")
          if (index > 1){
              setChartData([...chartData, data[index]])
          } else {
              setChartData([['x', 'y'], data[index]])
          }
          setIndex(index + 1)
          console.log([...chartData, data[index]])
      }
      }, 20)
      
      return () => {
        clearTimeout(id)
      }
    }, [data, chartData, index])
    
    useEffect(() => {
        console.log("rerender")
        console.log(props.data)
        setData(props.data)
    }, [props.data])
    // console.log(data)

    return (
        <>
        {/* {JSON.stringify(chartData)} */}
        <Scatter
        data={d}
        options={options}

      />
      </>
    )
}