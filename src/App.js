import React, { useState } from "react";
import Header from "./components/Header";
import swal from "sweetalert";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
            accum.push({ id: item, name: item, image: `${item}.jpeg` });
          return accum;
        }, [])
      );
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
    </div>
  );
};

export default App;
