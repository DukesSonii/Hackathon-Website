import React from "react";
import ClassItem from "./ClassItem";

const SidebarItem = ({ item }) => {
  return (
    <li className="p-4 hover:bg-gray-100">
      <span className="block font-semibold">{item.name}</span>
      {/* If there are classes, render them */}
      {item.classes && (
        <ul className="mt-2">
          {item.classes.map((subject, index) => (
            <ClassItem key={index} subject={subject} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
