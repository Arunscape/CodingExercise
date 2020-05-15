import React from 'react';


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
  <canvas style={{outline: 'black 3px solid', width: '90%'}}></canvas>
  </>
)
  }

  export default App;
