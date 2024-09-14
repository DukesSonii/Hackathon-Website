import React from "react";

const ClassItem = ({ subject }) => {
  return (
    <li className="flex items-center space-x-3 mt-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
      {/* Circle icon for the class initial */}
      <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
        {subject.subject.charAt(0)}
      </span>
      {/* Class details */}
      <div>
        <p className="font-medium text-gray-700">{subject.subject}</p>
        <p className="text-sm text-gray-500">{subject.section}</p>
      </div>
    </li>
  );
};

export default ClassItem;
