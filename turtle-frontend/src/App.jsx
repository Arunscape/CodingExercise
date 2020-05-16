import React from 'react';
import Chart from './Chart';
const App =  () => {
  
  const handleFile = (file) => {
    const fr = new FileReader();
    fr.onloadend = () => fetch('/turtle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: fr.result,
    }).then(res => res.json()).then(e => console.log(e))
    fr.readAsText(file)

  }
  
  return (
    <>
  <input 
  type='file'
  accept='.txt'
  onChange= {(e) => {handleFile(e.target.files[0])}}
  />
  <Chart data={[[0,0], [0,1]]}/>
  </>
)
  }

  export default App;
