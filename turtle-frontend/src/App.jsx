import React , {useState, useEffect} from 'react';
import Chart from './Chart';
const App =  () => {

  const [data, setData] = useState([[]]);


  
  
  const handleFile = (file) => {
    const fr = new FileReader();
    fr.onloadend = () => fetch('/turtle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: fr.result.trim(),
    }).then(res => res.json()).then(e => {
      // console.log(e)
      setData([...data, ...e.path])
      console.log("setting data")
      // console.log(data)
    })
    fr.readAsText(file)

  }

  useEffect(() => {
    console.log("data changed", data)
  }, [data])
  
  return (
    <>
  <input 
  type='file'
  accept='.txt'
  onChange= {(e) => {handleFile(e.target.files[0])}}
  />
  <Chart data={data}/>
  </>
)
  }

  export default App;
