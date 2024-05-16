import React, { useEffect } from 'react';
import ModelCard from './ModelCard';

const ModelList = ({ models }) => {
  // Sort models based on likes count
  const sortedModels = models.slice().sort((a, b) => b.likes - a.likes);
  useEffect(() => { 
    sessionStorage.setItem('hallOfFameModels', JSON.stringify(sortedModels.slice(0, 5)));
  }, [sortedModels]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6">
      {models.map((model, index) => (
        <ModelCard key={model.id} model={model}  />
      ))}
    </div>
  );
};

export default ModelList;
