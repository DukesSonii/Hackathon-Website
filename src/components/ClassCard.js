import React from "react";
import { useNavigate } from "react-router";

const ClassCard = ({ classes, isAdmin, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const handleEdit = async (cls) => {
    const updatedClass = prompt(
      "Enter new details (subject, section) as comma-separated values:",
      `${cls.subject}, ${cls.section}`
    );
    if (updatedClass) {
      const [subject, section] = updatedClass
        .split(",")
        .map((part) => part.trim());
      try {
        const response = await fetch(
          `http://localhost:5000/classes/${cls.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subject, section }),
          }
        );
        if (!response.ok) throw new Error("Failed to update class");
        onEdit(await response.json());
      } catch (error) {
        console.error("Error editing class:", error);
      }
    }
  };

  const handleDelete = async (cls) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/classes/${cls.id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete class");
        onDelete(cls);
      } catch (error) {
        console.error("Error deleting class:", error);
      }
    }
  };

  const handleClassClick = (id) => {
    navigate(`/home/class/${id}`);
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg mb-4">
      <h2 className="text-lg font-semibold mb-2">Enrolled Classes</h2>
      {classes.map((cls) => (
        <div
          key={cls.id}
          className="flex justify-between items-center border-b py-2 cursor-pointer"
        >
          <div onClick={() => handleClassClick(cls.id)}>
            <p className="font-medium">{cls.subject}</p>
            <p className="text-sm text-gray-600">{cls.section}</p>
          </div>
          {isAdmin && (
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                onClick={() => handleEdit(cls)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(cls)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClassCard;
