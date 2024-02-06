import React from "react";

const Delete = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className="bg-white text-black w-8 rounded float-right mx-2 cursor-pointer font-extrabold hover:text-red-600">X</button>
    </div>
  );
};

export default Delete;
