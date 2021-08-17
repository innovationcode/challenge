import React, { useState } from "react";
import Header from "./components/Header";
import swal from "sweetalert";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DownloadLink from "react-download-link";
import axios from "axios";

import "./App.css";

const App = () => {
  const [inputString, setInputString] = useState("");
  const [planets, setPlanets] = useState([]);
  const [showDownload, setShowDownload] = useState(false);

  const handleGenerate = () => {
    if (!inputString) {
      swal("Please enter", "comma separated planet names", "error");
    } else {
      const temp1 = inputString.split(",");
      alert(temp1);
      const planetsName = [
        "mercury",
        "venus",
        "earth",
        "mars",
        "jupiter",
        "saturn",
        // "uranus",
        // "neptune",
      ];
      const temp = temp1.filter((ele) => {
        console.log("ele ==> ", ele);
        if (planetsName.includes(ele.trim().toLowerCase())) {
          return ele;
        } else {
          swal(
            "Please enter planet name correctly",
            "Mercury, Venus, Earth, Mars, Jupiter, Saturn"
          );
        }
      });
      alert(temp);
      setInputString("");
      setPlanets(
        temp.reduce((accum, item, index) => {
          item = item.toLowerCase().replaceAll(" ", "");
          if (index === temp.length) return accum;
          if (item !== "")
            accum.push({ id: item, name: item, image: `${item}.jpeg` });
          return accum;
        }, [])
      );
      setShowDownload(true);
    }
  };

  const handleDragEnd = (results) => {
    console.log("Results in handleDragEnd => ", results);
    if (!results.destination) return;

    let tempPlanetList = [...planets];
    console.log("Temp planet array => ", tempPlanetList);
    const [reorderedPlanets] = tempPlanetList.splice(results.source.index, 1);
    tempPlanetList.splice(results.destination.index, 0, reorderedPlanets);
    setPlanets(tempPlanetList);
  };

  const downloadedPlanetsHTML1 = async () => {
    const dataP = planets.map(async (planet) => {
      const response = await axios.get(
        `./snippets/${
          planet.name.charAt(0).toUpperCase() + planet.name.slice(1)
        }.snippet.js`
      );
      return response.data;
    });
    debugger;
    downloadPlan();
    async function downloadPlan() {
      const html = await [];
      Promise.all(dataP).then((values) => {
        values.map((value) => {
          html.push(value);
        });
      });
      console.log("HTML  ==>  ", html);
      debugger;
      if (html.length > 1) return html;
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

      <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
        <Droppable droppableId="planets">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="mt-20"
            >
              {planets.length > 0 && (
                <>
                  {planets.map((planet, index) => {
                    return (
                      <Draggable
                        key={planet.id}
                        draggableId={planet.name}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="grid grid-cols-2 h-32 border border-gray-200 my-4 w-full sm:w-3/4 mx-auto"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div className="relative">
                              <img
                                className="absolute top-0 left-0 w-full h-32 object-cover"
                                src={
                                  require(`./assets/images/${planet.image}`)
                                    .default
                                }
                                alt={`${planet.name}`}
                              />
                            </div>
                            <p className="text-3xl font-bold text-left p-10">
                              {planet.name.charAt(0).toUpperCase() +
                                planet.name.slice(1)}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                </>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* DOWNLOAD  LOGIC */}
      {showDownload && (
        <button className="px-6 py-2 text-xl text-white bg-gray-500 font-semibold rounded-lg	m-10 hover:bg-custom-green">
          <DownloadLink
            style={{ textDecoration: "none", color: "white" }}
            label="Download"
            filename="Planets.html"
            // exportFile={() => downloadedPlanetsHTML()}
            exportFile={() => downloadedPlanetsHTML1()}
          />
        </button>
      )}
    </div>
  );
};

export default App;
