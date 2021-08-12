import React from "react";

const Header = () => {
  return (
    <div>
      <header>
        <h1 className="text-5xl  font-bold text-custom-green py-10">
          Enzyme coding challenge
        </h1>
        <div className="w-6/5 sm:w-3/5 flex items-center md:border-2 rounded-full py-2 md:shadow-sm m-auto">
          <input
            className="flex-grow pl-5 bg-transparent outline-none text-lg"
            type="text"
            placeholder="Enter coma-separated planet names"
          />
          <button className="font-medium text-white bg-gray-400 rounded-full p-2 cursor-pointer mx-2 hover:bg-custom-green">
            Generate
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
