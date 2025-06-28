import React from 'react';

const Illustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-md">
      <img  src="/education.jpg" 
        alt="Office workspace illustration" 
        className="w-full h-auto rounded-lg shadow-lg animate-fadeIn"
      />
        <div className="absolute bottom-6 left-6 right-6 p-4 bg-white bg-opacity-90 rounded-lg shadow-sm">
        <h3 className="font-bold text-gray-800 mb-1">Welcome to Evalya Smart</h3>
        <p className="text-sm text-gray-600">The secure workspace for teams</p>
      </div>
    </div>
  );
};

export default Illustration;