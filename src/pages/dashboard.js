import React, { useState, useEffect } from "react";
import ModelList from "../components/ModelList";
import { FiFilter, FiAward } from "react-icons/fi"; // Import FiAward for Hall of Fame button
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [models, setModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State to track small screen size
  const navigate = useNavigate();

  // Fetch data from API
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://atlan-backend-1.onrender.com/api/models"
      );
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Filter models based on search term and selected categories
    let filteredModels = data.filter(
      (model) =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(model.category))
    );

    setModels(filteredModels);
  }, [searchTerm, selectedCategories, data]);

  const uniqueCategories = Array.from(
    new Set(data?.map((model) => model.category))
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    const index = selectedCategories.indexOf(category);
    if (index === -1) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    }
  };

  const handleHallOfFame = () => {
    navigate("/halloffame");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(() => !isDropdownOpen);
  };

  // Function to toggle small screen state
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 640); // Adjust threshold as needed
  };

  // Event listener for window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen text-green-500 sm:p-8 md:p-4">
      <h1 className="text-3xl font-bold mb-4">Large Language Models</h1>
      <div className="mb-4  items-center justify-between">
        <div className="flex items-center space-x-4 relative mb-2">
          {isSmallScreen ? (
            <button
              className="text-gray-400 hover:text-green-500 focus:outline-none"
              onClick={toggleDropdown}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          ) : (
            <>
              <button
                className="bg-gray-800 text-gray-400 px-4 py-2 rounded-lg focus:outline-none hover:border-red-700"
                onClick={toggleDropdown}
              >
                <FiFilter className="inline-block mr-2" />
                Filter
              </button>
              <button
                className="bg-gray-800 text-gray-400 px-4 py-2 rounded-lg focus:outline-none hover:border-red-700"
                onClick={handleHallOfFame}
              >
                <FiAward className="inline-block mr-2" />
                Hall of Fame
              </button>
            </>
          )}
          {/* Dropdown for filter options on small screens */}
          {isDropdownOpen && (
            <div className="absolute bg-black text-gray-400 rounded-lg py-2 top-10 w-48 z-50">
              {uniqueCategories.map((category) => (
                <label key={category} className="block px-4">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="Search by title"
            className="bg-gray-800 text-gray-400 rounded-l-lg px-4 py-2 focus:outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <ModelList models={models} />
    </div>
  );
};

export default Dashboard;
