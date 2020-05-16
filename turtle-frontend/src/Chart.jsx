import React, { useRef, useEffect, useState } from 'react';
import Chart from "react-google-charts";


export default (props) => {
    const [data, setData] = useState(props.data)

    const  [chartData, setChartData] = useState([])
    const [index, setIndex] = useState(1)

    
    useEffect(() => {
        
        const intervalid = setInterval(() =>{
            
            console.log(index, data[index])
            console.log(data)
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
        }, 500)
        
        return () => {
            clearInterval(intervalid);
        }
    },[data, chartData])
    
    useEffect(() => {
        console.log("rerender")
        console.log(props.data)
        setData(props.data)
    }, [props.data])
    // console.log(data)

    return (
        <>
        {JSON.stringify(chartData)}
        <Chart
        // width={'500px'}
        // height={'300px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          chartArea: {
            width: '85%',
            height: '85%',
          },
          colors: ['#8e0152', '#276419'],
          pointSize: 10,
          animation: {
            duration: 500,
            easing: 'in',
            startup: true,
          },
          vAxis: {
              title: 'Y'
        //     viewWindow: {
        //       max: -10,
        //       min: 100,
        //     },
          },
          hAxis: {
              title: 'X'
        //     viewWindow: {
        //       max: 100,
        //       min: -10,
        //     },
          },
          legend: { position: 'none' },
          enableInteractivity: true,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      </>
    )
}