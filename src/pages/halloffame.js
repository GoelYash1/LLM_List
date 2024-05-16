import React from "react";
import { FaStar } from "react-icons/fa"; // Import star icon from React Icons
import { useNavigate } from "react-router-dom";

const HallOfFame = () => {
  // Retrieve the top 5 models from session storage
  const hallOfFameModels =
    JSON.parse(sessionStorage.getItem("hallOfFameModels")) || [];
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl  text-center font-bold mb-6">Hall of Fame</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 mx-auto gap-6 md:w-4/5 sm:w-full">
        {hallOfFameModels.map((model, index) => (
          <div
            key={model.id}
            className="bg-black p-6 rounded-lg flex items-center justify-center transition transform hover:scale-105 duration-300"
            onClick={() => {
              navigate(`/model/${model._id}`);
            }}
          >
            <div className="text-center">
              <FaStar className="text-yellow-500 text-4xl mb-2" />
              <h2 className="text-lg font-semibold mb-2">{model.name}</h2>
              <p className="text-gray-400">{model.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HallOfFame;
