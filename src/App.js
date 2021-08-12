import React, { useState } from "react";
import Header from "./components/Header";
import swal from "sweetalert";

import "./App.css";

const App = () => {
  const [inputString, setInputString] = useState("");
  const [planets, setPlanets] = useState([]);

  const handleGenerate = () => {
    if (!inputString) {
      swal("Please enter", "comma separated planet names", "error");
    } else {
      const temp = inputString.split(",");
      setInputString("");
      setPlanets(
        temp.reduce((accum, item, index) => {
          item = item.toLowerCase().replaceAll(" ", "");
          if (index === temp.length) return accum;
          if (item !== "")
            accum.push({ id: index, name: item, image: `${item}.jpeg` });
          return accum;
        }, [])
      );
    }
  };

  console.log("Planets ==> ", planets);

  return (
    <div className="App">
      <Header
        inputString={inputString}
        setInputString={setInputString}
        handleGenerate={handleGenerate}
      />
    </div>
  );
};

export default App;
