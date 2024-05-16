import React, { useState } from "react";
import { FaCopy, FaThumbsUp, FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ModelCard = ({ model }) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(model.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(model.codeSnippet);
  };

  return (
    <>
      <div className="bg-black flex flex-col cursor-default justify-between text-green-500 rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 duration-300">
        <div className="p-3 w-4/5 mx-auto ">
          <h2 className="text-2xl font-bold mb-2 text-center">{model.name}</h2>
          <p className="text-gray-400 mb-4">{model.description}</p>
          <p className="text-gray-400 italic">
            Provider: <b>{model.provider}</b>
          </p>
          <div className="flex items-center mt-4">
            <button
              className={`mr-2 focus:outline-none ${
                isLiked ? "text-green-500" : "text-gray-400"
              }`}
              onClick={handleLike}
            >
              <FaThumbsUp />
            </button>
            <span className="text-gray-400">{likes}</span>
          </div>
        </div>
        <div className="mb-4 mx-auto flex flex-col sm:flex-row justify-between w-4/5 gap-1 sm:justify-between">
          <button
            className="text-green-500 bg-gray-700 p-3 rounded-md w-1/2 focus:outline-none mb-2 sm:mb-0"
            onClick={toggleModal}
          >
            Snippet
          </button>
          <button
            className="text-green-500 bg-gray-700 p-3 rounded-md w-1/2 focus:outline-none ml-0 sm:ml-3"
            onClick={() => navigate(`/model/${model._id}`)}
          >
            More Details
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
          <div className="bg-gray-800 rounded-lg p-6 overflow-auto max-w-full sm:w-full md:w-2/3 lg:w-2/3 xl:w-1/2">
            <div className="flex justify-end">
              <button
                className="text-green-500 hover:text-green-300 focus:outline-none mr-2"
                onClick={handleCopy}
              >
                <FaCopy />
              </button>
              <button
                className="text-green-500 hover:text-gray-200 focus:outline-none"
                onClick={toggleModal}
              >
                <FaWindowClose />
              </button>
            </div>
            <pre className="text-gray-300 bg-gray-700 p-3 border rounded-lg mt-4 whitespace-pre-wrap overflow-auto">
              {model.codeSnippet}
            </pre>
          </div>
        </div>
      )}
    </>
  );
};

export default ModelCard;
