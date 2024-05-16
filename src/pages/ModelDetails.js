import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaCopy } from "react-icons/fa";
import axios from "axios";

const ModelDetailsPage = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

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

  const model = data.find((model) => model._id === id);

  if (!model) {
    return <div>Please Wait....</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 sm:p-8 md:p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-green-500">{model.name}</h1>
        <p className="text-lg text-gray-300 mb-6">{model.description}</p>
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <button className="flex items-center mr-0 sm:mr-4 text-green-500 focus:outline-none mb-2 sm:mb-0">
            <FaThumbsUp className="mr-1" /> {model.likes} Likes
          </button>
          <div className="flex items-center text-gray-300">
            <span className="mr-2">Category:</span>
            {model.category === "Transformer" && (
              <span className="mr-1">🤖</span>
            )}
            {model.category === "NLP" && <span className="mr-1">💬</span>}
            <span>{model.category}</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex justify-between mb-4">
            <button
              className="flex text-white bg-green-500 p-3 rounded-md hover:text-green-800 focus:outline-none"
              onClick={() => {
                navigator.clipboard.writeText(model.codeSnippet);
              }}
            >
              <FaCopy className="mr-2 mt-2" /> <b>Copy Snippet</b>
            </button>
          </div>
          <pre className="text-gray-300 bg-gray-700 p-3 border rounded-lg mt-4 whitespace-pre-wrap overflow-auto sm:text-lg sm:leading-normal">
            {model.codeSnippet}
          </pre>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Provider Information</h2>
          <p className="text-lg text-gray-300">{model.providerInfo}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
          <ul className="list-disc text-lg text-gray-300">
            {model.useCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailsPage;
