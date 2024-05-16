import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import HallOfFame from "./pages/halloffame";
import ModelDetails from "./pages/ModelDetails";

const App = () => {
  return (
    <div className="bg-gray-800 min-h-screen text-green-500 p-8">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hallOfFame" element={<HallOfFame />} />
          <Route path="/model/:id" element={<ModelDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
