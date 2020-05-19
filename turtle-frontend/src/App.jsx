import React, { useState, useEffect } from "react";
import Turtle from "./pages/Turtle";
import "./styles/tailwind.css";

import UploadButton from "./components/UploadButton";

const App = () => {
  const [data, setData] = useState(null);

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
        .then((d) => setData(d))
        .catch((e) => alert("error: ", e));
    fr.readAsText(file);
  };

  useEffect(() => {
    // while the console.log is not necesssary, the effect is, so that components update when the data is changed
    console.log("data changed", data);
  }, [data]);

  return (
    <div className="flex w-full h-screen items-center justify-center bg-grey-lighter text-center">
      {data && data.path && data.path.length > 0 ? (
        <Turtle data={data} />
      ) : (
        <div>
          <h1 className="text-3xl font-bold pb-16">Turtle</h1>
          <UploadButton
            type="file"
            accept=".txt"
            onChange={(e) => {
              handleFile(e.target.files[0]);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
